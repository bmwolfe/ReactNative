import * as Keychain from 'react-native-keychain';

// Function to generate a secure encryption key
const generateEncryptionKey = () => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  const length = 32; // 256-bit key (32 characters)
  let key = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    key += charset[randomIndex];
  }
  return key;
};

// Function to save the encryption key securely
const saveEncryptionKey = async (key) => {
  await Keychain.setGenericPassword('db-encryption-key', key);
  console.log('Encryption key saved securely');
};

// Function to retrieve the encryption key
const getEncryptionKey = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return credentials.password; // The encryption key
  } else {
    console.warn('No encryption key found');
    return null;
  }
};

export { generateEncryptionKey, saveEncryptionKey, getEncryptionKey };
