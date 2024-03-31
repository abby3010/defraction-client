import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect when count is equal to 0
    count === 0 && navigate("/");
    //clean
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      style={{ height: "100vh" }}
      className="container p-5 text-center text-white"
    >
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
