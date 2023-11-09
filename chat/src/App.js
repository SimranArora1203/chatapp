import Join from './component/Join/Join';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import './App.css';
import Cchat from './component/Cchat/Cchat'

function App() {
 

  return (
    <div className="App">
     <Router>
     <Routes>
      <Route path="/"element={<Join/>}/>
      <Route path="/chat"element={<Cchat/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
