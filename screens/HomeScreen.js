import React from 'react';
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
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : '#FDF5E6' };

    const goToActivityScreen = () => {
        navigation.navigate('Activity');
    };

    const goToHeartScreen = () => {
        navigation.navigate('Heart');
    }

    const goToNutritionScreen = () => {
        navigation.navigate('Nutrition');
    }

    const goToMedicationsScreen = () => {
        navigation.navigate('Medications');
    }

    const goToRecordsScreen = () => {
        navigation.navigate('Records');
    }

    const goToNewScreen = () => {
        Alert.alert('Button Pressed', 'Feature coming soon!');
    };

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
                            <Text style={styles.statValue}>5,243</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Avg Heart Rate</Text>
                            <Text style={styles.statValue}>78 bpm</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statTitle}>Calories</Text>
                            <Text style={styles.statValue}>1,523 kcal</Text>
                        </View>
                    </View>

                    <View style={styles.buttonGrid}>
                        <Pressable style={({ pressed }) => [
                            styles.squareButton,
                            { backgroundColor: pressed ? '#008098' : '#008080' },
                        ]} onPress={goToActivityScreen}>
                            <Text style={styles.buttonText}>Activity</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => [
                            styles.squareButton,
                            { backgroundColor: pressed ? '#008098' : '#008080' },
                        ]} onPress={goToMedicationsScreen}>
                            <Text style={styles.buttonText}>Medications</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => [
                            styles.squareButton,
                            { backgroundColor: pressed ? '#008098' : '#008080' },
                        ]} onPress={goToHeartScreen}>
                            <Text style={styles.buttonText}>Heart</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => [
                            styles.squareButton,
                            { backgroundColor: pressed ? '#008098' : '#008080' },
                        ]} onPress={goToNutritionScreen}>
                            <Text style={styles.buttonText}>Nutrition</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => [
                            styles.squareButton,
                            { backgroundColor: pressed ? '#008098' : '#008080' },
                        ]} onPress={goToRecordsScreen}>
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