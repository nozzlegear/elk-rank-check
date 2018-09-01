import * as got from "got";
import { BLIZZARD_API_KEY } from "./constants";
import { Guild, Member } from "bnet";

export async function getGuildMembers(realm: "Zul'jin", guild: "The Drunken Elk"): Promise<Member[]> {
    const guildParam = encodeURIComponent(guild);
    const realmParam = encodeURIComponent(realm);
    const result = await got.get(
        `https://us.api.battle.net/wow/guild/${realmParam}/${guildParam}?fields=members&locale=en_US&apikey=${BLIZZARD_API_KEY}`
    );

    if (result.statusCode !== 200) {
        throw new Error(`Blizzard API returned ${result.statusCode} ${result.statusMessage} result.`);
    }

    const guildData: Guild = JSON.parse(result.body);

    return guildData.members;
}
