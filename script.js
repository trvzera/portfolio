document.addEventListener("DOMContentLoaded", () => {
  const outer = document.querySelector(".cursor-outer");
  const inner = document.querySelector(".cursor-inner");

  if (!outer || !inner) return;

  let mouseX = 0,
    mouseY = 0;
  let outerX = 0,
    outerY = 0;
  let innerX = 0,
    innerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    outerX += (mouseX - outerX) * 0.1;
    outerY += (mouseY - outerY) * 0.1;

    innerX += (mouseX - innerX) * 0.25;
    innerY += (mouseY - innerY) * 0.25;

    outer.style.left = outerX + "px";
    outer.style.top = outerY + "px";
    inner.style.left = innerX + "px";
    inner.style.top = innerY + "px";

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .hover")) {
      outer.style.transform = "translate(-50%, -50%) scale(1.15)";
      inner.style.transform = "translate(-50%, -50%) scale(2.8)";
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .hover")) {
      outer.style.transform = "translate(-50%, -50%) scale(1)";
      inner.style.transform = "translate(-50%, -50%) scale(1)";
    }
  });
});
