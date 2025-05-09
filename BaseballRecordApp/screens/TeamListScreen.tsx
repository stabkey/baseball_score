import React, { useContext, useState } from 'react';
import { TeamContext } from '../context/TeamContext';
import { Button, Card, Stack, Text, Input, YStack, XStack, Theme, Sheet } from 'tamagui';

type TeamListScreenProps = {
  navigation: any;
};

export default function TeamListScreen({ navigation }: TeamListScreenProps) {
  const { teams, addTeam } = useContext(TeamContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const handleAddTeam = () => {
    if (newTeamName.trim() === '') {
      alert('チーム名を入力してください');
      return;
    }
    addTeam(newTeamName);
    setNewTeamName('');
    setModalVisible(false);
  };

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" padding={16} backgroundColor="$background">
        <Text fontSize={28} fontWeight="bold" marginBottom={16}>
          チーム一覧
        </Text>
        <XStack space={12} marginBottom={16}>
          <Button onPress={() => navigation.goBack()}>戻る</Button>
          <Button onPress={() => setModalVisible(true)}>チーム作成</Button>
        </XStack>
        {teams.length === 0 ? (
          <Text color="$color8" marginTop={24}>
            登録されたチームはありません。
          </Text>
        ) : (
          <YStack space={12} width={320}>
            {teams.map((item: any) => (
              <Card key={item.id} elevate size="$4" padding={16} alignItems="center">
                <Text fontSize={20} fontWeight="bold">
                  {item.name}
                </Text>
              </Card>
            ))}
          </YStack>
        )}

        <Sheet open={modalVisible} onOpenChange={setModalVisible} snapPoints={[50]} modal dismissOnSnapToBottom>
          <Sheet.Overlay />
          <Sheet.Handle />
          <Sheet.Frame padding={16} alignItems="center" backgroundColor="$background">
            <Text fontSize={20} fontWeight="bold" marginBottom={12}>
              チーム作成
            </Text>
            <Input
              value={newTeamName}
              onChangeText={setNewTeamName}
              placeholder="チーム名を入力"
              width={240}
              marginBottom={16}
            />
            <XStack space={12}>
              <Button onPress={handleAddTeam}>作成</Button>
              <Button onPress={() => setModalVisible(false)} theme="active">キャンセル</Button>
            </XStack>
          </Sheet.Frame>
        </Sheet>
      </YStack>
    </Theme>
  );
}
