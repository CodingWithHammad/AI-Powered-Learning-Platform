import React from "react";
import LightPillar from "@/components/LightPillar";

interface Props {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      
      {/* Background */}
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />

      {/* Content */}
      <div style={{ position: "absolute", inset: 0 }}>
        {children}
      </div>

    </div>
  );
};

export default BackgroundWrapper;
