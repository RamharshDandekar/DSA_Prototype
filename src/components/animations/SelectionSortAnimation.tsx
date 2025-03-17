import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Play, Pause, RefreshCw } from 'lucide-react';

const SelectionSortAnimation: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sortingSteps, setSortingSteps] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000); // ms between steps
  const [inputValue, setInputValue] = useState<string>('');
  const [sortingInfo, setSortingInfo] = useState<{
    currentIndex?: number;
    minIndex?: number;
    comparingIndex?: number;
    sortedUpTo?: number;
  }>({});
  const [message, setMessage] = useState<string>('');
  
  const intervalRef = useRef<number | null>(null);
  
  // Generate sorting steps for the array
  const generateSortingSteps = (inputArray: number[]): number[][] => {
    const steps: number[][] = [];
    const arr = [...inputArray];
    steps.push([...arr]); // Initial state
    
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      
      if (minIndex !== i) {
        // Swap elements
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push([...arr]);
      }
    }
    
    return steps;
  };
  
  // Generate a random array
  const generateRandomArray = (): void => {
    const size = Math.floor(Math.random() * 5) + 5; // Random size between 5 and 9
    const newArray: number[] = [];
    
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1); // Random number between 1 and 100
    }
    
    setArray(newArray);
    const steps = generateSortingSteps(newArray);
    setSortingSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
    setSortingInfo({});
    setMessage('Random array generated!');
  };
  
  // Parse user input and create array
  const handleCreateArray = (): void => {
    if (!inputValue.trim()) {
      setMessage('Please enter values');
      return;
    }
    
    const values = inputValue.split(',').map(val => {
      const num = parseInt(val.trim());
      return isNaN(num) ? 0 : num;
    });
    
    if (values.some(val => val === 0)) {
      setMessage('Invalid input. Please enter comma-separated numbers');
      return;
    }
    
    if (values.length < 2) {
      setMessage('Please enter at least 2 numbers');
      return;
    }
    
    if (values.length > 12) {
      setMessage('Maximum 12 numbers allowed for visualization');
      return;
    }
    
    setArray(values);
    const steps = generateSortingSteps(values);
    setSortingSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
    setSortingInfo({});
    setMessage('Array created!');
  };
  
  // Step forward in the animation
  const handleNext = (): void => {
    if (currentStep < sortingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      updateSortingInfo(currentStep + 1);
    } else {
      setIsPlaying(false);
      setMessage('Sorting complete!');
    }
  };
  
  // Step backward in the animation
  const handlePrev = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      updateSortingInfo(currentStep - 1);
    }
  };
  
  // Toggle play/pause animation
  const togglePlay = (): void => {
    setIsPlaying(!isPlaying);
  };
  
  // Reset the animation
  const resetAnimation = (): void => {
    setCurrentStep(0);
    setIsPlaying(false);
    setSortingInfo({});
    setMessage('Animation reset!');
  };
  
  // Update sorting info for the current step
  const updateSortingInfo = (step: number): void => {
    if (step === 0) {
      setSortingInfo({ sortedUpTo: -1 });
      setMessage('Initial array. Selection sort starts by finding the minimum value in the unsorted part.');
      return;
    }
    
    if (step === sortingSteps.length - 1) {
      setSortingInfo({ sortedUpTo: array.length - 1 });
      setMessage('Sorting complete! The array is now fully sorted.');
      return;
    }
    
    // Calculate which elements have been sorted up to this point
    const sortedUpTo = step - 1;
    
    // Display what happened in this step
    if (step > 0) {
      const prevArray = sortingSteps[step - 1];
      const currArray = sortingSteps[step];
      
      // Find indices that changed
      const changedIndices: number[] = [];
      for (let i = 0; i < prevArray.length; i++) {
        if (prevArray[i] !== currArray[i]) {
          changedIndices.push(i);
        }
      }
      
      if (changedIndices.length === 2) {
        const [idx1, idx2] = changedIndices;
        setMessage(`Swapped ${prevArray[idx1]} (index ${idx1}) with ${prevArray[idx2]} (index ${idx2}).`);
        setSortingInfo({
          sortedUpTo,
          currentIndex: Math.min(idx1, idx2),
          minIndex: Math.max(idx1, idx2)
        });
      } else {
        setSortingInfo({ sortedUpTo });
        setMessage(`Checking for the next smallest element.`);
      }
    }
  };
  
  // Effect for auto-playing the animation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentStep(prevStep => {
          if (prevStep < sortingSteps.length - 1) {
            updateSortingInfo(prevStep + 1);
            return prevStep + 1;
          } else {
            setIsPlaying(false);
            setMessage('Sorting complete!');
            return prevStep;
          }
        });
      }, speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, sortingSteps, speed]);
  
  // Effect to initialize the animation
  useEffect(() => {
    generateRandomArray();
  }, []);
  
  // Get the current state of the array
  const currentArray = sortingSteps[currentStep] || array;
  
  // Get the maximum value for scaling
  const maxValue = Math.max(...array, 1);
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">Selection Sort Visualization</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2 flex-1">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter numbers separated by commas (e.g., 5,2,9,1,5)"
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateArray();
                }}
              />
              <Button onClick={handleCreateArray} className="bg-[#7e61e9] hover:bg-[#6a50c7] whitespace-nowrap">
                Create Array
              </Button>
            </div>
            <Button onClick={generateRandomArray} className="bg-[#260446] hover:bg-[#3b1169]">
              <RefreshCw className="w-4 h-4 mr-2" />
              Random Array
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={handlePrev} disabled={currentStep === 0} className="bg-gray-500 hover:bg-gray-600">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button onClick={togglePlay} className={isPlaying ? "bg-yellow-500 hover:bg-yellow-600" : "bg-[#7e61e9] hover:bg-[#6a50c7]"}>
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
              <Button onClick={handleNext} disabled={currentStep === sortingSteps.length - 1} className="bg-gray-500 hover:bg-gray-600">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button onClick={resetAnimation} className="bg-red-500 hover:bg-red-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="border rounded px-2 py-1 text-sm bg-white"
              >
                <option value="2000">Slow</option>
                <option value="1000">Medium</option>
                <option value="500">Fast</option>
                <option value="250">Very Fast</option>
              </select>
            </div>
          </div>
          
          {message && (
            <div className="mt-2 text-sm font-medium text-gray-600">
              {message}
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-2">
            Step {currentStep} of {sortingSteps.length - 1}
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="h-64 flex items-end justify-center gap-2">
          {currentArray.map((value, index) => {
            const isSorted = sortingInfo.sortedUpTo !== undefined && index <= sortingInfo.sortedUpTo;
            const isCurrentIndex = index === sortingInfo.currentIndex;
            const isMinIndex = index === sortingInfo.minIndex;
            const isComparing = index === sortingInfo.comparingIndex;
            
            let barColor = "bg-blue-400";
            if (isSorted) barColor = "bg-green-400";
            if (isComparing) barColor = "bg-yellow-400";
            if (isCurrentIndex) barColor = "bg-purple-500";
            if (isMinIndex) barColor = "bg-red-500";
            
            return (
              <motion.div
                key={`${index}-${value}`}
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxValue) * 200}px` }}
                transition={{ duration: 0.5 }}
                className={`w-16 flex flex-col items-center justify-end rounded-t-md ${barColor}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white font-bold">{value}</span>
                </div>
                <div className="bg-gray-200 w-full py-1 text-center text-xs">
                  {index}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Selection Sort</h4>
            <p className="text-gray-700">
              Selection Sort is a simple sorting algorithm that works by repeatedly finding the minimum element from 
              the unsorted part of the array and putting it at the beginning. The algorithm maintains two subarrays:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>The sorted subarray (shown in green)</li>
              <li>The unsorted subarray (remaining elements)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Color Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 mr-2"></div>
                <span className="text-gray-700">Sorted Elements</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 mr-2"></div>
                <span className="text-gray-700">Current Position</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 mr-2"></div>
                <span className="text-gray-700">Minimum Element Found</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-400 mr-2"></div>
                <span className="text-gray-700">Unsorted Elements</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-[#260446] mb-2">Algorithm Details</h4>
          <div className="space-y-2 text-gray-700">
            <p><strong>Time Complexity:</strong> O(n²) - where n is the number of elements</p>
            <p><strong>Space Complexity:</strong> O(1) - Selection Sort is an in-place algorithm</p>
            <p><strong>Stability:</strong> Not stable - equal elements might change their relative order</p>
            <p><strong>Process:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Find the minimum element in the unsorted part of the array</li>
              <li>Swap it with the first element of the unsorted part</li>
              <li>Move the boundary between sorted and unsorted subarrays one element to the right</li>
              <li>Repeat until the entire array is sorted</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SelectionSortAnimation;
