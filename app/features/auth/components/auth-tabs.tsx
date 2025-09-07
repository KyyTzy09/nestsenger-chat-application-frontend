import { Key, MailIcon, Tag } from "lucide-react";
import React from "react";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";
import { Separator } from "~/shared/ui/separator";
import RegisterForm from "./forms/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/shared/ui/tabs";
import RegisterSection from "./sections/register-section";
import LoginSection from "./sections/login-section";

export default function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="bg-white font-semibold">
        <TabsTrigger value="register">Daftar</TabsTrigger>
        <TabsTrigger value="login">Masuk</TabsTrigger>
      </TabsList>
      <TabsContent value="register" className="flex flex-col items-center justify-center w-full h-full shadow-sm shadow-black gap-2 bg-white border-black border rounded-lg">
        <RegisterSection />
      </TabsContent>
      <TabsContent value="login" className="flex flex-col items-center justify-center w-full h-full shadow-sm shadow-black gap-2 bg-white border-black border rounded-lg">
        <LoginSection />
      </TabsContent>
    </Tabs>
  );
}
