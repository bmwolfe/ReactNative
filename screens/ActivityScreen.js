import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View,
    useColorScheme,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    fetchSteps,
    fetchDistance,
    fetchTime,
    fetchActivity,
    insertActivity,
} from '../queryService';

function Header() {
    return (
        <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            <Text style={styles.headerTitle}>Activity</Text>
        </LinearGradient>
    );
}

function Section({ children, title }) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text style={[
                styles.sectionTitle,
                { color: isDarkMode ? Colors.white : Colors.black },
            ]}>
                {title}
            </Text>
            <Text style={[
                styles.sectionDescription,
                { color: isDarkMode ? Colors.light : Colors.dark },
            ]}>
                {children}
            </Text>
        </View>
    );
}

function ActivityScreen() {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : '#E8F5E9' };

    const [steps, setSteps] = useState('0');
    const [distance, setDistance] = useState('0 km');
    const [time, setTime] = useState('0 mins');
    const [activityInput, setActivityInput] = useState('');
    const [activityLog, setActivityLog] = useState([]);

    useEffect(() => {
        fetchActivityData();
        fetchActivityLog();
    }, []);

    const fetchActivityData = () => {
        // Fetch Steps
        fetchSteps(
            (rows) => setSteps(rows._array[0]?.steps || '0'),
            (error) => console.error('Error fetching steps:', error)
        );

        // Fetch Distance
        fetchDistance(
            (rows) => setDistance(`${rows._array[0]?.distance || 0} km`),
            (error) => console.error('Error fetching distance:', error)
        );

        // Fetch Time
        fetchTime(
            (rows) => setTime(`${rows._array[0]?.time || 0} mins`),
            (error) => console.error('Error fetching time:', error)
        );
    };

    const fetchActivityLog = () => {
        fetchActivity(
            (rows) => {
                const activities = rows._array.map((item) => item.activity);
                setActivityLog(activities);
            },
            (error) => console.error('Error fetching activity log:', error)
        );
    };

    const logActivity = () => {
        if (activityInput.trim()) {
            // Insert new activity into the database
            insertActivity(
                activityInput,
                () => {
                    setActivityLog([...activityLog, activityInput]);
                    setActivityInput('');
                },
                (error) => console.error('Error logging activity:', error)
            );
        }
    };

    return (
        <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Header />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <View style={styles.container}>
                    <Section title="Today's Activity">
                        Log your steps, workouts, and active time to meet your goals!
                    </Section>

                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Steps</Text>
                            <Text style={styles.statValue}>{steps}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Distance</Text>
                            <Text style={styles.statValue}>{distance}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Active Time</Text>
                            <Text style={styles.statValue}>{time}</Text>
                        </View>
                    </View>

                    <View style={styles.logContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setActivityInput}
                            value={activityInput}
                            placeholder="Enter activity (e.g., 10,000 steps)"
                        />
                        <Pressable style={styles.saveButton} onPress={logActivity}>
                            <Text style={styles.saveButtonText}>Log Activity</Text>
                        </Pressable>
                    </View>

                    <Section title="Activity Log">
                        {activityLog.length > 0 ? activityLog.map((log, index) => (
                            <Text key={index} style={styles.activityLogText}>- {log}</Text>
                        )) : <Text style={styles.activityLogText}>No activity logged yet.</Text>}
                    </Section>
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
        elevation: 10,
    },
    headerTitle: {
        fontSize: 28,
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
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
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
    logContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#A5B6A7',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    activityLogText: {
        fontSize: 16,
        paddingVertical: 2,
    },
});


export default ActivityScreen;
