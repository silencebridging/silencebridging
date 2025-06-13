'use client';
import { useEffect } from 'react';

export default function MediaPipeLoader({ onReady }) {
  useEffect(() => {
    const loadMediaPipe = async () => {
      try {
        // Load MediaPipe scripts
        const handsScript = document.createElement('script');
        handsScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
        
        const drawingScript = document.createElement('script');
        drawingScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js';
        
        const cameraScript = document.createElement('script');
        cameraScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
        
        // Add scripts to document
        document.head.appendChild(handsScript);
        document.head.appendChild(drawingScript);
        document.head.appendChild(cameraScript);
        
        // Wait for scripts to load
        await new Promise(resolve => {
          cameraScript.onload = resolve;
        });
        
        // Wait a bit for initialization
        setTimeout(() => {
          onReady(window.Hands, window.Camera, {
            drawConnectors: window.drawConnectors,
            drawLandmarks: window.drawLandmarks,
            HAND_CONNECTIONS: window.HAND_CONNECTIONS
          });
        }, 500);
      } catch (error) {
        console.error('Error loading MediaPipe:', error);
      }
    };
    
    loadMediaPipe();
  }, [onReady]);
  
  return null;
}