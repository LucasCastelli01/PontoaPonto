import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Cabecalho from './components/Cabecalho.jsx'
import ListaPontos from './pages/ListaPontos.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pontos" replace />} />
      <Route
        path="/pontos"
        element={
          <>
            <Cabecalho />
            <main>
              <ListaPontos />
            </main>

          </>
          }
      />
    </Routes>
  )
} 

  export default App
