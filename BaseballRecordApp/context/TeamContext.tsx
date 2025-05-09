import React, { createContext, useState, ReactNode, useEffect } from 'react';
import * as Database from './Database';

type Team = {
  id: string;
  name: string;
};

type Player = {
  id: string;
  name: string;
  birthdate: string | null;
  teamId: string;
};

type TeamContextType = {
  teams: Team[];
  addTeam: (name: string) => Promise<void>;
  players: Player[];
  addPlayer: (player: Omit<Player, 'id'>) => Promise<void>;
};

export const TeamContext = createContext<TeamContextType>({
  teams: [],
  addTeam: async () => {},
  players: [],
  addPlayer: async () => {},
});

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    Database.initDB()
      .then(() => {
        loadTeams();
        // TODO: loadPlayers();
      })
      .catch((err) => {
        console.error('DB初期化エラー:', err);
      });
  }, []);

  const loadTeams = () => {
    Database.getTeams()
      .then((dbTeams) => {
        setTeams(dbTeams.map((t) => ({ id: t.team_id.toString(), name: t.name })));
      })
      .catch((err) => {
        console.error('チーム取得エラー:', err);
      });
  };

  const addTeam = async (name: string) => {
    try {
      await Database.insertTeam(name);
      await loadTeams();
    } catch (err) {
      console.error('チーム追加エラー:', err);
    }
  };

  const addPlayer = async (player: Omit<Player, 'id'>) => {
    // TODO: playersテーブルへの挿入処理を実装
    // 現状はローカル状態のみ更新（仮）
    const newPlayer: Player = {
      id: Date.now().toString(),
      ...player,
    };
    setPlayers((prev) => [...prev, newPlayer]);
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam, players, addPlayer }}>
      {children}
    </TeamContext.Provider>
  );
};
