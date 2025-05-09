import React, { useEffect, useState } from 'react';
import { getGames, getPlayers, getTeams } from '../context/Database';
import { Button, Card, Stack, Text, Input, YStack, XStack, Theme, Select, ScrollView } from 'tamagui';

type Game = {
  game_id: number;
  date: string;
  home_team_id: number;
  away_team_id: number;
};

type Player = {
  player_id: number;
  name: string;
  team_id: number;
};

type Team = {
  team_id: number;
  name: string;
};

type Pitch = {
  pitch_type: string;
  speed_kmph: string;
  result: string;
  zone_position: string;
};

const pitchTypes = ['ストレート', 'スライダー', 'カーブ', 'フォーク', 'チェンジアップ'];
const pitchResults = ['ボール', 'ストライク', 'ファウル', 'ヒット', 'アウト'];
const atBatResults = ['ヒット', '三振', '四球', '死球', 'ゴロ', 'フライ', 'その他'];

type RecordAtBatScreenProps = {
  navigation: any;
};

export default function RecordAtBatScreen({ navigation }: RecordAtBatScreenProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [inning, setInning] = useState<string>('');
  const [atBatResult, setAtBatResult] = useState<string>(atBatResults[0]);
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [currentPitch, setCurrentPitch] = useState<Pitch>({
    pitch_type: pitchTypes[0],
    speed_kmph: '',
    result: pitchResults[0],
    zone_position: '1',
  });

  useEffect(() => {
    getGames().then(setGames);
    getPlayers().then(setPlayers);
    getTeams().then(setTeams);
  }, []);

  const getGameLabel = (game: Game) => {
    const home = teams.find((t) => t.team_id === game.home_team_id)?.name || '不明';
    const away = teams.find((t) => t.team_id === game.away_team_id)?.name || '不明';
    return `${game.date}：${home} vs ${away}`;
  };

  const handleAddPitch = () => {
    setPitches([...pitches, currentPitch]);
    setCurrentPitch({
      pitch_type: pitchTypes[0],
      speed_kmph: '',
      result: pitchResults[0],
      zone_position: '1',
    });
  };

  const handleSave = () => {
    if (!selectedGame || !selectedPlayer || !inning || pitches.length === 0) {
      alert('全ての項目を入力してください');
      return;
    }
    alert('打席記録を保存しました（ダミー）');
    setSelectedGame('');
    setSelectedPlayer('');
    setInning('');
    setAtBatResult(atBatResults[0]);
    setPitches([]);
  };

  const handleCancel = () => {
    setSelectedGame('');
    setSelectedPlayer('');
    setInning('');
    setAtBatResult(atBatResults[0]);
    setPitches([]);
  };

  // ストライクカウント
  const strikeCount = pitches.filter((p) => p.result === "ストライク").length;

  return (
    <Theme name="light">
      <ScrollView>
        <YStack flex={1} alignItems="center" padding={16} backgroundColor="$background">
          <Text fontSize={28} fontWeight="bold" marginBottom={16}>
            打席記録
          </Text>
          <Button marginBottom={16} onPress={() => navigation.goBack()}>
            戻る
          </Button>
          <Card elevate size="$4" padding={24} width={360} alignItems="center">
            <Text fontSize={18} fontWeight="bold" marginBottom={8} color="$color8">
              ストライクカウント: {strikeCount}
            </Text>
            {/* 試合選択 */}
            <Text fontSize={16} marginTop={12} marginBottom={4} alignSelf="flex-start">
              試合
            </Text>
            <YStack width="100%" marginBottom={8}>
              <Select
                value={selectedGame}
                onValueChange={setSelectedGame}
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
                    {games.map((g, idx) => (
                      <Select.Item key={g.game_id} value={g.game_id.toString()} index={idx}>
                        <Select.ItemText>{getGameLabel(g)}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select>
            </YStack>
            {/* 選手選択 */}
            <Text fontSize={16} marginTop={12} marginBottom={4} alignSelf="flex-start">
              選手
            </Text>
            <YStack width="100%" marginBottom={8}>
              <Select
                value={selectedPlayer}
                onValueChange={setSelectedPlayer}
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
                    {players.map((p, idx) => (
                      <Select.Item key={p.player_id} value={p.player_id.toString()} index={idx}>
                        <Select.ItemText>{p.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select>
            </YStack>
            {/* イニング */}
            <Text fontSize={16} marginTop={12} marginBottom={4} alignSelf="flex-start">
              イニング
            </Text>
            <Input
              value={inning}
              onChangeText={setInning}
              placeholder="例: 1"
              keyboardType="numeric"
              width="100%"
              marginBottom={8}
            />
            {/* 打席結果 */}
            <Text fontSize={16} marginTop={12} marginBottom={4} alignSelf="flex-start">
              打席結果
            </Text>
            <YStack width="100%" marginBottom={8}>
              <Select
                value={atBatResult}
                onValueChange={setAtBatResult}
              >
                <Select.Trigger>
                  <Select.Value placeholder="選択してください" />
                </Select.Trigger>
                <Select.Content>
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    {atBatResults.map((r, idx) => (
                      <Select.Item key={r} value={r} index={idx}>
                        <Select.ItemText>{r}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select>
            </YStack>
            {/* 投球入力 */}
            <Text fontSize={16} marginTop={12} marginBottom={4} alignSelf="flex-start">
              投球情報
            </Text>
            <XStack width="100%" space={8} marginBottom={8}>
              <YStack flex={1}>
                <Text fontSize={14} marginBottom={2}>
                  球種
                </Text>
                <Select
                  value={currentPitch.pitch_type}
                  onValueChange={(v) => setCurrentPitch({ ...currentPitch, pitch_type: v })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="球種" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      {pitchTypes.map((t, idx) => (
                        <Select.Item key={t} value={t} index={idx}>
                          <Select.ItemText>{t}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </YStack>
              <YStack flex={1}>
                <Text fontSize={14} marginBottom={2}>
                  球速(km/h)
                </Text>
                <Input
                  value={currentPitch.speed_kmph}
                  onChangeText={(v) => setCurrentPitch({ ...currentPitch, speed_kmph: v })}
                  keyboardType="numeric"
                  placeholder="例: 140"
                />
              </YStack>
            </XStack>
            <XStack width="100%" space={8} marginBottom={8}>
              <YStack flex={1}>
                <Text fontSize={14} marginBottom={2}>
                  結果
                </Text>
                <Select
                  value={currentPitch.result}
                  onValueChange={(v) => setCurrentPitch({ ...currentPitch, result: v })}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="結果" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      {pitchResults.map((r, idx) => (
                        <Select.Item key={r} value={r} index={idx}>
                          <Select.ItemText>{r}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </YStack>
              <YStack flex={1}>
                <Text fontSize={14} marginBottom={2}>
                  コース(1-16)
                </Text>
                <Input
                  value={currentPitch.zone_position}
                  onChangeText={(v) => setCurrentPitch({ ...currentPitch, zone_position: v })}
                  keyboardType="numeric"
                  placeholder="例: 5"
                  maxLength={2}
                />
              </YStack>
            </XStack>
            <Button marginBottom={12} onPress={handleAddPitch}>
              投球を追加
            </Button>
            {/* 投球リスト */}
            <YStack width="100%" marginBottom={12} space={4}>
              {pitches.length === 0 ? (
                <Text color="$color8">投球が追加されていません</Text>
              ) : (
                pitches.map((item, idx) => (
                  <Card key={idx} padding={8} alignItems="center">
                    <Text fontSize={15}>
                      {idx + 1}球目: {item.pitch_type} {item.speed_kmph}km/h {item.result} コース{item.zone_position}
                    </Text>
                  </Card>
                ))
              )}
            </YStack>
            {/* ボタン群 */}
            <XStack space={12} marginTop={16}>
              <Button onPress={handleSave}>打席を保存</Button>
              <Button onPress={handleCancel} theme="active">
                キャンセル
              </Button>
            </XStack>
          </Card>
        </YStack>
      </ScrollView>
    </Theme>
  );
}