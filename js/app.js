/**
 * Centro de Pausas Activas - App Controller
 * Gestión de vistas, modos (CTE / Primaria), minijuegos y lógica de interacción.
 */

// Estado global de la aplicación
const AppState = {
  currentMode: 'cte', // 'cte' | 'primaria'
  currentView: 'hub', // 'hub' | 'ruleta' | 'cruz' | 'semaforo' | 'toques' | 'duelo' | 'calma'
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  setupNavigation();
  setupModeSwitch();
  setupAudioPlayer();
  setupWheel();
  setupCruz();
  setupSemaforo();
  setupToques();
  setupDuelo();
  setupCalma();

  // Inicializar en modo CTE
  setMode('cte');
}

/* ==========================================================================
   NAVEGACIÓN Y CAMBIO DE MODO
   ========================================================================== */
function setupNavigation() {
  const cards = document.querySelectorAll('[data-open-view]');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const viewId = card.getAttribute('data-open-view');
      switchView(viewId);
    });
  });

  const backButtons = document.querySelectorAll('.btn-back');
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchView('hub');
    });
  });

  const logoBtn = document.getElementById('logo-home');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => switchView('hub'));
  }

  // Fullscreen toggle
  const fsBtn = document.getElementById('btn-fullscreen');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });
  }
}

function switchView(viewName) {
  AppState.currentView = viewName;
  document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));

  // Detener bucles activos de otras vistas si se sale de ellas
  if (viewName !== 'cruz') stopCruzLoop();
  if (viewName !== 'semaforo') stopSemaforoAuto();
  if (viewName !== 'toques') stopToquesGame();
  if (viewName !== 'duelo') stopDueloTimer();
  if (viewName !== 'calma') stopCalmaAnimation();

  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Al abrir vistas específicas, inicializar su estado para el modo actual
  if (viewName === 'ruleta') renderWheel();
  if (viewName === 'cruz') resetCruz();
  if (viewName === 'semaforo') resetSemaforo();
  if (viewName === 'toques') resetToques();
  if (viewName === 'duelo') loadDueloCard();
  if (viewName === 'calma') startCalma();
}

function setupModeSwitch() {
  const btnCte = document.getElementById('mode-btn-cte');
  const btnPrimaria = document.getElementById('mode-btn-primaria');

  if (btnCte && btnPrimaria) {
    btnCte.addEventListener('click', () => setMode('cte'));
    btnPrimaria.addEventListener('click', () => setMode('primaria'));
  }
}

function setMode(mode) {
  AppState.currentMode = mode;
  const config = PAUSA_DATA.modes[mode];

  // Estilos de la página
  if (mode === 'primaria') {
    document.body.classList.add('mode-primaria');
    document.body.classList.remove('mode-cte');
  } else {
    document.body.classList.add('mode-cte');
    document.body.classList.remove('mode-primaria');
  }

  // Botones de selección
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  // Título y badge en Hub
  const hubBadge = document.getElementById('hub-badge');
  const hubTitle = document.getElementById('hub-title');
  const hubDesc = document.getElementById('hub-desc');

  if (hubBadge) hubBadge.textContent = config.badge;
  if (hubTitle) hubTitle.textContent = config.name;
  if (hubDesc) hubDesc.textContent = config.description;

  // Actualizar pista de música de fondo recomendada
  window.audioMgr.currentTrack = config.musicStyle;
  updatePlayerUI();
  if (window.audioMgr.isPlayingMusic) {
    window.audioMgr.playBgm(config.musicStyle);
  }

  // Si hay alguna vista activa, refrescar su contenido
  if (AppState.currentView === 'ruleta') renderWheel();
  if (AppState.currentView === 'cruz') resetCruz();
  if (AppState.currentView === 'semaforo') resetSemaforo();
  if (AppState.currentView === 'toques') resetToques();
  if (AppState.currentView === 'duelo') loadDueloCard();
  if (AppState.currentView === 'calma') startCalma();
}

/* ==========================================================================
   REPRODUCTOR DE AUDIO FLOTANTE
   ========================================================================== */
