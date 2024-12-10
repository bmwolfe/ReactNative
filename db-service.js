import SQLite from 'react-native-sqlcipher-storage';
import { generateEncryptionKey, saveEncryptionKey, getEncryptionKey } from './keyService';

let db = null; // Global variable for the database instance

const initializeDatabase = async () => {
  if (db) {
    // Return the existing database instance if already initialized

    return db;
  }

  const encryptionKey = await getEncryptionKey() || generateEncryptionKey();
  await saveEncryptionKey(encryptionKey);

  db = SQLite.openDatabase(
    { name: 'mydb_encrypted.db', key: encryptionKey },
    () => console.log('Encrypted database opened successfully'),
    (err) => console.error('Error opening database:', err)
  );
    //dropAllTables();
    createTables();

  return db;
};

const getDbInstance = () => {
  if (!db) {
    throw new Error('Database is not initialized. Call initializeDatabase first.');
  }
  return db;
};

// Function to create tables
const createTables = () => {
  db.transaction(tx => {
    // User Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_table (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
      );`
    );

    // Activity Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS activity_table (
        Activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
        steps INTEGER,
        distance INTEGER,
        activity INTEGER,
        log TEXT,
        user_table_user_id INTEGER NOT NULL,
        FOREIGN KEY (user_table_user_id) REFERENCES user_table (user_id)
      );`
    );

    // Heart Database Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS heart_table (
        heart_id INTEGER PRIMARY KEY AUTOINCREMENT,
        rate INTEGER,
        resting INTEGER,
        recovery INTEGER,
        user_table_user_id INTEGER NOT NULL,
        FOREIGN KEY (user_table_user_id) REFERENCES user_table (user_id)
      );`
    );

    // Medication Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS medication_table (
        med_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        Descrption TEXT,
        scheduled TINYINT,
        taken TINYINT,
        user_table_user_id INTEGER NOT NULL,
        FOREIGN KEY (user_table_user_id) REFERENCES user_table (user_id)
      );`
    );

    // Nutrition Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS nutrition_table (
        nutrition_id INTEGER PRIMARY KEY AUTOINCREMENT,
        goal INTEGER NOT NULL,
        consumed INTEGER,
        user_table_user_id INTEGER NOT NULL,
        FOREIGN KEY (user_table_user_id) REFERENCES user_table (user_id)
      );`
    );

    // Record Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS record_table (
        record_id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        doctor TEXT,
        diagonsis TEXT,
        user_table_user_id INTEGER NOT NULL,
        FOREIGN KEY (user_table_user_id) REFERENCES user_table (user_id)
      );`
    );
  });
};
// be careful only use if needed
const dropAllTables = () => {
  if (!db) {
      console.error('Database is not initialized. Call initializeDatabase first.');
      return;
    }

    db.transaction(tx => {
      const tables = [
        'user_table',
        'activity_table',
        'heart_database',
        'medication_table',
        'nutrition_table',
        'record_table'
      ];

      tables.forEach(table => {
        // Check if the table exists
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='${table}';`,
          [],
          (_, { rows }) => {
            if (rows.length > 0) {
              console.log(`Table ${table} exists, attempting to drop...`);
              tx.executeSql(
                `DROP TABLE ${table};`,
                [],
                () => console.log(`Dropped table: ${table}`),
                (_, error) => console.error(`Error dropping table ${table}:`, error.message || error)
              );
            } else {
              console.log(`Table ${table} does not exist.`);
            }
          },
          (_, error) => console.error(`Error checking table ${table}:`, error.message || error)
        );
      });
    });
  };

// Function to insert sample data
const insertSampleData = () => {
  db.transaction(tx => {
    // User Table
    tx.executeSql(`INSERT INTO user_table (username, password) VALUES (?, ?)`, ['user1', 'pass1']);
    tx.executeSql(`INSERT INTO user_table (username, password) VALUES (?, ?)`, ['user2', 'pass2']);
    tx.executeSql(`INSERT INTO user_table (username, password) VALUES (?, ?)`, ['user3', 'pass3']);
    tx.executeSql(`INSERT INTO user_table (username, password) VALUES (?, ?)`, ['user4', 'pass4']);
    tx.executeSql(`INSERT INTO user_table (username, password) VALUES (?, ?)`, ['user5', 'pass5']);

    // Activity Table
    tx.executeSql(`INSERT INTO activity_table (steps, distance, activity, user_table_user_id) VALUES (?, ?, ?, ?)`, [5000, 3, 1, 1]);
    tx.executeSql(`INSERT INTO activity_table (steps, distance, activity, user_table_user_id) VALUES (?, ?, ?, ?)`, [7000, 5, 2, 2]);
    tx.executeSql(`INSERT INTO activity_table (steps, distance, activity, user_table_user_id) VALUES (?, ?, ?, ?)`, [10000, 7, 3, 3]);
    tx.executeSql(`INSERT INTO activity_table (steps, distance, activity, user_table_user_id) VALUES (?, ?, ?, ?)`, [8000, 6, 4, 4]);
    tx.executeSql(`INSERT INTO activity_table (steps, distance, activity, user_table_user_id) VALUES (?, ?, ?, ?)`, [6000, 4, 2, 5]);

    // Heart Database Table
    tx.executeSql(`INSERT INTO heart_table (rate, resting, recovery, user_table_user_id) VALUES (?, ?, ?, ?)`, [120, 60, 80, 1]);
    tx.executeSql(`INSERT INTO heart_table (rate, resting, recovery, user_table_user_id) VALUES (?, ?, ?, ?)`, [130, 65, 85, 2]);
    tx.executeSql(`INSERT INTO heart_table (rate, resting, recovery, user_table_user_id) VALUES (?, ?, ?, ?)`, [110, 58, 78, 3]);
    tx.executeSql(`INSERT INTO heart_table (rate, resting, recovery, user_table_user_id) VALUES (?, ?, ?, ?)`, [125, 62, 83, 4]);
    tx.executeSql(`INSERT INTO heart_table (rate, resting, recovery, user_table_user_id) VALUES (?, ?, ?, ?)`, [115, 64, 82, 5]);

    // Medication Table
    tx.executeSql(`INSERT INTO medication_table (name, Descrption, scheduled, taken, user_table_user_id) VALUES (?, ?, ?, ?, ?)`, ['Medication A','Take 2 times a day', 1, 1, 1]);
    tx.executeSql(`INSERT INTO medication_table (name, Descrption, scheduled, taken, user_table_user_id) VALUES (?, ?, ?, ?, ?)`, ['Medication B','Take 2 times a day', 1, 0, 2]);
    tx.executeSql(`INSERT INTO medication_table (name, Descrption, scheduled, taken, user_table_user_id) VALUES (?, ?, ?, ?, ?)`, ['Medication C','Take 2 times a day', 0, 1, 3]);
    tx.executeSql(`INSERT INTO medication_table (name, Descrption, scheduled, taken, user_table_user_id) VALUES (?, ?, ?, ?, ?)`, ['Medication D', 'Take 2 times a day',1, 1, 4]);
    tx.executeSql(`INSERT INTO medication_table (name, Descrption, scheduled, taken, user_table_user_id) VALUES (?, ?, ?, ?, ?)`, ['Medication E','Take 2 times a day', 0, 0, 5]);

    // Nutrition Table
    tx.executeSql(`INSERT INTO nutrition_table (goal, consumed, user_table_user_id) VALUES ( ?, ?, ?)`, [2000, 1800, 1]);
    tx.executeSql(`INSERT INTO nutrition_table (goal, consumed, user_table_user_id) VALUES (?, ?, ?)`, [2500, 2200, 2]);
    tx.executeSql(`INSERT INTO nutrition_table (goal, consumed, user_table_user_id) VALUES (?, ?, ?)`, [1800, 1700, 3]);
    tx.executeSql(`INSERT INTO nutrition_table (goal, consumed, user_table_user_id) VALUES (?, ?, ?)`, [2100, 1900, 4]);
    tx.executeSql(`INSERT INTO nutrition_table (goal, consumed, user_table_user_id) VALUES (?, ?, ?)`, [2300, 2000, 5]);

    // Record Table
    tx.executeSql(`INSERT INTO record_table (date, doctor, diagonsis, user_table_user_id) VALUES (?, ?, ?, ?)`, ['2024-01-01', 'Dr. Smith', 'Flu', 1]);
    tx.executeSql(`INSERT INTO record_table (date, doctor, diagonsis, user_table_user_id) VALUES (?, ?, ?, ?)`, ['2024-02-15', 'Dr. Brown', 'Cold', 1]);
    tx.executeSql(`INSERT INTO record_table (date, doctor, diagonsis, user_table_user_id) VALUES (?, ?, ?, ?)`, ['2024-03-10', 'Dr. Lee', 'Allergy', 1]);
    tx.executeSql(`INSERT INTO record_table (date, doctor, diagonsis, user_table_user_id) VALUES (?, ?, ?, ?)`, ['2024-04-20', 'Dr. White', 'Injury', 4]);
    tx.executeSql(`INSERT INTO record_table (date, doctor, diagonsis, user_table_user_id) VALUES (?, ?, ?, ?)`, ['2024-05-05', 'Dr. Green', 'Routine Checkup', 5]);
  });
  console.log('Sample data inserted successfully');
};

// Export the database and initialization functions
console.log('initializeDatabase is being exported');
export { db, initializeDatabase, getDbInstance, createTables, insertSampleData, dropAllTables };
