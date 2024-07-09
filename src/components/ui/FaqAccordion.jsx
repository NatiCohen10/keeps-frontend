import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Link } from "react-router-dom";

function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className=" text-2xl">
          Is Taskly free to use?
        </AccordionTrigger>
        <AccordionContent className=" bg-card text-lg px-2 rounded-sm">
          Yes. Taskly is completely free to use!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className=" text-2xl">
          How secure is Taskly?
        </AccordionTrigger>
        <AccordionContent className=" bg-card text-lg px-2 rounded-sm">
          Taskly prioritizes user data security with advanced encryption. With
          our latest technologies, you can trust Taskly to keep all of your data
          safe and secure!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className=" text-2xl">
          How can I get started using Taskly?
        </AccordionTrigger>
        <AccordionContent className=" bg-card text-lg px-2 rounded-sm">
          Getting started is quite easy! Head over to the{" "}
          <Link className="border-b border-b-foreground" to="/auth/register">
            Register
          </Link>{" "}
          page, create a user, and youre good to go!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FaqAccordion;
