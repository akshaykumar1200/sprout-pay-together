
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findChildByEmail, findParentByEmail } from "@/lib/mockData";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  role: "parent" | "child";
}

const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Login logic
    let user;
    if (role === "parent") {
      user = findParentByEmail(formData.email);
    } else {
      user = findChildByEmail(formData.email);
    }
    
    if (user) {
      // Mock successful login - in a real app we would verify password
      toast({
        title: "Login successful!",
        description: "Welcome back!",
      });
      
      setTimeout(() => {
        navigate(role === "parent" ? "/parent-dashboard" : "/child-dashboard");
      }, 1000);
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <Button type="submit" className="w-full btn-primary mt-6">
        Sign In
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default LoginForm;
