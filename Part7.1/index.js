const IncomingWebhook = require("@slack/client").IncomingWebhook;
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

// AWS SDK 初期化
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
const dynamo = new AWS.DynamoDB({apiVersion: '2012-10-08'});

exports.handler = async (event, context, callback) => {
    try {
        // パラメータ設定
        const params = {
            TableName: process.env.DYNAMO_TABLE,
            Item: {
                'datetime': {S: event.time},
                'lat': {S: event.lat.toString()},
                'lon': {S: event.lon.toString()}
            }
        };
        console.log(params);
        
        // データ登録
        await dynamo.putItem(params).promise();

        // WebHook送信
        await webhook.send({
            text: ':earth_asia: Lat:' + event.lat +' Lon:' + event.lon,
            icon_emoji: ':satellite:',
            username: 'GPSLog',
            channel: process.env.SLACK_CHANNEL
        });
    } catch (e) {
        // エラー時呼び出し
        console.log(e);
        callback(e)
    }
};
