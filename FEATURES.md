# Fonctionnalités de Fagaru

## Vue d'ensemble
Fagaru est une plateforme de surveillance épidémiologique communautaire avec un système hiérarchique de validation des alertes. Chaque fonctionnalité est adaptée aux rôles des utilisateurs (Citoyen, ASC, ICP, Médecin, etc.).

## 1. Authentification et Gestion des Rôles

### Description
- **Inscription** : Validation du rôle lors de l'inscription (Citoyen, ASC, ICP, etc.)
- **Connexion** : Authentification JWT avec stockage du token dans localStorage
- **Redirection** : Tableau de bord adapté au rôle après connexion
- **Gestion des rôles** : Changement de rôle possible pour les utilisateurs autorisés

### Backend
- **Endpoints** :
  - `POST /api/auth/login/` : Connexion utilisateur
  - `POST /api/auth/register/` : Inscription utilisateur
  - `POST /api/auth/refresh/` : Rafraîchissement du token
- **Modèle** : `User` (champs `role`, `zone`, `permissions`)
- **Permissions** : Seuls les admins peuvent créer des comptes ICP/Médecin

### Frontend
- **Composants** :
  - `LoginForm` : Formulaire de connexion
  - `RegisterForm` : Formulaire d'inscription avec sélecteur de rôle
  - `RoleSelector` : Composant de sélection du rôle
- **Context** : `AuthContext` pour la gestion globale de l'authentification
- **Flux utilisateur** :
  1. Sélection du rôle dans `RoleSelector`
  2. Saisie des informations dans `RegisterForm`
  3. Validation côté serveur
  4. Redirection vers `/dashboard/{role}`

### Règles Métier
- **Rôles disponibles** : Citoyen, ASC, ICP, MédecinChefCentre, MédecinChefDistrict, Admin
- **Validation** : Email unique, mot de passe fort, rôle valide
- **Sécurité** : Tentatives de connexion limitées, logs d'audit

---

## 2. Signalement et Validation des Alertes

### Description
- **Création** : Citoyen ou ASC peut signaler un cas suspect
- **Validation hiérarchique** : ASC → ICP → MédecinChefCentre → MédecinChefDistrict
- **Escalade automatique** : Si seuils dépassés (ex: 3 cas dans la même localité)
- **Workflow** : Statuts PENDING → VALIDATED → ESCALATED → RESOLVED

### Backend
- **Modèle** : `SanitaryAlert`
  ```python
  class SanitaryAlert(models.Model):
      STATUS_CHOICES = [
          ('PENDING', 'En attente'),
          ('VALIDATED', 'Validée'),
          ('REJECTED', 'Rejetée'),
          ('ESCALATED', 'Escaladée'),
      ]
      alert_type = models.CharField(max_length=50)
      description = models.TextField()
      status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
      emitter = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
      zone = models.ForeignKey(Zone, on_delete=models.SET_NULL, null=True)
      validated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  ```
- **Endpoints** :
  - `POST /api/alerts/` : Création d'alerte
  - `PATCH /api/alerts/{id}/validate/` : Validation d'alerte
  - `GET /api/alerts/?zone={id}&status={status}` : Liste filtrée
- **Logique métier** : Vérification des seuils dans `alerts/signals.py`

### Frontend
- **Composants** :
  - `AlertForm` : Formulaire de signalement avec géolocalisation
  - `AlertList` : Liste des alertes avec filtres par statut/zone
  - `AlertDetail` : Détails d'une alerte avec boutons d'action
  - `AlertValidation` : Interface de validation pour ICP+
- **Hooks** : `useAlerts` pour la gestion des alertes
- **Exemple d'interaction** :
  ```jsx
  // Dans AlertList.jsx
  {alerts.map(alert => (
    <AlertCard
      key={alert.id}
      alert={alert}
      onValidate={() => validateAlert(alert.id)}
      canValidate={user.role === 'ICP' || user.role === 'MEDECIN'}
    />
  ))}
  ```

### Règles Métier
- **Seuils d'escalade** :
  - 1 cas rare → ICP
  - 3 cas même localité → MédecinChefCentre
  - 5 cas même semaine → MédecinChefDistrict
- **Validation** : Uniquement par utilisateurs de niveau supérieur
- **Notifications** : Email/SMS aux validateurs concernés

---

## 3. Tableaux de Bord par Rôle

### Description
Chaque rôle a un tableau de bord personnalisé avec des indicateurs spécifiques et des actions contextuelles.

#### Citoyen
- **Indicateurs** : Mes signalements, Quiz complétés, Recommandations personnelles
- **Actions** : Créer alerte, Voir profil santé, Accéder aux contenus

#### ASC (Agent de Santé Communautaire)
- **Indicateurs** : Signalements validés, Couverture terrain, Alertes en attente
- **Actions** : Valider alertes locales, Voir carte de zone, Générer rapports

#### ICP (Infirmier Chef de Poste)
- **Indicateurs** : Taux de validation, Alertes en attente, Tendances locales
- **Actions** : Valider alertes, Escalader si nécessaire, Gérer ASC

#### Médecin Régional
- **Indicateurs** : Cartes de risques, Tendances épidémiques, Couverture vaccinale
- **Actions** : Valider alertes régionales, Générer rapports, Coordonner réponse

### Backend
- **Endpoints spécialisés** :
  - `GET /api/dashboard/citizen/` : Données pour citoyens
  - `GET /api/dashboard/asc/` : Données pour ASC
  - `GET /api/dashboard/icp/` : Données pour ICP
  - `GET /api/dashboard/regional/` : Données pour médecins régionaux
