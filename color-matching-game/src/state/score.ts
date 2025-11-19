import { createEventHandler } from '../utils/event-emitter';
import { Context } from './context';

class ScoreState {
  #context: Context;
  #score: number;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#score = 0;

    this.#context.eventEmitter.addHandler(
      'GAME_STARTED',
      this.handleGameStarted
    );
    this.#context.eventEmitter.addHandler(
      'ANSWER_IS_CORRECT',
      this.handleAnswerIsCorrect
    );
  }

  get score() {
    return this.#score;
  }

  handleGameStarted = createEventHandler(() => {
    this.#clearScore();
  }, this);

  handleAnswerIsCorrect = createEventHandler(() => {
    this.#incrementScore();
  }, this);

  #clearScore() {
    this.#score = 0;

    this.#context.eventEmitter.emit('SCORE_UPDATED', { score: this.#score });
  }

  #incrementScore() {
    ++this.#score;

    this.#context.eventEmitter.emit('SCORE_UPDATED', { score: this.#score });
  }
}

export { ScoreState };
