import type {Area} from "../components/map/area.models.tsx";


export function GetViableAreas(areas: Area[]): Area[] {
    // get unlocked areas
    const unlockedAreas = areas.filter(area => !area.locked);

    // Create a Set to track processed neighbor IDs
    const processedIds = new Set<string>();
    const viableAreas: Area[] = [];

    // Process each unlocked area
    for (const area of unlockedAreas) {
        const neighborIds = area.neighborIds ?? [];

        for (const neighborId of neighborIds) {
            // Skip if we've already processed this ID
            if (processedIds.has(neighborId)) continue;
            processedIds.add(neighborId);

            // Find the neighboring area
            const neighborArea = areas.find(a => a.id === neighborId);
            if (neighborArea?.locked) {
                viableAreas.push(neighborArea);
            }
        }
    }

    return viableAreas;
}
