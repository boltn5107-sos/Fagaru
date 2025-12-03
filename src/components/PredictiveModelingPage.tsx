import { TrendingUp, TrendingDown, AlertTriangle, Activity, MapPin, Calendar, BarChart3, LineChart as LineIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PredictiveModelingPageProps {
  language: string;
}

export default function PredictiveModelingPage({ language }: PredictiveModelingPageProps) {
  const t = {
    wolof: {
      title: "Modélisation Prédictive",
      subtitle: "Ay prévisions ak tendances yu jàppale ak IA",
      overview: "Vue d'ensemble",
      predictions: "Prévisions",
      heatmap: "Carte thermique",
      trends: "Tendances émergentes",
      selectRegion: "Tann gox",
      selectDisease: "Tann wér-gu-yaram",
      allRegions: "Gox yépp",
      currentCases: "Cas yi am léelo",
      predicted7Days: "Prévision 7 fan",
      predicted14Days: "Prévision 14 fan",
      predicted30Days: "Prévision 30 fan",
      riskLevel: "Niveau bu solo",
      trend: "Tendance",
      increasing: "Dafa yàq",
      decreasing: "Dafa wàññi",
      stable: "Dafa teg",
      high: "Am solo",
      medium: "Njëkk-njëkk",
      low: "Amul lu bare",
      emergingTrends: "Tendances yu bees yu jàpp",
      alert: "Tànneef",
      recommendation: "Waxtaan",
      regionalForecast: "Prévisions ci gox",
      weeklyEvolution: "Évolution bu ayu-bis",
      predictedImpact: "Impact yu am ci kanam",
      cases: "Cas",
      week: "Ayu-bis",
      actual: "Réel",
      forecasted: "Prévision",
      confidence: "Confiance"
    },
    french: {
      title: "Modélisation Prédictive",
      subtitle: "Prévisions et tendances générées par IA",
      overview: "Vue d'ensemble",
      predictions: "Prévisions",
      heatmap: "Carte thermique",
      trends: "Tendances émergentes",
      selectRegion: "Sélectionner région",
      selectDisease: "Sélectionner maladie",
      allRegions: "Toutes les régions",
      currentCases: "Cas actuels",
      predicted7Days: "Prévision 7 jours",
      predicted14Days: "Prévision 14 jours",
      predicted30Days: "Prévision 30 jours",
      riskLevel: "Niveau de risque",
      trend: "Tendance",
      increasing: "En hausse",
      decreasing: "En baisse",
      stable: "Stable",
      high: "Élevé",
      medium: "Moyen",
      low: "Faible",
      emergingTrends: "Tendances émergentes",
      alert: "Alerte",
      recommendation: "Recommandation",
      regionalForecast: "Prévisions régionales",
      weeklyEvolution: "Évolution hebdomadaire",
      predictedImpact: "Impact prévu",
      cases: "Cas",
      week: "Semaine",
      actual: "Réel",
      forecasted: "Prévu",
      confidence: "Confiance"
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  // Prediction data with confidence intervals
  const predictionData = [
    { week: 'S-2', actual: 145, forecasted: null, lower: null, upper: null },
    { week: 'S-1', actual: 178, forecasted: null, lower: null, upper: null },
    { week: 'S0', actual: 234, forecasted: 230, lower: 220, upper: 240 },
    { week: 'S+1', actual: null, forecasted: 289, lower: 265, upper: 315 },
    { week: 'S+2', actual: null, forecasted: 345, lower: 310, upper: 385 },
    { week: 'S+3', actual: null, forecasted: 398, lower: 350, upper: 450 },
    { week: 'S+4', actual: null, forecasted: 425, lower: 365, upper: 490 }
  ];

  // Regional predictions
  const regionalPredictions = [
    {
      region: 'Dakar',
      current: 234,
      predicted7: 289,
      predicted14: 345,
      predicted30: 425,
      trend: 'increasing',
      risk: 'high',
      change: '+23%'
    },
    {
      region: 'Thiès',
      current: 89,
      predicted7: 95,
      predicted14: 102,
      predicted30: 115,
      trend: 'increasing',
      risk: 'medium',
      change: '+8%'
    },
    {
      region: 'Saint-Louis',
      current: 23,
      predicted7: 21,
      predicted14: 19,
      predicted30: 15,
      trend: 'decreasing',
      risk: 'low',
      change: '-12%'
    },
    {
      region: 'Kaolack',
      current: 56,
      predicted7: 58,
      predicted14: 60,
      predicted30: 65,
      trend: 'stable',
      risk: 'medium',
      change: '+3%'
    },
    {
      region: 'Ziguinchor',
      current: 34,
      predicted7: 30,
      predicted14: 26,
      predicted30: 20,
      trend: 'decreasing',
      risk: 'low',
      change: '-18%'
    }
  ];

  // Emerging trends
  const emergingTrends = [
    {
      id: 1,
      title: language === 'french' 
        ? "Augmentation rapide COVID-19 à Dakar"
        : "Yàq bu gàtt ci COVID-19 ci Dakar",
      level: 'high',
      region: 'Dakar',
      disease: 'COVID-19',
      prediction: language === 'french'
        ? "+82% de cas prévus dans les 14 prochains jours"
        : "+82% ci cas yi ci 14 fan yi ñëw",
      recommendation: language === 'french'
        ? "Renforcer les mesures de prévention, intensifier les campagnes de vaccination"
        : "Yokk ci mesures bu lakkat, yokk ci campagnes bu vaccination",
      confidence: 87
    },
    {
      id: 2,
      title: language === 'french'
        ? "Baisse significative du paludisme à Ziguinchor"
        : "Wàññi bu mag ci sump ci Ziguinchor",
      level: 'medium',
      region: 'Ziguinchor',
      disease: 'Paludisme',
      prediction: language === 'french'
        ? "-41% de cas prévus grâce aux actions préventives"
        : "-41% ci cas yi ci wàllu ay jëf yu lakkat",
      recommendation: language === 'french'
        ? "Maintenir les distributions de moustiquaires, continuer la sensibilisation"
        : "Jël ci distribution bu muskiteer, jël ci sensibilisation",
      confidence: 92
    },
    {
      id: 3,
      title: language === 'french'
        ? "Risque émergent de tuberculose à Thiès"
        : "Solo bu bees ci tuberkulos ci Thiès",
      level: 'medium',
      region: 'Thiès',
      disease: 'Tuberculose',
      prediction: language === 'french'
        ? "+15% de cas dans zones urbaines denses"
        : "+15% ci cas yi ci zones urbaines yu am nit yu bari",
      recommendation: language === 'french'
        ? "Dépistage actif dans les quartiers à risque, améliorer la ventilation"
        : "Dépistage actif ci quartiers yu am solo, yokk ci ventilation",
      confidence: 78
    }
  ];

  // Heatmap data
  const heatmapRegions = [
    { name: 'Dakar', x: 30, y: 40, intensity: 'high', value: 234 },
    { name: 'Thiès', x: 35, y: 45, intensity: 'medium', value: 89 },
    { name: 'Saint-Louis', x: 32, y: 15, intensity: 'low', value: 23 },
    { name: 'Kaolack', x: 45, y: 55, intensity: 'medium', value: 56 },
    { name: 'Ziguinchor', x: 25, y: 70, intensity: 'low', value: 34 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-green-600" />;
      default:
        return <Activity className="w-4 h-4 text-blue-600" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-green-100 text-green-700 border-green-300';
    }
  };

  const getHeatmapColor = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return 'from-red-500 to-red-600';
      case 'medium':
        return 'from-orange-400 to-orange-500';
      default:
        return 'from-green-400 to-green-500';
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-emerald-700">{text.title}</h1>
        </div>
        <p className="text-slate-600">{text.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-64 border-emerald-300">
            <SelectValue placeholder={text.selectRegion} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{text.allRegions}</SelectItem>
            <SelectItem value="dakar">Dakar</SelectItem>
            <SelectItem value="thies">Thiès</SelectItem>
            <SelectItem value="saint-louis">Saint-Louis</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="covid">
          <SelectTrigger className="w-full md:w-64 border-emerald-300">
            <SelectValue placeholder={text.selectDisease} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="covid">COVID-19</SelectItem>
            <SelectItem value="malaria">Paludisme</SelectItem>
            <SelectItem value="tuberculosis">Tuberculose</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">{text.overview}</TabsTrigger>
          <TabsTrigger value="predictions">{text.predictions}</TabsTrigger>
          <TabsTrigger value="trends">{text.trends}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Prediction Chart */}
          <Card className="p-6 border-2 border-purple-200">
            <h3 className="text-slate-800 mb-6">{text.weeklyEvolution}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #10b981',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="url(#colorActual)" 
                  name={text.actual}
                />
                <Area 
                  type="monotone" 
                  dataKey="forecasted" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fill="url(#colorForecast)" 
                  name={text.forecasted}
                />
                <Area 
                  type="monotone" 
                  dataKey="upper" 
                  stroke="#93c5fd" 
                  strokeWidth={1}
                  fill="transparent"
                  name={`${text.confidence} (max)`}
                />
                <Area 
                  type="monotone" 
                  dataKey="lower" 
                  stroke="#93c5fd" 
                  strokeWidth={1}
                  fill="transparent"
                  name={`${text.confidence} (min)`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Heatmap */}
          <Card className="p-6 border-2 border-orange-200">
            <h3 className="text-slate-800 mb-6">{text.heatmap}</h3>
            <div className="relative h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden">
              {/* Senegal outline background */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />
              
              {/* Heat regions */}
              {heatmapRegions.map((region, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getHeatmapColor(region.intensity)} opacity-40 blur-2xl`}
                    style={{ width: `${region.value / 2}px`, height: `${region.value / 2}px` }}
                  />
                  {/* Pin */}
                  <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${getHeatmapColor(region.intensity)} flex items-center justify-center shadow-lg`}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  {/* Label */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <Badge className={getRiskColor(region.intensity)}>
                      {region.name}: {region.value}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <h3 className="text-slate-800 mb-4">{text.regionalForecast}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionalPredictions.map((region, idx) => (
              <Card key={idx} className="p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-slate-800">{region.region}</h4>
                  {getTrendIcon(region.trend)}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-slate-500 text-sm">{text.currentCases}</p>
                    <p className="text-slate-800">{region.current}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="p-2 bg-blue-50 rounded">
                      <p className="text-slate-500 text-xs">7j</p>
                      <p className="text-blue-700">{region.predicted7}</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded">
                      <p className="text-slate-500 text-xs">14j</p>
                      <p className="text-blue-700">{region.predicted14}</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded">
                      <p className="text-slate-500 text-xs">30j</p>
                      <p className="text-blue-700">{region.predicted30}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <Badge className={getRiskColor(region.risk)}>
                      {region.risk === 'high' ? text.high : region.risk === 'medium' ? text.medium : text.low}
                    </Badge>
                    <span className={`text-sm ${
                      region.trend === 'increasing' ? 'text-red-600' :
                      region.trend === 'decreasing' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {region.change}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <h3 className="text-slate-800 mb-4">{text.emergingTrends}</h3>
          <div className="space-y-4">
            {emergingTrends.map((trend) => (
              <Card key={trend.id} className={`p-6 border-2 ${
                trend.level === 'high' ? 'border-red-300 bg-red-50' :
                trend.level === 'medium' ? 'border-orange-300 bg-orange-50' :
                'border-green-300 bg-green-50'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0 ${
                    trend.level === 'high' ? 'from-red-500 to-red-600' :
                    trend.level === 'medium' ? 'from-orange-500 to-orange-600' :
                    'from-green-500 to-green-600'
                  }`}>
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-slate-800">{trend.title}</h4>
                      <Badge className={getRiskColor(trend.level)}>
                        {trend.level === 'high' ? text.high : text.medium}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-slate-500 text-sm mb-1">{text.alert}</p>
                        <p className="text-slate-700">{trend.prediction}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-1">{text.recommendation}</p>
                        <p className="text-slate-700">{trend.recommendation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-600">{trend.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-600">{trend.disease}</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-slate-500">{text.confidence}:</span>
                        <span className="text-emerald-700">{trend.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
