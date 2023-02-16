// https://mui.com/material-ui/react-select/#BasicSelect.js
import * as React from "react";
import { useState } from "react";

export default function BasicSelect({toggleStandard}) {
  const [standard, setstandard] = useState("");

  const handleChange = (event) => {
    localStorage.setItem("standard", event.target.value);
    setstandard(event.target.value); 
    toggleStandard();
  };

  return (
    <div className="select">
      <form>
        <label htmlFor="standard">Standard</label>
        <br />
        <select id="select" name="standard" onChange={handleChange}>
          <option value="celcius">Celcius</option>
          <option value="fahrenheit">Fahrenheit</option>
        </select>
      </form>
    </div>
  );
}
