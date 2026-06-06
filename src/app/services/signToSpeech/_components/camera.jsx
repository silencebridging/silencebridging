'use client';

import { useState, useRef, useEffect } from 'react';
import { Settings, RefreshCw, Save, AlertCircle, Maximize2, Minimize2, Copy, Volume2, Download, Trash2, X, Play, Pause } from 'lucide-react';
import dynamic from 'next/dynamic';

const MediaPipeLoader = dynamic(
  () => import('./MediaPipeLoader'),
  { ssr: false }
);

export default function CameraInterface({ translatedText, setTranslatedText }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [zoom, setZoom] = useState('1x');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [error, setError] = useState('');
  const [facingMode, setFacingMode] = useState('user');
  const [isCollecting, setIsCollecting] = useState(false);
  const [handLandmarks, setHandLandmarks] = useState([]);
  const [landmarkCount, setLandmarkCount] = useState(0);
  const [mediaPipeReady, setMediaPipeReady] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const saveIntervalRef = useRef(null);
  const predictionTimeoutRef = useRef(null);

  // Lock scroll when immersive fullscreen is active
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const handleMediaPipeReady = () => {
    console.log('MediaPipe libraries loaded successfully');
    setMediaPipeReady(true);
  };

  const predictLetterFromLandmarks = async (landmarks) => {
    if (!landmarks || landmarks.length === 0 || isPredicting) return;
    
    try {
      setIsPredicting(true);
      
      const formattedLandmarks = landmarks.map(landmark => [
        landmark.x, 
        landmark.y, 
        landmark.z
      ]);
      
      const response = await fetch('https://production-model.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ landmarks: formattedLandmarks })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      setPredictedLetter(data.letter);
      
      // Auto-append predicted letter if it changes
      if (data.letter) {
        setTranslatedText(prev => {
          const lastChar = prev.slice(-1);
          if (lastChar === data.letter) return prev;
          return prev + data.letter;
        });
      }
      
    } catch (error) {
      console.error('Prediction error:', error);
      setError(`Letter prediction failed: ${error.message}`);
    } finally {
      setTimeout(() => {
        setIsPredicting(false);
      }, 500);
    }
  };

  const handleHandResults = (results) => {
    if (!results || !results.multiHandLandmarks) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      
      ctx.clearRect(0, 0, width, height);
      
      if (!window.drawConnectors || !window.drawLandmarks || !window.HAND_CONNECTIONS) {
        return;
      }
      
      if (results.multiHandLandmarks) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i];
          const handedness = results.multiHandedness[i].label; 
          
          const color = handedness === "Left" ? "#FF0000" : "#00FF00";
          
          window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, { color });
          window.drawLandmarks(ctx, landmarks, { color, radius: 3 });
          
          if (isCollecting && handedness === "Left") {
            const rightHandLandmarks = [...landmarks];
            setHandLandmarks(prevLandmarks => [...prevLandmarks, rightHandLandmarks]);
            setLandmarkCount(prev => prev + 1);
          }
          
          if (isTranslating && !isPaused && handedness === "Left") {
            if (predictionTimeoutRef.current) {
              clearTimeout(predictionTimeoutRef.current);
            }
            
            predictionTimeoutRef.current = setTimeout(() => {
              predictLetterFromLandmarks(landmarks);
            }, 500);
          }
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (predictionTimeoutRef.current) {
        clearTimeout(predictionTimeoutRef.current);
      }
    };
  }, [stream]);

  useEffect(() => {
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mediaPipeReady || !cameraEnabled || !stream) return;

    const initializeMediaPipe = async () => {
      try {
        if (!window.Hands) {
          setError('MediaPipe not loaded properly. Please refresh the page.');
          return;
        }

        handsRef.current = new window.Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        await handsRef.current.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        handsRef.current.onResults(handleHandResults);

        if (videoRef.current && stream) {
          if (window.Camera) {
            cameraRef.current = new window.Camera(videoRef.current, {
              onFrame: async () => {
                if (handsRef.current && !isPaused) {
                  await handsRef.current.send({ image: videoRef.current });
                }
              }
            });
            cameraRef.current.start();
          } else {
            setError('MediaPipe Camera not loaded properly. Please refresh the page.');
          }
        }
      } catch (err) {
        console.error('MediaPipe initialization error:', err);
        setError(`MediaPipe error: ${err.message || 'Unknown error'}`);
      }
    };

    initializeMediaPipe();
    
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, [cameraEnabled, stream, isPaused, mediaPipeReady]);

  const saveLandmarks = async (resetAfterSave = true) => {
    if (handLandmarks.length === 0) return;

    try {
      const response = await fetch('/api/saveLandmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(handLandmarks),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`Saved ${handLandmarks.length} landmark frames`);
      } else {
        setError(`Failed to save landmarks: ${result.message}`);
      }
      
      if (resetAfterSave) {
        setHandLandmarks([]);
        setLandmarkCount(0);
      }
    } catch (err) {
      setError(`Failed to save landmarks: ${err.message}`);
    }
  };

  const toggleCollection = () => {
    if (isCollecting) {
      setIsCollecting(false);
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;
      }
      if (handLandmarks.length > 0) {
        saveLandmarks(true);
      }
    } else {
      setHandLandmarks([]);
      setLandmarkCount(0);
      setIsCollecting(true);
      
      saveIntervalRef.current = setInterval(() => {
        if (handLandmarks.length > 0) {
          saveLandmarks(false).then(() => {
            setHandLandmarks([]);
          });
        }
      }, 1500);
    }
  };

  const enableCamera = async (cameraModeOverride) => {
    try {
      setError('');
      
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        setError('Camera access requires HTTPS. Please use a secure connection.');
        return;
      }
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      setCameraEnabled(true);
      
      setTimeout(async () => {
        try {
          const currentFacingMode = cameraModeOverride || facingMode;
          let constraints = { 
            video: true,
            audio: false
          };
          
          if (currentFacingMode === 'environment') {
            constraints = { 
              video: { facingMode: 'environment' },
              audio: false
            };
          }
          
          const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
          setStream(mediaStream);
          setVideoSource(mediaStream);
        } catch (simpleErr) {
          setError(`Camera access failed: ${simpleErr.message}`);
          setCameraEnabled(false);
        }
      }, 500);
    } catch (err) {
      setError('Setup error: ' + (err.message || 'Unknown error'));
      setCameraEnabled(false);
    }
  };

  const startTranslation = () => {
    if (!cameraEnabled) {
      enableCamera();
    }
    setIsTranslating(true);
    setIsPaused(false);
    setPredictedLetter('');
  };

  const pauseTranslation = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      if (predictionTimeoutRef.current) {
        clearTimeout(predictionTimeoutRef.current);
      }
    }
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const switchCamera = async () => {
    try {
      if (stream) {
        if (cameraRef.current) {
          cameraRef.current.stop();
        }
        if (videoRef.current) {
          videoRef.current.pause();
        }
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
      setFacingMode(newFacingMode);
      
      setTimeout(async () => {
        await enableCamera(newFacingMode);
      }, 500);
    } catch (err) {
      setError(`Failed to switch camera: ${err.message}`);
    }
  };

  const setVideoSource = async (mediaStream) => {
    if (!videoRef.current) return false;
    
    try {
      if (videoRef.current.srcObject) {
        videoRef.current.pause();
      }
      
      const oldSrc = videoRef.current.srcObject;
      videoRef.current.srcObject = null;
      
      if (oldSrc) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      videoRef.current.srcObject = mediaStream;
      
      if (canvasRef.current) {
        canvasRef.current.width = videoRef.current.videoWidth || 1280;
        canvasRef.current.height = videoRef.current.videoHeight || 720;
      }
      
      let playAttempts = 0;
      const maxPlayAttempts = 3;
      
      const attemptPlay = async () => {
        try {
          playAttempts++;
          await videoRef.current.play();
          
          if (canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
          return true;
        } catch (err) {
          if (playAttempts < maxPlayAttempts) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return attemptPlay();
          }
          throw err;
        }
      };
      
      return await attemptPlay();
    } catch (e) {
      setError("Could not start video source: " + e.message);
      return false;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  const handleCopyTranslatedText = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
    }
  };

  const handlePlayAudioSpeech = () => {
    if (translatedText && 'speechSynthesis' in window) {
      setIsPlayingAudio(true);
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.onend = () => setIsPlayingAudio(false);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-gray-50 relative">
      <MediaPipeLoader onReady={handleMediaPipeReady} />
      
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Camera Container */}
          <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${
            isFullscreen ? 'fixed inset-0 z-[9999] rounded-none w-screen h-screen bg-black' : 'relative'
          }`}>
            
            {/* Standard Header (hidden in fullscreen) */}
            {!isFullscreen && (
              <div className="bg-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-xl font-semibold">
                  <span className="text-blue-500">Camera</span> Input
                </h2>
                <div></div>
              </div>
            )}

            {/* Viewport block (fits full screen or standard 360px box) */}
            <div className={`${isFullscreen ? 'relative w-full h-full' : 'p-6'}`}>
              <div 
                className={`relative bg-black overflow-hidden ${
                  isFullscreen ? 'w-full h-full' : 'rounded-2xl'
                }`} 
                style={{ height: isFullscreen ? '100vh' : '480px' }}
              >
                {cameraEnabled ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{
                        backgroundColor: "black",
                        width: "100%",
                        height: "100%",
                        objectFit: isFullscreen ? "cover" : "contain",
                        transform: `scale(${zoom === '0.5x' ? '0.5' : zoom === '1x' ? '1' : '2'})`,
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      style={{
                        transform: `scale(${zoom === '0.5x' ? '0.5' : zoom === '1x' ? '1' : '2'})`,
                      }}
                    />
                    
                    {/* Expand/Collapse Toggle Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-6 left-6 bg-gray-900 bg-opacity-70 p-3 rounded-full text-white hover:bg-opacity-100 hover:scale-105 transition-all duration-200 shadow-md z-50 cursor-pointer"
                      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      title={isFullscreen ? "Exit Immersive Mode" : "Enter Immersive Mode"}
                    >
                      {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    </button>
                    
                    {/* Compact Mode Overlays (Standard controls shown when not fullscreen) */}
                    {!isFullscreen && (
                      <>
                        <div className="absolute top-6 right-6 flex flex-col space-y-3">
                          <button 
                            onClick={switchCamera}
                            className="bg-gray-800 bg-opacity-70 p-2.5 rounded-full text-white hover:bg-opacity-100 transition-all cursor-pointer shadow"
                            aria-label="Switch camera"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                          
                          <button 
                            onClick={toggleCollection}
                            className={`${isCollecting ? 'bg-red-500' : 'bg-green-500'} bg-opacity-70 p-2.5 rounded-full text-white hover:bg-opacity-100 transition-all cursor-pointer shadow`}
                            aria-label={isCollecting ? "Stop collecting" : "Start collecting"}
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {isTranslating && (
                          <div className="absolute top-6 left-20">
                            <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              <span>{isPaused ? 'Paused' : 'Translating'}</span>
                            </div>
                          </div>
                        )}
                        
                        {isCollecting && (
                          <div className="absolute bottom-6 left-6">
                            <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              <span>Collecting: {landmarkCount} frames</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* IMMERSIVE MODE: FLOATING TRANSLATION CARD (Upper Right) */}
                    {isFullscreen && (
                      <div className="fixed top-6 right-6 w-96 z-50 bg-white/90 backdrop-blur-md rounded-[2.2rem] shadow-2xl border border-white/20 p-6 flex flex-col max-h-[80vh] overflow-y-auto">
                        
                        {/* Card Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                          <h3 className="text-lg font-bold text-gray-800">
                            <span className="text-[#1b64da]">Translation</span> Output
                          </h3>
                          
                          <button 
                            onClick={() => setTranslatedText('')}
                            className="text-[10px] text-gray-400 hover:text-red-500 font-extrabold uppercase transition-colors"
                          >
                            Clear
                          </button>
                        </div>

                        {/* Live letter detection feedback */}
                        {isTranslating && !isPaused && (
                          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#1b64da] rounded-xl flex items-center justify-center flex-shrink-0 shadow">
                              <span className="text-white text-xl font-black">
                                {isPredicting ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  predictedLetter || '?'
                                )}
                              </span>
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase">Live Letter</div>
                              <div className="text-xs font-bold text-[#1b64da]">
                                {isPredicting ? 'Analyzing...' : predictedLetter ? `Letter "${predictedLetter}" detected` : 'Make a sign'}
                              </div>
                            </div>
                            
                            {predictedLetter && (
                              <button 
                                onClick={() => setTranslatedText(prev => prev + predictedLetter)}
                                className="ml-auto bg-[#1b64da] hover:bg-[#1b64da]/90 text-white text-[10px] font-bold px-2 py-1 rounded-lg transition-all"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        )}

                        {/* Text Output display block */}
                        <div className="flex-grow bg-gray-50/70 rounded-2xl p-4 border border-gray-100 min-h-[160px] overflow-y-auto mb-4">
                          {translatedText ? (
                            <p className="text-sm text-gray-700 font-semibold leading-relaxed whitespace-pre-wrap">
                              {translatedText}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-400 italic text-center mt-12">
                              Live translations will appear here as you sign.
                            </p>
                          )}
                        </div>

                        {/* Copy / Speak Controls */}
                        <div className="flex gap-2 mb-4">
                          <button
                            onClick={handleCopyTranslatedText}
                            disabled={!translatedText}
                            className="flex-1 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1b64da] text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </button>
                          
                          <button
                            onClick={handlePlayAudioSpeech}
                            disabled={!translatedText || isPlayingAudio}
                            className="flex-1 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#8b5cf6] text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            {isPlayingAudio ? 'Speaking...' : 'Speak'}
                          </button>
                        </div>

                        {/* Interactive Phrase Simulator */}
                        <div className="space-y-2 pt-3 border-t border-gray-100">
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Simulate Phrases</div>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => setTranslatedText(prev => prev + (prev ? ' ' : '') + 'Hello')}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded transition-colors"
                            >
                              "Hello"
                            </button>
                            <button
                              onClick={() => setTranslatedText(prev => prev + (prev ? ' ' : '') + 'Thank you')}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded transition-colors"
                            >
                              "Thank you"
                            </button>
                            <button
                              onClick={() => setTranslatedText(prev => prev + (prev ? ' ' : '') + 'Yes')}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded transition-colors"
                            >
                              "Yes"
                            </button>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* IMMERSIVE MODE: FLOATING CONTROL PANEL (Bottom Center) */}
                    {isFullscreen && (
                      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/75 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-4 shadow-2xl">
                        
                        <div className="text-white text-xs font-bold hidden md:block border-r border-white/10 pr-4 mr-2">
                          CAMERA CONTROLS
                        </div>
                        
                        {/* Toggle Camera On/Off */}
                        <button
                          onClick={() => enableCamera()}
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all"
                        >
                          Restart Camera
                        </button>

                        {/* Toggle Translation */}
                        <button
                          onClick={startTranslation}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            isTranslating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                          } text-white`}
                        >
                          {isTranslating ? 'Stop Translate' : 'Translate'}
                        </button>

                        {/* Pause/Resume */}
                        <button
                          onClick={pauseTranslation}
                          disabled={!isTranslating}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold disabled:opacity-30 disabled:pointer-events-none transition-all"
                        >
                          {isPaused ? 'Resume' : 'Pause'}
                        </button>

                        {/* Switch camera */}
                        <button
                          onClick={switchCamera}
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                          title="Switch Camera"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>

                        {/* Exit Fullscreen */}
                        <button
                          onClick={toggleFullscreen}
                          className="p-2 rounded-xl bg-red-600/30 hover:bg-red-600 text-red-400 hover:text-white transition-all ml-2"
                          title="Exit Fullscreen"
                        >
                          <Minimize2 className="w-4 h-4" />
                        </button>

                      </div>
                    )}

                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-400 mb-4">Camera not enabled</p>
                      <button 
                        onClick={() => enableCamera()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                      >
                        Enable Webcam
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Standard Mode predicted sign helper below the camera */}
              {isTranslating && !isPaused && !isFullscreen && (
                <div className="mt-4 p-4 bg-gray-100 rounded-xl flex items-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-white text-3xl font-bold">
                      {isPredicting ? (
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        predictedLetter || '?'
                      )}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Predicted Sign</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {isPredicting ? 'Analyzing hand position...' : predictedLetter ? `Letter "${predictedLetter}" detected` : 'Make a sign with your right hand'}
                    </p>
                  </div>
                </div>
              )}

              {/* Standard Mode Zoom and Action buttons */}
              {!isFullscreen && (
                <div className="mt-6 space-y-4">
                  <div className="flex justify-center items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase">Zoom</span>
                    <div className="bg-blue-50 rounded-full p-1 inline-flex gap-1">
                      {['0.5x', '1x', '2x'].map((zoomLevel) => (
                        <button
                          key={zoomLevel}
                          onClick={() => handleZoomChange(zoomLevel)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                            zoom === zoomLevel
                              ? 'bg-blue-500 text-white shadow'
                              : 'text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          {zoomLevel}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      onClick={() => enableCamera()}
                      disabled={cameraEnabled}
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        cameraEnabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                      }`}
                    >
                      Restart Camera
                    </button>

                    <button
                      onClick={startTranslation}
                      disabled={!cameraEnabled}
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        !cameraEnabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : isTranslating ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      }`}
                    >
                      {isTranslating ? 'Translating' : 'Start Translation'}
                    </button>

                    <button
                      onClick={pauseTranslation}
                      disabled={!isTranslating}
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                        !isTranslating ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      disabled={!cameraEnabled}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#1b64da] hover:bg-[#1b64da]/90 text-white shadow-md transition-all cursor-pointer"
                    >
                      Immersive Fullscreen
                    </button>
                  </div>
                </div>
              )}

              {/* Error logs */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-700 text-sm font-semibold">{error}</p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}