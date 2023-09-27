import { Injectable } from '@nestjs/common';
import { 
    SubscribeMessage, 
    WebSocketGateway as WebSocket, 
    WebSocketServer, 
    OnGatewayConnection, 
    OnGatewayDisconnect, 
    MessageBody,
    ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HabitService } from 'src/services/habit.service';

@WebSocket({ cors: true })
@Injectable()
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('onModifyHabitList')
  handleUpdateHabit(@ConnectedSocket() client: Socket, @MessageBody() payload: string): void {
    this.server.emit('onModifyHabitList');
  }
}
