import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StatusService } from './status.service';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Injectable()
@WebSocketGateway({ cors: true })
export class StatusGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  payloadArray = [];
  constructor(private readonly statusService: StatusService) { }

  @SubscribeMessage('online')
  handleConnection(client: Socket, userId: string) {
    this.sendOnlineData(client, userId);
  }

  sendOnlineData(client: Socket, userId: string) {
    if (userId) {
      this.payloadArray.push(userId);
      console.log(userId, this.payloadArray);
      client.emit('online', this.payloadArray);
      client.broadcast.emit('online', this.payloadArray);
    }
  }

  sendOfflineData(
    client: Socket,
    payload: { userId: string; isOnline: string },
  ) {
    if (payload) {
      client.broadcast.emit('offline', payload);
    }
  }
}
