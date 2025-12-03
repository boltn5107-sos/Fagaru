import { User, MapPin, Globe, Download, Wifi, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ProfilePageProps {
  language: string;
}

export default function ProfilePage({ language }: ProfilePageProps) {
  const t = {
    wolof: {
      title: "Sa Profil",
      personalInfo: "Ay xibaar yu metti",
      name: "Tur",
      age: "At",
      gender: "Jinne",
      male: "Góor",
      female: "Jigéen",
      profession: "Liggéey",
      location: "Fan nga jóge",
      settings: "Paramètres",
      language: "Làkk",
      offlineMode: "Liggéey bu amul internet",
      allowLocation: "Jagleel sa bopp",
      notifications: "Ay xibaar",
      save: "Duggal",
      healthWorker: "Doxandekat wér-gu-yaram",
      citizen: "Nit u réew",
      region: "Gox",
      dakar: "Dakar",
      thies: "Thiès",
      saint_louis: "Saint-Louis"
    },
    french: {
      title: "Mon Profil",
      personalInfo: "Informations personnelles",
      name: "Nom",
      age: "Âge",
      gender: "Genre",
      male: "Homme",
      female: "Femme",
      profession: "Profession",
      location: "Localisation",
      settings: "Paramètres",
      language: "Langue",
      offlineMode: "Mode hors ligne",
      allowLocation: "Autoriser la géolocalisation",
      notifications: "Notifications",
      save: "Enregistrer",
      healthWorker: "Agent de santé",
      citizen: "Citoyen",
      region: "Région",
      dakar: "Dakar",
      thies: "Thiès",
      saint_louis: "Saint-Louis"
    }
  };

  const text = t[language as keyof typeof t] || t.wolof;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-emerald-700 mb-2 flex items-center gap-3">
          <User className="w-8 h-8" />
          {text.title}
        </h1>
      </div>

      {/* Photo de profil */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
          <User className="w-16 h-16 text-white" />
        </div>
      </div>

      {/* Informations personnelles */}
      <Card className="p-6 mb-6 border-emerald-200">
        <h2 className="text-emerald-700 mb-6">{text.personalInfo}</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-slate-700">{text.name}</Label>
            <Input id="name" defaultValue="Aminata Diallo" className="mt-2 border-emerald-300 focus:border-emerald-500" />
          </div>

          <div>
            <Label htmlFor="age" className="text-slate-700">{text.age}</Label>
            <Input id="age" type="number" defaultValue="28" className="mt-2 border-emerald-300 focus:border-emerald-500" />
          </div>

          <div>
            <Label htmlFor="gender" className="text-slate-700">{text.gender}</Label>
            <Select defaultValue="female">
              <SelectTrigger className="mt-2 border-emerald-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">{text.female}</SelectItem>
                <SelectItem value="male">{text.male}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="profession" className="text-slate-700">{text.profession}</Label>
            <Select defaultValue="health">
              <SelectTrigger className="mt-2 border-emerald-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">{text.healthWorker}</SelectItem>
                <SelectItem value="citizen">{text.citizen}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="location" className="text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {text.location}
            </Label>
            <Select defaultValue="dakar">
              <SelectTrigger className="mt-2 border-emerald-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dakar">{text.dakar}</SelectItem>
                <SelectItem value="thies">{text.thies}</SelectItem>
                <SelectItem value="saint_louis">{text.saint_louis}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Paramètres */}
      <Card className="p-6 border-blue-200">
        <h2 className="text-blue-700 mb-6">{text.settings}</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-slate-900">{text.language}</p>
                <p className="text-slate-500 text-sm">Wolof / Français</p>
              </div>
            </div>
            <Select defaultValue="wolof">
              <SelectTrigger className="w-32 border-blue-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wolof">Wolof</SelectItem>
                <SelectItem value="french">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-slate-900">{text.offlineMode}</p>
                <p className="text-slate-500 text-sm">Télécharger le contenu</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-slate-900">{text.allowLocation}</p>
                <p className="text-slate-500 text-sm">Pour les alertes locales</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-slate-900">{text.notifications}</p>
                <p className="text-slate-500 text-sm">Recevoir les alertes</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-12 hover:from-emerald-700 hover:to-blue-700">
          <Save className="w-5 h-5 mr-2" />
          {text.save}
        </Button>
      </div>
    </div>
  );
}
