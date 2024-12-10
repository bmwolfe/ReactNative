import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import { getDbInstance } from '../db-service'; // Import the database service
import { setGlobalUserId } from '../globalState'; // Import a function to set global user ID

function LoginScreen({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const db = getDbInstance();

        db.transaction(tx => {
            tx.executeSql(
                `SELECT user_id FROM user_table WHERE LOWER(username) = LOWER(?) AND password = ?`,
                [username, password],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const userId = rows.item(0).user_id;
                        setGlobalUserId(userId); // Set the global user ID
                        onLogin(); // Call the onLogin function
                    } else {
                        Alert.alert('Login Failed', 'Invalid credentials');
                    }
                },
                (txObj, error) => {
                    console.error('Error executing SQL query:', error.message || error);
                    Alert.alert('Error', 'Something went wrong. Please try again.');
                }
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#E8F5E9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderColor: '#4CAF50',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});

export default LoginScreen;
