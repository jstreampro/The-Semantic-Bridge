
import { GoogleGenAI, Type } from "@google/genai";
import { BridgeResult, ConflictDomain, UserAdjustments } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    literal: { type: Type.STRING, description: "Literal translation of facts." },
    emotionalState: { type: Type.STRING, description: "Primary emotions: fear, anger, pride, panic, etc." },
    culturalMarkers: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Cultural patterns observed (e.g., face-saving, direct aggression, honor-based rhetoric)." 
    },
    powerSignaling: { type: Type.STRING, description: "How the speaker is trying to project power or vulnerability." },
    inferredIntent: { type: Type.STRING, description: "The strategic outcome the speaker actually wants." },
    confidence: { type: Type.NUMBER, description: "Confidence score 0 to 1." },
    reExpression: {
      type: Type.OBJECT,
      properties: {
        message: { type: Type.STRING, description: "The re-expressed message for the target culture." },
        culturalNote: { type: Type.STRING, description: "Why this re-expression works for the receiver." },
        alternatives: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Other possible interpretations." 
        }
      },
      required: ["message", "culturalNote", "alternatives"]
    }
  },
  required: ["literal", "emotionalState", "culturalMarkers", "powerSignaling", "inferredIntent", "confidence", "reExpression"]
};

export async function processBridge(
  input: string, 
  domain: ConflictDomain, 
  adjustments: UserAdjustments
): Promise<BridgeResult> {
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = `
    You are a world-class expert in applied linguistics, conflict resolution, and cultural psychology.
    Your task is to analyze messages in high-tension conflicts and "bridge" them by translating INTENT and TONE, rather than just words.
    
    DE-ESCALATION PROTOCOL:
    1. Identify 'Cultural Noise': Rhetoric that sounds aggressive in the target culture but is defensive or signaling in the source culture.
    2. Extract 'Core Intent': What does the speaker want to happen (or stop happening)?
    3. Re-Express: Rewrite the message for the target audience to preserve the INTENT while removing inflammatory cultural mismatch.
    
    ADJUSTMENTS:
    - Target Intensity Level: ${adjustments.intensity}/100 (Lower = more calm, Higher = closer to original heat)
    - Target Formality: ${adjustments.formality}/100
    - Target Directness: ${adjustments.directness}/100
    
    DOMAIN CONTEXT: ${domain}
    
    NEVER:
    - Fabricate facts.
    - Sanitize legitimate crimes/actions (if a crime is admitted, keep it).
    - Add moral judgment.
    - Hallucinate peaceful intent where there is clear evidence of unprovoked aggression.
    
    ALWAYS:
    - Distinguish between "rhetoric for internal political survival" and "actual tactical threats".
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: `Input message to bridge: "${input}"` }] }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
    }
  });

  const rawJson = JSON.parse(response.text);
  
  return {
    original: input,
    domain,
    analysis: {
      literal: rawJson.literal,
      emotionalState: rawJson.emotionalState,
      culturalMarkers: rawJson.culturalMarkers,
      powerSignaling: rawJson.powerSignaling,
      inferredIntent: rawJson.inferredIntent,
      confidence: rawJson.confidence
    },
    reExpression: {
      message: rawJson.reExpression.message,
      culturalNote: rawJson.reExpression.culturalNote,
      alternatives: rawJson.reExpression.alternatives
    }
  };
}
