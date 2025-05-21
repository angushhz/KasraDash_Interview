import { useState } from "react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Post } from "~/store/post-store";

interface ReportedPostCardProps {
  post: Post;
  onView: (id: string) => void;
}

export function ReportedPostCard({ post, onView }: ReportedPostCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="space-y-1">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              by {post.author} - {post.createdAt.toLocaleDateString()}
            </p>
            <div className="h-2 w-full bg-muted rounded mt-2"></div>
            <div className="h-2 w-2/3 bg-muted rounded mt-1.5"></div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
            View
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              by {post.author} - {post.createdAt.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>{post.content}</p>
            <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              <strong>Reason for report:</strong> This content was flagged for
              review by users.
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onView(post.id);
                setIsDialogOpen(false);
              }}
            >
              Delete Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
