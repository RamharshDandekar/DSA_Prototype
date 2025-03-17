export interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: string;
}

export interface TopicDetail {
  id: string;
  title: string;
  aim: string;
  objective: string;
  theory: string;
  implementation: string | Record<string, string>;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  animation?: string;
  test?: {
    questions: {
      question: string;
      options: string[];
      answer: number;
    }[]
  };
}

export interface FieldType {
  id: string;
  title: string;
  topics: Topic[];
}

export const ComputerScienceFields: FieldType[] = [
  {
    id: "data-structures",
    title: "Data Structures",
    topics: [
      {
        id: "stack",
        title: "Stack",
        description: "A linear data structure that follows the LIFO principle",
        difficulty: "Easy",
        icon: "/placeholder.svg"
      },
      {
        id: "linked-list",
        title: "Linked List",
        description: "A linear data structure where elements are stored in nodes",
        difficulty: "Easy",
        icon: "/placeholder.svg"
      },
      {
        id: "binary-search",
        title: "Binary Search",
        description: "An efficient search algorithm that works on sorted arrays",
        difficulty: "Easy",
        icon: "/placeholder.svg"
      },
      {
        id: "selection-sort",
        title: "Selection Sort",
        description: "A simple comparison-based sorting algorithm",
        difficulty: "Easy",
        icon: "/placeholder.svg"
      },
      {
        id: "radix-sort",
        title: "Radix Sort",
        description: "A non-comparative sorting algorithm that sorts data with integer keys",
        difficulty: "Medium",
        icon: "/placeholder.svg"
      },
      {
        id: "topological-sort",
        title: "Topological Sort",
        description: "A linear ordering of vertices in a directed acyclic graph",
        difficulty: "Medium",
        icon: "/placeholder.svg"
      },
      {
        id: "minimum-spanning-trees",
        title: "Minimum Spanning Trees",
        description: "A subset of edges that connects all vertices with minimum total edge weight",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "dijkstra",
        title: "Dijkstra's Algorithm",
        description: "An algorithm for finding the shortest paths between nodes in a graph",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "red-black-tree",
        title: "Red Black Tree",
        description: "A self-balancing binary search tree",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      }
    ]
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    topics: [
      {
        id: "policy-iteration",
        title: "Policy Iteration",
        description: "An algorithm to find the optimal policy in reinforcement learning",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "value-iteration",
        title: "Value Iteration",
        description: "An algorithm to find the optimal value function in reinforcement learning",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "q-learning",
        title: "Q-Learning",
        description: "A model-free reinforcement learning algorithm",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      },
      {
        id: "dfs",
        title: "AI Depth First Search",
        description: "A search algorithm used for traversing tree or graph data structures",
        difficulty: "Medium",
        icon: "/placeholder.svg"
      },
      {
        id: "greedy-best-first",
        title: "Greedy Best First Search",
        description: "A search algorithm that expands the most promising node",
        difficulty: "Medium",
        icon: "/placeholder.svg"
      },
      {
        id: "bayesian-network",
        title: "Construction of Bayesian Network",
        description: "A probabilistic graphical model that represents variables and their dependencies",
        difficulty: "Hard",
        icon: "/placeholder.svg"
      }
    ]
  }
];

