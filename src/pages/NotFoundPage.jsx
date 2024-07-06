import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tl from-blue-600 to-yellow-200">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <Button variant="outline" onClick={goToHomePage}>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
