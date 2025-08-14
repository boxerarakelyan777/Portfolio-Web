"use client";

import React, { useEffect, useRef } from "react";

type AnimatedBackgroundProps = React.PropsWithChildren<{}>;

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const THREE: any = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const particleCount = window.innerWidth < 640 ? 300 : 1000;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.6 });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const mouse = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("pointermove", onPointerMove);

      const onDeviceMove = (event: DeviceOrientationEvent) => {
        if (event.gamma !== null) mouse.x = event.gamma / 45;
        if (event.beta !== null) mouse.y = event.beta / 45;
      };
      window.addEventListener("deviceorientation", onDeviceMove);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();
      let frameId: number;
      const animate = () => {
        const elapsed = clock.getElapsedTime();
        points.rotation.y = elapsed * 0.05;
        points.rotation.x += (mouse.y * 0.2 - points.rotation.x) * 0.05;
        points.rotation.y += (mouse.x * 0.2 - points.rotation.y) * 0.05;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("deviceorientation", onDeviceMove);
        window.removeEventListener("resize", onResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    init();
    return () => cleanup?.();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
          filter: "blur(1px) brightness(0.7)",
        }}
      />
      {children}
    </>
  );
};

export default AnimatedBackground;
