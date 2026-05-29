/* ============================================================
   script.js — Birthday Website
   ============================================================ */

/* ── Konfigurasi ── */
const CONFIG = {
  PHOTO_PATH  : 'tai.jpeg',
  PERSON_NAME : 'Rania',
  AGE_LABEL   : 'Makin tua loh ya',
  MUSIC_PATH  : 'my-love-mine-all-mine.mp3', // ← taruh file mp3 se-folder
};

/* ── Pesan kartu ── */
const MESSAGES = {
  wish: {
    icon : '🎂',
    title: 'Selamat Ulang Tahun!',
    body :
      'selamat ulang tahun ke 17, Semoga di hari ulang tahunmu ini ' +
      'membawa senyuman manis, tawa, dan kebahagiaan yang tiada habisnya.\n\n' +
      'semoga kamu bisa menjadi pribadi yang lebih baik. Semoga tahun ini jauh lebih baik ' +
      'dari tahun sebelumnya. Kamu layak mendapat yang terbaik yang ada di dunia ini! 🎉🎂🎊',
  },
  love: {
    icon : '💕',
    title: 'Pesan',
    body :
      'Kamu adalah seseorang yang sangat berarti. jadi jaga kesehatannya ' +
      'jangan maksain dirimu sendiri, jangan lupa juga minum air putih.\n\n' +
      'aku ingin mengingatkanmu ' +
      'bahwa kamu layak dicintai, dihargai, dan sangat berarti. 💗💕🌹',
  },
  hope: {
    icon : '🌟',
    title: 'Harapan & Doa',
    body :
      'Semoga di lancarkan usaha bungamu, ' +
      'langkahmu dipermudah, setiap doamu dikabulkan, dan setiap impianmu terwujud.\n' +
      'Semoga kesehatan menyertaimu, rezeki terus mengalir, dan kebahagiaan ' +
      'tak pernah jauh darimu, semoga mendapatkan hal yang setara.',
  },
  flower: {
    icon : '🌺',
    title: 'Bunga Spesial Untukmu',
    body :
      '🌸 Mawar merah untukmu.\n' +
      '🌺 Bunga Sakura yang keindahannya seperti apa yang kamu bawa ke dunia ini.\n' +
      '🌼 Matahari untuk sinarmu yang selalu menerangi hari-hariku.\n' +
      '🌷 Tulip untuk keanggunan dan kelembutan hatimu.\n' +
      '🌹 Setangkai bunga untukmu, semoga hidupmu seindah taman bunga yang mekar di musim semi. ' +
      'Kamu adalah bunga paling indah! 💐',
  },
};

/* ══════════════════════════════════════════════════════════
   INISIALISASI
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  initPhoto();
  initText();
  initPetals();
  initMusic();
});

/* ── Foto ── */
function initPhoto() {
  const img = document.getElementById('photoImg');
  if (!img) return;
  img.src = CONFIG.PHOTO_PATH;
  img.alt = CONFIG.PERSON_NAME;
  img.onload = function () { img.style.display = 'block'; };
  img.onerror = function () {
    img.style.display = 'none';
    const ring = document.querySelector('.photo-ring');
    if (ring && !ring.querySelector('.photo-fallback')) {
      const fb = document.createElement('div');
      fb.className = 'photo-fallback';
      fb.style.cssText =
        'width:100%;height:100%;border-radius:50%;display:flex;flex-direction:column;' +
        'align-items:center;justify-content:center;gap:6px;' +
        'background:linear-gradient(135deg,#fce4ec,#f8bbd0);font-size:13px;color:#7b3f5e;';
      fb.innerHTML = '<span style="font-size:40px">🌷</span>';
      ring.prepend(fb);
    }
  };
}

/* ── Nama & badge ── */
function initText() {
  const nameEl = document.getElementById('nameDisplay');
  const ageEl  = document.getElementById('ageDisplay');
  if (nameEl) nameEl.textContent = CONFIG.PERSON_NAME;
  if (ageEl)  ageEl.textContent  = '🎉 ' + CONFIG.AGE_LABEL;
}

/* ── Floating petals ── */
function initPetals() {
  const container = document.getElementById('petals');
  if (!container) return;
  const emojis = ['🌸', '🌺', '🌼', '🌷', '✿', '❀'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className   = 'petal';
    el.textContent = emojis[i % emojis.length];
    el.style.left              = Math.random() * 100 + '%';
    el.style.fontSize          = (14 + Math.random() * 14) + 'px';
    el.style.animationDuration = (6  + Math.random() * 10) + 's';
    el.style.animationDelay    = (Math.random() * 12) + 's';
    container.appendChild(el);
  }
}

/* ══════════════════════════════════════════════════════════
   MUSIC PLAYER
══════════════════════════════════════════════════════════ */
let isPlaying = false;

function initMusic() {
  const audio    = document.getElementById('bgMusic');
  const seekBar  = document.getElementById('seekBar');
  if (!audio) return;

  /* Set src dari config */
  audio.src = CONFIG.MUSIC_PATH;

  /* Update progress bar & waktu setiap detik */
  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    document.getElementById('musicProgress').style.width = pct + '%';
    seekBar.value = pct;
    document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
  });

  /* Tampilkan durasi total setelah metadata dimuat */
  audio.addEventListener('loadedmetadata', function () {
    document.getElementById('totalTime').textContent = formatTime(audio.duration);
  });

  /* Seek — geser bar untuk lompat ke posisi */
  seekBar.addEventListener('input', function () {
    if (!audio.duration) return;
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  });

  /* Jika file tidak ditemukan */
  audio.addEventListener('error', function () {
    const btn = document.getElementById('musicBtn');
    if (btn) {
      btn.style.opacity = '0.4';
      btn.title = 'File lagu tidak ditemukan. Tambahkan: ' + CONFIG.MUSIC_PATH;
    }
  });
}

function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  const btn   = document.getElementById('musicBtn');
  const disc  = document.getElementById('musicDisc');
  if (!audio) return;

  if (isPlaying) {
    audio.pause();
    btn.textContent = '▶';
    disc.classList.remove('spinning');
    isPlaying = false;
  } else {
    audio.play().then(function () {
      btn.textContent = '⏸';
      disc.classList.add('spinning');
      isPlaying = true;
    }).catch(function () {
      /* Autoplay diblokir browser — user harus klik dulu, sudah oke */
      btn.textContent = '⏸';
      disc.classList.add('spinning');
      isPlaying = true;
    });
  }
}

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

/* ══════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════ */
function openModal(key) {
  const m = MESSAGES[key];
  if (!m) return;
  document.getElementById('modalIcon').textContent  = m.icon;
  document.getElementById('modalTitle').textContent = m.title;
  document.getElementById('modalBody').innerHTML    = m.body.replace(/\n/g, '<br>');
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalBackdrop')) closeModal();
}
