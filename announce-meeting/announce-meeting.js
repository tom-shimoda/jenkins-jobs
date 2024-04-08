var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
var _a = require("@slack/web-api"), WebClient = _a.WebClient, LogLevel = _a.LogLevel;
require("dotenv").config();
// var {JapaneseHolidays} = require('japanese-holidays');
var holiday_jp = require('@holiday-jp/holiday_jp');
// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
var client = new WebClient(process.env.APP_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG
});
// ID of the channel you want to send the message to
var channelId = process.env.CHANNEL_ID;
// Check if it's a holiday
function isHoliday(date) {
    return holiday_jp.isHoliday(date);
    // return JapaneseHolidays.isHoliday(date)
}
// Check if it's a weekend
function isWeekend(date) {
    return date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday
}
// Get formatted date string
function getDateStr(date) {
    var dWeek = ['日', '月', '火', '水', '木', '金', '土'];
    var w = dWeek[date.getDay()];
    // 参考: https://ribbit.konomi.app/blog/javascript-date-format/
    // const formattedDate = (date: Date): string => date.toISOString().split('T')[0]; // → 2021-12-08
    // localesを入れないと西暦が最後尾に来たりする
    return date.toLocaleDateString('ja-JP') + " (" + w + ")";
}
function SendMessage(date) {
    return __awaiter(this, void 0, void 0, function () {
        var todayStr, str, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todayStr = getDateStr(date);
                    str = "<!here> " + todayStr + " Hello,world\nこんにちは、世界";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.chat.postMessage({
                            channel: channelId,
                            text: str
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var date = new Date();
if (isHoliday(date) || isWeekend(date)) {
    console.log('Enjoy your holiday!');
}
else {
    SendMessage(date)
        .then(function (result) {
        console.log(result);
    })
        .catch(function (error) {
        console.error(error);
        process.exitCode = 1; // 異常終了として通知
    });
}
