import './App.scss'
import Map from './components/map/Map'
import backgroundImage from '/background.png'
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshIcon from '@mui/icons-material/Refresh';
import {SvgIcon} from "@mui/material";
import {newDecodeLockedState} from "./services/Encoder.tsx";
import {areaCodeState, areaState} from "./states/AreaState.tsx";
import {useAtom} from 'jotai';
import {useEffect} from "react";
import {Areas} from "./components/map/area.models.tsx";
import buttonImage from '/button-wide.png'
import {Randomizer} from "./components/randomizer/Randomizer.tsx";
import {GetViableAreas} from "./services/Areas.service.tsx";

function clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
}

function App() {

    //TODO: configure areas based on stored data or config key

    const [areas, setAreas] = useAtom(areaState);
    const [_, setAreaCode] = useAtom(areaCodeState);
    const areasCode = sessionStorage.getItem('areas');

    useEffect(() => {
        if (areasCode) {
            setAreas(newDecodeLockedState(areasCode));
            setAreaCode(areasCode);
        }
    }, [areasCode]);


    return (
        <>
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh'
            }}>
                <div className="flex w-full justify-content-center align-items-center absolute">
                    <a className="wow-text mt-4">Region Locked</a>
                </div>
                <SvgIcon component={SettingsIcon} inheritViewBox className="absolute right-0 top-0 m-4" onClick={() => {
                }}/>
                <SvgIcon component={RefreshIcon} inheritViewBox
                         className="absolute right-0 top-0 mr-8 mt-4 cursor-pointer"
                         onClick={() => {
                             clearStorage()
                             setAreas(Areas)
                             setAreaCode('');
                         }
                         }/>
                <Map/>
                <div className="absolute bottom-1rem w-full flex justify-content-center align-items-center">
                    <div className="relative w-full flex justify-content-center align-items-center">
                        <img
                            src={buttonImage}
                            alt="roll button"
                            className="wow-button"
                            onClick={() => {
                                Randomizer(GetViableAreas(areas))
                            }}
                        />
                        <a className="wow-button-text absolute pt-2  flex
                                      justify-content-center align-items-center "

                        >
                            Roll!
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
