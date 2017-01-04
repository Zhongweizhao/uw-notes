## Lecture 1

Major theme of 146 

- side-effects ("impurity")
- Proggrams that __do__ things
- imperative programming

Using

- impure racket
- C
- low-level machine

### Why functional first? Why not imperative first?

Imperative programming is harder

**Side-effects**

- text is printed to the screan
- keystrokes collected from keyboard
- values of variables change

all change the state of the world

- the state ofthe world effects the program

**Example:** `(define (f x) (+ x y))` depends on the current value of y

Thus the semantics of imperative programs must ake into account the current state of the world, even while changing the state of the world.

=> temporal component inherent in analysis of imperative programs (not "what does this do?" but "what does it do at this point of time")

### Why study imperative programming

"the world is imperative"
- machines work by mutating memory
- even functional programs are eventually executed imperatively

"... or is it?"

Is "the world" constantly mutating, or is it constantly being reinvented?

- when a character appears on the screen, does that change the world, or create a new world?

Either way, imperative programming matches up with real-world experience

- but a functional world view may offer a unique tale on side-effects

### Prereq:

- review
- proof
- big O
- analysis
- full racket
- C
- No seashell, use student.cs linux account


### Recall from CS 145

#### Structural recursion 

The structure of the program matches the structure of the data

**Example:** 
```Scheme
(define (fact n)
    (if (= n 0)
        1
        (* n (fact (- n 1)))))
```

```Scheme
(define (length l)
    (cond ((empty? l) 0)
        (else (+ 1 (length (rest l))))))
```

- The cases in the function matches the cases in the data definition. 
- The revursive call uses arguments that are either the same or get one step closer to the base of the data type.

If the recursion is structural, the structure of the program matches the structure of its correctness proof by induction.

<span class="claim">
`(length l)` produces the length of the list `l`.
</span>

<span class="proof">
Stuructural induction on `l`.

**Case 1:** `l` is empty, `(length l)` produces empty.

**Case 2:** `l` is `(cons x l')`, assume that `(length l')` produces n, which is the length of `l'`, Then `(length l)` produces `(+ 1 n)` which is the length of 'l'. 

</span>

Correctness proof is just a restatement of the program itself.

#### Accumulative recutsion 

One or more extra parameters that grow while the other parameters shrink.

```Scheme
(define (sum-list l)
    (define (sum-list-help l acc)
        (if (empty? l)
            acc
            (sum-list-help (rest l) (+ (first l) acc))))
    (sum-list-help l 0))
```

Proof method: induction on an **invariant**.

<span class="example">
To prove that `(sum-list l)` sums l, it suffies to prove `(sum-list-help l 0)` sums l.
</span>


<span class="proof">
Case 1: l is empty. Then `(sum-list-help l 0)` 

Case 2: l = `(cons x l')`, assume `(sum-list-help l' 0)` sums `l'`, then 
```
  (sum-list-help l 0)
= (sum-list-help (cons x l') 0)
= (sum-list-help l' x)
```

which does not match induction hypothesis, proof fails.

Need a stronger statement (invariant) about the relationship between L + acc that holds throughout the recursion.
</span>

<span class="proof">
$\forall$ l, $\forall$ acc, `(sum-list-help l acc)` produces acc + $\sum$ l, by structural induction on l.

Case 1: l is empty.
Then
```
  (sum l acc)
= acc  
```

Case 2: l = `(cons x l')`

Assume `(sum-list-help)` = $\sum$ l.

Then 
```
  (sum-list-help l acc)
= (sum-list-help (cons x l') acc)
= (sum-list-help l' (+ x acc))
= $\sum$ l + acc
```

Then let $acc = 0$.
```
(sum-list-help l 0) = $\sum$ l
```
</span>

#### Generator recursion

Does not follow the structure of the data 

- proofs require more creativity

##### How do we reason about imperative programs?

Recall: impure racket

(begin exp1 exp2 ... expn)

- evalutes all of exp in order left to right
- produces the value of exp







