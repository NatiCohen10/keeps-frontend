import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

function ContactPage() {
  const { toast } = useToast();
  function handleContactSubmission(ev) {
    ev.preventDefault();
    ev.target.reset();
    toast({
      title: "Success!",
      description: "Successfuly sent your message!",
      variant: "success",
    });
  }
  return (
    <section className="flex justify-center items-center h-[80vh] bg-background">
      <Card className="w-full max-w-md p-6 bg-card shadow-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmission}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                className="mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Your Email"
                className="mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Your Message"
                className="mt-1 block w-full"
                rows="4"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-foreground">
              Send Message
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-foreground text-center">
            For support inquiries, contact us at{" "}
            <a href="mailto:support@taskly.com" className="text-primary">
              support@taskly.com
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

export default ContactPage;
