import { MapPin, ZoomIn, ZoomOut, Info, Bug, Plus, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState, useEffect, useRef } from "react";

// Import Leaflet avec vérification
let L: any;
if (typeof window !== "undefined") {
  import("leaflet").then((module) => {
    L = module.default;

    // Fix pour les icônes Leaflet dans React
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  });
}

// Import CSS de Leaflet
import "leaflet/dist/leaflet.css";

interface MapInterfaceProps {
  language: string;
}

interface CaseReport {
  id: number;
  region: string;
  disease: string;
  cases: number;
  description: string;
  date: string;
  latitude?: number;
  longitude?: number;
}

// Données géographiques des régions du Sénégal
const senegalRegions = {
  dakar: { name: "Dakar", lat: 14.7167, lon: -17.4677, zoom: 11 },
  thies: { name: "Thiès", lat: 14.8, lon: -16.9333, zoom: 10 },
  saintlouis: { name: "Saint-Louis", lat: 16.0333, lon: -16.5, zoom: 11 },
  kaolack: { name: "Kaolack", lat: 14.1389, lon: -16.0764, zoom: 11 },
  ziguinchor: { name: "Ziguinchor", lat: 12.5833, lon: -16.2667, zoom: 11 },
  tambacounda: { name: "Tambacounda", lat: 13.7689, lon: -13.6672, zoom: 10 },
  kolda: { name: "Kolda", lat: 12.8833, lon: -14.95, zoom: 11 },
  kedougou: { name: "Kédougou", lat: 12.55, lon: -12.1833, zoom: 11 },
  matam: { name: "Matam", lat: 15.6558, lon: -13.2554, zoom: 11 },
  fatick: { name: "Fatick", lat: 14.3244, lon: -16.4111, zoom: 11 },
  diourbel: { name: "Diourbel", lat: 14.655, lon: -16.2314, zoom: 11 },
  louga: { name: "Louga", lat: 15.6167, lon: -16.2167, zoom: 11 },
};

