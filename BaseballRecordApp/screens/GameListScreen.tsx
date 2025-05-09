import React, { useEffect, useState } from 'react';
import { getGames, getTeams } from '../context/Database';
import { Button, Card, Stack, Text, YStack, XStack, Theme } from 'tamagui';

type Game = {
  game_id: number;
  date: string;
  home_team_id: number;
  away_team_id: number;
};

type Team = {
  team_id: number;
  name: string;
};

type GameListScreenProps = {
  navigation: any;
};

export default function GameListScreen({ navigation }: GameListScreenProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getGames().then(setGames);
    getTeams().then(setTeams);
  }, []);

  const getTeamName = (teamId: number) => {
    const team = teams.find((t) => t.team_id === teamId);
    return team ? team.name : '不明';
  };

  const handleDetail = (game: Game) => {
    alert(
      `試合ID: ${game.game_id}\n日付: ${game.date}\n${getTeamName(game.home_team_id)} vs ${getTeamName(game.away_team_id)}`
    );
  };

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" padding={16} backgroundColor="$background">
        <Text fontSize={28} fontWeight="bold" marginBottom={16}>
          試合一覧
        </Text>
        <Button marginBottom={16} onPress={() => navigation.goBack()}>
          戻る
        </Button>
        {games.length === 0 ? (
          <Text color="$color8" marginTop={24}>
            試合データがありません
          </Text>
        ) : (
          <YStack space={12} width={320}>
            {games.map((item: Game) => (
              <Card key={item.game_id} elevate size="$4" padding={16} alignItems="center">
                <Text fontSize={20} fontWeight="bold" marginBottom={4}>
                  {item.date}
                </Text>
                <Text fontSize={16} color="$color8" marginBottom={8}>
                  {getTeamName(item.home_team_id)} vs {getTeamName(item.away_team_id)}
                </Text>
                <Button onPress={() => handleDetail(item)} theme="active">
                  詳細
                </Button>
              </Card>
            ))}
          </YStack>
        )}
      </YStack>
    </Theme>
  );
}