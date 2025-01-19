type Listener<T> = (args: T) => void;

export class EventEmitter<T> {
  private events: { [key: string]: Listener<T>[] } = {};

  on(eventName: string, listener: Listener<T>): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  emit(eventName: string, args: T): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(args));
    }
  }

  off(eventName: string, listener: Listener<T>): void {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (listenerItem) => listenerItem !== listener
      );
    }
  }
}

const emitter = new EventEmitter<{ message: string }>();
const logData = (data: { message: string }) => console.log(data.message);

emitter.on('data', logData);
emitter.emit('data', { message: 'Hello world' });
emitter.off('data', logData);

emitter.emit('data', { message: 'Something go wrong' });
