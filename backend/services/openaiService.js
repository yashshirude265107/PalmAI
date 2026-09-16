const { GoogleGenAI } = require("@google/genai");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PALM_READING_SYSTEM_PROMPT = `
You are an expert palmist.

Analyze the uploaded palm image carefully.

Return ONLY a valid JSON object.

{
  "handShape":"",
  "palmShape":"",
  "fingerShape":"",
  "thumbAnalysis":"",
  "lifeLine":"",
  "heartLine":"",
  "headLine":"",
  "fateLine":"",
  "sunLine":"",
  "marriageLine":"",
  "moneyLine":"",
  "healthLine":"",
  "mountJupiter":"",
  "mountSaturn":"",
  "mountApollo":"",
  "mountMercury":"",
  "mountVenus":"",
  "mountMoon":"",
  "career":"",
  "education":"",
  "love":"",
  "marriage":"",
  "business":"",
  "finance":"",
  "children":"",
  "travel":"",
  "personality":"",
  "strengths":"",
  "weaknesses":"",
  "luckyNumber":"",
  "luckyColor":"",
  "luckyDay":"",
  "futureTimeline":"",
  "overallSummary":"",
  "analysisScore":90
}
`;

async function analyzePalmImage(base64Image, mimeType = "image/jpeg") {

  console.log("================================");
  console.log("GEMINI REQUEST START");
  console.log("MODEL :", process.env.GEMINI_MODEL || "gemini-2.5-flash");
  console.log("SIZE  :", base64Image.length);
  console.log("================================");

  try {

    const response = await ai.models.generateContent({

      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",

      contents: [
        {
          role: "user",

          parts: [

            {
              text:
                PALM_READING_SYSTEM_PROMPT +
                "\n\nAnalyze this palm image."
            },

            {
              inlineData: {
                mimeType,
                data: base64Image
              }
            }

          ]
        }
      ]

    });

    console.log("========== FULL GEMINI RESPONSE ==========");
console.dir(response, { depth: null });

const raw =
  response.text ||
  response.outputText ||
  response.candidates?.[0]?.content?.parts?.[0]?.text;

console.log("RAW RESPONSE:");
console.log(raw);

    console.log("========== GEMINI SUCCESS ==========");
    console.log(raw);

    if (!raw) {
      throw new Error("Gemini returned empty response");
    }

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (e) {

    console.log("========== GEMINI ERROR ==========");

    console.log("Message :", e.message);
    console.log("Status  :", e.status);
    console.log("Code    :", e.code);

    console.dir(e, { depth: null });

    throw e;

  }

}

module.exports = {
  analyzePalmImage,
  PALM_READING_SYSTEM_PROMPT
};