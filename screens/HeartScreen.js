import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Linking,
    useColorScheme,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function Header() {
    return (
        <LinearGradient
            colors={['#FF6347', '#8B0000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            <Text style={styles.headerTitle}>Heart Health</Text>
        </LinearGradient>
    );
}

function HeartScreen() {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : '#FFEBEE',
    };

    const [heartRateEntries, setHeartRateEntries] = useState([]);
    const [restingRateEntries, setRestingRateEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState('');
    const [isResting, setIsResting] = useState(false);

    const averageHeartRate = heartRateEntries.length
        ? Math.round(heartRateEntries.reduce((a, b) => a + b, 0) / heartRateEntries.length)
        : 0;
    const peakHeartRate = heartRateEntries.length
        ? Math.max(...heartRateEntries)
        : 0;
    const averageRestingRate = restingRateEntries.length
        ? Math.round(restingRateEntries.reduce((a, b) => a + b, 0) / restingRateEntries.length)
        : 0;

    const addHeartRateEntry = () => {
        const parsedEntry = parseInt(currentEntry);
        if (!isNaN(parsedEntry) && parsedEntry > 0) {
            if (isResting) {
                setRestingRateEntries([...restingRateEntries, parsedEntry]);
            } else {
                setHeartRateEntries([...heartRateEntries, parsedEntry]);
            }
            setCurrentEntry('');
        } else {
            alert('Please enter a valid number for heart rate.');
        }
    };

    const saveData = () => {
        Alert.alert("Save Data", "This will save the data to the database once connected.");
        // ! we can integrate the database save logic here
    };

    const openHeartHealthInfo = (topic) => {
        const url = `https://www.google.com/search?q=${encodeURIComponent(topic)}`;
        Linking.openURL(url);
    };

    return (
        <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Header />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
            >
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Your Heart Health</Text>
                    <Text style={styles.sectionDescription}>
                        Track key metrics and get tips to maintain a healthy heart.
                    </Text>

                    <View style={styles.statRow}>
                        <View style={styles.statBoxLarge}>
                            <Text style={styles.statTitle}>Avg Heart Rate</Text>
                            <Text style={styles.statValue}>{averageHeartRate} bpm</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Resting Rate</Text>
                            <Text style={styles.statValue}>{averageRestingRate} bpm</Text>
                        </View>
                    </View>

                    <View style={styles.statRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Peak Rate</Text>
                            <Text style={styles.statValue}>{peakHeartRate} bpm</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Recovery</Text>
                            <Text style={styles.statValue}>1 min</Text>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCurrentEntry}
                            value={currentEntry}
                            placeholder="Enter heart rate"
                            keyboardType="numeric"
                        />
                        <View style={styles.toggleContainer}>
                            <Text>Resting</Text>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    { backgroundColor: isResting ? '#FFCDD2' : '#FFF' },
                                ]}
                                onPress={() => setIsResting(true)}
                            >
                                <Text style={styles.toggleButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    { backgroundColor: !isResting ? '#FFCDD2' : '#FFF' },
                                ]}
                                onPress={() => setIsResting(false)}
                            >
                                <Text style={styles.toggleButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <Button title="Add Entry" color="#D32F2F" onPress={addHeartRateEntry} />
                    </View>

                    <Button title="Save Data" color="#D32F2F" onPress={saveData} />

                    <Text style={styles.sectionTitle}>Learn More</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Heart Health Basics"
                            color="#D32F2F"
                            onPress={() => openHeartHealthInfo('Heart health basics')}
                        />
                        <Button
                            title="Healthy Heart Tips"
                            color="#D32F2F"
                            onPress={() => openHeartHealthInfo('Healthy heart tips')}
                        />
                        <Button
                            title="Managing Heart Rate"
                            color="#D32F2F"
                            onPress={() => openHeartHealthInfo('Managing heart rate')}
                        />
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
        color: '#B71C1C',
        marginVertical: 10,
    },
    sectionDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
    statBoxLarge: {
        backgroundColor: '#FFCDD2',
        padding: 20,
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    statBox: {
        backgroundColor: '#EF9A9A',
        padding: 15,
        borderRadius: 10,
        width: '35%',
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
        color: '#B71C1C',
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#B71C1C',
        marginTop: 5,
    },
    inputContainer: {
        marginVertical: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D32F2F',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: '#000',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    toggleButton: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    toggleButtonText: {
        color: '#B71C1C',
        fontWeight: '600',
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
});

export default HeartScreen;