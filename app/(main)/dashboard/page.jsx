
import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboardview";

const IndustryInsightsPage = async() => {
   const {isOnboarded} =  await getUserOnBoardingStatus();
   const insights = await getIndustryInsights();
   if(!isOnboarded){
    redirect("/onboarding")
   }
  return (
    <div className="container mx-auto ">
        <DashboardView insights={insights}/>
    </div>
  )
}

export default IndustryInsightsPage