import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { TeamContext } from '../context/TeamContext';

type CreateTeamScreenProps = {
  navigation: any;
};

export default function CreateTeamScreen({ navigation }: CreateTeamScreenProps) {
  const [teamName, setTeamName] = useState('');
  const { addTeam } = useContext(TeamContext);

  const handleCreate = async () => {
    if (teamName.trim() === '') {
      Alert.alert('エラー', 'チーム名を入力してください');
      return;
    }
    try {
      await addTeam(teamName);
      Alert.alert('成功', `チーム「${teamName}」を作成しました`);
      navigation.goBack();
    } catch (e) {
      Alert.alert('エラー', 'チーム作成に失敗しました: ' + String(e));
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>チーム名</Text>
      <TextInput
        style={styles.input}
        value={teamName}
        onChangeText={setTeamName}
        placeholder="チーム名を入力"
      />
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
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
