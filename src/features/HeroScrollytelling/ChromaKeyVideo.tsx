'use client';

import React, { useEffect, useRef } from 'react';

interface ChromaKeyVideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  playbackRate?: number;
  className?: string;
  onEnded?: () => void;
  isPlaying?: boolean;
}

export const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({
  src,
  autoPlay = false,
  loop = false,
  playbackRate = 1.0,
  className = '',
  onEnded,
  isPlaying,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationId: number | null = null;
    let rvfcId: number | null = null;
    let lastTime = -1;
    let isLoopRunning = false;

    const handleVideoEnded = () => {
      if (onEnded) {
        onEnded();
      }
    };

    const drawSingleFrame = () => {
      if (!video || !canvas) return;

      // Skip processing if the video frame hasn't advanced and canvas is already sized
      if (
        video.currentTime === lastTime &&
        canvas.getAttribute('data-initialized') === 'true'
      ) {
        return;
      }

      // Initialize canvas dimensions to match video aspect ratio (capped for performance)
      if (video.videoWidth > 0 && canvas.getAttribute('data-initialized') !== 'true') {
        const aspect = video.videoWidth / video.videoHeight || 1;
        const targetWidth = Math.min(480, video.videoWidth);
        canvas.width = targetWidth;
        canvas.height = Math.round(targetWidth / aspect);
        canvas.setAttribute('data-initialized', 'true');
      }

      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) return;

      // Update last processed timestamp
      lastTime = video.currentTime;

      // Draw current video frame
      ctx.drawImage(video, 0, 0, width, height);

      // Extract pixel data
      const frame = ctx.getImageData(0, 0, width, height);
      const data = frame.data;
      const length = data.length;

      // Chroma keying: detect and remove green background
      for (let i = 0; i < length; i += 4) {
        const r = data[i + 0];
        const g = data[i + 1];
        const b = data[i + 2];

        // Green Screen removal threshold condition
        if (g > 50 && g > r * 1.12 && g > b * 1.12) {
          const maxRB = Math.max(r, b);
          const diff = g - maxRB;

          if (diff > 25) {
            data[i + 3] = 0; // Transparent
          } else {
            // Smooth edge blending
            data[i + 3] = Math.floor((1 - (diff / 25)) * 255);
          }
        }
      }

      // Render keyed image back to canvas
      ctx.putImageData(frame, 0, 0);
    };

    // Highly optimized frame update mechanism that supports requestVideoFrameCallback
    const updateVideoFrame = () => {
      drawSingleFrame();
      if (isLoopRunning && video && 'requestVideoFrameCallback' in video) {
        rvfcId = (video as any).requestVideoFrameCallback(updateVideoFrame);
      }
    };

    const startLoop = () => {
      if (isLoopRunning) return;
      isLoopRunning = true;

      if (video && 'requestVideoFrameCallback' in video) {
        rvfcId = (video as any).requestVideoFrameCallback(updateVideoFrame);
      } else {
        const renderLoop = () => {
          if (!isLoopRunning) return;
          drawSingleFrame();
          animationId = requestAnimationFrame(renderLoop);
        };
        animationId = requestAnimationFrame(renderLoop);
      }
    };

    const stopLoop = () => {
      isLoopRunning = false;
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      if (video && rvfcId !== null && 'cancelVideoFrameCallback' in video) {
        (video as any).cancelVideoFrameCallback(rvfcId);
        rvfcId = null;
      }
    };

    // Event handlers for play/pause/stop
    const handlePlay = () => startLoop();
    const handlePause = () => stopLoop();
    const handleSingleFrame = () => drawSingleFrame();

    // Listeners to start and stop the canvas update loops automatically
    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handlePause);
    video.addEventListener('suspend', handlePause);

    // Forces immediate single frame update on critical seek/metadata events without initiating continuous looping
    video.addEventListener('seeked', handleSingleFrame);
    video.addEventListener('timeupdate', handleSingleFrame);
    video.addEventListener('loadeddata', handleSingleFrame);
    video.addEventListener('loadedmetadata', handleSingleFrame);
    video.addEventListener('canplay', handleSingleFrame);
    video.addEventListener('ended', handleSingleFrame);
    video.addEventListener('ended', handleVideoEnded);

    // Initial frame draw
    drawSingleFrame();

    // Start loop if video is already playing
    if (!video.paused && !video.ended) {
      startLoop();
    }

    return () => {
      stopLoop();
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('playing', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handlePause);
      video.removeEventListener('suspend', handlePause);

      video.removeEventListener('seeked', handleSingleFrame);
      video.removeEventListener('timeupdate', handleSingleFrame);
      video.removeEventListener('loadeddata', handleSingleFrame);
      video.removeEventListener('loadedmetadata', handleSingleFrame);
      video.removeEventListener('canplay', handleSingleFrame);
      video.removeEventListener('ended', handleSingleFrame);
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, [src, onEnded]);

  // Handle play/pause based on isPlaying prop (if provided) or autoPlay
  const isCurrentlyPlaying = isPlaying !== undefined ? isPlaying : autoPlay;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isCurrentlyPlaying) {
      const startPlay = () => {
        video.play().catch((err) => {
          console.warn("ChromaKeyVideo explicit play failed/prevented:", err);
        });
      };
      
      if (video.readyState >= 1) {
        startPlay();
      } else {
        video.addEventListener('loadedmetadata', startPlay, { once: true });
      }
    } else {
      video.pause();
    }
  }, [src, isCurrentlyPlaying]);

  // Handle playback rate dynamic changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Underlying Hidden Video Element */}
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        preload={autoPlay ? "auto" : "metadata"}
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
      {/* Transparent Output Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
};
