
// A simple event emitter
class EventEmitter {
  private listeners: { [event: string]: Function[] } = {};

  on(event: string, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off(event: string, listener: Function) {
    if (!this.listeners[event]) return;

    const idx = this.listeners[event].indexOf(listener);
    if (idx > -1) {
      this.listeners[event].splice(idx, 1);
    }
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export const errorEmitter = new EventEmitter();
