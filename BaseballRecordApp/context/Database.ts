/* eslint-disable @typescript-eslint/no-explicit-any */
// 型定義がないためanyで回避
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('baseball_app.db');

// 非同期でテーブル作成
export const initDB = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      db.withTransactionSync(() => {
        db.execSync(`CREATE TABLE IF NOT EXISTS teams (
          team_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL
        );`);
        db.execSync(`CREATE TABLE IF NOT EXISTS players (
          player_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          birthdate TEXT,
          team_id INTEGER,
          FOREIGN KEY (team_id) REFERENCES teams(team_id)
        );`);
        db.execSync(`CREATE TABLE IF NOT EXISTS games (
          game_id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          home_team_id INTEGER,
          away_team_id INTEGER,
          FOREIGN KEY (home_team_id) REFERENCES teams(team_id),
          FOREIGN KEY (away_team_id) REFERENCES teams(team_id)
        );`);
        db.execSync(`CREATE TABLE IF NOT EXISTS at_bats (
          at_bat_id INTEGER PRIMARY KEY AUTOINCREMENT,
          player_id INTEGER,
          game_id INTEGER,
          inning INTEGER NOT NULL,
          result TEXT NOT NULL,
          FOREIGN KEY (player_id) REFERENCES players(player_id),
          FOREIGN KEY (game_id) REFERENCES games(game_id)
        );`);
        db.execSync(`CREATE TABLE IF NOT EXISTS pitches (
          pitch_id INTEGER PRIMARY KEY AUTOINCREMENT,
          at_bat_id INTEGER,
          pitch_number INTEGER NOT NULL,
          pitch_type TEXT,
          speed_kmph REAL,
          result TEXT,
          zone_position INTEGER CHECK (zone_position BETWEEN 1 AND 16),
          FOREIGN KEY (at_bat_id) REFERENCES at_bats(at_bat_id)
        );`);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// チーム一覧取得
export const getTeams = (): Promise<any[]> => {
  return new Promise<any[]>((resolve, reject) => {
    try {
      db.withTransactionSync(() => {
        const result: any = db.execSync('SELECT * FROM teams;');
        resolve(result[0]?.rows ?? []);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// チーム追加
export const insertTeam = (name: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      db.withTransactionSync(() => {
        db.execSync(`INSERT INTO teams (name) VALUES ('${name.replace(/'/g, "''")}');`);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// 同様にplayers, gamesなどのCRUD関数を追加予定
