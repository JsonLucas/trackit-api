import { 
    SubscribeMessage, 
    WebSocketGateway as WebSocket, 
    WebSocketServer, 
    OnGatewayConnection, 
    OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocket()
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // Handle new WebSocket connections
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // Handle WebSocket disconnections
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('onUpdateHabit')
  handleHabitUpdate(client: Socket, payload: string): void {
    console.log(client);
    this.server.emit('onUpdateHabit', { teste: 'teste' }); 
  }
}
