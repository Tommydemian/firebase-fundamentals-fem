import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Home } from './pages/Home.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { Editor } from './pages/Editor.tsx'

import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Link
} from "react-router-dom";
import { TodoPage } from './pages/TodoPage.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router >
    <nav>
      <Link to='/'>Home</Link>
      <Link to= '/editor'>Editor</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/todos'>Todos</Link>
    </nav>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/editor/:id' element={<Editor />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/todos' element={<TodoPage />}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
