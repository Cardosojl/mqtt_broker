import { AedesPublishPacket, Client, Subscription } from 'aedes';

class Events {

    connection(client: Client): void {
        client.on('connected', () => {
            console.log(`Client connected: ${client ? client.id : client}`);
        });        
    };
      
    disconnect(client: Client): void  {
        console.log(`Client disconnected: ${client ? client.id : client}`);
    };
    
    publish(packet: AedesPublishPacket, client: Client | null) {
        if (client) {
            console.log(`Message published by ${client ? client.id : 'BROKER'}: ${packet.topic} -> ${packet.payload.toString()}`);
        }
    };
    
    subscribe(subscriptions: Subscription[], client: Client) {
        console.log(`Client ${client ? client.id : 'UNKNOWN'} subscribed to: ${subscriptions.map(s => s.topic).join(', ')}`);
    };
    
    unsubscribe(subscriptions: String[], client: Client) {
        console.log(`Client ${client ? client.id : 'UNKNOWN'} unsubscribed from: ${subscriptions.join(', ')}`);
    };
}

export default new Events();
