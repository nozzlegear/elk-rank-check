import * as React from "react";

export function RankMessage({  }: React.Props<any>) {
    return (
        <p>
            {
                "Blizzard does not give apps access to guild rank names, so ranks are represented as an ascending number where 0 is the highest rank. The last known name for those ranks has been attached."
            }
        </p>
    );
}
