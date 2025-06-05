type EventMap = {
    click: { x: number; y: number };
    change: string;
  };
  
  type EventHandler<T> = (payload: T) => void;
  
  class EventEmitter {
    private handlers: {
      [K in keyof EventMap]?: EventHandler<EventMap[K]>[]
    } = {};
  
    on<K extends keyof EventMap>(
      event: K,
      handler: EventHandler<EventMap[K]>
    ) {
        (this.handlers[event] = this.handlers[event] || []).push(handler);
    }
  
    emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) {
      this.handlers[event]?.forEach(h => h(payload));
    }
  }