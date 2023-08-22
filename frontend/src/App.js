import "./App.css";
import MachineTable from "./component/MachineTable";
import { GetMachines } from "./api/GetMachines";

function App() {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InRlc3QifSwiaWF0IjoxNjkyNzI2MjM3LCJleHAiOjE2OTI3NTUwMzd9.q6BQX7cba4Ychat0CUJLFsg3Th7Skhf2H2l-GRKgxuU";
  const { data: machines } = GetMachines(token);
  localStorage.setItem('token', token);

  return (
    <div className="App">
      <h1>Basic Laundromat</h1>
      {machines ? (<MachineTable machines={machines} />) : (<div>Loading...</div>)
        }
    </div>
  );
}


export default App;
