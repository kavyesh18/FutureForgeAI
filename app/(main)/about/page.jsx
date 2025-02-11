"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Linkedin, Instagram, Github } from "lucide-react";

const Typewriter = dynamic(() => import("react-typewriter-effect"), { ssr: false });

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <h1 className="gradient-title text-4xl font-bold mb-10">About the Developer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        <div className="flex items-center justify-center">
          <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-purple-500">
            <img src="/IMG_20230918_124815.jpg" alt="Badugu Kavyesh Raj" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          
          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-white">
                <Typewriter text="Badugu Kavyesh Raj" typeSpeed={100} cursor />
              </CardTitle>
              <CardDescription>Full Stack Web Developer | MERN Stack | Java</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
              Passionate Full Stack Developer skilled in React.js, Next.js, Node.js, and MongoDB, with a strong backend foundation in Java, Spring Boot, and MySQL. I enjoy building scalable, high-performance web applications while exploring new technologies. Experienced in RESTful APIs, state management, and cloud computing, I strive to create efficient and impactful digital solutions. 🚀
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Connect with me</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around">
              <a href="https://www.linkedin.com/in/badugu-kavyesh-raj-263697246/" target="_blank" className="text-blue-500 text-2xl hover:text-blue-400">
                <Linkedin />
              </a>
              <a href="https://www.instagram.com/kavyesh_raj?igsh=MWpvYjlkaWNyeGJqZQ==" target="_blank" className="text-pink-500 text-2xl hover:text-pink-400">
                <Instagram />
              </a>
              <a href="https://github.com/kavyesh18" target="_blank" className="text-gray-400 text-2xl hover:text-gray-300">
                <Github />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
