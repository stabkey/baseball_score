import React, { useState } from 'react';
import { createTamagui, TamaguiProvider, View } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';

import CreateTeamScreen from './screens/CreateTeamScreen';
import TeamListScreen from './screens/TeamListScreen';
import RegisterPlayerScreen from './screens/RegisterPlayerScreen';
import { TeamProvider } from './context/TeamContext';
import PlayerListScreen from './screens/PlayerListScreen';
import CreateGameScreen from './screens/CreateGameScreen';
import HomeScreen from './screens/HomeScreen';
import GameListScreen from './screens/GameListScreen';
import RecordAtBatScreen from './screens/RecordAtBatScreen';

type ScreenName =
  | 'Home'
  | 'TeamList'
  | 'PlayerList'
  | 'GameList'
  | 'CreateGame'
  | 'RecordAtBat';

const config = createTamagui(defaultConfig);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');

  const navigation = {
    navigate: (screen: ScreenName) => setCurrentScreen(screen),
    goBack: () => setCurrentScreen('Home'),
  };

  let ScreenComponent: React.ReactNode = null;
  switch (currentScreen) {
    case 'Home':
      ScreenComponent = <HomeScreen navigation={navigation} />;
      break;
    case 'TeamList':
      ScreenComponent = <TeamListScreen navigation={navigation} />;
      break;
    case 'PlayerList':
      ScreenComponent = <PlayerListScreen navigation={navigation} />;
      break;
    case 'GameList':
      ScreenComponent = <GameListScreen navigation={navigation} />;
      break;
    case 'CreateGame':
      ScreenComponent = <CreateGameScreen navigation={navigation} />;
      break;
    case 'RecordAtBat':
      ScreenComponent = <RecordAtBatScreen navigation={navigation} />;
      break;
    default:
      ScreenComponent = (
        <View>
          <h1>不明な画面です</h1>
        </View>
      );
  }

  return (
    <TamaguiProvider config={config}>
      <TeamProvider>
        {ScreenComponent}
      </TeamProvider>
    </TamaguiProvider>
  );
}
