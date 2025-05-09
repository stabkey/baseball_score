import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Modal, TextInput, Alert } from 'react-native';
import { TeamContext } from '../context/TeamContext';

type TeamListScreenProps = {
  navigation: any;
};

export default function TeamListScreen({ navigation }: TeamListScreenProps) {
  const { teams, addTeam } = useContext(TeamContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  const handleAddTeam = () => {
    if (newTeamName.trim() === '') {
      Alert.alert('エラー', 'チーム名を入力してください');
      return;
    }
    addTeam(newTeamName);
    setNewTeamName('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>チーム一覧</Text>
      <Button title="チーム作成" onPress={() => setModalVisible(true)} />
      {teams.length === 0 ? (
        <Text>登録されたチームはありません。</Text>
      ) : (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.teamItem}>
              <Text style={styles.teamName}>{item.name}</Text>
            </View>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>チーム作成</Text>
            <TextInput
              style={styles.input}
              value={newTeamName}
              onChangeText={setNewTeamName}
              placeholder="チーム名を入力"
            />
            <View style={styles.buttonRow}>
              <Button title="作成" onPress={handleAddTeam} />
              <Button title="キャンセル" onPress={() => setModalVisible(false)} color="#888" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  teamItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  teamName: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
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
