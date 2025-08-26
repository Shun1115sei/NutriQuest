// /api/assemblyai-token.js

export default async function handler(req, res) {
  // Securely retrieve AssemblyAI API keys from Vercel environment variables
  const apiKey = process.env.ASSEMBLYAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'AssemblyAI API key is not configured.' });
  }

  try {
    const response = await fetch('https://api.assemblyai.com/v2/realtime/token', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expires_in: 600 }) // Set the token expiration time to one hour.
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create AssemblyAI token: ${errorText}`);
    }

    const data = await response.json();
    return res.status(200).json({ token: data.token });

  } catch (error) {
    console.error('Error creating AssemblyAI token:', error);
    return res.status(500).json({ error: 'Failed to create AssemblyAI token.' });
  }
}