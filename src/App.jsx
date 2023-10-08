import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;