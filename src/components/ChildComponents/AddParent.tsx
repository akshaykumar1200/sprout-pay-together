
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight, Copy } from "lucide-react";

const AddParent: React.FC = () => {
  const { toast } = useToast();
  const [parentEmail, setParentEmail] = useState("");
  const inviteCode = "SPROUT" + Math.floor(100000 + Math.random() * 900000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!parentEmail) {
      toast({
        title: "Missing information",
        description: "Please enter your parent's email",
        variant: "destructive",
      });
      return;
    }
    
    // Mock sending invitation
    toast({
      title: "Invitation sent!",
      description: `We've sent an invitation to ${parentEmail}`,
    });
    
    // Reset form
    setParentEmail("");
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast({
      title: "Copied to clipboard",
      description: "You can now share this code with your parent",
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-sprout-blue" />
          <CardTitle>Connect with Parent</CardTitle>
        </div>
        <CardDescription>
          Link your account with your parent for supervision and support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentEmail">Parent's Email</Label>
            <Input
              id="parentEmail"
              type="email"
              placeholder="Enter your parent's email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="bg-sprout-gray-light/50 dark:bg-sprout-gray-dark/20 rounded-lg p-4 mt-6">
            <p className="text-sm font-medium mb-2">Your Invite Code</p>
            <div className="flex items-center justify-between bg-white dark:bg-black/30 p-2 rounded-md">
              <span className="font-mono text-lg tracking-wider px-2">
                {inviteCode}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopyCode}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this code with your parent to connect your accounts
            </p>
          </div>

          <Button type="submit" className="w-full btn-accent mt-6">
            Send Invitation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-center text-muted-foreground">
        Your parent will receive an email with instructions to connect
      </CardFooter>
    </Card>
  );
};

export default AddParent;
