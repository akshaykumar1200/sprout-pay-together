
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
  type: "login" | "signup";
  role: "parent" | "child";
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ type, role, children }) => {
  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {type === "login" ? "Welcome back!" : "Create your account"}
        </CardTitle>
        <CardDescription className="text-center">
          {type === "login"
            ? `Sign in as a ${role}`
            : `Sign up as a ${role} to get started`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <p className="text-sm text-center">
          {type === "login" ? "Don't have an account? " : "Already have an account? "}
          <a
            href={type === "login" ? `/signup?role=${role}` : `/login?role=${role}`}
            className="text-sprout-purple hover:text-sprout-purple-dark font-medium underline underline-offset-2"
          >
            {type === "login" ? "Sign Up" : "Log In"}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
