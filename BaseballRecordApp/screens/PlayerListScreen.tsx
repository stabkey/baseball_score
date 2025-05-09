import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TeamContext } from '../context/TeamContext';

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
    <View style={styles.container}>
      <Text style={styles.title}>選手一覧</Text>
      {players.length === 0 ? (
        <Text>登録された選手はありません。</Text>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.playerItem}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.teamName}>{getTeamName(item.teamId)}</Text>
              <Text style={styles.birthdate}>{item.birthdate || '生年月日未登録'}</Text>
            </View>
          )}
        />
      )}
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
  playerItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamName: {
    fontSize: 16,
    color: '#555',
  },
  birthdate: {
    fontSize: 14,
    color: '#777',
  },
});
