import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
});

export const generateAIInsights = async (industry) => {
    const prompt = `
        Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
        {
            "salaryRanges": [
                { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
        }
        
        IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
        Include at least 5 common roles for salary ranges.
        Growth rate should be a percentage.
        Include at least 5 skills and trends.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    try {
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Error parsing JSON from Gemini:", error, cleanedText);  // Important debugging
        // Handle the parsing error appropriately.  For example:
        throw new Error("Invalid JSON received from Gemini API."); // Or return a default value.
    }
};

export async function getIndustryInsights() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
        include: {
            industryInsight: true,
        },
    });

    if (!user) throw new Error("User Not Found");

    if (!user.industry) {
        // Handle the case where the user doesn't have an industry.
        console.warn("User has no industry specified."); // Log a warning for debugging

        // Choose one of the following approaches:
        return null; // Or return undefined;  Recommended for now
        // throw new Error("User has no industry specified."); // Or throw an error
        // return { message: "No industry specified" }; // Or return a default value/message
    }

    if (!user.industryInsight) {
        try {
            const insights = await generateAIInsights(user.industry);
            const industryInsight = await db.industryInsight.create({
                data: {
                    industry: user.industry,
                    ...insights,
                    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });
            return industryInsight;
        } catch (error) {
            console.error("Error creating industry insight:", error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }

    return user.industryInsight;
}