const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 🟢 YOUR SPECIFIC AVAILABLE MODELS
// We try "Lite" first because it is faster and has higher limits.
const MODELS_TO_TRY = [
  "gemini-2.5-flash-lite",      // Priority 1: Newest, Fastest, Best Quota
  "gemini-2.0-flash-lite-001",  // Priority 2: Stable Lite
  "gemini-2.5-flash",           // Priority 3: Standard 2.5
  "gemini-2.0-flash-001",       // Priority 4: Standard 2.0
  "gemini-2.5-pro"              // Priority 5: High Intelligence (Backup)
];

async function callGemini(prompt) {
  if (!API_KEY) { 
    alert("Missing API Key. Check .env file."); 
    return null; 
  }

  for (const model of MODELS_TO_TRY) {
    console.log(`🤖 Connecting to: ${model}...`);
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      // --- HANDLE ERRORS ---
      if (response.status === 429) {
        console.warn(`⏳ ${model} is busy (Rate Limit). Trying next model...`);
        continue; 
      }

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`⚠️ ${model} failed (${response.status}). Reason: ${errText}`);
        
        // If the key itself is bad, stop immediately
        if (errText.includes("API key not valid")) {
            alert("Your API Key is invalid. Please update .env");
            return null;
        }
        continue;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // JSON Extraction Logic (Finds the array [] or object {})
      const firstChar = text.search(/[{}[]/);
      const end = text.lastIndexOf('}') > text.lastIndexOf(']') ? text.lastIndexOf('}') : text.lastIndexOf(']');
      
      if (firstChar === -1 || end === -1) {
          console.error("AI returned text but no JSON:", text);
          continue;
      }

      console.log(`✅ Success using: ${model}`);
      return JSON.parse(text.substring(firstChar, end + 1));

    } catch (e) {
      console.error(`Error with ${model}:`, e);
    }
  }

  alert("All models failed. Please check your internet connection or API Key quota.");
  return null;
}

// --- EXPORTS ---

export const generateFlashcards = async (input, mode = 'topic') => {
  const basePrompt = mode === 'notes' 
    ? `based on these notes: "${input.substring(0,3000)}"` 
    : `about: "${input}"`;

  const prompt = `
    Create 10 flashcards ${basePrompt}.
    Return strictly JSON Array.
    Structure: [{"id":1,"question":"Q","answer":"A","explanation":"Why?","options":["A","B","C","D"]}]
    Rules: Raw JSON only. No Markdown.
  `;
  
  return await callGemini(prompt) || [];
};

export const generateLessonPlan = async (topic) => {
  const prompt = `
    Create a study lesson for "${topic}".
    Return strictly JSON Object.
    Structure: {
      "title": "Title",
      "youtubeQuery": "${topic} tutorial",
      "modules": [{"heading":"Concept","content":"<ul><li>Point</li></ul>"}]
    }
    Rules: Use HTML tags (<ul>, <li>, <strong>). Keep content short. Raw JSON only.
  `;

  return await callGemini(prompt);
};