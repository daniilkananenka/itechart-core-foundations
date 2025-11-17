class EventEmitter {
  readonly eventHandlers: Record<string, Set<() => void>>;

  constructor() {
    this.eventHandlers = {};
  }

  addHandler(event: string, handler: () => void) {
    if (!this.exists(event)) {
      this.eventHandlers[event] = new Set([handler]);
      return;
    }

    this.eventHandlers[event].add(handler);
  }

  removeHandler(event: string, handler: () => void) {
    if (!this.exists(event)) {
      throw new Error(`There are no handlers associated with ${event} event`);
    }
    this.eventHandlers[event].delete(handler);
  }

  emit(event: string) {
    if (!this.exists(event)) {
      return;
    }

    this.eventHandlers[event].forEach((handler) => {
      handler?.();
    });
  }

  private exists(event: string) {
    return event in this.eventHandlers;
  }
}

const EVENTS = Object.freeze({
  APP_INITIALIZED: 'APP_INITIALIZED',

  GAME_STARTED: 'GAME_STARTED',
  GAME_STOPED: 'GAME_STOPED',

  TIMER_UPDATED: 'TIMER_UPDATED',
  SCORE_UPDATED: 'SCORE_UPDATED',
  QUESTION_UPDATED: 'QUESTION_UPDATED',

  ANSWER_IS_INCORRECT: 'ANSWER_IS_INCORRECT',
  ANSWER_IS_CORRECT: 'ANSWER_IS_CORRECT',

  RATING_UPDATED: 'RATING_UPDATED',
});

const eventEmitter = new EventEmitter();

export { EVENTS, eventEmitter };