function setupAudioPlayer() {
  const playBtn = document.getElementById('btn-player-play');
  const muteBtn = document.getElementById('btn-player-mute');
  const volSlider = document.getElementById('player-volume');
  const trackBtn = document.getElementById('btn-toggle-track');

  // Inicializar slider con volumen por defecto (35%)
  if (volSlider) {
    volSlider.value = window.audioMgr.volume * 100;
    volSlider.addEventListener('input', (e) => {
      window.audioMgr.setVolume(e.target.value / 100);
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      window.audioMgr.toggleBgm();
      updatePlayerUI();
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const isMuted = window.audioMgr.toggleMute();
      muteBtn.textContent = isMuted ? '🔇' : '🔊';
    });
  }

  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      const nextTrack = window.audioMgr.currentTrack === 'lofi' ? 'upbeat' : 'lofi';
      window.audioMgr.playBgm(nextTrack);
      updatePlayerUI();
    });
  }

  window.audioMgr.subscribe(() => updatePlayerUI());
  updatePlayerUI();
}

function updatePlayerUI() {
  const playBtn = document.getElementById('btn-player-play');
  const trackName = document.getElementById('player-track-name');
  const trackTag = document.getElementById('player-track-tag');
  const muteBtn = document.getElementById('btn-player-mute');

  if (playBtn) {
    playBtn.textContent = window.audioMgr.isPlayingMusic ? '⏸' : '▶';
  }
  if (muteBtn) {
    muteBtn.textContent = window.audioMgr.isMuted ? '🔇' : '🔊';
  }
  if (trackName) {
    trackName.textContent = window.audioMgr.currentTrack === 'lofi' ? 'Lo-Fi Chillhop (Docentes)' : 'Up-Beat Funk (Primaria)';
  }
  if (trackTag) {
    trackTag.textContent = window.audioMgr.isPlayingMusic ? 'Sonando en vivo' : 'En pausa';
  }
}

/* ==========================================================================
   1. RULETA DEL MOVIMIENTO
   ========================================================================== */
let currentWheelRotation = 0;
let isWheelSpinning = false;
let wheelTimer = null;
let timerLeft = 0;
let timerTotal = 20;

function setupWheel() {
  const spinBtn = document.getElementById('btn-spin-wheel');
  if (spinBtn) spinBtn.addEventListener('click', spinWheel);

  const timerToggleBtn = document.getElementById('btn-timer-toggle');
  if (timerToggleBtn) timerToggleBtn.addEventListener('click', toggleWheelTimer);

  const timerResetBtn = document.getElementById('btn-timer-reset');
  if (timerResetBtn) timerResetBtn.addEventListener('click', resetWheelTimer);

  const catalogBtn = document.getElementById('btn-wheel-catalog');
  if (catalogBtn) catalogBtn.addEventListener('click', openWheelCatalog);

  const modalClose = document.getElementById('btn-close-modal');
  if (modalClose) modalClose.addEventListener('click', closeWheelCatalog);

  // Time preset buttons
  document.querySelectorAll('.timer-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timer-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      timerTotal = parseInt(btn.dataset.time, 10);
      resetWheelTimer();
    });
  });
}

function getWheelItems() {
  return PAUSA_DATA.ruleta[AppState.currentMode] || PAUSA_DATA.ruleta.cte;
}

function renderWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const items = getWheelItems();
  const numSlices = items.length;
  const sliceAngle = (2 * Math.PI) / numSlices;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Borde exterior decorativo (anillo oscuro)
  ctx.beginPath();
  ctx.arc(radius, radius, radius - 2, 0, 2 * Math.PI);
  ctx.fillStyle = '#1e293b';
  ctx.fill();

  items.forEach((item, i) => {
    const angle = i * sliceAngle;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius - 14, angle, angle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Texto y emoji en el sector
    ctx.translate(radius, radius);
    ctx.rotate(angle + sliceAngle / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Fredoka", sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 3;

    // Acortar texto si supera 16 caracteres para no invadir el centro
    let displayTitle = item.name;
    if (displayTitle.length > 17) {
      displayTitle = displayTitle.substring(0, 15) + '...';
    }
    ctx.fillText(`${item.emoji} ${displayTitle}`, radius - 26, 4);
    ctx.restore();
  });

  // Dibujar puntos o luces LED en el marco exterior
  for (let i = 0; i < numSlices * 2; i++) {
    const dotAngle = (i * Math.PI) / numSlices;
    const dotX = radius + (radius - 8) * Math.cos(dotAngle);
    const dotY = radius + (radius - 8) * Math.sin(dotAngle);
    ctx.beginPath();
    ctx.arc(dotX, dotY, 3.5, 0, 2 * Math.PI);
    ctx.fillStyle = i % 2 === 0 ? '#fde047' : '#ffffff';
    ctx.fill();
  }
}

