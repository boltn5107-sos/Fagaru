import { useState } from 'react';
import { MapPin, Crosshair, AlertCircle, CheckCircle2, Send, Camera, Thermometer, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

interface GeoReportPageProps {
  language: string;
}

export default function GeoReportPage({ language }: GeoReportPageProps) {
  const [step, setStep] = useState<'form' | 'location' | 'review' | 'success'>('form');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    symptoms: '',
    severity: '',
    description: '',
    contact: ''
  });

  const t = {
    wolof: {
      title: "Tànnal bu Bees",
      subtitle: "Joxe lu nga gis walla lu nga am",
      step1: "Étape 1: Xalaat",
      step2: "Étape 2: Bopp",
      step3: "Étape 3: Xoolal",
      whatHappened: "Lan la gis?",
      selectType: "Tann njëkk",
      symptomReport: "Simptoom",
      incidentReport: "Jangor",
      observation: "Xool-xool",
      describeSymptoms: "Bataaxal simptoom yi",
      severity: "Mag nga?",
      mild: "Amul lu bare",
      moderate: "Njëkk-njëkk",
      severe: "Am solo lool",
      additionalInfo: "Yeneen xalaat",
      contact: "Namero telefon (bu am solo)",
      getLocation: "Jël sa bopp",
      locating: "Dafa seet sa bopp...",
      locationFound: "Bopp bi am na!",
      selectManually: "Tann sa bopp ci kaart",
      latitude: "Latitude",
      longitude: "Longitude",
      review: "Xoolal sa tànnal",
      reportType: "Njëkk bu tànnal",
      location: "Bopp",
      send: "Yónne",
      back: "Dellu",
      success: "Tànnal bi dafa yónne am succès!",
      successDesc: "Ñu ngi xool sa tànnal. Yalla na yépp yomb bu baax.",
      newReport: "Tànnal bu bees",
      close: "Taxaw",
      locationHelp: "Dinaa jàpp sa bopp ngir ay autorités yi gën a xool zone bi am solo",
      dragMarker: "Déplasé marqueur bi ngir xoolal sa bopp bu baax"
    },
    french: {
      title: "Signalement Géolocalisé",
      subtitle: "Signalez ce que vous observez ou ressentez",
      step1: "Étape 1: Informations",
      step2: "Étape 2: Localisation",
      step3: "Étape 3: Vérification",
      whatHappened: "Que s'est-il passé?",
      selectType: "Type de signalement",
      symptomReport: "Symptômes",
      incidentReport: "Incident sanitaire",
      observation: "Observation générale",
      describeSymptoms: "Décrivez les symptômes",
      severity: "Gravité",
      mild: "Léger",
      moderate: "Modéré",
      severe: "Sévère",
      additionalInfo: "Informations supplémentaires",
      contact: "Numéro de contact (optionnel)",
      getLocation: "Obtenir ma position",
      locating: "Localisation en cours...",
      locationFound: "Position trouvée!",
      selectManually: "Sélectionner manuellement",
      latitude: "Latitude",
      longitude: "Longitude",
      review: "Vérifier le signalement",
      reportType: "Type de signalement",
      location: "Localisation",
      send: "Envoyer",
      back: "Retour",
      success: "Signalement envoyé avec succès!",
      successDesc: "Votre signalement a été transmis aux autorités sanitaires. Merci de votre contribution.",
      newReport: "Nouveau signalement",
      close: "Fermer",
      locationHelp: "Votre position aide les autorités à identifier les zones à risque",
      dragMarker: "Glissez le marqueur pour ajuster votre position"
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  const getLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Set default location (Dakar center) if geolocation fails
          setLocation({ lat: 14.6928, lng: -17.4467 });
          setIsLocating(false);
        }
      );
    } else {
      // Fallback to Dakar center
      setLocation({ lat: 14.6928, lng: -17.4467 });
      setIsLocating(false);
    }
  };

  const handleSubmit = () => {
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <Card className="p-8 text-center border-2 border-emerald-200">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-emerald-700 mb-3">{text.success}</h2>
          <p className="text-slate-600 mb-8">{text.successDesc}</p>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => {
                setStep('form');
                setFormData({ type: '', symptoms: '', severity: '', description: '', contact: '' });
                setLocation(null);
              }}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            >
              {text.newReport}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-emerald-700 mb-2">{text.title}</h1>
        <p className="text-slate-600">{text.subtitle}</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[1, 2, 3].map((num) => {
            const stepNames = [text.step1, text.step2, text.step3];
            const isActive = 
              (step === 'form' && num === 1) ||
              (step === 'location' && num === 2) ||
              (step === 'review' && num === 3);
            const isCompleted = 
              (step === 'location' && num === 1) ||
              (step === 'review' && num <= 2);

            return (
              <div key={num} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isActive 
                      ? 'bg-gradient-to-br from-emerald-600 to-blue-600 text-white' 
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : num}
                  </div>
                  <p className={`text-xs text-center ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {stepNames[num - 1]}
                  </p>
                </div>
                {num < 3 && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} style={{ transform: 'translateY(-50%)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Form */}
      {step === 'form' && (
        <Card className="p-6 border-2 border-emerald-200">
          <div className="space-y-6">
            <div>
              <Label className="text-slate-700 mb-2 block">{text.whatHappened}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="border-emerald-300">
                  <SelectValue placeholder={text.selectType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="symptoms">{text.symptomReport}</SelectItem>
                  <SelectItem value="incident">{text.incidentReport}</SelectItem>
                  <SelectItem value="observation">{text.observation}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-slate-700 mb-2 block">{text.describeSymptoms}</Label>
              <Textarea 
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                placeholder={language === 'french' ? "Exemple: Fièvre, toux, maux de tête..." : "Misaal: Febar, soxla, tëj-tëj boppam..."}
                className="border-emerald-300 min-h-24"
              />
            </div>

            <div>
              <Label className="text-slate-700 mb-2 block">{text.severity}</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'mild', label: text.mild, color: 'from-green-500 to-emerald-500' },
                  { value: 'moderate', label: text.moderate, color: 'from-yellow-500 to-orange-500' },
                  { value: 'severe', label: text.severe, color: 'from-red-500 to-pink-500' }
                ].map((severity) => (
                  <button
                    key={severity.value}
                    onClick={() => setFormData({ ...formData, severity: severity.value })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.severity === severity.value
                        ? `border-emerald-500 bg-gradient-to-br ${severity.color} text-white`
                        : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {severity.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-slate-700 mb-2 block">{text.additionalInfo}</Label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-emerald-300 min-h-20"
              />
            </div>

            <div>
              <Label className="text-slate-700 mb-2 block">{text.contact}</Label>
              <Input 
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="+221 XX XXX XX XX"
                className="border-emerald-300"
              />
            </div>

            <Button 
              onClick={() => setStep('location')}
              disabled={!formData.type || !formData.symptoms || !formData.severity}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            >
              {text.step2}
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Location */}
      {step === 'location' && (
        <div className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <MapPin className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              {text.locationHelp}
            </AlertDescription>
          </Alert>

          <Card className="p-6 border-2 border-emerald-200">
            <div className="space-y-6">
              {!location ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                    <Crosshair className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-slate-800 mb-2">{text.getLocation}</h3>
                  <p className="text-slate-600 mb-6">{text.locationHelp}</p>
                  <Button 
                    onClick={getLocation}
                    disabled={isLocating}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                  >
                    {isLocating ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        {text.locating}
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-2" />
                        {text.getLocation}
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <p className="text-emerald-700">{text.locationFound}</p>
                    </div>
                    <p className="text-slate-600 text-sm">{text.dragMarker}</p>
                  </div>

                  {/* Map Visualization */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden border-2 border-slate-300 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-2 animate-bounce" />
                        <Badge className="bg-emerald-100 text-emerald-700">
                          {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                        </Badge>
                      </div>
                    </div>
                    {/* Grid pattern for map effect */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </div>

                  {/* Manual adjustment */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label className="text-slate-700 text-sm mb-2 block">{text.latitude}</Label>
                      <Input 
                        type="number"
                        step="0.0001"
                        value={location.lat}
                        onChange={(e) => setLocation({ ...location, lat: parseFloat(e.target.value) })}
                        className="border-emerald-300"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 text-sm mb-2 block">{text.longitude}</Label>
                      <Input 
                        type="number"
                        step="0.0001"
                        value={location.lng}
                        onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) })}
                        className="border-emerald-300"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setStep('form')}
                      variant="outline"
                      className="flex-1 border-slate-300"
                    >
                      {text.back}
                    </Button>
                    <Button 
                      onClick={() => setStep('review')}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                    >
                      {text.step3}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 'review' && (
        <Card className="p-6 border-2 border-emerald-200">
          <h3 className="text-emerald-700 mb-6">{text.review}</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <Label className="text-slate-500 text-sm">{text.reportType}</Label>
              <p className="text-slate-800 mt-1">
                {formData.type === 'symptoms' ? text.symptomReport : 
                 formData.type === 'incident' ? text.incidentReport : text.observation}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <Label className="text-slate-500 text-sm">{text.describeSymptoms}</Label>
              <p className="text-slate-800 mt-1">{formData.symptoms}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <Label className="text-slate-500 text-sm">{text.severity}</Label>
              <Badge className={`mt-1 ${
                formData.severity === 'mild' ? 'bg-green-100 text-green-700' :
                formData.severity === 'moderate' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {formData.severity === 'mild' ? text.mild :
                 formData.severity === 'moderate' ? text.moderate : text.severe}
              </Badge>
            </div>

            {formData.description && (
              <div className="p-4 bg-slate-50 rounded-lg">
                <Label className="text-slate-500 text-sm">{text.additionalInfo}</Label>
                <p className="text-slate-800 mt-1">{formData.description}</p>
              </div>
            )}

            {location && (
              <div className="p-4 bg-slate-50 rounded-lg">
                <Label className="text-slate-500 text-sm">{text.location}</Label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <p className="text-slate-800">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button 
              onClick={() => setStep('location')}
              variant="outline"
              className="flex-1 border-slate-300"
            >
              {text.back}
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {text.send}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
