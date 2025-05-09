import React, { useContext } from 'react';
import { TeamContext } from '../context/TeamContext';
import { Button, Card, Stack, Text, YStack, XStack, Theme } from 'tamagui';

type PlayerListScreenProps = {
  navigation: any;
};

export default function PlayerListScreen({ navigation }: PlayerListScreenProps) {
  const { players, teams } = useContext(TeamContext);

  const getTeamName = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.name : '所属チームなし';
  };

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" padding={16} backgroundColor="$background">
        <Text fontSize={28} fontWeight="bold" marginBottom={16}>
          選手一覧
        </Text>
        <Button marginBottom={16} onPress={() => navigation.goBack()}>
          戻る
        </Button>
        {players.length === 0 ? (
          <Text color="$color8" marginTop={24}>
            登録された選手はありません。
          </Text>
        ) : (
          <YStack space={12} width={320}>
            {players.map((item: any) => (
              <Card key={item.id} elevate size="$4" padding={16} alignItems="center">
                <Text fontSize={20} fontWeight="bold" marginBottom={4}>
                  {item.name}
                </Text>
                <Text fontSize={16} color="$color8" marginBottom={2}>
                  {getTeamName(item.teamId)}
                </Text>
                <Text fontSize={14} color="$color8">
                  {item.birthdate || '生年月日未登録'}
                </Text>
              </Card>
            ))}
          </YStack>
        )}
      </YStack>
    </Theme>
  );
}
