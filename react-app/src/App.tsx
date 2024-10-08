import { useState, useEffect } from "react";
import Button from "./components/Button/Button";

function App() {
  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });

  useEffect(() => {
    console.log("Current pizza:", pizza);
  }, [pizza]);

  const handleClick = () => {
    console.log("handleClick called");
    setPizza((prevPizza) => ({
      ...prevPizza,
      toppings: [...prevPizza.toppings, "Pineapple"],
    }));
  };
  return (
    <div>
      <h2>Pizza Details:</h2>
      <pre>{JSON.stringify(pizza, null, 2)}</pre>
      <Button onClick={handleClick}>Add Pineapple</Button>
    </div>
  );
}

export default App;
