type EventEmitterPayloads = {
  GAME_STARTED: undefined;
  GAME_STOPED: undefined;

  TIMER_UPDATED: { seconds: number };
  SCORE_UPDATED: { score: number };
  QUESTION_UPDATED: { question: string };

  ANSWER_IS_INCORRECT: undefined;
  ANSWER_IS_CORRECT: undefined;

  RATING_UPDATED: { rating: number[] };
};

class EventEmitter<T extends Record<string, any>> {
  #eventHandlers: {
    [K in keyof T]?: Set<(payload: T[K]) => void>;
  };

  constructor() {
    this.#eventHandlers = {};
  }

  addHandler<K extends keyof T>(event: K, handler: (payload: T[K]) => void) {
    if (!this.#eventHandlers[event]) {
      this.#eventHandlers[event] = new Set();
    }
    this.#eventHandlers[event]!.add(handler);
  }

  removeHandler<K extends keyof T>(event: K, handler: (payload: T[K]) => void) {
    this.#eventHandlers[event]?.delete(handler);
  }

  emit<K extends keyof T>(event: K, payload: T[K]) {
    this.#eventHandlers[event]?.forEach((handler) => {
      handler(payload);
    });
  }
}

const eventEmitter = new EventEmitter<EventEmitterPayloads>();

export { eventEmitter };
