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
          ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/30 ring-2 ring-rose-300 animate-pulse'
          : 'bg-white text-brand-deep hover:bg-rose-50 hover:text-brand-primary border border-rose-200 shadow-sm'
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
          <Volume2 className="w-4 h-4 text-brand-primary" />
          {label && <span className="font-medium text-xs text-brand-deep">{label}</span>}
        </>
      )}
    </button>
  );
};
