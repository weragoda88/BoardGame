"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const uuid_1 = __importDefault(require("uuid"));
const http = __importStar(require("http"));
const path_1 = __importDefault(require("path"));
const sessionAuth = __importStar(require("./middleware/sessionAuth"));
const routes = __importStar(require("./routes"));
const boardSocket_1 = require("./websockets/boardSocket");
// initialize configuration
dotenv_1.default.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
const allowGuests = true;
const port = process.env.SERVER_PORT;
const app = express_1.default();
//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = express_session_1.default({
    resave: false,
    saveUninitialized: false,
    secret: "$eCuRiTy"
});
// Configure Express to use static files
app.use(express_1.default.static(path_1.default.join(__dirname, "client"), {
    etag: false
}));
app.use(sessionParser);
const server = http.createServer(app);
const webSocketServer = new boardSocket_1.BoardWebSocket({ clientTracking: true, noServer: true });
app.post("/login", (req, res) => {
    console.log("login");
    //
    // "Log in" user and set userId to session.
    //
    const id = uuid_1.default.v4();
    console.log(`Updating session for user ${id}`);
    req.session.userId = id;
    res.send({ result: "OK", message: "Session updated" });
});
app.delete("/logout", (request, response) => {
    console.log("Destroying session");
    request.session.destroy(() => {
        webSocketServer.removeUser(request.session.userId);
        response.send({ result: "OK", message: "Session destroyed" });
    });
});
server.on("upgrade", (request, socket, head) => {
    console.log("Parsing session from request...");
    request.res = {};
    sessionParser(request, request.res, () => {
        if (!allowGuests && !request.session.userId) {
            socket.destroy();
            return;
        }
        console.log("Session is parsed!");
        webSocketServer.handleUpgrade(request, socket, head, (ws) => {
            webSocketServer.emit("connection", ws, request);
        });
    });
});
// Configure Express to use EJS
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
// Configure session auth
sessionAuth.register(app);
// Configure routes
routes.register(app);
webSocketServer.start();
// start the express server
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map