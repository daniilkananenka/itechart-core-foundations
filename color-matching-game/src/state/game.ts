import { AVAILABLE_COLORS } from '../constants/color';
import { GAME_CONFIG } from '../constants/game-config';
import { eventEmitter } from '../utils/event-emitter';
import { RatingManager } from '../utils/rating-manager';

class GameState {
  #question: string;
  #isGameStarted: boolean;
  #score: number;
  #timer: { intervalId: number | undefined; seconds: number };
  #ratingManager: RatingManager;

  constructor({ ratingManager }: { ratingManager: RatingManager }) {
    this.#ratingManager = ratingManager;

    this.#question = AVAILABLE_COLORS[0];
    this.#isGameStarted = false;
    this.#score = 0;
    this.#timer = {
      intervalId: undefined,
      seconds: 0,
    };
  }

  get question() {
    return this.#question;
  }

  get isGameStarted() {
    return this.#isGameStarted;
  }

  get score() {
    return this.#score;
  }

  get remainingTime() {
    return this.#timer.seconds;
  }

  get rating() {
    return this.#ratingManager.get();
  }

  startGame() {
    this.#isGameStarted = true;

    this.#clearScore();
    this.#generateQuestion();
    this.#startTimer();

    eventEmitter.emit('GAME_STARTED', undefined);
  }

  stopGame() {
    this.#isGameStarted = false;
    this.#clearTimer();

    this.#ratingManager.update(this.#score);

    eventEmitter.emit('GAME_STOPED', undefined);
    eventEmitter.emit('RATING_UPDATED', { rating: this.#ratingManager.get() });
  }

  checkAnswer(answer: string) {
    if (!this.#isCorrectAnswer(answer)) {
      eventEmitter.emit('ANSWER_IS_INCORRECT', undefined);
      return;
    }

    eventEmitter.emit('ANSWER_IS_CORRECT', undefined);

    this.#incrementScore();
    this.#generateQuestion();
  }

  #startTimer() {
    this.#timer.seconds = GAME_CONFIG.GAME_DURATION_SECONDS;
    eventEmitter.emit('TIMER_UPDATED', { seconds: this.#timer.seconds });

    this.#timer.intervalId = setInterval(() => {
      --this.#timer.seconds;
      eventEmitter.emit('TIMER_UPDATED', { seconds: this.#timer.seconds });

      if (this.#timer.seconds === 0) {
        this.stopGame();
      }
    }, GAME_CONFIG.TIMER_UPDATE_INTERVAL);
  }

  #clearTimer() {
    this.#timer.seconds = 0;
    clearInterval(this.#timer.intervalId);
  }

  #isCorrectAnswer(answer: string) {
    return this.#question === answer;
  }

  #clearScore() {
    this.#score = 0;
    eventEmitter.emit('SCORE_UPDATED', { score: this.#score });
  }

  #incrementScore() {
    ++this.#score;
    eventEmitter.emit('SCORE_UPDATED', { score: this.#score });
  }

  #generateQuestion() {
    this.#question =
      AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];

    eventEmitter.emit('QUESTION_UPDATED', { question: this.#question });
  }
}

export { GameState };
