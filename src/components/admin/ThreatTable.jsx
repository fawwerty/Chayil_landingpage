import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockThreats } from '../../data/mockData';

export default function ThreatTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const filteredAndSortedThreats = useMemo(() => {
    let filtered = mockThreats.filter(threat => {
      const matchesSearch = threat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           threat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           threat.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = selectedSeverity === 'All' || threat.severity === selectedSeverity;
      const matchesCategory = selectedCategory === 'All' || threat.category === selectedCategory;

      return matchesSearch && matchesSeverity && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (sortConfig.key === 'timestamp') {
        const aTime = new Date(a[sortConfig.key]).getTime();
        const bTime = new Date(b[sortConfig.key]).getTime();
        return sortConfig.direction === 'asc' ? aTime - bTime : bTime - aTime;
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedSeverity, selectedCategory, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'High':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Low':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'Mitigated':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Monitored':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const uniqueCategories = [...new Set(mockThreats.map(threat => threat.category))];
  const uniqueSeverities = [...new Set(mockThreats.map(threat => threat.severity))];

  return (
    <div className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-cyan-300 flex items-center">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Threat Intelligence Database
        </h3>
        <div className="text-sm text-gray-400">
          {filteredAndSortedThreats.length} of {mockThreats.length} threats
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Search threats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="All">All Severities</option>
            {uniqueSeverities.map(severity => (
              <option key={severity} value={severity}>{severity}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="All">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th
                className="text-left py-3 px-4 text-gray-300 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('title')}
              >
                Threat
                {sortConfig.key === 'title' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                className="text-left py-3 px-4 text-gray-300 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('severity')}
              >
                Severity
                {sortConfig.key === 'severity' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                className="text-left py-3 px-4 text-gray-300 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('category')}
              >
                Category
                {sortConfig.key === 'category' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Source</th>
              <th
                className="text-left py-3 px-4 text-gray-300 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSort('timestamp')}
              >
                Time
                {sortConfig.key === 'timestamp' && (
                  <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Affected</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedThreats.map((threat, index) => (
              <motion.tr
                key={threat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div>
                    <div className="text-white font-medium">{threat.title}</div>
                    <div className="text-gray-400 text-xs mt-1 line-clamp-2">{threat.description}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                    {threat.severity}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300">{threat.category}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300">{threat.source}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-300 text-xs">
                    {new Date(threat.timestamp).toLocaleDateString()}
                    <br />
                    {new Date(threat.timestamp).toLocaleTimeString()}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(threat.status)}`}>
                    {threat.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300">{threat.affectedSystems} systems</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedThreats.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No threats found matching your criteria.
        </div>
      )}
    </div>
  );
}
