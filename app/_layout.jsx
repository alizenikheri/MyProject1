import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { auth } from '../config/firebase';
import { useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Add signOut import

export default function Layout() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Add logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/SignInScreen');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!initializing) {
      const inAuthGroup = segments[0] === '(auth)';
      const onWelcomeScreen = segments.length === 0 || segments[0] === 'index';
      
      if (user && (inAuthGroup || onWelcomeScreen)) {
        // User is logged in but on auth or welcome screen, redirect to home
        router.replace('/home');
      } else if (!user && !inAuthGroup && !onWelcomeScreen) {
        // User is not logged in and trying to access protected screens
        router.replace('/(auth)/SignInScreen');
      }
    }
  }, [user, segments, initializing]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" hidden={true} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          navigationBarHidden: true,
          statusBarHidden: true
        }}
      />
    </View>
  );
}