- **Filtrage** : Données filtrées selon le rôle et la zone de l'utilisateur

### Frontend
- **Structure commune** :
  ```jsx
  // DashboardLayout.jsx
  const DashboardLayout = ({ children, user }) => (
    <div className="dashboard">
      <Header user={user} />
      <Sidebar role={user.role} />
      <main>{children}</main>
    </div>
  );
  ```
- **Composants spécifiques** :
  - `CitizenDashboard` : Focus sur l'éducation et le signalement
  - `ASCDashboard` : Focus sur la validation locale
  - `ICPDashboard` : Focus sur la supervision
  - `RegionalDashboard` : Focus sur l'analyse régionale

### Règles Métier
- **Accès** : Chaque rôle ne voit que ses données pertinentes
- **Actions** : Boutons d'action adaptés aux permissions
- **Mises à jour** : Données en temps réel via WebSockets

---

## 4. Gestion des Contenus Éducatifs

### Description
- **Contenus multilingues** : Articles, vidéos, infographies en français/wolof
- **Quiz interactifs** : Évaluation des connaissances des citoyens
- **Recommandations personnalisées** : Basées sur le profil santé et la zone

### Backend
- **Modèles** :
  - `Content` : Articles et médias éducatifs
  - `Quiz` : Questionnaires avec réponses
  - `QuizAttempt` : Tentatives de quiz par utilisateur
- **Endpoints** :
  - `GET /api/content/?language={lang}&category={cat}`
  - `POST /api/quiz/{id}/attempt/`

### Frontend
- **Composants** :
  - `ContentViewer` : Lecteur de contenus
  - `QuizPlayer` : Interface de quiz
  - `RecommendationEngine` : Moteur de recommandations

---

## 5. Prédictions IA et Alertes Proactives

### Description
- **Analyse prédictive** : Modèles IA pour anticiper les épidémies
- **Explications XAI** : Explications compréhensibles des prédictions
- **Alertes automatiques** : Génération d'alertes basée sur les prédictions

### Backend
- **Modèle** : `AIPrediction`
  ```python
  class AIPrediction(models.Model):
      zone = models.ForeignKey(Zone, on_delete=models.CASCADE)
      disease = models.ForeignKey(Disease, on_delete=models.CASCADE)
      risk_level = models.CharField(max_length=10, choices=RISK_CHOICES)
      confidence_score = models.FloatField()
      xai_explanation = models.TextField()
      prediction_date = models.DateTimeField(auto_now_add=True)
  ```
- **Services IA** : Intégration avec modèles de ML (Prophet, ARIMA, etc.)

### Frontend
- **Visualisations** :
  - Graphiques de tendances avec intervalles de confiance
  - Cartes thermiques des risques
  - Explications IA en langage naturel

---

## 6. Synchronisation et Mode Hors-ligne

### Description
- **Synchronisation bidirectionnelle** : Données locales ↔ Serveur
- **Mode hors-ligne** : Fonctionnalités de base disponibles sans connexion
- **Résolution de conflits** : Gestion des modifications concurrentes

### Backend
- **API de synchronisation** : Endpoints pour upload/download de données
- **Versioning** : Timestamps pour la résolution de conflits

### Frontend
- **Context** : `OfflineContext` pour la gestion du mode hors-ligne
- **Hooks** : `useOffline` pour la synchronisation automatique
- **Stockage** : IndexedDB pour les données locales

---

## 7. Intégration DHIS2

### Description
- **Connexion DHIS2** : Synchronisation avec le système national de santé
- **Export anonymisé** : Données agrégées sans informations personnelles
- **Import de données** : Intégration des statistiques nationales

### Backend
- **Connecteur DHIS2** : API client pour DHIS2
- **Transformation** : Conversion des données Fagaru vers format DHIS2
- **Planification** : Synchronisation automatique périodique

### Frontend
- **Interface d'administration** : Contrôle de la synchronisation
- **Visualisation** : Données DHIS2 intégrées dans les tableaux de bord

---

## Règles Métier Globales

### Hiérarchie des Rôles
```
Admin
├── MédecinChefDistrict
    ├── MédecinChefCentre
        ├── ICP
            ├── ASC
                └── Citoyen
```

### Flux de Validation des Alertes
1. **Création** : Citoyen/ASC crée alerte (statut: PENDING)
2. **Validation locale** : ASC valide (statut: VALIDATED)
3. **Validation ICP** : ICP confirme (statut: CONFIRMED)
4. **Escalade** : Si seuils dépassés → MédecinChefCentre
5. **Résolution** : MédecinChefCentre clôture (statut: RESOLVED)

### Seuils d'Escalade
- **Localité** : 3 cas similaires → Escalade à ICP
- **District** : 10 cas/semaine → Escalade à MédecinChefCentre
- **Régional** : 50 cas/semaine → Escalade à MédecinChefDistrict
- **National** : 200 cas/semaine → Alerte nationale

### Sécurité et Confidentialité
- **RGPD compliant** : Consentement pour données personnelles
- **Anonymisation** : Données agrégées pour analyses
- **Audit** : Logs de toutes les actions sensibles
- **Chiffrement** : Données sensibles chiffrées en base

### Performance
- **Cache** : Redis pour les données fréquemment consultées
- **Pagination** : API paginée pour les grandes listes
- **Optimisation** : Requêtes optimisées avec select_related/prefetch_related
