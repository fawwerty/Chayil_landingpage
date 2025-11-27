import React from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';

const PauseButton = ({ isPaused, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
        isPaused
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-red-600 hover:bg-red-700 text-white'
      }`}
    >
      {isPaused ? (
        <>
          <FiPlay className="w-4 h-4" />
          Resume Streaming
        </>
      ) : (
        <>
          <FiPause className="w-4 h-4" />
          Pause Streaming
        </>
      )}
    </button>
  );
};

export default PauseButton;
