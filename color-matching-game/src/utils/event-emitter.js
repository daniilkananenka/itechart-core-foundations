class EventEmitter {
  constructor() {
    this.eventHandlers = {};
  }

  /**
   * @param {string} event
   * @param {() => void} handler
   * @returns {void}
   */
  addHandler(event, handler) {
    if (!this.#exists(event)) {
      this.eventHandlers[event] = new Set([handler]);
      return;
    }

    this.eventHandlers[event].add(handler);
  }

  /**
   * @param {string} event
   * @param {() => void} handler
   * @returns {void}
   */
  removeHandler(event, handler) {
    if (!this.#exists(event)) {
      throw new Error(`There are no handlers associated with ${event} event`);
    }
    this.eventHandlers[event].delete(handler);
  }

  /**
   * @param {string} event
   * @returns {void}
   */
  emit(event) {
    if (!this.#exists(event)) {
      throw new Error(`There are no handlers associated with ${event} event`);
    }
    this.eventHandlers[event];
  }

  /**
   * @param {string} event
   * @returns {boolean}
   */
  #exists(event) {
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
});

const eventEmitter = new EventEmitter();

module.exports = { EVENTS, eventEmitter };
