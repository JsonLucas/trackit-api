import { Module } from '@nestjs/common';
import { WebSocketGateway } from 'src/helpers/websocket.gateway';

@Module({
  providers: [WebSocketGateway]
})

export class WebSocketModule {}

