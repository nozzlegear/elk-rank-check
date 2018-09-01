import * as React from "react";
import { Results } from "app";
import { mapRank } from "../utils";

export interface Props extends React.Props<any>, Results {}

export function Results({ desiredRank, notFound, notAtDesiredRank, atRank }: Props): JSX.Element {
    return (
        <div id="results">
            <h3>{`Results for characters at rank ${mapRank(desiredRank).name}`}</h3>
            <div className="row">
                <div className="col-md-4">
                    <div className="alert alert-success">{`These characters are at the rank.`}</div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>{"Character Name"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {atRank.map(c => (
                                <tr key={c.name}>
                                    <td>{c.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <div className="alert alert-warning">{`These characters are not at the rank.`}</div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>{"Character Name"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notAtDesiredRank.map(c => (
                                <tr key={c.name}>
                                    <td>{`${c.name} (Probably ${c.rank.name})`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <div className="alert alert-danger">{`These characters were not found.`}</div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>{"Character Name"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notFound.map(c => (
                                <tr key={c}>
                                    <td>{c}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
