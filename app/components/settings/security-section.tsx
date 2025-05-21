import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
  PasswordFormValues, 
  passwordFormSchema 
} from "~/schemas/profile-schema";
import { Eye, EyeOff, Key } from "lucide-react";
import { useProfileStore } from "~/store/profile";

export function SecuritySection() {
  const { updatePassword } = useProfileStore();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onPasswordSubmit(data: PasswordFormValues) {
    try {
      setIsPasswordSubmitting(true);
      const success = await updatePassword(data);
      if (success) {
        toast.success("Your password has been updated");
        passwordForm.reset();
      } else {
        toast.error("Failed to update password");
      }
    } catch (error) {
      toast.error("An error occurred while updating password");
      console.error(error);
    } finally {
      setIsPasswordSubmitting(false);
    }
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const renderPasswordField = (
    name: 'currentPassword' | 'newPassword' | 'confirmPassword', 
    label: string, 
    placeholder: string,
    description?: string
  ) => (
    <FormField
      control={passwordForm.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input 
                {...field} 
                type={showPassword[name.replace('Password', '') as keyof typeof showPassword] ? "text" : "password"}
                placeholder={placeholder}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 px-0"
                onClick={() => togglePasswordVisibility(name.replace('Password', '') as 'current' | 'new' | 'confirm')}
              >
                {showPassword[name.replace('Password', '') as keyof typeof showPassword] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword[name.replace('Password', '') as keyof typeof showPassword] ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
            {renderPasswordField(
              'currentPassword', 
              'Current Password', 
              'Enter your current password'
            )}

            {renderPasswordField(
              'newPassword', 
              'New Password', 
              'Enter your new password',
              'Password must be at least 8 characters and include uppercase, lowercase, and numbers.'
            )}

            {renderPasswordField(
              'confirmPassword', 
              'Confirm New Password', 
              'Confirm your new password'
            )}

            <Button 
              type="submit" 
              disabled={isPasswordSubmitting}
            >
              <Key className="mr-2 h-4 w-4" />
              {isPasswordSubmitting ? "Updating..." : "Update password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 