function spinWheel() {
  if (isWheelSpinning) return;
  isWheelSpinning = true;

  const canvas = document.getElementById('wheelCanvas');
  const spinBtn = document.getElementById('btn-spin-wheel');
  spinBtn.disabled = true;

  const items = getWheelItems();
  const numSlices = items.length;
  const targetIndex = Math.floor(Math.random() * numSlices);
  const targetItem = items[targetIndex];

  const degreesPerSlice = 360 / numSlices;
  const targetAngleInSlice = degreesPerSlice * targetIndex + degreesPerSlice / 2;
  const targetStopAngle = (270 - targetAngleInSlice + 360) % 360;
  const currentMod = currentWheelRotation % 360;
  const additionalRotation = (targetStopAngle - currentMod + 360) % 360;
  const totalRotation = 5 * 360 + additionalRotation;

  currentWheelRotation += totalRotation;

  canvas.style.transition = 'transform 5s cubic-bezier(0.12, 0.95, 0.25, 1)';
  canvas.style.transform = `rotate(${currentWheelRotation}deg)`;

  // Simular ticks de sonido durante el giro
  let tickCount = 0;
  const tickInterval = setInterval(() => {
    window.audioMgr.playTick();
    tickCount++;
    if (tickCount > 35) clearInterval(tickInterval);
  }, 120);

  setTimeout(() => {
    isWheelSpinning = false;
    spinBtn.disabled = false;
    window.audioMgr.playBell();
    showWheelResult(targetItem);
    triggerConfetti();
  }, 5000);
}

function showWheelResult(item) {
  const resultCard = document.getElementById('wheel-result-content');
  const placeholder = document.getElementById('wheel-result-placeholder');
  if (placeholder) placeholder.style.display = 'none';
  if (resultCard) {
    resultCard.classList.remove('hidden');
    resultCard.style.display = 'block';

    document.getElementById('res-category').textContent = item.category;
    document.getElementById('res-emoji').textContent = item.emoji;
    document.getElementById('res-title').textContent = item.name;
    document.getElementById('res-tagline').textContent = item.tagline;
    document.getElementById('res-instructions').textContent = item.instructions;
    document.getElementById('res-benefits').textContent = item.benefits;
    document.getElementById('res-tips').textContent = item.tips;

    timerTotal = item.defaultTime || 20;
    resetWheelTimer();
  }
}

function toggleWheelTimer() {
  const playBtn = document.getElementById('btn-timer-toggle');
  if (wheelTimer) {
    clearInterval(wheelTimer);
    wheelTimer = null;
    playBtn.textContent = '▶ Iniciar';
  } else {
    playBtn.textContent = '⏸ Pausar';
    wheelTimer = setInterval(() => {
      timerLeft--;
      updateWheelTimerDisplay();
      if (timerLeft <= 3 && timerLeft > 0) {
        window.audioMgr.playCountBeep(false);
      }
      if (timerLeft <= 0) {
        clearInterval(wheelTimer);
        wheelTimer = null;
        playBtn.textContent = '▶ Iniciar';
        window.audioMgr.playBell();
        triggerConfetti();
      }
    }, 1000);
  }
}

function resetWheelTimer() {
  if (wheelTimer) {
    clearInterval(wheelTimer);
    wheelTimer = null;
  }
  const playBtn = document.getElementById('btn-timer-toggle');
  if (playBtn) playBtn.textContent = '▶ Iniciar';
  timerLeft = timerTotal;
  updateWheelTimerDisplay();
}

function updateWheelTimerDisplay() {
  const display = document.getElementById('wheel-timer-number');
  const bar = document.getElementById('wheel-timer-bar');
  if (display) display.textContent = timerLeft;
  if (bar) {
    const pct = Math.max(0, (timerLeft / timerTotal) * 100);
    bar.style.width = `${pct}%`;
  }
}

function openWheelCatalog() {
  const modal = document.getElementById('modal-catalog');
  const grid = document.getElementById('catalog-cards-grid');
  const items = getWheelItems();

  grid.innerHTML = items.map((it, idx) => `
    <div class="tool-card" style="cursor:pointer;" onclick="selectCatalogItem(${idx})">
      <div style="font-size:2rem; margin-bottom: 0.5rem;">${it.emoji}</div>
      <h4 style="font-size: 1.1rem; color: #1e1b4b; margin-bottom:4px;">${it.name}</h4>
      <span style="font-size:0.75rem; color:${it.color}; font-weight:700; text-transform:uppercase;">${it.category}</span>
      <p style="font-size:0.85rem; color:#475569; margin: 0.5rem 0;">${it.instructions}</p>
      <div style="font-size:0.8rem; color:#059669; font-weight:600;">✓ ${it.benefits}</div>
    </div>
  `).join('');

  modal.classList.add('active');
}

