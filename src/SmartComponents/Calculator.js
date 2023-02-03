import React, { useContext, useEffect, useCallback } from "react";
import "../App.css";

import CalculatorKey from "../DumbComponents/CalculatorKey";
import CalculatorDisplay from "../DumbComponents/CalculatorDisplay";
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

   const handleUserKeyPress = useCallback(
      (event) => {
         let { key, keyCode } = event;

         if (key === "Enter") {
            key = "=";
         } else if (
            (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105)
         ) {
            // 0-9 only
            key = key.toString();
         }

         handleChange(key);
      },
      [data]
   );

   useEffect(() => {
      window.addEventListener("keydown", handleUserKeyPress);
      return () => {
         window.removeEventListener("keydown", handleUserKeyPress);
      };
   }, [handleUserKeyPress]);

   const inputDot = () => {
      const { displayValue } = data;
      if (!/\./.test(displayValue)) {
         setData({ ...data, displayValue: displayValue + "." });
      }
   };

   const clearLastChar = () => {
      const { displayValue } = data;
      setData({
         ...data,
         displayValue:
            displayValue.substring(0, displayValue.length - 1) || "0",
      });
   };

   const inputPercent = () => {
      const { displayValue } = data;
      const currentValue = parseFloat(displayValue);

      if (currentValue === 0) return;

      const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
      const newValue = parseFloat(displayValue) / 100;

      setData({
         ...data,
         displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
      });
   };

   const clearData = () => {
      setData({
         value: null,
         displayValue: "0",
         operator: null,
         waitingForOperand: true,
      });
   };

   const calculateOperation = (prevVal, currentVal, operator) => {
      switch (operator) {
         case "/":
            return prevVal / currentVal;
         case "+":
            return prevVal + currentVal;
         case "-":
            return prevVal - currentVal;
         case "*":
            return prevVal * currentVal;
         default:
            return currentVal;
      }
   };

   const performOperation = (operator) => {
      if (operator !== "=") {
         setData({
            ...data,
            value: data.displayValue,
            operator: operator,
            waitingForOperand: false,
         });
      } else {
         const inputVal = parseFloat(data.displayValue);

         if (data.value == null) {
            setData({ ...data, value: inputVal });
         } else {
            const currentVal = parseFloat(data.displayValue);
            const prevVal = parseFloat(data.value);

            const newValue = calculateOperation(
               prevVal,
               currentVal,
               data.operator
            );
            setData({
               ...data,
               value: newValue,
               operator: operator,
               displayValue: String(newValue),
            });
         }
      }
   };
   const insertDigits = (keyVal) => {
      let values;
      if (data.waitingForOperand === false) {
         values = {
            displayValue: keyVal,
            waitingForOperand: true,
         };
      } else {
         if (data.operator === "=") {
            values = {
               displayValue: keyVal,
               operator: null,
               waitingForOperand: true,
            };
         } else {
            values = {
               displayValue:
                  data.displayValue === "0"
                     ? keyVal
                     : data.displayValue + keyVal,
               waitingForOperand: true,
            };
         }
      }
      setData({ ...data, ...values });
   };

   const handleChange = (keyVal) => {
      if (/\d/.test(keyVal)) {
         //NUMBERS
         insertDigits(keyVal);
      } else if (operatorKeys.find((r) => r.value === keyVal)) {
         performOperation(keyVal);
      } else if (keyVal === "AC") {
         clearData();
      } else if (keyVal === "+-") {
         setData({ ...data, displayValue: parseFloat(data.displayValue) * -1 });
      } else if (keyVal === "%") {
         inputPercent();
      } else if (keyVal === ".") {
         inputDot();
      } else if (keyVal === "Backspace") {
         clearLastChar();
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
