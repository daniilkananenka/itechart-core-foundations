import { AVAILABLE_COLORS, Color, COLORS_CONFIG } from '../constants/color';
import { GameState } from '../state/game';
import { createComponentHandler, getAllElements } from '../utils/component';
import { eventEmitter, EVENTS } from '../utils/event-emitter';

class ColorButtonsComponent {
  readonly #ui: NodeListOf<HTMLButtonElement>;
  readonly #gameState: GameState;

  constructor({ gameState }: { gameState: GameState }) {
    this.#gameState = gameState;
    this.#ui = getAllElements('.color-selector-button');

    this.#attachListeners();
    this.#render();

    eventEmitter.addHandler(EVENTS.GAME_STARTED, this.handleGameStarted);
    eventEmitter.addHandler(EVENTS.GAME_STOPED, this.handleGameStoped);
  }

  handleGameStarted = createComponentHandler(() => {
    this.#render();
  }, this);

  handleGameStoped = createComponentHandler(() => {
    this.#render();
  }, this);

  #render() {
    this.#ui.forEach((element, index) => {
      const color = AVAILABLE_COLORS[index];

      element.style.backgroundColor = COLORS_CONFIG[color].background;
      element.style.borderColor = COLORS_CONFIG[color].border;

      element.disabled = !this.#gameState.isGameStarted;
    });
  }

  #attachListeners() {
    this.#ui.forEach((element, index) => {
      element.addEventListener('click', () => {
        if (!this.#gameState.isGameStarted) return;

        this.#gameState.checkAnswer(AVAILABLE_COLORS[index]);
      });
    });
  }
}

export { ColorButtonsComponent };
