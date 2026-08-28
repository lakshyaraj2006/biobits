import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AudioVoiceButton = ({ text, label = '', size = 'md', className = '' }) => {
  const { speak, stopSpeech, isAudioPlaying } = useLanguage();

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isAudioPlaying) {
      stopSpeech();
    } else {
      speak(text);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-3 py-2 text-base',
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 ${
        isAudioPlaying
          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400 animate-pulse'
          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-200'
      } ${sizeClasses[size] || sizeClasses.md} ${className}`}
      title="Listen in vernacular voice"
      aria-label="Play audio explanation"
    >
      {isAudioPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-white" />
          {label && <span className="font-semibold text-xs text-white">{label}</span>}
          <span className="flex items-center gap-0.5 h-3 ml-1">
            <span className="w-0.5 h-2.5 bg-white animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-0.5 h-2 bg-white animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-600" />
          {label && <span className="font-medium text-xs text-emerald-800">{label}</span>}
        </>
      )}
    </button>
  );
};
