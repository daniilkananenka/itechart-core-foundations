const { AVAILABLE_COLORS } = require('../constants/color');
const {
  TIMER_INTERVAL,
  GAME_DURATION_SECONDS,
} = require('../constants/game-config');
const { EVENTS, eventEmitter } = require('../utils/event-emitter');

class GameState {
  #question;
  #isGameStarted;
  #score;
  #timer;

  constructor() {
    this.#question = AVAILABLE_COLORS[0];
    this.#isGameStarted = false;
    this.#score = 0;
    this.#timer = {
      intervalId: null,
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

  startGame() {
    this.#isGameStarted = true;
    this.#score = 0;

    this.#generateQuestion();
    this.#startTimer();

    eventEmitter.emit(EVENTS.GAME_STARTED);
  }

  stopGame() {
    this.#isGameStarted = false;
    this.#stopTimer();

    eventEmitter.emit(EVENTS.GAME_STOPED);
  }

  checkAnswer(answer) {
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
    this.#timer.seconds = GAME_DURATION_SECONDS;
    eventEmitter.emit(EVENTS.TIMER_UPDATED);

    this.#timer.intervalId = setInterval(() => {
      --this.#timer.seconds;
      eventEmitter.emit(EVENTS.TIMER_UPDATED);

      if (this.#timer.seconds === 0) {
        this.stopGame();
      }
    }, TIMER_INTERVAL);
  }

  #stopTimer() {
    this.#timer.seconds = 0;
    clearInterval(this.#timer.intervalId);
  }

  #isCorrectAnswer(answer) {
    return this.#question === answer;
  }

  #incrementScore() {
    ++this.#score;
  }

  #generateQuestion() {
    this.#question =
      AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];
  }
}

export { GameState };
