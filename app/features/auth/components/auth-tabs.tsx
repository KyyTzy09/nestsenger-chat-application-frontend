import { Key, MailIcon, Tag } from "lucide-react";
import React from "react";
import { Button } from "shared/shadcn/button";
import { Input } from "shared/shadcn/input";
import { Label } from "shared/shadcn/label";
import { Separator } from "shared/shadcn/separator";
import RegisterForm from "./forms/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/shadcn/tabs";
import RegisterSection from "./sections/register-section";
import LoginSection from "./sections/login-section";

export default function AuthTabs() {
  const [value, setValue] = React.useState<string>("login");
  return (
    <Tabs value={value} onValueChange={setValue} className="w-full">
      <TabsList>
        <TabsTrigger value="register">Daftar</TabsTrigger>
        <TabsTrigger value="login">Masuk</TabsTrigger>
      </TabsList>
      <TabsContent
        value="register"
        className="flex flex-col items-center justify-center w-full h-full shadow-sm shadow-black gap-2 bg-white border-black border rounded-lg"
      >
        <RegisterSection setValue={setValue} />
      </TabsContent>
      <TabsContent
        value="login"
        className="flex flex-col items-center justify-center w-full h-full shadow-sm shadow-black gap-2 bg-white border-black border rounded-lg"
      >
        <LoginSection />
      </TabsContent>
    </Tabs>
  );
}
