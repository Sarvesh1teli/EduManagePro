import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("send");

  const mockNotifications = [
    {
      id: 1,
      recipientType: "student",
      recipientName: "Alice Johnson",
      type: "email",
      subject: "Fee Payment Reminder",
      message: "Your quarterly fee payment is due on April 30th.",
      status: "sent",
      sentAt: "2024-01-15 10:30 AM",
    },
    {
      id: 2,
      recipientType: "guardian",
      recipientName: "Bob Smith (Guardian)",
      type: "sms",
      subject: null,
      message: "Reminder: Parent-teacher meeting on Jan 20th.",
      status: "sent",
      sentAt: "2024-01-14 2:15 PM",
    },
    {
      id: 3,
      recipientType: "staff",
      recipientName: "Dr. Sarah Johnson",
      type: "email",
      subject: "Staff Meeting",
      message: "Monthly staff meeting scheduled for Jan 25th.",
      status: "pending",
      sentAt: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "pending":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Notifications</h1>
        <p className="text-muted-foreground">Send email and SMS notifications to students, guardians, and staff</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Emails Sent</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-chart-2" />
            <div>
              <p className="text-sm text-muted-foreground">SMS Sent</p>
              <p className="text-2xl font-bold">89</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Send className="w-8 h-8 text-chart-3" />
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="send" data-testid="tab-send">Send Notification</TabsTrigger>
          <TabsTrigger value="history" data-testid="tab-history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Compose Notification</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="recipientType">Recipient Type</Label>
                  <Select>
                    <SelectTrigger className="mt-2" id="recipientType" data-testid="select-recipient-type">
                      <SelectValue placeholder="Select recipient type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="guardian">Guardian</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="all-students">All Students</SelectItem>
                      <SelectItem value="all-staff">All Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notificationType">Notification Type</Label>
                  <Select>
                    <SelectTrigger className="mt-2" id="notificationType" data-testid="select-notification-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Email & SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject (Email only)</Label>
                <Input id="subject" placeholder="Enter subject" className="mt-2" data-testid="input-subject" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  className="mt-2 min-h-32"
                  data-testid="textarea-message"
                />
              </div>
              <div className="flex items-center justify-end gap-4">
                <Button variant="outline" data-testid="button-cancel">
                  Cancel
                </Button>
                <Button data-testid="button-send-notification">
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h4 className="font-semibold mb-2">Setup Required</h4>
            <p className="text-sm text-muted-foreground mb-4">
              To send email and SMS notifications, you need to configure email and SMS service integrations.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">Configure Email Service</Button>
              <Button variant="outline" size="sm">Configure SMS Service</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Recipient</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Subject</TableHead>
                  <TableHead className="font-semibold">Message</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Sent At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockNotifications.map((notification) => (
                  <TableRow key={notification.id} data-testid={`row-notification-${notification.id}`}>
                    <TableCell className="font-medium">{notification.recipientName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {notification.type === "email" ? <Mail className="w-3 h-3 mr-1" /> : <MessageSquare className="w-3 h-3 mr-1" />}
                        {notification.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{notification.subject || "-"}</TableCell>
                    <TableCell className="max-w-xs truncate">{notification.message}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(notification.status)}>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{notification.sentAt || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
