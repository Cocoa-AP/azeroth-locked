import {type Area, Areas} from "../components/map/area.models.tsx";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const BASE = ALPHABET.length; // 62

export function encodeLockedState(areas: Area[]) {

    const bits = areas.map(a => (a.locked ? '1' : '0')).join('');

    const byteCount = Math.ceil(bits.length / 8);
    const bytes = new Uint8Array(byteCount);

    for (let i = 0; i < byteCount; i++) {
        const byte = bits.slice(i * 8, i * 8 + 8);
        bytes[i] = parseInt(byte.padEnd(8, '0'), 2);
    }

    sessionStorage.setItem('areas', btoa(String.fromCharCode(...bytes)));

    return btoa(String.fromCharCode(...bytes));
}

export function newEncodedState(areas: Area[]) {
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

    sessionStorage.setItem('areas', code.padStart(6, 'A'));
}

export function decodeLockedState(code: string): Area[] {
    const binaryStr = atob(code)
        .split('')
        .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('');

    return Areas.map((area, i) => ({
        id: area.id,
        locked: binaryStr[i] === '1',
        location: area.location,
        dataValue: area.dataValue,
        coords: area.coords,
        highlight: area.highlight,
    }));
}

export function newDecodeLockedState(code: string): Area[] {
    // 1️⃣ Convert base-62 → number
    let num = BigInt(0);
    for (const char of code) {
        const value = BigInt(ALPHABET.indexOf(char));
        num = num * BigInt(BASE) + value;
    }

    // 2️⃣ Convert number → binary string
    let bits = num.toString(2).padStart(Areas.length, '0');

    // 3️⃣ Map back to areas
    return Areas.map((area, i) => ({
        id: area.id,
        locked: bits[i] === '1',
        location: area.location,
        dataValue: area.dataValue,
        coords: area.coords,
        highlight: area.highlight,
    }));
}
