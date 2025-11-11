import type {Area} from "../map/area.models.tsx";

/**
 * stringToSeed - converts a string to a seed for a random number generator
 *
 * * *src*: https://stackoverflow.com/a/7616484/1235282
 * @param str - string to convert to seed
 */
function stringToSeed(str: string): number {
    let hash = 0;

    // iterating through all characters in the string
    for (let i = 0; i < str.length; i++) {
        // get character code
        const char = str.charCodeAt(i);
        // shift each character by 5 bits, add to hash
        hash = ((hash << 5) - hash) + char;
        // Convert to 32-bit integer
        hash = hash & hash;
    }

    // return the absolute value of the hash
    return Math.abs(hash);
}

/**
 * mulberry32 - a random number generator
 *
 * * *src*: https://stackoverflow.com/a/52171480/1235282
 * @param seed
 */
function mulberry32(seed: number): () => number {
    return () => {
        // <NAME>' 32 bit integer hash function
        seed = seed + 0x6D2B79F5;
        var t = seed;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

interface AnimationSettings {
    duration: number;
    initialRate: number;
    finalRate: number;
}

function clearPotentialSelect() {
    document.querySelectorAll('.potential-select').forEach(element => {
        element.classList.remove('potential-select');
    });
}

function highlightArea(areaId: string) {
    clearPotentialSelect();
    document.querySelector(`polygon[data-id="${areaId}"]`)?.classList.add('potential-select');
}

function selectArea(areaId: string) {
    clearPotentialSelect();
    document.querySelector(`polygon[data-id="${areaId}"]`)?.classList.add('selected-area');
}

/**
 * Randomizer - returns a random area from an array of viable areas
 *
 * @param viableAreas - array of viable areas
 * @param seed - Optional seed to use for random number generator
 * @constructor
 */
export function Randomizer(viableAreas: Area[], seed?: string): Promise<Area> {
    return new Promise((resolve) => {
        const settings: AnimationSettings = {
            duration: 10_000,   // 10 seconds total
            initialRate: 10,     // 7 selections / second
            finalRate: 1        // 1 selection / second
        };

        // --- seeded RNG for final choice ---
        const epochTime = Date.now();
        const combinedSeed = seed ? `${seed}_${epochTime}` : epochTime.toString();
        const numericSeed = stringToSeed(combinedSeed);
        const random = mulberry32(numericSeed);
        const finalIndex = Math.floor(random() * viableAreas.length);

        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / settings.duration);

            if (progress < 1) {
                // linearly reduce *rate* from 7 → 1 selections/sec
                const currentRate =
                    settings.initialRate +
                    (settings.finalRate - settings.initialRate) * progress;

                // convert rate to delay in ms
                const delay = 1000 / currentRate;

                const randomIndex = Math.floor(Math.random() * viableAreas.length);
                highlightArea(viableAreas[randomIndex].id);

                setTimeout(animate, delay);
            } else {
                // final selection
                selectArea(viableAreas[finalIndex].id);
                resolve(viableAreas[finalIndex]);
            }
        };

        animate();
    });
}
