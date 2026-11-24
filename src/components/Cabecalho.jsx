import { Link } from 'react-router-dom'
import './Cabecalho.css'

function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link className="marca" to="/pontos">
        <img className="marca-logo" src="/logo-ponto-a-ponto.svg" alt="" />
        <span>Ponto a Ponto</span>
      </Link>

      <nav aria-label="Navegação principal">
        <Link to="/pontos">Pontos</Link>
        <span className="separador-nav" aria-hidden="true">•</span>
        <span>Gerenciar locais</span>
      </nav>
    </header>
  )
}

export default Cabecalho