function closeWheelCatalog() {
  const modal = document.getElementById('modal-catalog');
  if (modal) modal.classList.remove('active');
}

window.selectCatalogItem = function(index) {
  closeWheelCatalog();
  const items = getWheelItems();
  if (items[index]) {
    showWheelResult(items[index]);
  }
};

/* ==========================================================================
   2. CRUZ DE COORDINACIÓN
   ========================================================================== */
let cruzInterval = null;
let cruzBpm = 100;
let cruzIndex = 0;
let currentPattern = [];

function setupCruz() {
  const startBtn = document.getElementById('btn-cruz-start');
  const stopBtn = document.getElementById('btn-cruz-stop');
  const patternSelect = document.getElementById('cruz-pattern-select');

  if (startBtn) startBtn.addEventListener('click', startCruz);
  if (stopBtn) stopBtn.addEventListener('click', stopCruzLoop);

  document.querySelectorAll('.cruz-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cruz-speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cruzBpm = parseInt(btn.dataset.bpm, 10);
      if (cruzInterval) {
        stopCruzLoop();
        startCruz();
      }
    });
  });

  if (patternSelect) {
    patternSelect.addEventListener('change', () => {
      resetCruz();
    });
  }

  // Permite hacer clic en los cuadrantes manualmente
  document.querySelectorAll('.cross-quadrant').forEach(quad => {
    quad.addEventListener('click', () => {
      const qNum = parseInt(quad.dataset.q, 10);
      highlightQuadrant(qNum);
      window.audioMgr.playBeatTick(qNum === 1);
    });
  });
}

function resetCruz() {
  stopCruzLoop();
  const data = PAUSA_DATA.cruz[AppState.currentMode];
  const select = document.getElementById('cruz-pattern-select');
  const descEl = document.getElementById('cruz-pattern-desc');
  const titleEl = document.getElementById('cruz-title');
  const subEl = document.getElementById('cruz-subtitle');

  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.subtitle;

  if (select) {
    select.innerHTML = data.patterns.map((p, idx) => `<option value="${idx}">${p.name}</option>`).join('');
    currentPattern = data.patterns[0].sequence;
    if (descEl) descEl.textContent = data.patterns[0].desc;
  }
}

function startCruz() {
  stopCruzLoop();
  const data = PAUSA_DATA.cruz[AppState.currentMode];
  const select = document.getElementById('cruz-pattern-select');
  const patternIdx = select ? parseInt(select.value, 10) : 0;
  const pattern = data.patterns[patternIdx];
  currentPattern = pattern.sequence;

  const descEl = document.getElementById('cruz-pattern-desc');
  if (descEl) descEl.textContent = pattern.desc;

  const intervalMs = (60 / cruzBpm) * 1000;
  cruzIndex = 0;

  // Animación y sonido sincronizados
  cruzInterval = setInterval(() => {
    const qNum = currentPattern[cruzIndex % currentPattern.length];
    highlightQuadrant(qNum);
    window.audioMgr.playBeatTick(cruzIndex % currentPattern.length === 0);
    cruzIndex++;
  }, intervalMs);

  const startBtn = document.getElementById('btn-cruz-start');
  const stopBtn = document.getElementById('btn-cruz-stop');
  if (startBtn) startBtn.style.display = 'none';
  if (stopBtn) stopBtn.style.display = 'inline-flex';
}

function stopCruzLoop() {
  if (cruzInterval) {
    clearInterval(cruzInterval);
    cruzInterval = null;
  }
  document.querySelectorAll('.cross-quadrant').forEach(q => q.classList.remove('active'));

  const startBtn = document.getElementById('btn-cruz-start');
  const stopBtn = document.getElementById('btn-cruz-stop');
  if (startBtn) startBtn.style.display = 'inline-flex';
  if (stopBtn) stopBtn.style.display = 'none';
}

function highlightQuadrant(qNum) {
  document.querySelectorAll('.cross-quadrant').forEach(q => q.classList.remove('active'));
  const target = document.querySelector(`.cross-quadrant.q${qNum}`);
  if (target) {
    target.classList.add('active');
    setTimeout(() => {
      target.classList.remove('active');
    }, 250);
  }
}

