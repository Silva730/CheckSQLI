## 🔍 SQL Injection Scanner API

# Status: PORTFÓLIO / FUNCIONAL

# Projeto de scanner automatizado de SQL Injection desenvolvido para fins educacionais e defensivos, com foco em análise de segurança de aplicações web.

# A aplicação expõe uma API REST que recebe uma URL e executa testes de SQLi utilizando múltiplas técnicas de detecção, retornando um relatório estruturado com possíveis indícios de vulnerabilidade.

## 🚀 Funcionalidades

- Scanner automático via API
- Testes com payloads de SQL Injection
- Análise por:
- mensagens de erro SQL
- status HTTP 5xx
- diferença de resposta (baseline vs payload)
- detecção básica de time-based SQLi
- Prevenção contra SSRF (bloqueio de localhost)
- Relatório em JSON
- Código organizado e modular

## 🛠 Tecnologias Utilizadas
- TypeScript
- Node.js
- Express
- Axios
