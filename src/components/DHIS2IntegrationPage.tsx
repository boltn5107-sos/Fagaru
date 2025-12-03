import { Database, Upload, Download, RefreshCw, CheckCircle2, AlertCircle, Calendar, BarChart3, Users, Activity, FileText, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { useState } from 'react';

interface DHIS2IntegrationPageProps {
  language: string;
}

export default function DHIS2IntegrationPage({ language }: DHIS2IntegrationPageProps) {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSync, setLastSync] = useState('2025-11-15 14:30:00');

  const t = {
    wolof: {
      title: "Intégration DHIS2",
      subtitle: "Données yi jël ci DHIS2 ak données yi yónnee",
      dhis2Data: "Données DHIS2",
      exportedData: "Données yónnee",
      syncStatus: "Statut synchronisation",
      lastSync: "Synchronisation bu mujj",
      syncNow: "Synchroniser léelo",
      syncing: "Synchronisation dafa dem...",
      syncSuccess: "Synchronisation am succès!",
      syncError: "Erreur ci synchronisation",
      campaigns: "Campagnes",
      diseaseRates: "Taux yu wér-gu-yaram",
      pathologies: "Ay pathologies",
      viewDetails: "Xool détails",
      exportToExcel: "Export Excel",
      campaignName: "Tur bu campagne",
      startDate: "Bët bu tambali",
      endDate: "Bët bu jeexël",
      target: "Objectif",
      achieved: "Am na",
      status: "Statut",
      active: "Am solo",
      completed: "Jeexël na",
      planned: "Planifier na",
      disease: "Wér-gu-yaram",
      cases: "Cas",
      rate: "Taux",
      trend: "Tendance",
      region: "Gox",
      period: "Période",
      dataType: "Njëkk bu données",
      recordCount: "Limu enregistrements",
      lastExport: "Export bu mujj",
      viewOnDHIS2: "Xool ci DHIS2",
      anonymizedData: "Données anonymisées",
      dataQuality: "Qualité bu données",
      complete: "Complet",
      incomplete: "Amul lu yépp",
      pending: "Dafa xaar",
      metrics: "Métriques",
      totalCampaigns: "Limu campagnes",
      activeCampaigns: "Campagnes yu am solo",
      dataPoints: "Points yi données",
      qualityScore: "Score qualité"
    },
    french: {
      title: "Intégration DHIS2",
      subtitle: "Consultation et synchronisation des données DHIS2",
      dhis2Data: "Données DHIS2",
      exportedData: "Données exportées",
      syncStatus: "État de synchronisation",
      lastSync: "Dernière synchronisation",
      syncNow: "Synchroniser maintenant",
      syncing: "Synchronisation en cours...",
      syncSuccess: "Synchronisation réussie!",
      syncError: "Erreur de synchronisation",
      campaigns: "Campagnes",
      diseaseRates: "Taux de maladies",
      pathologies: "Pathologies",
      viewDetails: "Voir détails",
      exportToExcel: "Exporter Excel",
      campaignName: "Nom de la campagne",
      startDate: "Date de début",
      endDate: "Date de fin",
      target: "Objectif",
      achieved: "Réalisé",
      status: "Statut",
      active: "Active",
      completed: "Terminée",
      planned: "Planifiée",
      disease: "Maladie",
      cases: "Cas",
      rate: "Taux",
      trend: "Tendance",
      region: "Région",
      period: "Période",
      dataType: "Type de données",
      recordCount: "Nombre d'enregistrements",
      lastExport: "Dernier export",
      viewOnDHIS2: "Voir sur DHIS2",
      anonymizedData: "Données anonymisées",
      dataQuality: "Qualité des données",
      complete: "Complet",
      incomplete: "Incomplet",
      pending: "En attente",
      metrics: "Métriques",
      totalCampaigns: "Total campagnes",
      activeCampaigns: "Campagnes actives",
      dataPoints: "Points de données",
      qualityScore: "Score de qualité"
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  const handleSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('success');
      setLastSync(new Date().toLocaleString('fr-FR'));
      setTimeout(() => setSyncStatus('idle'), 3000);
    }, 2000);
  };

  // DHIS2 Campaigns Data
  const campaigns = [
    {
      id: 1,
      name: language === 'french' ? 'Vaccination COVID-19 - Phase 3' : 'Vaccination COVID-19 - Phase 3',
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      target: 500000,
      achieved: 327500,
      status: 'active',
      region: 'Dakar'
    },
    {
      id: 2,
      name: language === 'french' ? 'Distribution moustiquaires' : 'Distribution muskiteer',
      startDate: '2025-11-01',
      endDate: '2025-11-30',
      target: 100000,
      achieved: 89200,
      status: 'active',
      region: 'Thiès'
    },
    {
      id: 3,
      name: language === 'french' ? 'Campagne dépistage tuberculose' : 'Campagne dépistage tuberkulos',
      startDate: '2025-09-15',
      endDate: '2025-10-31',
      target: 50000,
      achieved: 52300,
      status: 'completed',
      region: 'Saint-Louis'
    },
    {
      id: 4,
      name: language === 'french' ? 'Sensibilisation VIH/SIDA' : 'Sensibilisation SIDA',
      startDate: '2025-12-01',
      endDate: '2026-02-28',
      target: 200000,
      achieved: 0,
      status: 'planned',
      region: 'National'
    }
  ];

  // Disease Rates from DHIS2
  const diseaseRates = [
    {
      disease: 'COVID-19',
      cases: 2340,
      rate: '45.2/100k',
      trend: '+12%',
      period: language === 'french' ? 'Novembre 2025' : 'Novembre 2025'
    },
    {
      disease: 'Paludisme',
      cases: 8920,
      rate: '172.5/100k',
      trend: '-8%',
      period: language === 'french' ? 'Novembre 2025' : 'Novembre 2025'
    },
    {
      disease: 'Tuberculose',
      cases: 1230,
      rate: '23.8/100k',
      trend: '+3%',
      period: language === 'french' ? 'Novembre 2025' : 'Novembre 2025'
    },
    {
      disease: 'VIH/SIDA',
      cases: 567,
      rate: '10.9/100k',
      trend: '-2%',
      period: language === 'french' ? 'Novembre 2025' : 'Novembre 2025'
    },
    {
      disease: 'Hépatite B',
      cases: 445,
      rate: '8.6/100k',
      trend: '+5%',
      period: language === 'french' ? 'Novembre 2025' : 'Novembre 2025'
    }
  ];

  // Exported Data to DHIS2
  const exportedData = [
    {
      id: 1,
      dataType: language === 'french' ? 'Signalements cas COVID-19' : 'Tànnal cas COVID-19',
      recordCount: 2340,
      lastExport: '2025-11-15 14:30',
      status: 'complete',
      quality: 98
    },
    {
      id: 2,
      dataType: language === 'french' ? 'Observations paludisme' : 'Observations sump',
      recordCount: 8920,
      lastExport: '2025-11-15 13:45',
      status: 'complete',
      quality: 95
    },
    {
      id: 3,
      dataType: language === 'french' ? 'Dépistages tuberculose' : 'Dépistages tuberkulos',
      recordCount: 1230,
      lastExport: '2025-11-15 12:00',
      status: 'complete',
      quality: 92
    },
    {
      id: 4,
      dataType: language === 'french' ? 'Données géolocalisées' : 'Données géolocalisées',
      recordCount: 4567,
      lastExport: '2025-11-15 11:30',
      status: 'pending',
      quality: 88
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'planned':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'complete':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-emerald-700">{text.title}</h1>
        </div>
        <p className="text-slate-600">{text.subtitle}</p>
      </div>

      {/* Sync Status */}
      <Card className="p-6 mb-8 border-2 border-indigo-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-slate-800 mb-2">{text.syncStatus}</h3>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${
                syncStatus === 'success' ? 'text-green-700' :
                syncStatus === 'error' ? 'text-red-700' :
                syncStatus === 'syncing' ? 'text-blue-700' :
                'text-slate-600'
              }`}>
                {syncStatus === 'syncing' && <RefreshCw className="w-5 h-5 animate-spin" />}
                {syncStatus === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {syncStatus === 'error' && <AlertCircle className="w-5 h-5" />}
                {syncStatus === 'idle' && <Database className="w-5 h-5" />}
                <span>
                  {syncStatus === 'syncing' ? text.syncing :
                   syncStatus === 'success' ? text.syncSuccess :
                   syncStatus === 'error' ? text.syncError :
                   `${text.lastSync}: ${lastSync}`}
                </span>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            {text.syncNow}
          </Button>
        </div>
      </Card>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">{text.totalCampaigns}</p>
              <p className="text-blue-700">{campaigns.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">{text.activeCampaigns}</p>
              <p className="text-green-700">{campaigns.filter(c => c.status === 'active').length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">{text.dataPoints}</p>
              <p className="text-purple-700">12.5K</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">{text.qualityScore}</p>
              <p className="text-orange-700">94%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="campaigns">{text.campaigns}</TabsTrigger>
          <TabsTrigger value="rates">{text.diseaseRates}</TabsTrigger>
          <TabsTrigger value="exported">{text.exportedData}</TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          <Card className="border-2 border-slate-200">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-slate-800">{text.campaigns}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {text.viewOnDHIS2}
                </Button>
                <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                  <Download className="w-4 h-4 mr-2" />
                  {text.exportToExcel}
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{text.campaignName}</TableHead>
                  <TableHead>{text.region}</TableHead>
                  <TableHead>{text.startDate}</TableHead>
                  <TableHead>{text.endDate}</TableHead>
                  <TableHead>{text.target}</TableHead>
                  <TableHead>{text.achieved}</TableHead>
                  <TableHead>{text.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => {
                  const progress = (campaign.achieved / campaign.target) * 100;
                  return (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.region}</TableCell>
                      <TableCell>{campaign.startDate}</TableCell>
                      <TableCell>{campaign.endDate}</TableCell>
                      <TableCell>{campaign.target.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{campaign.achieved.toLocaleString()}</span>
                            <span className="text-slate-500">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status === 'active' ? text.active :
                           campaign.status === 'completed' ? text.completed : text.planned}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Disease Rates Tab */}
        <TabsContent value="rates">
          <Card className="border-2 border-slate-200">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-slate-800">{text.diseaseRates}</h3>
              <Button variant="outline" size="sm" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                <ExternalLink className="w-4 h-4 mr-2" />
                {text.viewOnDHIS2}
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{text.disease}</TableHead>
                  <TableHead>{text.period}</TableHead>
                  <TableHead>{text.cases}</TableHead>
                  <TableHead>{text.rate}</TableHead>
                  <TableHead>{text.trend}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {diseaseRates.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{item.disease}</TableCell>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>{item.cases.toLocaleString()}</TableCell>
                    <TableCell>{item.rate}</TableCell>
                    <TableCell>
                      <span className={getTrendColor(item.trend)}>
                        {item.trend}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Exported Data Tab */}
        <TabsContent value="exported">
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              {language === 'french' 
                ? "Toutes les données exportées vers DHIS2 sont anonymisées et conformes aux normes de protection des données."
                : "Données yépp yi yónnee ci DHIS2 dañu anonymiser et conformes ci normes bu protection données."}
            </AlertDescription>
          </Alert>

          <Card className="border-2 border-slate-200">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-slate-800">{text.anonymizedData}</h3>
              <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                <Upload className="w-4 h-4 mr-2" />
                {text.exportToExcel}
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{text.dataType}</TableHead>
                  <TableHead>{text.recordCount}</TableHead>
                  <TableHead>{text.lastExport}</TableHead>
                  <TableHead>{text.dataQuality}</TableHead>
                  <TableHead>{text.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exportedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.dataType}</TableCell>
                    <TableCell>{item.recordCount.toLocaleString()}</TableCell>
                    <TableCell>{item.lastExport}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className={item.quality >= 95 ? 'text-green-700' : item.quality >= 85 ? 'text-yellow-700' : 'text-red-700'}>
                            {item.quality}%
                          </span>
                        </div>
                        <Progress value={item.quality} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status === 'complete' ? text.complete : text.pending}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
