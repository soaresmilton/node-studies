const os = require('os');
const log = require('./logger');

const interval = 1000;

setInterval(() => {
  const { freemem, totalmem } = os;

  const memoriaTotal = parseInt(totalmem() / 1024 / 1024);

  const memoriaLivre = parseInt(freemem() / 1024 / 1024);

  const memoriaUsada =  parseInt(memoriaTotal - memoriaLivre);

  const porcentagemDeMemoriaUsada = parseInt((memoriaUsada / memoriaTotal) * 100);

  const porcentagemDeMemoriaLivre = parseInt((memoriaLivre / memoriaTotal) * 100);

  const stats = {
    Memoria_livre: `${memoriaLivre} MB`,
    Memoria_Em_Uso: `${memoriaUsada} MB`,
    Memoria_Total: `${memoriaTotal} MB`,
    Porcentagem_Memoria_Usada: `${porcentagemDeMemoriaUsada} %`,
    Porcentagem_Memoria_Disponivel: `${porcentagemDeMemoriaLivre} %`
  }
  console.clear()
  console.log("======= PC STATS =======");
  console.table(stats);

  log(`${JSON.stringify(stats)}\n`);
}, interval);

