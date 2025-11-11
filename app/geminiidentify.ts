import type { Route } from "./+types/geminiidentify.ts";

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
    const body = await request.json();
    const imageData = body?.imageData;

    if (!imageData || typeof imageData !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'imageData' field" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const prompt = `You are an expert food identifier specializing in Asian cuisine, particularly Singaporean dishes. Your task is to look at the image and identify the main dish.
Return ONLY the most common name for the food (e.g., "Hainanese chicken rice", "Laksa", "Ramen").
Do not add any descriptions or extra words.
If the image does not contain food, or you cannot identify it, return the single word "unknown".`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageData
              }
            }
          ]
        }
      ]
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
    const foodName = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

    if (!foodName) {
      return new Response(JSON.stringify({ error: "Unable to identify food from image" }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }

    return Response.json({ foodName });
  } catch (error) {
    console.error("Error fetching Gemini image data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
