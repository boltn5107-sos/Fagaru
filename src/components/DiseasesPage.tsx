import { Search, Volume2, Video, Heart, AlertCircle, Activity, Droplet, Bug, Wind, Shield, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DiseasesPageProps {
  language: string;
}

export default function DiseasesPage({ language }: DiseasesPageProps) {
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; local: boolean } | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);

  // Fonction pour convertir les liens YouTube en format embed
  const convertYoutubeUrl = (url: string): string => {
    if (!url) return '';
    
    // Si c'est déjà un lien embed, le retourner tel quel
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // Convertir youtu.be/... en youtube.com/embed/...
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Convertir youtube.com/watch?v=... en youtube.com/embed/...
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  const t = {
    wolof: {
      title: "Wér-gu-yaram",
      search: "Seet wér-gu-yaram",
      filterByType: "Tere ci njëkk",
      filterByRegion: "Tere ci gox",
      allTypes: "Yépp",
      allRegions: "Yépp ay gox",
      description: "Ci lu muy nekk",
      symptoms: "Ay simptoom",
      transmission: "Xeex",
      prevention: "Lakkat",
      listen: "Déggal",
      watchVideo: "Xool widéwo",
      high: "Am solo",
      medium: "Njëkk-njëkk",
      low: "Amul lu bare"
    },
    french: {
      title: "Maladies",
      search: "Rechercher une maladie",
      filterByType: "Filtrer par type",
      filterByRegion: "Filtrer par région",
      allTypes: "Tous les types",
      allRegions: "Toutes les régions",
      description: "Description",
      symptoms: "Symptômes",
      transmission: "Transmission",
      prevention: "Prévention",
      listen: "Écouter",
      watchVideo: "Voir vidéo",
      high: "Élevé",
      medium: "Moyen",
      low: "Faible"
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  const diseases = [
    {
      name: "COVID-19",
      nameWolof: "Korona",
      icon: Wind,
      color: "from-red-500 to-orange-500",
      risk: "high",
      videoUrl: "https://youtu.be/Pia2cI_q2SI?si=Q1gAcTeIZKb9VhIt",
      videoLocal: "/media/video/covid19_wolof.mp4",
      audioUrls: { wolof: "/media/audio/covid19_wolof.mp3", french: "/media/audio/covid19_fr.mp3" },
      description: language === 'wolof'
        ? "Wér-gu-yaram bu am solo bu jëm ci coronavirus bu bees"
        : "Maladie infectieuse causée par le coronavirus SARS-CoV-2",
      symptoms: language === 'wolof' 
        ? ["Febar", "Soxla bu yoom", "Dëgër yaram bu bari", "Fàtal ci tànk", "Daanu tànn ak nangu"]
        : ["Fièvre", "Toux sèche", "Fatigue intense", "Difficultés respiratoires", "Perte de goût et d'odorat"],
      transmission: language === 'wolof'
        ? ["Ci tool bu nit soxla walla bale", "Ci setëlu bu am wér-gu-yaram", "Ci doxaleem nit yu feebar"]
        : ["Par gouttelettes respiratoires", "Contact avec surfaces contaminées", "Contact rapproché avec personnes infectées"],
      prevention: language === 'wolof'
        ? ["Sànk sa loxo bu baax", "Tëj ci barkkéefi (1 metre)", "Doxal vaccin bi COVID-19", "Mëngale mask ci gox yu am nit yu bari"]
        : ["Lavage régulier des mains", "Distanciation physique (1 mètre)", "Vaccination COVID-19", "Port de masque dans lieux publics"]
    },
    {
      name: "VIH/SIDA",
      nameWolof: "SIDA",
      icon: Activity,
      color: "from-purple-500 to-pink-500",
      risk: "medium",
      videoUrl: "https://youtu.be/OPdDQ6POMN0?si=Z-A12JN4yUpcNoxL",
      videoLocal: "/media/video/vih_sida_wolof.mp4",
      audioUrls: { wolof: "/media/audio/vih_sida_wolof.mp3", french: "/media/audio/vih_sida_fr.mp3" },
      description: language === 'wolof'
        ? "Wér-gu-yaram bu jafe sistem bi lakkat yaram"
        : "Virus qui affaiblit le système immunitaire de l'organisme",
      symptoms: language === 'wolof'
        ? ["Metit yaram bu bari", "Febar bu bari", "Reer loxo yu gëna yàqu", "Dëgër yaram", "Daanu yaram bu yomb-yomb"]
        : ["Fatigue extrême", "Fièvre persistante", "Ganglions enflés", "Fatigue chronique", "Perte de poids rapide"],
      transmission: language === 'wolof'
        ? ["Ci sëkkante ak nit bu am VIH", "Ci deret", "Ci jiteem ndey ci doom", "Ci jëfandikoo materyel bu tàngoor ak nit bu am VIH"]
        : ["Rapports sexuels non protégés", "Contact sanguin", "Transmission mère-enfant", "Partage d'objets tranchants contaminés"],
      prevention: language === 'wolof'
        ? ["Jëfandikoo préservatif ci sëkkante", "Test ci nguir xamante bu bees", "Saytu ak doxandekatu wér-gu-yaram", "Tàmbale bu bees si deret"]
        : ["Utiliser des préservatifs", "Dépistage régulier", "Consultation médicale", "Précautions avec le sang"]
    },
    {
      name: "Tuberculose",
      nameWolof: "Tuberkulos",
      icon: Droplet,
      color: "from-blue-500 to-cyan-500",
      risk: "medium",
      videoUrl: "https://youtu.be/fhXdMwJisms?si=1KLTAR7R73Ij_J0u",
      videoLocal: "/media/video/tuberculose_wolof.mp4",
      audioUrls: { wolof: "/media/audio/tuberculose_wolof.mp3", french: "/media/audio/tuberculose_fr.mp3" },
      description: language === 'wolof'
        ? "Wér-gu-yaram bu jafe péew ak seen ay mbooloom"
        : "Maladie infectieuse qui affecte principalement les poumons",
      symptoms: language === 'wolof'
        ? ["Soxla bu bari (ci wees 3 walla bu ëpp)", "Febar ci ngoon", "Daanu yaram", "Soxla ak deret", "Metit yaram bu yomb"]
        : ["Toux persistante (plus de 3 semaines)", "Fièvre nocturne", "Perte de poids", "Toux avec sang", "Fatigue prolongée"],
      transmission: language === 'wolof'
        ? ["Ci tool ak bale bu nit bu feebar", "Ci doxaleem nit yu feebar bu yomb", "Ci gox yu rafetul"]
        : ["Par voie aérienne (toux, éternuements)", "Contact prolongé avec malades", "Dans espaces mal ventilés"],
      prevention: language === 'wolof'
        ? ["Doxal vaccin BCG ci xale yi", "Jagleel wér bu bees", "Sànk loxo bu baax", "Rafetal seen ay gox"]
        : ["Vaccination BCG des enfants", "Dépistage précoce", "Hygiène des mains", "Bonne ventilation des espaces"]
    },
    {
      name: "Paludisme",
      nameWolof: "Sump",
      icon: Bug,
      color: "from-green-500 to-emerald-600",
      risk: "high",
      videoUrl: "https://youtu.be/-Rkn6WpJ6jo?si=LnvIQSY3Ai4FiYI7",
      videoLocal: "/media/video/paludisme_wolof.mp4",
      audioUrls: { wolof: "/media/audio/paludisme_wolof.mp3", french: "/media/audio/paludisme_fr.mp3" },
      description: language === 'wolof'
        ? "Wér-gu-yaram bu jëm ci dangaan bu tudd muskiteer Anopheles"
        : "Maladie causée par un parasite transmis par les moustiques Anopheles",
      symptoms: language === 'wolof'
        ? ["Febar bu mag (40°C walla bu ëpp)", "Tëj-tëj boppam bu bari", "Daw-daw", "Metit yaram", "Wotti ak seytaane ci biir"]
        : ["Forte fièvre (40°C ou plus)", "Maux de tête sévères", "Frissons", "Courbatures", "Nausées et vomissements"],
      transmission: language === 'wolof'
        ? ["Ci dangaan muskiteer bu am parasit bi", "Muskiteer mu dangi daño ci ngoon ak suba", "Ci làkk yu am ndox"]
        : ["Piqûre de moustique infecté", "Moustiques actifs la nuit et à l'aube", "Dans zones avec eaux stagnantes"],
      prevention: language === 'wolof'
        ? ["Jëfandikoo muskiteer bu tëral insecticide", "Dindi ci biir muskiteer", "Jël médicament bu lakkat", "Feesal ndox yu tàgg ci gox"]
        : ["Moustiquaires imprégnées d'insecticide", "Dormir sous moustiquaire", "Traitement préventif antipaludique", "Éliminer eaux stagnantes"]
    },
    {
      name: "Hépatite B",
      nameWolof: "Epatit B",
      icon: Shield,
      color: "from-yellow-500 to-orange-600",
      risk: "medium",
      videoUrl: "https://youtu.be/MYQUeC_lpfE?si=StxmnR3r5lQ3V7yf",
      videoLocal: "/media/video/hepatite_b_wolof.mp4",
      audioUrls: { wolof: "/media/audio/hepatite_b_wolof.mp3", french: "/media/audio/hepatite_b_fr.mp3" },
      description: language === 'wolof'
        ? "Wér-gu-yaram bu jafe foie"
        : "Infection virale qui affecte le foie et peut devenir chronique",
      symptoms: language === 'wolof'
        ? ["Metit yaram bu bari", "Daanu ñam ci biir", "Febar légere", "Bét yu moy ci safara", "Ceeju ci ndogu loxo"]
        : ["Grande fatigue", "Perte d'appétit", "Fièvre légère", "Jaunisse (yeux et peau jaunes)", "Douleurs abdominales"],
      transmission: language === 'wolof'
        ? ["Ci deret bu am wér-gu-yaram", "Ci sëkkante ak nit bu am Epatit B", "Ci jiteem ndey ci doom", "Ci jëfandikoo materyel bu tàngoor bu am wér"]
        : ["Contact avec sang infecté", "Rapports sexuels non protégés", "Transmission mère-enfant", "Partage d'objets tranchants contaminés"],
      prevention: language === 'wolof'
        ? ["Doxal vaccin bi Epatit B", "Jëfandikoo préservatif", "Tàmbale ak deret", "Yal xale yi vaccin ci njëkk-njëkk seen ay àtteu"]
        : ["Vaccination contre l'hépatite B", "Utiliser des préservatifs", "Précautions avec le sang", "Vacciner les enfants dès la naissance"]
    }
  ];

  const getRiskBadge = (risk: string) => {
    const colors = {
      high: "bg-red-100 text-red-700 border-red-300",
      medium: "bg-orange-100 text-orange-700 border-orange-300",
      low: "bg-green-100 text-green-700 border-green-300"
    };
    const labels = {
      high: text.high,
      medium: text.medium,
      low: text.low
    };
    return { color: colors[risk as keyof typeof colors], label: labels[risk as keyof typeof labels] };
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-emerald-700 mb-4">{text.title}</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              placeholder={text.search}
              className="pl-10 border-emerald-300 focus:border-emerald-500"
            />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48 border-emerald-300">
              <SelectValue placeholder={text.filterByType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{text.allTypes}</SelectItem>
              <SelectItem value="viral">Viral</SelectItem>
              <SelectItem value="bacterial">Bactérien</SelectItem>
              <SelectItem value="parasitic">Parasitaire</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-48 border-emerald-300">
              <SelectValue placeholder={text.filterByRegion} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{text.allRegions}</SelectItem>
              <SelectItem value="dakar">Dakar</SelectItem>
              <SelectItem value="thies">Thiès</SelectItem>
              <SelectItem value="saint_louis">Saint-Louis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((disease, index) => {
          const Icon = disease.icon;
          const badge = getRiskBadge(disease.risk);
          
          return (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-slate-100 hover:border-emerald-300">
              <div className={`h-32 bg-gradient-to-br ${disease.color} flex items-center justify-center relative`}>
                <Icon className="w-16 h-16 text-white" />
                <Badge className={`absolute top-3 right-3 ${badge.color}`}>
                  {badge.label}
                </Badge>
              </div>
              
              <div className="p-6">
                <h3 className="text-slate-800 mb-1">{disease.name}</h3>
                <p className="text-emerald-600 mb-4">{disease.nameWolof}</p>
                
                <div className="mb-4">
                  <h4 className="text-slate-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {text.description}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {disease.description}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-slate-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {text.symptoms}
                  </h4>
                  <ul className="space-y-1">
                    {disease.symptoms.slice(0, 3).map((symptom, i) => (
                      <li key={i} className="text-slate-600 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-slate-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {text.transmission}
                  </h4>
                  <ul className="space-y-1">
                    {disease.transmission.slice(0, 2).map((transmit, i) => (
                      <li key={i} className="text-slate-600 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        {transmit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-slate-700 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {text.prevention}
                  </h4>
                  <ul className="space-y-1">
                    {disease.prevention.slice(0, 2).map((prevent, i) => (
                      <li key={i} className="text-slate-600 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {prevent}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => setSelectedAudio(disease.audioUrls?.[language as 'wolof' | 'french'] || disease.audioUrls?.french)}
                  >
                    <Volume2 className="w-4 h-4 mr-1" />
                    {text.listen}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => {
                      if (language === 'wolof' && disease.videoLocal) {
                        setSelectedVideo({ src: disease.videoLocal, local: true });
                      } else {
                        setSelectedVideo({ src: convertYoutubeUrl(disease.videoUrl), local: false });
                      }
                    }}
                  >
                    <Video className="w-4 h-4 mr-1" />
                    {text.watchVideo}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modale vidéo */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-slate-800">{text.watchVideo}</h2>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {selectedVideo.local ? (
                  <video width="100%" height="100%" controls className="w-full h-full bg-black">
                    <source src={selectedVideo.src} type="video/mp4" />
                    Votre navigateur ne supporte pas l'élément vidéo.
                  </video>
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedVideo.src}
                    title="Disease Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale audio */}
      {selectedAudio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-slate-800">{text.listen}</h2>
              <button 
                onClick={() => setSelectedAudio(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg p-8 flex items-center justify-center mb-4">
                <Volume2 className="w-16 h-16 text-white" />
              </div>
              <audio
                controls
                className="w-full mb-4"
                controlsList="nodownload"
              >
                <source src={selectedAudio} type="audio/mpeg" />
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
              <Button 
                onClick={() => setSelectedAudio(null)}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}