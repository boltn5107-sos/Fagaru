import { useState } from "react";
import { Heart, Globe, Shield, User, LogOut, Settings } from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
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

// Main App Component with Authentication
function AppContent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");
  const [language, setLanguage] = useState("french");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const toggleLanguage = () => {
    setLanguage(language === "wolof" ? "french" : "wolof");
  };

  // Get navigation items based on user role
  const getNavigationItems = () => {
    if (!user) return [];

    const role = user.role;
    const baseItems = {
      citizen: {
        wolof: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "diseases", label: "Wér-gu-yaram", permission: "view_diseases" },
          { id: "georeport", label: "Tànnal", permission: "create_alert" },
          { id: "quiz", label: "Quiz", permission: "take_quiz" },
          { id: "map", label: "Kaart", permission: "view_map" },
          { id: "notifications", label: "Ay notification", permission: "view_notifications" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
        french: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "diseases", label: "Maladies", permission: "view_diseases" },
          { id: "georeport", label: "Signaler", permission: "create_alert" },
          { id: "quiz", label: "Quiz", permission: "take_quiz" },
          { id: "map", label: "Carte", permission: "view_map" },
          { id: "notifications", label: "Notifications", permission: "view_notifications" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
      },
      asc: {
        wolof: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de bord", permission: "view_dashboard" },
          { id: "georeport", label: "Tànnal", permission: "create_alert" },
          { id: "map", label: "Kaart", permission: "view_map" },
          { id: "notifications", label: "Ay notification", permission: "view_notifications" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
        french: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de Bord", permission: "view_dashboard" },
          { id: "georeport", label: "Signaler", permission: "create_alert" },
          { id: "map", label: "Carte", permission: "view_map" },
          { id: "notifications", label: "Notifications", permission: "view_notifications" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
      },
      icp: {
        wolof: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de bord", permission: "view_dashboard" },
          { id: "map", label: "Kaart", permission: "view_map" },
          { id: "notifications", label: "Ay notification", permission: "view_notifications" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
        french: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de Bord", permission: "view_dashboard" },
          { id: "map", label: "Carte", permission: "view_map" },
          { id: "notifications", label: "Notifications", permission: "view_notifications" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
      },
      medecinCentre: {
        wolof: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de bord", permission: "view_dashboard" },
          { id: "predictive", label: "Modélisation", permission: "view_predictive" },
          { id: "alerts", label: "Alertes IA", permission: "view_alerts" },
          { id: "map", label: "Kaart", permission: "view_map" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
        french: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de Bord", permission: "view_dashboard" },
          { id: "predictive", label: "Modélisation", permission: "view_predictive" },
          { id: "alerts", label: "Alertes IA", permission: "view_alerts" },
          { id: "map", label: "Carte", permission: "view_map" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
      },
      medecinDistrict: {
        wolof: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de bord", permission: "view_dashboard" },
          { id: "predictive", label: "Modélisation", permission: "view_predictive" },
          { id: "alerts", label: "Alertes IA", permission: "view_alerts" },
          { id: "dhis2", label: "DHIS2", permission: "view_dhis2" },
          { id: "map", label: "Kaart", permission: "view_map" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
        french: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de Bord", permission: "view_dashboard" },
          { id: "predictive", label: "Modélisation", permission: "view_predictive" },
          { id: "alerts", label: "Alertes IA", permission: "view_alerts" },
          { id: "dhis2", label: "DHIS2", permission: "view_dhis2" },
          { id: "map", label: "Carte", permission: "view_map" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
      },
      admin: {
        wolof: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de bord", permission: "view_dashboard" },
          { id: "predictive", label: "Modélisation", permission: "view_predictive" },
          { id: "alerts", label: "Alertes IA", permission: "view_alerts" },
          { id: "dhis2", label: "DHIS2", permission: "view_dhis2" },
          { id: "map", label: "Kaart", permission: "view_map" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
        french: [
          { id: "home", label: "Accueil", permission: "view_home" },
          { id: "dashboard", label: "Tableau de Bord", permission: "view_dashboard" },
          { id: "predictive", label: "Modélisation", permission: "view_predictive" },
          { id: "alerts", label: "Alertes IA", permission: "view_alerts" },
          { id: "dhis2", label: "DHIS2", permission: "view_dhis2" },
          { id: "map", label: "Carte", permission: "view_map" },
          { id: "profile", label: "Profil", permission: "view_profile" },
        ],
      }
    };

    // Map role to navigation key
    const roleKey = role === 'citizen' ? 'citizen' :
                   role === 'asc' ? 'asc' :
                   role === 'icp' ? 'icp' :
                   role === 'medecinCentre' ? 'medecinCentre' :
                   role === 'medecinDistrict' ? 'medecinDistrict' :
                   'admin';

    return baseItems[roleKey as keyof typeof baseItems]?.[language as keyof typeof baseItems.citizen] || [];
  };

  const navigationItems = getNavigationItems();

  // Check if user has permission for a specific action
  const hasPermission = (permission: string) => {
    if (!user) return false;
    return user.permissions.includes(permission) || user.permissions.includes('all_permissions');
  };

  const renderPage = () => {
    // Check permissions for each page
    switch (currentPage) {
      case "home":
        return hasPermission("view_home") ? (
          <HomePage language={language} onNavigate={setCurrentPage} />
        ) : <AccessDeniedPage language={language} />;

      case "diseases":
        return hasPermission("view_diseases") ? (
          <DiseasesPage language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "georeport":
        return hasPermission("create_alert") ? (
          <GeoReportPage language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "quiz":
        return hasPermission("take_quiz") ? (
          <QuizPage language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "map":
        return hasPermission("view_map") ? (
          <MapInterface language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "notifications":
        return hasPermission("view_notifications") ? (
          <NotificationsInterface language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "dashboard":
        return hasPermission("view_dashboard") ? (
          <DashboardInterface language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "predictive":
        return hasPermission("view_predictive") ? (
          <PredictiveModelingPage language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "alerts":
        return hasPermission("view_alerts") ? (
          <AuthorityAlertsPage language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "dhis2":
        return hasPermission("view_dhis2") ? (
          <DHIS2IntegrationPage language={language} />
        ) : <AccessDeniedPage language={language} />;

      case "profile":
        return hasPermission("view_profile") ? (
          <ProfilePage language={language} />
        ) : <AccessDeniedPage language={language} />;

      default:
        return <HomePage language={language} onNavigate={setCurrentPage} />;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-slate-600">
            {language === "wolof" ? "Chargement..." : "Chargement..."}
          </p>
        </div>
      </div>
    );
  }

  // Authentication required
  if (!isAuthenticated) {
    return authMode === "login" ? (
      <LoginForm
        language={language}
        onLogin={login}
        onSwitchToRegister={() => setAuthMode("register")}
      />
    ) : (
      <RegisterForm
        language={language}
        onRegister={login}
        onSwitchToLogin={() => setAuthMode("login")}
      />
    );
  }

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
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
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
              {navigationItems
                .filter(item => hasPermission(item.permission))
                .map((item) => (
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
              {/* User Info */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                  {user.role === 'citizen' ? (language === 'wolof' ? 'Citoyen' : 'Citoyen') :
                   user.role === 'asc' ? 'ASC' :
                   user.role === 'icp' ? 'ICP' :
                   user.role === 'medecinCentre' ? (language === 'wolof' ? 'Médecin Centre' : 'Médecin Centre') :
                   user.role === 'medecinDistrict' ? (language === 'wolof' ? 'Médecin District' : 'Médecin District') :
                   'Admin'}
                </Badge>
                <span className="text-slate-600">{user.name}</span>
              </div>

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

              {/* Logout */}
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
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

// Access Denied Component
function AccessDeniedPage({ language }: { language: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {language === "wolof" ? "Amuñ ko man" : "Accès refusé"}
        </h2>
        <p className="text-slate-600">
          {language === "wolof"
            ? "Amul sañ-sañ ngir jëmale xët wi"
            : "Vous n'avez pas les permissions nécessaires pour accéder à cette page"}
        </p>
      </div>
    </div>
  );
}

// Main App with AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
