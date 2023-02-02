import React, { useContext } from "react";
import { CalculatorContext } from "./CalculatorContext";

const CalculatorDisplay = () => {
   const { data } = useContext(CalculatorContext);

   return <div className="calculator-display"> {data.displayValue} </div>;
};

export default CalculatorDisplay;
