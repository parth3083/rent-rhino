import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum Ticket_Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN PROGRESS",
  RESOLVED = "RESOLVED",
}
function NotificationPageContent() {
  const NOTIFICATION_DATA = {
    title: "Notification Title",
    description:
      "This is the description of the notification page. It contains information about  the notification page.",
    time: "2023-01-01 12:00:00",
    status: Ticket_Status.RESOLVED,
    owner_name: "John Doe",
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center  gap-2 sm:gap-5">
            <h2 className="text-lg">{NOTIFICATION_DATA.title}</h2>
            <span
              className={`text-xs px-3 py-0.5 rounded-full ${
                NOTIFICATION_DATA?.status === Ticket_Status.OPEN
                  ? "bg-deepBlue-200 text-deepBlue-500"
                  : NOTIFICATION_DATA?.status === Ticket_Status.IN_PROGRESS
                  ? "bg-yellow-200 text-yellow-600"
                  : NOTIFICATION_DATA?.status === Ticket_Status.RESOLVED
                  ? "bg-green-200 text-green-600"
                  : ""
              }`}
            >
              {NOTIFICATION_DATA.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base ">{NOTIFICATION_DATA.description}</p>
        </CardContent>
        <CardFooter className="flex items-start gap-2">
          <p className="text-sm ">{NOTIFICATION_DATA.time}</p>
          <p className="text-sm font-medium opacity-100 ">
            {NOTIFICATION_DATA.owner_name}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NotificationPageContent;
