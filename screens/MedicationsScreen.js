import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Header() {
    return (
        <LinearGradient
            colors={['#0066CC', '#0099FF']}
            style={styles.header}
        >
            <Text style={styles.headerTitle}>Medications</Text>
        </LinearGradient>
    );
}

function MedicationsScreen() {
    const [medications, setMedications] = useState([
        { name: "Aspirin", scheduled: true, taken: false, info: "For headache relief, 2 weeks" },
        { name: "Vitamin D", scheduled: false, taken: true, info: "For bone health, 1 month" }
    ]);
    const [newMed, setNewMed] = useState("");
    const [newMedInfo, setNewMedInfo] = useState("");
    const [newMedScheduled, setNewMedScheduled] = useState(false);

    // Log medication as taken
    const logMedication = (index) => {
        const updatedMeds = medications.map((med, i) =>
            i === index ? { ...med, taken: true } : med
        );
        setMedications(updatedMeds);
    };

    // Add new medication
    const addMedication = () => {
        setMedications([
            ...medications,
            { name: newMed, scheduled: newMedScheduled, taken: false, info: newMedInfo }
        ]);
        setNewMed("");
        setNewMedInfo("");
        setNewMedScheduled(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>

                {/* Display Current Medications */}
                <Text style={styles.sectionTitle}>Your Medications</Text>
                {medications.map((med, index) => (
                    <View key={index} style={styles.medContainer}>
                        <Text style={styles.medName}>{med.name}</Text>
                        <Text style={styles.medInfo}>Info: {med.info}</Text>
                        <Text style={styles.medStatus}>
                            {med.scheduled ? "Scheduled" : "Not Scheduled"} |{" "}
                            {med.taken ? "Taken" : "Not Taken"}
                        </Text>
                        <Button
                            title="Log as Taken"
                            color="#0059b3"
                            onPress={() => logMedication(index)}
                            disabled={med.taken}
                        />
                    </View>
                ))}

                {/* Add New Medication */}
                <Text style={styles.sectionTitle}>Schedule New Medication</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Medication Name"
                    value={newMed}
                    onChangeText={setNewMed}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Purpose and Duration (e.g., Pain Relief, 2 weeks)"
                    value={newMedInfo}
                    onChangeText={setNewMedInfo}
                />
                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>Is this medication scheduled?</Text>
                    <TouchableOpacity
                        onPress={() => setNewMedScheduled(!newMedScheduled)}
                        style={newMedScheduled ? styles.checkboxChecked : styles.checkboxUnchecked}
                    />
                </View>
                <Button title="Add Medication" color="#0059b3" onPress={addMedication} />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#E3F2FD',
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
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    container: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#0059b3',
        marginVertical: 10,
    },
    medContainer: {
        backgroundColor: '#BBDEFB',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    medName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0D47A1',
    },
    medInfo: {
        fontSize: 16,
        color: '#0D47A1',
    },
    medStatus: {
        fontSize: 16,
        color: '#0D47A1',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderColor: '#64B5F6',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#0059b3',
    },
    checkboxChecked: {
        width: 24,
        height: 24,
        backgroundColor: '#0059b3',
        marginLeft: 10,
        borderRadius: 5,
    },
    checkboxUnchecked: {
        width: 24,
        height: 24,
        backgroundColor: '#E0E0E0',
        marginLeft: 10,
        borderRadius: 5,
    },
});

export default MedicationsScreen;
