import { io, Socket } from 'socket.io-client';
import { envs } from '../common/constants/envs';
import { getIdToken } from './firebase';

let socket: Socket;

export const initializeSocket = async (): Promise<Socket> => {
  const token = await getIdToken();

  if (!socket) {
    socket = io(envs.WS_URL, {
      extraHeaders: {
        authorization: token || '',
      },
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }

  return socket;
};
