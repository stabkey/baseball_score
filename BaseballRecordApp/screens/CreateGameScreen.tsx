import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import { TeamContext } from '../context/TeamContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

type CreateGameScreenProps = {
  navigation: any;
};

export default function CreateGameScreen({ navigation }: CreateGameScreenProps) {
  const { teams } = useContext(TeamContext);
  const [gameDate, setGameDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [homeTeamId, setHomeTeamId] = useState<number | null>(null);
  const [awayTeamId, setAwayTeamId] = useState<number | null>(null);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setGameDate(selectedDate);
    }
  };

  const handleCreate = () => {
    if (!homeTeamId || !awayTeamId) {
      Alert.alert('エラー', 'ホームチームとアウェイチームを選択してください');
      return;
    }
    if (homeTeamId === awayTeamId) {
      Alert.alert('エラー', 'ホームチームとアウェイチームは異なるチームを選択してください');
      return;
    }
    // TODO: ゲーム作成処理（API呼び出しやContextの更新など）
    Alert.alert('成功', `試合を作成しました\n日付: ${gameDate.toLocaleDateString()}`);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>試合日</Text>
      <Button title={gameDate.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={gameDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>ホームチーム</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={homeTeamId}
          onValueChange={(itemValue) => setHomeTeamId(itemValue)}
          prompt="ホームチームを選択"
        >
          <Picker.Item label="選択してください" value={null} />
          {teams.map((team) => (
            <Picker.Item key={team.id} label={team.name} value={team.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>アウェイチーム</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={awayTeamId}
          onValueChange={(itemValue) => setAwayTeamId(itemValue)}
          prompt="アウェイチームを選択"
        >
          <Picker.Item label="選択してください" value={null} />
          {teams.map((team) => (
            <Picker.Item key={team.id} label={team.name} value={team.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonRow}>
        <Button title="作成" onPress={handleCreate} />
        <Button title="キャンセル" onPress={handleCancel} color="#888" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 12,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});
