import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

type HomeScreenProps = {
  navigation: any;
};

const BUTTONS = [
  { title: 'チーム一覧', screen: 'TeamList' },
  { title: '選手一覧', screen: 'PlayerList' },
  { title: '試合一覧', screen: 'GameList' },
  { title: '新しい試合を作成', screen: 'CreateGame' },
  { title: '新しい打席を記録', screen: 'RecordAtBat' },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>野球打席記録アプリ</Text>
      <View style={styles.buttonContainer}>
        {BUTTONS.map((btn) => (
          <TouchableOpacity
            key={btn.screen}
            style={[
              styles.button,
              isDark && styles.buttonDark,
            ]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(btn.screen)}
          >
            <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#22223b',
    letterSpacing: 1,
  },
  titleDark: {
    color: '#f8fafc',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 20,
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    transitionDuration: '150ms',
  },
  buttonDark: {
    backgroundColor: '#2563eb',
    shadowColor: '#fff',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonTextDark: {
    color: '#f8fafc',
  },
});