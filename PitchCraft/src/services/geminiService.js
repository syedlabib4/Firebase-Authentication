import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generatePitch = async (idea, industry, tone = 'professional') => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Generate a comprehensive startup pitch for the following idea:
    
    Idea: ${idea}
    Industry: ${industry}
    Tone: ${tone}
    
    Please provide a JSON response with the following structure:
    {
      "startupName": "Creative startup name",
      "tagline": "Catchy tagline",
      "elevatorPitch": "2-3 line elevator pitch",
      "problemStatement": "Clear problem description",
      "solutionStatement": "How your solution addresses the problem",
      "targetAudience": "Primary target audience description",
      "uniqueValueProposition": "What makes this unique",
      "landingPageCopy": {
        "heroTitle": "Main headline",
        "heroSubtitle": "Supporting subtitle",
        "features": ["Feature 1", "Feature 2", "Feature 3"],
        "callToAction": "Primary CTA text"
      },
      "colorPalette": {
        "primary": "#3B82F6",
        "secondary": "#10B981",
        "accent": "#F59E0B"
      }
    }
    
    Make it professional, compelling, and suitable for investors. The startup name should be memorable and brandable.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Invalid response format from AI');
    }
  } catch (error) {
    console.error('Error generating pitch:', error);
    throw new Error('Failed to generate pitch. Please try again.');
  }
};
