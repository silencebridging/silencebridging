'use client';
import { useState, useRef, useEffect } from 'react';
import { Settings, RefreshCw, Save } from 'lucide-react';
import Script from 'next/script';

export default function CameraInterface() {
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
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  const [mediaPipeLoaded, setMediaPipeLoaded] = useState(false);

  // Initialize MediaPipe Hands after scripts are loaded
  useEffect(() => {
    if (!mediaPipeLoaded || !cameraEnabled || !stream) return;

    const initializeMediaPipe = async () => {
      try {
        // Make sure window.Hands exists
        if (!window.Hands) {
          console.error('MediaPipe Hands not loaded yet');
          setError('MediaPipe not loaded properly. Please refresh the page.');
          return;
        }

        // Initialize Hands using window object
        handsRef.current = new window.Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        // Configure Hands
        await handsRef.current.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        // Set up result handler
        handsRef.current.onResults(handleHandResults);

        // Initialize camera for MediaPipe
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
            console.error('MediaPipe Camera not loaded yet');
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
  }, [cameraEnabled, stream, isPaused, mediaPipeLoaded]);

  // Handle when all MediaPipe scripts are loaded
  const handleMediaPipeLoaded = () => {
    console.log('MediaPipe scripts loaded successfully');
    setMediaPipeLoaded(true);
  };

  // Update handleHandResults to use window.drawConnectors and window.drawLandmarks
  const handleHandResults = (results) => {
    if (!results || !results.multiHandLandmarks) return;

    // Draw hands on canvas if canvas is available
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Make sure the drawing utilities are loaded
      if (!window.drawConnectors || !window.drawLandmarks || !window.HAND_CONNECTIONS) {
        return;
      }
      
      // Draw detected hands
      if (results.multiHandLandmarks) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i];
          const handedness = results.multiHandedness[i].label; // "Left" or "Right"
          
          // Set color based on handedness (Left hand in browser means right hand in reality due to mirroring)
          const color = handedness === "Left" ? "#FF0000" : "#00FF00";
          
          // Draw connectors and landmarks using window objects
          window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, { color });
          window.drawLandmarks(ctx, landmarks, { color, radius: 3 });
          
          // If collecting and this is the right hand (appears as "Left" in mirrored view)
          if (isCollecting && handedness === "Left") {
            // Store landmarks
            const rightHandLandmarks = [...landmarks];
            setHandLandmarks(prevLandmarks => [...prevLandmarks, rightHandLandmarks]);
            setLandmarkCount(prev => prev + 1);
          }
        }
      }
    }
  };

  // Save landmarks to a file
  const saveLandmarks = () => {
    if (handLandmarks.length === 0) {
      setError('No landmarks collected yet');
      return;
    }

    const dataStr = JSON.stringify(handLandmarks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `hand_landmarks_${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    // Clear collected landmarks after saving
    setHandLandmarks([]);
    setLandmarkCount(0);
    
    console.log(`Saved ${handLandmarks.length} landmark frames`);
  };

  // Toggle landmark collection
  const toggleCollection = () => {
    if (isCollecting) {
      // Stop collecting and save
      setIsCollecting(false);
      if (handLandmarks.length > 0) {
        saveLandmarks();
      }
    } else {
      // Start collecting
      setHandLandmarks([]);
      setLandmarkCount(0);
      setIsCollecting(true);
    }
  };

  const enableCamera = async (cameraModeOverride) => {
    console.log('Starting camera initialization...');
    try {
      setError('');
      
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      // First set cameraEnabled to true so the video element renders
      setCameraEnabled(true);
      
      // Short delay to ensure the video element is in the DOM
      setTimeout(async () => {
        try {
          // Use the override if provided, otherwise use the current state
          const currentFacingMode = cameraModeOverride || facingMode;
          
          // Enhanced configuration with facing mode
          const constraints = { 
            video: {
              facingMode: currentFacingMode,
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          };
          
          console.log(`Requesting camera access with facing mode: ${currentFacingMode}`, constraints);
          const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
          console.log('Camera access granted, stream obtained:', mediaStream);
          
          setStream(mediaStream);
          
          if (videoRef.current) {
            console.log('Setting video source object');
            videoRef.current.srcObject = mediaStream;
            
            // Set canvas dimensions to match video
            if (canvasRef.current) {
              canvasRef.current.width = videoRef.current.videoWidth || 1280;
              canvasRef.current.height = videoRef.current.videoHeight || 720;
            }
            
            // Try playing immediately
            try {
              await videoRef.current.play();
              console.log('Video playing started immediately');
            } catch (e) {
              console.log('Immediate play failed, will try after metadata loads', e);
            }
            
            // Also set up the metadata handler
            videoRef.current.onloadedmetadata = async () => {
              console.log('Video metadata loaded, attempting to play');
              try {
                await videoRef.current.play();
                console.log('Video playing successfully');
                
                // Update canvas dimensions once video metadata is loaded
                if (canvasRef.current) {
                  canvasRef.current.width = videoRef.current.videoWidth;
                  canvasRef.current.height = videoRef.current.videoHeight;
                }
              } catch (e) {
                console.error("Error playing video:", e);
                setError("Could not play video stream: " + e.message);
              }
            };
          } else {
            console.error('Video ref is still not available');
            setError('Video element not found');
            setCameraEnabled(false);  // Reset if we couldn't find the video element
          }
        } catch (err) {
          console.error('Camera access error:', err);
          setError('Camera error: ' + (err.message || 'Unknown error'));
          setCameraEnabled(false);  // Reset camera enabled state on error
        }
      }, 100);  // Small delay to ensure DOM updates
    } catch (err) {
      console.error('Initial camera setup error:', err);
      setError('Setup error: ' + (err.message || 'Unknown error'));
      setCameraEnabled(false);
    }
  };

  // Your existing functions remain the same
  const startTranslation = () => {
    if (!cameraEnabled) {
      enableCamera();
    }
    setIsTranslating(true);
    setIsPaused(false);
  };

  const pauseTranslation = () => {
    setIsPaused(!isPaused);
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const switchCamera = async () => {
    // Toggle the facing mode
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    console.log(`Switching camera to ${newFacingMode} mode`);
    setFacingMode(newFacingMode);
    
    // Re-enable camera with the new facing mode
    await enableCamera(newFacingMode);
  };

  useEffect(() => {
    return () => {
      // Cleanup: stop camera stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <>
      {/* Load MediaPipe scripts properly */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("Hands script loaded")}
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
        strategy="beforeInteractive"
        onLoad={() => console.log("Drawing utils loaded")}
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
        strategy="beforeInteractive"
        onLoad={handleMediaPipeLoaded}
      />

      {/* Rest of your UI component */}
      <div className="bg-gray-50 min-h-screen relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Camera Interface Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-xl font-semibold">
                  <span className="text-blue-500">Camera</span> Input
                </h2>
                <div></div>
              </div>

              {/* Video Container */}
              <div className="p-6">
                <div className="relative bg-black rounded-2xl overflow-hidden" style={{ height: "360px" }}>
                  {cameraEnabled ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        width="100%"
                        height="100%"
                        style={{
                          backgroundColor: "black",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transform: `scale(${zoom === '0.5x' ? '0.5' : zoom === '1x' ? '1' : '2'})`,
                        }}
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                          transform: `scale(${zoom === '0.5x' ? '0.5' : zoom === '1x' ? '1' : '2'})`,
                        }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                        </div>
                        <p className="text-gray-400">Camera not enabled</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Camera switch button (only shown when camera is enabled) */}
                  {cameraEnabled && (
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <button 
                        onClick={switchCamera}
                        className="bg-gray-800 bg-opacity-70 p-2 rounded-full text-white hover:bg-opacity-100 transition-all duration-200"
                        aria-label="Switch camera"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      
                      <button 
                        onClick={toggleCollection}
                        className={`${isCollecting ? 'bg-red-500' : 'bg-green-500'} bg-opacity-70 p-2 rounded-full text-white hover:bg-opacity-100 transition-all duration-200`}
                        aria-label={isCollecting ? "Stop collecting" : "Start collecting"}
                      >
                        <Save className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  
                  {/* Translation status overlay */}
                  {isTranslating && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>{isPaused ? 'Paused' : 'Translating'}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Collection status overlay */}
                  {isCollecting && (
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>Collecting: {landmarkCount} frames</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Zoom Controls */}
                <div className="flex justify-center mt-6">
                  <div className="text-center">
                    <p className="text-gray-600 font-medium mb-2">Zoom</p>
                    <div className="bg-blue-100 rounded-full p-1 inline-flex space-x-1">
                      {['0.5x', '1x', '2x'].map((zoomLevel) => (
                        <button
                          key={zoomLevel}
                          onClick={() => handleZoomChange(zoomLevel)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            zoom === zoomLevel
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          {zoomLevel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Current Camera Mode Indicator */}
                <div className="text-center mt-2">
                  <p className="text-xs text-gray-500">
                    Current: {facingMode === 'user' ? 'Front Camera' : 'Back Camera'}
                  </p>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={enableCamera}
                    disabled={cameraEnabled}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      cameraEnabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {cameraEnabled ? 'Camera Enabled' : 'Allow Camera'}
                  </button>

                  <button
                    onClick={startTranslation}
                    disabled={!cameraEnabled}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      !cameraEnabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isTranslating
                        ? 'bg-green-500 text-white'
                        : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isTranslating ? 'Translating...' : 'Start Translation'}
                  </button>

                  <button
                    onClick={pauseTranslation}
                    disabled={!isTranslating}
                    className={`px-6 py-3 rounded-xl font-medium border-2 transition-all duration-200 ${
                      !isTranslating
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
                    <p className="text-red-700 text-center">{error}</p>
                  </div>
                )}

                {/* Debugging info */}
                <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                  <p>Camera enabled: {cameraEnabled ? 'Yes' : 'No'}</p>
                  <p>Stream active: {stream ? 'Yes' : 'No'}</p>
                  <p>Camera mode: {facingMode === 'user' ? 'Front-facing' : 'Back-facing'}</p>
                  <p>Collecting landmarks: {isCollecting ? 'Yes' : 'No'}</p>
                  <p>Collected frames: {landmarkCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}