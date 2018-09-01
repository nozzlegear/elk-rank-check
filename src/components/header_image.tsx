import * as React from "react";

export function HeaderImage({  }: React.Props<any>): JSX.Element {
    return (
        <a href="/">
            <img
                src="https://cdn.discordapp.com/attachments/383095475517259777/460850057575661588/4secondelk.png"
                alt="The Drunken Elk!"
                className="img-responsive"
            />
        </a>
    );
}
