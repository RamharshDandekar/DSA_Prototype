import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Play, Pause, RefreshCw, SkipForward, SkipBack, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Node {
  id: string;
  heuristic: number;
  x: number;
  y: number;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

interface GraphState {
  visited: string[];
  frontier: string[];
  current: string | null;
  examining: string | null;
  path: string[];
  message: string;
}

const GreedyBestFirstSearchAnimation: React.FC = () => {
  // Graph data - nodes with heuristic values and positions
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'A', heuristic: 8, x: 300, y: 50 },
    { id: 'B', heuristic: 4, x: 150, y: 120 },
    { id: 'C', heuristic: 3, x: 450, y: 120 },
    { id: 'D', heuristic: 5, x: 75, y: 200 },
    { id: 'E', heuristic: 2, x: 225, y: 200 },
    { id: 'F', heuristic: 1, x: 375, y: 200 },
    { id: 'G', heuristic: 6, x: 525, y: 200 },
    { id: 'H', heuristic: 3, x: 225, y: 280 },
    { id: 'I', heuristic: 0, x: 375, y: 280 }  // Goal node has heuristic of 0
  ]);

  // Graph edges with weights
  const [edges, setEdges] = useState<Edge[]>([
    { source: 'A', target: 'B', weight: 1 },
    { source: 'A', target: 'C', weight: 1 },
    { source: 'B', target: 'D', weight: 1 },
    { source: 'B', target: 'E', weight: 1 },
    { source: 'C', target: 'F', weight: 1 },
    { source: 'C', target: 'G', weight: 1 },
    { source: 'E', target: 'H', weight: 1 },
    { source: 'F', target: 'I', weight: 1 }
  ]);

  const [graph, setGraph] = useState<{[key: string]: string[]}>({
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F', 'G'],
    D: ['B'],
    E: ['B', 'H'],
    F: ['C', 'I'],
    G: ['C'],
    H: ['E'],
    I: ['F']
  });

  // State for algorithm animation
  const [startNode, setStartNode] = useState<string>('A');
  const [goalNode, setGoalNode] = useState<string>('I');
  const [searchTarget, setSearchTarget] = useState<string>('I');
  const [graphState, setGraphState] = useState<GraphState>({
    visited: [],
    frontier: [],
    current: null,
    examining: null,
    path: [],
    message: '',
  });
  const [parentMap, setParentMap] = useState<{[key: string]: string}>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [step, setStep] = useState<number>(0);
  const [steps, setSteps] = useState<GraphState[]>([]);
  const [activeTab, setActiveTab] = useState<'visualization' | 'code'>('visualization');
  const [svgWidth, setSvgWidth] = useState(600);
  const [svgHeight, setSvgHeight] = useState(350);
  
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Function to start the search
  const startSearch = () => {
    initializeSearch(startNode, searchTarget);
  };

  // Function to initialize the algorithm
  const initializeSearch = (start: string, goal: string) => {
    // Reset all states
    setGraphState({
      visited: [],
      frontier: [start],
      current: null,
      examining: null,
      path: [],
      message: `Initialized Greedy Best-First Search algorithm from ${start} to ${goal}`,
    });
    setParentMap({});
    setStep(0);
    setIsComplete(false);
    setIsPlaying(false);
    setStartNode(start);
    setGoalNode(goal);
    
    // Generate all steps for the animation
    const generatedSteps = generateSearchSteps(start, goal);
    setSteps(generatedSteps);
    
    // Toast notification
    toast.success(`Search initialized from ${start} to ${goal}`);
  };

  // Generate all steps for the Greedy Best-First Search animation
  const generateSearchSteps = (start: string, goal: string) => {
    const steps: GraphState[] = [];
    const visited: string[] = [];
    const frontier: string[] = [start];
    const parentMap: {[key: string]: string} = {};
    
    // Add initial state
    steps.push({
      visited: [...visited],
      frontier: [...frontier],
      current: null,
      examining: null,
      path: [],
      message: `Starting Greedy Best-First Search from node ${start} to goal node ${goal}`
    });
    
    let pathFound = false;
    
    while (frontier.length > 0 && !pathFound) {
      // Sort frontier based on heuristic values (lowest first)
      frontier.sort((a, b) => {
        const aHeuristic = nodes.find(node => node.id === a)?.heuristic || 0;
        const bHeuristic = nodes.find(node => node.id === b)?.heuristic || 0;
        return aHeuristic - bHeuristic;
      });
      
      // Get the node with the lowest heuristic value
      const current = frontier.shift()!;
      visited.push(current);
      
      // Add step for selecting current node
      const currentNodeHeuristic = nodes.find(node => node.id === current)?.heuristic || 0;
      steps.push({
        visited: [...visited],
        frontier: [...frontier],
        current,
        examining: null,
        path: [],
        message: `Selected node ${current} with heuristic value ${currentNodeHeuristic}`
      });
      
      // Check if goal reached
      if (current === goal) {
        // Reconstruct path
        const path: string[] = [];
        let curr = current;
        while (curr) {
          path.unshift(curr);
          curr = parentMap[curr];
        }
        
        // Add goal reached step
        steps.push({
          visited: [...visited],
          frontier: [...frontier],
          current,
          examining: null,
          path,
          message: `Goal reached! Path: ${path.join(' → ')}`
        });
        
        pathFound = true;
        break;
      }
      
      // Process neighbors
      const neighbors = graph[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.includes(neighbor) && !frontier.includes(neighbor)) {
          // Add intermediate step showing examination of this neighbor
          steps.push({
            visited: [...visited],
            frontier: [...frontier],
            current,
            examining: neighbor,
            path: [],
            message: `Examining neighbor ${neighbor} of node ${current}`
          });
          
          frontier.push(neighbor);
          parentMap[neighbor] = current;
          
          // Add step for adding neighbor to frontier
          const neighborHeuristic = nodes.find(node => node.id === neighbor)?.heuristic || 0;
          steps.push({
            visited: [...visited],
            frontier: [...frontier],
            current,
            examining: null,
            path: [],
            message: `Added ${neighbor} to frontier with heuristic ${neighborHeuristic}`
          });
        }
      }
      
      // If frontier is empty and goal not reached
      if (frontier.length === 0 && !pathFound) {
        steps.push({
          visited: [...visited],
          frontier: [],
          current: null,
          examining: null,
          path: [],
          message: `No path found from ${start} to ${goal}`
        });
      }
    }
    
    return steps;
  };

  // Reset the animation
  const resetAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    initializeSearch(startNode, goalNode);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Step forward
  const stepForward = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  // Step backward
  const stepBackward = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Handle speed change
  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpeed(parseInt(e.target.value));
  };

  // Handle start node change
  const handleStartNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartNode(e.target.value);
  };

  // Handle goal node change
  const handleSearchTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTarget(e.target.value);
  };

  // Resize observer for SVG container
  useEffect(() => {
    const updateSize = () => {
      if (graphContainerRef.current) {
        const { width, height } = graphContainerRef.current.getBoundingClientRect();
        setSvgWidth(width);
        setSvgHeight(height - 20); // Subtract some padding
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

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
  }, [isPlaying, steps.length, speed]);

  // Effect for updating the state based on the current step
  useEffect(() => {
    if (steps.length > 0 && step < steps.length) {
      const currentStep = steps[step];
      setGraphState(currentStep);
      
      // Check if this is the final step with a complete path
      if (currentStep.path.length > 0) {
        setIsComplete(true);
      }
    }
  }, [step, steps]);

  // Initialize on mount
  useEffect(() => {
    initializeSearch(startNode, goalNode);
  }, []);

  // Sample code for demonstration
  const pseudoCode = `function GreedyBestFirstSearch(graph, start, goal, heuristic):
    # Initialize frontier with start node
    frontier = PriorityQueue()
    frontier.add(start, heuristic(start))
    
    # Initialize empty set for visited nodes
    visited = {}
    
    # Map to track parent nodes for path reconstruction
    parentMap = {}
    
    while not frontier.isEmpty():
        # Get node with lowest heuristic value
        current = frontier.pop()
        
        # Check if we've reached goal
        if current == goal:
            return reconstructPath(parentMap, start, goal)
        
        # Mark as visited
        visited.add(current)
        
        # Explore all neighbors
        for each neighbor in graph[current]:
            if neighbor not in visited and neighbor not in frontier:
                parentMap[neighbor] = current
                frontier.add(neighbor, heuristic(neighbor))
    
    # No path found
    return "No path found"`;

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-[#260446]">Greedy Best-First Search Visualization</h3>
      
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm">
        <div className="flex mb-4 space-x-2">
          <Button
            onClick={() => setActiveTab('visualization')}
            className={activeTab === 'visualization' ? 'bg-[#7e61e9]' : 'bg-gray-200 text-gray-700'}
          >
            Visualization
          </Button>
          <Button
            onClick={() => setActiveTab('code')}
            className={activeTab === 'code' ? 'bg-[#7e61e9]' : 'bg-gray-200 text-gray-700'}
          >
            Pseudocode
          </Button>
        </div>
        
        {activeTab === 'visualization' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <label htmlFor="startNode" className="block text-sm text-gray-600 mb-1">Start Node</label>
                  <select
                    id="startNode"
                    value={startNode}
                    onChange={handleStartNodeChange}
                    className="border rounded px-2 py-1 text-sm bg-white w-16"
                  >
                    {nodes.map(node => (
                      <option key={`start-${node.id}`} value={node.id}>{node.id}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="goalNode" className="block text-sm text-gray-600 mb-1">Goal Node</label>
                  <select
                    id="goalNode"
                    value={searchTarget}
                    onChange={handleSearchTargetChange}
                    className="border rounded px-2 py-1 text-sm bg-white w-16"
                  >
                    {nodes.map(node => (
                      <option key={`goal-${node.id}`} value={node.id}>{node.id}</option>
                    ))}
                  </select>
                </div>
                
                <Button 
                  onClick={startSearch}
                  className="mt-auto bg-[#7e61e9] hover:bg-[#6a50c7]"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Start Search
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Speed:</span>
                <select
                  value={speed}
                  onChange={handleSpeedChange}
                  className="border rounded px-2 py-1 text-sm bg-white"
                >
                  <option value="2000">Slow</option>
                  <option value="1000">Medium</option>
                  <option value="500">Fast</option>
                  <option value="200">Very Fast</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
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
              <Button onClick={stepBackward} disabled={step === 0} variant="outline">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button onClick={stepForward} disabled={step === steps.length - 1} variant="outline">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-sm font-medium text-gray-800 p-3 bg-gray-100 rounded-md">
              {graphState.message}
            </div>
            
            <div className="text-sm flex justify-between items-center">
              <span className="text-gray-500">
                Step {step + 1} of {steps.length}
              </span>
              {isComplete && graphState.path.length > 0 && (
                <Badge variant="outline" className="bg-green-50 text-green-800">
                  Path Length: {graphState.path.length - 1} steps
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'code' && (
          <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto font-mono text-sm">
            <pre>{pseudoCode}</pre>
          </div>
        )}
      </Card>
      
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        {activeTab === 'visualization' && (
          <div 
            ref={graphContainerRef} 
            className="relative h-[400px] w-full border rounded-lg bg-gray-50 overflow-hidden"
          >
            <svg 
              width={svgWidth} 
              height={svgHeight} 
              className="absolute top-0 left-0 w-full h-full"
            >
              {/* Draw edges */}
              {edges.map((edge, index) => {
                const sourceNode = nodes.find(n => n.id === edge.source);
                const targetNode = nodes.find(n => n.id === edge.target);
                
                if (!sourceNode || !targetNode) return null;
                
                // Determine if this edge is part of the final path
                const isPathEdge = graphState.path.length > 1 && graphState.path.some((n, i) => 
                  i < graphState.path.length - 1 && 
                  ((graphState.path[i] === edge.source && graphState.path[i+1] === edge.target) || 
                   (graphState.path[i] === edge.target && graphState.path[i+1] === edge.source))
                );
                
                // Determine if this edge connects current node to a neighbor being examined
                const isExaminingEdge = graphState.current === edge.source && graphState.examining === edge.target ||
                                        graphState.current === edge.target && graphState.examining === edge.source;
                  
                // Determine if this edge is part of the current traversal path
                const isCurrentPathEdge = graphState.current && parentMap[graphState.current] && 
                  ((edge.source === graphState.current && edge.target === parentMap[graphState.current]) || 
                   (edge.source === parentMap[graphState.current] && edge.target === graphState.current));
                
                let edgeColor = "#d1d5db"; // Default gray
                let edgeWidth = 1;
                
                if (isPathEdge) {
                  edgeColor = "#4ade80"; // Green for final path
                  edgeWidth = 3;
                } else if (isExaminingEdge) {
                  edgeColor = "#facc15"; // Yellow for examining
                  edgeWidth = 2;
                } else if (isCurrentPathEdge) {
                  edgeColor = "#ec4899"; // Pink for current path
                  edgeWidth = 2;
                }
                
                return (
                  <line
                    key={`${edge.source}-${edge.target}`}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={edgeColor}
                    strokeWidth={edgeWidth}
                  />
                );
              })}
              
              {/* Draw nodes */}
              {nodes.map((node) => {
                const isStart = node.id === startNode;
                const isGoal = node.id === goalNode;
                const isVisited = graphState.visited.includes(node.id);
                const isCurrent = node.id === graphState.current;
                const isInFrontier = graphState.frontier.includes(node.id);
                const isExamining = node.id === graphState.examining;
                const isInPath = graphState.path.includes(node.id);
                
                let nodeColor = "#e0e7ff"; // Default - light blue
                let borderColor = "#6366f1"; // Default - indigo
                let textColor = "#4338ca"; // Default - indigo text
                
                if (isStart) {
                  nodeColor = "#fee2e2"; // Light red
                  borderColor = "#ef4444"; // Red
                  textColor = "#b91c1c"; // Dark red
                } else if (isGoal) {
                  nodeColor = "#dcfce7"; // Light green
                  borderColor = "#22c55e"; // Green
                  textColor = "#15803d"; // Dark green
                } else if (isCurrent) {
                  nodeColor = "#c7d2fe"; // Dark indigo
                  borderColor = "#4f46e5"; // Indigo
                  textColor = "#3730a3"; // Darker indigo
                } else if (isExamining) {
                  nodeColor = "#fef9c3"; // Light yellow
                  borderColor = "#eab308"; // Yellow
                  textColor = "#a16207"; // Dark yellow
                } else if (isInFrontier) {
                  nodeColor = "#fef3c7"; // Light amber
                  borderColor = "#f59e0b"; // Amber
                  textColor = "#b45309"; // Dark amber
                } else if (isVisited) {
                  nodeColor = "#f3e8ff"; // Light purple
                  borderColor = "#a855f7"; // Purple
                  textColor = "#7e22ce"; // Dark purple
                } else if (isInPath) {
                  nodeColor = "#d9f99d"; // Light lime
                  borderColor = "#84cc16"; // Lime
                  textColor = "#4d7c0f"; // Dark lime
                }
                
                const nodeRadius = 22;
                
                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={nodeRadius}
                      fill={nodeColor}
                      stroke={borderColor}
                      strokeWidth={2}
                      className={isCurrent ? "animate-pulse" : ""}
                    />
                    <text
                      x={node.x}
                      y={node.y - 5}
                      textAnchor="middle"
                      fill={textColor}
                      fontWeight="bold"
                      fontSize="14"
                    >
                      {node.id}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 12}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="10"
                    >
                      h={node.heuristic}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Greedy Best-First Search</h4>
            <p className="text-gray-700">
              Greedy Best-First Search is an informed search algorithm that uses a heuristic function to estimate
              the cost from the current node to the goal. At each step, it expands the node that appears to be closest
              to the goal, based solely on the heuristic.
            </p>
            <p className="text-gray-700 mt-2">
              Unlike A* search, Greedy Best-First Search does not consider the cost to reach the current node,
              making it potentially faster but not guaranteed to find the shortest path.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-[#260446] mb-2">Color Legend</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-500 mr-2"></div>
                <span className="text-gray-700">Start Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-500 mr-2"></div>
                <span className="text-gray-700">Goal Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-indigo-100 border border-indigo-500 mr-2"></div>
                <span className="text-gray-700">Current Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-100 border border-amber-500 mr-2"></div>
                <span className="text-gray-700">Frontier Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 border border-purple-500 mr-2"></div>
                <span className="text-gray-700">Visited Node</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 mr-2"></div>
                <span className="text-gray-700">Examining</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-lime-200 border border-lime-600 mr-2"></div>
                <span className="text-gray-700">Path Node</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-500">The number inside each node shows its heuristic value (h) - the estimated distance to the goal</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GreedyBestFirstSearchAnimation;
