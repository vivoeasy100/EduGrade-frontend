/**
 * EduGrade Frontend Configuration
 *
 * A variável API_BASE_URL deve ser definida via variável de ambiente
 * ou build time. Para desenvolvimento local, use o fallback.
 *
 * Exemplo .env:
 * API_BASE_URL=http://localhost:8000/api/v1
 *
 * Em produção, configure no servidor de deploy (Vercel, Netlify, etc.)
 */

const CONFIG = {
  // URL base da API do Backend
  // Pode ser sobrescrita via window.__ENV__ (injetado no build) ou variável global
  API_BASE_URL: (() => {
    // 1. Tenta variável injetada no build (Vite, Webpack, etc.)
    if (typeof window !== 'undefined' && window.__ENV__?.API_BASE_URL) {
      return window.__ENV__.API_BASE_URL;
    }
    // 2. Tenta variável global definida antes do script
    if (typeof window !== 'undefined' && window.API_BASE_URL) {
      return window.API_BASE_URL;
    }
    // 3. Fallback para desenvolvimento local
    return 'http://localhost:8000/api/v1';
  })(),

  // Chaves de armazenamento local
  TOKEN_KEY: 'edugrade_token',
  REFRESH_KEY: 'edugrade_refresh',
  USER_KEY: 'edugrade_user',
};

// Export para módulos ES6
export default CONFIG;

// Também disponibiliza globalmente para compatibilidade
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}