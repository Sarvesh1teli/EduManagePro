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
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Notification, Student } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("send");
  const [formData, setFormData] = useState({
    recipientType: "",
    recipientId: "",
    type: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const { data: notifications = [], isLoading, error } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
  });

  const { data: students = [], isLoading: studentsLoading, error: studentsError } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const createNotificationMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        recipientType: data.recipientType,
        recipientId: data.recipientId ? parseInt(data.recipientId) : 0,
        type: data.type,
        subject: data.subject || null,
        message: data.message,
        status: "pending" as const,
        sentAt: null,
        errorMessage: null,
      };
      return await apiRequest("/api/notifications", "POST", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
      setFormData({
        recipientType: "",
        recipientId: "",
        type: "",
        subject: "",
        message: "",
      });
      setActiveTab("history");
      toast({
        title: "Success",
        description: "Notification queued successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!formData.recipientType || !formData.type || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const requiresRecipient = !formData.recipientType.startsWith("all-");
    if (requiresRecipient && !formData.recipientId) {
      toast({
        title: "Validation Error",
        description: "Please select a recipient",
        variant: "destructive",
      });
      return;
    }

    createNotificationMutation.mutate({
      recipientType: formData.recipientType,
      recipientId: formData.recipientId,
      type: formData.type,
      subject: formData.subject,
      message: formData.message,
    });
  };

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
              <p className="text-2xl font-bold">
                {notifications.filter((n) => n.type === "email" && n.status === "sent").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-chart-2" />
            <div>
              <p className="text-sm text-muted-foreground">SMS Sent</p>
              <p className="text-2xl font-bold">
                {notifications.filter((n) => n.type === "sms" && n.status === "sent").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Send className="w-8 h-8 text-chart-3" />
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">
                {notifications.filter((n) => n.status === "pending").length}
              </p>
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
                  <Select 
                    value={formData.recipientType} 
                    onValueChange={(value) => setFormData({ 
                      ...formData, 
                      recipientType: value,
                      recipientId: value.startsWith("all-") ? "0" : ""
                    })}
                  >
                    <SelectTrigger className="mt-2" id="recipientType" data-testid="select-recipient-type">
                      <SelectValue placeholder="Select recipient type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Specific Student</SelectItem>
                      <SelectItem value="all-students">All Students</SelectItem>
                      <SelectItem value="staff">Specific Staff</SelectItem>
                      <SelectItem value="all-staff">All Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.recipientType === "student" && (
                  <div>
                    <Label htmlFor="recipient">Select Student</Label>
                    {studentsError ? (
                      <p className="mt-2 text-sm text-destructive">Error loading students</p>
                    ) : studentsLoading ? (
                      <p className="mt-2 text-sm text-muted-foreground">Loading students...</p>
                    ) : (
                      <Select 
                        value={formData.recipientId} 
                        onValueChange={(value) => setFormData({ ...formData, recipientId: value })}
                        disabled={studentsLoading}
                      >
                        <SelectTrigger className="mt-2" id="recipient" data-testid="select-recipient">
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id.toString()}>
                              {student.name} ({student.rollNumber})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}
                <div>
                  <Label htmlFor="notificationType">Notification Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
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
                <Input 
                  id="subject" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Enter subject" 
                  className="mt-2" 
                  data-testid="input-subject" 
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter your message"
                  className="mt-2 min-h-32"
                  data-testid="textarea-message"
                />
              </div>
              <div className="flex items-center justify-end gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setFormData({
                    recipientType: "",
                    recipientId: "",
                    type: "",
                    subject: "",
                    message: "",
                  })}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={createNotificationMutation.isPending}
                  data-testid="button-send-notification"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {createNotificationMutation.isPending ? "Sending..." : "Send Notification"}
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
            {error ? (
              <div className="p-8 text-center text-destructive">
                Error loading notifications. Please try refreshing the page.
              </div>
            ) : isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No notifications sent yet. Send your first notification to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Recipient Type</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Subject</TableHead>
                    <TableHead className="font-semibold">Message</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id} data-testid={`row-notification-${notification.id}`}>
                      <TableCell className="font-medium capitalize">{notification.recipientType}</TableCell>
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
                      <TableCell className="text-sm">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
