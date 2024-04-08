// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const {WebClient, LogLevel} = require("@slack/web-api");

require("dotenv").config()
// var {JapaneseHolidays} = require('japanese-holidays');
const holiday_jp = require('@holiday-jp/holiday_jp');

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(
    process.env.APP_TOKEN,
    {
        // LogLevel can be imported and used to make debugging simpler
        logLevel: LogLevel.DEBUG
    }
);

// ID of the channel you want to send the message to
const channelId = process.env.CHANNEL_ID;

// Check if it's a holiday
function isHoliday(date: Date): boolean {
    return holiday_jp.isHoliday(date);
    // return JapaneseHolidays.isHoliday(date)
}

// Check if it's a weekend
function isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday
}

// Get formatted date string
function getDateStr(date: Date): string {
    const dWeek = ['日', '月', '火', '水', '木', '金', '土'];
    const w = dWeek[date.getDay()];

    // 参考: https://ribbit.konomi.app/blog/javascript-date-format/
    // const formattedDate = (date: Date): string => date.toISOString().split('T')[0]; // → 2021-12-08

    // localesを入れないと西暦が最後尾に来たりする
    return date.toLocaleDateString('ja-JP') + " (" + w + ")";
}


async function SendMessage(date: Date) {
    const todayStr = getDateStr(date);
    const str = "<!here> " + todayStr + " Hello,world\nこんにちは、世界"
    try {
        // Call the chat.postMessage method using the WebClient
        const result = await client.chat.postMessage({
            channel: channelId,
            text: str
        });

        return result;
    } catch (error) {
        throw error;
    }
}

const date = new Date();
if (isHoliday(date) || isWeekend(date)) {
    console.log('Enjoy your holiday!');
} else {
    SendMessage(date)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
            process.exitCode = 1 // 異常終了として通知
        });
}
