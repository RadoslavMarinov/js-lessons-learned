"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var ReadyState;
(function (ReadyState) {
    ReadyState[ReadyState["disconnected"] = 0] = "disconnected";
    ReadyState[ReadyState["connected"] = 1] = "connected";
    ReadyState[ReadyState["connecting"] = 2] = "connecting";
    ReadyState[ReadyState["disconnecting"] = 3] = "disconnecting";
})(ReadyState || (ReadyState = {}));
const CONNECTION_STRING = 'mongodb://localhost:27017/Test';
const state = {
    connected: false,
    connection: null,
    connectionString: CONNECTION_STRING
};
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!state.connected) {
            state.connection = yield mongoose_1.createConnection(CONNECTION_STRING, { maxPoolSize: 10 }).asPromise();
            state.connection.on('connected', (params) => {
                console.log(`Mongo connected!!`);
                state.connected = true;
            });
            state.connection.on('disconnected', (params) => {
                state.connected = false;
            });
        }
        return state;
    });
}
exports.default = connect;
