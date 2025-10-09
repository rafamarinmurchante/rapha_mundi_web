document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     MODALES
  ======================= */
  document.querySelectorAll(".modal").forEach(modal => {
    const closeBtn = modal.querySelector(".close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");

        // Solo eliminar iframe si NO es SoundCloud
        modal.querySelectorAll("iframe").forEach(iframe => {
          if (!iframe.src.includes("soundcloud.com")) {
            iframe.remove();
          }
        });
      });
    }

    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.classList.remove("show");
        modal.querySelectorAll("iframe").forEach(iframe => {
          if (!iframe.src.includes("soundcloud.com")) {
            iframe.remove();
          }
        });
      }
    });
  });

  // Abrir modal desde menú
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modalId = link.dataset.modal;
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.classList.add("show");

      // Re-inicializa SoundCloud si es el modal de mixes o releases
      if (modalId === "mixes" || modalId === "releases") {
        modal.querySelectorAll("iframe").forEach(iframe => {
          const widget = SC.Widget(iframe);

          widget.bind(SC.Widget.Events.PLAY, () => {
            widget.getCurrentSound(sound => {
              currentModalId = iframe.closest(".modal").id;
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
      }
    });
  });


  /* =======================
     DIBUJO CON EL CURSOR
  ======================= */
  const canvas = document.getElementById("draw");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  let lastX = 0, lastY = 0, drawing = false;

  document.addEventListener("mousemove", e => {
    if (!drawing) {
      lastX = e.clientX;
      lastY = e.clientY;
      drawing = true;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    lastX = e.clientX;
    lastY = e.clientY;
  });

  document.addEventListener("mouseleave", () => drawing = false);
  document.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawing = false;
  });


  /* =======================
     NOW PLAYING
  ======================= */
  const nowPlaying = document.getElementById("nowPlaying");
  const nowPlayingText = document.getElementById("nowPlayingText");
  let currentModalId = null;

  nowPlaying.addEventListener("click", () => {
    if (currentModalId) document.getElementById(currentModalId).classList.add("show");
  });


  /* =======================
     SOUNDCLOUD WIDGET
  ======================= */
  const scScript = document.createElement("script");
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
  const images = [
    'img/Estanteria.jpg',
    'img/BancoHorizontal.jpg',
    'img/Paisaje.jpg',
    'img/EstanteriaHorizontal.jpg'
  ];
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
