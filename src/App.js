import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import Budget from './components/Budget';
import CompareBudget from './components/CompareBudget';




function App() {
  
  return (
     
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/read/:id' element={<Read/>} />
        <Route path='/edit/:id' element={<Update/>}/>
        <Route path='/budget' element={<Budget/>}/>
        <Route path='/compare' element={<CompareBudget/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
