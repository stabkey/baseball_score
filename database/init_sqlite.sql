-- SQLite用 野球打席記録アプリ データベーススキーマ作成SQL

CREATE TABLE teams (
  team_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE players (
  player_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  birthdate TEXT,
  team_id INTEGER,
  FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE games (
  game_id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  home_team_id INTEGER,
  away_team_id INTEGER,
  FOREIGN KEY (home_team_id) REFERENCES teams(team_id),
  FOREIGN KEY (away_team_id) REFERENCES teams(team_id)
);

CREATE TABLE at_bats (
  at_bat_id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id INTEGER,
  game_id INTEGER,
  inning INTEGER NOT NULL,
  result TEXT NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players(player_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);

CREATE TABLE pitches (
  pitch_id INTEGER PRIMARY KEY AUTOINCREMENT,
  at_bat_id INTEGER,
  pitch_number INTEGER NOT NULL,
  pitch_type TEXT,
  speed_kmph REAL,
  result TEXT,
  zone_position INTEGER CHECK (zone_position BETWEEN 1 AND 16),
  FOREIGN KEY (at_bat_id) REFERENCES at_bats(at_bat_id)
);

-- SQLiteはインデックス自動作成が多いが、必要に応じて追加可能
