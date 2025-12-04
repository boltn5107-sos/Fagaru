import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield, User, Info } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface LoginFormProps {
  language: string;
  onLogin: (user: any) => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ language, onLogin, onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'citizen'
  });
  const [isLoading, setIsLoading] = useState(false);

  const t = {
    wolof: {
      title: "Se connecter",
      subtitle: "Dugg ci sa kont ngir kontinew",
      email: "Email",
      password: "Baatu jàll",
      role: "Rol",
      login: "Dugg",
      noAccount: "Amul kont?",
      register: "Sàrtu",
      citizen: "Citoyen",
      asc: "ASC",
      icp: "ICP",
      medecinCentre: "Médecin Chef Centre",
      medecinDistrict: "Médecin Chef District",
      admin: "Admin",
      emailRequired: "Email laa laaj",
      passwordRequired: "Baatu jàll laa laaj",
      invalidCredentials: "Email walla baatu jàll bu baaxul",
      demoTitle: "Kont yi ñu jëfandikoo",
      demoPassword: "Baatu jàll: "
    },
    french: {
      title: "Se connecter",
      subtitle: "Connectez-vous pour continuer",
      email: "Email",
      password: "Mot de passe",
      role: "Rôle",
      login: "Se connecter",
      noAccount: "Pas de compte ?",
      register: "S'inscrire",
      citizen: "Citoyen",
      asc: "ASC",
      icp: "ICP",
      medecinCentre: "Médecin Chef Centre",
      medecinDistrict: "Médecin Chef District",
      admin: "Admin",
      emailRequired: "L'email est requis",
      passwordRequired: "Le mot de passe est requis",
      invalidCredentials: "Email ou mot de passe incorrect",
      demoTitle: "Comptes de démonstration",
      demoPassword: "Mot de passe: "
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  // Demo users matching AuthContext MOCK_USERS
  const demoUsers = [
    { email: 'marie.diop@email.com', password: 'citizen123', role: 'citizen', name: 'Marie Diop' },
    { email: 'fatou.ndiaye@asc.sn', password: 'asc123', role: 'asc', name: 'Fatou Ndiaye' },
    { email: 'aissatou.diallo@icp.sn', password: 'icp123', role: 'icp', name: 'Aïssatou Diallo' },
    { email: 'amadou.faye@medecin.sn', password: 'medecin123', role: 'medecinCentre', name: 'Dr. Amadou Faye' },
    { email: 'omar.sow@medecin.sn', password: 'district123', role: 'medecinDistrict', name: 'Dr. Omar Sow' },
    { email: 'admin@fagaru.sn', password: 'admin123', role: 'admin', name: 'Admin System' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = demoUsers.find((u: typeof demoUsers[0]) => u.email === formData.email && u.password === formData.password);

    if (user) {
      // Generate mock JWT token
      const token = btoa(JSON.stringify({
        userId: user.email,
        role: user.role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }));

      const userData = {
        id: user.email,
        name: user.name,
        email: user.email,
        role: user.role,
        zone: 'Dakar', // Mock zone
        permissions: getPermissionsForRole(user.role)
      };

      localStorage.setItem('fagaru_token', token);
      localStorage.setItem('fagaru_user', JSON.stringify(userData));

      onLogin(userData);
    } else {
      alert(text.invalidCredentials);
    }

    setIsLoading(false);
  };

  const getPermissionsForRole = (role: string) => {
    const permissions = {
      citizen: ['create_alert', 'view_own_alerts', 'take_quiz', 'view_education'],
      asc: ['create_alert', 'validate_alerts', 'view_local_alerts', 'generate_reports'],
      icp: ['validate_alerts', 'escalate_alerts', 'manage_asc', 'view_district_data'],
      medecinCentre: ['validate_alerts', 'escalate_alerts', 'manage_icp', 'view_regional_data'],
      medecinDistrict: ['validate_alerts', 'escalate_alerts', 'coordinate_response', 'view_national_data'],
      admin: ['all_permissions', 'manage_users', 'system_config']
    };
    return permissions[role as keyof typeof permissions] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-2 border-emerald-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{text.title}</h1>
          <p className="text-slate-600">{text.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">{text.email}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                placeholder="exemple@fagaru.sn"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{text.password}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{text.role}</Label>
            <Select value={formData.role} onValueChange={(value: string) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="citizen">{text.citizen}</SelectItem>
                <SelectItem value="asc">{text.asc}</SelectItem>
                <SelectItem value="icp">{text.icp}</SelectItem>
                <SelectItem value="medecinCentre">{text.medecinCentre}</SelectItem>
                <SelectItem value="medecinDistrict">{text.medecinDistrict}</SelectItem>
                <SelectItem value="admin">{text.admin}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === 'wolof' ? 'Duggee...' : 'Connexion...'}
              </div>
            ) : (
              text.login
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            {text.noAccount}{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {text.register}
            </button>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-medium text-blue-800">
              {text.demoTitle}
            </h4>
          </div>
          <div className="space-y-2 text-xs text-blue-700">
            {demoUsers.map((user, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <div>
                  <span className="font-medium">{user.name}</span>
                  <span className="text-blue-600 ml-1">({user.role})</span>
                </div>
                <div className="text-right">
                  <div className="font-mono">{user.email}</div>
                  <div className="text-blue-600">{text.demoPassword}{user.password}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
