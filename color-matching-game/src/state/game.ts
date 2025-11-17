import { AVAILABLE_COLORS } from '../constants/color';
import { GAME_CONFIG } from '../constants/game-config';
import { eventEmitter, EVENTS } from '../utils/event-emitter';
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

    eventEmitter.emit(EVENTS.GAME_STARTED);
  }

  stopGame() {
    this.#isGameStarted = false;
    this.#clearTimer();

    this.#ratingManager.update(this.#score);

    eventEmitter.emit(EVENTS.GAME_STOPED);
    eventEmitter.emit(EVENTS.RATING_UPDATED);
  }

  checkAnswer(answer: string) {
    if (!this.#isCorrectAnswer(answer)) {
      eventEmitter.emit(EVENTS.ANSWER_IS_INCORRECT);
      return;
    }

    this.#incrementScore();
    this.#generateQuestion();

    eventEmitter.emit(EVENTS.ANSWER_IS_CORRECT);
    eventEmitter.emit(EVENTS.SCORE_UPDATED);
    eventEmitter.emit(EVENTS.QUESTION_UPDATED);
  }

  #startTimer() {
    this.#timer.seconds = GAME_CONFIG.GAME_DURATION_SECONDS;
    eventEmitter.emit(EVENTS.TIMER_UPDATED);

    this.#timer.intervalId = setInterval(() => {
      --this.#timer.seconds;
      eventEmitter.emit(EVENTS.TIMER_UPDATED);

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
    eventEmitter.emit(EVENTS.SCORE_UPDATED);
  }

  #incrementScore() {
    ++this.#score;
    eventEmitter.emit(EVENTS.SCORE_UPDATED);
  }

  #generateQuestion() {
    this.#question =
      AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];

    eventEmitter.emit(EVENTS.QUESTION_UPDATED);
  }
}

export { GameState };
