import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

function Register() {
  return (
    <Card className=" w-96">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form className=" flex flex-col gap-5">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Your username..." />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your Password..."
            />
          </div>
          <div>
            <Label htmlFor="email">email</Label>
            <Input id="email" type="email" placeholder="JaneDoe@example.com" />
          </div>
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="Jane" />
          </div>
          <div>
            <Label htmlFor="plastName">Last name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>

          <Button>Register</Button>
        </form>
      </CardContent>
      <Separator className=" mb-4" />
      <CardFooter>
        <p>
          Don't have an account?{" "}
          <Link
            to={"/auth/Login"}
            className=" border-b border-black dark:border-white"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default Register;
