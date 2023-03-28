import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "../../util/particles.json";

const ParticlesBackground = (props) => {
    const particlesInit = useCallback((main) => {
        loadFull(main);
    }, []);

    return (
        <>
            <Particles options={particlesOptions} init={particlesInit} />
            {props.children}
        </>
    );
};

export default ParticlesBackground;
