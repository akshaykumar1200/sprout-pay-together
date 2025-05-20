
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignupFormProps {
  role: "parent" | "child";
}

const SignupForm: React.FC<SignupFormProps> = ({ role }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    // Mock signup - in a real app we would call an API
    toast({
      title: "Account created!",
      description: "Welcome to Sprout Pay Together!",
    });
    
    setTimeout(() => {
      navigate(role === "parent" ? "/parent-dashboard" : "/child-dashboard");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Full Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      {role === "child" && (
        <div className="space-y-2">
          <Label htmlFor="dob" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date of Birth
          </Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      )}

      <Button type="submit" className="w-full btn-primary mt-6">
        Create Account
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default SignupForm;
