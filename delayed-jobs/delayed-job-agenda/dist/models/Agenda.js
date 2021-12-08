"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongo_connect_1 = __importDefault(require("../mongo-connect"));
mongo_connect_1.default();
const agendaSchema = new mongoose_1.Schema({}, { collection: 'agendaJobs' });
exports.default = mongoose_1.model('AgendaJobs', agendaSchema);
