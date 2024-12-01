import 'dotenv/config';
import { Server } from 'aedes-server-factory';
import net from 'net';
import broker from './broker';
import { logger } from './config/logger';

const port = process.env.PORT || 1883;
const server: Server = net.createServer(broker.handle);

server.listen(port, () => {
    logger.info(`MQTT broker is running on port ${port}`);
});
