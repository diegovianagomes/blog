---
title: "Basic Data Structures - Part 2"
date: "2024-09-28"
tags: ["DS", "data structures", "algorithms"]
---

### 1.2 - Dynamic Data Structure

In this type of data structure, the dimension is not fixed and can be updated during operation time, taking into account memory efficiency and code complexity.

#### 1.2.1 Queues

In a queue, the first one in is the first one out, implementing the *first-in, first-or* or *FIFO* policy.
The insertion operation of a queue is *Enqueue* or *Enfiler* and the deletion operation is *Dequeue* or *Defiler*, as in the *POP* operation *Dequeue* does not take any arguments from the element.

The queue's *FIFO* policy makes it operate on a production line. The queue has *head* and *tail*, and when an element is queued it takes the position of *tail* and when we dequeue it is the first element in the *head* that leaves the queue.
![[Pasted image 20240927101932.png]]
The example above is a circular queue with a fixed, circular size, meaning that when we reach the end of the array, we return to the beginning if there is space available The implementation uses an array $Q\left[1...15\right]$. The elements of the row appear only in the
lightly shaded positions. The first row has 5 elements, located at $Q\left[10...14\right]$. The second row below is the new configuration
after the ENQUEUE $Q\left(17\right)$, ENQUEUE $Q\left(3\right)$ and ENQUEUE $Q\left(5\right)$ calls. The third and final one is the configuration of the queue after the call DEQUEUE.$Q\left(15\right)$ which was previously the head of the queue and the new head has the key 6.

For this "Queue" class we will first define that it is an array, its maximum size, the indexes of *head* and *tail* and the current size of the queue.

```python
def __init__(self, capacity):
 self.capacity = capacity
 self.queue = [None] * capacity
 self.head = 0
 self.tail = 0
 self.size = 0
```

Next, let's define that our queue is empty

```python
def empty(self):
 return self.size == 0
```

And another definition that it will be full.

```python
def full(self):
 return self.size == self.capacity
```

Next we will define the main operations of our queue and first we will do the *Enqueue* which will insert the element in the *tail* position and increment it by one element, increasing the queue.

```python
def enqueue(self, element):
 if self.full():
 print("Error: Queue is full")
 else:
 self.queue[self.tail] = element
 self.tail = (self.tail + 1) % self.capacity
 self.size += 1
 print(f"Element {element} added to queue.")
```

To define the *Dequeue* function we need to get the element from the *head* position and remove it, then pass the position to the next element and shrink the queue.

```python
def dequeue(self):
 if self.empty():
 print("Error: Queue is empty")
 else:
 element = self.queue[self.head]
 self.queue[self.head] = None
 self.head = (self.head + 1) % self.capacity
 self.size -= 1
 print(f"Element {element} removed from queue.")
 return element
```

The next step will be to define a function to show the actions being performed

```python
def show(self):
 if self.empty():
 print("Empty queue")
 else:
 print("Current queue:")
 i = self.head
 for _ in range(self.size):
 print(self.queue[i], end=" ")
 i = (i + 1) % self.capacity
 print()
```

To finish, let's implement our queue with an array $Q\left[1...15\right]$

```python
queue = Queue(15)
```

The *Enqueue* will be done by adding the desired number

```python
queue.enqueue("Desired number")
```

Now let's move on to the indices so that we can start adding new elements:

```python
queue.tail = 14
queue.head = 10
```

And we can ask to show our queue:

```python
queue.show()
```

Nesse ponto com *tail e head* definidos nosso *Dequeue* pode seguir a politica *"first in, first-out"*.

```python
fila.dequeue()
fila.mostrar()
```

#### 1.2.2 Stacks

In a stack, the last one in (*Push*) is the first one out (*Pop*), implementing the *last-in, first-out* or *LIFO* policy.

The insertion operation on the stack is commonly known as *PUSH* and the deletion operation as *POP*, alluding to physical stacks such as the stack of plates, where the order in which a plate is removed (*POP*) from the stack is inverse to the order in which it was placed (*PUSH*) on the stack, because only the top one is accessible.
![[Pasted image 20240927095910.png]]
In the example we have the implementation of an array of an "S" Stack with 4 initial elements $S\left[1...\text{S.top} \right]$. When $S.top=0$ our stack is empty. The top element is 9, then two "Push" calls are made, (S,17) and (S,3), giving the stack 6 elements and finally a "POP" call is made, removing (S,3) and leaving (S.17) as the last element of the stack.

To implement a "Stack" class for this array in python we first define the array to store the elements, the maximum size of the stack and indicate the top of the stack, the "-1" indicates that the stack is empty.

```python
def __init__(self, capacity):
 self.capacity = capacity
 self.stack = [None] * capacity
 self.top = -1
```

Next we define the empty array:

```python
def empty(self):
 return self.top == -1
```

Also, let's define when our stack will be full.

```python
def full(self):
 return self.top == self.capacity - 1
```

Once this is done, let's define the main functions, for the Push function, we'll work with incrementing at the top and inserting the element at the top of the stack;

```python
def push(self, element):
 if self.full():
 print("Error: The stack is full")
 else:
 self.top += 1
 self.stack[self.top] = element

            print(f"Element {element} added to top {self.top}")
```

In the POP function we take the element from the top, remove an element and decrement the top.

```python
def pop(self):
 if self.empty():
 print("Error: The stack is empty")
 else:
 element = self.stack[self.top]
 self.stack[self.top] = None
 self.top -= 1

        print(f"Element {element} removed from top {self.top + 1}")

        return element
```

We have also defined a function to show our actions and display them.

```Python
def show(self):
 if self.empty():
 print("Stack empty")
 else:
 print("Current stack state:")
 for i in range(self.top + 1):
 print(f"Position {i + 1}: {self.stack[i]}")
```

The next step will be the implementation in our example where we have an Array S={15,6,2,9} with a capacity of 7 positions.

```python
capacity = 7
stack = Stack(capacity)
```

To do the push we just need to add the desired number

```python
stack.push("Number to be added")
stack.show()
```

To do the pop, as we are in a stack and "last-in first-out", we don't need to specify who we are going to delete

```python
stack.pop()
```
