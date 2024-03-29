import Button from "./components/Button";

function App() {
  return (
    <div>
      <Button color="danger" onClick={() => console.log("Clicked")}>
        Push <span>Me</span>
      </Button>
    </div>
  );
}

export default App;
