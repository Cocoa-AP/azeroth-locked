import './Map.scss'
import {ORIG_WIDTH, ORIG_HEIGHT, scaleCoords} from "./area.models.tsx";
import backgroundImage from '/eastern-kingdom-map-final.png'
import * as React from "react";
import {newEncodedState} from "../../services/Encoder.tsx";
import { useAtom } from 'jotai';
import {areaState} from '../../states/AreaState.tsx';

function Map() {
    const [areas, setAreas] = useAtom(areaState)

    const imgRef = React.useRef<HTMLImageElement | null>(null);
    const [size, setSize] = React.useState({width: ORIG_WIDTH, height: ORIG_HEIGHT});
    const [sizeSet, setSizeSet] = React.useState(false);

    React.useEffect(() => {
        if (!imgRef.current) return;
        const ro = new ResizeObserver(entries => {
            for (const entry of entries) {
                const {width, height} = entry.contentRect;
                setSize({width, height});
            }
        });
        ro.observe(imgRef.current);
        if (!sizeSet) setSizeSet(true);
        return () => ro.disconnect();
    }, []);

    return (
        <>
            <div className="flex w-full h-full justify-content-center align-items-center">
                <div
                    style={{
                        position: 'relative',
                        width: '100vh',
                        minHeight: ORIG_HEIGHT,
                        minWidth: ORIG_WIDTH,
                    }}>
                    <img
                        ref={imgRef}
                        id="romap"
                        src={backgroundImage}
                        alt=""
                        useMap="#themap"
                        style={{width: '100%', height: 'auto', display: 'block'}}
                    />
                    {
                        sizeSet && (
                            <>
                                <map name="themap" id="themap">
                                    {areas.map((area) => {
                                        // Determine locked status from lockedRegions state
                                        const isLocked = area.locked;
                                        return (
                                            <area
                                                key={area.location}
                                                id={area.id}
                                                href={isLocked ? '#' : undefined}
                                                style={{cursor: isLocked ? 'pointer' : 'default'}}
                                                alt={area.location}
                                                title={area.location}
                                                shape="poly"
                                                coords={scaleCoords(area.coords, size.width, size.height)}
                                                onMouseEnter={_ => {
                                                    if (!isLocked) return;
                                                    document.querySelector(`polygon[data-id="${area.id}"]`)?.classList.add('highlighted');
                                                }}
                                                onMouseLeave={_ => {
                                                    document.querySelector(`polygon[data-id="${area.id}"]`)?.classList.remove('highlighted');
                                                }}

                                                onMouseMove={_ => {
                                                }}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setAreas((prev) => {
                                                        if (!isLocked) return prev;

                                                        const next = prev.map(prevArea =>
                                                            prevArea.id === area.id
                                                                ? {...prevArea, locked: false}
                                                                : prevArea
                                                        );

                                                        newEncodedState(areas);
                                                        return next;
                                                    });
                                                }}
                                            />
                                        );
                                    })}

                                </map>
                            </>
                        )
                    }
                    <svg
                        viewBox={`0 0 ${ORIG_WIDTH} ${ORIG_HEIGHT}`}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none', // clicks go through to <area>
                        }}>
                        {areas.map((area) => {
                            const locked = area.locked;
                            const highlight = area.highlight;
                            return (
                                <polygon
                                    data-id={area.id}
                                    key={area.id}
                                    points={area.coords}
                                    className={`
                                        region 
                                        ${
                                        locked ? 'region-locked' : 'region-unlocked'
                                    } 
                                        ${
                                        highlight ? 'highlighted' : ''
                                    }`
                                    }

                                />
                            );
                        })}
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Map
