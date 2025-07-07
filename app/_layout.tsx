import {SplashScreen, Stack} from "expo-router";
import './../global.css';
import { useFonts } from 'expo-font';
import { useEffect} from "react";
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from '@/context/AuthContext';
import { ApplicationProvider } from '@/context/ApplicationContext'
import client from '@/utils/client'
import Toast from 'react-native-toast-message';

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
   if(error) throw error;
   if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <ApplicationProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                </ApplicationProvider>
            </AuthProvider>
            <Toast />
        </ApolloProvider>
  );
}
