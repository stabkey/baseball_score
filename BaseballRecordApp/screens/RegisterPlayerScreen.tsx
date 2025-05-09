import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { TeamContext } from '../context/TeamContext';
import { Picker } from '@react-native-picker/picker';

type RegisterPlayerScreenProps = {
  navigation: any;
};

export default function RegisterPlayerScreen({ navigation }: RegisterPlayerScreenProps) {
  const { teams, addPlayer } = useContext(TeamContext);
  const [playerName, setPlayerName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const handleRegister = () => {
    if (playerName.trim() === '') {
      Alert.alert('エラー', '選手名を入力してください');
      return;
    }
    if (!selectedTeamId) {
      Alert.alert('エラー', '所属チームを選択してください');
      return;
    }
    addPlayer({
      name: playerName,
      birthdate: birthdate.trim() === '' ? null : birthdate,
      teamId: selectedTeamId,
    });
    Alert.alert('成功', `選手「${playerName}」を登録しました`);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>選手名</Text>
      <TextInput
        style={styles.input}
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="選手名を入力"
      />

      <Text style={styles.label}>生年月日 (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={birthdate}
        onChangeText={setBirthdate}
        placeholder="例: 1990-01-01"
      />

      <Text style={styles.label}>所属チーム</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTeamId}
          onValueChange={(itemValue) => setSelectedTeamId(itemValue)}
          prompt="所属チームを選択"
        >
          <Picker.Item label="選択してください" value={null} />
          {teams.map((team) => (
            <Picker.Item key={team.id} label={team.name} value={team.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonRow}>
        <Button title="登録" onPress={handleRegister} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});
