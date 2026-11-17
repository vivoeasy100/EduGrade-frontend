# EduGrade Frontend

Interface do usuário do EduGrade construída com HTML, CSS e JavaScript Vanilla (ES Modules). Consome a API REST do Backend via `fetch()`.

## 🚀 Tecnologias

- **Vanilla JS (ES Modules)** - Sem frameworks, código leve e direto
- **HTML5 + CSS3** - Estilização moderna com variáveis CSS
- **Fetch API** - Comunicação com o Backend
- **Feather Icons** - Ícones leves (via CDN)

## 📁 Estrutura

```
frontend/
├── admin/              # Páginas administrativas
│   ├── assignments.html
│   ├── dashboard.html
│   ├── grades.html
│   └── settings.html
├── aluno/              # Páginas do aluno
│   └── dashboard.html
├── professor/          # Páginas do professor
│   └── dashboard.html
├── css/
│   └── main.css        # Estilos globais
├── js/
│   ├── config.js       # Configuração (API_BASE_URL via env)
│   ├── main.js         # API Client, Auth, State, UI, Sidebar
│   ├── progress.js     # ProgressManager para uploads/jobs
│   └── workspace.js    # Workspace compartilhado (CRUD genérico)
├── *.html              # Páginas principais (login, dashboard, workspace)
└── .env.example        # Exemplo de variáveis de ambiente
```

## ⚙️ Configuração

```bash
# 1. Clone o repositório
git clone https://github.com/vivoeasy100/EduGrade-frontend.git
cd EduGrade-frontend

# 2. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com a URL do backend

# 3. Sirva os arquivos estáticos (desenvolvimento)
python -m http.server 8080
# ou
npx serve .
# ou
php -S localhost:8080

# 4. Acesse http://localhost:8080
```

### Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `API_BASE_URL` | **Sim** | URL base da API do Backend (ex: `http://localhost:8000/api/v1`) |

> **Importante**: O frontend **nunca** deve conter lógica de negócio, chaves de API, conexão com banco de dados ou processamento de OCR/IA. Tudo isso fica no Backend.

## 🌐 Integração com Backend

O frontend faz chamadas `fetch()` para a API do Backend:

```javascript
// Exemplo: Login
const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});

// Exemplo: Listar provas
const exams = await api.list('/exams', { page: 1, page_size: 20 });
```

O `CONFIG.API_BASE_URL` é definido em `js/config.js` e pode ser sobrescrito:
1. Via `window.__ENV__.API_BASE_URL` (injetado no build - Vite, Webpack)
2. Via `window.API_BASE_URL` (definido globalmente antes do script)
3. Fallback: `http://localhost:8000/api/v1`

## 📦 Deploy

### Vercel / Netlify / Cloudflare Pages
1. Conecte o repositório
2. Configure **Build Command**: (vazio - site estático)
3. Configure **Output Directory**: `.` (raiz)
4. Adicione variável de ambiente: `API_BASE_URL=https://api.seudominio.com/api/v1`

### Apache / Nginx (Produção)
```nginx
server {
    listen 80;
    server_name app.seudominio.com;
    root /var/www/edigrade-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy para API (opcional - evita CORS)
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🧪 Testes Locais

```bash
# Backend rodando em http://localhost:8000
cd EduGrade-backend
uvicorn app.main:app --reload

# Frontend rodando em http://localhost:8080
cd EduGrade-frontend
python -m http.server 8080

# Configure CORS no backend (.env):
# CORS_ORIGINS=["http://localhost:8080","http://127.0.0.1:8080"]
```

## 🔗 Backend

Repositório separado: [EduGrade-backend](https://github.com/vivoeasy100/EduGrade-backend)

## 📋 Regras de Arquitetura

| ✅ Permitido no Frontend | ❌ NUNCA no Frontend |
|------------------------|---------------------|
| HTML, CSS, JS Vanilla | Lógica de negócio |
| `fetch()` para API | Chaves de API / Secrets |
| Validação UX (client-side) | Conexão direta com DB |
| Renderização de dados da API | Processamento OCR/IA |
| Gerenciamento de estado (UI) | Jobs em background |