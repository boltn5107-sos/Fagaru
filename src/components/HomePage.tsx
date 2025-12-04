import { useState, useEffect } from 'react';
import { Heart, BookOpen, AlertTriangle, User, Menu, Globe, ChevronLeft, ChevronRight, TrendingUp, Users, MapPin, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  language: string;
  onNavigate: (page: string) => void;
}

export default function HomePage({ language, onNavigate }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    regions: 14,
    diseases: 12,
    reports: 2347,
    activeUsers: 15680
  });

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        reports: prev.reports + Math.floor(Math.random() * 3),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      mission: "Suñu xëtu mooy lakkat wér-gu-yaram ci Senegaal ak jàppalekat ci mbooleem ndaw ñi.",
      latestNews: "Xibaar yu bees",
      news1: "Vaccin COVID-19 disponible dans toutes les régions",
      news2: "Campagne de sensibilisation contre le paludisme",
      news3: "Nouveau centre de surveillance à Dakar",
      viewAll: "Gis yépp",
      getStarted: "Tàmbali tey",
      learnMore: "Gëna xam"
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
      mission: "Notre mission est de prévenir les maladies au Sénégal par la surveillance communautaire participative.",
      latestNews: "Dernières actualités",
      news1: "Vaccin COVID-19 disponible dans toutes les régions",
      news2: "Campagne de sensibilisation contre le paludisme",
      news3: "Nouveau centre de surveillance à Dakar",
      viewAll: "Voir tout",
      getStarted: "Commencer",
      learnMore: "En savoir plus"
    }
  };

  const text = t[language as keyof typeof t] || t.wolof;

  // Carousel slides
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGVhbHRoY2FyZSUyMGNvbW11bml0eXxlbnwxfHx8fDE3NjIyNTkxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: language === 'french' ? "Surveillance Communautaire" : "Jàppalekat ci Mbooleem",
      description: language === 'french' ? "Participez à la protection de votre communauté" : "Moo tax ci aar sa réew"
    },
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwdGVhbXxlbnwxfHx8fDE3NjIyNTkxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: language === 'french' ? "Équipes Médicales" : "Ay doxandekat wér-gu-yaram",
      description: language === 'french' ? "Professionnels de santé à votre service" : "Doxandekat yi di liggéey sa mbir"
    },
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoZWFsdGglMjBlZHVjYXRpb258ZW58MXx8fHwxNzYyMjU5MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: language === 'french' ? "Éducation & Prévention" : "Jàng ak Lakkat",
      description: language === 'french' ? "Apprenez à vous protéger et protéger les autres" : "Jàng ci lakkat sa bopp ak bopp yeneen"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

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

  // News items
  const newsItems = [
    { title: text.news1, date: "2024-01-15", type: "vaccination" },
    { title: text.news2, date: "2024-01-12", type: "campaign" },
    { title: text.news3, date: "2024-01-10", type: "facility" }
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

      {/* Carousel Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-slate-800 mb-4">
              {language === 'french' ? "Découvrez Fagaru" : "Xam Fagaru"}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {language === 'french'
                ? "Explorez les différentes facettes de notre plateforme de surveillance sanitaire"
                : "Sànn Fagaru ci ay yoon yu yeneen ci jàppalekat wér-gu-yaram"
              }
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <div className="relative h-96 md:h-[500px]">
                      <ImageWithFallback
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
                        <p className="text-lg text-white/90 max-w-2xl">{slide.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
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

      {/* Latest News Section */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-slate-800">{text.latestNews}</h2>
            <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              {text.viewAll}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((news, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-slate-200">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    news.type === 'vaccination' ? 'bg-blue-100 text-blue-600' :
                    news.type === 'campaign' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {news.type === 'vaccination' && <Heart className="w-6 h-6" />}
                    {news.type === 'campaign' && <Activity className="w-6 h-6" />}
                    {news.type === 'facility' && <MapPin className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <Badge className={`mb-2 ${
                      news.type === 'vaccination' ? 'bg-blue-100 text-blue-700' :
                      news.type === 'campaign' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {news.date}
                    </Badge>
                    <h3 className="text-slate-800 mb-2 leading-tight">{news.title}</h3>
                    <Button variant="link" className="p-0 h-auto text-emerald-600 hover:text-emerald-700">
                      {text.learnMore} →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4">
              {language === 'french' ? "Impact en Temps Réel" : "Tënk ci kanam"}
            </h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              {language === 'french'
                ? "Chiffres mis à jour automatiquement pour suivre l'évolution de la surveillance"
                : "Limu yeesal ci kanam ngir topp jàppalekat bi"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-emerald-300" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stats.regions}</div>
              <p className="text-emerald-100">
                {language === 'french' ? "Régions couvertes" : "Gox yi ñu dekk"}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-blue-300" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stats.diseases}</div>
              <p className="text-blue-100">
                {language === 'french' ? "Maladies surveillées" : "Wér-gu-yaram yi ñu topp"}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-orange-300" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stats.reports.toLocaleString()}</div>
              <p className="text-orange-100">
                {language === 'french' ? "Signalements actifs" : "Tànneef yu dox"}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-300" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-purple-100">
                {language === 'french' ? "Utilisateurs actifs" : "Jëfandikookat yu dox"}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate('alerts')}
              className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-3 text-lg font-semibold"
            >
              {text.getStarted}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
