console.log("App file loaded");
import { enableScreens } from 'react-native-screens';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

import CreateTeamScreen from './screens/CreateTeamScreen';
import TeamListScreen from './screens/TeamListScreen';
import RegisterPlayerScreen from './screens/RegisterPlayerScreen';
import { TeamProvider } from './context/TeamContext';
import PlayerListScreen from './screens/PlayerListScreen';
import CreateGameScreen from './screens/CreateGameScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>野球打席記録アプリ</Text>
      <Text style={styles.button} onPress={() => navigation.navigate('TeamList')}>
        チーム一覧
      </Text>
      <Text style={styles.button} onPress={() => navigation.navigate('RegisterPlayer')}>
        選手登録
      </Text>
      <Text style={styles.button} onPress={() => navigation.navigate('PlayerList')}>
        選手一覧
      </Text>
      <Text style={styles.button} onPress={() => navigation.navigate('GameList')}>
        試合一覧
      </Text>
      <Text style={styles.button} onPress={() => navigation.navigate('CreateGame')}>
        新しい試合を作成
      </Text>
      <Text style={styles.button} onPress={() => navigation.navigate('RecordAtBat')}>
        新しい打席を記録
      </Text>
    </View>
  );
};

// 仮の画面コンポーネント（後で詳細実装）
// function PlayerList() {
//   return (
//     <View style={styles.container}>
//       <Text>選手一覧画面（未実装）</Text>
//     </View>
//   );
// }

function GameList() {
  return (
    <View style={styles.container}>
      <Text>試合一覧画面（未実装）</Text>
    </View>
  );
}

// function CreateGame() {
//   return (
//     <View style={styles.container}>
//       <Text>試合作成画面（未実装）</Text>
//     </View>
//   );
// }

function RecordAtBat() {
  return (
    <View style={styles.container}>
      <Text>打席記録画面（未実装）</Text>
    </View>
  );
}

export default function App() {
  try {
    console.log("App start");
    // ここで例外が出るか確認
    return (
      <>
        {console.log("App rendering")}
        <TeamProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ホーム' }} />
              <Stack.Screen name="TeamList" component={TeamListScreen} options={{ title: 'チーム一覧' }} />
              <Stack.Screen name="RegisterPlayer" component={RegisterPlayerScreen} options={{ title: '選手登録' }} />
              <Stack.Screen name="PlayerList" component={PlayerListScreen} options={{ title: '選手一覧' }} />
              <Stack.Screen name="GameList" component={GameList} options={{ title: '試合一覧' }} />
              <Stack.Screen name="CreateGame" component={CreateGameScreen} options={{ title: '試合作成' }} />
              <Stack.Screen name="RecordAtBat" component={RecordAtBat} options={{ title: '打席記録' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </TeamProvider>
      </>
    );
  } catch (e) {
    // 例外内容をalertとconsole.errorで強制表示
    // @ts-ignore
    if (typeof alert !== "undefined") alert("App error: " + String(e));
    console.error("App error", e);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>アプリ初期化エラー: {String(e)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    color: 'blue',
    marginVertical: 8,
  },
});
