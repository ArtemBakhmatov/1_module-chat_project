import { Store } from '../core/Store';


/* eslint-disable @typescript-eslint/no-unused-vars */
export class ChatWebSocketService {

  private socket: WebSocket | null = null;

  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }
  
  send( 
    // @ts-expect-error: Игнорируем ошибку arg0
    arg0: { type: string; content: string; }) {
    throw new Error('Method not implemented.');
  }
  
  // private socket: WebSocket | null = null;
  
  public connect(chatId: number, token: string, userId: number ): void {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
      
    this.socket.addEventListener('open', () => {
      console.log('Connected to chat'); // Логирование
      this.loadOldMessages();
    });
  
    this.socket.addEventListener('message', this.handleMessage.bind(this));
  
    this.socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error); // Логирование
    });
  
    this.socket.addEventListener('close', () => {
      console.log('Disconnected from chat');
    });
  }
  
  public disconnect(): void {
    this.socket?.close();
  }
  
  public sendMessage(content: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'message', content }));
      console.log('Сообщение отправлено:', content); // Логирование
    }
  }
  
  private handleMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data);
    console.log('Получено сообщение из WebSocket:', data);

    if (data.type === 'message' || data.type === 'old_message') {
      const currentMessages = this.store.getState().messages as Array<{ content: string }> || [];
      console.log('Текущие сообщения перед обновлением:', currentMessages);

      this.store.set({ messages: [...currentMessages, data] });
      console.log('Сообщения после обновления Store:', this.store.getState().messages);
    }
  }

  private loadOldMessages(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'get old', content: '0' }));
    }
  }
}

