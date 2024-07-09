import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

function AboutTasks() {
  return (
    <section className=" bg-background">
      <Card className="w-full  p-6 bg-card shadow-md">
        <CardHeader>
          <h2 className="text-3xl text-primary font-bold ">About Us</h2>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4 text-foreground">
            Taskly is developed by a team passionate about improving
            productivity through innovative solutions.
          </p>
          <p className="text-lg mb-4 text-foreground">
            Our mission is to simplify task management for individuals and
            teams, making it easier for everyone to stay organized and focused
            on what truly matters.
          </p>
          <h3 className="text-2xl font-semibold mb-2 text-primary ">
            Our Vision
          </h3>
          <p className="text-lg mb-4 text-foreground">
            We envision a world where task management is seamless and intuitive,
            allowing people to achieve their goals without unnecessary stress.
          </p>
          <h3 className="text-2xl font-semibold mb-2 text-primary ">
            Our Team
          </h3>
          <p className="text-lg mb-4 text-foreground">
            Our team is composed of experienced developers, designers, and
            productivity enthusiasts dedicated to delivering the best user
            experience.
          </p>
          <h3 className="text-2xl font-semibold mb-2 text-primary ">Join Us</h3>
          <p className="text-lg mb-4 text-foreground">
            We are always looking for talented individuals to join our team. If
            you are passionate about productivity and technology, we would love
            to hear from you.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default AboutTasks;
