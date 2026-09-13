import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface GalaxyProps {
  /** Number of particles in the galaxy */
  particleCount?: number;
  /** Number of spiral arms */
  arms?: number;
  /** Radius of the galaxy disc */
  radius?: number;
  /** Spiral curvature spin multiplier */
  spin?: number;
  /** Random dispersion spread of particles */
  randomness?: number;
  /** Exponential falloff power for dispersion */
  power?: number;
  /** Core center color (hex string) */
  insideColor?: string;
  /** Outer rim spiral color (hex string) */
  outsideColor?: string;
  /** Mid-arm nebula accent color (hex string) */
  accentColor?: string;
  /** Base particle size */
  particleSize?: number;
  /** Overall rotation speed */
  speed?: number;
  /** Enable mouse repulsion interaction */
  mouseRepulsion?: boolean;
  /** Repulsion radius around cursor in world coordinates */
  repulsionRadius?: number;
  /** Repulsion strength pushing particles away */
  repulsionStrength?: number;
  /** Enable twinkling star brightness oscillation */
  twinkle?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Dark overlay opacity over canvas for crisp UI readability (0 to 1) */
  overlayOpacity?: number;
}

export const Galaxy: React.FC<GalaxyProps> = ({
  particleCount = 12000,
  arms = 4,
  radius = 6.0,
  spin = 1.4,
  randomness = 0.55,
  power = 3.8,
  insideColor = '#F0F6FC',
  outsideColor = '#3FB950',
  accentColor = '#58A6FF',
  particleSize = 24.0,
  speed = 0.3,
  mouseRepulsion = true,
  repulsionRadius = 2.2,
  repulsionStrength = 1.4,
  twinkle = true,
  className = '',
  overlayOpacity = 0.72
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Camera angled slightly above the galaxy plane for cinematic depth
    camera.position.set(0, 4.2, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Mouse Tracking in Normalized Device Coordinates & World Space
    const mouse = new THREE.Vector2(-9999, -9999);
    const targetMouse = new THREE.Vector2(-9999, -9999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // XZ ground plane
    const mouseWorldPos = new THREE.Vector3(0, -9999, 0);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseLeave = () => {
      targetMouse.set(-9999, -9999);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 1. Generate Galaxy Particles
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const randomnessArray = new Float32Array(particleCount * 3);
    const twinkleSpeeds = new Float32Array(particleCount);
    const twinklePhases = new Float32Array(particleCount);

    const colorInside = new THREE.Color(insideColor);
    const colorOutside = new THREE.Color(outsideColor);
    const colorAccent = new THREE.Color(accentColor);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Distance from center with non-linear distribution (more stars at core & inner arms)
      const r = Math.pow(Math.random(), 1.6) * radius;

      // Spiral Arm Angle Calculation
      const armIndex = i % arms;
      const armAngle = (armIndex * (Math.PI * 2)) / arms;
      const spinAngle = r * spin;
      const totalAngle = armAngle + spinAngle;

      // Random 3D Gaussian-like dispersion around the arm
      const randomX =
        Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * randomness * (r * 0.4 + 0.2);
      const randomY =
        Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * (randomness * 0.55) * (r * 0.3 + 0.1);
      const randomZ =
        Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * randomness * (r * 0.4 + 0.2);

      // Store initial arm orbit coordinate
      positions[i3] = Math.cos(totalAngle) * r;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = Math.sin(totalAngle) * r;

      randomnessArray[i3] = randomX;
      randomnessArray[i3 + 1] = randomY;
      randomnessArray[i3 + 2] = randomZ;

      // Color interpolation: Core -> Accent (Mid Arm) -> Outside
      const mixedColor = colorInside.clone();
      const ratio = r / radius;
      if (ratio < 0.45) {
        mixedColor.lerp(colorAccent, ratio / 0.45);
      } else {
        mixedColor.lerp(colorOutside, (ratio - 0.45) / 0.55);
      }

      // Add slight hue variation to individual stars
      const brightnessShift = (Math.random() - 0.5) * 0.15;
      colors[i3] = Math.min(Math.max(mixedColor.r + brightnessShift, 0), 1);
      colors[i3 + 1] = Math.min(Math.max(mixedColor.g + brightnessShift, 0), 1);
      colors[i3 + 2] = Math.min(Math.max(mixedColor.b + brightnessShift, 0), 1);

      // Star size distribution: majority fine dust, rare prominent bright stars
      const isHeroStar = Math.random() < 0.04;
      scales[i] = isHeroStar ? Math.random() * 1.8 + 1.2 : Math.random() * 0.75 + 0.35;

      // Twinkle parameters
      twinkleSpeeds[i] = Math.random() * 2.5 + 1.0;
      twinklePhases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomnessArray, 3));
    geometry.setAttribute('aTwinkleSpeed', new THREE.BufferAttribute(twinkleSpeeds, 1));
    geometry.setAttribute('aTwinklePhase', new THREE.BufferAttribute(twinklePhases, 1));

    // 2. Custom WebGL Shader Material for 60fps GPU Acceleration
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        uniform float uPixelRatio;
        uniform float uSpeed;
        uniform vec3 uMouse;
        uniform float uRepulsionRadius;
        uniform float uRepulsionStrength;
        uniform float uTwinkle;

        attribute float aScale;
        attribute vec3 aRandomness;
        attribute float aTwinkleSpeed;
        attribute float aTwinklePhase;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;

          // 1. Calculate Orbit Rotation around Y axis
          vec3 pos = position;
          float distanceToCenter = length(pos.xz);
          
          // Outer stars rotate slightly slower for natural spiral physics
          float angle = atan(pos.x, pos.z);
          float angleOffset = (uTime * uSpeed * 0.12) / (0.6 + distanceToCenter * 0.25);
          angle += angleOffset;

          pos.x = sin(angle) * distanceToCenter;
          pos.z = cos(angle) * distanceToCenter;

          // Apply 3D randomness offset
          pos += aRandomness;

          // 2. Mouse Repulsion Effect
          if (uMouse.y > -9000.0) {
            vec3 dirToMouse = pos - uMouse;
            float distToMouse = length(dirToMouse);
            if (distToMouse < uRepulsionRadius && distToMouse > 0.001) {
              float force = (1.0 - (distToMouse / uRepulsionRadius)) * uRepulsionStrength;
              // Push particles radially outward and slightly upward
              vec3 pushDir = normalize(dirToMouse);
              pushDir.y += 0.35;
              pos += pushDir * (force * force * 1.3);
            }
          }

          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;

          // 3. Point Size with Distance Attenuation & Twinkling
          float twinkleFactor = 1.0;
          if (uTwinkle > 0.5) {
            twinkleFactor = 0.75 + 0.35 * sin(uTime * aTwinkleSpeed + aTwinklePhase);
          }

          gl_PointSize = uSize * aScale * twinkleFactor * uPixelRatio;
          gl_PointSize *= (1.0 / -viewPosition.z);

          // Alpha fade for very distant particles
          vAlpha = smoothstep(25.0, 2.0, -viewPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Soft circular point with glowing radial falloff
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;

          // Soft core brightness
          float strength = 1.0 - (dist * 2.0);
          strength = pow(strength, 2.2);

          // Center hot spot
          vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), strength * 0.55);

          gl_FragColor = vec4(finalColor, strength * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: particleSize },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uSpeed: { value: prefersReducedMotion ? 0.0 : speed },
        uMouse: { value: new THREE.Vector3(0, -9999, 0) },
        uRepulsionRadius: { value: repulsionRadius },
        uRepulsionStrength: { value: mouseRepulsion ? repulsionStrength : 0.0 },
        uTwinkle: { value: twinkle ? 1.0 : 0.0 }
      }
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Subtle Core Nebula Center Light
    const coreLight = new THREE.PointLight(insideColor, 1.8, 10);
    coreLight.position.set(0, 0.2, 0);
    scene.add(coreLight);

    // 3. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      // Project mouse to XZ galaxy plane
      if (mouse.x > -900 && mouse.y > -900) {
        raycaster.setFromCamera(mouse, camera);
        const intersectPoint = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
          mouseWorldPos.copy(intersectPoint);
        }
      } else {
        mouseWorldPos.set(0, -9999, 0);
      }

      // Update uniforms
      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.copy(mouseWorldPos);

      // Slow cinematic scene tilt based on mouse
      if (!prefersReducedMotion && targetMouse.x > -900) {
        camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.02;
        camera.position.y += (4.2 - mouse.y * 0.4 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 4. Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    particleCount,
    arms,
    radius,
    spin,
    randomness,
    power,
    insideColor,
    outsideColor,
    accentColor,
    particleSize,
    speed,
    mouseRepulsion,
    repulsionRadius,
    repulsionStrength,
    twinkle
  ]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 ${className}`}
    >
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#080B0F]" />

      {/* 2. WebGL Galaxy Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* 3. Global Vignette & Editorial Dark Contrast Overlay for typography sharpness */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity"
        style={{
          backgroundColor: `rgba(13, 17, 23, ${overlayOpacity})`,
          backgroundImage:
            'radial-gradient(ellipse at 50% 40%, rgba(13, 17, 23, 0.4) 0%, rgba(8, 11, 15, 0.95) 85%)'
        }}
      />
    </div>
  );
};
