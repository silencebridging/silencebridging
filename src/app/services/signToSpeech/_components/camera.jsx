'use client';
import { useState, useRef, useEffect } from 'react';
import { Settings, RefreshCw, Save, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

// Create a component that loads MediaPipe dynamically
const MediaPipeLoader = dynamic(
  () => import('./MediaPipeLoader'),
  { ssr: false }
);

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
  const [mediaPipeReady, setMediaPipeReady] = useState(false);
  // Add a new ref to store the interval ID
  const saveIntervalRef = useRef(null);

  // Add the missing handleMediaPipeReady function
  const handleMediaPipeReady = (hands, camera, drawUtils) => {
    console.log("MediaPipe ready with:", hands, camera, drawUtils);
    setMediaPipeReady(true);
    window.Hands = hands;
    window.Camera = camera;
    window.drawConnectors = drawUtils.drawConnectors;
    window.drawLandmarks = drawUtils.drawLandmarks;
    window.HAND_CONNECTIONS = drawUtils.HAND_CONNECTIONS;
  };

  // Initialize MediaPipe Hands after scripts are loaded
  useEffect(() => {
    if (!mediaPipeReady || !cameraEnabled || !stream) return;

    const initializeMediaPipe = async () => {
      try {
        // Make sure window.Hands exists
        if (!window.Hands) {
          console.error('MediaPipe Hands not loaded yet');
          setError('MediaPipe not loaded properly. Please refresh the page.');
          return;
        }

        // Initialize Hands
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
    
    // Cleanup function
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, [cameraEnabled, stream, isPaused, mediaPipeReady]);

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

  // Modified saveLandmarks function to save to a specific folder
  const saveLandmarks = async (resetAfterSave = true) => {
    if (handLandmarks.length === 0) {
      console.log('No landmarks to save');
      return;
    }

    try {
      // Send landmarks to the API endpoint
      const response = await fetch('/api/saveLandmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(handLandmarks),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`Saved ${handLandmarks.length} landmark frames at ${new Date().toLocaleTimeString()}`);
      } else {
        console.error('Error saving landmarks:', result.message);
        setError(`Failed to save landmarks: ${result.message}`);
      }
      
      // Only reset landmarks if requested (typically after manual save)
      if (resetAfterSave) {
        setHandLandmarks([]);
        setLandmarkCount(0);
      }
    } catch (err) {
      console.error('Error saving landmarks:', err);
      setError(`Failed to save landmarks: ${err.message}`);
    }
  };

  // Modified toggleCollection function with interval handling for async saveLandmarks
  const toggleCollection = () => {
    if (isCollecting) {
      // Stop collecting
      setIsCollecting(false);
      
      // Clear the saving interval
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;
      }
      
      // Final save of remaining landmarks
      if (handLandmarks.length > 0) {
        saveLandmarks(true);
      }
    } else {
      // Start collecting
      setHandLandmarks([]);
      setLandmarkCount(0);
      setIsCollecting(true);
      
      // Set up interval to save landmarks every 1.5 seconds
      saveIntervalRef.current = setInterval(() => {
        if (handLandmarks.length > 0) {
          // Save without clearing the landmarks array
          saveLandmarks(false).then(() => {
            // Clear landmarks after saving to avoid duplicates
            setHandLandmarks([]);
            // Keep the count for UI purposes
          });
        }
      }, 1500); // 1.5 seconds
    }
  };

  // Add this new function to your component
  const getCameraDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log('Available video devices:', videoDevices);
      
      if (videoDevices.length > 1) {
        // Usually the first device is the front camera and the second is the back camera on mobile
        const frontCamera = videoDevices[0];
        const backCamera = videoDevices[1]; 
        
        return {
          front: frontCamera.deviceId,
          back: backCamera.deviceId
        };
      }
      
      return null;
    } catch (err) {
      console.error('Error getting camera devices:', err);
      return null;
    }
  };

  // Then modify your enableCamera function:
  const enableCamera = async (cameraModeOverride) => {
    console.log('Starting camera initialization...');
    try {
      setError('');
      
      // First check if we're on HTTPS (required for camera on most mobile browsers)
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        setError('Camera access requires HTTPS. Please use a secure connection.');
        return;
      }
      
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      // First set cameraEnabled to true so the video element renders
      setCameraEnabled(true);
      
      // Short delay to ensure the video element is in the DOM and previous streams are closed
      setTimeout(async () => {
        try {
          // Use the override if provided, otherwise use the current state
          const currentFacingMode = cameraModeOverride || facingMode;
          
          // Start with the most basic constraints for higher compatibility
          let constraints = { 
            video: true,
            audio: false
          };
          
          if (currentFacingMode === 'environment') {
            console.log('Attempting to use back camera with simple constraints');
            try {
              // Try the simplest possible environment camera constraint first
              constraints = { 
                video: { facingMode: 'environment' },
                audio: false
              };
            } catch (err) {
              console.log('Simple back camera constraints failed, falling back to default');
            }
          }
          
          console.log(`Requesting camera access:`, constraints);
          
          try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('Camera access granted with simple constraints:', mediaStream);
            
            setStream(mediaStream);
            setVideoSource(mediaStream);
          } catch (simpleErr) {
            console.error('Simple constraints failed:', simpleErr);
            
            // Try device enumeration as a last resort
            try {
              const devices = await navigator.mediaDevices.enumerateDevices();
              const videoDevices = devices.filter(device => device.kind === 'videoinput');
              
              if (videoDevices.length === 0) {
                throw new Error('No video input devices found');
              }
              
              // Choose appropriate camera (first or last device depending on mode)
              const deviceIndex = currentFacingMode === 'environment' && videoDevices.length > 1 
                ? videoDevices.length - 1  // Usually back camera
                : 0;  // Usually front camera
              
              const deviceId = videoDevices[deviceIndex].deviceId;
              
              const deviceConstraints = {
                video: { deviceId: { exact: deviceId } },
                audio: false
              };
              
              console.log('Trying with specific device ID:', deviceConstraints);
              const deviceStream = await navigator.mediaDevices.getUserMedia(deviceConstraints);
              
              setStream(deviceStream);
              setVideoSource(deviceStream);
            } catch (deviceErr) {
              console.error('Device-specific approach failed:', deviceErr);
              throw new Error(`Could not access camera: ${simpleErr.message}`);
            }
          }
        } catch (err) {
          console.error('Camera access error:', err);
          
          // More user-friendly error messages
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setError('Camera permission denied. Please allow camera access and try again.');
          } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            setError('No camera found on your device.');
          } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
            setError('Your camera is in use by another application. Please close other apps and try again.');
          } else {
            setError(`Failed to acquire camera feed: ${err.message}`);
          }
          
          setCameraEnabled(false);
        }
      }, 500);  // Increased delay for mobile devices
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
    try {
      // First stop any existing streams
      if (stream) {
        // Stop MediaPipe camera if running
        if (cameraRef.current) {
          cameraRef.current.stop();
        }
        
        // Pause video element to stop any pending play requests
        if (videoRef.current) {
          videoRef.current.pause();
        }
        
        // Stop all tracks
        stream.getTracks().forEach(track => {
          track.stop();
        });
        setStream(null);
      }
      
      // Toggle the facing mode
      const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
      console.log(`Switching camera to ${newFacingMode} mode`);
      setFacingMode(newFacingMode);
      
      // Longer delay to ensure tracks are fully stopped and browser has time to release camera
      setTimeout(async () => {
        // Re-enable camera with the new facing mode
        await enableCamera(newFacingMode);
      }, 500); // Increased delay for better reliability
    } catch (err) {
      console.error('Error switching camera:', err);
      setError(`Failed to switch camera: ${err.message}`);
    }
  };

  // Update the setVideoSource function to handle play interruptions
  const setVideoSource = async (mediaStream) => {
    if (!videoRef.current) {
      console.error('Video element not available');
      setError('Video element not found');
      return false;
    }
    
    try {
      // First stop any existing play operations by pausing the video
      if (videoRef.current.srcObject) {
        videoRef.current.pause();
      }
      
      // Clear any previous event listeners
      const oldSrc = videoRef.current.srcObject;
      videoRef.current.srcObject = null;
      
      // If there was a previous stream, give the browser a moment to clean up
      if (oldSrc) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Now set the new stream
      videoRef.current.srcObject = mediaStream;
      
      // Set canvas dimensions to match video
      if (canvasRef.current) {
        canvasRef.current.width = videoRef.current.videoWidth || 1280;
        canvasRef.current.height = videoRef.current.videoHeight || 720;
      }
      
      // Use a more reliable play approach with retries
      let playAttempts = 0;
      const maxPlayAttempts = 3;
      
      const attemptPlay = async () => {
        try {
          playAttempts++;
          await videoRef.current.play();
          console.log('Video playing successfully');
          
          // Update canvas dimensions once video is playing
          if (canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
          
          return true;
        } catch (err) {
          console.warn(`Play attempt ${playAttempts} failed:`, err.message);
          
          if (err.name === 'AbortError' || err.name === 'NotAllowedError') {
            // For play interrupted errors, wait and retry
            if (playAttempts < maxPlayAttempts) {
              console.log(`Retrying play() in 300ms, attempt ${playAttempts+1}/${maxPlayAttempts}`);
              await new Promise(resolve => setTimeout(resolve, 300));
              return attemptPlay();
            }
          }
          
          throw err; // Re-throw if max attempts reached or for other errors
        }
      };
      
      return await attemptPlay();
    } catch (e) {
      console.error("Error playing video:", e);
      setError("Could not start video source: " + e.message);
      return false;
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: stop camera stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Add cleanup for the interval when component unmounts
  useEffect(() => {
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Add the MediaPipeLoader component with the handleMediaPipeReady function */}
      <MediaPipeLoader onReady={handleMediaPipeReady} />
      
      {/* Rest of your UI */}
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
                  {error.includes('Camera error') && (
                    <div className="mt-2">
                      <p className="text-sm text-red-600">Troubleshooting tips:</p>
                      <ul className="list-disc pl-5 text-sm text-red-600">
                        <li>Make sure camera permissions are granted</li>
                        <li>Try reloading the page</li>
                        <li>Your device may not support switching cameras</li>
                      </ul>
                    </div>
                  )}
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
  );
}