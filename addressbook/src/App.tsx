import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from 'Components/Dashboard/Dashboard';
import NavBar from 'Components/NavBar/NavBar';

function App() {
  
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
