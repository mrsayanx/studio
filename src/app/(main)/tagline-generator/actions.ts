"use server";

import { generateTaglines, GenerateTaglinesInput, GenerateTaglinesOutput } from "@/ai/flows/generate-taglines";

export async function generateTaglinesAction(
  input: GenerateTaglinesInput
): Promise<{ success: boolean; data?: GenerateTaglinesOutput; error?: string }> {
  try {
    const output = await generateTaglines(input);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error generating taglines:", error);
    return { success: false, error: "Failed to generate taglines. Please try again." };
  }
}
