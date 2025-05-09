/* eslint-disable @typescript-eslint/no-explicit-any */
// 型定義がないためanyで回避
/*
// import * as SQLite from 'expo-sqlite';
// const db = SQLite.openDatabaseSync('baseball_app.db');
*/

// 非同期でテーブル作成（ダミー実装）
export const initDB = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    // DB処理は一時的に無効化
    resolve();
  });
};

// チーム一覧取得
export const getTeams = (): Promise<any[]> => {
  return new Promise<any[]>((resolve) => {
    // DB処理は一時的に無効化
    // ダミーチームデータ
    resolve([
      { team_id: 1, name: 'イーグルス' },
      { team_id: 2, name: 'タイガース' },
      { team_id: 3, name: 'ホークス' },
    ]);
  });
};

// チーム追加
export const insertTeam = (name: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    // DB処理は一時的に無効化
    resolve();
  });
};

/**
 * 試合一覧取得（ダミー実装）
 * @returns Promise<{ game_id: number, date: string, home_team_id: number, away_team_id: number }[]>
 */
export const getGames = (): Promise<any[]> => {
  return new Promise<any[]>((resolve) => {
    // ダミーデータ
    resolve([
      {
        game_id: 1,
        date: '2024-05-01',
        home_team_id: 1,
        away_team_id: 2,
      },
      {
        game_id: 2,
        date: '2024-05-03',
        home_team_id: 2,
        away_team_id: 3,
      },
      {
        game_id: 3,
        date: '2024-05-05',
        home_team_id: 1,
        away_team_id: 3,
      },
    ]);
  });
};

/**
 * 選手一覧取得（ダミー実装）
 * @returns Promise<{ player_id: number, name: string, team_id: number }[]>
 */
export const getPlayers = (): Promise<any[]> => {
  return new Promise<any[]>((resolve) => {
    // ダミー選手データ
    resolve([
      { player_id: 1, name: '山田 太郎', team_id: 1 },
      { player_id: 2, name: '佐藤 次郎', team_id: 2 },
      { player_id: 3, name: '鈴木 三郎', team_id: 3 },
    ]);
  });
};

// 同様にplayers, gamesなどのCRUD関数を追加予定
