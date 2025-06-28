import EventEmitter from 'events';

// Create an instance of EventEmitter
const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // No limit on listeners

// Export the emitter
export const emitter = _emitter;