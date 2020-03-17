import {MongoClient} from "@oflynned/mongoize-orm";
import {buildServer} from './server';
import serverConfig from "../config/server.config";

(async () => {
    const config = {
        host: "localhost",
        port: 27017,
        database: "test"
    };
    const client = await new MongoClient().connect(config);

    const server = buildServer(client);
    const port = server.get('port') || serverConfig.serverPort;
    server.listen(port, () => {
        console.log(`The server is running and listening on http://localhost:${port}`);
    });
})();
