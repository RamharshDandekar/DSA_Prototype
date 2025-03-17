
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RefreshCw } from 'lucide-react';

const DijkstrasAlgorithmAnimation: React.FC = () => {
  const [graph, setGraph] = useState<{[key: string]: {[key: string]: number}}>({
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2, F: 6 },
    E: { C: 10, D: 2, F: 3 },
    F: { D: 6, E: 3 },
  });
  const [distances, setDistances] = useState<{[key: string]: number}>({});
  const [previousNodes, setPreviousNodes] = useState<{[key: string]: string | null}>({});
  const [visited, setVisited] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [source, setSource] = useState<string>('A');
  const [message, setMessage] = useState<string>('');
  
  const intervalRef = useRef<number | null>(null);
  
  // Initialize Dijkstra's algorithm
  const initializeDijkstra = () => {
    const nodes = Object.keys(graph);
    const initialDistances: {[key: string]: number} = {};
    const initialPrevious: {[key: string]: string | null} = {};
    
    nodes.forEach(node => {
      initialDistances[node] = node === source ? 0 : Infinity;
      initialPrevious[node] = null;
    });
    
    setDistances(initialDistances);
    setPreviousNodes(initialPrevious);
    setVisited([]);
    setCurrent(null);
    setStep(0);
    
    // Generate all steps for the animation
    const generatedSteps = generateDijkstraSteps(graph, source);
    setSteps(generatedSteps);
    setMessage('Initialized Dijkstra\'s algorithm. Starting from node ' + source);
  };
  
  // Generate all steps for the Dijkstra's algorithm animation
  const generateDijkstraSteps = (graph: {[key: string]: {[key: string]: number}}, source: string) => {
    const nodes = Object.keys(graph);
    const steps = [];
    
    // Initialize
    const distances: {[key: string]: number} = {};
    const previous: {[key: string]: string | null} = {};
    const visited: string[] = [];
    
    nodes.forEach(node => {
      distances[node] = node === source ? 0 : Infinity;
      previous[node] = null;
    });
    
    // Add initial state
    steps.push({
      distances: {...distances},
      previous: {...previous},
      visited: [...visited],
      current: null,
      message: 'Starting Dijkstra\'s algorithm from node ' + source
    });
    
    // Algorithm steps
    while (visited.length < nodes.length) {
      // Find node with minimum distance
      let minDistance = Infinity;
      let minNode = null;
      
      for (const node of nodes) {
        if (!visited.includes(node) && distances[node] < minDistance) {
          minDistance = distances[node];
          minNode = node;
        }
      }
      
      // If no reachable nodes, break
      if (minNode === null || distances[minNode] === Infinity) {
        steps.push({
          distances: {...distances},
          previous: {...previous},
          visited: [...visited],
          current: null,
          message: 'Some nodes are unreachable from source'
        });
        break;
      }
      
      // Add to visited
      visited.push(minNode);
      
      // Add step for selecting current node
      steps.push({
        distances: {...distances},
        previous: {...previous},
        visited: [...visited],
        current: minNode,
        message: `Selected node ${minNode} with distance ${distances[minNode]}`
      });
      
      // Update distances to neighbors
      for (const neighbor in graph[minNode]) {
        const newDist = distances[minNode] + graph[minNode][neighbor];
        
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = minNode;
          
          // Add step for updating neighbor
          steps.push({
            distances: {...distances},
            previous: {...previous},
            visited: [...visited],
            current: minNode,
            examining: neighbor,
            message: `Updated distance to ${neighbor} via ${minNode} to ${newDist}`
          });
        } else {
          // Add step for examining but not updating neighbor
          steps.push({
            distances: {...distances},
            previous: {...previous},
            visited: [...visited],
            current: minNode,
            examining: neighbor,
            message: `Examined ${neighbor}, but current path is better`
          });
        }
      }
    }
    
    // Add final state
    steps.push({
      distances: {...distances},
      previous: {...previous},
      visited: [...visited],
      current: null,
      message: 'Algorithm complete - shortest paths found'
    });
    
    return steps;
  };
  
  // Reset the animation
  const resetAnimation = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    initializeDijkstra();
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Effect for auto-playing the animation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setStep(prevStep => {
          if (prevStep < steps.length - 1) {
            return prevStep + 1;
          } else {
            setIsPlaying(false);
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
  }, [isPlaying, steps, speed]);
  
  // Effect for updating the state based on the current step
  useEffect(() => {
    if (steps.length > 0 && step < steps.length) {
      const currentStep = steps[step];
      setDistances(currentStep.distances);
      setPreviousNodes(currentStep.previous);
      setVisited(currentStep.visited);
      setCurrent(currentStep.current);
      setMessage(currentStep.message);
    }
  }, [step, steps]);
  
  // Initialize on mount
  useEffect(() => {
    initializeDijkstra();
  }, []);
  
  // Calculate positions for nodes (in a circular layout)
  const nodePositions = () => {
    const nodes = Object.keys(graph);
    const radius = 150;
    const center = { x: 250, y: 200 };
    const positions: {[key: string]: {x: number, y: number}} = {};
    
    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      positions[node] = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      };
    });
    
    return positions;
  };
  
  const positions = nodePositions();
  
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">Dijkstra's Algorithm Visualization</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex gap-2">
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
          
          <div className="text-sm font-medium text-gray-600">
            {message}
          </div>
          
          <div className="text-sm text-gray-500">
            Step {step} of {steps.length - 1}
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="relative h-[400px] w-full">
          {/* Draw edges */}
          {Object.entries(graph).map(([node, neighbors]) => 
            Object.entries(neighbors).map(([neighbor, weight]) => {
              // Only draw each edge once
              if (node < neighbor) {
                const startPos = positions[node];
                const endPos = positions[neighbor];
                
                // Determine if this edge is part of the shortest path
                const isShortestPath = previousNodes[neighbor] === node || previousNodes[node] === neighbor;
                
                return (
                  <svg 
                    key={`${node}-${neighbor}`} 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  >
                    <line
                      x1={startPos.x}
                      y1={startPos.y}
                      x2={endPos.x}
                      y2={endPos.y}
                      stroke={isShortestPath ? "#4ade80" : "#d1d5db"}
                      strokeWidth={isShortestPath ? 3 : 1}
                    />
                    <text
                      x={(startPos.x + endPos.x) / 2}
                      y={(startPos.y + endPos.y) / 2}
                      fill="#4b5563"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="12"
                      className="bg-white px-1"
                    >
                      {weight}
                    </text>
                  </svg>
                );
              }
              return null;
            })
          )}
          
          {/* Draw nodes */}
          {Object.keys(graph).map(node => {
            const pos = positions[node];
            const isVisited = visited.includes(node);
            const isCurrent = node === current;
            const isExamining = steps[step]?.examining === node;
            
            let nodeColor = "bg-blue-100 border-blue-500";
            if (isVisited) nodeColor = "bg-green-100 border-green-500";
            if (isExamining) nodeColor = "bg-yellow-100 border-yellow-500";
            if (isCurrent) nodeColor = "bg-purple-100 border-purple-500";
            if (node === source) nodeColor = "bg-red-100 border-red-500";
            
            return (
              <motion.div
                key={node}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  x: isCurrent ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  x: isCurrent ? { repeat: 0, duration: 0.5 } : undefined
                }}
                className={`absolute w-12 h-12 rounded-full flex items-center justify-center border-2 ${nodeColor}`}
                style={{ left: pos.x - 24, top: pos.y - 24 }}
              >
                <div className="text-lg font-bold">{node}</div>
                <div className="absolute -bottom-8 text-xs bg-white px-1 rounded">
                  {distances[node] === Infinity ? "∞" : distances[node]}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Dijkstra's Algorithm</h4>
            <p className="text-gray-700">
              Dijkstra's algorithm finds the shortest path between nodes in a graph. It works by 
              visiting vertices in order of increasing distance from the source, and for each vertex, 
              relaxing all outgoing edges.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Color Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-500 mr-2"></div>
                <span className="text-gray-700">Source Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 border border-purple-500 mr-2"></div>
                <span className="text-gray-700">Current Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 mr-2"></div>
                <span className="text-gray-700">Node Being Examined</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-500 mr-2"></div>
                <span className="text-gray-700">Visited Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 border border-blue-500 mr-2"></div>
                <span className="text-gray-700">Unvisited Node</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DijkstrasAlgorithmAnimation;
