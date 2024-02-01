import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Panel/Login'
import Dashboard from './pages/Panel/Dashboard/Dashboard'
import Actions from './pages/Panel/Dashboard/Actions'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/callback" element={<Login />} />

      <Route path="/panel" element={<Dashboard />} />
      <Route path="/panel/actions" element={<Actions />} />
    </Routes>
  )
}

export default App
