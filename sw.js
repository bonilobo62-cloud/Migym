// PWA INSTALL
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').classList.add('show');
  console.log('✅ Instalación disponible');
});
document.getElementById('installBtn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    document.getElementById('installBtn').classList.remove('show');
  } else {
    showToast('📱 Abre el menú de Chrome → "Añadir a pantalla de inicio"');
  }
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Migym/sw.js')
      .then(reg => console.log('✅ SW registrado:', reg))
      .catch(err => console.log('❌ SW error:', err));
  });
}
window.addEventListener('appinstalled', () => {
  document.getElementById('installBtn').classList.remove('show');
  deferredPrompt = null;
  showToast('🎉 App instalada');
});
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.getElementById('installBtn').style.display = 'none';
}