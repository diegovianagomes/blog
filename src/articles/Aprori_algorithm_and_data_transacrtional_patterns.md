---
title: Trasactional Data Patterns with the Apriori Algorithm"
date: "2025-07-09"
tags: ["Data mining", "apriori", "algorithms"]
---

Discovering frequent patterns in transactional databases is an essential task in data mining. One of the most traditional and widely used techniques for this purpose is the Apriori algorithm, which identifies sets of items that frequently appear together in transactions. In this article, we explore the application of Apriori on a simple database containing 10 shopping transactions in a supermarket, with a minimum support of 30%.

The database consists of a list of transactions carried out by customers. Each transaction contains a subset of items (A, B, C, etc.). Below is the structure represented as a list of lists:

```python
transactions = [
    ['A', 'B', 'C', 'E', 'F'],
    ['B', 'C'],
    ['A', 'B', 'E', 'F'],
    ['C', 'D'],
    ['D', 'G'],
    ['B', 'C', 'E', 'F'],
    ['C', 'D', 'E'],
    ['B', 'E', 'F'],
    ['B', 'C', 'E', 'F'],
    ['C', 'G']
]
```

We used the TransactionEncoder from the mlxtend library to convert the transactional data into a binary matrix (True/False), suitable for applying the Apriori algorithm:

```python
te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df = pd.DataFrame(te_ary, columns=te.columns_)
df
```

|  id   | A     | B     | C     | D     | E     | F     | G     |
| :---: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: |
| 0   | True  | True  | True  | False | True  | True  | False |
| 1   | False | True  | True  | False | False | False | False |
| 2   | True  | True  | False | False | True  | True  | False |
| 3   | False | False | True  | True  | False | False | False |
| 4   | False | False | False | True  | False | False | True  |
| 5   | False | True  | True  | False | True  | True  | False |
| 6   | False | False | True  | True  | True  | False | False |
| 7   | False | True  | False | False | True  | True  | False |
| 8   | False | True  | True  | False | True  | True  | False |
| 9   | False | False | True  | False | False | False | True  |

The Apriori algorithm is then applied with a minimum support of 0.30 (30%):

$$\text{support}(X) = \frac{|\{t_i \in T \mid X \subseteq t_i\}|}{|T|}$$

$X$: itemset

$T$:  total set of transactions

$t_i$:  individual transaction

```python
apriori(df, min_support = 0.30, use_colnames=True)
```

|  id   | support | itemsets     |
| :---: | :-------: | :------------: |
| 0   | 0.6     | (B)          |
| 1   | 0.7     | (C)          |
| 2   | 0.3     | (D)          |
| 3   | 0.6     | (E)          |
| 4   | 0.5     | (F)          |
| 5   | 0.4     | (C, B)       |
| 6   | 0.5     | (E, B)       |
| 7   | 0.5     | (F, B)       |
| 8   | 0.4     | (C, E)       |
| 9   | 0.3     | (C, F)       |
| 10  | 0.5     | (F, E)       |
| 11  | 0.3     | (C, E, B)    |
| 12  | 0.3     | (C, F, B)    |
| 13  | 0.5     | (F, E, B)    |
| 14  | 0.3     | (C, F, E)    |
| 15  | 0.3     | (C, F, E, B) |

```python
frequent_itemsets[(frequent_itemsets['length'] == 1) &
                  (frequent_itemsets['support'] >= 0.3) ]
```

|  id   | support | itemsets |
| :---: | :-------: | :--------: |
| 0   | 0.6     | (B)      |
| 1   | 0.7     | (C)      |
| 2   | 0.3     | (D)      |
| 3   | 0.6     | (E)      |
| 4   | 0.5     | (F)      |

```python
frequent_itemsets[(frequent_itemsets['length'] == 2) &
                  (frequent_itemsets['support'] >= 0.3) ]
```

|  id   | support | itemsets |
| :---: | :-------: | :--------: |
| 5   | 0.4     | (C, B)   |
| 6   | 0.5     | (E, B)   |
| 7   | 0.5     | (F, B)   |
| 8   | 0.4     | (C, E)   |
| 9   | 0.3     | (C, F)   |
| 10  | 0.5     | (F, E)   |

```python
frequent_itemsets[(frequent_itemsets['length'] == 3) &
                  (frequent_itemsets['support'] >= 0.3) ]
```

| id    | support | itemsets  |
| :---: | :-------: | :---------: |
| 11  | 0.3     | (C, E, B) |
| 12  | 0.3     | (C, F, B) |
| 13  | 0.5     | (F, E, B) |
| 14  | 0.3     | (C, F, E) |

