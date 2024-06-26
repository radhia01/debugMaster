import React from "react";
import { useState, useEffect } from "react";
function Error({ message }) {
  const [showMessage, setshowMessage] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshowMessage(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return showMessage ? (
    <div>
      <div className="error shadow d-flex justify-content-center align-items-center">
        {message}
      </div>
    </div>
  ) : null;
}

export default Error;
