import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Trophy, Award, MapPin, Truck, ArrowRight, Timer, Users, Flag, 
  Footprints, Smartphone, Camera, Package, CheckCircle, Calendar, 
  Clock, Globe, ChevronDown, Shield, Star 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import * as THREE from 'three';

// ---- Canvas Particle Network (lightweight, mobile-friendly) ----

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 35 : 70;
    const CONNECT_DIST = isMobile ? 100 : 150;

    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function init() {
      resize();
      particles = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
          gold: Math.random() > 0.7,
        });
      }
    }

    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? 'rgba(212,175,55,0.5)' : 'rgba(59,130,246,0.3)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(212,175,55,${0.08 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ---- Reusable Components ----

function TiltCard({ children, className = '', options = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || window.innerWidth < 768) return;
    VanillaTilt.init(ref.current, { max: 8, speed: 400, glare: true, 'max-glare': 0.12, ...options });
    return () => ref.current?.vanillaTilt?.destroy();
  }, [options]);
  return <div ref={ref} className={className}>{children}</div>;
}

function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(0, target, { duration, ease: [0.25, 0.46, 0.45, 0.94], onUpdate: (v) => setCount(Math.floor(v)) });
    return () => ctrl.stop();
  }, [isInView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ---- Particle Morph (Three.js auto-cycling) ----

function samplePoints(drawFn, count) {
  const S = 1200;
  const off = document.createElement('canvas');
  off.width = S;
  off.height = S;
  const c = off.getContext('2d');
  drawFn(c, S);
  const img = c.getImageData(0, 0, S, S);
  const pts = [];

  for (let y = 0; y < S; y += 2) {
    for (let x = 0; x < S; x += 2) {
      if (img.data[(y * S + x) * 4 + 3] > 128) pts.push([x / 2, y / 2]);
    }
  }

  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }

  const out = [];
  for (let i = 0; i < count && i < pts.length; i++) {
    out.push(pts[i]);
  }
  while (out.length < count) {
    out.push(pts[Math.floor(Math.random() * pts.length)] || [200, 200]);
  }
  return out;
}

function ParticleMorph() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 1200 : 1800;

    const textDraw = (ctx, S) => {
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const fontSize1 = isMobile ? S * 0.16 : S * 0.12;
      const fontSize2 = isMobile ? S * 0.18 : S * 0.14;
      ctx.font = `900 ${fontSize1}px system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
      ctx.fillText('PACEUP', S / 2, S * 0.40);
      ctx.font = `900 ${fontSize2}px system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
      ctx.fillText('RUN', S / 2, S * 0.60);
    };

    const textTarget = samplePoints(textDraw, COUNT);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const goldColor = new THREE.Color(0xF5D060);
    const blueColor = new THREE.Color(0x60A5FA);
    const whiteColor = new THREE.Color(0xE0E8FF);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      const r = Math.random();
      const c = r > 0.6 ? goldColor : r > 0.25 ? blueColor : whiteColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = isMobile ? 5.5 : 5.0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, d);
          float glow = exp(-d * 4.0) * 0.6;
          gl_FragColor = vec4(vColor, (alpha * 0.95 + glow));
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const currentPos = [];
    const targetPos = [];
    for (let i = 0; i < COUNT; i++) {
      currentPos.push({ x: positions[i * 3], y: positions[i * 3 + 1], z: positions[i * 3 + 2] });
      targetPos.push({
        x: (textTarget[i][0] - 300) * (isMobile ? 0.42 : 0.6),
        y: -(textTarget[i][1] - 300) * (isMobile ? 0.42 : 0.6),
        z: (Math.random() - 0.5) * 8,
      });
    }

    let formed = false;
    let animId;
    const mouse = { x: 9999, y: 9999 };
    const REPEL_RADIUS = 50;
    const REPEL_STRENGTH = 12;

    function onMouseMove(e) {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = nx * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
      mouse.y = ny * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    }
    function onMouseLeave() { mouse.x = 9999; mouse.y = 9999; }
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) formed = true; },
      { threshold: 0.3 }
    );
    observer.observe(container);

    function animate(now) {
      animId = requestAnimationFrame(animate);
      const posArr = geometry.attributes.position.array;

      for (let i = 0; i < COUNT; i++) {
        if (formed) {
          const tx = targetPos[i].x;
          const ty = targetPos[i].y;
          const dx = tx - mouse.x;
          const dy = ty - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let pushX = 0, pushY = 0;
          if (dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            pushX = (dx / dist) * force;
            pushY = (dy / dist) * force;
          }

          currentPos[i].x += (tx + pushX - currentPos[i].x) * 0.08;
          currentPos[i].y += (ty + pushY - currentPos[i].y) * 0.08;
          currentPos[i].z += (targetPos[i].z - currentPos[i].z) * 0.06;
        }
        currentPos[i].z += Math.sin(now * 0.001 + i * 0.5) * 0.02;
        posArr[i * 3] = currentPos[i].x;
        posArr[i * 3 + 1] = currentPos[i].y;
        posArr[i * 3 + 2] = currentPos[i].z;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = Math.sin(now * 0.0003) * 0.05;
      points.rotation.x = Math.cos(now * 0.0002) * 0.02;
      renderer.render(scene, camera);
    }

    animId = requestAnimationFrame(animate);

    function onResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative pt-12 sm:pt-20 pb-0 bg-[#040D1D] overflow-hidden">
      <div className="relative mx-auto max-w-5xl flex flex-col items-center">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white/90 text-center mb-4">
          Your Journey with PaceUp
        </h2>
        <div
          ref={mountRef}
          className="w-full"
          style={{ height: window.innerWidth < 768 ? '350px' : '480px' }}
        />
      </div>
    </section>
  );
}

