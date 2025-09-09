function mostrarSorpresa() {
  const sorpresa = document.getElementById("sorpresa");
  sorpresa.classList.remove("oculto");
  lanzarFuegosArtificiales();

}

function lanzarFuegosArtificiales() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const explosiones = [
    { x: canvas.width / 2, y: canvas.height / 2 },
    { x: canvas.width * 0.2, y: canvas.height * 0.3 },
    { x: canvas.width * 0.8, y: canvas.height * 0.4 },
    { x: canvas.width * 0.3, y: canvas.height * 0.7 },
    { x: canvas.width * 0.7, y: canvas.height * 0.75 }
  ];

  const todasParticulas = [];

  explosiones.forEach(pos => {
    for (let i = 0; i < 60; i++) {
      todasParticulas.push({
        x: pos.x,
        y: pos.y,
        radius: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 5 + 2,
        alpha: 1
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    todasParticulas.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (todasParticulas[0].alpha > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
