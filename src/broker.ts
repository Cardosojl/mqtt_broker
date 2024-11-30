import aedes from 'aedes';
import events from './events/events';

class Broker {
    broker: aedes;

    constructor() {
        this.broker = new aedes();
        this.authentication();
        this.events();
    }

    private authentication(): void {
    }

    private events():void {
        this.broker.on('client', events.connection);          
        this.broker.on('clientDisconnect', events.disconnect);        
        this.broker.on('publish', events.publish);        
        this.broker.on('subscribe', events.subscribe);        
        this.broker.on('unsubscribe', events.unsubscribe);
    }
}

export default new Broker().broker;
