import { AedesPublishPacket, Client, Subscription } from 'aedes';
import { logger } from '../config/logger';

class Events {

    connection(client: Client): void {
        client.on('connected', () => {
            logger.info({ clientId: client.id, msg: `Client: ${client ? client.id : client} connected` });
        });        
    };
      
    disconnect(client: Client): void  {
        logger.info({ clientId: client.id, msg: `Client: ${client ? client.id : client} disconnected` });
    };
    
    publish(packet: AedesPublishPacket, client: Client | null) {
        if (client) {
            logger.info({clientId: client.id, topic: packet.topic, payload: packet.payload.toString(),
                msg: `Message published by ${client.id}: ${packet.topic} - ${packet.payload.toString()}`});
        }
    };
    
    subscribe(subscriptions: Subscription[], client: Client) {
        logger.info({clientId: client.id, 
            msg: `Client: ${client ? client.id : 'UNKNOWN'} subscribed to: ${subscriptions.map(s => s.topic).join(', ')}`});
    };
    
    unsubscribe(subscriptions: String[], client: Client) {
        logger.info({clientId: client.id, 
            msg: `Client: ${client ? client.id : 'UNKNOWN'} subscribed to: ${subscriptions.join(', ')}`});
    };
}

export default new Events();
