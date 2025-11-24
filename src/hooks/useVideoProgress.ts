import { useState, useEffect } from 'react';
import { VideoProgress } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useVideoProgress(videoId: string) {
  const [progress, setProgress] = useLocalStorage<VideoProgress>(`videoProgress_${videoId}`, {
    currentTime: 0,
    duration: 300,
    watchedPercentage: 0,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    // Update progress every second when video is playing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev.currentTime >= prev.duration) {
          setIsPlaying(false);
          return prev;
        }

        const newCurrentTime = prev.currentTime + 1;
        const newPercentage = Math.round((newCurrentTime / prev.duration) * 100);

        return {
          ...prev,
          currentTime: newCurrentTime,
          watchedPercentage: newPercentage,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, setProgress]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    setProgress(prev => ({
      ...prev,
      currentTime: Math.max(0, Math.min(time, prev.duration)),
      watchedPercentage: Math.round((time / prev.duration) * 100),
    }));
  };

  const reset = () => {
    setProgress({
      currentTime: 0,
      duration: progress.duration,
      watchedPercentage: 0,
    });
    setIsPlaying(false);
  };

  return {
    progress,
    isPlaying,
    togglePlayPause,
    seek,
    reset,
  };
}
