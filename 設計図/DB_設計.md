# 野球打席記録アプリ用データベース設計（PostgreSQL）

## 概要

本アプリは、野球の打席結果を記録・閲覧するための業務改善アプリケーションです。以下のエンティティをもとにデータベースを設計します。

* 選手（Players）
* チーム（Teams）
* 試合（Games）
* 打席（At Bats）
* 投球（Pitches）

## エンティティと属性

### players（選手）

| カラム名       | データ型         | 制約          | 説明      |
| ---------- | ------------ | ----------- | ------- |
| player\_id | SERIAL       | PRIMARY KEY | 選手ID    |
| name       | VARCHAR(100) | NOT NULL    | 選手名     |
| birthdate  | DATE         |             | 生年月日    |
| team\_id   | INT          | FOREIGN KEY | 所属チームID |

### teams（チーム）

| カラム名     | データ型         | 制約          | 説明    |
| -------- | ------------ | ----------- | ----- |
| team\_id | SERIAL       | PRIMARY KEY | チームID |
| name     | VARCHAR(100) | NOT NULL    | チーム名  |

### games（試合）

| カラム名           | データ型   | 制約          | 説明        |
| -------------- | ------ | ----------- | --------- |
| game\_id       | SERIAL | PRIMARY KEY | 試合ID      |
| date           | DATE   | NOT NULL    | 試合日       |
| home\_team\_id | INT    | FOREIGN KEY | ホームチームID  |
| away\_team\_id | INT    | FOREIGN KEY | アウェイチームID |

### at\_bats（打席）

| カラム名        | データ型        | 制約          | 説明             |
| ----------- | ----------- | ----------- | -------------- |
| at\_bat\_id | SERIAL      | PRIMARY KEY | 打席ID           |
| player\_id  | INT         | FOREIGN KEY | 選手ID           |
| game\_id    | INT         | FOREIGN KEY | 試合ID           |
| inning      | INT         | NOT NULL    | イニング           |
| result      | VARCHAR(50) | NOT NULL    | 打席結果（例：ヒット、三振） |

### pitches（投球）

| カラム名           | データ型         | 制約                                      | 説明                       |
| -------------- | ------------ | --------------------------------------- | ------------------------ |
| pitch\_id      | SERIAL       | PRIMARY KEY                             | 投球ID                     |
| at\_bat\_id    | INT          | FOREIGN KEY                             | 打席ID（at\_batsへの参照）       |
| pitch\_number  | INT          | NOT NULL                                | 何球目か（1, 2, 3...）         |
| pitch\_type    | VARCHAR(50)  |                                         | 球種（例：ストレート、スライダー）        |
| speed\_kmph    | NUMERIC(5,1) |                                         | 球速（km/h）                 |
| result         | VARCHAR(50)  |                                         | 結果（ボール、ストライク、ファウル等）      |
| zone\_position | INT          | CHECK (zone\_position BETWEEN 1 AND 16) | ストライク／ボールゾーン上の位置（1〜16分割） |

## テーブル間のリレーション

* `players.team_id` → `teams.team_id`
* `games.home_team_id`, `games.away_team_id` → `teams.team_id`
* `at_bats.player_id` → `players.player_id`
* `at_bats.game_id` → `games.game_id`
* `pitches.at_bat_id` → `at_bats.at_bat_id`

## 補足

* スキーマは柔軟性を保ちつつ、正規化の基本に従っています。
* 打席結果（result）の種類は後にコード体系で管理するテーブルを追加しても良いです。
* 実データの増加やパフォーマンス要件に応じて、インデックス設計を追加予定。
* 投球ごとの記録も可能なため、詳細な分析や可視化に対応可能です。
* `zone_position` により、16分割されたゾーン内のどこに投球されたかの位置情報を管理できます。
