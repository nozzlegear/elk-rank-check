import * as path from "path";
import * as fs from "fs";
import { Option, compute, Result } from "@nozzlegear/railway";
import { RANKS } from "./constants";
import { Rank, ParsedRequestData, RequestData, Results, RankedCharacter } from "app";
import { Member } from "bnet";

/**
 * Attempts to find the public assets folder relative to the @param srcDirectory
 */
export function findPublicDir(srcDirectory: string) {
    return ["./public", "../public", "../../public"].reduce<Option<string>>((state, potentialPath) => {
        if (state.isSome()) {
            return state;
        }

        const joined = path.join(srcDirectory, potentialPath);

        if (fs.existsSync(joined)) {
            return Option.ofSome(joined);
        }

        return Option.ofNone();
    }, Option.ofNone());
}

/**
 * Maps a rankId to the hardcoded list of ranks. The Blizzard guild API does not return rank names, so this list is hardcoded and may return incorrect results if ranks are changed.
 */
export function mapRank(rankId: number): Rank {
    const found = RANKS.find(r => r.id === rankId);

    return found || { id: rankId, name: `Rank ${rankId}` };
}

/**
 * Takes a string and splits it on each new line or comma into an array, trimming each entry.
 */
export function splitOnNewLines(str: string): string[] {
    return str
        .split(/(?:\r\n|\n|\r|,)+/)
        .map(s => s && s.trim())
        .filter(s => !!s);
}

/**
 * Parses and validates request data, ensuring desiredRank is a number between 0 and 10, and characterList contains between 1 and 100 members.
 */
export function parseRequestData(data: RequestData): Result<ParsedRequestData> {
    return compute<Result<ParsedRequestData>>(() => {
        const desiredRank = typeof data.desiredRank !== "number" ? parseInt(data.desiredRank) : data.desiredRank;

        if (isNaN(desiredRank) || typeof desiredRank !== "number") {
            return Result.ofError(new Error("desiredRank must be a number."));
        }

        if (desiredRank > 10 || desiredRank < 0) {
            return Result.ofError(new Error(`${mapRank(desiredRank)} is invalid: it must be between 0 and 10.`));
        }

        const parsedCharacters = splitOnNewLines(typeof data.characterList === "string" ? data.characterList : "");

        if (parsedCharacters.length === 0) {
            return Result.ofError(new Error(`you must enter at least one valid character name.`));
        }

        return Result.ofValue<ParsedRequestData>({ characterList: parsedCharacters, desiredRank });
    });
}

/**
 * Maps a list of guild members to an object containing those found at the @param desiredRank, those found but not at the @param desiredRank, and those who are not found in the guild member list at all.
 */
export function mapMembersToResults(desiredRank: number, desiredMembers: string[], members: Member[]): Results {
    const isDesired = (member: Member) =>
        desiredMembers.some(desired => desired.toLowerCase() === member.character.name.toLowerCase());
    const toRankedChar: (member: Member) => RankedCharacter = member => ({
        name: member.character.name,
        rank: mapRank(member.rank)
    });
    const targetMembers = members.filter(isDesired);

    return {
        desiredRank: desiredRank,
        atRank: targetMembers.filter(member => member.rank === desiredRank).map(toRankedChar),
        notAtDesiredRank: targetMembers.filter(member => member.rank !== desiredRank).map(toRankedChar),
        notFound: desiredMembers.filter(
            // Any member in desiredMembers that isn't also in targetMembers
            desired => !targetMembers.some(member => member.character.name.toLowerCase() === desired.toLowerCase())
        )
    };
}
