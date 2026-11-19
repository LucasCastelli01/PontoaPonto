import { Link } from 'react-router-dom'
import './Cabecalho.css'

function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link className="marca" to="/pontos">
        <span className="marca-pino" aria-hidden="true" />
        GeoPoint
      </Link>

      <nav aria-label="Navegação principal">
        <Link to="/pontos">Pontos</Link>
        <span aria-hidden="true">•</span>
        <span>Gerenciar locais</span>
      </nav>
    </header>
  )
}

export default Cabecalho