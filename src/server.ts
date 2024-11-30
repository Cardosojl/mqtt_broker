import 'dotenv/config';
import { Server } from 'aedes-server-factory';
import net from 'net';
import broker from './broker';

const port = process.env.PORT || 1883;
const server: Server = net.createServer(broker.handle);

server.listen(port, () => {
    console.log(`MQTT broker is running on port ${port}`);
});
