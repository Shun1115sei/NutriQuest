import type { Route } from "./+types/gemininutrition.ts";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function action({ request }: Route.LoaderArgs) {

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await request.json();
    const prompt = body.prompt;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing 'prompt' field" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log("Using Gemini API for analysis.");

    const chatHistory = [
      {
        role: "user",
        parts: [
          {
            text: `You are an expert nutrition analyst. Your task is to provide the estimated nutritional information for "${prompt}" in a valid JSON format. 
            The JSON object should only contain these keys: "food" (string), "calories" (number), "protein" (number, in grams), "fat" (number, in grams), and "carbs" (number, in grams).
            
            --- IMPORTANT RULES FOR ESTIMATING PORTION SIZE ---
            1.  If the user does NOT specify any quantity, assume one standard serving size.
            2.  For small ambiguous quantities like "bite" or "spoonful", estimate 10–30 kcal per bite.
            3.  If the user specifies a clear quantity, use that value.`
          }
        ]
      }
    ];

    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            food: { type: "STRING" },
            calories: { type: "NUMBER" },
            protein: { type: "NUMBER" },
            fat: { type: "NUMBER" },
            carbs: { type: "NUMBER" }
          },
          required: ["food", "calories", "protein", "fat", "carbs"]
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
      return new Response(
        JSON.stringify({ error: `API request failed: ${response.status}` }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    const data = JSON.parse(text);

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching Gemini nutrition data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
