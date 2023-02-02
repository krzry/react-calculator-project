import React, { useContext } from "react";
import "../App.css";

import CalculatorKey from "./CalculatorKey";
import CalculatorDisplay from "./CalculatorDisplay";
import { CalculatorContext } from "./CalculatorContext";

const Calculator = () => {
   const { data, setData } = useContext(CalculatorContext);

   let inputKeys = [
      { value: "0", className: "digit-keys key-0" },
      { value: ".", className: "digit-keys" },
      { value: "1", className: "digit-keys" },
      { value: "2", className: "digit-keys" },
      { value: "3", className: "digit-keys" },
      { value: "4", className: "digit-keys" },
      { value: "5", className: "digit-keys" },
      { value: "6", className: "digit-keys" },
      { value: "7", className: "digit-keys" },
      { value: "8", className: "digit-keys" },
      { value: "9", className: "digit-keys" },
      { value: "AC", className: "function-keys" },
      { value: "+-", className: "function-keys" },
      { value: "%", className: "function-keys" },
   ];

   const operatorKeys = [
      { value: "/", className: "operator-keys" },
      { value: "*", className: "operator-keys" },
      { value: "-", className: "operator-keys" },
      { value: "+", className: "operator-keys" },
      { value: "=", className: "operator-keys" },
   ];

   // const inputDigit = () => {};
   const clearData = () => {
      setData({
         value: null,
         displayValue: "0",
         operator: null,
         waitingForOperand: false,
      });
   };

   const handleChange = (keyVal) => {
      console.log(data);
      if (/\d/.test(keyVal)) {
         setData({
            ...data,
            displayValue: data.displayValue === "0" ? keyVal : data.displayValue + keyVal,
         });
      } else if (operatorKeys.find((r) => r.value === keyVal)) {
         setData({ ...data, operator: keyVal });
      } else if (keyVal === "AC") {
         clearData();
      } else if (keyVal === "+-") {
         setData({ ...data, displayValue: parseFloat(data.displayValue) * -1 });
      }
   };

   return (
      <div className="container">
         <CalculatorDisplay />
         <div className="calculator-keypad">
            <div className="input-keys">
               {inputKeys.map((row, index) => (
                  <CalculatorKey
                     key={index}
                     className={row.className}
                     value={row.value}
                     handleChange={handleChange}
                  />
               ))}
            </div>
            <div className="operator-keys">
               {operatorKeys.map((row, index) => (
                  <CalculatorKey
                     key={index}
                     className={row.className}
                     value={row.value}
                     handleChange={handleChange}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Calculator;
