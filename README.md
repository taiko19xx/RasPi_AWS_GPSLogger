# RasPi_AWS_GPSLogger
「Raspberry Pi+AWS IoTでGPSロガーをつくろう」で使用している各種スクリプトを格納しているリポジトリです。実際の利用方法については書籍を参照してください。

書籍は次の場所で販売中（販売していました）です。

* 技術書典5
* 技術書典6
* BOOTH(https://morinomiyakono.booth.pm/items/1034676)

## 動作環境
次の環境で動作確認しています。

* Raspberry Pi
    * Node.js 8.11.3
* Lambda
    * Node.js 8.10

## 構造
各フォルダと章の対応表は次のとおりです。

| フォルダ          | 対応章                                              | 中身                             |
| ----------------- | --------------------------------------------------- | -------------------------------- |
| Part4             | 第4章 AWSの設定をしよう                             | Lambdaスクリプト                 |
| Part5/Client      | 第5章 AWSに接続しよう                               | Raspberry Piで実行するスクリプト |
| Part5/Service     | 同上                                                | Raspberry Piに設定するサービス   |
| Part5/ShellScript | 同上                                                | サービスで使用するスクリプト     |
| Part7.1           | 第7章 拡張してみよう - 7.1 チャットツールに通知する | Lambdaスクリプトとpackage.json   |
| Part7.2/Client    | 第7章 拡張してみよう - 7.2 セッションIDを割り当てる | Raspberry Piで実行するスクリプト |
| Part7.2/Lambda    | 同上                                                | Lambdaスクリプト                 |

ファイル名は、本文内「リストx.x （ファイル名）」のファイル名部分に対応しています。

## ライセンス
Apache License 2.0
