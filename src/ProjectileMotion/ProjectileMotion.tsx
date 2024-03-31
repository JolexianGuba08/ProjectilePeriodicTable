import { FC, useEffect } from "react";
import { Mafs, useStopwatch, Point, useMovablePoint, Plot, Vector } from "mafs";
import "./styles/projectile.css"
const ProjectileMotion: FC = () => {
    const xSpan: number = 1.75;
    const ySpan: number = 1.75;
    const initialVelocity = useMovablePoint([0.5, 1.5]);
    const vectorScale: number = 4;

    const g: number = 9.8;
    const mass: number = 0.1; // Mass of the projectile (kg)
    const diameter: number = 0.05; // Diameter of the projectile (m)
    const xVelocity: number = initialVelocity.x * vectorScale;
    const yVelocity: number = initialVelocity.y * vectorScale;
    const velocityAngle: number = Math.atan(yVelocity / xVelocity);
    const velocityMag: number = Math.sqrt(xVelocity ** 2 + yVelocity ** 2);
    const timeOfFlight: number = (2 * velocityMag * Math.sin(velocityAngle)) / g;

    // Additional calculations
    const maxHeight: number = (yVelocity ** 2) / (2 * g);
    const launchAngle: number = Math.atan(yVelocity / xVelocity);
    const speed: number = Math.sqrt(xVelocity ** 2 + yVelocity ** 2);

    function positionAtTime(t: number): [number, number] {
        return [xVelocity * t, yVelocity * t - 0.5 * g * t ** 2];
    }

    const [restingX, restingY]: [number, number] = positionAtTime(timeOfFlight);

    const { time: currentTime, start, stop } = useStopwatch({
        endTime: timeOfFlight,
    });

    useEffect(() => {
        stop();
    }, [restingX, restingY, stop]);

    const isRunning: boolean = currentTime === timeOfFlight;

    return (
        <>
            <div className="MafsView">
                <Mafs
                    height={550}
                    viewBox={{
                        x: [1 - xSpan, 1 + xSpan],
                        y: [1 - ySpan, 1 + ySpan],
                    }}


                >
                    <Vector
                        tip={[
                            xVelocity / vectorScale,
                            yVelocity / vectorScale,
                        ]}/>

                    {(
                        <>
                            <Plot.Parametric
                                xy={positionAtTime}
                                t={[0, timeOfFlight]}
                                opacity={0.4}
                                style="dashed"/>
                            <Point
                                x={restingX}
                                y={restingY}
                                opacity={0.5}/>
                        </>
                    )}
                    <Point
                        x={positionAtTime(currentTime)[0]}
                        y={positionAtTime(currentTime)[1]}/>

                    {initialVelocity.element}
                </Mafs>
                <div className="additional-calculations ">
                    <p className="text">
                        <span className="font-bold">Time:</span>{" "}
                        {isRunning ? `${currentTime.toFixed(2)}/${timeOfFlight.toFixed(2)} seconds` : "0"}
                    </p>
                    <p className="text">
                        <span className="font-bold">Launch Angle:</span>{" "}
                        {isRunning ? launchAngle.toFixed(2) : "0"} radians
                    </p>
                    <p className="text">
                        <span className="font-bold">Height:</span>{" "}
                        {isRunning ? maxHeight.toFixed(2) : "0"} meters
                    </p>
                    <p className="text">
                        <span className="font-bold">Speed:</span>{" "}
                        {isRunning ? speed.toFixed(2) : "0"} m/s
                    </p>
                    <p className="text">
                        <span className="font-bold">Gravity:</span>{" "}
                        {isRunning ? g.toFixed(2) : "0"} m/s²
                    </p>
                    <p className="text">
                        <span className="font-bold">Mass:</span>{" "}
                        {isRunning ? mass.toFixed(2) : "0"} kg
                    </p>
                    <p className="text">
                        <span className="font-bold">Diameter:</span>{" "}
                        {isRunning ? diameter.toFixed(2) : "0"} m
                    </p>

                </div>
            </div>

            <div className="button-container">
                <button
                    className={`action-button start-button ${isRunning ? 'disabled' : 'enabled'}`}
                    onClick={start}
                    disabled={isRunning}>
                    Start
                </button>
                <button
                    className="action-button reset-button"
                    onClick={stop}>
                    Reset
                </button>
            </div>

        </>
    );
};

export default ProjectileMotion;
