import './App.css'
import Map from './components/map/Map'
import backgroundImage from '/background.png'
import SettingsIcon from '@mui/icons-material/Settings';
import {SvgIcon} from "@mui/material";
import { newDecodeLockedState} from "./services/Encoder.tsx";
import {areaState} from "./states/AreaState.tsx";
import { useAtom } from 'jotai';
import {useEffect} from "react";

function App() {

    //TODO: configure areas based on stored data or config key

    const [areas, setAreas] = useAtom(areaState)
    const areasCode = sessionStorage.getItem('areas')

    useEffect(() => {
        if (areasCode) {
            setAreas(newDecodeLockedState(areasCode));
            console.log(areas);
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
                    <a className="anus wow-text">Region Locked</a>
                </div>
                <SvgIcon component={SettingsIcon} inheritViewBox className="absolute right-0 top-0 m-4" onClick={() => {}} />
                <Map/>
            </div>
        </>
    )
}

export default App
