"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export async function updateUser(data){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where:{
            clerkUserId:userId,
        }
    });

    if(!user) throw new Error ("User Not Found");

    try {
        const result = await db.$transaction(
            
        async(tx)=>{
        //find if the industry exsits 
        let industryInsight = await tx.industryInsight.findUnique({
            where:{
                industry:data.industry,
            }
        })
        //if industry dosen't exist, create it with default values -will replace it with ai later
        if(!industryInsight){
            industryInsight = await tx.industryInsight.create({
                data:{
                    industry:data.industry,
                    salaryRanges:[],
                    growthRate:0,
                    demandLevel:"MEDIUM",
                    topSkills:[],
                    marketOutlook:"NEUTRAL",
                    keyTrends:[],
                    recommendedSkills:[],
                    nextUpdate:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 ), //1 week from now    
                },
            })
        }


        //update the user
        const updatedUser = await tx.user.update({
            where:{
                clerkUserId:userId,
            },
            data:{
                industry:data.industry,
                experience:data.experience,
                bio:data.bio,
                skills:data.skills
            },
        });

        return {updatedUser,industryInsight}
    },
        
        {
            timeout:10000,
        }
    );
    
    return {success:true, ...result};

    } catch (error) {
        console.error("Error updating user and industry:",error.message);
        throw new Error("Failed to update profile");
    }
}

export async function getUserOnBoardingStatus(){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where:{
            clerkUserId:userId,
        }
    });

    if(!user) throw new Error ("User Not Found");

    try {
        const user = await db.user.findUnique({
            where:{
                clerkUserId:userId,
            },
            select:{
                industry:true,
            },
        });

        return {
            isOnboarded:!!user?.industry,
        };
    } catch (error) {
        console.error("Error Checking onboarding status",error);
        throw new Error("Failed to check onboarding status")
    }
}