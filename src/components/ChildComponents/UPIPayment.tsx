
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, User, AtSign, CreditCard, ArrowRight } from "lucide-react";

type PaymentMethod = "qr" | "mobile" | "upi";

const UPIPayment: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<PaymentMethod>("qr");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [qrScanned, setQrScanned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !amount) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Check if amount is within limit
    if (parseFloat(amount) > 2000) {
      toast({
        title: "Payment needs approval",
        description: "Payments over ₹2,000 require parent approval. A request has been sent.",
        variant: "default",
      });
      return;
    }
    
    // Mock payment
    toast({
      title: "Payment successful!",
      description: `₹${amount} has been sent to ${recipient}`,
    });
    
    // Reset form
    setRecipient("");
    setAmount("");
    setNote("");
    setQrScanned(false);
  };
  
  const handleQRScan = () => {
    // Mock QR scanning
    setTimeout(() => {
      setQrScanned(true);
      setRecipient("Coffee Shop");
      toast({
        title: "QR code scanned",
        description: "Recipient details loaded successfully",
      });
    }, 1000);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-sprout-blue" />
          <CardTitle>Make a Payment</CardTitle>
        </div>
        <CardDescription>
          Send money using UPI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-6 border-b">
          <button
            className={`pb-2 px-4 transition ${
              activeTab === "qr"
                ? "border-b-2 border-sprout-blue text-sprout-blue font-medium"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("qr")}
          >
            <div className="flex flex-col items-center gap-1">
              <QrCode className="h-5 w-5" />
              <span className="text-xs">QR Code</span>
            </div>
          </button>
          <button
            className={`pb-2 px-4 transition ${
              activeTab === "mobile"
                ? "border-b-2 border-sprout-blue text-sprout-blue font-medium"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("mobile")}
          >
            <div className="flex flex-col items-center gap-1">
              <User className="h-5 w-5" />
              <span className="text-xs">Mobile</span>
            </div>
          </button>
          <button
            className={`pb-2 px-4 transition ${
              activeTab === "upi"
                ? "border-b-2 border-sprout-blue text-sprout-blue font-medium"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("upi")}
          >
            <div className="flex flex-col items-center gap-1">
              <AtSign className="h-5 w-5" />
              <span className="text-xs">UPI ID</span>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "qr" && (
            <div className="flex flex-col items-center space-y-4">
              {!qrScanned ? (
                <>
                  <div className="w-48 h-48 border-2 border-dashed border-sprout-blue/50 rounded-lg flex items-center justify-center bg-sprout-gray-light/50">
                    <QrCode className="h-12 w-12 text-sprout-blue/40" />
                  </div>
                  <Button
                    type="button"
                    className="btn-accent"
                    onClick={handleQRScan}
                  >
                    Scan QR Code
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-medium">Recipient: {recipient}</p>
                  <p className="text-xs text-muted-foreground">QR code scanned successfully</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "mobile" && (
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter mobile number"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="input-field"
                required
              />
            </div>
          )}

          {activeTab === "upi" && (
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="Enter UPI ID (e.g. name@bank)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="input-field"
                required
              />
            </div>
          )}

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
            <p className="text-xs text-muted-foreground">
              Payments above ₹2,000 require parent approval
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Input
              id="note"
              placeholder="What's this payment for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field"
            />
          </div>

          <Button type="submit" className="w-full btn-accent mt-6">
            Pay Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground">
        Your available balance: ₹1,785
      </CardFooter>
    </Card>
  );
};

export default UPIPayment;
