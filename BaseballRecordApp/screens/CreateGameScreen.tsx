import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import { TeamContext } from '../context/TeamContext';
import { Button, Card, Text, Input, YStack, XStack, Theme, Select } from 'tamagui';
import DateTimePicker from '@react-native-community/datetimepicker';

type CreateGameScreenProps = {
  navigation: any;
};

function getTodayString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function CreateGameScreen({ navigation }: CreateGameScreenProps) {
  const { teams } = useContext(TeamContext);
  const [gameDate, setGameDate] = useState<string>(getTodayString());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [team1Id, setTeam1Id] = useState<string>('');
  const [team2Id, setTeam2Id] = useState<string>('');
  const [senkoTeam, setSenkoTeam] = useState<string>('');

  const handleCreate = () => {
    if (!team1Id || !team2Id || !senkoTeam) {
      alert('2チームと先攻/後攻を選択してください');
      return;
    }
    if (team1Id === team2Id) {
      alert('同じチームは選択できません');
      return;
    }
    const senkoId = senkoTeam === 'team1' ? team1Id : team2Id;
    const kokoId = senkoTeam === 'team1' ? team2Id : team1Id;
    const senkoName = teams.find((t: any) => String(t.id) === senkoId)?.name || '';
    const kokoName = teams.find((t: any) => String(t.id) === kokoId)?.name || '';
    alert(`試合を作成しました\n日付: ${gameDate}\n先攻: ${senkoName}\n後攻: ${kokoName}`);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // Web用: input[type="date"]
  const renderWebDateInput = () => (
    <div style={{ width: '100%', marginBottom: 12 }}>
      <input
        type="date"
        value={gameDate}
        onChange={e => setGameDate(e.target.value)}
        style={{
          width: '100%',
          fontSize: 16,
          padding: 8,
          borderRadius: 6,
          border: '1px solid #ccc',
        }}
        placeholder={getTodayString()}
      />
    </div>
  );

  // モバイル用: DateTimePicker
  const renderNativeDateInput = () => (
    <XStack width="100%" marginBottom={12} alignItems="center" space={8}>
      <Input
        value={gameDate}
        editable={false}
        width="70%"
        placeholder={getTodayString()}
      />
      <Button onPress={() => setShowDatePicker(true)} width="30%">
        日付選択
      </Button>
      {showDatePicker && (
        <DateTimePicker
          value={new Date(gameDate)}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const yyyy = selectedDate.getFullYear();
              const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
              const dd = String(selectedDate.getDate()).padStart(2, '0');
              setGameDate(`${yyyy}-${mm}-${dd}`);
            }
          }}
        />
      )}
    </XStack>
  );

  // 先攻・後攻のチーム名取得
  const team1Name = teams.find((t: any) => String(t.id) === team1Id)?.name || '';
  const team2Name = teams.find((t: any) => String(t.id) === team2Id)?.name || '';

  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" padding={16} backgroundColor="$background">
        <Text fontSize={28} fontWeight="bold" marginBottom={16}>
          試合作成
        </Text>
        <Button marginBottom={16} onPress={handleCancel}>
          戻る
        </Button>
        <Card elevate size="$4" padding={24} width={340} alignItems="center">
          <Text fontSize={18} marginBottom={8} alignSelf="flex-start">
            試合日
          </Text>
          {Platform.OS === 'web' ? renderWebDateInput() : renderNativeDateInput()}

          <Text fontSize={18} marginBottom={8} alignSelf="flex-start">
            チーム1
          </Text>
          <YStack width="100%" marginBottom={12}>
            <Select
              value={team1Id}
              onValueChange={setTeam1Id}
            >
              <Select.Trigger>
                <Select.Value placeholder="選択してください" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Item index={-1} value="">
                    <Select.ItemText>選択してください</Select.ItemText>
                  </Select.Item>
                  {teams
                    .filter((team: any) => String(team.id) !== team2Id)
                    .map((team: any, idx: number) => (
                      <Select.Item key={team.id} value={String(team.id)} index={idx}>
                        <Select.ItemText>{team.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>

          <Text fontSize={18} marginBottom={8} alignSelf="flex-start">
            チーム2
          </Text>
          <YStack width="100%" marginBottom={12}>
            <Select
              value={team2Id}
              onValueChange={setTeam2Id}
            >
              <Select.Trigger>
                <Select.Value placeholder="選択してください" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Item index={-1} value="">
                    <Select.ItemText>選択してください</Select.ItemText>
                  </Select.Item>
                  {teams
                    .filter((team: any) => String(team.id) !== team1Id)
                    .map((team: any, idx: number) => (
                      <Select.Item key={team.id} value={String(team.id)} index={idx}>
                        <Select.ItemText>{team.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>

          <Text fontSize={18} marginBottom={8} alignSelf="flex-start">
            先攻チーム
          </Text>
          <YStack width="100%" marginBottom={24}>
            <Select
              value={senkoTeam}
              onValueChange={setSenkoTeam}
            >
              <Select.Trigger>
                <Select.Value placeholder="選択してください" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Item index={-1} value="">
                    <Select.ItemText>選択してください</Select.ItemText>
                  </Select.Item>
                  {team1Id && (
                    <Select.Item index={0} value="team1">
                      <Select.ItemText>{team1Name}</Select.ItemText>
                    </Select.Item>
                  )}
                  {team2Id && (
                    <Select.Item index={1} value="team2">
                      <Select.ItemText>{team2Name}</Select.ItemText>
                    </Select.Item>
                  )}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>

          <XStack space={12} marginTop={16}>
            <Button onPress={handleCreate}>作成</Button>
            <Button onPress={handleCancel} theme="active">
              キャンセル
            </Button>
          </XStack>
        </Card>
      </YStack>
    </Theme>
  );
}
