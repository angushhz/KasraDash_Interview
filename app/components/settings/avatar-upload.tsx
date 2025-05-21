import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { toast } from "sonner";
import { useProfileStore } from "~/store/profile";
import { Camera, UserRound } from "lucide-react";

export function AvatarUpload() {
  const { avatar, updateAvatar } = useProfileStore();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    // Create a URL for the image to display
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateAvatar(reader.result);
        setIsUploading(false);
        toast.success("Avatar updated successfully");
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.error("Failed to read image file");
    };
    
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    updateAvatar(null);
    toast.success("Avatar removed");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleImageClick}>
            {avatar ? (
              <AvatarImage src={avatar} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary">
                <UserRound className="h-12 w-12" />
              </AvatarFallback>
            )}
          </Avatar>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleImageClick}
              disabled={isUploading}
            >
              <Camera className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload photo"}
            </Button>

            {avatar && (
              <Button 
                variant="outline" 
                onClick={handleRemoveAvatar}
                disabled={isUploading}
              >
                Remove
              </Button>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            Upload a photo for your profile. JPG, PNG or GIF, 5MB max.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}