export default function MapInterface({ language }: MapInterfaceProps) {
  const [zoom, setZoom] = useState(7);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>("all");
  const [filterDisease, setFilterDisease] = useState<string>("all");
  const [map, setMap] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const [reports, setReports] = useState<CaseReport[]>([
    {
      id: 1,
      region: "Dakar",
      disease: "COVID-19",
      cases: 3,
      description:
        language === "french"
          ? "Cas confirmés dans le quartier"
          : "Cas yi nekk ci quartier bi",
      date: new Date().toISOString(),
      latitude: 14.7167,
      longitude: -17.4677,
    },
  ]);

  const [formData, setFormData] = useState({
    region: "",
    disease: "",
    cases: "",
    description: "",
    location: "",
  });

  // Initialiser la carte Leaflet
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initMap = async () => {
      const L = await import("leaflet");

      if (mapRef.current && !map) {
        const leafletMap = L.map(mapRef.current).setView(
          [14.4974, -14.4524],
          zoom
        );

        // Ajouter la couche de tuiles OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(leafletMap);

        setMap(leafletMap);
        setIsMapReady(true);

        // Nettoyage lors du démontage
        return () => {
          leafletMap.remove();
        };
      }
    };

    initMap();
  }, [map, zoom]);

  const regions = [
    {
      id: "dakar",
      name: "Dakar",
      risk: "high",
      cases: 234,
      trend: "+12%",
      x: 30,
      y: 40,
      reported: 45,
      advice:
        language === "french"
          ? "Portez un masque en public. Lavez-vous les mains régulièrement."
          : "Takkal masque ci biir réew. Saññal sa loxo ci yoon-yoon.",
    },
    {
      id: "thies",
      name: "Thiès",
      risk: "medium",
      cases: 89,
      trend: "+5%",
      x: 35,
      y: 45,
      reported: 23,
      advice:
        language === "french"
          ? "Surveillez les symptômes. Consultez si nécessaire."
          : "Gis symptômes yi. Dem ci doktoor bu am solo.",
    },
    {
      id: "saintlouis",
      name: "Saint-Louis",
      risk: "low",
      cases: 23,
      trend: "-3%",
      x: 32,
      y: 15,
      reported: 8,
      advice:
        language === "french"
          ? "Continuez les mesures préventives de base."
          : "Jël ci jàpp ay mesures bu jàpp.",
    },
    {
      id: "kaolack",
      name: "Kaolack",
      risk: "medium",
      cases: 56,
      trend: "+8%",
      x: 45,
      y: 55,
      reported: 18,
      advice:
        language === "french"
          ? "Évitez les rassemblements. Restez vigilant."
          : "Jël ci ay bokk. Gis sa bopp.",
    },
    {
      id: "ziguinchor",
      name: "Ziguinchor",
      risk: "low",
      cases: 34,
      trend: "-2%",
      x: 25,
      y: 70,
      reported: 12,
      advice:
        language === "french"
          ? "Zone sous contrôle. Respectez les protocoles."
          : "Bopp bi dafa am contrôle. Jël ci protocoles.",
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  const getRiskTextColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-slate-600";
    }
  };

  const getRiskBorderColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "border-red-600";
      case "medium":
        return "border-orange-600";
      case "low":
        return "border-green-600";
      default:
        return "border-slate-600";
    }
  };


  // Filter regions based on active filters
  const filteredRegions = regions.filter((region) => {
    if (filterRegion !== "all" && region.id !== filterRegion) return false;
    if (filterRiskLevel !== "all" && region.risk !== filterRiskLevel)
      return false;
    return true;
  });

  // Filter reports based on active filters
  const filteredReports = reports.filter((report) => {
    if (filterRegion !== "all") {
      const regionName = regions.find((r) => r.id === filterRegion)?.name;
      if (report.region !== regionName) return false;
    }
    if (filterDisease !== "all" && report.disease !== filterDisease)
      return false;
    return true;
  });


  // Mettre à jour les marqueurs quand les régions ou les filtres changent
  useEffect(() => {
    if (!map || !isMapReady) return;

    // Supprimer les anciens marqueurs
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    filteredRegions.forEach((region) => {
      const regionGeo =
        senegalRegions[region.id as keyof typeof senegalRegions];
      if (regionGeo) {
        // Créer un marqueur personnalisé avec couleur selon le risque
        const icon = L.divIcon({
          html: `
            <div class="relative">
              <div class="w-8 h-8 rounded-full ${getRiskColor(
                region.risk
              )} border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border border-slate-200 flex items-center justify-center text-xs">
                ${region.reported}
              </div>
            </div>
          `,
          className: "custom-marker",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        const marker = L.marker([regionGeo.lat, regionGeo.lon], { icon }).addTo(
          map
        ).bindPopup(`
            <div class="p-2 min-w-[200px]">
              <h3 class="font-bold text-lg mb-1">${region.name}</h3>
              <p class="${getRiskTextColor(region.risk)} text-sm mb-2">
                ${
                  region.risk === "high"
                    ? "Risque élevé"
                    : region.risk === "medium"
                    ? "Vigilance"
                    : "Faible risque"
                }
              </p>
              <p class="text-sm text-gray-600">Cas signalés: <span class="font-semibold">${
                region.reported
              }</span></p>
              <p class="text-sm text-gray-600 mb-2">Total cas: <span class="font-semibold">${
                region.cases
              }</span></p>
              <p class="text-xs text-slate-500 border-t pt-2">${
                region.advice
              }</p>
              <button class="mt-2 w-full px-3 py-1.5 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors" onclick="document.dispatchEvent(new CustomEvent('selectRegion', { detail: '${
                region.id
              }' }))">
                Voir détails
              </button>
            </div>
          `);

        marker.on("click", () => {
          setSelectedRegion(region.id);
        });
      }
    });
    

    // Ajouter les rapports comme marqueurs supplémentaires
    filteredReports.forEach((report) => {
      if (report.latitude && report.longitude) {
        const reportIcon = L.divIcon({
          html: `
            <div class="relative">
              <div class="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-md flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          `,
          className: "report-marker",
          iconSize: [24, 24],
          iconAnchor: [12, 24],
        });

        const marker = L.marker([report.latitude, report.longitude], {
          icon: reportIcon,
        }).addTo(map).bindPopup(`
            <div class="p-2">
              <h4 class="font-bold text-sm">${report.disease}</h4>
              <p class="text-xs text-gray-600">${report.region}</p>
              <p class="text-xs">Cas: ${report.cases}</p>
              <p class="text-xs text-slate-400">${new Date(
                report.date
              ).toLocaleDateString()}</p>
            </div>
          `);
      }
    });

    // Gérer l'événement depuis le popup
    const handleSelectRegion = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSelectedRegion(customEvent.detail);
    };

    document.addEventListener("selectRegion", handleSelectRegion);

    return () => {
      document.removeEventListener("selectRegion", handleSelectRegion);
    };
  }, [map, filteredRegions, filteredReports, zoom, isMapReady]);

  

  const t = {
    wolof: {
      title: "Kaart bu Adduna",
      subtitle: "Ay bopp yu am solo ci adduna",
      legend: "Légende",
      high: "Am solo",
      medium: "Njëkk-njëkk",
      low: "Amul lu bare",
      cases: "Ay cas",
      trend: "Tendance",
      advice: "Ay waxtaan",
      close: "Taxaw",
      reported: "Cas yi tànnal",
      lastUpdate: "Yeesal bu mujj",
      zoomIn: "Yaakal",
      zoomOut: "Wàññi",
      clickZone: "Bësal ci bopp bu am solo ngir gis lu ëpp",
      reportCase: "Tànnal cas",
      reportDialogTitle: "Tànnal cas bu bees",
      reportDialogDesc: "Tànnal cas bu wér-gu-yaram ci sa bopp",
      selectRegion: "Tann bopp",
      selectDisease: "Tann wér-gu-yaram",
      numberOfCases: "Limu cas",
      description: "Bataaxal",
      location: "Nuy nekk",
      submit: "Yónne",
      cancel: "Taxaw",
      recentReports: "Ay tànnal bu bees",
      noReports: "Amul tànnal",
      covid19: "COVID-19",
      malaria: "Paludisme",
      tuberculosis: "Tuberculose",
      dengue: "Dengue",
      cholera: "Choléra",
      other: "Yeneen",
      senegal: "Senegaal",
      france: "Faransi",
      usa: "Amerik",
      china: "Siin",
      india: "End",
      brazil: "Bareesil",
      nigeria: "Niseeriyaa",
      southAfrica: "Afrik di Sud",
      reportSuccess: "Tànnal bi dafa am succès!",
      filters: "Filtres",
      filterByRegion: "Trier ci gox",
      filterByRisk: "Trier ci niveau bu solo",
      filterByDisease: "Trier ci wér-gu-yaram",
      allRegions: "Gox yépp",
      allRisks: "Niveau yépp",
      allDiseases: "Wér-gu-yaram yépp",
      resetFilters: "Wàññi filtres",
      activeFilters: "Filtres yu am solo",
      noResults: "Amul résultats",
      mapView: "Wone ci kaart",
      satelliteView: "Wone ci satellite",
      resetView: "Doggali kaart",
      coordinates: "Coordonnées",
      loadingMap: "Kaart bi di wàcc...",
    },
    french: {
      title: "Carte Interactive du Monde",
      subtitle: "Zones à risque en temps réel",
      legend: "Légende",
      high: "Risque élevé",
      medium: "Vigilance",
      low: "Faible risque",
      cases: "Cas",
      trend: "Tendance",
      advice: "Conseils",
      close: "Fermer",
      reported: "Cas signalés",
      lastUpdate: "Dernière mise à jour",
      zoomIn: "Zoomer",
      zoomOut: "Dézoomer",
      clickZone: "Cliquez sur une zone pour plus de détails",
      reportCase: "Signaler un cas",
      reportDialogTitle: "Signaler un nouveau cas",
      reportDialogDesc:
        "Aidez-nous à suivre les maladies en signalant les cas dans votre région",
      selectRegion: "Sélectionner la région",
      selectDisease: "Sélectionner la maladie",
      numberOfCases: "Nombre de cas",
      description: "Description",
      location: "Localisation précise",
      submit: "Envoyer",
      cancel: "Annuler",
      recentReports: "Signalements récents",
      noReports: "Aucun signalement",
      covid19: "COVID-19",
      malaria: "Paludisme",
      tuberculosis: "Tuberculose",
      dengue: "Dengue",
      cholera: "Choléra",
      other: "Autre",
      senegal: "Sénégal",
      france: "France",
      usa: "États-Unis",
      china: "Chine",
      india: "Inde",
      brazil: "Brésil",
      nigeria: "Nigéria",
      southAfrica: "Afrique du Sud",
      reportSuccess: "Signalement envoyé avec succès!",
      filters: "Filtres",
      filterByRegion: "Filtrer par région",
      filterByRisk: "Filtrer par risque",
      filterByDisease: "Filtrer par maladie",
      allRegions: "Toutes les régions",
      allRisks: "Tous les niveaux",
      allDiseases: "Toutes les maladies",
      resetFilters: "Réinitialiser",
      activeFilters: "Filtres actifs",
      noResults: "Aucun résultat",
      mapView: "Vue carte",
      satelliteView: "Vue satellite",
      resetView: "Réinitialiser la vue",
      coordinates: "Coordonnées",
      loadingMap: "Chargement de la carte...",
    },
  };

  const text = t[language as keyof typeof t] || t.french;

  const handleSubmitReport = () => {
    if (!formData.region || !formData.disease || !formData.cases) {
      alert(
        language === "french"
          ? "Veuillez remplir tous les champs obligatoires"
          : "Tàmbal bépp ci sa bopp"
      );
      return;
    }

    const regionGeo =
      senegalRegions[formData.region as keyof typeof senegalRegions];
    const newReport: CaseReport = {
      id: reports.length + 1,
      region: formData.region,
      disease: formData.disease,
      cases: parseInt(formData.cases),
      description: formData.description,
      date: new Date().toISOString(),
      latitude: regionGeo?.lat,
      longitude: regionGeo?.lon,
    };

    setReports([newReport, ...reports]);
    setFormData({
      region: "",
      disease: "",
      cases: "",
      description: "",
      location: "",
    });
    setReportDialogOpen(false);
    alert(text.reportSuccess);

    // Centrer la carte sur la région signalée
    if (regionGeo && map) {
      map.setView([regionGeo.lat, regionGeo.lon], 11);
      setZoom(11);
    }
  };

  
  const selectedRegionData = regions.find((r) => r.id === selectedRegion);

  
  const resetFilters = () => {
    setFilterRegion("all");
    setFilterRiskLevel("all");
    setFilterDisease("all");
  };

  const resetMapView = () => {
    if (map && isMapReady) {
      map.setView([14.4974, -14.4524], 7);
      setZoom(7);
    }
  };

  const hasActiveFilters =
    filterRegion !== "all" ||
    filterRiskLevel !== "all" ||
    filterDisease !== "all";

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-emerald-700 mb-2">{text.title}</h1>
          <p className="text-slate-600">{text.subtitle}</p>
        </div>

        {/* Report Case Button */}
        <Button
          onClick={() => setReportDialogOpen(true)}
          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {text.reportCase}
        </Button>
      </div>

      {/* Map Card */}
      <Card className="p-6 border-2 border-emerald-200">
        {/* Filters Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-800">{text.filters}</h3>
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={resetFilters}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  {text.resetFilters}
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={resetMapView}
                className="text-blue-600 hover:text-blue-700"
              >
                <MapPin className="w-4 h-4 mr-1" />
                {text.resetView}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter by Region */}
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                {text.filterByRegion}
              </Label>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allRegions}</SelectItem>
                  <SelectItem value="dakar">Dakar</SelectItem>
                  <SelectItem value="thies">Thiès</SelectItem>
                  <SelectItem value="saintlouis">Saint-Louis</SelectItem>
                  <SelectItem value="kaolack">Kaolack</SelectItem>
                  <SelectItem value="ziguinchor">Ziguinchor</SelectItem>
                  <SelectItem value="tambacounda">Tambacounda</SelectItem>
                  <SelectItem value="kolda">Kolda</SelectItem>
                  <SelectItem value="kedougou">Kédougou</SelectItem>
                  <SelectItem value="matam">Matam</SelectItem>
                  <SelectItem value="fatick">Fatick</SelectItem>
                  <SelectItem value="diourbel">Diourbel</SelectItem>
                  <SelectItem value="louga">Louga</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter by Risk Level */}
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                {text.filterByRisk}
              </Label>
              <Select
                value={filterRiskLevel}
                onValueChange={setFilterRiskLevel}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allRisks}</SelectItem>
                  <SelectItem value="high">{text.high}</SelectItem>
                  <SelectItem value="medium">{text.medium}</SelectItem>
                  <SelectItem value="low">{text.low}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter by Disease */}
            <div className="space-y-2">
              <Label className="text-sm text-slate-700">
                {text.filterByDisease}
              </Label>
              <Select value={filterDisease} onValueChange={setFilterDisease}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.allDiseases}</SelectItem>
                  <SelectItem value="COVID-19">{text.covid19}</SelectItem>
                  <SelectItem value="Paludisme">{text.malaria}</SelectItem>
                  <SelectItem value="Tuberculose">
                    {text.tuberculosis}
                  </SelectItem>
                  <SelectItem value="Dengue">{text.dengue}</SelectItem>
                  <SelectItem value="Choléra">{text.cholera}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-slate-600">
                {text.activeFilters}:
              </span>
              {filterRegion !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-white border-emerald-300 text-emerald-700"
                >
                  {
                    senegalRegions[filterRegion as keyof typeof senegalRegions]
                      ?.name
                  }
                </Badge>
              )}
              {filterRiskLevel !== "all" && (
                <Badge
                  variant="outline"
                  className={
                    filterRiskLevel === "high"
                      ? "bg-red-50 border-red-300 text-red-700"
                      : filterRiskLevel === "medium"
                      ? "bg-orange-50 border-orange-300 text-orange-700"
                      : "bg-green-50 border-green-300 text-green-700"
                  }
                >
                  {filterRiskLevel === "high"
                    ? text.high
                    : filterRiskLevel === "medium"
                    ? text.medium
                    : text.low}
                </Badge>
              )}
              {filterDisease !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-white border-blue-300 text-blue-700"
                >
                  {filterDisease}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-slate-800">{text.title}</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setZoom(Math.min(zoom + 1, 18))}
              disabled={zoom >= 18}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setZoom(Math.max(zoom - 1, 3))}
              disabled={zoom <= 3}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Interactive Map Container */}
        <div className="relative bg-white rounded-xl overflow-hidden border-2 border-slate-200">
          <div
            ref={mapRef}
            className="w-full h-[500px] rounded-lg"
            style={{
              minHeight: "500px",
              backgroundColor: "#f0f9ff",
            }}
          >
            {!isMapReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  <p className="text-slate-600">{text.loadingMap}</p>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-slate-300 z-[1000]">
            <p className="text-slate-700 mb-2 font-medium text-sm">
              {text.legend}
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-slate-700 text-xs">{text.high}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span className="text-slate-700 text-xs">{text.medium}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-slate-700 text-xs">{text.low}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 pt-1 border-t border-slate-200">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-slate-700 text-xs">{text.reported}</span>
              </div>
            </div>
          </div>

          {/* Current Zoom Display */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-slate-300 z-[1000]">
            <span className="text-xs text-slate-600">
              {text.zoomIn}: {zoom}
            </span>
          </div>
        </div>
      </Card>

      {/* Region Details Modal */}
      {selectedRegionData && (
        <Card
          className={`p-6 border-3 ${getRiskBorderColor(
            selectedRegionData.risk
          )} animate-in fade-in slide-in-from-bottom-4 duration-300`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-slate-800 mb-1">{selectedRegionData.name}</h3>
              <Badge
                className={
                  selectedRegionData.risk === "high"
                    ? "bg-red-100 text-red-700 border-red-300"
                    : selectedRegionData.risk === "medium"
                    ? "bg-orange-100 text-orange-700 border-orange-300"
                    : "bg-green-100 text-green-700 border-green-300"
                }
              >
                {selectedRegionData.risk === "high"
                  ? text.high
                  : selectedRegionData.risk === "medium"
                  ? text.medium
                  : text.low}
              </Badge>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedRegion(null)}
            >
              {text.close}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-slate-500 text-sm mb-1">{text.cases}</p>
              <p className="text-slate-900 text-lg font-semibold">
                {selectedRegionData.cases}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-slate-500 text-sm mb-1">{text.reported}</p>
              <p className="text-slate-900 text-lg font-semibold">
                {selectedRegionData.reported}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-slate-500 text-sm mb-1">{text.trend}</p>
              <p
                className={`text-lg font-semibold ${
                  selectedRegionData.trend.startsWith("+")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {selectedRegionData.trend}
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-blue-900 font-medium">{text.advice}</p>
            </div>
            <p className="text-blue-700 text-sm">{selectedRegionData.advice}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-slate-500 text-sm">
              {text.lastUpdate}:{" "}
              {language === "french" ? "Il y a 2 heures" : "2 waxtu ci ginaaw"}
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const regionGeo =
                  senegalRegions[
                    selectedRegionData.id as keyof typeof senegalRegions
                  ];
                if (regionGeo && map) {
                  map.setView([regionGeo.lat, regionGeo.lon], 11);
                  setZoom(11);
                }
              }}
              className="text-emerald-600 hover:text-emerald-700"
            >
              <MapPin className="w-4 h-4 mr-1" />
              {text.mapView}
            </Button>
          </div>
        </Card>
      )}

      {/* Report Case Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{text.reportDialogTitle}</DialogTitle>
            <DialogDescription>{text.reportDialogDesc}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="region">{text.selectRegion}</Label>
              <Select
                value={formData.region}
                onValueChange={(value) =>
                  setFormData({ ...formData, region: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={text.selectRegion} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dakar">Dakar</SelectItem>
                  <SelectItem value="thies">Thiès</SelectItem>
                  <SelectItem value="saintlouis">Saint-Louis</SelectItem>
                  <SelectItem value="kaolack">Kaolack</SelectItem>
                  <SelectItem value="ziguinchor">Ziguinchor</SelectItem>
                  <SelectItem value="tambacounda">Tambacounda</SelectItem>
                  <SelectItem value="kolda">Kolda</SelectItem>
                  <SelectItem value="kedougou">Kédougou</SelectItem>
                  <SelectItem value="matam">Matam</SelectItem>
                  <SelectItem value="fatick">Fatick</SelectItem>
                  <SelectItem value="diourbel">Diourbel</SelectItem>
                  <SelectItem value="louga">Louga</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="disease">{text.selectDisease}</Label>
              <Select
                value={formData.disease}
                onValueChange={(value) =>
                  setFormData({ ...formData, disease: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={text.selectDisease} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COVID-19">{text.covid19}</SelectItem>
                  <SelectItem value="Paludisme">{text.malaria}</SelectItem>
                  <SelectItem value="Tuberculose">
                    {text.tuberculosis}
                  </SelectItem>
                  <SelectItem value="Dengue">{text.dengue}</SelectItem>
                  <SelectItem value="Choléra">{text.cholera}</SelectItem>
                  <SelectItem value="Autre">{text.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cases">{text.numberOfCases}</Label>
              <Input
                id="cases"
                type="number"
                value={formData.cases}
                onChange={(e) =>
                  setFormData({ ...formData, cases: e.target.value })
                }
                placeholder="0"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{text.description}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder={text.description}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{text.location}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder={text.location}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReportDialogOpen(false)}
            >
              {text.cancel}
            </Button>
            <Button
              onClick={handleSubmitReport}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {text.submit}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Recent Reports Card */}
      <Card className="p-6 border-2 border-emerald-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-slate-800">{text.recentReports}</h3>
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            {filteredReports.length} {text.reported.toLowerCase()}
          </Badge>
        </div>
        {filteredReports.length > 0 ? (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {report.disease}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-700 border-slate-300"
                      >
                        {report.cases} {text.cases.toLowerCase()}
                      </Badge>
                    </div>
                    <p className="text-slate-500 text-sm mb-2">
                      {report.region}
                    </p>
                    <p className="text-slate-700 text-sm">
                      {report.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (report.latitude && report.longitude && map) {
                        map.setView([report.latitude, report.longitude], 12);
                        setZoom(12);
                      }
                    }}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {text.mapView}
                  </Button>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-300">
                  <p className="text-slate-400 text-xs">
                    {new Date(report.date).toLocaleString()}
                  </p>
                  {report.latitude && report.longitude && (
                    <p className="text-slate-400 text-xs">
                      {text.coordinates}: {report.latitude.toFixed(4)},{" "}
                      {report.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">{text.noResults}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
