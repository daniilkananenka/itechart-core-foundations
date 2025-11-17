const { EVENTS, eventEmitter } = require('../utils/event-emitter')

class ControlButtonComponent {
  ui

  constructor() {
    this.ui = document.getElementById('control-button')

    eventEmitter.addHandler(EVENTS.INITIALIZE, this.handleInitialize)
    eventEmitter.addHandler(EVENTS.START_GAME, this.handleStartGame)
    eventEmitter.addHandler(EVENTS.STOP_GAME, this.handleStopGame)
  }

  handleInitialize() {
    this.ui.addEventListener('click', () => {
      // Add condition of game state
      eventEmitter.emit(EVENTS.START_GAME)

      eventEmitter.emit(EVENTS.STOP_GAME)
    })
  }

  handleStartGame() {
    this.#setInnerText('Stop')
  }

  handleStopGame() {
    this.#setInnerText('Start')
  }

  #setInnerText(text) {
    this.ui.innerText(text)
  }
}
