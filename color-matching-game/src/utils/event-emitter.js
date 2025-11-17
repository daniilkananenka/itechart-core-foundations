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
        this.eventHandlers[event]
    }

    /**
     * @param {string} event 
     * @returns {boolean}
     */
    #exists(event) {
        return (event in this.eventHandlers)
    }
}

const EVENTS = Object.freeze({
    INITIALIZE: "initialize",
    START_GAME: "start-game",
    END_GAME: "end-game",
    DECREMENT_TIMER: "decrement-timer",
    STOP_TIMER: "stop-timer",
    INCREMENT_SCORE: "increment-score"
})

const eventEmitter = new EventEmitter();

module.exports = {EVENTS, eventEmitter}