import { atom } from 'jotai';
import {type Area, EasternKingdomAreas} from "../components/map/area.models.tsx";
import {GetViableAreas} from "../services/Areas.service.tsx";

export const ButtonState = {
    Roll: 'Roll',
    Rolling: 'Rolling',
    Unlock: 'Unlock'
}

export type ButtonState = typeof ButtonState[keyof typeof ButtonState];

export function HighlightNeighbors(areas: Area[]) {
    const viableNeighbors = GetViableAreas(areas);

    viableNeighbors.forEach(area => {
        document.querySelector(`polygon[data-id="${area.id}"]`)?.classList.add('viable-neighbor');
    })
}

export const $buttonState = atom(ButtonState.Roll);

export const $unlockedArea = atom<Area | undefined>(undefined);

export const $areaState = atom(EasternKingdomAreas);
export const $areaCodeState = atom("");
export const $unlockableNeighborsState = atom([]);
