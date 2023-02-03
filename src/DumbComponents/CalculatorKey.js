import React from "react";
import "../App.css";

const CalculatorKey = ({value, className, handleChange}) => {
   return (
      <>
         <button className={`calculator-key ${className}`} onClick={e=> handleChange(value)} >{value}</button>
      </>
   );
};

export default CalculatorKey;
