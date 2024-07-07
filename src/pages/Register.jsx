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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  function handleRegister(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const username = form.get("username");
    const password = form.get("password");
    const email = form.get("email");
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const userToAdd = { username, password, email, firstName, lastName };
    register(userToAdd);
    console.log(userToAdd);
    navigate("/auth/login");
  }
  return (
    <Card className=" w-96">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className=" flex flex-col gap-5">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              id="username"
              placeholder="Your username..."
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Your Password..."
            />
          </div>
          <div>
            <Label htmlFor="email">email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="JaneDoe@example.com"
            />
          </div>
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input name="firstName" id="firstName" placeholder="Jane" />
          </div>
          <div>
            <Label htmlFor="plastName">Last name</Label>
            <Input name="lastName" id="lastName" placeholder="Doe" />
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