/* ==========================================================================
   3. SEMÁFORO DE REACCIÓN
   ========================================================================== */
let semaforoTimer = null;
let currentLight = 'verde';
let semaforoModeAuto = true;

function setupSemaforo() {
  const toggleModeBtn = document.getElementById('btn-semaforo-mode-toggle');
  const manualNextBtn = document.getElementById('btn-semaforo-next');
  const autoStartBtn = document.getElementById('btn-semaforo-autostart');

  if (autoStartBtn) {
    autoStartBtn.addEventListener('click', () => {
      if (semaforoTimer) {
        stopSemaforoAuto();
        autoStartBtn.textContent = '▶ Iniciar Automático';
      } else {
        startSemaforoAuto();
        autoStartBtn.textContent = '⏹ Detener';
      }
    });
  }

  if (manualNextBtn) {
    manualNextBtn.addEventListener('click', () => {
      stepSemaforoManual();
    });
  }
}

function resetSemaforo() {
  stopSemaforoAuto();
  setSemaforoColor('verde');
  const data = PAUSA_DATA.semaforo[AppState.currentMode];
  const title = document.getElementById('semaforo-title');
  const sub = document.getElementById('semaforo-subtitle');
  if (title) title.textContent = data.title;
  if (sub) sub.textContent = data.subtitle;
}

function setSemaforoColor(color) {
  currentLight = color;
  const data = PAUSA_DATA.semaforo[AppState.currentMode].rules[color];

  // Actualizar luces visuales
  document.querySelectorAll('.traffic-housing .light').forEach(l => l.classList.remove('active'));
  const activeLight = document.getElementById(`light-${color}`);
  if (activeLight) activeLight.classList.add('active');

  // Actualizar texto del banner
  const banner = document.getElementById('semaforo-banner');
  if (banner) {
    banner.style.backgroundColor = color === 'rojo' ? '#fee2e2' : color === 'amarillo' ? '#fef9c3' : '#dcfce7';
    banner.style.color = color === 'rojo' ? '#991b1b' : color === 'amarillo' ? '#854d0e' : '#166534';
    banner.textContent = data.text;
  }

  const desc = document.getElementById('semaforo-instruction');
  if (desc) desc.textContent = data.desc;

  // Efectos de sonido y control de música de fondo
  if (color === 'rojo') {
    window.audioMgr.playWhistle();
    // Requerimiento: pausa automática de la música en rojo
    if (window.audioMgr.isPlayingMusic) {
      window.audioMgr.pauseBgm();
    }
  } else if (color === 'amarillo') {
    window.audioMgr.playCountBeep(false);
  } else if (color === 'verde') {
    window.audioMgr.playBeatTick(true);
    // Reanudar música en verde
    if (!window.audioMgr.isPlayingMusic && window.audioMgr.masterGain) {
      window.audioMgr.playBgm();
    }
  }
}

function stepSemaforoManual() {
  if (currentLight === 'verde') setSemaforoColor('amarillo');
  else if (currentLight === 'amarillo') setSemaforoColor('rojo');
  else setSemaforoColor('verde');
}

function startSemaforoAuto() {
  stopSemaforoAuto();
  const nextStep = () => {
    let nextColor = 'verde';
    if (currentLight === 'verde') nextColor = 'amarillo';
    else if (currentLight === 'amarillo') nextColor = 'rojo';
    else nextColor = 'verde';

    setSemaforoColor(nextColor);

    const range = PAUSA_DATA.semaforo[AppState.currentMode].durations[nextColor];
    const duration = (Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0]) * 1000;
    semaforoTimer = setTimeout(nextStep, duration);
  };

  const range = PAUSA_DATA.semaforo[AppState.currentMode].durations[currentLight];
  const initialDuration = range[0] * 1000;
  semaforoTimer = setTimeout(nextStep, initialDuration);
}

function stopSemaforoAuto() {
  if (semaforoTimer) {
    clearTimeout(semaforoTimer);
    semaforoTimer = null;
  }
}

/* ==========================================================================
   4. RETO DE TOQUES (SIN DEJAR CAER)
   ========================================================================== */
let toquesScore = 0;
let toquesHighScore = 0;
let toquesTimer = null;
let toquesTimeRemaining = 45;
let toquesGameActive = false;

