import { Button } from "@/components/ui/button";
import { GraduationCap, BarChart, Users, FileText } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-semibold">School Management System</span>
          </div>
          <Button onClick={handleLogin} data-testid="button-login">
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">
              Streamline Your School Operations
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive school management platform for administrators, teachers, and accountants
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={handleLogin} data-testid="button-get-started">
              Get Started
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-card rounded-lg border">
              <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Student & Staff Management</h3>
              <p className="text-muted-foreground">
                Efficiently manage student records, staff information, and attendance tracking
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border">
              <BarChart className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Financial Management</h3>
              <p className="text-muted-foreground">
                Track fees, expenses, income, and generate comprehensive financial reports
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border">
              <FileText className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Reports & Analytics</h3>
              <p className="text-muted-foreground">
                Generate detailed reports for students, staff, finances, and vendor payments
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-background p-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 School Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
