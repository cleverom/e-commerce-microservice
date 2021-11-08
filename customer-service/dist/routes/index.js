"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var user_2 = require("../controllers/user");
var router = express_1.default.Router();
/* GET home page. */
router.post('/user', user_1.createUser);
router.post('/user/login', user_2.login);
exports.default = router;
//# sourceMappingURL=index.js.map