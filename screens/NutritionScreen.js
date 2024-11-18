import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function NutritionHeader() {
    return (
        <LinearGradient
            colors={['#8BC34A', '#558B2F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            <Text style={styles.headerTitle}>Nutrition</Text>
        </LinearGradient>
    );
}

function NutritionScreen() {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : '#E8F5E9',
    };

    const [dailyCalorieGoal, setDailyCalorieGoal] = useState('');
    const [remainingCalories, setRemainingCalories] = useState(0);
    const [currentCalories, setCurrentCalories] = useState('');

    const handleSetDailyGoal = () => {
        const goal = parseInt(dailyCalorieGoal);
        if (!isNaN(goal) && goal > 0) {
            setRemainingCalories(goal);
            setDailyCalorieGoal('');
        } else {
            alert('Please enter a valid number for daily calorie goal.');
        }
    };

    const addCalories = () => {
        const intake = parseInt(currentCalories);
        if (!isNaN(intake) && intake > 0) {
            setRemainingCalories((prev) => Math.max(prev - intake, 0));
            setCurrentCalories('');
        } else {
            alert('Please enter a valid number for calories.');
        }
    };

    return (
        <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <NutritionHeader />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
            >
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Daily Calorie Goal</Text>
                    <Text style={styles.sectionDescription}>
                        Set your daily calorie goal and log calories consumed to track remaining intake.
                    </Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setDailyCalorieGoal}
                            value={dailyCalorieGoal}
                            placeholder="Set daily calorie goal"
                            keyboardType="numeric"
                        />
                        <Button title="Set Goal" color="#4CAF50" onPress={handleSetDailyGoal} />
                    </View>

                    <View style={styles.statBox}>
                        <Text style={styles.statTitle}>Remaining Calories</Text>
                        <Text style={styles.statValue}>{remainingCalories} kcal</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCurrentCalories}
                            value={currentCalories}
                            placeholder="Add calories consumed"
                            keyboardType="numeric"
                        />
                        <Button title="Add Calories" color="#4CAF50" onPress={addCalories} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    header: {
        padding: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#33691E',
        marginVertical: 10,
    },
    sectionDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    statBox: {
        backgroundColor: '#C5E1A5',
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    statTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#33691E',
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#33691E',
        marginTop: 5,
    },
    inputContainer: {
        marginVertical: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: '#000',
    },
});

export default NutritionScreen;