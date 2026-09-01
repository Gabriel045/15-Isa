// Countdown — set your target date/time here
const target = new Date('2026-12-30T19:00:00');
function tick() {
  const now = new Date();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
}
tick();
setInterval(tick, 1000);

// Simple exclusive-choice RSVP toggle
function setRsvp(btn, choice) {
  document.querySelectorAll('.rsvp-btn').forEach(b => b.setAttribute('aria-pressed','false'));
  btn.setAttribute('aria-pressed','true');
}

// Personaliza la invitación según el token ?i= de la URL, buscando el
// nombre en data/invitados.json (generado por tools/generar_invitados.py)
async function cargarInvitado() {
  const nombreEl = document.getElementById('invitation-name');
  const token = new URLSearchParams(window.location.search).get('i');
  if (!nombreEl || !token) return;

  try {
    const res = await fetch('data/invitados.json');
    const invitados = await res.json();
    const invitado = invitados[token];
    if (invitado) {
      nombreEl.textContent = invitado.nombre;
    }
  } catch (err) {
    console.error('No se pudo cargar data/invitados.json', err);
  }
}
cargarInvitado();

// Entry gate popup — locks scroll until the guest taps "Entrar"
const entryGate = document.getElementById('entry-gate');
const entryBtn = document.getElementById('entry-btn');
if (entryGate && entryBtn) {
  document.body.style.overflow = 'hidden';
  entryBtn.addEventListener('click', () => {
    entryGate.classList.add('entry-gate-hidden');
    document.body.style.overflow = '';
    setTimeout(() => entryGate.remove(), 500);
  });
}
