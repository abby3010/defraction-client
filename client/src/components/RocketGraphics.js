import React, { Suspense } from "react";
import "./style.css"
import { Canvas } from "@react-three/fiber";
import { extend } from '@react-three/fiber'
import {
  Loader,
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
extend({ OrbitControls })


const RocketGraphics = (props) => {
  const { nodes } = useGLTF("/space_exploration_wlp_series_8.glb");
  console.log(nodes)
  console.log(nodes.planet001_1)
  return (
    <>
      <div className="bg" />
      {/* <h1 className="threeH">
        DeFraction <span className="threeSpan" style={{ fontSize: "0.4em" }}>StockMarket</span>
        <br />
        <span className="threeSpantwo">Platform</span>
      </h1> */}
      <Canvas dpr={[1.5, 2]} linear shadows>
        <fog attach="fog" args={["#272730", 16, 30]} />
        <ambientLight intensity={0.75} />
        <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={75}>
          <pointLight intensity={1} position={[-10, -25, -10]} />
          <spotLight
            castShadow
            intensity={2.25}
            angle={0.2}
            penumbra={1}
            position={[-25, 20, -15]}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
        <Suspense fallback={null}>
          <group
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -7, 0]}
            scale={7}
          >
            <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
              <mesh
                receiveShadow
                castShadow
                geometry={nodes.planet001_1.geometry}
                material={nodes.planet001_1.material}
              />
              <mesh
                geometry={nodes.planet001_2.geometry}
                material={nodes.planet001_2.material}
              />
            </group>
          </group>
        </Suspense>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Stars radius={500} depth={50} count={1000} factor={10} />
      </Canvas>
      {/* <div className="layer" /> */}
      <Loader />
    </>
  );
};

export default RocketGraphics;
