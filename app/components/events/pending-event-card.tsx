import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Event } from "~/store/event-store";

interface PendingEventCardProps {
  event: Event;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function PendingEventCard({ event, onApprove, onReject }: PendingEventCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-1">
          <h3 className="font-semibold">{event.name}</h3>
          <p className="text-sm text-muted-foreground">
            {event.organizer} - {event.date.toLocaleDateString()}
          </p>
          <div className="h-2 w-36 bg-muted rounded mt-2"></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="outline" 
          className="flex-1"
          onClick={() => onReject(event.id)}
        >
          Reject
        </Button>
        <Button 
          className="flex-1"
          onClick={() => onApprove(event.id)}
        >
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
}
