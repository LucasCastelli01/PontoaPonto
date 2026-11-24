const API_URL = "https://apigeopoint.onrender.com/api/points";

async function requisicao(caminho = "", opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: {
      "Content-Type": "application/json",
      ...opcoes.headers,
    },
    ...opcoes,
  });

  if (!resposta.ok) {
    const mensagem = await resposta.text();
    throw new Error(mensagem || `Erro HTTP ${resposta.status}`);
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json();
}

export function listarPontos() {
  return requisicao();
}

export function buscarPonto(id) {
  return requisicao(`/${id}`);
}

export function criarPonto(ponto) {
  return requisicao("", {
    method: "POST",
    body: JSON.stringify(ponto),
  });
}

export function atualizarPonto(id, ponto) {
  return requisicao(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(ponto),
  });
}

export function excluirPonto(id) {
  return requisicao(`/${id}`, {
    method: "DELETE",
  });
}