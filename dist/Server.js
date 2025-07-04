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
const App_1 = require("./App");
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = 5000;
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            server = App_1.app.listen(PORT, () => __awaiter(this, void 0, void 0, function* () {
                console.log("✅ Server is runing on the port: 5000");
                yield mongoose_1.default.connect("mongodb+srv://sadiq:devsadiq6699@cluster0.2wuqxlq.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0");
                console.log("✅ Database is connect");
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