// ---- Animation Variants ----

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// ---- Timeline Step ----

const journeySteps = [
  { num: '01', title: 'Register', desc: 'Sign up, pick your distance, pay ₹499.', icon: <Smartphone className="h-5 w-5" />, color: 'from-primary-blue to-blue-600' },
  { num: '02', title: 'Run', desc: 'Anywhere - road, park, treadmill. Track it.', icon: <Footprints className="h-5 w-5" />, color: 'from-emerald-500 to-green-600' },
  { num: '03', title: 'Upload Proof', desc: 'Screenshot your running app. Submit.', icon: <Camera className="h-5 w-5" />, color: 'from-violet-500 to-purple-600' },
  { num: '04', title: 'Get Verified', desc: 'We review. You get approved.', icon: <CheckCircle className="h-5 w-5" />, color: 'from-amber-500 to-orange-600' },
  { num: '05', title: 'Trophy Delivered', desc: 'Free shipping. Right to your door.', icon: <Package className="h-5 w-5" />, color: 'from-accent-gold to-yellow-600' },
];

function TimelineStep({ step, idx, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const isEven = idx % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center lg:justify-center">
      <div className={`hidden lg:flex w-full items-center ${isEven ? '' : 'flex-row-reverse'}`}>
        <div className="w-[45%]">
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-accent-gold/30 hover:shadow-xl transition-all duration-500"
          >
            <div className="flex items-center gap-4">
              <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-primary-navy dark:text-white">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="w-[10%] flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.15 }}
            className={`z-10 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-display font-bold text-xs shadow-lg ring-4 ring-white dark:ring-[#040D1D]`}
          >
            {step.num}
          </motion.div>
        </div>
        <div className="w-[45%]" />
      </div>

      <div className="flex lg:hidden w-full items-start gap-4">
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3 }}
            className={`z-10 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-display font-bold text-xs shadow-lg ring-4 ring-white dark:ring-[#040D1D]`}
          >
            {step.num}
          </motion.div>
          {!isLast && <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 mt-2" />}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="group flex-1 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-6 hover:border-accent-gold/30 transition-all duration-500"
        >
          <div className="flex items-center gap-3">
            <div className={`shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-md`}>
              {step.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-primary-navy dark:text-white">{step.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ---- FAQ Accordion Item ----

function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} custom={i}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/60 hover:border-accent-gold/20 transition-colors duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
      >
        <span className="font-display font-bold text-sm text-primary-navy dark:text-white">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-accent-gold">
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---- Marquee ----

const marqueeItems = ['Virtual Running Challenge', 'Acrylic Trophy', 'E-Certificate', 'Free Delivery', 'Pan India', '1.6K / 3K / 5K / 10K / 21K', 'Earn Rewards', 'Join the Movement'];

// ---- Testimonials ----

const testimonials = [
  { name: 'Passang Lamu Sherpa', distance: '21K', img: '/testimonials/Passang Lamu Sherpa.jpg', text: "The trophy quality blew me away! As a half-marathon runner, I have earned many medals — but this acrylic trophy stands out on my shelf. PaceUp truly delivers what they promise." },
  { name: 'Jayanth V', distance: '5K', img: '/testimonials/Jayanth V.jpg', text: "Thank you PaceUp for giving me this amazing opportunity. I was skeptical at first, but the entire experience from registration to receiving the trophy was seamless and trustworthy." },
  { name: 'Buddha Lama', distance: '21K', img: '/testimonials/Buddha Lama.jpg', text: "Running for a good cause while earning a beautiful trophy — what more could you ask for? The whole process was smooth and the trophy arrived in perfect condition." },
  { name: 'VINOD C', distance: '5K', img: '/testimonials/VINOD C.jpg', text: "The trophy is absolutely premium! I have participated in many virtual runs, but PaceUp stands apart with their acrylic trophies instead of generic medals. Definitely joining next season too." },
  { name: 'Soumya Ray', distance: '10K', img: '/testimonials/Soumya Ray.jpg', text: "I completed my 10K on a chilly morning in the park. The best part? I could run at my own pace without any pressure. The trophy arrived within a week — beautifully packed!" },
  { name: 'SOUVIK CHOWDHURY', distance: '5K', img: '/testimonials/SOUVIK CHOWDHURY.jpg', text: "As a beginner runner, PaceUp gave me the perfect motivation to get started. The 5K challenge was achievable, and now I have a stunning trophy to remind me of my first finish." },
  { name: 'Bhanu Yadav', distance: '10K', img: '/testimonials/Bhanu Yadav.jpg', text: "The instant support from the PaceUp team really impressed me. Had a query about submission and they resolved it within minutes. Great experience overall — 10/10 would recommend." },
  { name: 'Singamayum Alam Sheikh', distance: '3K', img: '/testimonials/Singamayum Alam Sheikh.jpg', text: "I joined with my kids for the 3K challenge and we had such a wonderful family experience. The trophy is now proudly displayed in our living room. Thank you PaceUp!" },
  { name: 'Raj Gubbi', distance: '21K', img: '/testimonials/raj gubbi.jpg', text: "Training for the half marathon kept me disciplined for weeks. When the trophy finally arrived, it felt like every early morning run was worth it. Premium quality, zero complaints." },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    timeoutRef.current = setInterval(next, 4000);
    return () => clearInterval(timeoutRef.current);
  }, [next]);

  const goTo = (i) => {
    clearInterval(timeoutRef.current);
    setCurrent(i);
    timeoutRef.current = setInterval(next, 4000);
  };

  const t = testimonials[current];

  return (
    <section className="py-16 lg:py-24 bg-[#040D1D] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-accent-gold font-display font-semibold text-sm tracking-widest uppercase mb-3">Testimonials</motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">What Our Runners Say</motion.h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Image */}
              <div className="shrink-0 w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-accent-gold/20 shadow-xl">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="text-accent-gold/40 text-5xl font-serif leading-none">"</div>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">{t.text}</p>
                <div>
                  <p className="font-display font-bold text-white text-base">{t.name}</p>
                  <p className="text-accent-gold text-xs font-semibold uppercase tracking-wider">{t.distance} Finisher</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? 'bg-accent-gold w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ======== MAIN COMPONENT ========

export default function Home({ registrationOpen = true }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.5'] });
  const lineHeight = useTransform(timelineProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="overflow-hidden">

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImgY, scale: heroScale }}>
          <img src="/runner_hero.png" alt="" className="w-full h-full object-cover" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#040D1D] via-[#040D1D]/90 to-[#040D1D]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040D1D] via-transparent to-[#040D1D]/40" />

        <div className="absolute inset-0 z-[1]">
          <ParticleCanvas />
        </div>

        <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ opacity: heroOpacity }}>
          <motion.div className="max-w-2xl space-y-6" initial="hidden" animate="visible" variants={stagger}>

            <motion.div variants={fadeUp} custom={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-300">Registration Open</span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}
              className="font-display font-black text-5xl sm:text-6xl lg:text-[5.5rem] tracking-tight leading-[1.05] text-white"
            >
              Run Anywhere.
              <br />
              <span className="bg-gradient-to-r from-accent-gold via-yellow-300 to-accent-gold bg-clip-text text-transparent">
                Earn Your Trophy.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg text-slate-400 max-w-md leading-relaxed">
              Virtual running challenge. Real acrylic trophy. Delivered to your door.
              <span className="text-accent-gold font-bold"> ₹499</span>
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 pt-2">
              {registrationOpen ? (
                <motion.button
                  onClick={() => navigate('/register')}
                  className="group font-display font-bold uppercase tracking-wider px-8 py-4 rounded-xl bg-accent-gold text-primary-navy cursor-pointer flex items-center gap-2"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                >
                  Register Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              ) : (
                <div className="font-display font-bold uppercase tracking-wider px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 to-gray-800 text-white text-sm">
                  Registrations are closed
                </div>
              )}
              <motion.button
                onClick={() => navigate('/event')}
                className="font-display font-semibold px-8 py-4 rounded-xl text-white border border-white/20 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >
                View Event
              </motion.button>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap items-center gap-4 pt-2">
              {[
                { icon: <Trophy className="h-3.5 w-3.5" />, t: 'Trophy' },
                { icon: <Award className="h-3.5 w-3.5" />, t: 'Certificate' },
                { icon: <Truck className="h-3.5 w-3.5" />, t: 'Free Delivery' },
              ].map((p, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="text-accent-gold">{p.icon}</span>{p.t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

      </section>

      {/* ===== MARQUEE ===== */}
      <div className="py-4 bg-accent-gold/5 border-y border-accent-gold/10 overflow-hidden">
        <div className="flex animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-3 mx-6 whitespace-nowrap text-sm font-display font-semibold text-slate-500 uppercase tracking-widest shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/60" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ===== PARTICLE MORPH ===== */}
      <ParticleMorph />

      {/* ===== STATS ===== */}
      <section className="pt-6 pb-16 lg:pt-8 lg:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            {[
              { value: 500, suffix: '+', label: 'Runners', icon: <Users className="h-5 w-5" /> },
              { value: 100, suffix: '+', label: 'Cities', icon: <MapPin className="h-5 w-5" /> },
              { value: 2, suffix: '+', label: 'Years', icon: <Flag className="h-5 w-5" /> },
              { value: 100, suffix: '%', label: 'Free Delivery', icon: <Truck className="h-5 w-5" /> },
            ].map((s, i) => (
              <motion.div key={i} variants={scaleUp} custom={i}
                className="group text-center p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-accent-gold/30 transition-all duration-500"
              >
                <div className="text-accent-gold mb-2 flex justify-center">{s.icon}</div>
                <div className="font-display font-black text-2xl sm:text-3xl text-primary-navy dark:text-white">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Our Trophies ===== */}
      <section className="py-16 lg:py-24 bg-[#040D1D] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent-gold font-display font-semibold text-sm tracking-widest uppercase mb-3">Our Trophies</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
              What You Run For
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/40 max-w-xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Every finisher receives a premium acrylic trophy - handcrafted, theme-based, and delivered free across India.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02]">
                <img
                  src="/acrylic_trophy.png"
                  alt="PaceUp Run Acrylic Trophy"
                  className="w-full h-auto object-contain p-6 sm:p-10"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-full bg-accent-gold/10 blur-2xl pointer-events-none" />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Premium Acrylic Finisher Trophy
                </h3>
                <p className="text-white/40 text-sm sm:text-base leading-relaxed">
                  Our trophies are not ordinary medals. Each one is a premium acrylic collectible designed around a unique theme - crafted to sit proudly on your desk, shelf, or trophy wall.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: <Package className="w-4 h-4 text-accent-gold" />, text: 'Free delivery anywhere in India' },
                  { icon: <Star className="w-4 h-4 text-accent-gold" />, text: 'Theme-based design - new theme every season' },
                  { icon: <Shield className="w-4 h-4 text-accent-gold" />, text: 'Premium acrylic build with laser-cut finish' },
                  { icon: <Award className="w-4 h-4 text-accent-gold" />, text: 'Includes digital e-certificate' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/50 text-sm">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {registrationOpen ? (
                <button
                  onClick={() => navigate('/register')}
                  className="mt-4 group font-display font-bold uppercase tracking-wider text-sm px-7 py-3 rounded-xl bg-accent-gold hover:bg-yellow-400 text-[#040D1D] cursor-pointer transition-colors duration-300 flex items-center gap-2 w-fit"
                >
                  Earn Yours
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <div className="mt-4 font-display font-bold uppercase tracking-wider text-sm px-7 py-3 rounded-xl bg-gradient-to-r from-red-700 to-gray-800 text-white w-fit">
                  Registrations are closed
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== EVENT HIGHLIGHTS ===== */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50/80 to-white dark:from-[#060e1f] dark:to-[#040D1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent-gold font-display font-semibold text-sm tracking-widest uppercase mb-3">About The Event</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-primary-navy dark:text-white">PaceUp Run - Season 2</motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {[
              { icon: <Calendar className="h-5 w-5" />, title: 'Event Type', value: 'Virtual Running Challenge', accent: 'text-primary-blue', bg: 'bg-primary-blue/10' },
              { icon: <Globe className="h-5 w-5" />, title: 'Location', value: 'Run from anywhere in India', accent: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { icon: <Clock className="h-5 w-5" />, title: 'Deadline', value: 'Limited slots - register now', accent: 'text-rose-400', bg: 'bg-rose-400/10' },
              { icon: <Users className="h-5 w-5" />, title: 'Who Can Join', value: 'Anyone - all ages, all levels', accent: 'text-violet-400', bg: 'bg-violet-400/10' },
              { icon: <Shield className="h-5 w-5" />, title: 'Verification', value: 'Screenshot from running app', accent: 'text-amber-400', bg: 'bg-amber-400/10' },
              { icon: <Star className="h-5 w-5" />, title: 'Entry Fee', value: '₹499 - includes everything', accent: 'text-accent-gold', bg: 'bg-accent-gold/10' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-accent-gold/20 transition-all duration-500"
              >
                <div className={`shrink-0 w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center ${item.accent} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">{item.title}</p>
                  <p className="font-display font-bold text-sm text-primary-navy dark:text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT YOU GET ===== */}
      <section className="py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent-gold font-display font-semibold text-sm tracking-widest uppercase mb-3">
              What You Get
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-primary-navy dark:text-white">
              ₹499. Everything included.
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <div className="group h-full rounded-3xl overflow-hidden border border-slate-800 hover:border-accent-gold/20 transition-all duration-500 bg-gradient-to-br from-[#0a1628] to-[#040D1D]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src="/acrylic_trophy.png" alt="Trophy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-accent-gold/90 text-primary-navy text-[10px] font-bold uppercase tracking-wider">Premium</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white mb-1">Acrylic Trophy</h3>
                  <p className="text-sm text-slate-400">Theme-based premium design. A real trophy you display with pride.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <div className="group h-full rounded-3xl overflow-hidden border border-slate-800 hover:border-primary-blue/20 transition-all duration-500 bg-gradient-to-br from-[#0a1628] to-[#040D1D]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src="/e_certificate.png" alt="Certificate" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary-blue/90 text-white text-[10px] font-bold uppercase tracking-wider">Digital</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white mb-1">Finisher Certificate</h3>
                  <p className="text-sm text-slate-400">Personalized high-res certificate. Share on social media.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2}>
              <div className="group h-full rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-400/20 transition-all duration-500 bg-gradient-to-br from-[#0a1628] to-[#040D1D]">
                <div className="relative aspect-square overflow-hidden">
                  <img src="/1000401733.png" alt="Sticker Pack" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-purple-500/90 text-white text-[10px] font-bold uppercase tracking-wider">Exclusive</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white mb-1">Sticker Pack</h3>
                  <p className="text-sm text-slate-400">Exclusive peel-and-stick running stickers. Stick them anywhere you want.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="group rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-rose-400/30 bg-white dark:bg-slate-900/80 p-6 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-rose-400/10 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-base text-primary-navy dark:text-white mb-1">Run Anywhere</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Park, road, treadmill. Your pace, your place.</p>
                </div>

                <div className="group rounded-3xl overflow-hidden bg-gradient-to-br from-accent-gold to-yellow-500 p-6 cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-primary-navy mb-4">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-base text-primary-navy mb-1">Free Delivery</h3>
                  <p className="text-sm text-primary-navy/70">Anywhere in India. Zero extra charges.</p>
                </div>

                <div className="group rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-emerald-400/30 bg-white dark:bg-slate-900/80 p-6 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-base text-primary-navy dark:text-white mb-1">Verified Finisher</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Proof reviewed. Achievement officially recognized.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SCROLL TIMELINE ===== */}
      <section ref={timelineRef} className="py-20 lg:py-28 relative bg-slate-50/50 dark:bg-[#060e1f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14 lg:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent-gold font-display font-semibold text-sm tracking-widest uppercase mb-3">
              Your Journey
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-primary-navy dark:text-white">
              Registration to trophy
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />
            <motion.div
              className="hidden lg:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary-blue via-accent-gold to-accent-gold -translate-x-1/2 origin-top"
              style={{ height: lineHeight }}
            />
            <div className="space-y-6 lg:space-y-10">
              {journeySteps.map((step, idx) => (
                <TimelineStep key={idx} step={step} idx={idx} isLast={idx === journeySteps.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialsSection />

      {/* ===== SUPPORTED APPS ===== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent-gold font-display font-semibold text-sm tracking-widest uppercase mb-3">Track Your Run</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-primary-navy dark:text-white">Use any running app</motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              { name: 'Strava', color: 'from-orange-500 to-orange-600' },
              { name: 'Nike Run Club', color: 'from-slate-700 to-slate-900' },
              { name: 'Garmin', color: 'from-blue-600 to-blue-700' },
              { name: 'Fitbit', color: 'from-teal-500 to-teal-600' },
              { name: 'Apple Health', color: 'from-rose-500 to-pink-600' },
              { name: 'Adidas Running', color: 'from-blue-500 to-indigo-600' },
              { name: 'Google Fit', color: 'from-green-500 to-emerald-600' },
              { name: 'Samsung Health', color: 'from-blue-700 to-blue-800' },
            ].map((app, i) => (
              <motion.div key={i} variants={scaleUp} custom={i}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-accent-gold/20 hover:shadow-lg transition-all duration-500"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Timer className="h-5 w-5" />
                </div>
                <span className="font-display font-semibold text-xs text-primary-navy dark:text-white text-center">{app.name}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-sm text-slate-500 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Treadmill runners can submit a photo of the treadmill screen
          </motion.p>
        </div>
      </section>


      {/* ===== FAQ ===== */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50/80 to-white dark:from-[#060e1f] dark:to-[#040D1D]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-accent-gold font-display font-semibold text-sm tracking-widest uppercase mb-3">FAQ</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-primary-navy dark:text-white">Common questions</motion.h2>
          </motion.div>

          <motion.div className="space-y-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            {[
              { q: 'Can I complete my run in multiple days?', a: 'Yes! You can split your distance across multiple days. Just make sure to track each session and submit the total.' },
              { q: 'What running apps are accepted?', a: 'Any app that shows distance and time - Strava, Nike Run Club, Garmin, Fitbit, Apple Health, etc. Treadmill photos are also accepted.' },
              { q: 'When will I receive my trophy?', a: 'After your proof is verified, your trophy is dispatched within 5-7 working days. Free delivery anywhere in India.' },
              { q: 'Can I run on a treadmill?', a: 'Absolutely! Treadmill runs are fully accepted. Just take a clear photo of the treadmill screen showing distance and time.' },
              { q: 'Is there an age limit?', a: 'No age limit! Runners of all ages and fitness levels are welcome to participate.' },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => navigate('/faq')}
              className="inline-flex items-center gap-2 text-sm font-display font-semibold text-accent-gold hover:text-yellow-400 transition-colors cursor-pointer group"
            >
              View all FAQs
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== WHATSAPP COMMUNITY ===== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-display font-bold text-lg text-white">Join the PaceUp Run Community</h3>
              <p className="text-white/40 text-sm">Get updates, connect with fellow runners, and stay motivated on WhatsApp.</p>
            </div>
            <a
              href="https://whatsapp.com/channel/0029VbD5Aj684Om3hsOSTK2N"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 font-display font-bold uppercase tracking-wider px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm transition-colors duration-300 cursor-pointer"
            >
              Join Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-[#0a1e3d] to-[#040D1D]" />
            <motion.div
              className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-60 h-60 bg-primary-royal/15 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-14 sm:py-20 text-center space-y-6">
              <motion.h2 variants={fadeUp}
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight"
              >
                Ready to earn your <span className="text-accent-gold">trophy</span>?
              </motion.h2>

              <motion.div variants={fadeUp} custom={1} className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                {registrationOpen ? (
                  <motion.button
                    onClick={() => navigate('/register')}
                    className="group font-display font-bold uppercase tracking-wider px-10 py-4 rounded-xl bg-accent-gold text-primary-navy cursor-pointer flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  >
                    Register for ₹499
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                ) : (
                  <div className="font-display font-bold uppercase tracking-wider px-10 py-4 rounded-xl bg-gradient-to-r from-red-700 to-gray-800 text-white text-sm flex items-center justify-center">
                    Registrations are closed
                  </div>
                )}
                <motion.button
                  onClick={() => navigate('/event')}
                  className="font-display font-semibold px-10 py-4 rounded-xl text-white border border-white/20 hover:bg-white/10 transition-all cursor-pointer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                >
                  Learn More
                </motion.button>
              </motion.div>

              <motion.div variants={fadeUp} custom={2} className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-accent-gold" /> Trophy</span>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-accent-gold" /> Free Shipping</span>
                <span className="text-slate-700">|</span>
                <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-accent-gold" /> Certificate</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}