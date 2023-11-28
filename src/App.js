import { Route, Routes } from 'react-router-dom';
import './App.css';
import TaskList from './pages/TaskList/TaskList';
import TaskForm from './pages/TaskForm/TaskForm';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/add' element={<TaskForm />} />
        <Route path='/edit/:taskId' element={<TaskForm />} />
      </Routes>
    </div>
  );
}

export default App;
