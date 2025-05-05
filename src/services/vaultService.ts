
import { PasswordItemProps } from '@/components/PasswordItem';

// Mock encryption/decryption functions
// In a real app, you would use a proper encryption library
const encrypt = (text: string, masterKey: string): string => {
  // This is a placeholder for real encryption
  return btoa(text + masterKey);
};

const decrypt = (encryptedText: string, masterKey: string): string => {
  // This is a placeholder for real decryption
  const decoded = atob(encryptedText);
  return decoded.substring(0, decoded.length - masterKey.length);
};

// Local storage key
const VAULT_STORAGE_KEY = 'secure_vault_data';

// Mock master password - in a real app, this would be securely derived from user input
let mockMasterPassword = 'master123';

// Password strength evaluation
export const evaluatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (!password) return 'weak';
  
  let score = 0;
  
  // Length check
  if (password.length >= 12) {
    score += 2;
  } else if (password.length >= 8) {
    score += 1;
  }
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 2;
  
  // Classify based on score
  if (score < 3) return 'weak';
  if (score < 5) return 'medium';
  return 'strong';
};

// Initialize with demo data
const initializeVault = (): PasswordItemProps[] => {
  const demoPasswords: PasswordItemProps[] = [
    {
      id: '1',
      title: 'Gmail',
      username: 'user@gmail.com',
      password: 'P@ssw0rd123',
      url: 'gmail.com',
      strength: evaluatePasswordStrength('P@ssw0rd123'),
      lastUpdated: '2023-10-15'
    },
    {
      id: '2',
      title: 'Facebook',
      username: 'user.name',
      password: 'FB_secure789!',
      url: 'facebook.com',
      strength: evaluatePasswordStrength('FB_secure789!'),
      lastUpdated: '2023-11-22'
    },
    {
      id: '3',
      title: 'Amazon',
      username: 'amazon_user',
      password: 'shop123',
      url: 'amazon.com',
      strength: evaluatePasswordStrength('shop123'),
      lastUpdated: '2023-09-05'
    },
    {
      id: '4',
      title: 'Twitter',
      username: 'twitter_handle',
      password: 'Tweet!2023Secure',
      url: 'twitter.com',
      strength: evaluatePasswordStrength('Tweet!2023Secure'),
      lastUpdated: '2023-12-01'
    },
    {
      id: '5',
      title: 'Netflix',
      username: 'netflix_user',
      password: 'NetflixAndChill2023!',
      url: 'netflix.com',
      strength: evaluatePasswordStrength('NetflixAndChill2023!'),
      lastUpdated: '2023-11-10'
    }
  ];
  
  return demoPasswords;
};

// Save vault data to local storage (encrypted)
const saveVaultData = (data: PasswordItemProps[]) => {
  try {
    const serialized = JSON.stringify(data);
    const encrypted = encrypt(serialized, mockMasterPassword);
    localStorage.setItem(VAULT_STORAGE_KEY, encrypted);
    return true;
  } catch (error) {
    console.error('Error saving vault data:', error);
    return false;
  }
};

// Load vault data from local storage (decrypt)
const loadVaultData = (): PasswordItemProps[] => {
  try {
    const encrypted = localStorage.getItem(VAULT_STORAGE_KEY);
    if (!encrypted) {
      // Initialize with demo data if no vault exists
      const initialData = initializeVault();
      saveVaultData(initialData);
      return initialData;
    }
    
    const decrypted = decrypt(encrypted, mockMasterPassword);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Error loading vault data:', error);
    return [];
  }
};

// Get all passwords
export const getAllPasswords = (): PasswordItemProps[] => {
  return loadVaultData();
};

// Add a new password
export const addPassword = (passwordData: Omit<PasswordItemProps, 'id' | 'strength' | 'lastUpdated'>): PasswordItemProps => {
  const passwords = loadVaultData();
  
  const newPassword: PasswordItemProps = {
    ...passwordData,
    id: Date.now().toString(),
    strength: evaluatePasswordStrength(passwordData.password),
    lastUpdated: new Date().toISOString().split('T')[0]
  };
  
  passwords.push(newPassword);
  saveVaultData(passwords);
  
  return newPassword;
};

// Update existing password
export const updatePassword = (id: string, data: Partial<PasswordItemProps>): boolean => {
  const passwords = loadVaultData();
  const index = passwords.findIndex(p => p.id === id);
  
  if (index === -1) return false;
  
  // If password was changed, recalculate strength and update last updated date
  if (data.password && data.password !== passwords[index].password) {
    data.strength = evaluatePasswordStrength(data.password);
    data.lastUpdated = new Date().toISOString().split('T')[0];
  }
  
  passwords[index] = { ...passwords[index], ...data };
  return saveVaultData(passwords);
};

// Delete password
export const deletePassword = (id: string): boolean => {
  const passwords = loadVaultData();
  const filteredPasswords = passwords.filter(p => p.id !== id);
  
  if (filteredPasswords.length === passwords.length) return false;
  
  return saveVaultData(filteredPasswords);
};

// Get security insights
export const getSecurityInsights = () => {
  const passwords = loadVaultData();
  const totalPasswords = passwords.length;
  
  // Count weak passwords
  const weakPasswords = passwords.filter(p => p.strength === 'weak').length;
  
  // Count potentially reused passwords (simple implementation)
  const passwordMap = new Map<string, number>();
  passwords.forEach(p => {
    passwordMap.set(p.password, (passwordMap.get(p.password) || 0) + 1);
  });
  const reusedPasswords = passwords.filter(p => (passwordMap.get(p.password) || 0) > 1).length;
  
  // Count old passwords (older than 90 days)
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const ninetyDaysAgoStr = ninetyDaysAgo.toISOString().split('T')[0];
  
  const oldPasswords = passwords.filter(p => p.lastUpdated < ninetyDaysAgoStr).length;
  
  // Calculate security score (simplified)
  const weakPercentage = totalPasswords > 0 ? (weakPasswords / totalPasswords) * 100 : 0;
  const reusedPercentage = totalPasswords > 0 ? (reusedPasswords / totalPasswords) * 100 : 0;
  const oldPercentage = totalPasswords > 0 ? (oldPasswords / totalPasswords) * 100 : 0;
  
  const securityScore = Math.max(0, 100 - weakPercentage - (reusedPercentage / 2) - (oldPercentage / 4));
  
  return {
    totalPasswords,
    weakPasswords,
    reusedPasswords,
    oldPasswords,
    securityScore: Math.round(securityScore)
  };
};

// Change master password
export const changeMasterPassword = (oldPassword: string, newPassword: string): boolean => {
  if (oldPassword !== mockMasterPassword) return false;
  
  try {
    // Get current data with old password
    const currentData = loadVaultData();
    
    // Update mock master password
    mockMasterPassword = newPassword;
    
    // Re-save data with new password
    return saveVaultData(currentData);
  } catch (error) {
    console.error('Error changing master password:', error);
    return false;
  }
};
