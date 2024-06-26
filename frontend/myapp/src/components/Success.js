import React from "react";
import { useEffect, useState } from "react";
function Success({ message }) {
  const [showMessage, setshowMessage] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshowMessage(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return showMessage ? (
    <div className="success shadow d-flex justify-content-center align-items-center">
      {message}
    </div>
  ) : null;
}

export default Success;
