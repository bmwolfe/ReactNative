import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { fetchMedicalRecords } from '../queryService'; // Import dynamic query

function Header() {
    return (
        <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            <Text style={styles.headerTitle}>Medical Records</Text>
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

function MedicalRecordsScreen() {
    const [records, setRecords] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : '#FDF5E6' };

    useEffect(() => {
    fetchMedicalRecords(
        (rows) => {
            if (rows && rows._array && rows._array.length > 0) {
                setRecords(rows._array);
            } else {
                console.log('No medical records found.');
                setRecords([]);
            }
        },
        (error) => console.error('Error fetching medical records:', error)
    );
    }, []);

    return (
        <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Header />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <View style={styles.container}>
                    <Section title="Your Medical Records">
                        View and track your medical history here.
                    </Section>
                    {records.length > 0 ? (
                        records.map((record, index) => (
                            <View key={index} style={styles.recordBox}>
                                <Text style={styles.recordText}>
                                    <Text style={styles.recordLabel}>Date:</Text> {record.date}
                                </Text>
                                <Text style={styles.recordText}>
                                    <Text style={styles.recordLabel}>Doctor:</Text> {record.doctor}
                                </Text>
                                <Text style={styles.recordText}>
                                    <Text style={styles.recordLabel}>Diagnosis:</Text> {record.diagnosis}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noRecordsText}>No records available.</Text>
                    )}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { paddingHorizontal: 20, paddingVertical: 20 },
    header: {
        padding: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    sectionContainer: { marginTop: 20, paddingHorizontal: 24 },
    sectionTitle: { fontSize: 22, fontWeight: '600', color: '#333333' },
    sectionDescription: { marginTop: 8, fontSize: 16, fontWeight: '400', color: '#333333' },
    recordBox: {
        backgroundColor: '#C8E6C9',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    recordText: { fontSize: 16, color: '#2E7D32', marginBottom: 5 },
    recordLabel: { fontWeight: 'bold' },
    noRecordsText: { fontSize: 16, color: '#666666', textAlign: 'center', marginTop: 20 },
});

export default MedicalRecordsScreen;
