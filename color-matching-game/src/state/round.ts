import { AVAILABLE_COLORS } from '../constants/color';
import { createEventHandler } from '../utils/event-emitter';
import { Context } from './context';

class RoundState {
  #context: Context;
  #question: string;

  constructor({ context }: { context: Context }) {
    this.#context = context;
    this.#question = AVAILABLE_COLORS[0];

    this.#context.eventEmitter.addHandler(
      'GAME_STARTED',
      this.handleGameStarted
    );
  }

  get question() {
    return this.#question;
  }

  handleGameStarted = createEventHandler(() => {
    this.#generateQuestion();
  }, this);

  checkAnswer(answer: string) {
    if (!this.#isCorrectAnswer(answer)) {
      this.#context.eventEmitter.emit('ANSWER_IS_INCORRECT', undefined);
      return;
    }

    this.#context.eventEmitter.emit('ANSWER_IS_CORRECT', undefined);
    this.#generateQuestion();
  }

  #generateQuestion() {
    this.#question =
      AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];

    this.#context.eventEmitter.emit('QUESTION_UPDATED', {
      question: this.#question,
    });
  }

  #isCorrectAnswer(answer: string) {
    return this.#question === answer;
  }
}

export { RoundState };
