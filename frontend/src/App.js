import "./App.css";
import MainRouter from "./routes/MainRouter.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <MainRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
