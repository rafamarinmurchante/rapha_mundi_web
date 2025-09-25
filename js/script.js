document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     MODALES
  ======================= */
  const modals = document.querySelectorAll(".modal");

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add("show");
    });
  });

  modals.forEach(modal => {
    const closeBtn = modal.querySelector(".close");
    closeBtn.addEventListener("click", () => modal.classList.remove("show"));
    modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });
  });

  /* =======================
     DIBUJO CON EL CURSOR
  ======================= */
  const canvas = document.getElementById("draw");
  const ctx = canvas.getContext("2d");
  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  let lastX = 0, lastY = 0, drawing = false;

  document.addEventListener("mousemove", e => {
    if (!drawing) { lastX = e.clientX; lastY = e.clientY; drawing = true; }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    lastX = e.clientX;
    lastY = e.clientY;
  });

  document.addEventListener("mouseleave", () => drawing = false);
  document.addEventListener("click", () => { ctx.clearRect(0, 0, canvas.width, canvas.height); drawing = false; });

  /* =======================
     NOW PLAYING
  ======================= */
  const nowPlaying = document.getElementById("nowPlaying");
  const nowPlayingText = document.getElementById("nowPlayingText");
  let currentModalId = null;

  nowPlaying.addEventListener("click", () => {
    if (currentModalId) document.getElementById(currentModalId).classList.add("show");
  });

  // --- YouTube API ---
  function onYouTubeIframeAPIReady() {
    document.querySelectorAll('#video-container iframe').forEach(iframe => {
      const player = new YT.Player(iframe, {
        events: {
          onStateChange: e => {
            if (e.data === YT.PlayerState.PLAYING) {
              currentModalId = iframe.closest('.modal').id;
              nowPlayingText.textContent = `Playing: ${iframe.title || "YouTube video"}`;
              nowPlaying.style.display = "block";
            } else {
              // Cualquier estado que no sea PLAYING oculta el banner
              nowPlaying.style.display = "none";
              currentModalId = null;
            }
          }
        }
      });
    });
  }

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  if (document.querySelector('#video-container iframe')) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  // --- SoundCloud Widget ---
  const scScript = document.createElement('script');
  scScript.src = "https://w.soundcloud.com/player/api.js";
  scScript.onload = () => {
    // Selecciona TODOS los iframes de SoundCloud que quieras vigilar:
    document.querySelectorAll('#mixes-container iframe, #releases iframe').forEach(iframe => {
      const widget = SC.Widget(iframe);

      widget.bind(SC.Widget.Events.PLAY, () => {
        widget.getCurrentSound(sound => {
          currentModalId = iframe.closest('.modal').id;
          nowPlayingText.textContent = `Playing: ${sound ? sound.title : "SoundCloud track"}`;
          nowPlaying.style.display = "block";
        });
      });

      widget.bind(SC.Widget.Events.PAUSE, () => {
        nowPlaying.style.display = "none";
        currentModalId = null;
      });

      widget.bind(SC.Widget.Events.FINISH, () => {
        nowPlaying.style.display = "none";
        currentModalId = null;
      });
    });
  };

  document.body.appendChild(scScript);

  /* =======================
     CARRUSEL DE FONDO
  ======================= */
  const images = ['img/Estanteria.jpg','img/BancoHorizontal.jpg','img/Paisaje.jpg','img/EstanteriaHorizontal.jpg'];
  let index = 0;
  const bg1 = document.getElementById('bg1');
  const bg2 = document.getElementById('bg2');
  let current = bg1;

  function changeBackground() {
    const next = current === bg1 ? bg2 : bg1;
    next.style.backgroundImage = `url(${images[index]})`;
    next.classList.add('show');
    current.classList.remove('show');
    current = next;
    index = (index + 1) % images.length;
  }
  changeBackground();
  setInterval(changeBackground, 5000);
});

  /* =======================
     SELECTOR IDIOMA EN BIO
  ======================= */
document.addEventListener("DOMContentLoaded", () => {
  const texts = {
    en: {
      title: "Rapa Mundi's Bio",
      paragraphs: [
        "Rapha Mundi is the alias of Rafael Marín Hernández (Murchante, 1994), a producer and DJ who fuses three lifelong passions: music as a global concept, the technical analysis of sound, and technology as the bridge between them.",
        "Driven to energise the underrepresented electronic scene of his rural hometown in northern Spain, he has spent over fifteen years not only DJing but also organising events, building cultural networks, and collaborating with independent platforms such as DLC Kultur (Pamplona/Iruña) and Radio Relativa (Madrid).",
        "Refusing to be tied to a single genre, Rapha crafts studio works and DJ sets where ambient pads, deep techno, minimal house and lo-fi textures converge in timeless, carefully-curated selections that challenge and captivate audiences often unfamiliar with electronic music’s more hidden sides.",
        "In recent years his search for a singular sound led him to co-found Buenobueno Discos alongside fellow northern-scene artist Nacho Piek, the imprint through which his upcoming productions will be released."
      ]
    },
    es: {
      title: "Biografía de Rapha Mundi",
      paragraphs: [
        "Rafael Marín Hernández (Murchante, 1994) conjuga, bajo su moniker Rapha Mundi, tres de sus principales pasiones; la música como concepto global, el análisis técnico del sonido y la tecnología como elemento de cohesión entre ambas anteriores.",
        "Obsesionado con agitar e impulsar la deficitaria escena local y comarcal de su lugar de origen, ha invertido buena parte de sus más de quince años de trayectoria musical no sólo en pinchar discos, sino también en organizar eventos germinanando redes culturales con otr@s personalidades de su ámbito y en colaborar de manera activa con plataformas independientes como DLC Kultur (Pamplona/Iruña) o Radio Relativa (Madrid).",
        "Lejos de identificarse con estilos concretos, la propuesta musical de Rapha comprende, tanto en cabina como en el estudio de producción, infinidad de ellos articulados con coherencia y selecciones atemporales tan arriesgadas como acertadas ante un público a menudo poco familiarizado con las vertientes menos visibles de la electrónica.",
        "Recientemente, la búsqueda de su propio sonido le ha llevado a alinearse con otra personalidad reconocida en el panorama norteño, Nacho Piek, junto a quien ha creado y co-dirige el sello Buenobueno Discos, vitola bajo la que acuña sus primeros lanzamientos como productor."
      ]
    }
  };

  const modal = document.getElementById("bio");
  const titleEl = modal.querySelector("#bio-title");
  const paragraphs = modal.querySelectorAll("[data-index]");
  const langBtns = modal.querySelectorAll(".lang-btn");

  const savedLang = localStorage.getItem("bio_lang") || "en";

  function setLang(lang) {
    const t = texts[lang];
    titleEl.textContent = t.title;
    paragraphs.forEach((p, i) => p.textContent = t.paragraphs[i]);
    langBtns.forEach(b =>
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false")
    );
    localStorage.setItem("bio_lang", lang);
  }

  langBtns.forEach(btn =>
    btn.addEventListener("click", () => setLang(btn.dataset.lang))
  );

  setLang(savedLang);
});

