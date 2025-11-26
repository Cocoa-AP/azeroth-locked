import {type Area, EasternKingdomAreas} from "../components/map/area.models.tsx";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const BASE = ALPHABET.length; // 62

export function newEncodedState(areas: Area[]):string {
    // 1️⃣ Build a binary string (1 = locked, 0 = unlocked)
    const bits = areas.map(a => (a.locked ? '1' : '0')).join('');

    // 2️⃣ Convert to a number
    const num = BigInt('0b' + bits);

    // 3️⃣ Convert number → base-62 string
    let code = '';
    let n = num;
    while (n > 0) {
        const remainder = Number(n % BigInt(BASE));
        code = ALPHABET[remainder] + code;
        n = n / BigInt(BASE);
    }

    const sessionCode = code.padStart(6, 'A');

    sessionStorage.setItem('areas', sessionCode);

    return sessionCode;
}

export function newDecodeLockedState(_areas:Area[], code: string): Area[] {
    // 1️⃣ Convert base-62 → number
    let num = BigInt(0);
    for (const char of code) {
        const value = BigInt(ALPHABET.indexOf(char));
        num = num * BigInt(BASE) + value;
    }

    // 2️⃣ Convert number → binary string
    let bits = num.toString(2).padStart(_areas.length, '0');

    // 3️⃣ Map back to areas
    const areas= _areas.map((area, i) => ({
        id: area.id,
        locked: bits[i] === '1',
        location: area.location,
        coords: area.coords,
        neighborIds: area.neighborIds,
        neighbors: area.neighborsss,
    }));

    return areas;
}
