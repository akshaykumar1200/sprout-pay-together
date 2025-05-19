
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, SendHorizonal } from "lucide-react";
import { mockChildren } from "@/lib/mockData";

const SendMoney: React.FC = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedChild, setSelectedChild] = useState(mockChildren[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedChild || !amount) {
      toast({
        title: "Missing information",
        description: "Please select a child and enter an amount",
        variant: "destructive",
      });
      return;
    }
    
    // Mock sending money
    toast({
      title: "Money sent!",
      description: `₹${amount} has been sent to ${mockChildren.find(c => c.id === selectedChild)?.name}`,
    });
    
    // Reset form
    setAmount("");
    setNote("");
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SendHorizonal className="h-5 w-5 text-sprout-purple" />
          <CardTitle>Send Money</CardTitle>
        </div>
        <CardDescription>
          Send money to your child's account instantly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="child">Select Child</Label>
            <select
              id="child"
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="input-field"
              required
            >
              <option value="" disabled>
                Select a child
              </option>
              {mockChildren.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Input
              id="note"
              placeholder="What's this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field"
            />
          </div>

          <Button type="submit" className="w-full btn-primary mt-6">
            Send Money
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SendMoney;
