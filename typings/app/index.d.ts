export interface Rank {
    name: string;
    id: number;
}

export interface RankedCharacter {
    name: string;
    rank: Rank;
}

export interface RequestData {
    characterList: string;
    desiredRank: number | string;
}

export interface ParsedRequestData {
    desiredRank: number;
    characterList: string[];
}

export interface Results {
    desiredRank: number;
    notFound: string[];
    notAtDesiredRank: RankedCharacter[];
    atRank: RankedCharacter[];
}
