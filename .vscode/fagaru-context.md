# Contexte pour l'Agent IA - Projet Fagaru

## Vue d'ensemble du Projet
Fagaru est une plateforme de surveillance épidémiologique communautaire pour le Sénégal, développée avec Django (backend) et React (frontend). Le système utilise une hiérarchie de validation des alertes sanitaires avec différents rôles utilisateur.

## Règles Métier Principales

### Hiérarchie des Rôles
```
Admin
├── MédecinChefDistrict
    ├── MédecinChefCentre
        ├── ICP (Infirmier Chef de Poste)
            ├── ASC (Agent de Santé Communautaire)
                └── Citoyen
```

### Flux de Validation des Alertes
1. **Création** : Citoyen/ASC crée alerte (statut: PENDING)
2. **Validation locale** : ASC valide (statut: VALIDATED_ASC)
3. **Validation ICP** : ICP confirme (statut: VALIDATED_ICP)
4. **Escalade** : Si seuils dépassés → MédecinChefCentre
5. **Résolution** : MédecinChefCentre clôture (statut: RESOLVED)

### Seuils d'Escalade Automatique
- **Localité** : 3 cas similaires → Escalade à ICP
- **District** : 10 cas/semaine → Escalade à MédecinChefCentre
- **Régional** : 50 cas/semaine → Escalade à MédecinChefDistrict
- **National** : 200 cas/semaine → Alerte nationale

### Permissions par Rôle
- **Citoyen** : Créer alertes, voir ses données, accéder aux contenus éducatifs
- **ASC** : Valider alertes locales, gérer sa zone, créer rapports
- **ICP** : Superviser ASC, valider alertes intermédiaires, gérer district
- **Médecin** : Valider alertes finales, prendre décisions médicales
- **Admin** : Gestion complète du système

## Structure des Données

### Modèles Django Principaux
- **User** : Utilisateur avec rôle, zone, permissions
- **Zone** : Entités géographiques (régions, districts, localités)
- **Disease** : Maladies surveillées (COVID-19, Paludisme, etc.)
- **SanitaryAlert** : Alertes avec workflow de validation
- **HealthProfile** : Profils santé des citoyens
- **Content** : Contenus éducatifs multilingues
- **AIPrediction** : Prédictions IA avec explications

### Relations Clés
- Alertes liées à des zones et des utilisateurs
- Utilisateurs assignés à des zones géographiques
- Permissions basées sur le rôle et la zone

## Patterns de Code à Suivre

### Backend (Django)
```python
# Structure standard d'un modèle
class ModelName(models.Model):
    """Description du modèle."""
    field_name = models.FieldType(options)
    related_field = models.ForeignKey(RelatedModel, on_delete=models.CASCADE)

    def business_method(self):
        """Méthode métier."""
        return logic_here

    def __str__(self):
        return f"Représentation: {self.field}"

# Structure standard d'un ViewSet
class ModelViewSet(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer

    def get_queryset(self):
        """Filtrage selon le rôle."""
        queryset = super().get_queryset()
        user = self.request.user

        if user.role == 'CITOYEN':
            return queryset.filter(zone=user.zone)
        return queryset
```

### Frontend (React)
```jsx
// Structure standard d'un composant
const ComponentName = ({ props }) => {
  const { user } = useAuth();
  const { data, loading, error } = useFetch('/api/endpoint/');

  const handleAction = async () => {
    try {
      // Logique métier
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur</div>;

  return (
    <div className="component-classes">
      {/* JSX */}
    </div>
  );
};

// Structure standard d'un hook
const useCustomHook = (params) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const action = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiCall();
      setState(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [deps]);

  return { state, loading, action };
};
```

## Endpoints API Courants

### Authentification
- `POST /api/auth/login/` : Connexion
- `POST /api/auth/register/` : Inscription
- `POST /api/auth/refresh/` : Rafraîchissement token

### Alertes
- `GET /api/alerts/` : Liste des alertes (filtrée par rôle)
- `POST /api/alerts/` : Création d'alerte
- `PATCH /api/alerts/{id}/validate/` : Validation d'alerte
- `GET /api/alerts/{id}/` : Détails d'une alerte

### Données de Santé
- `GET /api/health/profiles/` : Profils santé
- `GET /api/diseases/` : Liste des maladies
- `GET /api/zones/` : Zones géographiques

### Contenus
- `GET /api/content/` : Contenus éducatifs
- `POST /api/quiz/{id}/attempt/` : Tentative de quiz

## Bonnes Pratiques

### Sécurité
- Toujours vérifier les permissions avant les actions
- Utiliser les rôles pour filtrer les données
- Valider les données côté serveur
- Logs d'audit pour les actions sensibles

### Performance
- Pagination pour les listes importantes
- Cache Redis pour les données fréquentes
- Optimisation des requêtes (select_related, prefetch_related)
- Lazy loading côté frontend

### UX/UI
- Interfaces adaptées au rôle de l'utilisateur
- Feedback visuel pour les actions
- Gestion d'erreur user-friendly
- Support multilingue (Français/Wolof)

### Code Quality
- Commentaires détaillés pour la logique métier
- Tests unitaires et d'intégration
- Validation des données
- Gestion d'erreur robuste

## Exemples de Workflows

### Signalement d'Alerte
1. Citoyen remplit formulaire avec géolocalisation
2. Alerte créée avec statut PENDING
3. ASC de la zone reçoit notification
4. ASC valide → statut VALIDATED_ASC
5. ICP valide → statut VALIDATED_ICP
6. Escalade automatique si seuils dépassés

### Validation Hiérarchique
```python
def can_validate_alert(alert, user):
    role_levels = {
        'CITOYEN': 1, 'ASC': 2, 'ICP': 3,
        'MEDECIN_CHEF_CENTRE': 4, 'MEDECIN_CHEF_DISTRICT': 5,
        'ADMIN': 6
    }

    user_level = role_levels.get(user.role, 0)
    required_level = get_required_level_for_status(alert.status)

    return user_level >= required_level
```

### Filtrage par Rôle
```python
def get_queryset(self):
    user = self.request.user

    if user.role == 'CITOYEN':
        return Alert.objects.filter(zone=user.zone)
    elif user.role in ['ASC', 'ICP']:
        return Alert.objects.filter(zone__in=user.managed_zones.all())
    elif user.role.startswith('MEDECIN'):
        return Alert.objects.filter(zone__region=user.region)

    return Alert.objects.all()  # Admin voit tout
```

## Points d'Attention
- **Géolocalisation** : Toujours obligatoire pour les alertes
- **Multilinguisme** : Support Français/Wolof dans l'interface
- **Offline** : Mode hors-ligne pour les zones reculées
- **Confidentialité** : Données anonymisées pour les analyses
- **Temps réel** : Notifications push pour les alertes critiques

## Métriques Clés
- Taux de validation des alertes
- Temps moyen de réponse
- Couverture géographique
- Précision des prédictions IA
- Satisfaction utilisateur

Ce contexte doit guider toutes les décisions de développement et assurer la cohérence du système.
