"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, SaveIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ResumeBuilder = ({ initialContent }) => {
  const [activeTab, setActiveTab] = useState("edit");

  useForm()

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          Resume Builder
        </h1>

        <div className="space-x-2">
          <Button variant="destructive">
            <SaveIcon className="h-4 w-4" />
            Save
          </Button>
          <Button>
            <Download className="h-4 w-4" />
            Download Pdf
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="account">Form</TabsTrigger>
          <TabsTrigger value="password">MarkDown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="preview">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
