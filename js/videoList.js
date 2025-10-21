const videos = [
  { title: "Rapha Mundi | Slap Mix 015", id: "iwK6o6oYOxA" },
  { title: "Rapha Mundi | Slap Mix 014", id: "4xt1XFurhFo" },
  { title: "Rapha Mundi | Slap Mix 013", id: "3WS7aKoZ5NE" },
  { title: "Rapha Mundi | Slap Mix 012", id: "ugiAE53Whts" },
  { title: "Rapha Mundi | Slap Mix 011", id: "yk-RGPgcfdI" },
  { title: "Rapha Mundi | Slap Mix 010", id: "_-iyKqGvCaQ" },
  { title: "Rapha Mundi | Slap Mix 009", id: "TuNcf5_p-jg" },
  { title: "Rapha Mundi | Slap Mix 008", id: "ugiAE53Whts" },
  { title: "Rapha Mundi | Slap Mix 007", id: "bBvtlHBt_R8" },
  { title: "Rapha Mundi | Slap Mix 006", id: "a64D0CoxxO0" },
  { title: "Rapha Mundi | Slap Mix 005", id: "csK_NfX28p8" },
  { title: "Rapha Mundi B2B Elpidio B2B Pablo Cotton | Panizo Room 2024", id: "7oG4Cp6YQ6U" },
  { title: "Rapha Mundi | Slap Mix 004", id: "LFYyQ71pIuE" },
  { title: "Rapha Mundi | Slap Mix 003", id: "vpdHZTober8" },
  { title: "Rapha Mundi | Slap Mix 002", id: "Fa_YdwCfAMs" },
  { title: "Rapha Mundi | Slap Mix 001", id: "mY3RmFIf1lA" },
  { title: "10 Vinyl Records Mix #003 with Rapha Mundi [Disco, Caribbean, Zouk, Italo...]", id: "a2Sp7AeBflg" },
  { title: "10 Vinyl Records Mix #002 with Rapha Mundi [Techno, House, Tribal…]", id: "YAZ6lmy3JnE" },
  { title: "Rapha Mundi | Slap Mix 001", id: "mY3RmFIf1lA" },
  { title: "10 Vinyl Records Mix #001 with Rapha Mundi [Techno, Trance, Minimal...]", id: "9NyHTVcMV88" },
  { title: "Rapha Mundi Slaps U Ep. #024 (Sept. 2023) [DLC Kultur]", id: "N6AmE7r1aHg" },
  { title: "Rapha Mundi | Dance Corners X Panizo Club 2023", id: "TNDOiA_XYlk" },
  { title: "Rapha Mundi Slaps U Ep. #023 (Aug. 2023) [DLC Kultur]", id: "4xSujpGGbHw" },
  { title: "Rapha Mundi Slaps U Ep. #022 (Jul. 2023) [DLC Kultur]", id: "3tV70S9fQ" },
  { title: "Elpidio B2B Raffael (10 h)@Eliseo (The End...) [2023-05-06]", id: "VOAex0Wx8Q" },
  { title: "Raffael @ Clic! Record Shop (15-04-2023)", id: "CqKC6ZXx6xA" },
  { title: "Raffael @ Halloween Eliseo (2022-10-29)", id: "yJKpsJvQT2Q" },
  { title: "AntiAnti Sessions #004 · Josu De Orta (Mur Music) & Raffael", id: "3cFUuXVDxTI" },
  { title: "AntiAnti Sessions #004 · Gillette Don't Support Us BONUS MIX (Josu De Orta & Raffael)", id: "qtjugnEKZ1w" },
  { title: "AntiAnti Sessions #003 · Zareza & Raffael", id: "ESGpCcYGrtw" },
  { title: "AntiAnti Sessions #002 Pablo · Cotton & Raffael", id: "Z9i5BA9Szz4" },
  { title: "AAntiAnti Sessions #001 · Angel Deep & Raffael", id: "FIPDpSwjAxA" }
];


function renderVideos() {
  const container = document.getElementById("videos-container");
  container.innerHTML = "";

  videos.forEach(video => {
    const div = document.createElement("div");
    div.className = "video-container";
    div.innerHTML = `
      <h3>${video.title}</h3>
      <div class="video-wrapper">
        <img
          src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg"
          alt="${video.title}"
          class="video-thumb"
          data-video="https://www.youtube.com/embed/${video.id}?autoplay=1"
          data-thumb="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg"
          data-title="${video.title}">
      </div>
    `;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", renderVideos);

// 🎬 Control de reproducción: solo un vídeo activo
document.addEventListener("click", function (e) {
  const thumb = e.target.closest(".video-thumb");
  if (!thumb) return;

  const videoUrl = thumb.dataset.video;
  if (!videoUrl) return;

  // 1️⃣ Revertir cualquier vídeo actualmente reproduciéndose
  document.querySelectorAll(".video-wrapper iframe").forEach(iframe => {
    const wrapper = iframe.closest(".video-wrapper");

    const videoId = iframe.dataset.videoid;
    const video = videos.find(v => v.id === videoId);
    if (!video) return;

    wrapper.innerHTML = `
      <img
        src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg"
        alt="${video.title}"
        class="video-thumb"
        data-video="https://www.youtube.com/embed/${video.id}?autoplay=1"
        data-thumb="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg"
        data-title="${video.title}">
    `;
  });

  // 2️⃣ Reproducir el vídeo clicado
  const iframe = document.createElement("iframe");
  iframe.src = videoUrl;
  iframe.width = "100%";
  iframe.height = "450";
  iframe.frameBorder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";

  const wrapper = thumb.closest(".video-wrapper");
  iframe.dataset.videoid = new URL(videoUrl).pathname.split("/").pop().split("?")[0];
  iframe.dataset.thumb = thumb.dataset.thumb;
  iframe.dataset.title = thumb.dataset.title;

  wrapper.innerHTML = "";
  wrapper.appendChild(iframe);
});

// 🧹 Al cerrar el modal: restaurar miniaturas
document.querySelectorAll(".modal .close").forEach(btn => {
  btn.addEventListener("click", () => {
    stopAllVideos();
  });
});

// Si cierras el modal haciendo click fuera del contenido
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) stopAllVideos();
  });
});

// 🔁 Función que restaura todas las miniaturas
function stopAllVideos() {
  const container = document.getElementById("videos-container");
  if (container) renderVideos(); // vuelve a renderizar las miniaturas
}
