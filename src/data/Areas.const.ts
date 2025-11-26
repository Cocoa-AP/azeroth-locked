import {EasternKingdomAreas} from "../components/map/area.models.tsx";
export type AreaId<T extends readonly { id: string }[]> = T[number]["id"];

export type EKId = AreaId<typeof EasternKingdomAreas>;

export const TravelMethod = {
    Walk: 'Walk',
    Road: 'Road',
    Swim: 'Swim',
    DarkPortal: 'DarkPortal',
    Tram: 'Tram',
    Portal: 'Portal',
    Boat: 'Boat',
    Shortcut: 'Shortcut'
} as const;

export type TravelMethod = typeof TravelMethod[keyof typeof TravelMethod];

export interface NeighborLink<Id extends string = string> {
    id: Id;
    method: TravelMethod;
}

/**
 * Symmetric adjacency for Eastern Kingdoms.
 * Most links are Road; a few are Boat / Portal / Shortcut.
 */
export const EasternKingdomNeighborLinks:  Record<EKId, NeighborLink<EKId>[]>= {
    ek0: [ // Blasted Lands
        { id: "ek7", method: TravelMethod.Road },      // Swamp of Sorrows
        { id: "ol1", method: TravelMethod.DarkPortal}
    ],
    ek1: [ // Deadwind Pass
        { id: "ek7", method: TravelMethod.Road },      // Swamp of Sorrows
        { id: "ek2", method: TravelMethod.Road },      // Duskwood
    ],
    ek2: [ // Duskwood
        { id: "ek6", method: TravelMethod.Road },      // North Stranglethorn
        { id: "ek6", method: TravelMethod.Road },      // Westfall
        { id: "ek1", method: TravelMethod.Road },      // Deadwind Pass
        { id: "ek4", method: TravelMethod.Road },      // Redridge Mountains
    ],
    ek3: [ // Elwynn Forest
        { id: "ek6", method: TravelMethod.Road },      // Westfall
        { id: "ek10", method: TravelMethod.Tram },     // Dun Morogh via tram
        { id: "ek4", method: TravelMethod.Road }       // Redridge Mountains
    ],
    ek4: [ // Redridge Mountains
        { id: "ek3", method: TravelMethod.Road },      // Elwynn Forest
        { id: "ek2", method: TravelMethod.Road },      // Duskwood
        { id: "ek7", method: TravelMethod.Road },      // Swamp of Sorrows
        { id: "ek9", method: TravelMethod.Road }      // Burning Steppes
    ],
    ek5: [ // Stranglethorn
        { id: "ek5", method: TravelMethod.Road },      // Stranglethorn
        { id: "ek2", method: TravelMethod.Road }       // Duskwood
    ],
    ek6: [ // Westfall
        { id: "ek3", method: TravelMethod.Road },      // Elwynn Forest
        { id: "ek2", method: TravelMethod.Road },      // Duskwood
        { id: "ek27", method: TravelMethod.Boat }      // Vashj'ir
    ],
    ek7: [ // Swamp of Sorrows
        { id: "ek0", method: TravelMethod.Road },      // Blasted Lands
        { id: "ek1", method: TravelMethod.Road },      // Deadwind Pass
        { id: "ek4", method: TravelMethod.Road }       // Redridge Mountains
    ],
    ek8: [ // Badlands
        { id: "ek11", method: TravelMethod.Road },     // Loch Modan
        { id: "ek12", method: TravelMethod.Road },     // Searing Gorge
        { id: "ek9", method: TravelMethod.Road }      // Burning Steppes
    ],
    ek9: [ // Burning Steppes
        { id: "ek4", method: TravelMethod.Road },      // Redridge Mountains
        { id: "ek12", method: TravelMethod.Road },     // Searing Gorge
        { id: "ek8", method: TravelMethod.Road }       // Badlands
    ],
    ek10: [ // Dun Morogh
        { id: "ek11", method: TravelMethod.Road },     // Loch Modan
        { id: "ek15", method: TravelMethod.Road },     // Wetlands (tunnel)
        { id: "ek27", method: TravelMethod.Boat }      // Vashj'ir
    ],
    ek11: [ // Loch Modan
        { id: "ek10", method: TravelMethod.Road },     // Dun Morogh
        { id: "ek15", method: TravelMethod.Road },     // Wetlands
        { id: "ek8", method: TravelMethod.Road }       // Badlands
    ],
    ek12: [ // Searing Gorge
        { id: "ek9", method: TravelMethod.Road },     // Burning Steppes
        { id: "ek8", method: TravelMethod.Road }       // Badlands
    ],
    ek13: [ // Tol Barad (island)
        { id: "ek15", method: TravelMethod.Boat }      // Wetlands (or wherever you want to anchor it)
    ],
    ek14: [ // Twilight Highlands
        { id: "ek15", method: TravelMethod.Road },     // Wetlands
        { id: "ek17", method: TravelMethod.Road }      // Arathi Highlands
    ],
    ek15: [ // Wetlands
        { id: "ek11", method: TravelMethod.Road },     // Loch Modan
        { id: "ek10", method: TravelMethod.Road },     // Dun Morogh
        { id: "ek17", method: TravelMethod.Road },     // Arathi Highlands
        { id: "ek14", method: TravelMethod.Road },     // Twilight Highlands
        { id: "ek13", method: TravelMethod.Boat }      // Tol Barad
    ],
    ek16: [ // Arathi Highlands
        { id: "ek15", method: TravelMethod.Road },     // Wetlands
        { id: "ek18", method: TravelMethod.Road },     // Hillsbrad Foothills
        { id: "ek20", method: TravelMethod.Road },     // The Hinterlands
        { id: "ek14", method: TravelMethod.Road }      // Twilight Highlands
    ],
    ek17: [ // Eastern Plaguelands
        { id: "ek23", method: TravelMethod.Road },     // Western Plaguelands
        { id: "ek25", method: TravelMethod.Road }      // Ghostlands
    ],
    ek18: [ // Hillsbrad Foothills
        { id: "ek16", method: TravelMethod.Road },     // Arathi Highlands
        { id: "ek21", method: TravelMethod.Road }      // Silverpine Forest
    ],
    ek19: [ // Ruins of Gilneas
        { id: "ek21", method: TravelMethod.Road }      // Silverpine Forest
    ],
    ek20: [ // The Hinterlands
        { id: "ek16", method: TravelMethod.Road },     // Arathi Highlands
        { id: "ek23", method: TravelMethod.Road }      // Western Plaguelands
    ],
    ek21: [ // Silverpine Forest
        { id: "ek22", method: TravelMethod.Road },     // Tirisfal Glades
        { id: "ek18", method: TravelMethod.Road },     // Hillsbrad Foothills
        { id: "ek19", method: TravelMethod.Road }      // Ruins of Gilneas
    ],
    ek22: [ // Tirisfal Glades
        { id: "ek21", method: TravelMethod.Road },     // Silverpine Forest
        { id: "ek23", method: TravelMethod.Road }      // Western Plaguelands
    ],
    ek23: [ // Western Plaguelands
        { id: "ek22", method: TravelMethod.Road },     // Tirisfal Glades
        { id: "ek20", method: TravelMethod.Road },     // The Hinterlands
        { id: "ek17", method: TravelMethod.Road }      // Eastern Plaguelands
    ],
    ek24: [ // Eversong Woods
        { id: "ek25", method: TravelMethod.Road },     // Ghostlands
        { id: "ek26", method: TravelMethod.Portal }    // Isle of Quel'Danas
    ],
    ek25: [ // Ghostlands
        { id: "ek24", method: TravelMethod.Road },     // Eversong Woods
        { id: "ek17", method: TravelMethod.Road }      // Eastern Plaguelands
    ],
    ek26: [ // Isle of Quel'Danas
        { id: "ek24", method: TravelMethod.Portal }    // Eversong Woods
    ],
    ek27: [ // Vashj'ir
        { id: "ek6",  method: TravelMethod.Boat },     // Westfall
        { id: "ek10", method: TravelMethod.Boat }      // Dun Morogh
    ]
};
