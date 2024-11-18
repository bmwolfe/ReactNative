import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList,
    useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Medical Records</Text>
        </View>
    );
}

function RecordsScreen() {
    const [records, setRecords] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : '#E8F5E9',
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        const data = [
            { id: '1', date: '2024-10-15', doctor: 'Dr. John Doe', diagnosis: 'Hypertension' },
            { id: '2', date: '2024-11-05', doctor: 'Dr. Lisa Chen', diagnosis: 'Annual Checkup' },
        ];
        setRecords(data);
    };

    const renderRecord = ({ item }) => (
        <View style={styles.recordContainer}>
            <Text style={styles.recordDate}>Date: {item.date}</Text>
            <Text style={styles.recordDoctor}>Doctor: {item.doctor}</Text>
            <Text style={styles.recordDiagnosis}>Diagnosis: {item.diagnosis}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
            <Header />
            <FlatList
                data={records}
                renderItem={renderRecord}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContentContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        backgroundColor: '#4CAF50',
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
    recordContainer: {
        backgroundColor: '#C8E6C9',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    recordDate: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#388E3C',
    },
    recordDoctor: {
        fontSize: 16,
        color: '#4CAF50',
    },
    recordDiagnosis: {
        fontSize: 16,
        color: '#4CAF50',
    },
    flatListContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});

export default RecordsScreen;