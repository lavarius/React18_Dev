import { useState, useEffect } from "react";
import Button from "./components/Button/Button";

function App() {
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  useEffect(() => {
    console.log("Current cart:", cart);
  }, [cart]);

  const handleClick = () => {
    console.log("handleClick called");
    setCart((cart) => ({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
      // arrow function and check ID of item, creat new object with updated qty otherwise retruun same item.
    }));
  };
  return (
    <div>
      <h2>Cart Details:</h2>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <Button onClick={handleClick}>Change Quantity</Button>
    </div>
  );
}

export default App;
