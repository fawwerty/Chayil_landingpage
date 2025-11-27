import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ThreatMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Placeholder for react-globe.gl integration
    // For now, we'll show a static map representation
    if (mapRef.current) {
      // This would be replaced with actual globe implementation
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
      canvas.style.borderRadius = '8px';

      const ctx = canvas.getContext('2d');

      // Draw a simple world map representation
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, 400, 300);

      // Draw some "continents" as simple shapes
      ctx.fillStyle = '#475569';
      // North America
      ctx.fillRect(50, 80, 80, 60);
      // Europe
      ctx.fillRect(180, 70, 60, 40);
      // Asia
      ctx.fillRect(250, 60, 100, 80);
      // Africa
      ctx.fillRect(180, 120, 50, 100);
      // South America
      ctx.fillRect(100, 140, 40, 80);

      // Draw threat indicators (red dots)
      const threats = [
        { x: 70, y: 100 }, // North America
        { x: 200, y: 85 }, // Europe
        { x: 280, y: 90 }, // Asia
        { x: 200, y: 150 }, // Africa
        { x: 120, y: 170 }  // South America
      ];

      threats.forEach(threat => {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(threat.x, threat.y, 3, 0, 2 * Math.PI);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      mapRef.current.appendChild(canvas);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/95 backdrop-blur-md border border-teal-500/30 rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cyan-300">Global Threat Map</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Active Threats</span>
          </div>
        </div>
      </div>

      <div ref={mapRef} className="relative h-64 bg-gray-800/50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse text-teal-400 mb-2">
              <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Interactive Globe Map</p>
            <p className="text-xs text-gray-500 mt-1">Coming with react-globe.gl integration</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <p className="text-red-400 font-semibold">12</p>
          <p className="text-gray-400">Critical Threats</p>
        </div>
        <div className="text-center">
          <p className="text-yellow-400 font-semibold">28</p>
          <p className="text-gray-400">Monitored Regions</p>
        </div>
      </div>
    </motion.div>
  );
}
