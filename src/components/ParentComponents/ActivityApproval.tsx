
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Eye, Clock } from "lucide-react";
import { mockChildren } from "@/lib/mockData";

interface ApprovalItem {
  id: string;
  childId: string;
  childName: string;
  type: string;
  description: string;
  amount: number;
  date: string;
}

const mockApprovals: ApprovalItem[] = [
  {
    id: "a1",
    childId: "c1",
    childName: "Arjun Kumar",
    type: "Fixed Deposit",
    description: "Create a new fixed deposit",
    amount: 5000,
    date: "2023-05-17T09:15:00",
  },
  {
    id: "a2",
    childId: "c1",
    childName: "Arjun Kumar",
    type: "Purchase",
    description: "Online purchase at Gadget Store",
    amount: 3500,
    date: "2023-05-16T14:30:00",
  },
];

const ActivityApproval: React.FC = () => {
  const { toast } = useToast();
  const [approvals, setApprovals] = useState<ApprovalItem[]>(mockApprovals);

  const handleApprove = (id: string) => {
    setApprovals((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Request approved",
      description: "The request has been approved successfully",
    });
  };

  const handleReject = (id: string) => {
    setApprovals((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Request rejected",
      description: "The request has been rejected",
      variant: "destructive",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-sprout-purple" />
          <CardTitle>Pending Approvals</CardTitle>
        </div>
        <CardDescription>
          Review and approve your child's pending requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {approvals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pending approvals at the moment
          </div>
        ) : (
          <div className="space-y-4">
            {approvals.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-sprout-orange animate-pulse"></div>
                    <h4 className="font-medium">{item.type}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.childName} - {item.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-sm font-semibold">₹{item.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(item.date)}</p>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => toast({
                      title: "View details",
                      description: `Viewing details for ${item.description}`
                    })}
                  >
                    <Eye className="h-4 w-4" />
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                    onClick={() => handleReject(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                    onClick={() => handleApprove(item.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityApproval;
