import React, { useState } from "react";
import "./App.css";
import Calculator from "./Components/Calculator";
import { CalculatorContext } from "./Components/CalculatorContext";

function App() {
   const [data, setData] = useState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false,
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
