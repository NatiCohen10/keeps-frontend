import { BellRing, ClipboardList, Users } from "lucide-react";
import React from "react";

function KeyFeatures() {
  const keyFeatures = [
    {
      header: "Task Management",
      body: "Create, organize, and prioritize tasks with ease",
      icon: <ClipboardList />,
    },
    {
      header: "Reminders & Notifications",
      body: "Set reminders and receive notifications to stay on track",
      icon: <BellRing />,
    },
    {
      header: "Collaboration",
      body: "Share tasks and collaborate seamlessly with your team",
      icon: <Users />,
    },
  ];
  return (
    <>
      <h2 className=" text-3xl font-bold mb-5">Key Features</h2>
      <ul className=" flex flex-col gap-4">
        {keyFeatures.map((feature, index) => (
          <li className=" bg-card p-7 " key={index}>
            <div className=" flex gap-2 items-center">
              <div>{feature.icon}</div>
              <h3 className=" text-2xl font-bold">{feature.header}</h3>
            </div>

            <p className=" text-lg mt-4">{feature.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default KeyFeatures;
