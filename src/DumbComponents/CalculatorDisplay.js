import React, { useContext } from "react";
import { CalculatorContext } from "../SmartComponents/CalculatorContext";

const CalculatorDisplay = () => {
   const { data } = useContext(CalculatorContext);

   return <div className="calculator-display"> {data.displayValue} </div>;
};

export default CalculatorDisplay;
