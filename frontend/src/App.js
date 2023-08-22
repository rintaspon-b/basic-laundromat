import "./App.css";
import MachineTable from "./component/MachineTable";
import { GetMachines } from "./api/GetMachines";

function App() {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InRlc3QifSwiaWF0IjoxNjkyNjk3MjAxLCJleHAiOjE2OTI3MjYwMDF9.LePdRIkYB0t3VW6aTpAmUoetdUTyG5MANfrH3AeBvMY";
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
