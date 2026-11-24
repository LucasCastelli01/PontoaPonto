import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const COORDENADAS_INICIAIS = [0, 0];

function coordenadaValida(latitude, longitude) {
  return Number.isFinite(latitude)
    && Number.isFinite(longitude)
    && latitude >= -90 && latitude <= 90
    && longitude >= -180 && longitude <= 180;
}

function criarConteudoPopup(ponto) {
  const conteudo = document.createElement("div");
  const nome = document.createElement("strong");
  nome.textContent = ponto.name || "Ponto geográfico";
  conteudo.append(nome);

  if (ponto.description) {
    const descricao = document.createElement("p");
    descricao.textContent = ponto.description;
    conteudo.append(descricao);
  }

  const coordenadas = document.createElement("small");
  coordenadas.textContent = `${ponto.latitude}, ${ponto.longitude}`;
  conteudo.append(coordenadas);
  return conteudo;
}

function MapaPontos({ pontos = [], className = "", centro, zoom = 13, rotulo = "Mapa dos pontos" }) {
  const elementoRef = useRef(null);
  const mapaRef = useRef(null);
  const marcadoresRef = useRef(null);

  useEffect(() => {
    if (!elementoRef.current) return undefined;

    const mapa = L.map(elementoRef.current, { scrollWheelZoom: false, zoomControl: true })
      .setView(COORDENADAS_INICIAIS, 2);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapa);

    mapaRef.current = mapa;
    marcadoresRef.current = L.featureGroup().addTo(mapa);

    return () => {
      mapa.remove();
      mapaRef.current = null;
      marcadoresRef.current = null;
    };
  }, []);

  useEffect(() => {
    const mapa = mapaRef.current;
    const marcadores = marcadoresRef.current;
    if (!mapa || !marcadores) return;

    marcadores.clearLayers();
    const validos = pontos.filter((ponto) => coordenadaValida(Number(ponto.latitude), Number(ponto.longitude)));
    const icone = L.divIcon({
      className: "mapa-pin-wrapper",
      html: '<span class="mapa-pin"></span>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });

    validos.forEach((ponto) => {
      L.marker([Number(ponto.latitude), Number(ponto.longitude)], { icon: icone })
        .bindPopup(criarConteudoPopup(ponto))
        .addTo(marcadores);
    });

    if (validos.length > 1) {
      mapa.fitBounds(marcadores.getBounds(), { padding: [24, 24], maxZoom: zoom });
    } else if (validos.length === 1) {
      mapa.setView([Number(validos[0].latitude), Number(validos[0].longitude)], zoom);
    } else if (centro && coordenadaValida(Number(centro[0]), Number(centro[1]))) {
      mapa.setView([Number(centro[0]), Number(centro[1])], zoom);
    } else {
      mapa.setView(COORDENADAS_INICIAIS, 2);
    }
  }, [centro, pontos, zoom]);

  return <div className={`mapa-pontos ${className}`} role="region" aria-label={rotulo} ref={elementoRef} />;
}

export default MapaPontos;
