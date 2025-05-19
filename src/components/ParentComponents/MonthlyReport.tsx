
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { FileChartBar } from "lucide-react";
import { Parent, Child, MonthlyReport as MonthlyReportType } from "@/lib/types";
import { mockMonthlyReports } from "@/lib/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MonthlyReportProps {
  user: Parent;
}

const MonthlyReport: React.FC<MonthlyReportProps> = ({ user }) => {
  const [selectedChild, setSelectedChild] = useState<Child>(user.children[0]);
  const [selectedMonth, setSelectedMonth] = useState<string>("2023-05"); // Default to May 2023
  
  const reportKey = `${selectedChild.name.toLowerCase().split(' ')[0]}-${selectedMonth}`;
  const report = mockMonthlyReports[reportKey];
  
  if (!report) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Monthly Financial Report</h2>
          <div className="flex space-x-4">
            <select 
              className="bg-background border rounded py-1 px-3 text-sm"
              value={selectedChild.id}
              onChange={(e) => {
                const child = user.children.find(c => c.id === e.target.value);
                if (child) setSelectedChild(child);
              }}
            >
              {user.children.map((child) => (
                <option key={child.id} value={child.id}>{child.name}</option>
              ))}
            </select>
            <select 
              className="bg-background border rounded py-1 px-3 text-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="2023-05">May 2023</option>
              <option value="2023-04">April 2023</option>
            </select>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">No Report Available</CardTitle>
            <CardDescription>There is no financial report available for {selectedChild.name} for the selected month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <FileChartBar className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Reports are generated at the end of each month. Check back later!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Categories for the chart
  const spendingData = [
    { name: "Spent", value: report.totalSpent, color: "#ea384c" },
    { name: "Saved", value: report.totalSaved, color: "#9b87f5" }
  ];
  
  // Activities tracking
  const activities = [
    { name: "FDs Created", value: report.fdsCreated, target: 1 },
    { name: "Goals Achieved", value: report.goalsAchieved, target: 1 },
    { name: "Rewards Earned", value: report.rewardsEarned, target: 2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Monthly Financial Report</h2>
        <div className="flex space-x-4">
          <select 
            className="bg-background border rounded py-1 px-3 text-sm"
            value={selectedChild.id}
            onChange={(e) => {
              const child = user.children.find(c => c.id === e.target.value);
              if (child) setSelectedChild(child);
            }}
          >
            {user.children.map((child) => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
          <select 
            className="bg-background border rounded py-1 px-3 text-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="2023-05">May 2023</option>
            <option value="2023-04">April 2023</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Financial Overview</CardTitle>
            <CardDescription>
              {report.month} {report.year} Summary for {selectedChild.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-full h-[200px]">
                <ChartContainer 
                  config={{
                    spent: { color: "#ea384c", label: "Spent" },
                    saved: { color: "#9b87f5", label: "Saved" }
                  }}
                >
                  <BarChart data={spendingData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="value">
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
              
              <div className="w-full mt-4">
                <div className="text-sm text-center mb-2">
                  Total Money Movement: ₹{(report.totalSpent + report.totalSaved).toLocaleString()}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Spent: ₹{report.totalSpent.toLocaleString()}</span>
                  <span>Saved: ₹{report.totalSaved.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activity Progress</CardTitle>
            <CardDescription>Tracking financial activities & achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{activity.name}</span>
                    <span>{activity.value} / {activity.target}</span>
                  </div>
                  <Progress value={(activity.value / activity.target) * 100} />
                </div>
              ))}
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Insights & Recommendations</h4>
                <p className="text-xs text-muted-foreground">
                  {selectedChild.name} saved {Math.round((report.totalSaved / (report.totalSpent + report.totalSaved)) * 100)}% 
                  of received money this month.
                  {report.totalSaved > report.totalSpent ? 
                    " Great saving habit!" : 
                    " Consider setting a higher saving target."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Transaction History</CardTitle>
            <CardDescription>All transactions for {report.month} {report.year}</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === "payment" ? "destructive" : "default"} className="capitalize">
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.recipient}</TableCell>
                      <TableCell className="text-right font-mono">
                        <span className={transaction.type === "payment" ? "text-red-500" : "text-green-500"}>
                          {transaction.type === "payment" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            
            <div className="mt-4 flex justify-center">
              <button 
                className="text-xs text-sprout-purple flex items-center hover:underline"
                onClick={() => alert("Download functionality will be implemented soon!")}
              >
                <FileChartBar className="h-4 w-4 mr-1" /> Download Report PDF
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyReport;
