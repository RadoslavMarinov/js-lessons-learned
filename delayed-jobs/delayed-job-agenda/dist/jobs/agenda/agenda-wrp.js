'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.agenda = exports.start = void 0;
const mongo_connect_1 = __importDefault(require('../../mongo-connect'));
const { Agenda } = require('agenda');
const state = {
  connected: false
};
function start() {
  return new Promise((resolve, reject) => {
    if (state.connected) {
      return resolve(state.agenda);
    }
    mongo_connect_1.default().then((mongoConnectState) => {
      const _agenda = new Agenda({
        db: {
          address: mongoConnectState.connectionString,
          collection: `agendaJobs`
        }
      });
      state.connected = true;
      state.agenda = _agenda;
      _agenda.start().then(() => resolve(_agenda));
    });
  });
}
exports.start = start;
function agenda() {
  return new Promise((resolve, reject) => {
    if (state.connected) {
      return resolve(state.agenda);
    }
    mongo_connect_1.default().then((mongoConnectState) => {
      const _agenda = new agenda.Agenda({
        db: {
          address: mongoConnectState.connectionString,
          collection: `agendaJobs`
        }
      });
      state.connected = true;
      state.agenda = _agenda;
      return _agenda;
    });
  });
}
exports.agenda = agenda;
// address: state.connectionString, collection: 'agendaJobs'
