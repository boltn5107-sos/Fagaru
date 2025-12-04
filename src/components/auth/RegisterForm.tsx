import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface RegisterFormProps {
  language: string;
  onRegister: (user: any) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ language, onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'citizen',
    zone: 'dakar',
    acceptTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const t = {
    wolof: {
      title: "Sàrtu",
      subtitle: "Sos kont bu bees ngir Fagaru",
      name: "Turu",
      email: "Email",
      phone: "Téléphone",
      password: "Baatu jàll",
      confirmPassword: "Dëggalal baatu jàll",
      role: "Rol",
      zone: "Gox",
      acceptTerms: "Nangu naa xeex yi ak kondisyon yi",
      register: "Sàrtu",
      haveAccount: "Am nga kont?",
      login: "Dugg",
      citizen: "Citoyen",
      asc: "ASC",
      icp: "ICP",
      medecinCentre: "Médecin Chef Centre",
      medecinDistrict: "Médecin Chef District",
      dakar: "Dakar",
      thies: "Thiès",
      saint_louis: "Saint-Louis",
      ziguinchor: "Ziguinchor",
      kaolack: "Kaolack",
      passwordsDontMatch: "Baatu jàll yi wàccul",
      acceptTermsRequired: "Laaj naa nangu xeex yi",
      registrationSuccess: "Sàrtu bi jàll na !"
    },
    french: {
      title: "S'inscrire",
      subtitle: "Créez votre compte Fagaru",
      name: "Nom complet",
      email: "Email",
      phone: "Téléphone",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      role: "Rôle",
      zone: "Zone",
      acceptTerms: "J'accepte les conditions d'utilisation",
      register: "S'inscrire",
      haveAccount: "Déjà un compte ?",
      login: "Se connecter",
      citizen: "Citoyen",
      asc: "ASC",
      icp: "ICP",
      medecinCentre: "Médecin Chef Centre",
      medecinDistrict: "Médecin Chef District",
      dakar: "Dakar",
      thies: "Thiès",
      saint_louis: "Saint-Louis",
      ziguinchor: "Ziguinchor",
      kaolack: "Kaolack",
      passwordsDontMatch: "Les mots de passe ne correspondent pas",
      acceptTermsRequired: "Vous devez accepter les conditions",
      registrationSuccess: "Inscription réussie !"
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert(text.passwordsDontMatch);
      return;
    }

    if (!formData.acceptTerms) {
      alert(text.acceptTermsRequired);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock JWT token
    const token = btoa(JSON.stringify({
      userId: formData.email,
      role: formData.role,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));

    const userData = {
      id: formData.email,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      zone: formData.zone,
      permissions: getPermissionsForRole(formData.role)
    };

    localStorage.setItem('fagaru_token', token);
    localStorage.setItem('fagaru_user', JSON.stringify(userData));

    alert(text.registrationSuccess);
    onRegister(userData);
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
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{text.title}</h1>
          <p className="text-slate-600">{text.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{text.name}</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10"
                placeholder="Amadou Diallo"
                required
              />
            </div>
          </div>

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
            <Label htmlFor="phone">{text.phone}</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-10"
                placeholder="+221 XX XXX XX XX"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{text.zone}</Label>
              <Select value={formData.zone} onValueChange={(value: string) => setFormData({ ...formData, zone: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dakar">{text.dakar}</SelectItem>
                  <SelectItem value="thies">{text.thies}</SelectItem>
                  <SelectItem value="saint_louis">{text.saint_louis}</SelectItem>
                  <SelectItem value="ziguinchor">{text.ziguinchor}</SelectItem>
                  <SelectItem value="kaolack">{text.kaolack}</SelectItem>
                </SelectContent>
              </Select>
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
            <Label htmlFor="confirmPassword">{text.confirmPassword}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-10 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
            />
            <Label htmlFor="acceptTerms" className="text-sm text-slate-600">
              {text.acceptTerms}
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === 'wolof' ? 'Sàrtu...' : 'Inscription...'}
              </div>
            ) : (
              text.register
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            {text.haveAccount}{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {text.login}
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
