import './App.css';
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter, Routes, Route, Outlet, NavLink } from 'react-router-dom';
import Search from './components/Search';
import AddData from './components/AddData'
import Edit from './components/Edit'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="search" element={<Search />} />
        <Route path="addData" element={<AddData />} />
        <Route path="/search/editData/:id" element={<Edit />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
