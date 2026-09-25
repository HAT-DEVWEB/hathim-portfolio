import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';
import { Layers, Maximize2, RotateCcw, Cpu, Battery, Eye, Compass, Shield } from 'lucide-react';

interface Subsystem {
  id: string;
  name: string;
  tag: string;
  description: string;
  icon: React.ReactNode;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
}

const SUBSYSTEMS: Subsystem[] = [
  {
    id: 'chassis',
    name: 'Structural Deck',
    tag: 'Chassis & Mechanical',
    description: 'Precision-milled lightweight aluminum baseplate with vibration-damped mounting points, engineered for torsional rigidity and low center of mass.',
    icon: <Shield className="w-4 h-4 text-[#C5A059]" />,
    cameraPos: [0, 2.2, 4.2],
    cameraTarget: [0, 0.4, 0],
  },
  {
    id: 'drivetrain',
    name: 'Geared Drive Units',
    tag: 'Drivetrain & Motors',
    description: 'Independent high-torque brushless DC motor modules paired with planetary gear reductions and custom compliant all-terrain traction wheels.',
    icon: <RotateCcw className="w-4 h-4 text-[#C5A059]" />,
    cameraPos: [2.5, 1.2, 2.8],
    cameraTarget: [1.2, 0.2, 0],
  },
  {
    id: 'sensors',
    name: 'Perception Turret',
    tag: 'Sensors & Depth',
    description: 'Front-facing stereo depth-sensing array and planar LiDAR scanner mounted on a vibration-isolated forward deck for 360° obstacle mapping.',
    icon: <Eye className="w-4 h-4 text-[#C5A059]" />,
    cameraPos: [0, 2.5, 2.8],
    cameraTarget: [0, 1.3, 0.8],
  },
  {
    id: 'controller',
    name: 'Compute & Real-Time MCU',
    tag: 'Controller & Telemetry',
    description: 'Dual-tier architecture running deterministic real-time motor control loops on a 32-bit MCU paired with an embedded Linux coprocessor for path planning.',
    icon: <Cpu className="w-4 h-4 text-[#C5A059]" />,
    cameraPos: [-1.8, 2.4, 2.2],
    cameraTarget: [0, 0.9, 0],
  },
  {
    id: 'power',
    name: 'Power Distribution & LiFePO4',
    tag: 'Power Architecture',
    description: 'High-discharge lithium iron phosphate battery enclosure with integrated active balancing BMS, isolated logic rails, and quick-swap mechanical retention.',
    icon: <Battery className="w-4 h-4 text-[#C5A059]" />,
    cameraPos: [0, 1.8, -3.5],
    cameraTarget: [0, 0.6, -0.4],
  },
  {
    id: 'imu',
    name: '6-Axis IMU Unit',
    tag: 'Inertial Measurement',
    description: 'Precision 6-DoF inertial sensor located directly at the platform center of mass for attitude estimation, balance correction, and drift compensation.',
    icon: <Compass className="w-4 h-4 text-[#C5A059]" />,
    cameraPos: [1.2, 2.0, 1.8],
    cameraTarget: [0, 0.7, 0],
  },
];

