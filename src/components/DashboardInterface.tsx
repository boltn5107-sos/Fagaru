import { TrendingUp, BarChart3, Activity, Users, MapPin, Download, FileText, FileSpreadsheet, FileJson, ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

interface DashboardInterfaceProps {
  language: string;
}

export default function DashboardInterface({ language }: DashboardInterfaceProps) {
  const [sortBy, setSortBy] = useState<'region' | 'cases' | 'risk'>('cases');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const t = {
    wolof: {
      title: "Tableau de bord bu simple",
      subtitle: "Ay graphique yu gëna faham",
      weeklyEvolution: "Yeesal ci ayu-bis",
      regionalStats: "Ay statistiques yu gox",
      totalCases: "Limu cas yi lépp",
      activeCases: "Cas yu am solo",
      recovered: "Ñu wer",
      deaths: "Ñu dee",
      trends: "Ay tendance",
      byRegion: "Ci gox",
      byDisease: "Ci faj",
      week: "Ayu-bis",
      cases: "Cas",
      dakar: "Dakar",
      thies: "Thiès",
      saintLouis: "Saint-Louis",
      kaolack: "Kaolack",
      ziguinchor: "Ziguinchor",
      covid: "COVID-19",
      malaria: "Paludisme",
      tuberculosis: "Tuberculose",
      monday: "Altine",
      tuesday: "Talaata",
      wednesday: "Allarba",
      thursday: "Alxamis",
      friday: "Àjjuma",
      saturday: "Gaawu",
      sunday: "Dibéer",
      riskLevel: "Niveau bu solo",
      high: "Am solo",
      medium: "Njëkk-njëkk",
      low: "Amul lu bare",
      exportReport: "Télécharger rapport",
      exportPdf: "Export PDF",
      exportExcel: "Export Excel",
      exportCsv: "Export CSV",
      sortBy: "Trier ci",
      region: "Gox",
      sorting: "Trier"
    },
    french: {
      title: "Tableau de Bord Simplifié",
      subtitle: "Graphiques clairs et statistiques locales",
      weeklyEvolution: "Évolution hebdomadaire",
      regionalStats: "Statistiques régionales",
      totalCases: "Total des cas",
      activeCases: "Cas actifs",
      recovered: "Guéris",
      deaths: "Décès",
      trends: "Tendances",
      byRegion: "Par région",
      byDisease: "Par maladie",
      week: "Semaine",
      cases: "Cas",
      dakar: "Dakar",
      thies: "Thiès",
      saintLouis: "Saint-Louis",
      kaolack: "Kaolack",
      ziguinchor: "Ziguinchor",
      covid: "COVID-19",
      malaria: "Paludisme",
      tuberculosis: "Tuberculose",
      monday: "Lun",
      tuesday: "Mar",
      wednesday: "Mer",
      thursday: "Jeu",
      friday: "Ven",
      saturday: "Sam",
      sunday: "Dim",
      riskLevel: "Niveau de risque",
      high: "Élevé",
      medium: "Moyen",
      low: "Faible",
      exportReport: "Exporter le rapport",
      exportPdf: "Export PDF",
      exportExcel: "Export Excel",
      exportCsv: "Export CSV",
      sortBy: "Trier par",
      region: "Région",
      sorting: "Tri"
    }
  };

  const text = t[language as keyof typeof t] || t.french;

  // Weekly data
  const weeklyData = [
    { day: text.monday, COVID: 24, Paludisme: 45, Tuberculose: 12 },
    { day: text.tuesday, COVID: 32, Paludisme: 52, Tuberculose: 15 },
    { day: text.wednesday, COVID: 45, Paludisme: 48, Tuberculose: 18 },
    { day: text.thursday, COVID: 38, Paludisme: 55, Tuberculose: 14 },
    { day: text.friday, COVID: 52, Paludisme: 61, Tuberculose: 20 },
    { day: text.saturday, COVID: 48, Paludisme: 58, Tuberculose: 17 },
    { day: text.sunday, COVID: 41, Paludisme: 52, Tuberculose: 16 }
  ];

  // Regional data
  const regionalDataRaw = [
    { region: text.dakar, cases: 234, risk: 'high', riskValue: 3 },
    { region: text.thies, cases: 89, risk: 'medium', riskValue: 2 },
    { region: text.saintLouis, cases: 23, risk: 'low', riskValue: 1 },
    { region: text.kaolack, cases: 56, risk: 'medium', riskValue: 2 },
    { region: text.ziguinchor, cases: 34, risk: 'low', riskValue: 1 }
  ];

  // Sort regional data
  const regionalData = [...regionalDataRaw].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'region') {
      comparison = a.region.localeCompare(b.region);
    } else if (sortBy === 'cases') {
      comparison = a.cases - b.cases;
    } else if (sortBy === 'risk') {
      comparison = a.riskValue - b.riskValue;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column: 'region' | 'cases' | 'risk') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const exportToPDF = () => {
    alert(language === 'french' 
      ? 'Export PDF en cours... (Fonctionnalité de démonstration)'
      : 'Export PDF dafa dem... (Démonstration)');
  };

  const exportToExcel = () => {
    alert(language === 'french'
      ? 'Export Excel en cours... (Fonctionnalité de démonstration)'
      : 'Export Excel dafa dem... (Démonstration)');
  };

  const exportToCSV = () => {
    // Create CSV content
    const headers = `${text.region},${text.cases},${text.riskLevel}\n`;
    const rows = regionalData.map(r => `${r.region},${r.cases},${getRiskText(r.risk)}`).join('\n');
    const csvContent = headers + rows;
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `fagaru_rapport_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getRiskBadgeColor = (risk: string) => {
    switch(risk) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getRiskText = (risk: string) => {
    switch(risk) {
      case 'high': return text.high;
      case 'medium': return text.medium;
      case 'low': return text.low;
      default: return risk;
    }
  };

  // Summary statistics
  const stats = [
    {
      label: text.totalCases,
      value: "436",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      label: text.activeCases,
      value: "234",
      change: "+8%",
      trend: "up",
      icon: Activity,
      color: "bg-red-500",
      bgLight: "bg-red-50",
      textColor: "text-red-700"
    },
    {
      label: text.recovered,
      value: "189",
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      label: text.deaths,
      value: "13",
      change: "-2%",
      trend: "down",
      icon: BarChart3,
      color: "bg-slate-500",
      bgLight: "bg-slate-50",
      textColor: "text-slate-700"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-emerald-700 mb-2">{text.title}</h1>
          <p className="text-slate-600">{text.subtitle}</p>
        </div>
        
        {/* Export Buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={exportToPDF}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={exportToExcel}
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`p-4 border-2 ${stat.bgLight}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    stat.trend === 'up' ? 'text-red-600 border-red-300' : 'text-green-600 border-green-300'
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
              <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
              <p className={`${stat.textColor}`}>{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Weekly Evolution Chart */}
      <Card className="p-6 border-2 border-blue-200">
        <div className="mb-6">
          <h3 className="text-blue-700 mb-1">{text.weeklyEvolution}</h3>
          <p className="text-slate-600 text-sm">{text.byDisease}</p>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="day" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #cbd5e1',
                borderRadius: '12px',
                padding: '12px'
              }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Bar dataKey="COVID" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Paludisme" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Tuberculose" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Regional Statistics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Regional Cases Chart */}
        <Card className="p-6 border-2 border-emerald-200">
          <div className="mb-6">
            <h3 className="text-emerald-700 mb-1">{text.regionalStats}</h3>
            <p className="text-slate-600 text-sm">{text.byRegion}</p>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={regionalData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number"
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category"
                dataKey="region" 
                stroke="#64748b"
                style={{ fontSize: '12px' }}
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Bar dataKey="cases" fill="#059669" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Regional Details Table */}
        <Card className="p-6 border-2 border-purple-200">
          <div className="mb-6">
            <h3 className="text-purple-700 mb-1">{text.regionalStats}</h3>
            <p className="text-slate-600 text-sm">{text.riskLevel}</p>
          </div>
          
          <div className="space-y-3">
            {regionalData.map((region, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <p className="text-slate-800">{region.region}</p>
                  </div>
                  <Badge className={getRiskBadgeColor(region.risk)}>
                    {getRiskText(region.risk)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">{text.cases}</p>
                  <p className="text-slate-900">{region.cases}</p>
                </div>
                
                {/* Progress bar */}
                <div className="mt-3">
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        region.risk === 'high' ? 'bg-red-500' :
                        region.risk === 'medium' ? 'bg-orange-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(region.cases / 250) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Trend Line Chart */}
      <Card className="p-6 border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="mb-6">
          <h3 className="text-indigo-700 mb-1">{text.trends}</h3>
          <p className="text-slate-600 text-sm">{text.weeklyEvolution}</p>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="day" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #cbd5e1',
                borderRadius: '12px',
                padding: '12px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="COVID" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="Paludisme" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="Tuberculose" 
              stroke="#6366f1" 
              strokeWidth={3}
              dot={{ fill: '#6366f1', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Design Notes */}
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200">
        <h3 className="text-emerald-800 mb-4">
          {language === 'french' ? 'Caractéristiques du tableau de bord' : 'Ay caracteristique bu tableau de bord'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mb-2">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-800 mb-1">
              {language === 'french' ? 'Graphiques simples' : 'Graphique yu simple'}
            </p>
            <p className="text-slate-600 text-sm">
              {language === 'french' 
                ? 'Barres et lignes claires avec espacement aéré'
                : 'Ay barre ak ligne yu gëna mel ak espace bu rafet'
              }
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-800 mb-1">
              {language === 'french' ? 'Couleurs contrastées' : 'Melo yu bees'}
            </p>
            <p className="text-slate-600 text-sm">
              {language === 'french'
                ? 'Palette vert, bleu, rouge pour clarté'
                : 'Palette wert, bale, xonq ngir gëna mel'
              }
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-800 mb-1">
              {language === 'french' ? 'Lisibilité optimale' : 'Gëna jàng bu baax'}
            </p>
            <p className="text-slate-600 text-sm">
              {language === 'french'
                ? 'Espaces clairs entre éléments'
                : 'Espace bu gëna mel ci biir élément yi'
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Sorting Controls */}
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200">
        <h3 className="text-emerald-800 mb-4">
          {language === 'french' ? 'Trier les données' : 'Trier les données'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mb-2">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-800 mb-1">
              {language === 'french' ? 'Par r��gion' : 'Par région'}
            </p>
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={() => handleSort('region')}
            >
              {text.sortBy} {text.region}
            </Button>
          </div>
          
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mb-2">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-800 mb-1">
              {language === 'french' ? 'Par cas' : 'Par cas'}
            </p>
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={() => handleSort('cases')}
            >
              {text.sortBy} {text.cases}
            </Button>
          </div>
          
          <div className="p-4 bg-white rounded-lg">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-800 mb-1">
              {language === 'french' ? 'Par risque' : 'Par risque'}
            </p>
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={() => handleSort('risk')}
            >
              {text.sortBy} {text.riskLevel}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}