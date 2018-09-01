import * as React from "react";

export function RankMessage({  }: React.Props<any>) {
    return (
        <p>
            {
                "Blizzard does not give apps access to guild rank names, so ranks are represented as an ascending number where 0 is the highest rank."
            }
            {
                "Assuming no changes, ranks are: 0 (King Mom); 1 (GM); 2 (Officer); 3 (Raid Lead); 4 (Raider); 5 (Veteran); 6 (Member); 7 (AFK); 8 (Initiate)."
            }
        </p>
    );
}