```python
frequent_itemsets[(frequent_itemsets['length'] == 4) &
                  (frequent_itemsets['support'] >= 0.3) ]
```

|  id   | support | itemsets     |
| :---: | :-------: | :------------: |
| 15  | 0.3     | (C, F, E, B) |

We use the association_rules function to extract rules from frequent sets, with lift > 1 as a criterion:

Association Rule Example
One of the rules extracted from the set (C, E, B) → F is:

Rule: ${C, E, B} ⇒ {F}$
Support: $0.3$
Lift: $2.0$

This rule indicates that whenever C, E and B are bought together, F is also bought with 100% confidence, and this association is twice as strong as expected by chance.

Lift measures the importance of the association between antecedent and consequent:

Lift = 1: items are independent;

Lift > 1: positive association (items appear together more than expected);

Lift < 1: negative association.

Thus, rules with lift > 1 indicate a useful correlation for decision-making, such as joint promotions or restructuring shelf layouts.

Equation for measuring the strength of the association between using Confidence:

$$\text{lift}(X \Rightarrow Y) = \frac{\text{confidence}(X \Rightarrow Y)}{\text{support}(Y)}$$

but we don´t have confidence in this problem let's replace with its definition:

$$\text{lift}(X \Rightarrow Y) = \frac{\text{support}(X \cup Y)}{\text{support}(X) \cdot \text{support}(Y)}$$

Based on the frequent sets extracted, we generated association rules with the aim of identifying relevant relationships between items bought together. We used lift > 1 as a quality criterion, which indicates that the presence of the items in the antecedent increases the probability of the items occurring in the consequent, compared to chance.

```python
rules[(rules['support']>= 0.3) &
      (rules['lift'] > 1)]
```

|  consequents   | antecedent support | consequent support | support |   lift   |
| :------------: | :----------------: | :----------------: | :-----: | :------: |
|    (E)->(B)    |        0.6         |        0.6         |   0.5   | 0.833333 |
|    (B)->(E)    |        0.6         |        0.6         |   0.5   | 0.833333 |
|    (F)->(B)    |        0.5         |        0.6         |   0.5   | 1.000000 |
|    (B)->(F)    |        0.6         |        0.5         |   0.5   | 0.833333 |
|    (F)->(E)    |        0.5         |        0.6         |   0.5   | 1.000000 |
|    (E)->(F)    |        0.6         |        0.5         |   0.5   | 0.833333 |
|  (F, E)->(B)   |        0.5         |        0.6         |   0.5   | 1.000000 |
|  (F, B)->(E)   |        0.5         |        0.6         |   0.5   | 1.000000 |
|  (E, B)->(F)   |        0.5         |        0.5         |   0.5   | 1.000000 |
|  (F)->(E, B)   |        0.5         |        0.5         |   0.5   | 1.000000 |
|  (E)->(F, B)   |        0.6         |        0.5         |   0.5   | 0.833333 |
|  (B)->(F, E)   |        0.6         |        0.5         |   0.5   | 0.833333 |
|  (C, F)->(B)   |        0.3         |        0.6         |   0.3   | 1.000000 |
|  (C, F)->(E)   |        0.3         |        0.6         |   0.3   | 1.000000 |
| (C, F, E)->(B) |        0.3         |        0.6         |   0.3   | 1.000000 |
| (C, F, B)->(E) |        0.3         |        0.6         |   0.3   | 1.000000 |
| (C, E, B)->(F) |        0.3         |        0.5         |   0.3   | 1.000000 |
| (C, F)->(E, B) |        0.3         |        0.5         |   0.3   | 1.000000 |

> Rule 1: (E, B) ⇒ (F)
When items E and B are bought together, item F is also bought in 100% of cases. Lift 2.0 indicates that this co-occurrence is twice as likely as it would be by chance, which represents a very strong association.
→ Practical application: if a customer has bought E and B, you can recommend or promote item F.
> Rule 2: (C, E, B) ⇒ (F)
The addition of item C to the previous set maintains the maximum confidence (1.0), reinforcing the pattern.
→ Insight: there is a recurring group of customers who consume C, E, B and F together, a “mini basket”.
>Rule 3: (F) ⇒ (E, B)
The opposite direction is also valid: those who buy F always take E and B. This indicates that F can be a buying signal for E and B, and not just the other way around.
> Rule 4: (C, F, E) ⇒ (B)
When customers buy C, F and E, they also buy B with 100% confidence. This rule complements the previous one, suggesting that B is a highly central item in the associations.
Apriori analysis revealed a strong pattern of co-occurrence between items B, E and F, often accompanied by C. These items form a high-value core for the supermarket, both in terms of recurrence and predictability.
