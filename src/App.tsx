import './App.scss'
import Map from './components/map/Map'
import backgroundImage from '/background.png'
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshIcon from '@mui/icons-material/Refresh';
import {SvgIcon} from "@mui/material";
import {newDecodeLockedState} from "./services/Encoder.tsx";
import {
    $areaCodeState,
    $areaState,
    $buttonState,
    $unlockedArea,
    ButtonState,
    HighlightNeighbors
} from "./states/AreaState.tsx";
import {useAtom} from 'jotai';
import {useEffect} from "react";
import {EasternKingdomAreas} from "./components/map/area.models.tsx";
import buttonImage from '/button-wide.png'
import {Randomizer} from "./components/randomizer/Randomizer.tsx";
import {UnlockArea, GetViableAreas, SelectArea} from "./services/Areas.service.tsx";

function clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
}

function App() {

    //TODO: configure areas based on stored data or config key

    const [buttonState, setButtonState] = useAtom($buttonState);

    const [unlockedArea, setUnlockedArea] = useAtom($unlockedArea);
    const [areas, setAreas] = useAtom($areaState);
    const [_, setAreaCode] = useAtom($areaCodeState);

    useEffect(() => {
        const areasCode = sessionStorage.getItem('areas');
        if (areasCode) {
            setAreas(newDecodeLockedState(EasternKingdomAreas, areasCode));
            setAreaCode(areasCode);
            HighlightNeighbors(areas);
        }
    });

    function RollClicked() {
        if (buttonState === ButtonState.Roll) {
            setButtonState(ButtonState.Rolling);
            Randomizer(GetViableAreas(areas), '1231231231232').then(area => {

                // End on final seeded index
                SelectArea(area.id);
                setUnlockedArea(area);
                setButtonState('Unlock');
            })
        } else if (buttonState === ButtonState.Unlock) {
            let areaId = '';
            setAreas(areas.map(area => {
                if (area.id === unlockedArea?.id) {
                    areaId = area.id
                    area.locked = false;
                }
                return area;
            }))
            HighlightNeighbors(areas);
            UnlockArea(areaId);
            setButtonState(ButtonState.Roll);
        }

    }

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
                             clearStorage();
                             // TODO: get serialized areas from storage, else do static areas
                             setAreas(EasternKingdomAreas);
                             setAreaCode('');
                         }
                         }/>
                <Map/>
                <div className="absolute bottom-1rem w-full flex justify-content-center align-items-center">
                    <div className="relative w-full flex justify-content-center align-items-center">
                        <img
                            src={buttonImage}
                            alt="roll button"
                            className={buttonState === ButtonState.Rolling ? "wow-button-waiting" : "wow-button"}
                            onClick={buttonState === ButtonState.Rolling ? undefined : () => RollClicked()}

                        />
                        <a className="wow-button-text absolute pt-2  flex
                                      justify-content-center align-items-center ">
                            {buttonState}!
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
