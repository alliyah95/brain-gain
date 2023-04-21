import React, { useCallback } from "react";
import { loadFull } from "tsparticles";
import particlesOptions from "../../util/particles.json";
import Particles from "react-particles";

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
