// 秒単位で待ち時間を定義
const INTERVAL = 10;
let lastTime = 0;

// moment.js初期化
const moment = require('moment');

// node-gpsd初期化
const gpsd = require('node-gpsd');
const listener = new gpsd.Listener();
const daemon = new gpsd.Daemon({
  device: '==YOUR SERIAL DEVICE=='
});

// aws-iot-device-sdk初期化
const deviceModule = require('aws-iot-device-sdk').device;
const device = deviceModule({
      host: '==YOUR AWS IOT HOST==',
   keyPath: '==YOUR THING PRIVATE KEY==',
  certPath: '==YOUR THING CERT==',
    caPath: '==YOUR ROOT CA==',
  clientId: 'raspi-client'
});

// GPSdデーモン起動
daemon.start(() => {
  console.log('GPSd daemon started');
});

// 位置情報受信時の処理
listener.on('TPV', (data) => {
  const thisTime = moment(data.time).unix();

  // INTERVAL分時間が経過しているかチェック
  if (thisTime >= lastTime + INTERVAL) {
    console.log(data);

    // AWS IoT Coreへ送信
    device.publish('gpsLogTopic', JSON.stringify(data));

    lastTime = thisTime;
  }
});

// エラー時の処理
listener.on('error', (m, c, e) => {
  console.log(m,c,e);
});

// AWS IoT接続時の処理
device.on('connect', () => {
  console.log('AWS IoT Core Connected');

  // GPSdデーモンへ接続
  listener.connect(() => {
    console.log('GPSd connected');
    listener.watch();
  });
});
