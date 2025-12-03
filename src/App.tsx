import { useState } from "react";
import { Heart, Globe, Shield, User } from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import HomePage from "./components/HomePage";
import DiseasesPage from "./components/DiseasesPage";
import QuizPage from "./components/QuizPage";
import MapInterface from "./components/MapInterface";
import NotificationsInterface from "./components/NotificationsInterface";
import DashboardInterface from "./components/DashboardInterface";
import ProfilePage from "./components/ProfilePage";
import GeoReportPage from "./components/GeoReportPage";
import PredictiveModelingPage from "./components/PredictiveModelingPage";
import AuthorityAlertsPage from "./components/AuthorityAlertsPage";
import DHIS2IntegrationPage from "./components/DHIS2IntegrationPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [language, setLanguage] = useState("french");
  const [userRole, setUserRole] = useState<"citizen" | "authority">("citizen");

  const toggleLanguage = () => {
    setLanguage(language === "wolof" ? "french" : "wolof");
  };

  const toggleRole = () => {
    setUserRole(userRole === "citizen" ? "authority" : "citizen");
    setCurrentPage("home");
  };

  const navigationItems = {
    citizen: {
      wolof: [
        { id: "home", label: "Accueil" },
        { id: "diseases", label: "Wér-gu-yaram" },
        { id: "georeport", label: "Tànnal" },
        { id: "quiz", label: "Quiz" },
        { id: "map", label: "Kaart" },
        { id: "notifications", label: "Ay notification" },
        { id: "profile", label: "Profil" },
      ],
      french: [
        { id: "home", label: "Accueil" },
        { id: "diseases", label: "Maladies" },
        { id: "georeport", label: "Signaler" },
        { id: "quiz", label: "Quiz" },
        { id: "map", label: "Carte" },
        { id: "notifications", label: "Notifications" },
        { id: "profile", label: "Profil" },
      ],
    },
    authority: {
      wolof: [
        { id: "home", label: "Accueil" },
        { id: "dashboard", label: "Tableau de bord" },
        { id: "predictive", label: "Modélisation" },
        { id: "alerts", label: "Alertes IA" },
        { id: "dhis2", label: "DHIS2" },
        { id: "map", label: "Kaart" },
        { id: "profile", label: "Profil" },
      ],
      french: [
        { id: "home", label: "Accueil" },
        { id: "dashboard", label: "Tableau de Bord" },
        { id: "predictive", label: "Modélisation" },
        { id: "alerts", label: "Alertes IA" },
        { id: "dhis2", label: "DHIS2" },
        { id: "map", label: "Carte" },
        { id: "profile", label: "Profil" },
      ],
    },
  };

  const currentNav =
    navigationItems[userRole][language as keyof typeof navigationItems.citizen];

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            language={language}
            onNavigate={setCurrentPage}
          />
        );
      case "diseases":
        return <DiseasesPage language={language} />;
      case "georeport":
        return <GeoReportPage language={language} />;
      case "quiz":
        return <QuizPage language={language} />;
      case "map":
        return <MapInterface language={language} />;
      case "notifications":
        return <NotificationsInterface language={language} />;
      case "dashboard":
        return <DashboardInterface language={language} />;
      case "predictive":
        return <PredictiveModelingPage language={language} />;
      case "alerts":
        return <AuthorityAlertsPage language={language} />;
      case "dhis2":
        return <DHIS2IntegrationPage language={language} />;
      case "profile":
        return <ProfilePage language={language} />;
      default:
        return (
          <HomePage
            language={language}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-white border-b-2 border-emerald-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center">
                <Heart
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                />
              </div>
              <div>
                <h2 className="text-emerald-700">Fagaru</h2>
                <p className="text-slate-600 text-sm">
                  {language === "wolof"
                    ? "Lakkat, mooy ndimbeeli"
                    : "Prévenir, c'est protéger"}
                </p>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-2">
              {currentNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white"
                      : "text-slate-700 hover:bg-emerald-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Role Switcher */}
              <Button
                onClick={toggleRole}
                variant="outline"
                size="sm"
                className={`${
                  userRole === "authority"
                    ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                    : "border-blue-300 text-blue-700 hover:bg-blue-50"
                }`}
              >
                {userRole === "authority" ? (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    {language === "french" ? "Autorité" : "Autorité"}
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    {language === "french" ? "Citoyen" : "Citoyen"}
                  </>
                )}
              </Button>

              {/* Language Switcher */}
              <Button
                onClick={toggleLanguage}
                variant="outline"
                size="sm"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "wolof" ? "FR" : "WO"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-120px)]">
        {renderPage()}
      </main>

      <footer className="bg-gradient-to-r from-emerald-700 to-blue-700 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white mb-3">Fagaru</h3>
              <p className="text-emerald-100">
                {language === "wolof"
                  ? "Jàppalekat wér-gu-yaram ci Senegaal"
                  : "Surveillance des maladies au Sénégal"}
              </p>
            </div>
            <div>
              <h4 className="text-white mb-3">
                {language === "wolof"
                  ? "Ay lëkk"
                  : "Liens utiles"}
              </h4>
              <ul className="space-y-2 text-emerald-100">
                <li className="hover:text-white cursor-pointer transition-colors">
                  {language === "wolof" ? "Nuy ñu" : "À propos"}
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  {language === "wolof" ? "Jokkoo" : "Contact"}
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  {language === "wolof" ? "Aay" : "Aide"}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-3">
                {language === "wolof"
                  ? "Jokkoowaat"
                  : "Partenaires"}
              </h4>
              <p className="text-emerald-100">
                {language === "wolof"
                  ? "Ci mbooloom Ministère bi wér-gu-yaram"
                  : "En partenariat avec le Ministère de la Santé"}
              </p>
            </div>
          </div>
          <div className="border-t border-emerald-600 mt-8 pt-6 text-center text-emerald-100">
            <p>
              © 2025 Fagaru -{" "}
              {language === "wolof"
                ? "Yépp ay xuraam"
                : "Tous droits réservés"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}