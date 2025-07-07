---
title: Basic Data Structures - Part 1"
date: "2024-09-27"
tags: ["DS", "data structures", "algorithms"]
---

### 1 - Linear Data Structure

Sequence of data organized linearly or sequentially, where each element is added to its previous and next adjacents

#### 1.1 - Static Data Structure

What defines a static structure is that it has a fixed memory size and is easier to access.

##### 1.1.1 - Array

An #Array is a series or list of variables in the memory block that have the same name and the same data type, but are differentiated with special numbers called #subscripts, also called #index. The index is a number that indicates the position of the item.
For example, it can represent an employee ID list or a price list for items for sale
![[Pasted image 20240927075536.png]]It is widely used in various applications, such as:

- Storing data for processing
- Implementation of data structures such as #Filas and #Pilas
- Representing data in tables and arrays
- Creating dynamic data structures such as Chained lists and Trees

##### 1.1.1.1 - Array types

1-dimensional Array
Storing only one row of elements

Multi-dimensional Array
Stores multiple rows of elements.

##### 1.1.1.2 - Operations

Transversal
Visiting each element of an array in a specific order:

- Sequential:
Where each element is traversed in order first to last

```python
def transversal_sequential(array):
 for element in array
 print(element)

arr = [1, 2, 3, 4, 5, 6]
transversal_sequential(arr)
```

- Reverse:
Where each element is traversed in order from last to first

```python
def transversal_reversa(array):
 for element in array[::-1]:
 print(element)
arr = [1, 2, 3, 4, 5, 6]
transversal_reversa(arr)
```

- Insertion:
Adding a new element to the array at a specific index

```python
def insert(array, element, position):
 if position < 0 or position > len(array):
 print("Invalid position")
 else:
 array.insert(position, element)

arr = [1, 2, 3, 4, 5, 6]
insert(arr, 10, 3)
print(arr)
```

- Deletion:
Removing an array element from a specific index

```python
def remove(array, index):
 if index < 0 or index >= len(array):
 print("Invalid index")
 else:
 array.pop(index)

arr = [1, 2, 3, 4, 5, 6]
remove(arr, 2)
print(arr)
```

- Search:
Finding the index of an array element

```python
def search(array, value):
 for i in range(len(array)):
 if array[i] == value:
 return i
 return -1

arr = [1, 2, 3, 4, 5, 6]
indice = search(arr, 4)
if indice != -1:
 print(f"Value found at position {indice}")
else:
 print("Value not found")
```
