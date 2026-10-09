/* Acceso de maqueta: sin servidor, sin envío ni almacenamiento de contraseñas.
   No es autenticación segura para expedientes reales. */
(function () {
  'use strict';
  const KEY = 'srn-demo-session';
  function active() {
    try { return sessionStorage.getItem(KEY) === 'demo'; } catch (_) { return false; }
  }
  function redirect(url) { window.location.replace(url); }
  if (document.body.dataset.page === 'login') {
    if (active()) { redirect('notas.html'); return; }
    const form = document.getElementById('formularioLogin');
    const password = document.getElementById('claveInput');
    const error = document.getElementById('mensajeError');
    const toggle = document.getElementById('mostrarClave');
    toggle.addEventListener('click', () => {
      const show = password.type === 'password';
      password.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Ocultar' : 'Mostrar';
      toggle.setAttribute('aria-pressed', String(show));
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const carnet = document.getElementById('usuarioInput').value.trim();
      if (carnet !== '00048724' || password.value !== 'Demo2026!') {
        error.textContent = 'Carnet o contraseña incorrectos. Usa los datos de demostración indicados abajo.';
        error.hidden = false;
        password.value = '';
        password.focus();
        return;
      }
      try { sessionStorage.setItem(KEY, 'demo'); }
      catch (_) { error.textContent = 'Habilita el almacenamiento de sesión en tu navegador para ingresar.'; error.hidden = false; return; }
      password.value = '';
      error.hidden = true;
      redirect('notas.html');
    });
    return;
  }
  window.SRNAuth = {
    active,
    logout() { try { sessionStorage.removeItem(KEY); } catch (_) {} redirect('index.html'); }
  };
  if (!active()) redirect('index.html');
  window.addEventListener('pageshow', () => {
    if (!active()) { document.getElementById('portal').hidden = true; redirect('index.html'); }
  });
})();
