import { atom } from 'jotai';
import {type Area, Areas} from "../components/map/area.models.tsx";
import {GetViableAreas} from "../services/Areas.service.tsx";

export function HighlightNeighbors(areas: Area[]) {
    const viableNeighbors = GetViableAreas(areas);

    viableNeighbors.forEach(area => {
        document.querySelector(`polygon[data-id="${area.id}"]`)?.classList.add('viable-neighbor');
    })
}

export const areaState = atom(Areas);
export const areaCodeState = atom("");
export const unlockableNeighborsState = atom([]);
