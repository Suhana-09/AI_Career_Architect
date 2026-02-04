
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, ArchitectResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeCareer = async (profile: UserProfile): Promise<ArchitectResponse> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    As an AI Career Architect, analyze this user profile and provide a detailed career roadmap.
    User Profile:
    - Education: ${profile.education.degree} in ${profile.education.branch} (Year: ${profile.education.year})
    - Current Skills: ${profile.skills.join(', ')}
    - Proficiency: ${profile.proficiency}
    - Target Roles: ${profile.targetRoles.join(', ')}
    - Availability: ${profile.availability}
    - Timeline: ${profile.timeline}
    - Learning Style: ${profile.learningStyle}

    Follow the strict output format required for an Architect analysis. Be realistic, technical, and mentor-like.
    Ensure the readiness score is a number between 0 and 100.
    Provide at least 2 distinct career paths (Fast Track and Balanced Track).
    Provide a 30-day (4-week) action plan.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skillGapAnalysis: {
            type: Type.OBJECT,
            properties: {
              strong: { type: Type.ARRAY, items: { type: Type.STRING } },
              partial: { type: Type.ARRAY, items: { type: Type.STRING } },
              missing: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["strong", "partial", "missing"]
          },
          readinessScore: { type: Type.NUMBER },
          paths: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                readinessLevel: { type: Type.NUMBER },
                confidenceScore: { type: Type.NUMBER },
                tradeOffs: { type: Type.STRING },
              },
              required: ["name", "description", "readinessLevel", "confidenceScore", "tradeOffs"]
            }
          },
          actionPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                week: { type: Type.NUMBER },
                focus: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["week", "focus", "tasks"]
            }
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                skillsGained: { type: Type.ARRAY, items: { type: Type.STRING } },
                relevance: { type: Type.STRING },
                githubStrategy: { type: Type.STRING },
              },
              required: ["name", "skillsGained", "relevance", "githubStrategy"]
            }
          },
          optimizationAdvice: { type: Type.STRING },
          reasoning: { type: Type.STRING },
        },
        required: ["skillGapAnalysis", "readinessScore", "paths", "actionPlan", "projects", "optimizationAdvice", "reasoning"]
      }
    }
  });

  return JSON.parse(response.text);
};
