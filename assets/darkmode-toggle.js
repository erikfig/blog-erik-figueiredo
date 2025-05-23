// darkmode-toggle.js
// Botão de alternância de dark mode reutilizável
(function() {
  function setDarkMode(on) {
    const icon = document.getElementById('darkmode-icon');
    if(on) {
      document.documentElement.classList.add('darkmode');
      if(icon) icon.textContent = '☀️';
      localStorage.setItem('darkmode', 'on');
    } else {
      document.documentElement.classList.remove('darkmode');
      if(icon) icon.textContent = '🌙';
      localStorage.setItem('darkmode', 'off');
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('toggle-darkmode');
    if(btn) {
      btn.addEventListener('click', function() {
        setDarkMode(!document.documentElement.classList.contains('darkmode'));
      });
    }
    // Inicialização
    if(localStorage.getItem('darkmode') === 'on' || (localStorage.getItem('darkmode') === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  });
})();
