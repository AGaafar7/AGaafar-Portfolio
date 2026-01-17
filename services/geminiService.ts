
import { GoogleGenAI, Type } from "@google/genai";
import { PROJECTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Translates natural language queries into terminal commands.
 */
export const translateToCommand = async (input: string): Promise<string | null> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the user prompt into a specific terminal command for a portfolio.
Available commands: help, whoami, education, experience, skills, projects, contact, clear, project list, project describe <name>, project run <name>.
Available projects: ${PROJECTS.map(p => p.id).join(', ')}.

If it matches a specific project name, use project describe or project run.
If the command doesn't fit, return 'unknown'.

User: "${input}"
Result:`,
    config: {
      temperature: 0.1,
      maxOutputTokens: 50,
    }
  });

  const result = response.text?.trim().toLowerCase();
  return result === 'unknown' ? null : result;
};

/**
 * Suggests a corrected command if the user makes a typo.
 */
export const getCommandSuggestion = async (input: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user typed an unknown command: "${input}". 
Based on these valid commands: [help, whoami, education, experience, skills, projects, contact, clear, project list, project describe, project run], 
what is the single most likely command they intended? Just return the command name.`,
    config: {
      temperature: 0.1,
      maxOutputTokens: 20,
    }
  });

  return response.text?.trim().toLowerCase() || 'help';
};

/**
 * Generates an expanded engineering analysis for a project.
 */
export const getAIProjectDeepDive = async (projectId: string): Promise<string> => {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return "Project not found.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a high-level technical engineering analysis of this project:
Project: ${project.name}
Description: ${project.fullDescription}
Stack: ${project.techStack.join(', ')}
Architecture: ${project.architecture}

Provide insights into potential scalability challenges, alternative architectural choices, and performance optimizations. 
Keep it technical and concise, like a senior peer review.`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
    }
  });

  return response.text?.trim() || "Deep dive generation failed.";
};
