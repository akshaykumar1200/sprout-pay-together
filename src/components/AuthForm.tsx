
import React from "react";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

interface AuthFormProps {
  type: "login" | "signup";
  role: "parent" | "child";
}

const AuthForm: React.FC<AuthFormProps> = ({ type, role }) => {
  return (
    <AuthCard type={type} role={role}>
      {type === "login" ? (
        <LoginForm role={role} />
      ) : (
        <SignupForm role={role} />
      )}
    </AuthCard>
  );
};

export default AuthForm;