// Variables de física del globo en pantalla
let balloonX = 50; // porcentaje
let balloonY = 30; // porcentaje
let balloonVY = 0;
let balloonVX = 0;
let animationFrameId = null;

function setupToques() {
  const tapBtn = document.getElementById('btn-manual-touch');
  if (tapBtn) {
    tapBtn.addEventListener('click', registerTouch);
  }

  const resetBtn = document.getElementById('btn-toques-reset');
  if (resetBtn) resetBtn.addEventListener('click', resetToques);

  const startBtn = document.getElementById('btn-toques-start');
  if (startBtn) startBtn.addEventListener('click', startToquesGame);

  const balloonEl = document.getElementById('interactive-balloon');
  if (balloonEl) {
    balloonEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      boostBalloon();
    });
  }

  const arenaEl = document.getElementById('balloon-arena');
  if (arenaEl) {
    arenaEl.addEventListener('pointerdown', (e) => {
      if (e.target === arenaEl) {
        // Toque en el área también impulsa si está cerca
        boostBalloon();
      }
    });
  }
}

function resetToques() {
  stopToquesGame();
  toquesScore = 0;
  toquesTimeRemaining = 45;
  updateToquesUI();

  const data = PAUSA_DATA.toques[AppState.currentMode];
  const title = document.getElementById('toques-title');
  const sub = document.getElementById('toques-subtitle');
  const challengeText = document.getElementById('toques-challenge-text');

  if (title) title.textContent = data.title;
  if (sub) sub.textContent = data.subtitle;

  if (challengeText && data.challenges) {
    const randomChallenge = data.challenges[Math.floor(Math.random() * data.challenges.length)];
    challengeText.textContent = `🎯 Reto: ${randomChallenge}`;
  }

  // Reset balloon
  balloonX = 50;
  balloonY = 30;
  balloonVX = 0;
  balloonVY = 0;
  const balloonEl = document.getElementById('interactive-balloon');
  if (balloonEl) {
    balloonEl.style.left = '50%';
    balloonEl.style.top = '30%';
  }
}

function startToquesGame() {
  if (toquesGameActive) return;
  toquesGameActive = true;
  toquesScore = 0;
  balloonX = 50;
  balloonY = 30;
  balloonVX = (Math.random() - 0.5) * 0.4;
  balloonVY = -0.6;

  const startBtn = document.getElementById('btn-toques-start');
  if (startBtn) startBtn.disabled = true;

  // Iniciar timer
  toquesTimer = setInterval(() => {
    toquesTimeRemaining--;
    updateToquesUI();

    if (toquesTimeRemaining <= 0) {
      endToquesGame(true);
    }
  }, 1000);

  // Iniciar bucle de física
  runBalloonPhysics();
}

function boostBalloon() {
  if (!toquesGameActive) {
    startToquesGame();
  }
  // Impulso hacia arriba y un pequeño azar lateral
  balloonVY = -1.4;
  balloonVX += (Math.random() - 0.5) * 0.6;
  registerTouch();
}

function registerTouch() {
  toquesScore++;
  if (toquesScore > toquesHighScore) {
    toquesHighScore = toquesScore;
  }
  window.audioMgr.playPop();
  updateToquesUI();
}

function runBalloonPhysics() {
  if (!toquesGameActive) return;

  const gravity = 0.025;
  balloonVY += gravity;
  balloonY += balloonVY;
  balloonX += balloonVX;

  // Rebote en paredes laterales
  if (balloonX < 10) {
    balloonX = 10;
    balloonVX = -balloonVX * 0.7;
  } else if (balloonX > 90) {
    balloonX = 90;
    balloonVX = -balloonVX * 0.7;
  }

  // Techo
  if (balloonY < 10) {
    balloonY = 10;
    balloonVY = 0.2;
  }

  // Suelo (caída)
  if (balloonY > 90) {
    endToquesGame(false);
    return;
  }

  const b = document.getElementById('interactive-balloon');
  if (b) {
    b.style.left = `${balloonX}%`;
    b.style.top = `${balloonY}%`;
  }

  animationFrameId = requestAnimationFrame(runBalloonPhysics);
}

function endToquesGame(completedTime) {
  stopToquesGame();
  window.audioMgr.playWhistle();

  if (completedTime || toquesScore >= 20) {
    window.audioMgr.playBell();
    triggerConfetti();
  }
}

