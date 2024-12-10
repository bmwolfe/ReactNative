import { getDbInstance } from './db-service';
import { getGlobalUserId } from './globalState';

const db = getDbInstance();

// Query wrapper to execute SQL
const executeQuery = async (sql, params = [], onSuccess = () => {}, onError = () => {}) => {
  if (!db) {
    console.error('Database is not initialized.');
    return;
  }

  const userId = getGlobalUserId();
  if (!userId) {
    console.error('No user ID found. Ensure the user is logged in.');
    return;
  }

  // Replace hardcoded user ID in queries
  const dynamicParams = params.map(param => (param === '$userId' ? userId : param));

  db.transaction(tx => {
    tx.executeSql(
      sql,
      dynamicParams,
      (_, { rows }) => onSuccess(rows),
      (_, error) => {
        console.error('Query Error:', error.message || error);
        onError(error);
      }
    );
  });
};


// Fetch Steps
export const fetchSteps = (onSuccess, onError) => {
  const sql = `SELECT steps FROM activity_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// Fetch Consumed Calories
export const fetchCalories = (onSuccess, onError) => {
  const sql = `SELECT consumed FROM nutrition_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// Fetch Average Heart Rate
export const fetchAvgHeartRate = (onSuccess, onError) => {
  const sql = `SELECT rate FROM heart_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// Fetch Distance
export const fetchDistance = (onSuccess, onError) => {
  const sql = `SELECT distance FROM activity_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// Fetch Time
export const fetchTime = (onSuccess, onError) => {
  const sql = `SELECT time FROM activity_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// Fetch Activity
export const fetchActivity = (onSuccess, onError) => {
  const sql = `SELECT activity FROM activity_table WHERE user_table_user_id = $userId`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// Insert New Activity
export const insertActivity = (activity, onSuccess, onError) => {
  const sql = `INSERT INTO activity_table (activity, user_table_user_id) VALUES (?, $userId)`;
  executeQuery(sql, [activity, '$userId'], onSuccess, onError);
};

// Fetch Medication Name
export const fetchMedicationNames = (onSuccess, onError) => {
  const sql = `SELECT name FROM medication_table WHERE user_table_user_id = $userId`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// Fetch Medication description
export const fetchMedicationDescription = (onSuccess, onError) => {
  const sql = `SELECT description FROM medication_table WHERE user_table_user_id = $userId`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// insert new medication
export const insertMedication = (name, description, onSuccess, onError) => {
  const sql = `INSERT INTO medication_table (name, description, scheduled, user_table_user_id) VALUES (?, ?, ?, $userId)`;
  executeQuery(sql, [name, description, scheduled, '$userId'], onSuccess, onError);
};

// log that medication was taken
export const logMedication = (medId, onSuccess, onError) => {
  const sql = `UPDATE medication_table SET taken = 1 WHERE med_id = ? AND user_table_user_id = $userId`;
  executeQuery(sql, [medId, '$userId'], onSuccess, onError);
};

// peak heart rate (rate with max)
export const fetchPeakHeartRate = (onSuccess, onError) => {
  const sql = `SELECT MAX(rate) FROM heart_table WHERE user_table_user_id = $userId`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// resting heart rate
export const fetchRestingHeartRate = (onSuccess, onError) => {
  const sql = `SELECT resting FROM heart_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// recovery heart rate
export const fetchRecoveryHeartRate = (onSuccess, onError) => {
  const sql = `SELECT recovery FROM heart_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// insert resting heart rate
export const insertRestingHeartRate = (rate, onSuccess, onError) => {
  const sql = `INSERT INTO heart_table (resting, user_table_user_id) VALUES (?, $userId)`;
  executeQuery(sql, [rate, '$userId'], onSuccess, onError);
};

// insert heart rate
export const insertHeartRate = (rate, onSuccess, onError) => {
  const sql = `INSERT INTO heart_table (rate, user_table_user_id) VALUES (?, $userId)`;
  executeQuery(sql, [rate, '$userId'], onSuccess, onError);
};

// fetch goal calories
export const fetchGoalCalories = (onSuccess, onError) => {
  const sql = `SELECT goal FROM nutrition_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// insert goal calories
export const insertGoalCalories = (goal, onSuccess, onError) => {
  const sql = `INSERT INTO nutrition_table (goal, user_table_user_id) VALUES (?, $userId)`;
  executeQuery(sql, [goal, '$userId'], onSuccess, onError);
};

// insert consumed calories
export const insertConsumedCalories = (consumed, onSuccess, onError) => {
  const sql = `INSERT INTO nutrition_table (consumed, user_table_user_id) VALUES (?, $userId)`;
  executeQuery(sql, [consumed, '$userId'], onSuccess, onError);
};

// fetch remaing calories from goal
export const fetchRemainingCalories = (onSuccess, onError) => {
  const sql = `SELECT goal - consumed FROM nutrition_table WHERE user_table_user_id = $userId LIMIT 1`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};

// fetch all data in medical record
export const fetchMedicalRecords = (onSuccess, onError) => {
  const sql = `SELECT DISTINCT date, doctor, diagonsis
               FROM record_table
               WHERE user_table_user_id = $userId
               ORDER BY date DESC`;
  executeQuery(sql, ['$userId'], onSuccess, onError);
};




