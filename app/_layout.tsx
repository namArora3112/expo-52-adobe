import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {Assurance} from '@adobe/react-native-aepassurance';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MobileCore } from '@adobe/react-native-aepcore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
MobileCore.initializeWithAppId ("94f571f308d5/bc09a100649b/launch-6df8e3eea690-development").then(() => {
  console.log("AEP SDK Initialized");
}).catch((error) => {  
  console.log("AEP SDK Initialization error", error);
 });
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // useEffect(() => { 

  //   Assurance.startSession("edgetutorialapp://?adb_validation_sessionid=65d372d7-588f-429a-b6f1-9b518cbe4ba5");

  // }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
