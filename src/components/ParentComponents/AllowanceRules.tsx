
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Repeat, ArrowRight, BellRing } from "lucide-react";
import { mockChildren } from "@/lib/mockData";

const AllowanceRules: React.FC = () => {
  const { toast } = useToast();
  const [selectedChild, setSelectedChild] = useState(mockChildren[0]?.id || "");
  const [allowanceAmount, setAllowanceAmount] = useState("1000");
  const [frequency, setFrequency] = useState("monthly");
  const [autoTopUp, setAutoTopUp] = useState(false);
  const [topUpThreshold, setTopUpThreshold] = useState("500");
  const [topUpAmount, setTopUpAmount] = useState("1000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Allowance rules updated!",
      description: `New rules set for ${mockChildren.find(c => c.id === selectedChild)?.name}`,
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-sprout-purple" />
          <CardTitle>Allowance Rules</CardTitle>
        </div>
        <CardDescription>
          Set up recurring allowances and automatic top-ups
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
            <Label htmlFor="amount">Allowance Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={allowanceAmount}
              onChange={(e) => setAllowanceAmount(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="input-field"
              required
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-topup" className="flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-sprout-purple" />
                  Auto Top-up
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically add money when balance is low
                </p>
              </div>
              <Switch
                id="auto-topup"
                checked={autoTopUp}
                onCheckedChange={setAutoTopUp}
              />
            </div>
          </div>
          
          {autoTopUp && (
            <div className="space-y-4 pt-4 pl-4 border-l-2 border-sprout-purple/20">
              <div className="space-y-2">
                <Label htmlFor="threshold" className="flex items-center gap-2">
                  <BellRing className="h-4 w-4" />
                  Low Balance Threshold (₹)
                </Label>
                <Input
                  id="threshold"
                  type="number"
                  placeholder="Enter threshold amount"
                  value={topUpThreshold}
                  onChange={(e) => setTopUpThreshold(e.target.value)}
                  className="input-field"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Auto top-up will trigger when balance falls below this amount
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topUpAmount">Top-up Amount (₹)</Label>
                <Input
                  id="topUpAmount"
                  type="number"
                  placeholder="Enter top-up amount"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full btn-primary mt-6">
            Save Rules
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AllowanceRules;