function stopToquesGame() {
  toquesGameActive = false;
  if (toquesTimer) {
    clearInterval(toquesTimer);
    toquesTimer = null;
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  const startBtn = document.getElementById('btn-toques-start');
  if (startBtn) startBtn.disabled = false;
}

function updateToquesUI() {
  const scoreEl = document.getElementById('toques-score-num');
  const highEl = document.getElementById('toques-highscore-num');
  const timeEl = document.getElementById('toques-time-num');

  if (scoreEl) scoreEl.textContent = toquesScore;
  if (highEl) highEl.textContent = toquesHighScore;
  if (timeEl) timeEl.textContent = `${toquesTimeRemaining}s`;
}

/* ==========================================================================
   5. DUELO DE ESPEJO / GIMNASIA CEREBRAL
   ========================================================================== */
let dueloTimer = null;
let dueloTimeLeft = 20;
let currentDueloIndex = 0;
let isLeaderPlayerA = true;

function setupDuelo() {
  const nextBtn = document.getElementById('btn-duelo-next');
  if (nextBtn) nextBtn.addEventListener('click', loadDueloCard);

  const startTimerBtn = document.getElementById('btn-duelo-start-timer');
  if (startTimerBtn) startTimerBtn.addEventListener('click', startDueloTimer);
}

function loadDueloCard() {
  const data = PAUSA_DATA.duelo[AppState.currentMode];
  const cards = data.cards;
  currentDueloIndex = (currentDueloIndex + 1) % cards.length;
  const card = cards[currentDueloIndex];

  document.getElementById('duelo-title-main').textContent = data.title;
  document.getElementById('duelo-subtitle-main').textContent = data.subtitle;
  document.getElementById('duelo-emoji').textContent = card.emoji;
  document.getElementById('duelo-card-title').textContent = card.title;
  document.getElementById('duelo-card-desc').textContent = card.desc;
  document.getElementById('duelo-card-focus').textContent = `Enfoque: ${card.focus}`;

  resetDueloTimer();
}

function startDueloTimer() {
  if (dueloTimer) {
    stopDueloTimer();
    return;
  }
  const btn = document.getElementById('btn-duelo-start-timer');
  if (btn) btn.textContent = '⏸ Pausar Ronda';

  dueloTimer = setInterval(() => {
    dueloTimeLeft--;
    updateDueloTimerUI();

    if (dueloTimeLeft === 3 || dueloTimeLeft === 2 || dueloTimeLeft === 1) {
      window.audioMgr.playCountBeep(false);
    }

    if (dueloTimeLeft <= 0) {
      // Cambio de rol con silbato
      isLeaderPlayerA = !isLeaderPlayerA;
      window.audioMgr.playWhistle();
      updateRoleBanner();
      dueloTimeLeft = PAUSA_DATA.duelo.roundTime;
      updateDueloTimerUI();
    }
  }, 1000);
}

function stopDueloTimer() {
  if (dueloTimer) {
    clearInterval(dueloTimer);
    dueloTimer = null;
  }
  const btn = document.getElementById('btn-duelo-start-timer');
  if (btn) btn.textContent = '▶ Iniciar Ronda y Cambio';
}

function resetDueloTimer() {
  stopDueloTimer();
  dueloTimeLeft = PAUSA_DATA.duelo.roundTime;
  isLeaderPlayerA = true;
  updateRoleBanner();
  updateDueloTimerUI();
}

function updateRoleBanner() {
  const banner = document.getElementById('duelo-role-banner');
  if (banner) {
    banner.textContent = isLeaderPlayerA 
      ? "🎯 Turno: JUGADOR A es el LÍDER | JUGADOR B es el ESPEJO" 
      : "🔄 ¡CAMBIO DE ROLES! JUGADOR B es el LÍDER | JUGADOR A es el ESPEJO";
  }
}

function updateDueloTimerUI() {
  const num = document.getElementById('duelo-timer-num');
  const bar = document.getElementById('duelo-timer-bar');
  if (num) num.textContent = `${dueloTimeLeft}s`;
  if (bar) {
    const pct = (dueloTimeLeft / PAUSA_DATA.duelo.roundTime) * 100;
    bar.style.width = `${pct}%`;
  }
}

/* ==========================================================================
   6. VUELTA A LA CALMA
   ========================================================================== */
let calmaInterval = null;
let calmaPhaseIndex = 0;
let currentTechnique = null;
let breathStage = 'inhale'; // inhale, hold, exhale, rest
let breathSecondsCounter = 0;
let breathTotalSeconds = 4;

function setupCalma() {
  const techSelect = document.getElementById('calma-tech-select');
  if (techSelect) {
    techSelect.addEventListener('change', () => {
      startCalma();
    });
  }

  const nextStepBtn = document.getElementById('btn-calma-next-step');
  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      const data = PAUSA_DATA.calma[AppState.currentMode];
      calmaPhaseIndex = (calmaPhaseIndex + 1) % data.steps.length;
      renderCalmaStep();
    });
  }
}

