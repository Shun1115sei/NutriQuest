import type { Route } from "./+types/geminiadvice.ts";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function action({ request }: Route.LoaderArgs) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await request.json().catch(() => null);
    const totals = body?.totals;
    const meals = Array.isArray(body?.meals) ? body.meals : [];
    const language = typeof body?.language === "string" ? body.language : "en";
    const nextMealType = typeof body?.nextMealType === "string" ? body.nextMealType : "next meal";
    const nextMealLabel = typeof body?.nextMealLabel === "string" ? body.nextMealLabel : "your next meal";

    if (!totals || typeof totals !== "object") {
      return new Response(JSON.stringify({ error: "Missing or invalid totals" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const safeTotals = {
      calories: Number(totals.calories) || 0,
      protein: Number(totals.protein) || 0,
      fat: Number(totals.fat) || 0,
      carbs: Number(totals.carbs) || 0
    };

    const recentMeals = meals.slice(-5).map(meal => ({
      mealType: meal?.mealType ?? "",
      calories: Number(meal?.calories) || 0,
      protein: Number(meal?.protein) || 0,
      fat: Number(meal?.fat) || 0,
      carbs: Number(meal?.carbs) || 0,
      timestamp: meal?.timestamp ?? ""
    }));

    const targetLanguage = language === "zh" ? "Chinese (Simplified)" : "English";

    const prompt = `You are a certified nutritionist helping a user make their next meal choice.
Total nutrition so far: ${JSON.stringify(safeTotals)}.
Recent meals: ${JSON.stringify(recentMeals)}.
The next meal to plan for is ${nextMealType} (${nextMealLabel}).
Provide 2 concise sentences of practical nutrition advice that considers macro balance and highlights any areas needing attention.
Respond in ${targetLanguage} and be encouraging yet clear.`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            advice: { type: "STRING" },
            status: {
              type: "STRING",
              enum: ["balanced", "needs_attention"]
            }
          },
          required: ["advice", "status"]
        }
      }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: `API request failed: ${response.status}`, details: errorText }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return new Response(JSON.stringify({ error: "Invalid response from Gemini" }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = JSON.parse(text);
    return Response.json(data);
  } catch (error) {
    console.error("Error generating Gemini nutrition advice:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}