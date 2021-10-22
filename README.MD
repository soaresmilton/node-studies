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

***obs: esses arquivos são encontrados dentro da pasta http do repositório.***
Agora, iremos analisar o Node trabalhando com requisições HTTP, criando rotas para consumir um arquivo HTML qualquer.

De forma geral, o primeiro passo é iniciar um servidor, usando a API do próprio node:

```jsx
const http = require('http');

const server = http.createServer((req, res) => {
	res.end('<h1>Hello World - Node JS </h1>')
});

server.listen(3000, () => {
	console.log(`Server is running at: http://localhost:3000`);
});
```

Criando nossa primeira rota especificada:

```jsx
const http = require('http');

const server = http.createServer((req, res) => {
	if(req.url === '/') {
	res.end('<h1> CRIANDO NOSSA PRIMEIRA ROTA COM NODE JS </h1>');
}
});

server.listen(3000, () => {
	console.log(`Server is running at: http://localhost:3000`);
});
```

Uma vez entendido o conceito padrão para criar um servidor com NODE, podemos dar continuidade na implementação do nosso back end. Então, implementando a estratégia de consumir um arquivo index.html no nosso servidor:

```jsx
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(
      path.join(__dirname, 'public', 'index.html'),
      (err, content) => {
        if(err) throw err;

        res.end(content);
      }
    )
  }

});

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT ===> http://localhost:${PORT}`);
})
```
---
### 4 - Lendo arquivos com URL dinâmica, arquivos css e scripts

Avançando um pouco mais nos nossos estudos, vamos entender como podemos criar um backend que entenda diferentes URL's que o usuário fizer o request e, se o arquivo html for encontrado, como o backend identifica outros arquivos que o html esteja consumindo, como por exemplo arquivos de estilos (.css) e scripts (.js)

```jsx
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const server = http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url;
  const filePath = path.join(__dirname, 'public', file);

  const extname = path.extname(filePath);
  const allowedFileTypes = ['.html', '.css', '.js'];
  const allowed = allowedFileTypes.find(item => item == extname);
  if(!allowed) return;

  fs.readFile(
        filePath,
        (err, content) => {
          if(err) throw err;
  
          res.end(content);
        }
      )

});

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT ===> http://localhost:${PORT}`);
})
```

Desa maneira, conseguimos acessar arquivos no front-end que por sua vez estão consumindo outros arquivos. Nessa aplicação especificamente, o arquivo script.js que está sendo passado para o index.html do front end, é uma aplicação que nos permite salvar links de outros sites em nossa página. Toda a lógica está implementada no front-end (confira o [script](public/scripts.js)).

Dessa forma, nossa aplicação não consegue persistir dados no front-end. Para resolver esse problema usando o Node, podemos criar uma API, que servirá nosso front-end e armazenará nossos dados em um arquivo JSON (mock).

**Primeiro passo é criar nossa API:**

Para começar, iremos criar uma pasta chamada api, e adicionar os arquivos index.js e urls.json.

No arquivo **index.js** iremos iniciar um servidor, na porta 5000, que será onde a API será servida. Nesse arquivo, também construiremos a lógica que será usada para escrever no arquivo urls.json, que é nosso arquivo de armazenamento. O **urls.json** está imitando um DB.

De maneira resumida, pulando as etapas lógicas para fazer o tratamento dos arquivos e a lógica para regra de negócio de salvar, nosso arquivo index.js ficou dessa forma:

```jsx
const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const data = require('./urls.json');
// Função que escreve as informações que serão salvas no urls.json
function writeFile(callback) {
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err
      callback(JSON.stringify({ message: 'ok' }));
    }
  )
}

const server = http.createServer((req, res) => {
  const { name, url, del } = URL.parse(req.url, true).query;
  if (!name || !url) {
//lista todos os links disponíveis no nosso urls.json
    return res.end(JSON.stringify(data));
  }
// função que deleta um link do nosso arquivo urls.json
  if (del) {
    data.urls = data.urls.filter(items => String(items.url) !== String(url));
    return writeFile(message => res.end(message));
  }

//função que cria um novo link no nosso urls.json
  data.urls.push({ name, url })
  return writeFile(message => res.end(message));
});

server.listen(5000, () => {
  console.log(`API IS RUNNING AT =======> http://localhost:${PORT}`);
})
```

Nossa API, por sua vez, possui esse aspecto:

```json
{
  "urls": [
    {
      "name": "QuestMaster",
      "url": "http://questmaster.com.br"
    },
    {
      "name": "Google",
      "url": "http://google.com"
    },
    {
      "name": "Discord",
      "url": "http://discord.com"
    }
  ]
}
```

Agora, para consumirmos  essa API criada, no nosso front end, faremos o seguinte:

Dentro do nosso arquivo de scritps, iremos adicionar o seguinte código JS:

```jsx
async function load() {
    const res = await fetch('http://localhost:5000/').then(data => data.json());
    res.urls.map(url => addElement(url));
}

load();
```
---
### Complementando e conferindo:

Nossa estrutura final de arquivos  da API ficou da seguinte maneira:

![Estrutura final de arquivos](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5c724948-717d-4b89-bae9-ddafbe9eb33c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211022%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211022T203714Z&X-Amz-Expires=86400&X-Amz-Signature=a912a739449fbb0e4f68d5b16327ac109dc613c374815e0546f300dd1dfa0ad6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

Nossa aplicação funcionando:

<div *align*="center">

<img *src*="assets/app.gif" *alt*="App funcionando">

</div>

---
### Desafio:

Para finalizar essa aula, temos o seguinte desafio:

- [ ]  Persistir os dados adicionados no front-end em nossa API. Ou seja, quando adicionarmos um novo link no nosso site, gravar a informação dentro do nosso arquivo urls.json
- [ ]  Deletar dados do nosso arquivo url.json de forma permanente.