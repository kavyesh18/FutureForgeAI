
# **Future Forge AI – Your AI-Driven Mentor for Professional Success**  

Future Forge AI is an advanced AI-powered mentor designed to help professionals excel in their careers. It offers intelligent career-building tools, including AI-powered resume creation, industry trend analysis, cover letter generation, and interview preparation.  

## **Features**  

🚀 **AI Resume Builder** – Generate optimized resumes tailored to your industry.  
📊 **AI-Based Industry Trends** – Stay updated with the latest industry insights, refreshed weekly.  
✉️ **AI Cover Letter Generator** – Craft personalized cover letters to boost your job applications.  
🎤 **AI-Based Interview Preparation** – Get real-time interview feedback and AI-driven insights.  
📈 **Career Improvement Insights** – Receive personalized career improvement suggestions.  

## **Tech Stack**  

- **Frontend:** [Next.js](https://nextjs.org), [ShadCN UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)  
- **Form Handling:** [React Hook Form](https://react-hook-form.com/), [Zod Resolvers](https://github.com/react-hook-form/resolvers)  
- **Database & ORM:** [Neon DB](https://neon.tech/), [Prisma ORM](https://www.prisma.io/)  
- **Authentication:** [Clerk](https://clerk.dev/)  
- **Cron Jobs:** [Inngest](https://www.inngest.com/) (automatically updates industry trends weekly)  

## **Getting Started**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/your-username/future-forge-ai.git
cd future-forge-ai
```

### **2. Install Dependencies**  
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### **3. Set Up the Database**  
- Configure Neon DB with Prisma ORM  
- Run database migrations  
```bash
npx prisma migrate dev --name init
```

### **4. Start the Development Server**  
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## **Deployment**  
The easiest way to deploy your Next.js app is via [Vercel](https://vercel.com/).  

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).  

## **Contributing**  
Contributions are welcome! Feel free to fork the repo, submit pull requests, and suggest new features.  
