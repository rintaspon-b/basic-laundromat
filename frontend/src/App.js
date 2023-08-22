import "./App.css";
import { GetToken } from "./api/GetToken";
import MachineTable from "./component/MachineTable";
import { GetMachines } from "./api/GetMachines";

function App() {
  const { data: data } = GetToken();
  if (data && data?.token) {
    localStorage.setItem("token", data?.token);
    // console.log("token: " + data?.token);
  }
  const { data: machines } = GetMachines();
  return (
    <div className="App">
      <h1>Basic Laundromat</h1>
      {machines ? <MachineTable machines={machines} /> : <div>Loading...</div>}
    </div>
  );
}

export default App;
