export interface Emblem {
    icon: number;
    iconColor: string;
    iconColorId: number;
    border: number;
    borderColor: string;
    borderColorId: number;
    backgroundColor: string;
    backgroundColorId: number;
}

export interface Spec {
    name: string;
    role: string;
    backgroundImage: string;
    icon: string;
    description: string;
    order: number;
}

export interface Character {
    name: string;
    realm: string;
    battlegroup: string;
    class: number;
    race: number;
    gender: number;
    level: number;
    achievementPoints: number;
    thumbnail: string;
    guild: string;
    guildRealm: string;
    lastModified: number;
    spec?: Spec;
}

export interface Member {
    rank: number;
    character: Character;
}

export interface Guild {
    lastModified: number;
    name: string;
    realm: string;
    battlegroup: string;
    level: number;
    side: number;
    achievementPoints: number;
    members: Member[];
    emblem: Emblem;
}
