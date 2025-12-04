// examples/AlertList.example.jsx
/**
 * Exemple de composant React pour afficher la liste des alertes dans Fagaru.
 *
 * Ce composant montre comment implémenter une liste d'alertes avec :
 * - Filtrage par statut et zone
 * - Actions de validation selon les rôles
 * - Interface responsive
 * - Gestion des états de chargement
 *
 * Fonctionnalités :
 * - Liste paginée des alertes
 * - Filtres dynamiques
 * - Boutons d'action contextuels
 * - Indicateurs visuels de statut
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { validateAlert, rejectAlert } from '../services/alerts';
import AlertCard from './AlertCard';
import FilterPanel from './FilterPanel';

/**
 * Composant principal pour la liste des alertes
 */
const AlertList = () => {
  const { user } = useAuth();

  // États pour les filtres
  const [filters, setFilters] = useState({
    status: 'ALL',
    zone: 'ALL',
    alert_type: 'ALL',
    severity: 'ALL',
    date_from: '',
    date_to: '',
  });

  // État pour la pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // Construction des paramètres de requête
  const queryParams = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value && value !== 'ALL')
    )
  });

  // Récupération des alertes
  const { data: alertsData, loading, error, refetch } = useFetch(
    `/api/alerts/?${queryParams.toString()}`
  );

  // États locaux
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  /**
   * Gestionnaire de changement des filtres
   */
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPage(1); // Reset à la première page lors d'un changement de filtre
  };

  /**
   * Réinitialisation des filtres
   */
  const resetFilters = () => {
    setFilters({
      status: 'ALL',
      zone: 'ALL',
      alert_type: 'ALL',
      severity: 'ALL',
      date_from: '',
      date_to: '',
    });
    setPage(1);
  };

  /**
   * Gestionnaire de validation d'une alerte
   */
  const handleValidateAlert = async (alertId) => {
    try {
      await validateAlert(alertId);
      refetch(); // Recharger les données
      alert('Alerte validée avec succès');
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      alert('Erreur lors de la validation de l\'alerte');
    }
  };

  /**
   * Gestionnaire de rejet d'une alerte
   */
  const handleRejectAlert = async (alertId, reason) => {
    try {
      await rejectAlert(alertId, reason);
      refetch(); // Recharger les données
      alert('Alerte rejetée');
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      alert('Erreur lors du rejet de l\'alerte');
    }
  };

  /**
   * Gestionnaire d'action groupée
   */
  const handleBulkAction = async (action) => {
    if (selectedAlerts.length === 0) {
      alert('Veuillez sélectionner au moins une alerte');
      return;
    }

    setBulkActionLoading(true);
    try {
      const promises = selectedAlerts.map(alertId => {
        if (action === 'validate') {
          return validateAlert(alertId);
        } else if (action === 'reject') {
          return rejectAlert(alertId, 'Action groupée');
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
      setSelectedAlerts([]);
      refetch();
      alert(`Action groupée "${action}" effectuée sur ${selectedAlerts.length} alertes`);
    } catch (error) {
      console.error('Erreur lors de l\'action groupée:', error);
      alert('Erreur lors de l\'action groupée');
    } finally {
      setBulkActionLoading(false);
    }
  };

  /**
   * Gestionnaire de sélection d'alertes
   */
  const handleAlertSelection = (alertId, selected) => {
    setSelectedAlerts(prev =>
      selected
        ? [...prev, alertId]
        : prev.filter(id => id !== alertId)
    );
  };

  /**
   * Gestionnaire de sélection de toutes les alertes
   */
  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedAlerts(alertsData?.results?.map(alert => alert.id) || []);
    } else {
      setSelectedAlerts([]);
    }
  };

  // Calcul des statistiques
  const stats = React.useMemo(() => {
    if (!alertsData?.results) return {};

    return alertsData.results.reduce((acc, alert) => {
      acc[alert.status] = (acc[alert.status] || 0) + 1;
      return acc;
    }, {});
  }, [alertsData]);

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">
          Erreur lors du chargement des alertes
        </div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Alertes Sanitaires
        </h1>
        <p className="text-gray-600">
          Gérez et validez les alertes de votre zone
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(stats).map(([status, count]) => (
          <div key={status} className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-sm text-gray-600 capitalize">
              {status.replace('_', ' ').toLowerCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
        user={user}
      />

      {/* Actions groupées */}
      {selectedAlerts.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-blue-800">
              {selectedAlerts.length} alerte(s) sélectionnée(s)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('validate')}
                disabled={bulkActionLoading}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
              >
                Valider la sélection
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                disabled={bulkActionLoading}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
              >
                Rejeter la sélection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des alertes */}
      <div className="bg-white rounded-lg shadow">
        {/* En-tête de la liste */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedAlerts.length === alertsData?.results?.length && alertsData?.results?.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">
                {alertsData?.count || 0} alerte(s) trouvée(s)
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Page {page} sur {Math.ceil((alertsData?.count || 0) / pageSize)}
            </div>
          </div>
        </div>

        {/* Corps de la liste */}
        <div className="divide-y divide-gray-200">
          {loading ? (
            // État de chargement
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des alertes...</p>
            </div>
          ) : alertsData?.results?.length > 0 ? (
            // Liste des alertes
            alertsData.results.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                user={user}
                isSelected={selectedAlerts.includes(alert.id)}
                onSelectionChange={(selected) => handleAlertSelection(alert.id, selected)}
                onValidate={() => handleValidateAlert(alert.id)}
                onReject={(reason) => handleRejectAlert(alert.id, reason)}
              />
            ))
          ) : (
            // État vide
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600">Aucune alerte trouvée</p>
              <p className="text-sm text-gray-500 mt-1">
                Modifiez vos filtres ou créez une nouvelle alerte
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {alertsData && alertsData.count > pageSize && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Précédent
          </button>

          <div className="flex gap-1">
            {Array.from(
              { length: Math.min(5, Math.ceil(alertsData.count / pageSize)) },
              (_, i) => {
                const pageNum = i + 1;
                const isCurrentPage = pageNum === page;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 border rounded text-sm ${
                      isCurrentPage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
            )}
          </div>

          <button
            onClick={() => setPage(prev => Math.min(Math.ceil(alertsData.count / pageSize), prev + 1))}
            disabled={page === Math.ceil(alertsData.count / pageSize)}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertList;

/*
Exemple d'utilisation dans une page :

import React from 'react';
import AlertList from '../components/AlertList';

const AlertsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AlertList />
    </div>
  );
};

export default AlertsPage;
*/

/*
Composant AlertCard complémentaire (exemple simplifié) :

const AlertCard = ({ alert, user, isSelected, onSelectionChange, onValidate, onReject }) => {
  const canValidate = alert.can_be_validated_by?.includes(user.role);

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectionChange(e.target.checked)}
          className="mt-1"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">
                {alert.alert_type} - {alert.zone?.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {alert.description.substring(0, 100)}...
              </p>
            </div>

            <div className="flex gap-2">
              {canValidate && (
                <>
                  <button
                    onClick={onValidate}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => onReject('Raison...')}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Rejeter
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>Émis par: {alert.emitter?.username}</span>
            <span>Le: {new Date(alert.emission_date).toLocaleDateString('fr-FR')}</span>
            <span className={`px-2 py-1 rounded text-xs ${
              alert.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
              alert.status === 'VALIDATED' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {alert.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
*/
