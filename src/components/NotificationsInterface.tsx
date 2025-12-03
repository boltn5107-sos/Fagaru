import { Bell, X, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface NotificationsInterfaceProps {
  language: string;
}

export default function NotificationsInterface({ language }: NotificationsInterfaceProps) {
  const [notifications, setNotifications] = useState([
    { id: 1, level: 'high', visible: true },
    { id: 2, level: 'medium', visible: true },
    { id: 3, level: 'info', visible: true }
  ]);

  const t = {
    wolof: {
      title: "Ay notification IA",
      subtitle: "Ay tànneef bu jàppale bu IA yi wone",
      highAlert: "Tànneef bu mag",
      mediumAlert: "Njëkk-njëkk",
      infoAlert: "Xalaat",
      highMessage: "Risque bu mag ci COVID-19 ci Dakar. Jàpp ay protocoles bu jàpp.",
      mediumMessage: "Des ci sump ci Thiès ci 15 fan. Gis sa bopp.",
      infoMessage: "Campagne bu vaccination dafa am solo ci Saint-Louis.",
      moreInfo: "Lu ëpp",
      reportCase: "Tànnal cas",
      dismiss: "Taxaw",
      tapToShow: "Bësal ngir wone"
    },
    french: {
      title: "Notifications IA Prédictives",
      subtitle: "Alertes sanitaires générées par l'intelligence artificielle",
      highAlert: "Alerte élevée",
      mediumAlert: "Vigilance",
      infoAlert: "Information",
      highMessage: "Risque accru de COVID-19 détecté à Dakar. Suivez les protocoles de prévention.",
      mediumMessage: "Augmentation du paludisme à Thiès dans les 15 prochains jours. Restez vigilant.",
      infoMessage: "Campagne de vaccination disponible à Saint-Louis dès aujourd'hui.",
      moreInfo: "Plus d'infos",
      reportCase: "Signaler un cas",
      dismiss: "Ignorer",
      tapToShow: "Appuyez pour afficher"
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  const notificationData = [
    {
      id: 1,
      level: 'high',
      title: text.highAlert,
      message: text.highMessage,
      icon: AlertTriangle,
      bgColor: 'bg-red-500',
      textColor: 'text-red-700',
      borderColor: 'border-red-600'
    },
    {
      id: 2,
      level: 'medium',
      title: text.mediumAlert,
      message: text.mediumMessage,
      icon: Bell,
      bgColor: 'bg-orange-500',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-600'
    },
    {
      id: 3,
      level: 'info',
      title: text.infoAlert,
      message: text.infoMessage,
      icon: Info,
      bgColor: 'bg-green-500',
      textColor: 'text-green-700',
      borderColor: 'border-green-600'
    }
  ];

  const dismissNotification = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, visible: false } : n)
    );
  };

  const showNotification = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, visible: true } : n)
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-emerald-700 mb-2">{text.title}</h1>
        <p className="text-slate-600">{text.subtitle}</p>
      </div>

      {/* Live Notifications Display */}
      <div className="space-y-4">
        {notificationData.map((notif) => {
          const Icon = notif.icon;
          const isVisible = notifications.find(n => n.id === notif.id)?.visible;
          
          return (
            <div key={notif.id} className="relative">
              {/* Notification Banner */}
              {isVisible ? (
                <div className={`${notif.bgColor} rounded-xl shadow-2xl border-2 ${notif.borderColor} overflow-hidden`}>
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 text-white">
                        <h4 className="mb-1">{notif.title}</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {notif.message}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-white/90 hover:bg-white text-slate-800 shadow-md"
                          >
                            {text.moreInfo}
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                          {notif.level === 'high' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-white/40 text-white hover:bg-white/10"
                            >
                              {text.reportCase}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {/* Dismiss Button */}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-white hover:bg-white/10 flex-shrink-0"
                        onClick={() => dismissNotification(notif.id)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-1 bg-white/20">
                    <div className="h-full bg-white/60" style={{ width: '100%' }}></div>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full py-6 border-2 border-dashed"
                  onClick={() => showNotification(notif.id)}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  {text.tapToShow} - {notif.title}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}