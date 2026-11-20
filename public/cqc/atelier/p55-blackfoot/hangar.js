(function () {
  'use strict';
  const canvas = document.getElementById('hangar'), context = canvas.getContext('2d');
  const play = document.getElementById('play'), step = document.getElementById('step');
  const aim = document.getElementById('aim'), pitch = document.getElementById('pitch'), sight = document.getElementById('sight');
  const loading = document.getElementById('loading'), retry = document.getElementById('retry');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hangar = CQC_P55_BLACKFOOT_HANGAR.create({baseURL: new URL('./', document.baseURI).href,
    ensureController: () => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('./blackfoot-isolated-controller-landing-v3.js?reload=' + Date.now(), document.baseURI).href;
      script.integrity = 'sha256-286qQ9656wBOm2wdTKsVFarXHA8dcRd3VFvnFEEuMOY='; script.crossOrigin = 'anonymous';
      script.onload = () => { script.remove(); resolve(globalThis.CQC_P41_BLACKFOOT_ISOLATED); };
      script.onerror = () => { script.remove(); reject(Error('Controller unavailable')); };
      document.head.append(script);
    })});
  let ready = false, running = false, frame = 0, animation = 0, previousTime = 0, loadController = null, manualPhase = false;
  function background() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#101d1d'; context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#24413b'; context.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 80) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, canvas.height); context.stroke(); }
    for (let y = 20; y < canvas.height; y += 80) { context.beginPath(); context.moveTo(0, y); context.lineTo(canvas.width, y); context.stroke(); }
    context.strokeStyle = '#779785'; context.beginPath(); context.moveTo(180, 570); context.lineTo(1140, 570); context.stroke();
  }
  function draw() {
    background();
    if (!ready) return;
    const pose = hangar.draw(context, {frame: Math.floor(frame), aimDegrees: Number(aim.value), pitchDegrees: Number(pitch.value), reducedMotion: reduced.matches && !manualPhase});
    if (pose?.muzzle && sight.checked) {
      const {x, y, axis} = pose.muzzle;
      context.save(); context.strokeStyle = '#ddc984'; context.lineWidth = 1.3;
      context.setLineDash([6, 6]); context.beginPath(); context.moveTo(x, y); context.lineTo(x + axis[0] * 180, y + axis[1] * 180); context.stroke();
      context.setLineDash([]); context.beginPath(); context.arc(x, y, 4, 0, Math.PI * 2); context.stroke(); context.restore();
    }
  }
  function setRunning(value) {
    running = value && ready && !reduced.matches; play.textContent = running ? 'Pause' : 'Démarrer';
    if (running) manualPhase = false;
    cancelAnimationFrame(animation); animation = 0; previousTime = 0;
    if (running) animation = requestAnimationFrame(tick); else draw();
  }
  function tick(time) {
    if (!running || !ready || reduced.matches || document.hidden) { setRunning(false); return; }
    if (previousTime) frame += Math.min(50, time - previousTime) * 0.06;
    previousTime = time; draw(); animation = requestAnimationFrame(tick);
  }
  function controls() {
    play.disabled = !ready || reduced.matches; step.disabled = !ready;
    aim.disabled = !ready; pitch.disabled = !ready; sight.disabled = !ready;
    document.getElementById('motion-note').hidden = !reduced.matches;
  }
  async function load() {
    loadController?.abort(); const controller = new AbortController(); loadController = controller;
    ready = false; setRunning(false); controls(); loading.hidden = false; loading.textContent = 'Préparation du montage…'; retry.hidden = true;
    try {
      await hangar.load({reload: true, signal: controller.signal});
      if (loadController !== controller || controller.signal.aborted) return;
      ready = true; loading.hidden = true; controls(); draw();
    } catch (error) {
      if (loadController !== controller || controller.signal.aborted) return;
      loading.textContent = 'Le montage n’a pas pu être chargé.'; retry.hidden = false;
    }
  }
  play.addEventListener('click', () => setRunning(!running));
  step.addEventListener('click', () => { setRunning(false); manualPhase = true; frame += 3; draw(); });
  aim.addEventListener('input', () => { document.getElementById('aim-value').value = aim.value + '°'; draw(); });
  pitch.addEventListener('input', () => { document.getElementById('pitch-value').value = pitch.value + '°'; draw(); });
  sight.addEventListener('change', draw); retry.addEventListener('click', load);
  reduced.addEventListener('change', () => { manualPhase = false; if (reduced.matches) { frame = 0; setRunning(false); } controls(); draw(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) setRunning(false); });
  addEventListener('pagehide', () => { loadController?.abort(); ready = false; setRunning(false); hangar.dispose(); });
  addEventListener('pageshow', event => { if (event.persisted) load(); });
  background(); controls(); load();
})();