export const GoBuViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedSubsystem, setSelectedSubsystem] = useState<Subsystem | null>(null);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Three.js instances ref
  const stateRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    animId: number | null;
    robotGroup: THREE.Group | null;
    components: { [key: string]: THREE.Group | THREE.Mesh };
    targetCameraPos: THREE.Vector3;
    targetCameraTarget: THREE.Vector3;
    currCameraTarget: THREE.Vector3;
    isDragging: boolean;
    prevMousePos: { x: number; y: number };
    spherical: { radius: number; theta: number; phi: number };
  }>({
    scene: null,
    camera: null,
    renderer: null,
    animId: null,
    robotGroup: null,
    components: {},
    targetCameraPos: new THREE.Vector3(3.2, 2.2, 3.8),
    targetCameraTarget: new THREE.Vector3(0, 0.6, 0),
    currCameraTarget: new THREE.Vector3(0, 0.6, 0),
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    spherical: { radius: 5.2, theta: Math.PI / 4, phi: Math.PI / 3 },
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF3F1EC);
    scene.fog = new THREE.Fog(0xF3F1EC, 8, 16);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(3.2, 2.2, 3.8);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting - Premium Studio Product Reveal
    const ambientLight = new THREE.AmbientLight(0xFFFAF0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 2.4);
    keyLight.position.set(4, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const goldRimLight = new THREE.DirectionalLight(0xC5A059, 1.8);
    goldRimLight.position.set(-5, 4, -4);
    scene.add(goldRimLight);

    const fillLight = new THREE.DirectionalLight(0xE0DDD5, 0.9);
    fillLight.position.set(0, -2, 4);
    scene.add(fillLight);

    // Studio Ground Contact Plane
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle grid pattern for engineering precision
    const gridHelper = new THREE.GridHelper(12, 24, 0xD4CFC5, 0xE5E0D5);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 5. Construct Modular CAD Prototype Robot: GO-BU
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Reusable Materials
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1E1D1B,
      roughness: 0.35,
      metalness: 0.85,
    });
    const anodizedAlumMat = new THREE.MeshStandardMaterial({
      color: 0x8C8880,
      roughness: 0.3,
      metalness: 0.9,
    });
    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xC5A059,
      roughness: 0.25,
      metalness: 0.95,
    });
    const carbonDeckMat = new THREE.MeshStandardMaterial({
      color: 0x151413,
      roughness: 0.5,
      metalness: 0.2,
    });
    const sensorLensMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.1,
      metalness: 0.9,
    });
    const rubberTireMat = new THREE.MeshStandardMaterial({
      color: 0x181716,
      roughness: 0.9,
      metalness: 0.05,
    });

    const components: { [key: string]: THREE.Group | THREE.Mesh } = {};

    // A. CHASSIS GROUP
    const chassisGroup = new THREE.Group();
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 3.0), anodizedAlumMat);
    basePlate.position.y = 0.45;
    basePlate.castShadow = true;
    basePlate.receiveShadow = true;
    chassisGroup.add(basePlate);

    // Chassis side rails
    [-1.05, 1.05].forEach((x) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 2.9), goldAccentMat);
      rail.position.set(x, 0.55, 0);
      rail.castShadow = true;
      chassisGroup.add(rail);
    });

    // Lower belly armor
    const belly = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 2.6), darkMetalMat);
    belly.position.y = 0.38;
    chassisGroup.add(belly);
    robotGroup.add(chassisGroup);
    components.chassis = chassisGroup;

    // B. DRIVETRAIN & WHEELS GROUP
    const drivetrainGroup = new THREE.Group();
    const wheelPositions = [
      { x: -1.25, z: 1.0 },
      { x: 1.25, z: 1.0 },
      { x: -1.25, z: -1.0 },
      { x: 1.25, z: -1.0 },
    ];

    wheelPositions.forEach((pos) => {
      const wheelSub = new THREE.Group();
      wheelSub.position.set(pos.x, 0.45, pos.z);

      // Motor housing
      const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.35, 16), darkMetalMat);
      motor.rotation.z = Math.PI / 2;
      motor.castShadow = true;
      wheelSub.add(motor);

      // Gold Hub
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.18, 20), goldAccentMat);
      hub.rotation.z = Math.PI / 2;
      hub.position.x = pos.x > 0 ? 0.12 : -0.12;
      hub.castShadow = true;
      wheelSub.add(hub);

      // High-traction Tire
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.24, 24), rubberTireMat);
      tire.rotation.z = Math.PI / 2;
      tire.position.x = pos.x > 0 ? 0.14 : -0.14;
      tire.castShadow = true;
      wheelSub.add(tire);

      drivetrainGroup.add(wheelSub);
    });
    robotGroup.add(drivetrainGroup);
    components.drivetrain = drivetrainGroup;

    // C. COMPUTE & CONTROLLER DECK
    const controllerGroup = new THREE.Group();
    const midDeck = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.06, 2.5), carbonDeckMat);
    midDeck.position.y = 0.72;
    midDeck.castShadow = true;
    controllerGroup.add(midDeck);

    // Electronics Enclosure & Heatsink
    const ecu = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.22, 1.2), darkMetalMat);
    ecu.position.set(0, 0.86, 0.1);
    ecu.castShadow = true;
    controllerGroup.add(ecu);

    // Gold Heatsink fins
    for (let f = -0.4; f <= 0.4; f += 0.12) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 1.1), goldAccentMat);
      fin.position.set(f, 0.99, 0.1);
      controllerGroup.add(fin);
    }

    // Telemetry Status LED
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.08), new THREE.MeshBasicMaterial({ color: 0x50E3C2 }));
    led.position.set(0.42, 0.98, -0.4);
    controllerGroup.add(led);

    robotGroup.add(controllerGroup);
    components.controller = controllerGroup;

    // D. POWER ARCHITECTURE
    const powerGroup = new THREE.Group();
    const batteryPack = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.28, 0.9), darkMetalMat);
    batteryPack.position.set(0, 0.62, -0.85);
    batteryPack.castShadow = true;
    powerGroup.add(batteryPack);

    // Power terminals & bracket
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.04, 0.94), goldAccentMat);
    bracket.position.set(0, 0.77, -0.85);
    powerGroup.add(bracket);

    robotGroup.add(powerGroup);
    components.power = powerGroup;

    // E. 6-AXIS IMU (Center of Mass Node)
    const imuGroup = new THREE.Group();
    const imuNode = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.2), goldAccentMat);
    imuNode.position.set(0, 0.74, 0);
    imuGroup.add(imuNode);

    const imuRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.015, 8, 24), darkMetalMat);
    imuRing.rotation.x = Math.PI / 2;
    imuRing.position.set(0, 0.74, 0);
    imuGroup.add(imuRing);

    robotGroup.add(imuGroup);
    components.imu = imuGroup;

    // F. PERCEPTION TURRET & SENSORS
    const sensorsGroup = new THREE.Group();
    // Mast risers
    [-0.4, 0.4].forEach((x) => {
      const riser = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 12), anodizedAlumMat);
      riser.position.set(x, 1.05, 0.9);
      sensorsGroup.add(riser);
    });

    // Sensor platform
    const sensorDeck = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.5), carbonDeckMat);
    sensorDeck.position.set(0, 1.35, 0.9);
    sensorDeck.castShadow = true;
    sensorsGroup.add(sensorDeck);

    // Planar LiDAR Turret
    const lidar = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.22, 24), darkMetalMat);
    lidar.position.set(0, 1.5, 0.9);
    lidar.castShadow = true;
    sensorsGroup.add(lidar);

    const lidarRing = new THREE.Mesh(new THREE.CylinderGeometry(0.265, 0.265, 0.04, 24), goldAccentMat);
    lidarRing.position.set(0, 1.52, 0.9);
    sensorsGroup.add(lidarRing);

    // Forward Stereo Depth Lenses
    [-0.35, 0.35].forEach((x) => {
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.08, 16), sensorLensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(x, 1.35, 1.16);
      sensorsGroup.add(lens);
    });

    robotGroup.add(sensorsGroup);
    components.sensors = sensorsGroup;

    // Position robot on ground
    robotGroup.position.set(0, 0, 0);

    stateRef.current = {
      scene,
      camera,
      renderer,
      animId: null,
      robotGroup,
      components,
      targetCameraPos: new THREE.Vector3(3.4, 2.4, 4.0),
      targetCameraTarget: new THREE.Vector3(0, 0.7, 0),
      currCameraTarget: new THREE.Vector3(0, 0.7, 0),
      isDragging: false,
      prevMousePos: { x: 0, y: 0 },
      spherical: { radius: 5.4, theta: Math.PI / 4, phi: Math.PI / 3 },
    };

    // Animation Loop
    let lastTime = performance.now();
    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Auto-rotation when not interacting
      if (isAutoRotate && !stateRef.current.isDragging && !selectedSubsystem) {
        stateRef.current.spherical.theta += dt * 0.25;
      }

      // Compute camera position from spherical coordinates when in free orbit
      if (!selectedSubsystem) {
        const { radius, theta, phi } = stateRef.current.spherical;
        stateRef.current.targetCameraPos.set(
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.cos(theta)
        );
      }

      // Smooth camera interpolation (lerp)
      camera.position.lerp(stateRef.current.targetCameraPos, dt * 4.5);
      stateRef.current.currCameraTarget.lerp(stateRef.current.targetCameraTarget, dt * 5.0);
      camera.lookAt(stateRef.current.currCameraTarget);

      // Exploded View kinematics animation
      const expLerp = isExploded ? 1 : 0;
      if (components.sensors) components.sensors.position.y = THREE.MathUtils.lerp(components.sensors.position.y, expLerp * 0.9, dt * 5);
      if (components.controller) components.controller.position.y = THREE.MathUtils.lerp(components.controller.position.y, expLerp * 0.45, dt * 5);
      if (components.power) components.power.position.z = THREE.MathUtils.lerp(components.power.position.z, expLerp * -0.6, dt * 5);
      if (components.drivetrain) components.drivetrain.position.y = THREE.MathUtils.lerp(components.drivetrain.position.y, expLerp * -0.35, dt * 5);

      renderer.render(scene, camera);
      stateRef.current.animId = requestAnimationFrame(animate);
    };

    stateRef.current.animId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (stateRef.current.animId) cancelAnimationFrame(stateRef.current.animId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isExploded, isAutoRotate, selectedSubsystem]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true;
    stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
    setIsAutoRotate(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.prevMousePos.x;
    const dy = e.clientY - stateRef.current.prevMousePos.y;
    stateRef.current.prevMousePos = { x: e.clientX, y: e.clientY };

    // Update spherical coordinates
    const sensitivity = 0.006;
    stateRef.current.spherical.theta -= dx * sensitivity;
    stateRef.current.spherical.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, stateRef.current.spherical.phi - dy * sensitivity));

    // Deselect active subsystem on free drag
    if (selectedSubsystem) {
      setSelectedSubsystem(null);
      stateRef.current.targetCameraTarget.set(0, 0.7, 0);
    }
  };

  const handlePointerUp = () => {
    stateRef.current.isDragging = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const zoomDelta = e.deltaY * 0.003;
    stateRef.current.spherical.radius = Math.max(2.6, Math.min(8.5, stateRef.current.spherical.radius + zoomDelta));
  };

  const handleSelectSubsystem = (sub: Subsystem) => {
    sound.playRobotInspect();
    if (selectedSubsystem?.id === sub.id) {
      // Toggle off
      setSelectedSubsystem(null);
      stateRef.current.targetCameraTarget.set(0, 0.7, 0);
      stateRef.current.targetCameraPos.set(3.4, 2.4, 4.0);
    } else {
      setSelectedSubsystem(sub);
      stateRef.current.targetCameraPos.set(...sub.cameraPos);
      stateRef.current.targetCameraTarget.set(...sub.cameraTarget);
      setIsAutoRotate(false);
    }
  };

  const handleResetCamera = () => {
    sound.playTactileClick(0.06);
    setSelectedSubsystem(null);
    setIsExploded(false);
    setIsAutoRotate(true);
    stateRef.current.spherical = { radius: 5.4, theta: Math.PI / 4, phi: Math.PI / 3 };
    stateRef.current.targetCameraTarget.set(0, 0.7, 0);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#FAF8F5] border border-[#E3DDD4] overflow-hidden shadow-[0_8px_30px_rgba(20,19,18,0.03)]">
      {/* Editorial Header */}
      <div className="px-6 py-5 border-b border-[#E3DDD4] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#A6823E] font-semibold">
              Current Project • In Development
            </span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-[#141312]">
            GO-BU <span className="text-base font-normal text-[#78736B]">/ Autonomous Robotics Platform</span>
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playTactileClick(0.06);
              setIsExploded(!isExploded);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider rounded-lg border transition-all ${
              isExploded
                ? 'bg-[#C5A059] text-white border-[#C5A059]'
                : 'bg-white text-[#4A4641] border-[#E3DDD4] hover:border-[#C5A059]'
            }`}
            title="Toggle exploded assembly view"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Assembly: Exploded' : 'Exploded View'}</span>
          </button>

          <button
            onClick={handleResetCamera}
            className="p-1.5 text-[#78736B] hover:text-[#141312] bg-white rounded-lg border border-[#E3DDD4] hover:border-[#C5A059] transition-all"
            title="Reset 3D Stage"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* 3D Interactive Viewport */}
        <div
          ref={mountRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
          className="relative lg:col-span-8 w-full h-[480px] lg:h-[620px] cursor-grab active:cursor-grabbing touch-none select-none overflow-hidden"
        >
          {/* Subtle Stage Watermark */}
          <div className="absolute top-4 left-5 pointer-events-none z-10">
            <span className="text-[10px] font-mono tracking-widest text-[#A6823E]/80 uppercase">
              CAD PROTOTYPE VIEW • 3D INSPECTOR
            </span>
          </div>

          <div className="absolute bottom-4 left-5 pointer-events-none z-10 flex items-center gap-2 text-[11px] font-mono text-[#78736B] bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded border border-[#E3DDD4]">
            <Maximize2 className="w-3 h-3 text-[#C5A059]" />
            <span>Drag to Orbit • Scroll to Zoom</span>
          </div>

          {/* WebGL Fallback if device fails */}
          {!webGLSupported && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
              <Cpu className="w-12 h-12 text-[#C5A059] mb-3" />
              <h4 className="text-lg font-bold text-[#141312]">CAD Prototype Render</h4>
              <p className="text-sm text-[#78736B] max-w-sm mt-1">
                WebGL is currently constrained on this device. Displaying verified engineering architecture.
              </p>
            </div>
          )}
        </div>

        {/* Subsystem Telemetry & Inspection Sidebar */}
        <div className="lg:col-span-4 p-6 lg:p-7 border-t lg:border-t-0 lg:border-l border-[#E3DDD4] flex flex-col justify-between bg-white/60">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#78736B]">
                Subsystem Inspection
              </span>
              <span className="text-[11px] font-mono text-[#A6823E]">
                {selectedSubsystem ? 'Focus Mode' : '6 Modules Active'}
              </span>
            </div>

            {/* Subsystem Select Buttons */}
            <div className="space-y-2 mb-6">
              {SUBSYSTEMS.map((sub) => {
                const isSelected = selectedSubsystem?.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectSubsystem(sub)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FAF8F5] border-[#C5A059] shadow-sm'
                        : 'bg-white/80 border-[#E3DDD4] hover:border-[#D4CFC5] text-[#4A4641]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#C5A059]/15' : 'bg-[#F3F1EC]'}`}>
                        {sub.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#141312]">{sub.name}</div>
                        <div className="text-[10px] font-mono text-[#78736B]">{sub.tag}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#C5A059] font-bold">
                      {isSelected ? 'ACTIVE' : 'INSPECT'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Subsystem Detail Card */}
            {selectedSubsystem ? (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/40 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A6823E] font-bold">
                    {selectedSubsystem.tag}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#141312] mb-1.5">{selectedSubsystem.name}</h4>
                <p className="text-xs text-[#5C5852] leading-relaxed">
                  {selectedSubsystem.description}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#F3F1EC]/60 border border-[#E3DDD4] text-xs text-[#78736B] leading-relaxed">
                Click any engineering module above or tap parts on the 3D model to focus the optics and inspect verified architectural specifications.
              </div>
            )}
          </div>

          {/* Genuine Project Engineering Note */}
          <div className="pt-6 mt-6 border-t border-[#E3DDD4]">
            <div className="text-[10px] font-mono text-[#78736B] uppercase tracking-wider mb-1">
              Engineering Status
            </div>
            <p className="text-xs text-[#4A4641] leading-relaxed">
              Robotics prototype under active development. Testing real-time firmware loops, motor telemetry, and sensor integration at MITS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
