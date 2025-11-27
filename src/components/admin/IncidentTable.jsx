import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function IncidentTable({ incidents, onIncidentSelect, onStatusUpdate }) {
  const [sortField, setSortField] = useState('reportedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedIncidents = useMemo(() => {
    let filtered = incidents.filter(incident => {
      const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incident.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incident.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || incident.status.toLowerCase().replace(' ', '') === statusFilter;
      const matchesSeverity = severityFilter === 'all' || incident.severity.toLowerCase() === severityFilter;
      return matchesSearch && matchesStatus && matchesSeverity;
    });

    return filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'reportedDate':
        case 'resolvedDate':
          aValue = new Date(a[sortField] || '1970-01-01');
          bValue = new Date(b[sortField] || '1970-01-01');
          break;
        case 'severity':
          const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
          aValue = severityOrder[a.severity.toLowerCase()] || 0;
          bValue = severityOrder[b.severity.toLowerCase()] || 0;
          break;
        default:
          aValue = a[sortField]?.toLowerCase?.() || a[sortField] || '';
          bValue = b[sortField]?.toLowerCase?.() || b[sortField] || '';
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [incidents, sortField, sortDirection, statusFilter, severityFilter, searchTerm]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(' ', '')) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'inprogress': return 'bg-blue-100 text-blue-800';
      case 'underinvestigation': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="text-gray-400">↕️</span>;
    return sortDirection === 'asc' ? <span className="text-teal-400">↑</span> : <span className="text-teal-400">↓</span>;
  };

  const statusTabs = [
    { key: 'all', label: 'All', count: incidents.length },
    { key: 'underinvestigation', label: 'Under Investigation', count: incidents.filter(i => i.status === 'Under Investigation').length },
    { key: 'inprogress', label: 'In Progress', count: incidents.filter(i => i.status === 'In Progress').length },
    { key: 'resolved', label: 'Resolved', count: incidents.filter(i => i.status === 'Resolved').length }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg overflow-hidden"
    >
      {/* Header with filters */}
      <div className="p-6 border-b border-teal-500/20">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-cyan-300">Incident Management</h3>
              <p className="text-sm text-gray-400 mt-1">Monitor and manage security incidents</p>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === tab.key
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-teal-500/30 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-cyan-300 transition-colors"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center space-x-1">
                  <span>Incident</span>
                  <SortIcon field="title" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-cyan-300 transition-colors"
                onClick={() => handleSort('clientName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Client</span>
                  <SortIcon field="clientName" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-cyan-300 transition-colors"
                onClick={() => handleSort('severity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Severity</span>
                  <SortIcon field="severity" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-cyan-300 transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <SortIcon field="status" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-cyan-300 transition-colors"
                onClick={() => handleSort('reportedDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Reported</span>
                  <SortIcon field="reportedDate" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-500/10">
            {filteredAndSortedIncidents.map((incident, index) => (
              <motion.tr
                key={incident.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-800/30 cursor-pointer transition-colors"
                onClick={() => onIncidentSelect(incident)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-cyan-300">{incident.title}</div>
                    <div className="text-sm text-gray-400 truncate max-w-xs">{incident.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {incident.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={incident.status.toLowerCase().replace(' ', '')}
                    onChange={(e) => onStatusUpdate(incident.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(incident.status)}`}
                  >
                    <option value="underinvestigation">Under Investigation</option>
                    <option value="inprogress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(incident.reportedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncidentSelect(incident);
                    }}
                    className="text-teal-400 hover:text-cyan-300 transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results summary */}
      <div className="px-6 py-3 bg-gray-800/30 border-t border-teal-500/20">
        <p className="text-sm text-gray-400">
          Showing {filteredAndSortedIncidents.length} of {incidents.length} incidents
        </p>
      </div>
    </motion.div>
  );
}
