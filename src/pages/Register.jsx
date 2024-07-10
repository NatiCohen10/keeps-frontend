import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import zxcvbn from "zxcvbn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Eye, EyeOff, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

function Register() {
  const { register, loading } = useAuth();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Calculate password strength using zxcvbn library
    const result = zxcvbn(newPassword);
    // zxcvbn returns score from 0 to 4, where 0 is weakest and 4 is strongest
    setScore(result.score);
  };

  function handleRegister(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const username = form.get("username");
    const newPassword = password;
    if (newPassword.length < 8) {
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
    const userToAdd = {
      username,
      password: newPassword,
      email,
      firstName,
      lastName,
    };
    register(userToAdd);
    ev.target.reset();
    setPassword("");
  }
  const progressPercentage = (score / 4) * 100;
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
        <form onSubmit={handleRegister} className=" flex flex-col gap-2">
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

            <div className="relative">
              <Input
                required
                name="password"
                id="password"
                type={passwordType}
                value={password}
                onChange={handlePasswordChange}
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
          <div className="mt-2">
            <p className=" text-xs text-foreground mb-1">Password strength:</p>
            <Progress value={progressPercentage} />
            <p className="text-xs text-foreground mt-1">
              {score === 0
                ? "Very Weak"
                : score === 1
                ? "Weak"
                : score === 2
                ? "Fair"
                : score === 3
                ? "Strong"
                : "Very Strong"}
            </p>
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
