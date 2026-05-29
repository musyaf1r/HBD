/* ============================================================
   script.js — Birthday Website
   ============================================================ */

/* ── Konfigurasi ─────────────────────────────────────────────
   Ganti nilai di bawah ini sesuai kebutuhan:
   - PHOTO_PATH : path ke foto dari folder img/
                  Contoh: 'img/foto.jpg' atau 'img/birthday-girl.png'
   - PERSON_NAME: nama orang yang ulang tahun
   - AGE_LABEL  : teks badge usia / kalimat spesial
   ─────────────────────────────────────────────────────────── */
const CONFIG = {
  PHOTO_PATH  : 'tai.jpeg',   // ← ganti nama file foto di sini
  PERSON_NAME : 'Rania',      // ← ganti dengan nama asli
  AGE_LABEL   : 'Makin tua loh ya', // ← ganti, misal: "21 Tahun 🎉"
};

/* ── Pesan pada setiap kartu ─────────────────────────────── */
const MESSAGES = {
  wish: {
    icon : '🎂',
    title: 'Selamat Ulang Tahun!',
    body :
      'selamat ulang tahun ke 17, Semoga di hari ulang tahunmu ini ' +
      'membawa senyuman manis, tawa, dan kebahagiaan yang tiada habisnya.\n\n' +
      'semoga kamu bisa menjadi probadi yang lebih baik. Semoga tahun ini jauh lebih baik ' +
      'dari tahun sebelumnya. Kamu layak mendapat yang terbaik yang ada di dunia ini! 🎉🎂🎊',
  },
  love: {
    icon : '💕',
    title: 'Pesan',
    body :
      'Kamu adalah seseorang yang sangat berarti. jadi jaga kesehatannya ' +
      'jangan maksain dirimu sendiri,jangan lupa juga minum air putih.\n\n' +
      'aku ingin mengingatkanmu ' +
      'bahwa kamu layak dicintai, dihargai, dan sangat berarti. 💗💕🌹',
  },
  hope: {
    icon : '🌟',
    title: 'Harapan & Doa',
    body :
      'Semoga di lancarkan usaha bungamu,' +
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

/* ──────────────────────────────────────────────────────────
   Inisialisasi saat halaman selesai dimuat
────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  initPhoto();
  initText();
  initPetals();
});

/* ── Foto dari folder img/ ── */
function initPhoto() {
  const img = document.getElementById('photoImg');
  if (!img) return;

  img.src = CONFIG.PHOTO_PATH;
  img.alt = CONFIG.PERSON_NAME;

  img.onload = function () {
    img.style.display = 'block';
  };

  img.onerror = function () {
    /* Jika foto tidak ditemukan, tampilkan placeholder emoji */
    img.style.display = 'none';
    const ring = document.querySelector('.photo-ring');
    if (ring && !ring.querySelector('.photo-fallback')) {
      const fb = document.createElement('div');
      fb.className = 'photo-fallback';
      fb.style.cssText =
        'width:100%;height:100%;border-radius:50%;display:flex;flex-direction:column;' +
        'align-items:center;justify-content:center;gap:6px;background:linear-gradient(135deg,#fce4ec,#f8bbd0);' +
        'font-size:13px;color:#7b3f5e;';
      fb.innerHTML = '<span style="font-size:40px">🌷</span><div style="font-size:11px;text-align:center;padding:0 8px;">Tambahkan foto di<br>folder img/</div>';
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
    el.className    = 'petal';
    el.textContent  = emojis[i % emojis.length];
    el.style.left   = Math.random() * 100 + '%';
    el.style.fontSize          = (14 + Math.random() * 14) + 'px';
    el.style.animationDuration = (6  + Math.random() * 10) + 's';
    el.style.animationDelay    = (Math.random() * 12) + 's';
    container.appendChild(el);
  }
}

/* ──────────────────────────────────────────────────────────
   Modal (bottom sheet)
────────────────────────────────────────────────────────── */
function openModal(key) {
  const m = MESSAGES[key];
  if (!m) return;

  document.getElementById('modalIcon').textContent  = m.icon;
  document.getElementById('modalTitle').textContent = m.title;
  document.getElementById('modalBody').innerHTML    = m.body.replace(/\n/g, '<br>');
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden'; // cegah scroll di belakang modal
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalBackdrop')) closeModal();
}