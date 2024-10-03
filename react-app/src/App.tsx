import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  return (
    <div>
      {alertVisible && <Alert>My alert</Alert>}
      <Button color="danger" onClick={() => setAlertVisibility(true)}>
        Push <span>Me</span>
      </Button>
    </div>
  );
}

export default App;
