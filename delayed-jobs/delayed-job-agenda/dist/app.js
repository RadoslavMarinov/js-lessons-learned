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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agenda_wrp_1 = require("./jobs/agenda/agenda-wrp");
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agn = yield agenda_wrp_1.agenda();
    agn === null || agn === void 0 ? void 0 : agn.define(`create a file`, () => {
        console.log(`JOB STAREDTED`);
        fs_1.default.writeFileSync(__dirname + `/file.txt`, `asdasdas`);
    });
    agn === null || agn === void 0 ? void 0 : agn.schedule(new Date((new Date()).getTime() + 15 * 1000), `create a file`, { age: 30 });
    res.json({ msg: `Hello Riko` });
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    const agn = yield agenda_wrp_1.start();
    console.log(`Server listening on http://localhost:${PORT}`);
}));
