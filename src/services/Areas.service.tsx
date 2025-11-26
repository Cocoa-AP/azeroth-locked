import type {Area, Neighbor} from "../components/map/area.models.tsx";
import type {NeighborLink} from "../data/Areas.const.ts";

export function GetViableAreas(areas: Area[]): Area[] {
    // get unlocked areas
    const unlockedAreas = areas.filter(area => !area.locked);

    // Create a Set to track processed neighbor IDs
    const processedIds = new Set<string>();
    const viableAreas: Area[] = [];

    // Process each unlocked area
    for (const area of unlockedAreas) {
        const neighbors = area.neighbors ?? [];

        for (const neighbor of neighbors) {
            // Skip if we've already processed this ID
            if (processedIds.has(neighbor.id)) continue;

            processedIds.add(neighbor.id);

            // Find the neighboring area
            const neighborArea = areas.find(a => a.id === neighbor.id);
            if (neighborArea?.locked) {
                viableAreas.push(neighborArea);
            }
        }
    }

    return viableAreas;
}

export function ClearPotentialSelect() {
    document.querySelectorAll('.potential-select').forEach(element => {
        element.classList.remove('potential-select');
    });
}

export function HighlightArea(areaId: string) {
    ClearPotentialSelect();
    document.querySelector(`polygon[data-id="${areaId}"]`)?.classList.add('potential-select');
}

export function SelectArea(areaId: string) {
    ClearPotentialSelect();
    document.querySelector(`polygon[data-id="${areaId}"]`)?.classList.add('selected-area');
}

export function UnlockArea(areaId: string) {
    document.querySelector(`polygon[data-id="${areaId}"]`)?.classList.remove('selected-area');
    document.querySelector(`polygon[data-id="${areaId}"]`)?.classList.remove('potential-select');
}

export function hydrateNeighbors(
    areas: Area[],
    links: Record<Area['id'], NeighborLink[]>
): Area[] {
    const byId = new Map(areas.map(a => [a.id, a]));

    return areas.map(area => {
        const linkList = links[area.id] ?? [];

        const neighborObjs: Neighbor[] = linkList.map(link => {
            const target = byId.get(link.id);
            if (!target) {
                throw new Error(`Neighbor id ${link.id} not found for area ${area.id}`);
            }
            return {
                id: link.id,
                location: target.location,
                method: link.method
            };
        });

        return {
            ...area,
            neighborsss: neighborObjs.map(n => n.location),
            neighborIds: neighborObjs.map(n => n.id)
        };
    });
}
