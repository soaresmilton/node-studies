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