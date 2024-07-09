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
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function Register() {
  const { register, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  function handleRegister(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const username = form.get("username");
    const password = form.get("password");
    if (password.length <= 8) {
      toast({
        title: "Password is too short!",
        description: "Password needs to be atleast 8 characters long ",
        variant: "error",
      });
      return;
    }
    const email = form.get("email");
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const userToAdd = { username, password, email, firstName, lastName };
    register(userToAdd);
    ev.target.reset();
  }
  return (
    <Card className=" w-96 relative">
      <CardHeader>
        <Button
          className=" absolute right-3"
          variant="icon"
          onClick={() => {
            navigate("/");
          }}
        >
          <LogOut />
        </Button>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className=" flex flex-col gap-5">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              required
              name="username"
              id="username"
              placeholder="Your username..."
            />
          </div>
          <div>
            <div className=" flex flex-col gap-2 mb-1">
              <Label htmlFor="password">Password</Label>
              <Label
                className=" text-muted-foreground font-normal"
                htmlFor="password"
              >
                Password should be atleast 8 characters long
              </Label>
            </div>
            <Input
              required
              name="password"
              id="password"
              type="password"
              placeholder="Your Password..."
            />
          </div>
          <div>
            <Label htmlFor="email">email</Label>
            <Input
              required
              name="email"
              id="email"
              type="email"
              placeholder="JaneDoe@example.com"
            />
          </div>
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              name="firstName"
              id="firstName"
              placeholder="Jane"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input name="lastName" id="lastName" placeholder="Doe" required />
          </div>
          {loading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button>Register</Button>
          )}
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
