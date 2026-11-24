function MapaDecorativo({ className = "", rotulo = "Pontos geográficos" }) {
  return (
    <div className={`mapa-decorativo ${className}`} role="img" aria-label="Ilustração decorativa de mapa com marcador">
      <span className="rua rua-horizontal" />
      <span className="rua rua-diagonal rua-diagonal-um" />
      <span className="rua rua-diagonal rua-diagonal-dois" />
      <span className="marcador-mapa" />
      <span className="rotulo-mapa">{rotulo}</span>
    </div>
  );
}

export default MapaDecorativo;
