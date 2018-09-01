import * as React from "react";
import { Option } from "@nozzlegear/railway";
import { Rank, Results } from "app";
import { HeaderImage } from "./header_image";
import { Results as ResultsComponent } from "./results";
import { RankMessage } from "./rank_message";

interface Props extends React.Props<any> {
    ranks: Rank[];
    desiredRank: Option<number>;
    characterList: Option<string | string[]>;
    error: Option<string>;
    results: Option<Results>;
}

export function HomePage({ desiredRank, characterList, error, ranks, results }: Props): JSX.Element {
    const characters: string = characterList
        .map(list => (Array.isArray(list) ? list.join(", ") : list))
        .defaultValue("");

    return (
        <div id="home" className="page container">
            <HeaderImage />
            {results.map(r => <ResultsComponent {...r} />).defaultValue(<></>)}
            <h3>{"Rank Checker"}</h3>
            <p>
                {
                    "This tool will take a list of character names and compare it to the list of guild members to determine which members are not at the desired rank. "
                }
                {
                    "Please note that the character name must match the in-game name exactly, including accents and other special characters."
                }
            </p>
            <RankMessage />
            <hr />
            <form method="POST" action="/check">
                <div className="form-group">
                    <label htmlFor="desiredRank">{"Which rank should these members be?"}</label>
                    <select
                        name="desiredRank"
                        className="form-control"
                        defaultValue={desiredRank.defaultValue(0).toString()}>
                        {ranks.map(rank => (
                            <option key={rank.id.toString()} value={rank.id.toString()}>
                                {`Rank ${rank.id} (Probably named ${rank.name})`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="characterList">
                        {"Which members should be checked?"}
                        <small className="pull-right">{"(Separate by comma or new line.)"}</small>
                    </label>
                    <textarea name="characterList" className="form-control" defaultValue={characters} rows={10} />
                </div>
                {error.map(e => <p className="error red">{"Error: " + e}</p>).defaultValue(<></>)}
                <button type="submit" className="btn btn-primary btn-large">
                    {"Check Character Ranks"}
                </button>
            </form>
        </div>
    );
}
