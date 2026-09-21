import React, { useEffect, useRef } from 'react';

interface OuterSpaceBackgroundProps {
  glitchIntensity?: number; // 0 to 1
  warpSpeed?: boolean; // When reaching the hyperspace climax
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
}

export const OuterSpaceBackground: React.FC<OuterSpaceBackgroundProps> = ({
  glitchIntensity = 0.2,
  warpSpeed = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Generate Stars
    const starCount = 280;
    const starColors = [
      '#ffffff',
      '#e0f2fe', // ice cyan
      '#f0abfc', // cosmic fuchsia
      '#a5b4fc', // indigo violet
      '#fef08a', // warm yellow
    ];

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      size: Math.random() * 1.8 + 0.5,
      baseAlpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // Meteors / Cosmic rays
    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      if (meteors.length > 3) return;
      meteors.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.4),
        len: Math.random() * 120 + 60,
        speed: Math.random() * 12 + 10,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        alpha: 1,
        life: 1,
      });
    };

    let tick = 0;

    const render = () => {
      tick++;
      if (Math.random() < 0.015) {
        spawnMeteor();
      }

      // Clear with space void backdrop
      ctx.fillStyle = '#030208';
      ctx.fillRect(0, 0, width, height);

      // Deep Nebulas
      const cx = width / 2;
      const cy = height / 2;

      // Nebula 1: Deep Cyan / Void Teal
      const neb1 = ctx.createRadialGradient(cx - width * 0.25, cy - height * 0.1, 20, cx - width * 0.25, cy - height * 0.1, width * 0.55);
      neb1.addColorStop(0, 'rgba(6, 182, 212, 0.14)');
      neb1.addColorStop(0.5, 'rgba(14, 116, 144, 0.06)');
      neb1.addColorStop(1, 'rgba(3, 2, 8, 0)');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // Nebula 2: Cosmic Magenta / Ultraviolet Rift
      const neb2 = ctx.createRadialGradient(cx + width * 0.2, cy + height * 0.15, 30, cx + width * 0.2, cy + height * 0.15, width * 0.5);
      neb2.addColorStop(0, 'rgba(217, 70, 239, 0.13)');
      neb2.addColorStop(0.6, 'rgba(112, 26, 117, 0.05)');
      neb2.addColorStop(1, 'rgba(3, 2, 8, 0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      // Central Reality Fracture Glow (Event Horizon)
      const riftPulse = Math.sin(tick * 0.03) * 0.15 + 0.85;
      const riftGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, (width * 0.35) * riftPulse);
      riftGrad.addColorStop(0, 'rgba(147, 51, 234, 0.20)');
      riftGrad.addColorStop(0.4, 'rgba(59, 130, 246, 0.08)');
      riftGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = riftGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw & Update Stars
      const currentSpeed = warpSpeed ? 28 : 0.45;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (warpSpeed) {
          // Warp Speed: 3D perspective streak
          star.z -= currentSpeed;
          if (star.z <= 0) {
            star.z = width;
            star.x = (Math.random() - 0.5) * width * 2;
            star.y = (Math.random() - 0.5) * height * 2;
          }

          const k = 250 / star.z;
          const px = star.x * k + cx;
          const py = star.y * k + cy;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            const prevK = 250 / (star.z + currentSpeed * 1.5);
            const prevPx = star.x * prevK + cx;
            const prevPy = star.y * prevK + cy;

            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = Math.min(3, (1 - star.z / width) * 2.5);
            ctx.stroke();
          }
        } else {
          // Normal Deep Space Drift with Twinkle
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
          const alpha = star.baseAlpha * twinkle;

          // Gentle cosmic drift
          star.y += 0.15;
          if (star.y > height + 20) {
            star.y = -20;
            star.x = Math.random() * width;
          }

          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
          ctx.beginPath();
          ctx.arc((star.x + width) % width, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Subtle star cross glow on larger stars
          if (star.size > 1.8) {
            ctx.fillStyle = star.color;
            ctx.globalAlpha = alpha * 0.25;
            ctx.fillRect(((star.x + width) % width) - star.size * 2, star.y - 0.5, star.size * 4, 1);
            ctx.fillRect((star.x + width) % width - 0.5, star.y - star.size * 2, 1, star.size * 4);
          }
        }
      }
      ctx.globalAlpha = 1.0;

      // Draw Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.02;

        if (m.alpha <= 0 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.len;
        const tailY = m.y - Math.sin(m.angle) * m.len;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.5)');
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // Glitch Reality Desfase Overlay Slices
      if (Math.random() < glitchIntensity * 0.35) {
        const sliceY = Math.random() * height;
        const sliceHeight = Math.random() * 24 + 4;
        const sliceOffset = (Math.random() - 0.5) * 28 * glitchIntensity;

        // Cut slice & shift
        try {
          const sliceData = ctx.getImageData(0, Math.floor(sliceY), width, Math.floor(sliceHeight));
          ctx.putImageData(sliceData, Math.floor(sliceOffset), Math.floor(sliceY));

          // Tint slice with chromatic glitch bar
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.08)' : 'rgba(255, 0, 128, 0.08)';
          ctx.fillRect(0, sliceY, width, sliceHeight);
        } catch {
          // ignore any temporary canvas boundary clamping
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [glitchIntensity, warpSpeed]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Glitch Scanlines & Cosmic CRT Grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[size:100%_4px] opacity-40 pointer-events-none"
      />
      {/* Vignette edge for deep interstellar absorption */}
      <div 
        className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#030208_95%] pointer-events-none opacity-85"
      />
    </div>
  );
};
