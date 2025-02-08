import { industries } from "@/data/industries"
import OnBoardingForm from "./_components/on-boarding-form"
import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";


const OnBoardingPage = async() => {
    const {isOnboarded} = await getUserOnBoardingStatus();
    if(isOnboarded){
      redirect("/dashboard")
    }
  return <main>
    <OnBoardingForm  industries={industries}/>
  </main>
  
}

export default OnBoardingPage