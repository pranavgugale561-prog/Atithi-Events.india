import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ── Global error capture: surface silent crashes on screen ──────────────────
function showError(msg) {
  document.getElementById('root').innerHTML = `
    <div style="min-height:100vh;background:#0a0a0a;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;font-family:monospace;text-align:center">
      <h2 style="color:#d4af37;margin-bottom:1rem">Site Error Detected</h2>
      <pre style="background:#111;padding:1rem;border-radius:12px;max-width:700px;width:100%;overflow:auto;text-align:left;font-size:0.8rem;color:#ff6b6b;border:1px solid rgba(255,100,100,0.3)">${msg}</pre>
      <button onclick="navigator.clipboard.writeText(document.querySelector('pre').innerText).then(()=>alert('Copied!'))" style="margin-top:1.5rem;padding:12px 24px;background:#d4af37;border:none;border-radius:100px;color:#000;font-weight:700;cursor:pointer">Copy Error</button>
      <button onclick="location.reload()" style="margin-top:0.8rem;padding:12px 24px;background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:100px;color:#fff;cursor:pointer">Refresh</button>
    </div>
  `;
}

window.onerror = (msg, src, line, col, err) => {
  showError(`${err?.stack || msg}\n\nAt: ${src}:${line}:${col}`);
};

window.addEventListener('unhandledrejection', (e) => {
  showError(`Unhandled Promise Rejection:\n${e.reason?.stack || e.reason}`);
});

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (err) {
  showError(err?.stack || err?.message || String(err));
}
