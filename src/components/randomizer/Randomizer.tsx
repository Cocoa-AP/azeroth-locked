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

/**
 * Randomizer - returns a random area from an array of viable areas
 *
 * @param viableAreas - array of viable areas
 * @param seed - Optional seed to use for random number generator
 * @constructor
 */
export function Randomizer(viableAreas: Area[], seed?: string ): Area {
    // get epoch time
    const epochTime = Date.now();
    // if seed is provided, combine it with epoch time
    const combinedSeed = seed ? `${seed}_${epochTime}` : epochTime.toString();
    // convert combined seed to numeric seed for random number generator
    const numericSeed = stringToSeed(combinedSeed);
    // generate random number
    const random = mulberry32(numericSeed);
    // get random index from viable areas via a random number generated from seed/epoch time
    const randomIndex = Math.floor(random() * viableAreas.length);

    return viableAreas[randomIndex];
}
