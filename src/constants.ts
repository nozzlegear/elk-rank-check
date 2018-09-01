import { Option } from "@nozzlegear/railway";
import { Rank } from "app";

export function env(key: string): Option<string> {
    const value = process.env[key];

    return typeof value !== "string" || !value ? Option.ofNone() : Option.ofSome(value);
}

export function envDefault(key: string, defaultValue: string): string {
    return env(key).defaultValue(defaultValue);
}

export function envRequired(key: string): string {
    const value = env(key);

    if (value.isNone()) {
        throw new Error(`Environment variable "${key}" was null or undefined.`);
    }

    return value.get();
}

export const BLIZZARD_API_KEY = envRequired("BLIZZARD_API_KEY");

export const RANKS: Rank[] = [
    {
        id: 0,
        name: "King Mom"
    },
    {
        id: 1,
        name: "GM"
    },
    {
        id: 2,
        name: "Officer"
    },
    {
        id: 3,
        name: "Raid Lead"
    },
    {
        id: 4,
        name: "Raider"
    },
    {
        id: 5,
        name: "Veteran"
    },
    {
        id: 6,
        name: "Member"
    },
    {
        id: 7,
        name: "AFK"
    },
    {
        id: 8,
        name: "Initiate"
    }
];
