/* eslint-disable @typescript-eslint/no-unused-vars */
export class ChatWebSocketService {
  
  send( 
    // @ts-expect-error: Игнорируем ошибку arg0
    arg0: { type: string; content: string; }) {
    throw new Error('Method not implemented.');
  }
  
  private socket: WebSocket | null = null;
  
  public connect(chatId: number): void {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/api/v2/chats/${chatId}`);
      
    this.socket.addEventListener('open', () => {
      console.log('Connected to chat'); // Логирование
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
    console.log('Получено сообщение:', data); // Логирование
    // Обработка входящего сообщения
  }
}