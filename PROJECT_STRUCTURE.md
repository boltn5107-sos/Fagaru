# Structure du Projet Fagaru

## Vue d'ensemble
Fagaru est une plateforme de surveillance épidémiologique communautaire pour le Sénégal, avec un système hiérarchique de validation des alertes sanitaires. Le projet utilise une architecture full-stack avec Django pour le backend et React pour le frontend.

## Backend (Django)

```
fagaru/
├── fagaru/                  # Configuration globale du projet Django
│   ├── settings.py          # Paramètres (BASE_DIR, INSTALLED_APPS, MIDDLEWARE, DATABASES, etc.)
│   ├── urls.py              # Routing principal (inclut les URLs des apps)
│   └── wsgi.py              # Configuration pour le déploiement
│
├── apps/
│   ├── users/               # Gestion des utilisateurs, rôles, authentification
│   │   ├── models.py        # Modèle User étendu avec rôles et permissions
│   │   ├── views.py         # Vues pour l'inscription, login, gestion des rôles
│   │   ├── serializers.py   # Sérialiseurs DRF pour les API utilisateurs
│   │   └── urls.py          # URLs spécifiques aux utilisateurs
│   │
│   ├── health/              # Profils santé, maladies, zones géographiques
│   │   ├── models.py        # Modèles HealthProfile, Disease, Zone, FieldData
│   │   ├── views.py         # Vues pour la gestion des données de santé
│   │   ├── serializers.py   # Sérialiseurs pour les API de santé
│   │   └── urls.py          # URLs pour les endpoints de santé
│   │
│   ├── alerts/              # Alertes sanitaires et flux hiérarchique
│   │   ├── models.py        # Modèle SanitaryAlert avec statuts et workflows
│   │   ├── views.py         # Vues pour la création et validation des alertes
│   │   ├── serializers.py   # Sérialiseurs pour les alertes
│   │   └── urls.py          # URLs pour les alertes
│   │
│   ├── content/             # Contenus multilingues et quiz
│   │   ├── models.py        # Modèles Content, Quiz, Question, QuizAnswer
│   │   ├── views.py         # Vues pour les contenus éducatifs
│   │   ├── serializers.py   # Sérialiseurs pour les contenus
│   │   └── urls.py          # URLs pour les contenus
│   │
│   └── ai/                  # Prédictions IA et explications XAI
│       ├── models.py        # Modèle AIPrediction avec champs explanation
│       ├── views.py         # Vues pour les prédictions IA
│       ├── serializers.py   # Sérialiseurs pour les prédictions
│       └── urls.py          # URLs pour les prédictions IA
│
├── static/                  # Fichiers statiques (CSS, JS, images)
├── media/                   # Fichiers uploadés (rapports, images utilisateurs)
├── requirements.txt         # Dépendances Python
└── manage.py                # Commandes Django
```

## Frontend (React)

