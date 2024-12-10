import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ActivityScreen from './screens/ActivityScreen';
import HeartScreen from './screens/HeartScreen';
import NutritionScreen from './screens/NutritionScreen';
import MedicationsScreen from './screens/MedicationsScreen';
import RecordsScreen from './screens/RecordsScreen';
import LoginScreen from './screens/LoginScreen';
import { initializeDatabase, createTables, insertSampleData } from './db-service';

import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Database initialization
    useEffect(() => {
      const setupDatabase = async () => {
        await initializeDatabase();
        insertSampleData();
      };

      setupDatabase();
    }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundStyle.backgroundColor }}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator initialRouteName="Home">
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Activity" component={ActivityScreen} />
              <Stack.Screen name="Heart" component={HeartScreen} />
              <Stack.Screen name="Nutrition" component={NutritionScreen} />
              <Stack.Screen name="Medications" component={MedicationsScreen} />
              <Stack.Screen name="Records" component={RecordsScreen} />
            </>
          ) : (
            <Stack.Screen name="Login">
              {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
