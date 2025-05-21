import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { 
  ProfileFormValues, 
  profileFormSchema 
} from "~/schemas/profile-schema";
import { Plus } from "lucide-react";
import { useProfileStore } from "~/store/profile";

export function ProfileSection() {
  const { profile, updateProfile } = useProfileStore();
  const [urls, setUrls] = useState<string[]>(profile.urls.length ? profile.urls : ['']);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile.username || '',
      email: profile.email || '',
      bio: profile.bio || '',
      urls: urls,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    updateProfile(data);
    toast.success("Your profile has been updated");
  }

  const addUrlField = () => {
    setUrls([...urls, '']);
    profileForm.setValue('urls', [...profileForm.getValues('urls'), '']);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          This is how others will see you on the site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={profileForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name or a pseudonym.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Select a verified email to display" />
                  </FormControl>
                  <FormDescription>
                    You can manage verified email addresses in your email settings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio Field */}
            <FormField
              control={profileForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Tell us a bit about yourself" />
                  </FormControl>
                  <FormDescription>
                    You can @mention other users and organizations to link to them.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URLs Section */}
            <div>
              <FormLabel>URLs</FormLabel>
              <FormDescription className="mb-2">
                Add links to your website, blog, or social media profiles.
              </FormDescription>
              {urls.map((_, index) => (
                <FormField
                  key={index}
                  control={profileForm.control}
                  name={`urls.${index}`}
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormControl>
                        <Input {...field} placeholder="https://example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addUrlField}
              >
                <Plus className="mr-2 h-4 w-4" /> Add URL
              </Button>
            </div>

            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 