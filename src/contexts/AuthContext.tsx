import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  zone: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration with pre-filled credentials
const MOCK_USERS = [
  {
    id: '1',
    name: 'Marie Diop',
    email: 'marie.diop@email.com',
    password: 'citizen123',
    role: 'citizen' as const,
    zone: 'Dakar',
    permissions: ['view_home', 'view_diseases', 'create_alert', 'take_quiz', 'view_map', 'view_notifications', 'view_profile'],
  },
  {
    id: '2',
    name: 'Dr. Amadou Faye',
    email: 'amadou.faye@medecin.sn',
    password: 'medecin123',
    role: 'medecinCentre' as const,
    zone: 'Thiès',
    permissions: ['view_home', 'view_dashboard', 'view_predictive', 'view_alerts', 'view_map', 'view_profile'],
  },
  {
    id: '3',
    name: 'Fatou Ndiaye',
    email: 'fatou.ndiaye@asc.sn',
    password: 'asc123',
    role: 'asc' as const,
    zone: 'Kaolack',
    permissions: ['view_home', 'view_dashboard', 'create_alert', 'view_map', 'view_notifications', 'view_profile'],
  },
  {
    id: '4',
    name: 'Admin System',
    email: 'admin@fagaru.sn',
    password: 'admin123',
    role: 'admin' as const,
    zone: 'National',
    permissions: ['all_permissions'],
  },
  {
    id: '5',
    name: 'Dr. Omar Sow',
    email: 'omar.sow@medecin.sn',
    password: 'district123',
    role: 'medecinDistrict' as const,
    zone: 'Saint-Louis',
    permissions: ['view_home', 'view_dashboard', 'view_predictive', 'view_alerts', 'view_dhis2', 'view_map', 'view_profile'],
  },
  {
    id: '6',
    name: 'Aïssatou Diallo',
    email: 'aissatou.diallo@icp.sn',
    password: 'icp123',
    role: 'icp' as const,
    zone: 'Ziguinchor',
    permissions: ['view_home', 'view_dashboard', 'view_map', 'view_notifications', 'view_profile'],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('fagaru_token');
    const userData = localStorage.getItem('fagaru_user');

    if (token && userData) {
      try {
        const parsedToken = JSON.parse(atob(token));
        const currentTime = Date.now();

        // Check if token is expired
        if (parsedToken.exp > currentTime) {
          setUser(JSON.parse(userData));
        } else {
          // Token expired, clear storage
          localStorage.removeItem('fagaru_token');
          localStorage.removeItem('fagaru_user');
        }
      } catch (error) {
        // Invalid token/user data, clear storage
        localStorage.removeItem('fagaru_token');
        localStorage.removeItem('fagaru_user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    // Find user by email and password
    const foundUser = MOCK_USERS.find(user => user.email === email && user.password === password);

    if (foundUser) {
      // Create JWT-like token (simplified for demo)
      const token = btoa(JSON.stringify({
        userId: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }));

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;

      setUser(userWithoutPassword);
      localStorage.setItem('fagaru_token', token);
      localStorage.setItem('fagaru_user', JSON.stringify(userWithoutPassword));

      return { success: true };
    } else {
      return { success: false, error: 'Email ou mot de passe incorrect' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fagaru_token');
    localStorage.removeItem('fagaru_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('fagaru_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
