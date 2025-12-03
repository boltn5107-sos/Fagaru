import { AlertTriangle, Shield, CheckCircle2, XCircle, Clock, MapPin, Users, TrendingUp, FileText, Phone } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';
import { useState } from 'react';

interface AuthorityAlertsPageProps {
  language: string;
}

interface AlertItem {
  id: number;
  level: 'critical' | 'moderate' | 'low';
  title: string;
  region: string;
  disease: string;
  detected: string;
  affectedPopulation: number;
  trend: string;
  description: string;
  immediateActions: string[];
  status: 'pending' | 'acknowledged' | 'resolved';
  confidence: number;
}

export default function AuthorityAlertsPage({ language }: AuthorityAlertsPageProps) {
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 1,
      level: 'critical',
      title: language === 'french' 
        ? "Augmentation critique de COVID-19 à Dakar"
        : "Yàq bu mag ci COVID-19 ci Dakar",
      region: 'Dakar',
      disease: 'COVID-19',
      detected: '2025-11-15 14:30',
      affectedPopulation: 450000,
      trend: '+87% en 7 jours',
      description: language === 'french'
        ? "L'IA a détecté une augmentation exponentielle des cas de COVID-19 dans la région de Dakar. Le taux de reproduction (R0) estimé est de 2.3, indiquant une propagation rapide."
        : "IA bi dafa gis yàq bu mag ci cas yi COVID-19 ci Dakar. R0 bi mooy 2.3, mu ngi wone xeex bu gàtt.",
      immediateActions: language === 'french' 
        ? [
            "Déployer 5 équipes mobiles de dépistage dans les zones identifiées",
            "Renforcer la communication sur les gestes barrières",
            "Activer le plan de contingence des hôpitaux",
            "Augmenter le stock de tests et d'équipements de protection",
            "Coordonner avec les autorités locales pour les mesures restrictives"
          ]
        : [
            "Yónne 5 équipes mobiles ci zones yi",
            "Yokk ci communication ci gestes barrières",
            "Jëfandikoo plan contingence ci hôpitaux",
            "Yokk stock bu tests ak équipements protection",
            "Liggéeyandoo ak autorités locales"
          ],
      status: 'pending',
      confidence: 94
    },
    {
      id: 2,
      level: 'moderate',
      title: language === 'french'
        ? "Risque modéré de paludisme à Thiès"
        : "Solo bu njëkk ci sump ci Thiès",
      region: 'Thiès',
      disease: 'Paludisme',
      detected: '2025-11-15 09:15',
      affectedPopulation: 120000,
      trend: '+23% en 14 jours',
      description: language === 'french'
        ? "Augmentation saisonnière du paludisme détectée. Les conditions météorologiques (pluies récentes) favorisent la reproduction des moustiques."
        : "Yàq bu saison ci sump. Ay ndaw yu ñëw yi dañuy yombal xeex bu muskiteer.",
      immediateActions: language === 'french'
        ? [
            "Distribuer des moustiquaires imprégnées dans les quartiers à risque",
            "Intensifier la pulvérisation d'insecticides",
            "Organiser des séances de sensibilisation communautaire",
            "Augmenter les stocks de médicaments antipaludiques"
          ]
        : [
            "Distribution bu muskiteer ci quartiers yu am solo",
            "Yokk ci pulvérisation insecticides",
            "Organiser séances sensibilisation",
            "Yokk stock bu médicaments antipaludiques"
          ],
      status: 'acknowledged',
      confidence: 81
    },
    {
      id: 3,
      level: 'low',
      title: language === 'french'
        ? "Surveillance tuberculose à Kaolack"
        : "Surveillance tuberkulos ci Kaolack",
      region: 'Kaolack',
      disease: 'Tuberculose',
      detected: '2025-11-14 16:45',
      affectedPopulation: 45000,
      trend: '+5% en 30 jours',
      description: language === 'french'
        ? "Légère augmentation de cas de tuberculose. Surveillance renforcée recommandée dans les zones urbaines denses."
        : "Yàq bu ndaw ci cas yi tuberkulos. Surveillance yokk ci zones urbaines.",
      immediateActions: language === 'french'
        ? [
            "Dépistage actif dans les communautés à risque",
            "Assurer la continuité des traitements",
            "Améliorer la ventilation dans les espaces publics"
          ]
        : [
            "Dépistage actif ci communautés yu am solo",
            "Jël ci continuité bu traitements",
            "Yokk ventilation ci espaces publics"
          ],
      status: 'resolved',
      confidence: 72
    }
  ]);

  const t = {
    wolof: {
      title: "Alertes Prédictives (Autorités)",
      subtitle: "Alertes automatiques générées yi IA",
      allAlerts: "Alertes yépp",
      pending: "Dañuy xaar",
      acknowledged: "Gis nañu",
      resolved: "Jeexël na",
      critical: "Critique",
      moderate: "Modéré",
      low: "Faible",
      level: "Niveau",
      region: "Gox",
      disease: "Wér-gu-yaram",
      detected: "Gis na ci",
      affectedPop: "Nit yu jafe",
      trend: "Tendance",
      confidence: "Confiance IA",
      status: "Statut",
      details: "Détails bu alerte",
      description: "Bataaxal",
      immediateActions: "Actions yi am ci kanam",
      acknowledge: "Xam na",
      markResolved: "Marquer jeexël",
      contactTeam: "Jokkoo ak équipe",
      downloadReport: "Télécharger rapport",
      emergency: "Urgence",
      viewMap: "Xool kaart",
      statistics: "Statistiques",
      totalAlerts: "Alertes yépp",
      criticalAlerts: "Alertes critiques",
      avgResponse: "Réponse moyenne"
    },
    french: {
      title: "Alertes Prédictives (Autorités)",
      subtitle: "Alertes automatiques générées par IA",
      allAlerts: "Toutes les alertes",
      pending: "En attente",
      acknowledged: "Acquittées",
      resolved: "Résolues",
      critical: "Critique",
      moderate: "Modéré",
      low: "Faible",
      level: "Niveau",
      region: "Région",
      disease: "Maladie",
      detected: "Détectée le",
      affectedPop: "Population affectée",
      trend: "Tendance",
      confidence: "Confiance IA",
      status: "Statut",
      details: "Détails de l'alerte",
      description: "Description",
      immediateActions: "Actions immédiates recommandées",
      acknowledge: "Acquitter",
      markResolved: "Marquer résolue",
      contactTeam: "Contacter l'équipe",
      downloadReport: "Télécharger rapport",
      emergency: "Urgence",
      viewMap: "Voir sur carte",
      statistics: "Statistiques",
      totalAlerts: "Total alertes",
      criticalAlerts: "Alertes critiques",
      avgResponse: "Temps moyen réponse"
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          badge: 'bg-red-100 text-red-700 border-red-300',
          icon: 'from-red-500 to-red-600',
          text: 'text-red-700'
        };
      case 'moderate':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-300',
          badge: 'bg-orange-100 text-orange-700 border-orange-300',
          icon: 'from-orange-500 to-orange-600',
          text: 'text-orange-700'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          badge: 'bg-blue-100 text-blue-700 border-blue-300',
          icon: 'from-blue-500 to-blue-600',
          text: 'text-blue-700'
        };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'acknowledged':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-green-100 text-green-700 border-green-300';
    }
  };

  const handleAcknowledge = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'acknowledged' as const } : a));
  };

  const handleResolve = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'resolved' as const } : a));
  };

  const pendingAlerts = alerts.filter(a => a.status === 'pending');
  const acknowledgedAlerts = alerts.filter(a => a.status === 'acknowledged');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');
  const criticalCount = alerts.filter(a => a.level === 'critical').length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-emerald-700">{text.title}</h1>
        </div>
        <p className="text-slate-600">{text.subtitle}</p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 mb-1">{text.totalAlerts}</p>
              <p className="text-blue-700">{alerts.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 mb-1">{text.criticalAlerts}</p>
              <p className="text-red-700">{criticalCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 mb-1">{text.avgResponse}</p>
              <p className="text-green-700">2.3h</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="all">
            {text.allAlerts}
            <Badge className="ml-2 bg-slate-200 text-slate-700">{alerts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            {text.pending}
            <Badge className="ml-2 bg-yellow-200 text-yellow-700">{pendingAlerts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="acknowledged">
            {text.acknowledged}
            <Badge className="ml-2 bg-blue-200 text-blue-700">{acknowledgedAlerts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved">
            {text.resolved}
            <Badge className="ml-2 bg-green-200 text-green-700">{resolvedAlerts.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* All Alerts */}
        <TabsContent value="all" className="space-y-4">
          {alerts.map((alert) => {
            const colors = getLevelColor(alert.level);
            return (
              <Card 
                key={alert.id} 
                className={`p-6 border-2 ${colors.border} ${colors.bg} cursor-pointer hover:shadow-lg transition-shadow`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-slate-800">{alert.title}</h3>
                      <div className="flex gap-2 flex-shrink-0">
                        <Badge className={colors.badge}>
                          {alert.level === 'critical' ? text.critical : 
                           alert.level === 'moderate' ? text.moderate : text.low}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status === 'pending' ? text.pending :
                           alert.status === 'acknowledged' ? text.acknowledged : text.resolved}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-slate-500">{text.region}</p>
                        <p className="text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.region}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">{text.disease}</p>
                        <p className="text-slate-700">{alert.disease}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">{text.affectedPop}</p>
                        <p className="text-slate-700 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {alert.affectedPopulation.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">{text.trend}</p>
                        <p className={`flex items-center gap-1 ${colors.text}`}>
                          <TrendingUp className="w-3 h-3" />
                          {alert.trend}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-4 h-4" />
                        {alert.detected}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">{text.confidence}:</span>
                        <Badge className="bg-emerald-100 text-emerald-700">
                          {alert.confidence}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        {/* Pending */}
        <TabsContent value="pending" className="space-y-4">
          {pendingAlerts.length === 0 ? (
            <Card className="p-12 text-center border-2 border-slate-200">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-slate-600">Aucune alerte en attente</p>
            </Card>
          ) : (
            pendingAlerts.map((alert) => {
              const colors = getLevelColor(alert.level);
              return (
                <Card key={alert.id} className={`p-6 border-2 ${colors.border} ${colors.bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center flex-shrink-0`}>
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-800 mb-2">{alert.title}</h3>
                      <p className="text-slate-600 mb-4">{alert.description}</p>
                      <Button 
                        onClick={() => handleAcknowledge(alert.id)}
                        className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {text.acknowledge}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Acknowledged */}
        <TabsContent value="acknowledged" className="space-y-4">
          {acknowledgedAlerts.map((alert) => {
            const colors = getLevelColor(alert.level);
            return (
              <Card key={alert.id} className={`p-6 border-2 ${colors.border}`}>
                <h3 className="text-slate-800 mb-4">{alert.title}</h3>
                <div className="mb-4">
                  <h4 className="text-slate-700 mb-2">{text.immediateActions}</h4>
                  <ul className="space-y-2">
                    {alert.immediateActions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => handleResolve(alert.id)}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  {text.markResolved}
                </Button>
              </Card>
            );
          })}
        </TabsContent>

        {/* Resolved */}
        <TabsContent value="resolved" className="space-y-4">
          {resolvedAlerts.map((alert) => (
            <Card key={alert.id} className="p-6 border-2 border-green-200 bg-green-50 opacity-75">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div className="flex-1">
                  <h4 className="text-slate-800">{alert.title}</h4>
                  <p className="text-slate-600 text-sm">{alert.region} - {alert.detected}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedAlert(null)}>
          <Card 
            className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-slate-800">{text.details}</h2>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-slate-800 mb-2">{selectedAlert.title}</h3>
                <div className="flex gap-2 mb-4">
                  <Badge className={getLevelColor(selectedAlert.level).badge}>
                    {selectedAlert.level === 'critical' ? text.critical :
                     selectedAlert.level === 'moderate' ? text.moderate : text.low}
                  </Badge>
                  <Badge className={getStatusColor(selectedAlert.status)}>
                    {selectedAlert.status === 'pending' ? text.pending :
                     selectedAlert.status === 'acknowledged' ? text.acknowledged : text.resolved}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-slate-700 mb-2">{text.description}</h4>
                <p className="text-slate-600">{selectedAlert.description}</p>
              </div>

              <div>
                <h4 className="text-slate-700 mb-3">{text.immediateActions}</h4>
                <ul className="space-y-2">
                  {selectedAlert.immediateActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-700 text-sm">{idx + 1}</span>
                      </div>
                      <span className="text-slate-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  <MapPin className="w-4 h-4 mr-2" />
                  {text.viewMap}
                </Button>
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  <FileText className="w-4 h-4 mr-2" />
                  {text.downloadReport}
                </Button>
              </div>

              {selectedAlert.status === 'pending' && (
                <Button 
                  onClick={() => {
                    handleAcknowledge(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {text.acknowledge}
                </Button>
              )}

              {selectedAlert.status === 'acknowledged' && (
                <Button 
                  onClick={() => {
                    handleResolve(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {text.markResolved}
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
