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
        
        callback(null);
    } catch (e) {
        // エラー時呼び出し
        console.log(e);
        callback(e)
    }
};
