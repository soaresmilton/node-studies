# Iniciando no Node.JS

Esse repositório tem como finalidade construir a base de estudos do NODE.JS.

As bases desse estudos, serão retiradas de diferentes fontes, incluindo: curso [JSTACK](https://jstack.com.br/) (Dev Academy), [Rocketseat](https://www.rocketseat.com.br/) e a própria documentação do [Node.JS](https://nodejs.dev/)

---

## O que é o NODE.JS?

Ele é um *JS RUNTIME ENVIRONMENT.* 
Isso quer dizer que o Node é um ambiente que permite executar JavaScript fora do browser (no servidor). De forma geral, ele serve/permite criarmos:

- Backend
- Frontend
- Micro serviços
- Scripts e Automações
- API's

### Vantagens de se utilizar o Node:

De forma geral o Node é :

- Rápido em sua execução e para prototipar aplicações → criar apps rápidos
- Alta escalabilidade
- Aplicações de ponta → as maiores empresas do mundo estão utilizando o Node.JS (Netflix, PayPal, Uber, Nasa, entre outros)
- Ecossistema, comunidade consolidados (NPM)
- Mesma linguagem de programação para o front-end e para o back-end ⇒ JavaScript

### Como o Node.JS funciona?

Como sabemos, o Node.JS é um runtime que nos permite rodar JS no servidor. Para isso ser possível, precisamos de um motor ou um interpretador de JS, que rode fora do browser. Portanto, de forma bem simplificada, o NODE.JS usa o motor V8 (Chrome) para interpretar código JS no lado do servidor. 

**Principais características do NODE**

- Call Stack ⇒ Primeira que entra / última que sai ⇒ estrutura em pilha

![Call Stack](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/29488620-5170-4ad5-976d-2162cf92cae0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211021%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211021T191415Z&X-Amz-Expires=86400&X-Amz-Signature=c0e3e2b9efe0fad46bd8524185ec68482f0058cfe68156442d02fb5055213eb3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

>Print da estrutura da Call Stack retirado do curso [JSTACK](https://jstack.com.br/) da Dev Academy

- Single Thread
    
    Consegue executar apenas uma tarefa por vez, possuindo apenas uma call stack, ainda que seja naturalmente *non-blockin I/O.*
    
- Node.JS consegue executar código assíncrono devido ao ***Event Loop:***
    
![https://felixgerschau.com/static/79486d91b22a7c1b4044fce88a4cae20/5a190/js-event-loop-explained.png](https://felixgerschau.com/static/79486d91b22a7c1b4044fce88a4cae20/5a190/js-event-loop-explained.png)

>Fluxograma representativo da arquitetura/forma de execução do NODE.JS, evidenciando como funciona a callstack, a Thread Pool (Web Apis) e a Callback Queue

### 1 - Criando nossa primeira aplicação Node.JS

A primeira aplicação consiste em fazer um programa que monitora nosso uso de memória. O app apresenta:

- A memória livre
- Total de memória
- % de uso da memória

```jsx
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
```

---

### 2 - Segunda aplicação com o Node.JS

### Logger:

Essa aplicação consiste em armazenar algumas mensagens dentro de um arquivo de texto. Intuito de aprender alguns métodos das bibliotecas FS e EVENTS, nativa do NODE

```jsx
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const emitter = new EventEmitter();

emitter.on('log', (message) => {
  fs.appendFile(path.join(__dirname, 'log.txt'), message, err => {
    if (err) throw err;
  })
});

function log(message) {
  emitter.emit('log', message);
}

module.exports = log;
```

*OBSERVAÇÃO: LEMBRE-SE DE IMPORTAR O LOG NO ARQUIVO **STATS.JS** E CHAMAR A FUNÇÃO :* `log(${JSON.stringify(stats)}\\n);`

<div align="center">
<img src="assets/loggerJs.gif" alt="Api funcionando">
</div>

---

### 3 - CRIANDO SERVIDOR E ENTENDENDO SOBRE HTTP COM O NODE