import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: Date;
  type: "student" | "staff" | "financial" | "vendor";
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "student":
        return "bg-chart-1/10 text-chart-1";
      case "staff":
        return "bg-chart-2/10 text-chart-2";
      case "financial":
        return "bg-chart-3/10 text-chart-3";
      case "vendor":
        return "bg-chart-4/10 text-chart-4";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3" data-testid={`activity-${activity.id}`}>
            <Avatar className={`w-8 h-8 ${getTypeColor(activity.type)}`}>
              <AvatarFallback className={getTypeColor(activity.type)}>
                {activity.user.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
