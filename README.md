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

## 📡 Endpoint Principal
POST /scan

# body(JSON)
{
  "url": "https://example.com"
}

- Exemplo de resposta da API
{
    "url": "https://example.com/",
    "vulnerable": true,
    "details": [
        {
            "payload": "' OR SLEEP(5)--",
            "reason": "SQL error message detected"
        }
    ]
}

## 🎯 Objetivo do Projeto
- Demonstrar conhecimento prático em:
- Backend com Node.js e TypeScript
- Criação de APIs REST
- Conceitos de segurança web
- Detecção básica de vulnerabilidades
- Boas práticas de estrutura e validação
