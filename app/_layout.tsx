import { Stack } from "expo-router";
import { PlayerProvider } from './PlayerContext';

export default function RootLayout() {
  return (
      <PlayerProvider>

      <Stack screenOptions={{ headerShown: false }}></Stack>
          </PlayerProvider>

    
  );
}
