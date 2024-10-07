import { useState } from "react";
// import Alert from "./components/Alert";
// import Button from "./components/Button";

function App() {
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });

  const handleClick = () => {
    setGame({ ...game, player: { ...game.player, name: "Bob" } });
  };
}

export default App;
