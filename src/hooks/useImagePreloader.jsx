import { useState, useEffect } from 'react';

/**
 * A deep module for orchestrating the preloading of cinematic image sequences.
 * Returns the exact progress percentage and the finalized array of image elements.
 */
export function useImagePreloader() {
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    let expectedCount = 0;
    
    // On mobile, we skip every other frame (step = 2) to halve memory and network usage.
    const isMobileDevice = window.innerWidth < 768;
    const step = isMobileDevice ? 2 : 1;
    
    const checkLoad = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / expectedCount) * 100));
      if (loadedCount === expectedCount) {
        setImages(loadedImages);
        // Small delay to let the progress bar visually hit 100%
        setTimeout(() => setIsComplete(true), 800);
      }
    };

    const addSequence = (folder, prefix, start, end, startIndexOffset) => {
      for (let i = start; i <= end; i += step) {
        expectedCount++;
        const img = new Image();
        img.src = `/assets/${folder}/${prefix}${i.toString().padStart(3, '0')}.webp`;
        img.onload = checkLoad;
        img.onerror = checkLoad;
        loadedImages[startIndexOffset + (i - start)] = img;
        if (isMobileDevice && i < end) {
           // Duplicate the reference for the skipped frame to keep timeline logic identical
           loadedImages[startIndexOffset + (i - start) + 1] = img;
        }
      }
    };

    // Calculate total frames to ensure we don't dispatch state updates prematurely
    // We add the frames to specific absolute array indices so they align with the master GSAP timeline.
    addSequence('heroscroll2', 'scene-', 1, 52, 0); // ends at 51
    addSequence('heroscroll3', 'scene-', 1, 51, 52); // ends at 102
    addSequence('heroscroll4', 'a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (2)_', 0, 53, 103);
    addSequence('heroscroll5', 'a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (3)_', 0, 51, 157);
    addSequence('heroscroll6', 'a-smooth-169-cinematic-dolly-shot-of-a-doctors-cli (online-video-cutter.com) (4)_', 0, 44, 209);
    addSequence('heroscroll7', 'rapid-zoom-in-with-an-extreme-dynamic-transition-t-ezremove_', 0, 49, 254);
    addSequence('heroscroll8', 'two-stylized-line-drawn-characters-one-helping-an-ezremove_', 0, 51, 304);

  }, []);

  return { images, progress, isComplete };
}
