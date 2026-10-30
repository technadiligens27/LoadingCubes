
import { useEffect, useState } from "react";

import {
  useGLTF,
  useAnimations,
  Float,
} from "@react-three/drei";

import * as THREE from "three";

const Model = ({
  floatSpeed = 7,
  floatIntensity = 1,
  rotationIntensity = 0.1,
  floatingRange = [-0.1, 0.1],

  animationSpeed = 1,
  loopAnimation = true,
}) => {
  // ==========================================
  // RESPONSIVE MODEL SCALE
  // ==========================================

  const [modelScale, setModelScale] = useState(0.7);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setModelScale(0.45);
      } else if (width <= 768) {
        setModelScale(0.55);
      } else if (width <= 1024) {
        setModelScale(0.55);
      } else {
        setModelScale(0.7);
      }
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  // ==========================================
  // LOAD MODEL
  // ==========================================

  const modelPath =
    `${import.meta.env.BASE_URL}LoadingCubes.glb`;

  const { scene, animations } = useGLTF(modelPath);

  // ==========================================
  // MODEL TRANSFORMS
  // ==========================================

  const position = [0, 0, 0];

  const rotation = [0.12, 1.37, -0.07];

  // ==========================================
  // ANIMATION SETUP
  // ==========================================

  const { actions, names } = useAnimations(
    animations,
    scene
  );

  // ==========================================
  // AUTOMATIC ANIMATION
  // ==========================================

  useEffect(() => {
    if (!names.length) return;

    const action = actions[names[0]];

    if (!action) return;

    action.reset();

    action.timeScale = animationSpeed;

    if (loopAnimation) {
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
    } else {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    }

    action.play();

    return () => {
      action.stop();
    };
  }, [actions, names, animationSpeed, loopAnimation]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <Float
      speed={floatSpeed}
      floatIntensity={floatIntensity}
      rotationIntensity={rotationIntensity}
      floatingRange={floatingRange}
    >
      <group
        position={position}
        rotation={rotation}
        scale={modelScale}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
};

// ==========================================
// PRELOAD MODEL
// ==========================================

useGLTF.preload(
  `${import.meta.env.BASE_URL}LoadingCubes.glb`
);

export default Model;
