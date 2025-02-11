"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    console.log("Received data:", data); // Debugging

    if (!data.industry || typeof data.industry !== "string") {
        console.error("Industry is missing or invalid:", data.industry);
        throw new Error("Industry field is required and must be a valid string.");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });

    if (!user) {
        console.error("User not found for clerkUserId:", userId);
        throw new Error("User Not Found");
    }

    try {
        const result = await db.$transaction(async (tx) => {
            // Check if the industry already exists
            let industryInsight = await tx.industryInsight.findFirst({
                where: {
                    industry: data.industry,
                },
            });

            console.log("Existing industry insight:", industryInsight);

            // If industry doesn't exist, generate AI insights and create it
            if (!industryInsight) {
                console.log("Generating AI insights for industry:", data.industry);
                const insights = await generateAIInsights(data.industry);

                if (!insights || typeof insights !== "object") {
                    console.error("AI insights generation failed for:", data.industry);
                    throw new Error("Failed to generate industry insights.");
                }

                industryInsight = await tx.industryInsight.create({
                    data: {
                        industry: data.industry,
                        ...insights,
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
                    },
                });

                console.log("Created new industry insight:", industryInsight);
            }

            // Update the user with new details
            const updatedUser = await tx.user.update({
                where: {
                    clerkUserId: userId,
                },
                data: {
                    industry: data.industry,
                    experience: data.experience || null,
                    bio: data.bio || null,
                    skills: data.skills || [],
                },
            });

            console.log("User updated successfully:", updatedUser);

            return { updatedUser, industryInsight };
        }, {
            timeout: 10000,
        });

        console.log("Transaction successful:", result);

        return { success: true, ...result };
    } catch (error) {
        console.error("Error updating user and industry:", error);
        throw new Error("Failed to update profile. " + error.message);
    }
}

export async function getUserOnBoardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            },
        });

        console.log("User onboarding check:", user);

        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:", error);
        throw new Error("Failed to check onboarding status");
    }
}
