import React, { useState } from "react";
import "./App.css";
import Calculator from "./SmartComponents/Calculator";
import { CalculatorContext } from "./SmartComponents/CalculatorContext";

function App() {
   const [data, setData] = useState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: true,
   });

   const providerValues = {
      data,
      setData,
   };

   return (
      <div className="App">
         <CalculatorContext.Provider value={providerValues}>
            <Calculator />
         </CalculatorContext.Provider>
      </div>
   );
}

export default App;
