/**
 * Desktop Custom Cursor for Kiran Rajeev Portfolio
 * Engineering Precision Pointer with project card expansion & button snap
 */

(function () {
  'use strict';

  // Check if touch device or small screen
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 992) {
    return;
  }

  // Create cursor elements
  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isVisible = true;
    }

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

    // Detect target element
    const target = e.target;
    if (!target) return;

    if (target.closest('.project-card') || target.closest('.interest-card')) {
      document.body.classList.add('cursor-hover-project');
      document.body.classList.remove('cursor-hover-button');
    } else if (
      target.closest('.btn') ||
      target.closest('.nav-link') ||
      target.closest('.filter-btn') ||
      target.closest('.modal-close-btn') ||
      target.closest('button') ||
      target.closest('a')
    ) {
      document.body.classList.add('cursor-hover-button');
      document.body.classList.remove('cursor-hover-project');
    } else {
      document.body.classList.remove('cursor-hover-project');
      document.body.classList.remove('cursor-hover-button');
    }
  });

  window.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isVisible = false;
    document.body.classList.remove('cursor-hover-project', 'cursor-hover-button');
  });

  // Smooth trailing for the outer ring using lerp
  function render() {
    ringX += (mouseX - ringX) * 0.22;
    ringY += (mouseY - ringY) * 0.22;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
