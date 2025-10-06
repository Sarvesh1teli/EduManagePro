import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@shared/schema";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import Staff from "@/pages/Staff";
import Financial from "@/pages/Financial";
import Vendors from "@/pages/Vendors";
import Reports from "@/pages/Reports";
import Renewals from "@/pages/Renewals";
import Notifications from "@/pages/Notifications";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/not-found";

function Router() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar userRole="Admin" userName="Admin User" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b border-border bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6 bg-background">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/students" component={Students} />
              <Route path="/staff" component={Staff} />
              <Route path="/financial" component={Financial} />
              <Route path="/vendors" component={Vendors} />
              <Route path="/reports" component={Reports} />
              <Route path="/renewals" component={Renewals} />
              <Route path="/notifications" component={Notifications} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Router />
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
