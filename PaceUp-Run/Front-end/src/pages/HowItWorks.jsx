import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ClipboardList, Play, CheckSquare, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const rendered = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);

    let raf;
    function loop() {
      raf = requestAnimationFrame(loop);
      rendered.current.x += (pos.current.x - rendered.current.x) * 0.12;
      rendered.current.y += (pos.current.y - rendered.current.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${rendered.current.x - 150}px, ${rendered.current.y - 150}px)`;
      }
    }
    loop();

    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block"
      style={{
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 70%)',
        willChange: 'transform',
      }}
    />
  );
}

function ModelViewer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0xF5D060, 0.4);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    new GLTFLoader().load('/model.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 2.2 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      scene.add(model);
    });

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      controls.dispose();
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[280px] sm:h-[360px] mx-auto max-w-md" />;
}

function StepCard({ item, idx }) {
  const ref = useReveal();
  const isEven = idx % 2 === 0;

  return (
    <div ref={ref} className="reveal-up relative flex flex-col md:flex-row items-center gap-6 md:gap-0" style={{ transitionDelay: `${idx * 80}ms` }}>
      <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? '' : 'md:order-3'}`}>
        <div className={`${isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'}`}>
          <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sm:p-8 transition-all duration-400 hover:border-white/[0.14]">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display font-black text-4xl text-white/[0.06] leading-none">{item.step}</span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-gold/70 px-2.5 py-1 rounded-full border border-accent-gold/15">
                Step {idx + 1}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-3">{item.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-4">{item.desc}</p>

            <div className="flex items-start gap-2 p-3 rounded-lg border border-white/[0.06]">
              <span className="text-accent-gold/70 text-xs mt-0.5 shrink-0">Tip</span>
              <p className="text-white/30 text-xs leading-relaxed">{item.tips}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center w-16 shrink-0 md:order-2">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center ${item.ringColor} border-[3px] border-[#040D1D] relative z-10`}>
          {item.icon}
        </div>
      </div>

      <div className="md:hidden absolute -left-1 top-6">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.ringColor} border-[3px] border-[#040D1D]`}>
          {item.icon}
        </div>
      </div>

      <div className={`hidden md:block w-[calc(50%-2rem)] ${isEven ? 'md:order-3' : 'md:order-1'}`} />
    </div>
  );
}

export default function HowItWorks({ registrationOpen = true }) {
  const navigate = useNavigate();
  const ctaRef = useReveal();

  const steps = [
    {
      step: '01',
      title: 'Register Online',
      icon: <ClipboardList className="h-5 w-5 text-white" />,
      ringColor: 'bg-blue-600',
      desc: 'Fill out our secure registration form and sign up for the challenge. The fee is ₹499, which covers your theme-based trophy, digital certificate, sticker pack and free delivery across India.',
      tips: 'Ensure your spelling is correct! Your registered name will appear on your certificate and official challenge records.',
    },
    {
      step: '02',
      title: 'Complete Your Run',
      icon: <Play className="h-5 w-5 text-white" />,
      ringColor: 'bg-indigo-600',
      desc: 'Run, walk or jog at your own pace, on your own terms. Complete your distance in one go or split it across multiple days. Outdoors, parks, roads, or treadmills - all accepted.',
      tips: 'Use any popular tracking app like Strava, Nike Run Club, Garmin, Fitbit, Adidas Running, or Apple Health to log your workout.',
    },
    {
      step: '03',
      title: 'Upload Run Proof',
      icon: <CheckSquare className="h-5 w-5 text-white" />,
      ringColor: 'bg-violet-600',
      desc: 'Capture a screenshot of your tracking dashboard showing total distance, duration, and run date. Submit it via our verification portal or the validation link sent to your email.',
      tips: 'Treadmill runners can submit a photo of the treadmill screen showing the distance and workout time.',
    },
    {
      step: '04',
      title: 'Receive Your Rewards',
      icon: <Award className="h-5 w-5 text-white" />,
      ringColor: 'bg-amber-500',
      desc: 'Our team reviews your submission. Once verified, we prepare your theme-based trophy, e-certificate, sticker pack and dispatch your trophy directly to your doorstep. Shipping is completely free!',
      tips: 'You will receive a WhatsApp and email notification with a courier tracking ID as soon as your trophy leaves our workshop.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#040D1D] relative overflow-hidden">
      <CursorGlow />

      <style>{`
        .reveal-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-up.revealed { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Hero */}
      <div className="relative pt-20 pb-10 sm:pt-28 sm:pb-14">
        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-5">
          <span className="inline-block font-display font-bold text-[10px] tracking-[0.25em] uppercase text-accent-gold/80 border border-accent-gold/20 px-4 py-1.5 rounded-full">
            Guidelines
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white leading-tight">
            How It Works
          </h1>
          <p className="text-white/35 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Simple, flexible, and rewarding. Four steps from registration to trophy at your door.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 relative z-10">
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/[0.06]" />
          <div className="md:hidden absolute left-[18px] top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-12 md:space-y-16 pl-12 md:pl-0">
            {steps.map((item, idx) => (
              <StepCard key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>

        {/* 3D Logo */}
        <div className="mt-16 mb-8 text-center">
          <ModelViewer />
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-4">
            PaceUp <span className="text-accent-gold">Run</span>
          </h3>
          <p className="text-white/35 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Run at your own pace. Earn your trophy.
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="reveal-up mt-20 border border-white/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6" style={{ transitionDelay: '200ms' }}>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Ready to take the challenge?
            </h3>
            <p className="text-white/35 text-sm leading-relaxed max-w-lg">
              Complete your run at your own pace - indoors or outdoors - and receive a premium acrylic trophy delivered to your doorstep for free.
            </p>
          </div>
          {registrationOpen ? (
            <button
              onClick={() => navigate('/register')}
              className="shrink-0 group font-display font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl bg-accent-gold hover:bg-yellow-400 text-[#040D1D] cursor-pointer transition-colors duration-300 flex items-center gap-2"
            >
              Register for ₹499
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ) : (
            <div className="shrink-0 font-display font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-gray-800 text-white text-sm">
              Registrations are closed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