export const topicDetails: Record<string, TopicDetail> = {
  "stack": {
    id: "stack",
    title: "Stack Data Structure",
    aim: "To understand the implementation and working of the Stack data structure.",
    objective: "Learn how to implement and use a Stack for solving various programming problems.",
    theory: `A stack is a linear data structure that follows the Last In First Out (LIFO) principle. This means that the last element inserted into the stack is the first one to be removed.

A stack has two primary operations:
- Push: Adds an element to the top of the stack
- Pop: Removes the element from the top of the stack

Additional common operations include:
- Peek/Top: Returns the top element without removing it
- isEmpty: Checks if the stack is empty

Stacks are used in many applications:
- Function call management in programming languages (call stack)
- Expression evaluation and syntax parsing
- Undo mechanisms in text editors
- Browser history (back button functionality)
- Backtracking algorithms`,
    implementation: {
      javascript: `
class Stack {
  constructor() {
    this.items = [];
  }
  
  // Add element to the top of the stack
  push(element) {
    this.items.push(element);
    return element;
  }
  
  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      return "Underflow - Stack is empty";
    }
    return this.items.pop();
  }
  
  // Return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }
  
  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Return the size of the stack
  size() {
    return this.items.length;
  }
  
  // Clear the stack
  clear() {
    this.items = [];
  }
  
  // Print the stack
  print() {
    console.log(this.items.toString());
  }
}

// Example usage:
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek()); // Output: 30
console.log(stack.pop());  // Output: 30
console.log(stack.size()); // Output: 2
    `,
      python: `
class Stack:
    def __init__(self):
        self.items = []
    
    # Add element to the top of the stack
    def push(self, element):
        self.items.append(element)
        return element
    
    # Remove and return the top element
    def pop(self):
        if self.is_empty():
            return "Underflow - Stack is empty"
        return self.items.pop()
    
    # Return the top element without removing it
    def peek(self):
        if self.is_empty():
            return "Stack is empty"
        return self.items[-1]
    
    # Check if stack is empty
    def is_empty(self):
        return len(self.items) == 0
    
    # Return the size of the stack
    def size(self):
        return len(self.items)
    
    # Clear the stack
    def clear(self):
        self.items = []
    
    # Print the stack
    def print_stack(self):
        print(str(self.items))

# Example usage:
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
print(stack.peek())  # Output: 30
print(stack.pop())   # Output: 30
print(stack.size())  # Output: 2
    `,
      java: `
import java.util.ArrayList;

public class Stack<T> {
    private ArrayList<T> items;
    
    public Stack() {
        this.items = new ArrayList<>();
    }
    
    // Add element to the top of the stack
    public T push(T element) {
        this.items.add(element);
        return element;
    }
    
    // Remove and return the top element
    public T pop() {
        if (isEmpty()) {
            throw new RuntimeException("Underflow - Stack is empty");
        }
        return this.items.remove(this.items.size() - 1);
    }
    
    // Return the top element without removing it
    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return this.items.get(this.items.size() - 1);
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return this.items.size() == 0;
    }
    
    // Return the size of the stack
    public int size() {
        return this.items.size();
    }
    
    // Clear the stack
    public void clear() {
        this.items.clear();
    }
    
    // Print the stack
    public void print() {
        System.out.println(this.items.toString());
    }
    
    // Example usage:
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println(stack.peek()); // Output: 30
        System.out.println(stack.pop());  // Output: 30
        System.out.println(stack.size()); // Output: 2
    }
}
    `,
      cpp: `
#include <iostream>
#include <vector>
#include <string>

template <typename T>
class Stack {
private:
    std::vector<T> items;
    
public:
    // Add element to the top of the stack
    T push(T element) {
        items.push_back(element);
        return element;
    }
    
    // Remove and return the top element
    T pop() {
        if (isEmpty()) {
            throw std::runtime_error("Underflow - Stack is empty");
        }
        T top = items.back();
        items.pop_back();
        return top;
    }
    
    // Return the top element without removing it
    T peek() {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        return items.back();
    }
    
    // Check if stack is empty
    bool isEmpty() {
        return items.empty();
    }
    
    // Return the size of the stack
    size_t size() {
        return items.size();
    }
    
    // Clear the stack
    void clear() {
        items.clear();
    }
    
    // Print the stack
    void print() {
        std::cout << "[ ";
        for (const T& item : items) {
            std::cout << item << " ";
        }
        std::cout << "]" << std::endl;
    }
};

// Example usage:
int main() {
    Stack<int> stack;
    stack.push(10);
    stack.push(20);
    stack.push(30);
    std::cout << stack.peek() << std::endl; // Output: 30
    std::cout << stack.pop() << std::endl;  // Output: 30
    std::cout << stack.size() << std::endl; // Output: 2
    return 0;
}
    `,
      c: `
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 100

typedef struct {
    int items[MAX_SIZE];
    int top;
} Stack;

// Initialize stack
void initialize(Stack* stack) {
    stack->top = -1;
}

// Check if stack is full
bool isFull(Stack* stack) {
    return stack->top == MAX_SIZE - 1;
}

// Check if stack is empty
bool isEmpty(Stack* stack) {
    return stack->top == -1;
}

// Add element to the top of the stack
int push(Stack* stack, int element) {
    if (isFull(stack)) {
        printf("Overflow - Stack is full\\n");
        return -1;
    }
    stack->items[++stack->top] = element;
    return element;
}

// Remove and return the top element
int pop(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Underflow - Stack is empty\\n");
        return -1;
    }
    return stack->items[stack->top--];
}

// Return the top element without removing it
int peek(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty\\n");
        return -1;
    }
    return stack->items[stack->top];
}

// Return the size of the stack
int size(Stack* stack) {
    return stack->top + 1;
}

// Clear the stack
void clear(Stack* stack) {
    stack->top = -1;
}

// Print the stack
void printStack(Stack* stack) {
    if (isEmpty(stack)) {
        printf("[]\\n");
        return;
    }
    
    printf("[");
    for (int i = 0; i <= stack->top; i++) {
        printf("%d", stack->items[i]);
        if (i < stack->top) {
            printf(", ");
        }
    }
    printf("]\\n");
}

// Example usage:
int main() {
    Stack stack;
    initialize(&stack);
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    
    printf("Top element: %d\\n", peek(&stack)); // Output: 30
    printf("Popped element: %d\\n", pop(&stack)); // Output: 30
    printf("Stack size: %d\\n", size(&stack)); // Output: 2
    
    printStack(&stack);
    
    return 0;
}
    `,
      csharp: `
using System;
using System.Collections.Generic;

public class Stack<T>
{
    private List<T> items;
    
    public Stack()
    {
        items = new List<T>();
    }
    
    // Add element to the top of the stack
    public T Push(T element)
    {
        items.Add(element);
        return element;
    }
    
    // Remove and return the top element
    public T Pop()
    {
        if (IsEmpty())
        {
            throw new InvalidOperationException("Underflow - Stack is empty");
        }
        
        T top = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return top;
    }
    
    // Return the top element without removing it
    public T Peek()
    {
        if (IsEmpty())
        {
            throw new InvalidOperationException("Stack is empty");
        }
        
        return items[items.Count - 1];
    }
    
    // Check if stack is empty
    public bool IsEmpty()
    {
        return items.Count == 0;
    }
    
    // Return the size of the stack
    public int Size()
    {
        return items.Count;
    }
    
    // Clear the stack
    public void Clear()
    {
        items.Clear();
    }
    
    // Print the stack
    public void Print()
    {
        Console.WriteLine(string.Join(", ", items));
    }
    
    // Example usage
    public static void Main(string[] args)
    {
        Stack<int> stack = new Stack<int>();
        stack.Push(10);
        stack.Push(20);
        stack.Push(30);
        
        Console.WriteLine(stack.Peek()); // Output: 30
        Console.WriteLine(stack.Pop());  // Output: 30
        Console.WriteLine(stack.Size()); // Output: 2
    }
}
    `
    },
    difficulty: "Easy",
    test: {
      questions: [
        {
          question: "What principle does a Stack follow?",
          options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "LILO (Last In Last Out)", "FILO (First In Last Out)"],
          answer: 1
        },
        {
          question: "Which of the following is NOT a standard operation of a Stack?",
          options: ["Push", "Pop", "Peek", "Insert at Middle"],
          answer: 3
        },
        {
          question: "What is the time complexity of Push operation in a Stack?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
          answer: 0
        }
      ]
    }
  },
  "linked-list": {
    id: "linked-list",
    title: "Linked List Data Structure",
    aim: "To understand the implementation and working of the Linked List data structure.",
    objective: "Learn how to implement and use a Linked List for solving various programming problems.",
    theory: `A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (or link) to the next node in the sequence.

Unlike arrays, linked lists don't have a fixed size and can grow or shrink dynamically during program execution.

There are several types of linked lists:
- Singly Linked List: Each node points to the next node
- Doubly Linked List: Each node points to both the next and previous nodes
- Circular Linked List: The last node points back to the first node

Key operations in a linked list include:
- Insertion: Adding a new node (at the beginning, end, or middle)
- Deletion: Removing a node
- Traversal: Visiting each node
- Searching: Finding a node with a specific value

Linked lists are useful when:
- You need constant-time insertions/deletions from the list
- You don't know how many items will be in the list
- You don't need random access to elements
- You want to insert items in the middle of the list`,
    implementation: {
      javascript: `
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add element to the end of the list
  append(value) {
    const newNode = new Node(value);
    
    // If list is empty, set the head
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      
      // Traverse to the end of the list
      while (current.next) {
        current = current.next;
      }
      
      // Set the next pointer of the last node to the new node
      current.next = newNode;
    }
    
    this.size++;
    return this;
  }
  
  // Add element to the beginning of the list
  prepend(value) {
    const newNode = new Node(value);
    
    // Set the next pointer of the new node to the current head
    newNode.next = this.head;
    // Update the head to the new node
    this.head = newNode;
    
    this.size++;
    return this;
  }
  
  // Insert at specific position
  insertAt(value, index) {
    // Check if index is valid
    if (index < 0 || index > this.size) {
      return false;
    }
    
    // If index is 0, prepend
    if (index === 0) {
      return this.prepend(value);
    }
    
    const newNode = new Node(value);
    let current = this.head;
    let previous = null;
    let count = 0;
    
    // Traverse to the desired position
    while (count < index) {
      previous = current;
      current = current.next;
      count++;
    }
    
    // Insert the new node
    newNode.next = current;
    previous.next = newNode;
    
    this.size++;
    return true;
  }
  
  // Remove element at specific index
  removeAt(index) {
    // Check if index is valid
    if (index < 0 || index >= this.size) {
      return null;
    }
    
    let current = this.head;
    let previous = null;
    let count = 0;
    
    // If removing the head
    if (index === 0) {
      this.head = current.next;
    } else {
      // Traverse to the desired position
      while (count < index) {
        previous = current;
        current = current.next;
        count++;
      }
      
      // Remove the node
      previous.next = current.next;
    }
    
    this.size--;
    return current.value;
  }
  
  // Search for a value
  search(value) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    
    return -1;
  }
  
  // Get the size of the list
  getSize() {
    return this.size;
  }
  
  // Check if list is empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Print the list
  print() {
    let current = this.head;
    let result = '';
    
    while (current) {
      result += current.value + (current.next ? ' -> ' : '');
      current = current.next;
    }
    
    console.log(result || 'Empty List');
    return result;
  }
}

// Example usage:
const list = new LinkedList();
list.append(10);
list.append(20);
list.prepend(5);
list.insertAt(15, 2);
console.log(list.print()); // Output: 5 -> 10 -> 15 -> 20
console.log(list.search(15)); // Output: 2
list.removeAt(2);
console.log(list.print()); // Output: 5 -> 10 -> 20
    `,
      python: `
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    # Add element to the end of the list
    def append(self, value):
        new_node = Node(value)
        
        # If list is empty, set the head
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            
            # Traverse to the end of the list
            while current.next:
                current = current.next
            
            # Set the next pointer of the last node to the new node
            current.next = new_node
        
        self.size += 1
        return self
    
    # Add element to the beginning of the list
    def prepend(self, value):
        new_node = Node(value)
        
        # Set the next pointer of the new node to the current head
        new_node.next = self.head
        # Update the head to the new node
        self.head = new_node
        
        self.size += 1
        return self
    
    # Insert at specific position
    def insert_at(self, value, index):
        # Check if index is valid
        if index < 0 or index > self.size:
            return False
        
        # If index is 0, prepend
        if index == 0:
            return self.prepend(value)
        
        new_node = Node(value)
        current = self.head
        previous = None
        count = 0
        
        # Traverse to the desired position
        while count < index:
            previous = current
            current = current.next
            count += 1
        
        # Insert the new node
        new_node.next = current
        previous.next = new_node
        
        self.size += 1
        return True
    
    # Remove element at specific index
    def remove_at(self, index):
        # Check if index is valid
        if index < 0 or index >= self.size:
            return None
        
        current = self.head
        previous = None
        count = 0
        
        # If removing the head
        if index == 0:
            self.head = current.next
        else:
            # Traverse to the desired position
            while count < index:
                previous = current
                current = current.next
                count += 1
            
            # Remove the node
            previous.next = current.next
        
        self.size -= 1
        return current.value
    
    # Search for a value
    def search(self, value):
        current = self.head
        index = 0
        
        while current:
            if current.value == value:
                return index
            current = current.next
            index += 1
        
        return -1
    
    # Get the size of the list
    def get_size(self):
        return self.size
    
    # Check if list is empty
    def is_empty(self):
        return self.size == 0
    
    # Print the list
    def print_list(self):
        current = self.head
        result = ''
        
        while current:
            result += str(current.value) + (' -> ' if current.next else '')
            current = current.next
        
        print(result or 'Empty List')
        return result

# Example usage:
linked_list = LinkedList()
linked_list.append(10)
linked_list.append(20)
linked_list.prepend(5)
linked_list.insert_at(15, 2)
linked_list.print_list()  # Output: 5 -> 10 -> 15 -> 20
print(linked_list.search(15))  # Output: 2
linked_list.remove_at(2)
linked_list.print_list()  # Output: 5 -> 10 -> 20
    `,
      java: `
public class LinkedList {
    private Node head;
    private int size;
    
    private class Node {
        private int value;
        private Node next;
        
        public Node(int value) {
            this.value = value;
            this.next = null;
        }
    }
    
    public LinkedList() {
        this.head = null;
        this.size = 0;
    }
    
    // Add element to the end of the list
    public LinkedList append(int value) {
        Node newNode = new Node(value);
        
        // If list is empty, set the head
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            
            // Traverse to the end of the list
            while (current.next != null) {
                current = current.next;
            }
            
            // Set the next pointer of the last node to the new node
            current.next = newNode;
        }
        
        size++;
        return this;
    }
    
    // Add element to the beginning of the list
    public LinkedList prepend(int value) {
        Node newNode = new Node(value);
        
        // Set the next pointer of the new node to the current head
        newNode.next = head;
        // Update the head to the new node
        head = newNode;
        
        size++;
        return this;
    }
    
    // Insert at specific position
    public boolean insertAt(int value, int index) {
        // Check if index is valid
        if (index < 0 || index > size) {
            return false;
        }
        
        // If index is 0, prepend
        if (index == 0) {
            prepend(value);
            return true;
        }
        
        Node newNode = new Node(value);
        Node current = head;
        Node previous = null;
        int count = 0;
        
        // Traverse to the desired position
        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        }
        
        // Insert the new node
        newNode.next = current;
        previous.next = newNode;
        
        size++;
        return true;
    }
    
    // Remove element at specific index
    public Integer removeAt(int index) {
        // Check if index is valid
        if (index < 0 || index >= size) {
            return null;
        }
        
        Node current = head;
        Node previous = null;
        int count = 0;
        
        // If removing the head
        if (index == 0) {
            head = current.next;
        } else {
            // Traverse to the desired position
            while (count < index) {
                previous = current;
                current = current.next;
                count++;
            }
            
            // Remove the node
            previous.next = current.next;
        }
        
        size--;
        return current.value;
    }
    
    // Search for a value
    public int search(int value) {
        Node current = head;
        int index = 0;
        
        while (current != null) {
            if (current.value == value) {
                return index;
            }
            current = current.next;
            index++;
        }
        
        return -1;
    }
    
    // Get the size of the list
    public int getSize() {
        return size;
    }
    
    // Check if list is empty
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Print the list
    public String print() {
        Node current = head;
        StringBuilder result = new StringBuilder();
        
        while (current != null) {
            result.append(current.value);
            if (current.next != null) {
                result.append(" -> ");
            }
            current = current.next;
        }
        
        String output = result.toString();
        System.out.println(output.isEmpty() ? "Empty List" : output);
        return output;
    }
    
    // Example usage
    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.append(10);
        list.append(20);
        list.prepend(5);
        list.insertAt(15, 2);
        list.print(); // Output: 5 -> 10 -> 15 -> 20
        System.out.println(list.search(15)); // Output: 2
        list.removeAt(2);
        list.print(); // Output: 5 -> 10 -> 20
    }
}
    `,
      cpp: `
#include <iostream>
#include <string>

class LinkedList {
private:
    struct Node {
        int value;
        Node* next;
        
        Node(int val) : value(val), next(nullptr) {}
    };
    
    Node* head;
    int size;
    
public:
    LinkedList() : head(nullptr), size(0) {}
    
    // Destructor to free memory
    ~LinkedList() {
        Node* current = head;
        while (current != nullptr) {
            Node* next = current->next;
            delete current;
            current = next;
        }
    }
    
    // Add element to the end of the list
    LinkedList* append(int value) {
        Node* newNode = new Node(value);
        
        // If list is empty, set the head
        if (head == nullptr) {
            head = newNode;
        } else {
            Node* current = head;
            
            // Traverse to the end of the list
            while (current->next != nullptr) {
                current = current->next;
            }
            
            // Set the next pointer of the last node to the new node
            current->next = newNode;
        }
        
        size++;
        return this;
    }
    
    // Add element to the beginning of the list
    LinkedList* prepend(int value) {
        Node* newNode = new Node(value);
        
        // Set the next pointer of the new node to the current head
        newNode->next = head;
        // Update the head to the new node
        head = newNode;
        
        size++;
        return this;
    }
    
    // Insert at specific position
    bool insertAt(int value, int index) {
        // Check if index is valid
        if (index < 0 || index > size) {
            return false;
        }
        
        // If index is 0, prepend
        if (index == 0) {
            prepend(value);
            return true;
        }
        
        Node* newNode = new Node(value);
        Node* current = head;
        Node* previous = nullptr;
        int count = 0;
        
        // Traverse to the desired position
        while (count < index) {
            previous = current;
            current = current->next;
            count++;
        }
        
        // Insert the new node
        newNode->next = current;
        previous->next = newNode;
        
        size++;
        return true;
    }
    
    // Remove element at specific index
    int* removeAt(int index) {
        // Check if index is valid
        if (index < 0 || index >= size) {
            return nullptr;
        }
        
        Node* current = head;
        Node* previous = nullptr;
        int count = 0;
        
        // If removing the head
        if (index == 0) {
            head = current->next;
        } else {
            // Traverse to the desired position
            while (count < index) {
                previous = current;
                current = current->next;
                count++;
            }
            
            // Remove the node
            previous->next = current->next;
        }
        
        int value = current->value;
        delete current;
        size--;
        
        int* result = new int(value);
        return result;
    }
    
    // Search for a value
    int search(int value) {
        Node* current = head;
        int index = 0;
        
        while (current != nullptr) {
            if (current->value == value) {
                return index;
            }
            current = current->next;
            index++;
        }
        
        return -1;
    }
    
    // Get the size of the list
    int getSize() {
        return size;
    }
    
    // Check if list is empty
    bool isEmpty() {
        return size == 0;
    }
    
    // Print the list
    std::string print() {
        Node* current = head;
        std::string result = "";
        
        while (current != nullptr) {
            result += std::to_string(current->value);
            if (current->next != nullptr) {
                result += " -> ";
            }
            current = current->next;
        }
        
        if (result.empty()) {
            std::cout << "Empty List" << std::endl;
        } else {
            std::cout << result << std::endl;
        }
        
        return result;
    }
};

// Example usage:
int main() {
    LinkedList list;
    list.append(10);
    list.append(20);
    list.prepend(5);
    list.insertAt(15, 2);
    list.print(); // Output: 5 -> 10 -> 15 -> 20
    std::cout << list.search(15) << std::endl; // Output: 2
    list.removeAt(2);
    list.print(); // Output: 5 -> 10 -> 20
    return 0;
}
    `,
      c: `
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 100

typedef struct {
    int items[MAX_SIZE];
    int top;
} Stack;

// Initialize stack
void initialize(Stack* stack) {
    stack->top = -1;
}

// Check if stack is full
bool isFull(Stack* stack) {
    return stack->top == MAX_SIZE - 1;
}

// Check if stack is empty
bool isEmpty(Stack* stack) {
    return stack->top == -1;
}

// Add element to the top of the stack
int push(Stack* stack, int element) {
    if (isFull(stack)) {
        printf("Overflow - Stack is full\\n");
        return -1;
    }
    stack->items[++stack->top] = element;
    return element;
}

// Remove and return the top element
int pop(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Underflow - Stack is empty\\n");
        return -1;
    }
    return stack->items[stack->top--];
}

// Return the top element without removing it
int peek(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty\\n");
        return -1;
    }
    return stack->items[stack->top];
}

// Return the size of the stack
int size(Stack* stack) {
    return stack->top + 1;
}

// Clear the stack
void clear(Stack* stack) {
    stack->top = -1;
}

// Print the stack
void printStack(Stack* stack) {
    if (isEmpty(stack)) {
        printf("[]\\n");
        return;
    }
    
    printf("[");
    for (int i = 0; i <= stack->top; i++) {
        printf("%d", stack->items[i]);
        if (i < stack->top) {
            printf(", ");
        }
    }
    printf("]\\n");
}

// Example usage:
int main() {
    Stack stack;
    initialize(&stack);
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    
    printf("Top element: %d\\n", peek(&stack)); // Output: 30
    printf("Popped element: %d\\n", pop(&stack)); // Output: 30
    printf("Stack size: %d\\n", size(&stack)); // Output: 2
    
    printStack(&stack);
    
    return 0;
}
    `,
      csharp: `
using System;
using System.Collections.Generic;

public class Stack<T>
{
    private List<T> items;
    
    public Stack()
    {
        items = new List<T>();
    }
    
    // Add element to the top of the stack
    public T Push(T element)
    {
        items.Add(element);
        return element;
    }
    
    // Remove and return the top element
    public T Pop()
    {
        if (IsEmpty())
        {
            throw new InvalidOperationException("Underflow - Stack is empty");
        }
        
        T top = items[items.Count - 1];
        items.RemoveAt(items.Count - 1);
        return top;
    }
    
    // Return the top element without removing it
    public T Peek()
    {
        if (IsEmpty())
        {
            throw new InvalidOperationException("Stack is empty");
        }
        
        return items[items.Count - 1];
    }
    
    // Check if stack is empty
    public bool IsEmpty()
    {
        return items.Count == 0;
    }
    
    // Return the size of the stack
    public int Size()
    {
        return items.Count;
    }
    
    // Clear the stack
    public void Clear()
    {
        items.Clear();
    }
    
    // Print the stack
    public void Print()
    {
        Console.WriteLine(string.Join(", ", items));
    }
    
    // Example usage
    public static void Main(string[] args)
    {
        Stack<int> stack = new Stack<int>();
        stack.Push(10);
        stack.Push(20);
        stack.Push(30);
        
        Console.WriteLine(stack.Peek()); // Output: 30
        Console.WriteLine(stack.Pop());  // Output: 30
        Console.WriteLine(stack.Size()); // Output: 2
    }
}
    `
    },
    difficulty: "Easy",
    test: {
      questions: [
        {
          question: "What principle does a Stack follow?",
          options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "LILO (Last In Last Out)", "FILO (First In Last Out)"],
          answer: 1
        },
        {
          question: "Which of the following is NOT a standard operation of a Stack?",
          options: ["Push", "Pop", "Peek", "Insert at Middle"],
          answer: 3
        },
        {
          question: "What is the time complexity of Push operation in a Stack?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
          answer: 0
        }
      ]
    }
  },
  "greedy-best-first": {
    id: "greedy-best-first",
    title: "Greedy Best First Search Algorithm",
    aim: "To understand the implementation and working of the Greedy Best First Search algorithm.",
    objective: "Learn how Greedy Best First Search works to efficiently find a path to a goal by prioritizing nodes that seem closest to the goal.",
    theory: `Greedy Best First Search is an informed search algorithm that uses a heuristic function to estimate the distance from a node to the goal. Unlike other search algorithms like Breadth-First Search or Depth-First Search, it leverages this heuristic to make decisions about which nodes to explore next.

Key concepts of Greedy Best First Search:

1. Heuristic Function: A function that estimates the distance from a node to the goal. The algorithm uses this to prioritize nodes that appear to be closer to the goal.

2. Frontier: A priority queue that stores nodes to be explored, ordered by their heuristic values (lowest first).

3. Visited Set: Tracks nodes that have already been explored to avoid cycles.

Greedy Best First Search works as follows:
- Start with the initial node in the frontier
- While the frontier is not empty:
  - Remove the node with the lowest heuristic value from the frontier
  - If this node is the goal, return the path
  - Mark the node as visited
  - For each unvisited neighbor of the current node:
    - Add it to the frontier with its heuristic value

Advantages:
- More efficient than uninformed search algorithms like BFS or DFS when a good heuristic is available
- Can find a path to the goal more quickly than other algorithms

Limitations:
- Not guaranteed to find the shortest path (unlike A* search)
- Can get stuck in local minima if the heuristic is misleading
- Performance depends heavily on the quality of the heuristic function

Greedy Best First Search is used in various applications including:
- Path finding in games and navigation systems
- Puzzle solving
- Network routing algorithms`,
    implementation: {
      javascript: `
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift().item;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  contains(item) {
    return this.items.some(element => element.item === item);
  }
}

function greedyBestFirstSearch(graph, start, goal, heuristic) {
  // Initialize frontier with start node
  const frontier = new PriorityQueue();
  frontier.enqueue(start, heuristic[start]);
  
  // Initialize empty set for visited nodes
  const visited = new Set();
  
  // Map to track parent nodes for path reconstruction
  const parentMap = {};
  
  while (!frontier.isEmpty()) {
    // Get node with lowest heuristic value
    const current = frontier.dequeue();
    
    // Check if we've reached goal
    if (current === goal) {
      return reconstructPath(parentMap, start, goal);
    }
    
    // Mark as visited
    visited.add(current);
    
    // Explore all neighbors
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor) && !frontier.contains(neighbor)) {
        parentMap[neighbor] = current;
        frontier.enqueue(neighbor, heuristic[neighbor]);
      }
    }
  }
  
  // No path found
  return "No path found";
}

function reconstructPath(parentMap, start, goal) {
  const path = [goal];
  let current = goal;
  
  while (current !== start) {
    current = parentMap[current];
    path.unshift(current);
  }
  
  return path;
}

// Example usage:
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'H'],
  'F': ['C', 'G'],
  'G': ['F'],
  'H': ['E', 'I'],
  'I': ['H']
};

const heuristic = {
  'A': 8,
  'B': 4,
  'C': 3,
  'D': 5,
  'E': 2,
  'F': 1,
  'G': 6,
  'H': 3,
  'I': 0 // Goal node has heuristic of 0
};

const path = greedyBestFirstSearch(graph, 'A', 'I', heuristic);
console.log("Path:", path.join(" → ")); // Output: Path: A → B → E → H → I
      `,
      python: `
import heapq

def greedy_best_first_search(graph, start, goal, heuristic):
    # Initialize frontier with start node
    frontier = [(heuristic[start], start)]
    heapq.heapify(frontier)
    
    # Initialize empty set for visited nodes
    visited = set()
    
    # Map to track parent nodes for path reconstruction
    parent_map = {}
    
    while frontier:
        # Get node with lowest heuristic value
        _, current = heapq.heappop(frontier)
        
        # Check if we've reached goal
        if current == goal:
            return reconstruct_path(parent_map, start, goal)
        
        # Mark as visited
        visited.add(current)
        
        # Explore all neighbors
        for neighbor in graph[current]:
            if neighbor not in visited and neighbor not in [node for _, node in frontier]:
                parent_map[neighbor] = current
                heapq.heappush(frontier, (heuristic[neighbor], neighbor))
    
    # No path found
    return "No path found"

def reconstruct_path(parent_map, start, goal):
    path = [goal]
    current = goal
    
    while current != start:
        current = parent_map[current]
        path.insert(0, current)
    
    path.insert(0, start)
    return path

# Example usage:
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'H'],
    'F': ['C', 'G'],
    'G': ['F'],
    'H': ['E', 'I'],
    'I': ['H']
}

heuristic = {
    'A': 8,
    'B': 4,
    'C': 3,
    'D': 5,
    'E': 2,
    'F': 1,
    'G': 6,
    'H': 3,
    'I': 0  # Goal node has heuristic of 0
}

path = greedy_best_first_search(graph, 'A', 'I', heuristic)
print("Path:", " → ".join(path))  # Output: Path: A → B → E → H → I
      `,
      java: `
import java.util.*;

public class GreedyBestFirstSearch {
    
    static class Node implements Comparable<Node> {
        String id;
        int heuristic;
        
        public Node(String id, int heuristic) {
            this.id = id;
            this.heuristic = heuristic;
        }
        
        @Override
        public int compareTo(Node other) {
            return this.heuristic - other.heuristic;
        }
        
        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Node node = (Node) obj;
            return id.equals(node.id);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(id);
        }
    }
    
    public static List<String> greedyBestFirstSearch(
            Map<String, List<String>> graph, 
            String start, 
            String goal, 
            Map<String, Integer> heuristic) {
        
        // Initialize frontier with start node
        PriorityQueue<Node> frontier = new PriorityQueue<>();
        frontier.add(new Node(start, heuristic.get(start)));
        
        // Initialize empty set for visited nodes
        Set<String> visited = new HashSet<>();
        
        // Map to track parent nodes for path reconstruction
        Map<String, String> parentMap = new HashMap<>();
        
        while (!frontier.isEmpty()) {
            // Get node with lowest heuristic value
            Node current = frontier.poll();
            
            // Check if we've reached goal
            if (current.id.equals(goal)) {
                return reconstructPath(parentMap, start, goal);
            }
            
            // Mark as visited
            visited.add(current.id);
            
            // Explore all neighbors
            for (String neighbor : graph.get(current.id)) {
                if (!visited.contains(neighbor) && 
                        !containsNode(frontier, neighbor)) {
                    parentMap.put(neighbor, current.id);
                    frontier.add(new Node(neighbor, heuristic.get(neighbor)));
                }
            }
        }
        
        // No path found
        return Collections.emptyList();
    }
    
    private static boolean containsNode(PriorityQueue<Node> frontier, String id) {
        for (Node node : frontier) {
            if (node.id.equals(id)) {
                return true;
            }
        }
        return false;
    }
    
    private static List<String> reconstructPath(
            Map<String, String> parentMap, String start, String goal) {
        List<String> path = new ArrayList<>();
        String current = goal;
        
        while (!current.equals(start)) {
            path.add(0, current);
            current = parentMap.get(current);
        }
        
        path.add(0, start);
        return path;
    }
    
    public static void main(String[] args) {
        // Example graph
        Map<String, List<String>> graph = new HashMap<>();
        graph.put("A", Arrays.asList("B", "C"));
        graph.put("B", Arrays.asList("A", "D", "E"));
        graph.put("C", Arrays.asList("A", "F"));
        graph.put("D", Arrays.asList("B"));
        graph.put("E", Arrays.asList("B", "H"));
        graph.put("F", Arrays.asList("C", "G"));
        graph.put("G", Arrays.asList("F"));
        graph.put("H", Arrays.asList("E", "I"));
        graph.put("I", Arrays.asList("H"));
        
        // Heuristic values
        Map<String, Integer> heuristic = new HashMap<>();
        heuristic.put("A", 8);
        heuristic.put("B", 4);
        heuristic.put("C", 3);
        heuristic.put("D", 5);
        heuristic.put("E", 2);
        heuristic.put("F", 1);
        heuristic.put("G", 6);
        heuristic.put("H", 3);
        heuristic.put("I", 0); // Goal node has heuristic of 0
        
        List<String> path = greedyBestFirstSearch(graph, "A", "I", heuristic);
        System.out.println("Path: " + String.join(" → ", path)); // Output: Path: A → B → E → H → I
    }
}
      `
    },
    difficulty: "Medium",
    test: {
      questions: [
        {
          question: "What does Greedy Best First Search use to prioritize nodes for exploration?",
          options: [
            "The depth of the node",
            "A heuristic function that estimates distance to the goal",
            "The breadth of the node",
            "Random selection"
          ],
          answer: 1
        },
        {
          question: "What is a limitation of Greedy Best First Search?",
          options: [
            "It cannot find a path to the goal",
            "It always expands all nodes in the graph",
            "It is not guaranteed to find the shortest path",
            "It doesn't use heuristics"
          ],
          answer: 2
        },
        {
          question: "How does Greedy Best First Search differ from A* search?",
          options: [
            "Greedy search doesn't use a heuristic",
            "Greedy search only considers the estimated distance to the goal, not the path cost so far",
            "Greedy search always finds the optimal path",
            "Greedy search expands all nodes in breadth-first order"
          ],
          answer: 1
        }
      ]
    }
  }
};
