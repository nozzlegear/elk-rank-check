import * as React from "react";

export function HtmlLayout({ children }: React.Props<any>) {
    const defaultFont =
        "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'";

    return (
        <html lang="en">
            <head>
                <title>{`The Drunken Elk - Rank Checker`}</title>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="noindex, nofollow" />
                <meta
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                    name="viewport"
                />
                {/* Favicons */}
                <link rel="shortcut icon" href="/public/images/favicons/favicon.ico?v=3" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/public/images/favicons/apple-touch-icon.png?v=3" />
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="/public/images/favicons/apple-touch-icon-57x57.png?v=3"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="/public/images/favicons/apple-touch-icon-72x72.png?v=3"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="/public/images/favicons/apple-touch-icon-76x76.png?v=3"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="/public/images/favicons/apple-touch-icon-114x114.png?v=3"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="/public/images/favicons/apple-touch-icon-120x120.png?v=3"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="/public/images/favicons/apple-touch-icon-144x144.png?v=3"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/public/images/favicons/apple-touch-icon-152x152.png?v=3"
                />

                {/* Bootstrap */}
                <link
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                    rel="stylesheet"
                    media="all"
                />

                {/* Site CSS */}
                <link href="/public/css/theme.css" rel="stylesheet" />
            </head>

            <body>
                <noscript>
                    <h1>
                        WARNING: This site requires JavaScript. Please visit
                        <a href="http://www.enable-javascript.com/">this guide</a> to learn how to enable JavaScript on
                        your machine, then reload this page.
                    </h1>
                </noscript>
                <div id="contenthost">{children}</div>
                {/* <div style={{ display: "none" }}>
                    <script async src="/public/js/client.js" />
                </div> */}
                <footer>
                    <div className="container">
                        {"Source code available at "}
                        <a href="https://github.com/nozzlegear/elk-rank-check">
                            {"https://github.com/nozzlegear/elk-rank-check"}
                        </a>
                    </div>
                </footer>
            </body>
        </html>
    );
}
