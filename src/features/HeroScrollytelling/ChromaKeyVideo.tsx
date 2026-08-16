'use client';

import React, { useEffect, useRef } from 'react';

interface ChromaKeyVideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  playbackRate?: number;
  className?: string;
  onEnded?: () => void;
}

export const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({
  src,
  autoPlay = false,
  loop = false,
  playbackRate = 1.0,
  className = '',
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationId: number;
    let lastTime = -1;

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

    const renderLoop = () => {
      drawSingleFrame();
      animationId = requestAnimationFrame(renderLoop);
    };

    // Listeners to force canvas update on critical events
    video.addEventListener('play', drawSingleFrame);
    video.addEventListener('playing', drawSingleFrame);
    video.addEventListener('seeked', drawSingleFrame);
    video.addEventListener('timeupdate', drawSingleFrame);
    video.addEventListener('loadeddata', drawSingleFrame);
    video.addEventListener('loadedmetadata', drawSingleFrame);
    video.addEventListener('canplay', drawSingleFrame);
    video.addEventListener('ended', drawSingleFrame);
    video.addEventListener('ended', handleVideoEnded);

    // Initial render
    drawSingleFrame();

    // Start rendering loop
    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      video.removeEventListener('play', drawSingleFrame);
      video.removeEventListener('playing', drawSingleFrame);
      video.removeEventListener('seeked', drawSingleFrame);
      video.removeEventListener('timeupdate', drawSingleFrame);
      video.removeEventListener('loadeddata', drawSingleFrame);
      video.removeEventListener('loadedmetadata', drawSingleFrame);
      video.removeEventListener('canplay', drawSingleFrame);
      video.removeEventListener('ended', drawSingleFrame);
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, [src, onEnded]);

  // Explicitly call play if autoPlay is enabled
  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay) {
      // Force play after loaded metadata or immediately
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
    }
  }, [src, autoPlay]);

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
