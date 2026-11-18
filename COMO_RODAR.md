# 🌐 Como Rodar o EduGrade Frontend

## Visão Geral

O frontend é um conjunto de páginas HTML estáticas com JavaScript Vanilla (ES Modules). Não requer build — pode ser servido por qualquer servidor HTTP estático.

> [!NOTE]
> O backend FastAPI **já serve o frontend automaticamente** na porta 8000 quando encontra a pasta `frontend/` na raiz do projeto. Você só precisa rodar o frontend separado se quiser desenvolvimento isolado.

## Opção 1 — Integrado ao Backend (Recomendado)

Basta rodar o backend normalmente. Ele serve o frontend como arquivos estáticos:

```
http://localhost:8000       → App completo (front + back)
http://localhost:8000/docs  → Swagger API
```

Veja instruções completas em: [EduGrade-backend/COMO_RODAR.md](https://github.com/vivoeasy100/EduGrade-backend/blob/main/COMO_RODAR.md)

## Opção 2 — Frontend Separado (porta 8080)

```powershell
# 1. Clone o repositório
git clone https://github.com/vivoeasy100/EduGrade-frontend.git
cd EduGrade-frontend

# 2. Configure o .env (opcional — o config.js já tem fallback)
copy .env.example .env
# API_BASE_URL=http://localhost:8000/api/v1

# 3. Sirva os arquivos estáticos
python -m http.server 8080
# App em http://localhost:8080
```

> [!IMPORTANT]
> O backend deve estar rodando na porta 8000 antes de usar o frontend separado.

## Configuração da API

O arquivo `js/config.js` define a URL base da API com a seguinte prioridade:

1. `window.__ENV__.API_BASE_URL` (injetado via build/servidor)
2. `window.API_BASE_URL` (global definida antes do script)
3. **Fallback:** `http://localhost:8000/api/v1`

Para ambientes que não são `localhost:8000`, defina `API_BASE_URL` no seu servidor de deploy (Vercel, Netlify, etc.).

## Estrutura de Páginas

| Arquivo | Descrição |
|---------|-----------|
| `index.html` / `login.html` | Tela de login |
| `register.html` | Cadastro |
| `dashboard.html` | Dashboard principal |
| `admin/` | Painel administrativo |
| `professor/` | Portal do professor |
| `aluno/` | Portal do aluno |
| `workspace.html` | Workspace de correção |

## Contas de demonstração

| Perfil | Usuário | Senha |
|--------|---------|-------|
| Admin | `admin` | `admin123` |
| Professor | `professor` | `prof123` |
| Aluno | `aluno` | `aluno123` |

## CORS

Se aparecer erro de CORS no browser, certifique-se de que a URL do frontend está em `CORS_ORIGINS` no `.env` do backend:

```env
CORS_ORIGINS=["http://localhost:8080","http://127.0.0.1:8080"]
```
