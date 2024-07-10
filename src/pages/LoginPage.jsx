import React, { useState } from "react";
import {
  Card,
  CardContent,
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
import { Eye, EyeOff, LogOut } from "lucide-react";

function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  function handleLogin(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const username = form.get("username");
    const password = form.get("password");
    login({ username, password });
  }

  return (
    <Card className="w-96 relative">
      <CardHeader>
        <Button
          className="absolute right-3"
          variant="icon"
          onClick={() => {
            navigate("/");
          }}
        >
          <LogOut />
        </Button>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                required
                name="password"
                id="password"
                type={passwordType} // This controls the input type
                placeholder="Your Password..."
              />

              <div
                className="absolute right-2 top-2 bg-transparent cursor-pointer"
                onClick={() =>
                  setPasswordType((prevType) =>
                    prevType === "password" ? "text" : "password"
                  )
                }
              >
                {passwordType === "password" ? (
                  <Eye className="text-foreground" />
                ) : (
                  <EyeOff className="text-foreground" />
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button type="submit">Log in</Button>
          )}
        </form>
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter>
        <p>
          Don't have an account?{" "}
          <Link
            to={"/auth/register"}
            className="border-b border-black dark:border-white"
          >
            Sign up!
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