```
src/
├── components/              # Composants réutilisables
│   ├── layout/              # Header, Footer, Sidebar (avec gestion des rôles)
│   │   ├── Header.jsx       # Barre de navigation avec sélecteur de rôle/langue
│   │   ├── Footer.jsx       # Pied de page avec liens
│   │   └── Sidebar.jsx      # Navigation latérale adaptée au rôle
│   │
│   ├── maps/                # Cartes interactives (Leaflet/Mapbox)
│   │   ├── InteractiveMap.jsx # Carte principale avec marqueurs
│   │   └── ZoneSelector.jsx   # Sélecteur de zones géographiques
│   │
│   ├── alerts/              # Cartes d'alertes, listes, formulaires
│   │   ├── AlertCard.jsx    # Carte individuelle d'alerte
│   │   ├── AlertList.jsx    # Liste des alertes avec filtres
│   │   └── AlertForm.jsx    # Formulaire de création d'alerte
│   │
│   ├── dashboard/           # Widgets et graphiques (Chart.js, D3.js)
│   │   ├── StatCard.jsx     # Carte de statistiques
│   │   ├── ChartWidget.jsx  # Graphiques réutilisables
│   │   └── RiskMap.jsx      # Carte des risques
│   │
│   └── forms/               # Formulaires (signalement, quiz, login)
│       ├── LoginForm.jsx    # Formulaire de connexion
│       ├── RegisterForm.jsx # Formulaire d'inscription
│       └── QuizForm.jsx     # Formulaire de quiz
│
├── pages/                   # Pages principales
│   ├── auth/                # Authentification
│   │   ├── Login.jsx        # Page de connexion
│   │   ├── Register.jsx     # Page d'inscription
│   │   └── ForgotPassword.jsx # Mot de passe oublié
│   │
│   ├── dashboard/           # Tableaux de bord par rôle
│   │   ├── CitizenDashboard.jsx  # Tableau de bord citoyen
│   │   ├── ASCDashboard.jsx      # Tableau de bord ASC
│   │   ├── ICPDashboard.jsx      # Tableau de bord ICP
│   │   └── RegionalDashboard.jsx # Tableau de bord régional
│   │
│   ├── alerts/              # Gestion des alertes
│   │   ├── AlertList.jsx    # Liste des alertes
│   │   ├── AlertDetail.jsx  # Détails d'une alerte
│   │   └── AlertValidation.jsx # Validation des alertes
│   │
│   ├── health/              # Données de santé
│   │   ├── HealthProfiles.jsx   # Profils santé
│   │   ├── DiseaseInfo.jsx      # Informations sur les maladies
│   │   └── FieldData.jsx        # Données terrain
│   │
│   ├── content/             # Contenus éducatifs
│   │   ├── ContentList.jsx  # Liste des contenus
│   │   ├── QuizPage.jsx     # Page de quiz
│   │   └── Recommendations.jsx # Recommandations
│   │
│   └── admin/               # Administration
│       ├── UserManagement.jsx   # Gestion des utilisateurs
│       └── SystemSettings.jsx   # Paramètres système
│
├── contexts/                # Contextes React
│   ├── AuthContext.jsx      # Gestion de l'authentification et des rôles
│   ├── LanguageContext.jsx  # Gestion de la langue (i18n)
│   └── OfflineContext.jsx   # Gestion des données hors-ligne
│
├── hooks/                   # Hooks personnalisés
│   ├── useFetch.jsx         # Requêtes API avec gestion d'erreurs
│   ├── useOffline.jsx       # Synchronisation hors-ligne
│   ├── useAuth.jsx          # Gestion de l'authentification
│   └── useMap.jsx           # Intégration des cartes
│
├── services/                # Appels API
│   ├── api.js               # Configuration Axios et endpoints
│   ├── auth.js              # Fonctions d'authentification
│   ├── alerts.js            # Fonctions pour les alertes
│   └── health.js            # Fonctions pour les données santé
│
├── utils/                   # Fonctions utilitaires
│   ├── formatters.js        # Formatage de dates, nombres, etc.
│   ├── validators.js        # Validation des formulaires
│   ├── translations.js      # Traductions (Wolof/Français)
│   └── constants.js         # Constantes globales
│
├── styles/                  # Styles globaux et thèmes
│   ├── global.css           # Styles de base
│   ├── theme.js             # Thème (couleurs, polices)
│   └── components/          # Styles par composant
│       ├── Button.css
│       ├── Card.css
│       └── Form.css
│
├── assets/                  # Ressources statiques
│   ├── images/              # Logos, icônes
│   │   ├── logo.png
│   │   └── icons/
│   └── fonts/               # Polices personnalisées
│       └── fagaru-font.woff2
│
├── App.jsx                  # Routing (React Router) et structure principale
├── index.jsx                # Point d'entrée de l'application
├── i18n.js                  # Configuration de l'internationalisation
└── config.js                # Configuration globale
```

## Fichiers de Configuration

```
.vscode/
├── settings.json            # Paramètres VS Code pour le projet
├── fagaru.code-snippets     # Snippets personnalisés
└── fagaru-context.md        # Contexte pour l'agent IA

.github/
├── workflows/               # CI/CD
└── ISSUE_TEMPLATE/          # Templates de issues

docs/
├── API.md                   # Documentation API
├── DEPLOYMENT.md            # Guide de déploiement
└── CONTRIBUTING.md          # Guide de contribution
```

## Architecture des Données

### Modèles Principaux
- **User**: Utilisateur avec rôle hiérarchique
- **Zone**: Zones géographiques (régions, districts, localités)
- **Disease**: Maladies surveillées
- **SanitaryAlert**: Alertes avec workflow de validation
- **HealthProfile**: Profils de santé des citoyens
- **Content**: Contenus éducatifs multilingues
- **AIPrediction**: Prédictions IA avec explications

### Flux de Données
1. **Signalement**: Citoyen/ASC → Alerte (PENDING)
2. **Validation**: ASC → ICP → Médecin → Validation finale
3. **Escalade**: Seuils dépassés → Niveau supérieur automatique
4. **IA**: Analyse des données → Prédictions → Alertes proactives

### Sécurité et Permissions
- **Rôles**: Citoyen, ASC, ICP, MédecinChefCentre, MédecinChefDistrict, Admin
- **Permissions**: Basées sur le rôle et la zone géographique
- **Authentification**: JWT avec refresh tokens
- **Audit**: Logs de toutes les actions sensibles
