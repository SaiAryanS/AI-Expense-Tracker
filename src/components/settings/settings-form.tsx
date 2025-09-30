
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { User } from "@/lib/types";
import { updateUser } from "@/lib/actions";

const settingsFormSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  currency: z.enum(["USD", "EUR", "INR"]),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export default function SettingsForm({ user }: { user: User }) {
  const { toast } = useToast();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      displayName: user.displayName,
      avatarUrl: user.avatarUrl || "",
      currency: user.currency,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SettingsFormValues) => {
    const result = await updateUser(user._id.toString(), data);
    if (result.success) {
      toast({
        title: "Settings Saved",
        description: "Your profile has been updated successfully.",
      });
    } else {
       toast({
        title: "Error",
        description: result.message || "Could not update settings.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USD">USD - United States Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
