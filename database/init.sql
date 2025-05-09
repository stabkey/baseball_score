-- PostgreSQL用 野球打席記録アプリ データベーススキーマ作成SQL

CREATE TABLE teams (
  team_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  birthdate DATE,
  team_id INT REFERENCES teams(team_id)
);

CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  home_team_id INT REFERENCES teams(team_id),
  away_team_id INT REFERENCES teams(team_id)
);

CREATE TABLE at_bats (
  at_bat_id SERIAL PRIMARY KEY,
  player_id INT REFERENCES players(player_id),
  game_id INT REFERENCES games(game_id),
  inning INT NOT NULL,
  result VARCHAR(50) NOT NULL
);

CREATE TABLE pitches (
  pitch_id SERIAL PRIMARY KEY,
  at_bat_id INT REFERENCES at_bats(at_bat_id),
  pitch_number INT NOT NULL,
  pitch_type VARCHAR(50),
  speed_kmph NUMERIC(5,1),
  result VARCHAR(50),
  zone_position INT CHECK (zone_position BETWEEN 1 AND 16)
);

-- インデックスは必要に応じて追加可能