function startCalma() {
  stopCalmaAnimation();
  const data = PAUSA_DATA.calma[AppState.currentMode];
  document.getElementById('calma-title').textContent = data.title;
  document.getElementById('calma-subtitle').textContent = data.subtitle;

  const techSelect = document.getElementById('calma-tech-select');
  const selectedTechId = techSelect ? techSelect.value : 'box';
  currentTechnique = PAUSA_DATA.calma.techniques.find(t => t.id === selectedTechId) || PAUSA_DATA.calma.techniques[0];

  calmaPhaseIndex = 0;
  renderCalmaStep();

  // Ciclo de respiración
  breathStage = 'inhale';
  breathSecondsCounter = currentTechnique.inhale;
  applyBreathVisuals('Inhala profundo...', 1.45, currentTechnique.inhale);
  window.audioMgr.playGong();

  calmaInterval = setInterval(() => {
    breathSecondsCounter--;

    const countEl = document.getElementById('calma-seconds-num');
    if (countEl) countEl.textContent = breathSecondsCounter;

    if (breathSecondsCounter <= 0) {
      transitionBreathStage();
    }
  }, 1000);
}

function transitionBreathStage() {
  const circle = document.getElementById('breath-bubble');
  const text = document.getElementById('breath-action-text');

  if (breathStage === 'inhale') {
    if (currentTechnique.hold > 0) {
      breathStage = 'hold';
      breathSecondsCounter = currentTechnique.hold;
      applyBreathVisuals('Sostén el aire...', 1.45, currentTechnique.hold);
    } else {
      breathStage = 'exhale';
      breathSecondsCounter = currentTechnique.exhale;
      applyBreathVisuals('Exhala despacio...', 0.9, currentTechnique.exhale);
    }
  } else if (breathStage === 'hold') {
    breathStage = 'exhale';
    breathSecondsCounter = currentTechnique.exhale;
    applyBreathVisuals('Exhala suavemente...', 0.9, currentTechnique.exhale);
  } else if (breathStage === 'exhale') {
    if (currentTechnique.rest > 0) {
      breathStage = 'rest';
      breathSecondsCounter = currentTechnique.rest;
      applyBreathVisuals('Pausa y calma...', 0.9, currentTechnique.rest);
    } else {
      breathStage = 'inhale';
      breathSecondsCounter = currentTechnique.inhale;
      applyBreathVisuals('Inhala profundo...', 1.45, currentTechnique.inhale);
      window.audioMgr.playGong();
    }
  } else if (breathStage === 'rest') {
    breathStage = 'inhale';
    breathSecondsCounter = currentTechnique.inhale;
    applyBreathVisuals('Inhala profundo...', 1.45, currentTechnique.inhale);
    window.audioMgr.playGong();
  }
}

function applyBreathVisuals(label, scale, durationSec) {
  const circle = document.getElementById('breath-bubble');
  const text = document.getElementById('breath-action-text');
  const countEl = document.getElementById('calma-seconds-num');

  if (text) text.textContent = label;
  if (countEl) countEl.textContent = durationSec;
  if (circle) {
    circle.style.transition = `transform ${durationSec}s ease-in-out`;
    circle.style.transform = `scale(${scale})`;
  }
}

function renderCalmaStep() {
  const data = PAUSA_DATA.calma[AppState.currentMode];
  const step = data.steps[calmaPhaseIndex];
  const stepTag = document.getElementById('calma-step-tag');
  const stepText = document.getElementById('calma-step-text');

  if (stepTag) stepTag.textContent = `Paso ${calmaPhaseIndex + 1} de ${data.steps.length}: ${step.phase}`;
  if (stepText) stepText.textContent = step.text;
}

function stopCalmaAnimation() {
  if (calmaInterval) {
    clearInterval(calmaInterval);
    calmaInterval = null;
  }
}

/* ==========================================================================
   CONFETI
   ========================================================================== */
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 14,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravedad
      p.rotation += p.vRot;
      p.alpha -= 0.015;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frames++;
    if (frames < 70) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}
