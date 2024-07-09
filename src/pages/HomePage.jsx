import { Button } from "@/components/ui/button";
import FaqAccordion from "@/components/ui/FaqAccordion";
import KeyFeatures from "@/components/ui/KeyFeatures";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/authContext";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Github, Linkedin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [introRef, introEntry] = useIntersectionObserver({
    threshold: 0.3,
    root: null,
    rootMargin: "0px",
  });

  const [keyFeaturesRef, keyFeaturesEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "16px",
  });

  const [whyChooseRef, whyChooseEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "24px",
  });

  const [testimonialsRef, testimonialsEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "16px",
  });

  const [getStartedRef, getStartedEntry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "16px",
  });

  const { loggedInUser } = useAuth();

  return (
    <div>
      {/* Introduction Section */}
      <section
        ref={introRef}
        className={`p-4 h-[80vh] md:h-[60vh] ${
          introEntry?.isIntersecting ? "animate-fadeInUp" : ""
        }`}
      >
        <div className=" lg:grid grid-cols-2 gap-3">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Simplify Your Tasks, Focus on What Matters
            </h1>
            <p className="text-lg leading-8">
              Taskly helps you manage tasks effortlessly and stay organized. All
              of your organizing needs in one place! With Taskly, you will never
              have to worry about remembering tasks ever again.
            </p>
            {loggedInUser ? (
              <div className=" mt-4">
                <Button asChild className="text-foreground py-6 w-80 md:w-96">
                  <Link to="/tasks">My tasks</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 my-8 md:items-center">
                <Button asChild className="text-foreground py-6 md:w-96">
                  <Link to="/auth/login">Login</Link>
                </Button>
                <p className="text-center text-xl font-bold">or</p>
                <Button asChild className="text-foreground py-6 md:w-96">
                  <Link to="/auth/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <img
              className="max-h-[60vh] w-full"
              src="https://res.cloudinary.com/dtbeyzqcb/image/upload/v1720528660/isometric-time-management-concept-illustrated_fnq1hm.png"
              alt="tasks"
            />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section
        ref={keyFeaturesRef}
        className={`p-4 h-[95vh] sm:h-[80vh] ${
          keyFeaturesEntry?.isIntersecting ? "animate-fadeInUp" : ""
        }`}
      >
        <KeyFeatures />
      </section>

      {/* Why Choose Taskly? */}
      <section
        ref={whyChooseRef}
        className={`my-6 ${
          whyChooseEntry?.isIntersecting ? "animate-fadeInUp" : ""
        }`}
      >
        <h2 className="text-3xl font-bold">Why Choose Taskly?</h2>
        <p className="text-lg my-3">
          Taskly simplifies your workflow, increases productivity, and keeps you
          organized.
        </p>
        {/* User Testimonials */}
        <div
          ref={testimonialsRef}
          className={`bg-card p-4 ${
            testimonialsEntry?.isIntersecting ? "animate-fadeInUp" : ""
          }`}
        >
          <blockquote className="rounded-sm bg-foreground text-card p-4 text-lg">
            "Taskly has transformed how we manage projects. Highly recommended!"
            <footer>- John Doe, CEO</footer>
          </blockquote>
        </div>
      </section>

      {/* FAQs Section */}
      <section className={`h-[65vh] sm:h-[50vh]`}>
        <h2 className="text-3xl font-bold mt-3">FAQs</h2>
        <FaqAccordion />
      </section>

      {/* Download/Sign Up Section */}
      {!loggedInUser && (
        <section
          ref={getStartedRef}
          className={`p-4 ${
            getStartedEntry?.isIntersecting ? "animate-fadeInUp" : ""
          }`}
        >
          <h2 className="text-3xl text-center  font-bold">
            Get Started with Taskly Today!
          </h2>
          <p className="text-lg text-center  mt-3 mb-5">
            Sign up Today and start managing your tasks efficiently, securely
            and easily!
          </p>
          <div className="flex flex-col items-center gap-4 ">
            <Button className="w-80 sm:w-96" asChild>
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <p className="text-xl font-bold ">Already have an account?</p>
            <Button className="w-80 sm:w-96 " asChild>
              <Link to="/register">Login</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Footer Section */}
      <footer className=" bg-card pr-4 items-center justify-between flex flex-col lg:h-24 lg:flex-row border border-foreground rounded-ss-sm rounded-se-sm border-b-0 md:px-10 mt-20">
        <nav className="flex">
          <Button asChild variant="link">
            <Link to="/about">About us</Link>
          </Button>
          <Separator orientation="vertical" />
          <Button asChild variant="link">
            <Link to="/contact">Contact us</Link>
          </Button>
        </nav>

        <div className="flex flex-col lg:flex-row gap-3 text-lg mt-2 mb-4 md:my-4">
          Built by Netanel Cohen{" "}
          <div className=" flex justify-center gap-5">
            <a href="https://github.com/NatiCohen10" target="_blank">
              <Github />
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/netanel-cohen-705745307/"
              target="_blank"
            >
              <Linkedin />
            </a>
          </div>
        </div>
        <p className="text-sm lg:text-lg">
          &copy; {new Date().getFullYear()} Taskly. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
