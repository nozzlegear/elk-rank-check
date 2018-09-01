import express = require("express");
import helmet = require("helmet");
import bodyParser = require("body-parser");
import { HtmlLayout } from "./components/html_layout";
import { HomePage } from "./components/home_page";
import { renderToString } from "react-dom/server";
import { Option } from "@nozzlegear/railway";
import * as utils from "./utils";
import { RANKS } from "./constants";
import { RequestData } from "app";
import { getGuildMembers } from "./http";

const app = express();

// Tell express to trust any proxy it may be behind
app.enable("trust proxy");

// Add helmet security before any other middleware
app.use(helmet());
// Add body parser middleware
app.use(bodyParser.urlencoded({ parameterLimit: 25, extended: true }));

// Add static file handling for requests to /public folder
app.use(
    "/public",
    express.static(
        utils.findPublicDir(__dirname).defaultWith(() => {
            // If we can't find the public dir, throw an error so evildoers don't get access to a random folder
            throw new Error("Failed to find public directory, refusing to start.");
        })
    )
);

const renderHtml = (child: JSX.Element) => "<!DOCTYPE html>" + renderToString(HtmlLayout({ children: child }));
const renderErrorMessage = (data: RequestData, error: string) =>
    renderHtml(
        HomePage({
            results: Option.ofNone(),
            desiredRank: Option.ofNone(),
            characterList: Option.ofSome(data.characterList),
            error: Option.ofSome(error),
            ranks: RANKS
        })
    );

// Home page
app.get("/", async (req, res) => {
    const home = HomePage({
        results: Option.ofNone(),
        characterList: Option.ofNone(),
        desiredRank: Option.ofNone(),
        error: Option.ofNone(),
        ranks: RANKS
    });

    res.send(renderHtml(home));
});

// Form submits to this route
app.post("/check", async (req, res) => {
    const body = req.body as RequestData;
    const parsed = utils.parseRequestData(body);

    if (parsed.isError()) {
        res.status(422);
        res.send(renderErrorMessage(body, parsed.getError().message));

        return;
    }

    const data = parsed.getValue();

    // Redirect the user to /results with a URL that can be shared
    res.redirect(
        `/results?characterList=${encodeURIComponent(data.characterList.join(","))}&desiredRank=${data.desiredRank}`
    );
});

// Form results are redirected to this page, with the data in the querystring so the page can be shared
app.get("/results", async (req, res) => {
    const qs = req.query as RequestData;
    const parsed = utils.parseRequestData(qs);

    if (parsed.isError()) {
        res.status(422);
        res.send(renderErrorMessage(qs, parsed.getError().message));

        return;
    }

    const data = parsed.getValue();
    const members = await getGuildMembers("Zul'jin", "The Drunken Elk");
    const results = utils.mapMembersToResults(data.desiredRank, data.characterList, members);

    res.send(
        renderHtml(
            HomePage({
                characterList: Option.ofSome(data.characterList),
                desiredRank: Option.ofSome(data.desiredRank),
                error: Option.ofNone(),
                ranks: RANKS,
                results: Option.ofSome(results)
            })
        )
    );
});

// Any other paths should return a 404, regardless of method used
app.use("*", (req, res) => {
    if (res.finished) {
        return;
    }

    res.status(404);
    res.json({
        ok: false,
        statusCode: 404,
        message: `No resource found at ${req.originalUrl}`
    });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500);
    res.json({
        ok: false,
        statusCode: 500,
        message: "An internal server error has occurred."
    });

    console.error("Server middleware caught error", { error: err });

    return next();
});

app.listen(3000, "0.0.0.0", () => console.log("App listening on 0.0.0.0:3000"));
