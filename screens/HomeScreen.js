import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Pressable,
    Alert,
    useColorScheme,
    View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { fetchSteps, fetchCalories, fetchAvgHeartRate } from '../queryService'; // Import dynamic queries

function Header() {
    return (
        <LinearGradient
            colors={['#0080b8', '#008080']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            <Text style={styles.headerTitle}>Health Tracker</Text>
        </LinearGradient>
    );
}

function Section({ children, title }) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    { color: isDarkMode ? Colors.white : Colors.black },
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    { color: isDarkMode ? Colors.light : Colors.dark },
                ]}
            >
                {children}
            </Text>
        </View>
    );
}

function HomeScreen({ navigation }) {
    const [steps, setSteps] = useState(null);
    const [calories, setCalories] = useState(null);
    const [avgHeartRate, setAvgHeartRate] = useState(null);

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : '#FDF5E6' };

    useEffect(() => {
        // Fetch all the required data on component mount
        fetchSteps(
            rows => {
                if (rows.length > 0) {
                    setSteps(rows.item(0).steps);
                } else {
                    setSteps('No data');
                }
            },
            error => console.error('Error fetching steps:', error)
        );

        fetchCalories(
            rows => {
                if (rows.length > 0) {
                    setCalories(rows.item(0).consumed);
                } else {
                    setCalories('No data');
                }
            },
            error => console.error('Error fetching calories:', error)
        );

        fetchAvgHeartRate(
            rows => {
                if (rows.length > 0) {
                    setAvgHeartRate(rows.item(0).rate);
                } else {
                    setAvgHeartRate('No data');
                }
            },
            error => console.error('Error fetching average heart rate:', error)
        );
    }, []);

    return (
        <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Header />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <View style={styles.container}>
                    <Section title="Today's Summary">
                        Track your steps, heart rate, and more. Stay on top of your health!
                    </Section>

                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Steps</Text>
                            <Text style={styles.statValue}>{steps !== null ? steps : 'Loading...'}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Avg Heart Rate</Text>
                            <Text style={styles.statValue}>
                                {avgHeartRate !== null ? `${avgHeartRate} bpm` : 'Loading...'}
                            </Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Calories</Text>
                            <Text style={styles.statValue}>
                                {calories !== null ? `${calories} kcal` : 'Loading...'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.buttonGrid}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.squareButton,
                                { backgroundColor: pressed ? '#008098' : '#008080' },
                            ]}
                            onPress={() => navigation.navigate('Activity')}
                        >
                            <Text style={styles.buttonText}>Activity</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.squareButton,
                                { backgroundColor: pressed ? '#008098' : '#008080' },
                            ]}
                            onPress={() => navigation.navigate('Medications')}
                        >
                            <Text style={styles.buttonText}>Medications</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.squareButton,
                                { backgroundColor: pressed ? '#008098' : '#008080' },
                            ]}
                            onPress={() => navigation.navigate('Heart')}
                        >
                            <Text style={styles.buttonText}>Heart</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.squareButton,
                                { backgroundColor: pressed ? '#008098' : '#008080' },
                            ]}
                            onPress={() => navigation.navigate('Nutrition')}
                        >
                            <Text style={styles.buttonText}>Nutrition</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.squareButton,
                                { backgroundColor: pressed ? '#008098' : '#008080' },
                            ]}
                            onPress={() => navigation.navigate('Records')}
                        >
                            <Text style={styles.buttonText}>Records</Text>
                        </Pressable>
                    </View>

                    <Section title="Health Tips">
                        Stay hydrated, maintain a balanced diet, and exercise regularly!
                    </Section>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA',
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
    sectionContainer: {
        marginTop: 20,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333333',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        color: '#333333',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    statBox: {
        backgroundColor: '#A5B6A7',
        padding: 15,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 8,
    },
    statTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 5,
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    squareButton: {
        width: 140,
        height: 140,
        backgroundColor: '#008080',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#b0b0b0',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default HomeScreen;
