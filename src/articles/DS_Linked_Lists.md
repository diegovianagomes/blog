---
title: "Linked Lists"
date: "2024-09-26"
tags: ["DS", "Linked lists", "data structures", "algorithms"]
---

### 1 - linked lists

A linked list is a type of data structure in which the elements are not stored in a contiguous location, but are linked together using pointers.

It forms a series of connected nodes, each of which stores data and the address of the next node.

![[Pasted image 20240927170514.png]]

A linked list typically consists of two components

- Data: which holds the current value or data associated with the node.
- Next pointer or Reference: which stores the memory address of the next node in the sequence.

They have *head* and *tail*, they are accessed by the *head*, which points to the first node in the list.

The last node in the list points to a *Null* or *nullptr* element, indicating the end of the list, this node is known as a *tail node*.

The reason why linked lists are preferable to arrays is because they are easier to insert and delete.

#### 1.1 Simple Chained List

In a single linked list, each node has a reference to the next node in the sequence. Passing is done in a direct direction.

Let's use everyday tasks as examples:

![[Pasted image 20240927172111.png]]
Each node represents a task for the day and the arrows on the nodes represent the order of the tasks.
The start of the day is *head* which points to the first task of the day and the end of the day is *null*.
With practical applications in mind, there is flexibility because it is easy to add and remove tasks at any point in the day, yet the tasks follow a natural order, reflecting the structure of the linked list.
![[Pasted image 20240927172751.png]]
Without thinking about insertions or additions, we can implement our DailyRoutine as follows:

We need to create a class for the Tasks node, which will have the task of the day the pointer to the next task:

```python
class Task:
 def __init__(self, name):
 self.name = name
 self.next = None
```

Now let's create our Daily Routine class where we'll manage the sequence of tasks.

```python
class RotinaDisaria:
 def __init__(self):
 self.inicio = None
```

Within this class we will define two functions and the first is the creation of tasks and the connection between them, note that in the connection we have the name of the task and the pointer *<nameTask.pointer>*:

```python
 def createTask(self):
        # Creates the tasks
 start_of_day = Task("Start of day")
 wake up = Task("Wake up")
 drink_coffee = Task("Drink coffee")
 meeting = Task("Meeting")
 lunch = Task("Lunch")

        # Connect the tasks
 self.start = start_of_day
 start_of_day.next = wake up
 wake up.next = drink_coffee
 drink_coffee.next = meeting
 meeting.next = lunch
```

The second definition to be made will be the action of showing the tasks

```python
def showTask(self):
 current_task = self.start
 while current_task:
 print(current_task.name)
 if current_task.next:
 print("|")
 current_task = current_task.next
```

Which can be implemented with the commands below:

```python
routine = DailyRoutine()
routine.createTask()
routine.showTask()
```

As I said about flexibility, we can implement the action of adding a task. I won't worry about its position, we'll just add it

```python
 def add_task(self, task_name):
 new_task = Task(task_name)
 if self.start is None:
 self.start = new_task
 else:
 current_task = self.start
 while current_task.next:
 current_task = current_task.next
 current_task.next = new_task

print("\n>>Adding new task 'Exercise'")
routine.add_task("Exercise")
print("\n")
routine.show_routine()
```
