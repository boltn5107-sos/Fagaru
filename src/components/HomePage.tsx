import { Heart, BookOpen, AlertTriangle, User, Menu, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  language: string;
  onNavigate: (page: string) => void;
}

export default function HomePage({ language, onNavigate }: HomePageProps) {
  const t = {
    wolof: {
      slogan: "Lakkat, mooy ndimbeeli",
      subtitle: "Jàppalekat wér-gu-yaram yu bari ci Senegaal",
      diseases: "Wér-gu-yaram",
      diseasesDesc: "Xam-xam ci wér-gu-yaram",
      quiz: "Quiz & Aay",
      quizDesc: "Jàng ci ni mel ni laa",
      alerts: "Ay tànneef & Kaart",
      alertsDesc: "Gis tànneef yu bees bees",
      profile: "Sa Profil",
      profileDesc: "Yeesal sa xibaar",
      welcome: "Dalal ak jàmm ci Fagaru",
      mission: "Suñu xëtu mooy lakkat wér-gu-yaram ci Senegaal ak jàppalekat ci mbooleem ndaw ñi."
    },
    french: {
      slogan: "Prévenir, c'est protéger",
      subtitle: "Surveillance des maladies transmissibles au Sénégal",
      diseases: "Maladies",
      diseasesDesc: "Informations et prévention",
      quiz: "Quiz & Conseils",
      quizDesc: "Testez vos connaissances",
      alerts: "Alertes & Cartes",
      alertsDesc: "Zones à risque en temps réel",
      profile: "Mon Profil",
      profileDesc: "Gérer vos informations",
      welcome: "Bienvenue sur Fagaru",
      mission: "Notre mission est de prévenir les maladies au Sénégal par la surveillance communautaire participative."
    }
  };

  const text = t[language as keyof typeof t] || t.wolof;

  const mainFeatures = [
    {
      icon: Heart,
      title: text.diseases,
      description: text.diseasesDesc,
      color: "from-emerald-500 to-emerald-600",
      page: "diseases"
    },
    {
      icon: BookOpen,
      title: text.quiz,
      description: text.quizDesc,
      color: "from-blue-500 to-blue-600",
      page: "quiz"
    },
    {
      icon: AlertTriangle,
      title: text.alerts,
      description: text.alertsDesc,
      color: "from-orange-500 to-red-500",
      page: "alerts"
    },
    {
      icon: User,
      title: text.profile,
      description: text.profileDesc,
      color: "from-purple-500 to-purple-600",
      page: "profile"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>
        
        <div className="relative px-4 py-12 md:py-20 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <Heart className="w-10 h-10 text-emerald-600" fill="currentColor" />
            </div>
            <h1 className="text-white mb-4">Fagaru</h1>
            <p className="text-white text-xl md:text-2xl mb-2">{text.slogan}</p>
            <p className="text-emerald-100 text-lg">{text.subtitle}</p>
          </div>

          {/* Hero Image */}
          <div className="mt-8 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1536064479547-7ee40b74b807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGVhbHRoY2FyZSUyMGNvbW11bml0eXxlbnwxfHx8fDE3NjIyNTkxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="African healthcare community"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="px-4 py-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-slate-800 mb-4">{text.welcome}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {text.mission}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-300 group"
                onClick={() => onNavigate(feature.page)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-emerald-600 mb-2">14</div>
              <p className="text-slate-600">Régions couvertes</p>
            </div>
            <div>
              <div className="text-blue-600 mb-2">10+</div>
              <p className="text-slate-600">Maladies surveillées</p>
            </div>
            <div>
              <div className="text-purple-600 mb-2">24/7</div>
              <p className="text-slate-600">Surveillance active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
