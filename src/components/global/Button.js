import React from "react";
import "../../styles/Button.css";

function Button({ children }) {
  return <button className="Global__Button">{children}</button>;
}

export default Button;
