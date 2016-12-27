## Lecture 1

### Increasing Function Theorem
<span class="theorem">
Assume that $f(x)$ is continuous on $[a,b]$ and differentiable on $(a,b)$ with $f'(x) \geq 0$ ($f'(x) > 0$) for all $x\in (a,b)$, then $f(x)$ is (strictly) increasing on $(a,b)$.
</span>

### Comparison Theorem
<span class="theorem">
Assume that $f$ and $g$ are differentiable on $(a,b)$ and continuous on $[a,b]$. If $f(a) = g(a)$ and if $f'(x)<g'(x)$ for all $x \in (a,b)$, then $f(x) < g(x)$ for all $x \in (a,b]$.
</span>

### Classifying Critical Points

### First Derivative Test
<span class="theorem">
Assume that $f'(c) = 0$

1. Assume that there exists an open interval $(a,b)$ containing $c$ with $f'(x) \geq 0$ for all $a<x<c$ and $f'(x) \leq 0$ for all $c<x<b$, then $x=c$ is a local maximum.

2. Assume that there exists an open interval $(a,b)$ containing $c$ with $f'(x) \leq 0$ for all $a<x<c$ and $f'(x) \geq 0$ for all $c<x<b$, then $x=c$ is a local minimum.

</span>

<span class="proof">
Let $a < x_0 < c$. Then Mean Value Theorem holds on $[x_0,c]$. There exists $d_1 \in (x_0 ,c)$ with $$\frac{f(x_0) - f(c)}{x_0 - c} = f'(d_1) \geq 0.$$ Then $f(x_0) \leq f(c)$ since $x_0 - c < 0$. Similarly we prove the other parts of the theorem.
</span>

### Second Derivative Test
<span class="theorem">
Assume that $f'(c) = 0$ and that $f''(x)$ is continuous at $x=c$.
1. If $f''(c) > 0$, then $x = c$ is a local minimum
2. If $f''(c) < 0$, then $x= c$ is a local maximum
</span>

<span class="proof">
Assume that $f'(c) = 0$ and that $f''(x)$ is continuous at $x=c$.

1. Assume $f''(x) > 0$. Since $f''(x)$ is continuous at $x=c$, there is an open interval $(c-\delta, c+\delta)$ on which $f''(x) > 0$. Hence $f'(x)$ is strictly increasing on $(c-\delta,c+\delta)$. But $f'(c) <0$, then $f'(x) < 0$ on $(c-\delta , c)$ and $f'(c) > 0$ on $(c,c+\delta)$. Then we apply the First Derivative Test.

</span>

### Concavity
<span class="definition">
We say that a function $f(x)$ which is continuous on an interval $I$ is concave up on $I$ if for every $a< b$, $a,b \in I$, we have
$$h(x) = f(a) + \frac{f(b) - f(a)}{b-a} - f(x) \geq 0 \text{ on }(a,b)$$
We say that a function $f(x)$ is concave down on $I$ if for every $a< b$, $a,b \in I$, we have
$$h(x) = f(a) + \frac{f(b) - f(a)}{b-a} - f(x) \leq 0 \text{ on }(a,b)$$
</span>

### Concavity Theorem
<span class="theorem">
1. Assume that $f''(x) > 0$ for all $x\in I$ then $f(x)$ is concave up on $I$.
2. Assume that $f''(x) < 0$ for all $x\in I$ then $f(x)$ is concave down on $I$.
</span>

## Lecture 2

<span class="example">
Let
$$f(x) = \begin{cases}
\frac{\sin x}{x} & \text{ if }x\neq 0\\
1 \text{ if } x=0
\end{cases}
$$
</span>


<span class="solution">
From Taylor's Theorem we get $$\abs{\sin h - h } \leq \frac{\abs{h^3}}{6}$$
Then $$\abs{\frac{\sin h}{h} -1} \leq \frac{\abs{h^3}}{6}$$
Then $$\abs{\frac{\frac{\sin h}{h}-1}{h} - 0}\leq \frac{\abs{h}}{6}$$
By Squeeze Theorem
$$\lim_{x\to 0} \frac{\frac{\sin h}{h}-1}{h} - 0 = f'(0) = 0$$
</span>

### Approximation Theorem
<span class="theorem">
Assume that there exists a $\delta > 0$ such that $\abs{f^{(n+1)}(x)} \leq M$ for all $x\in (a-\delta, a+\delta)$, then for each $x\in (a-\delta,a+\delta)$ we have $$\abs{f(x) - P_{n,a} (x)} \leq \frac{M}{(n+1)!}\abs{(x-a)^{n+1}}$$
</span>


### Big-O notation
<span class="definition">
Let $a\in \mathbb{R}$. Given $f,g$ we say that $f(x) = O(g(x))$ as x approaches $a$ if there exists $0<\delta \leq 1$ with
$$\abs{f(x)}\leq M\abs{f(x)} \text{ for all } x\in(a-\delta,a+\delta)$$ except possibly at $x=a$.
</span>

<span class="theorem">
If There exists a $0< \delta \leq 1$ such that $f^{(n+1)}(x)$ is continuous on $[-\delta,\delta]$, then $$f(x) - P_{n,a}(x) = O(x^{n+1})$$ and we write $f(x) = P_{n,a}(x) + O(x^{n+1})$.
</span>

<span class="proof">
Since $f^{(n+1)}(x)$ is continuous on $[-\delta,\delta]$, the Extreme Value Theorem show that there exists $M$ with $\abs{f^{(n+1)}(x)} \leq M$ for all $x\in [-\delta, \delta]$. Hence by the Approximation Theorem,
$$\abs{f(x) - P_{n,a}(x)}\leq \frac{M}{(n+1)!}\abs{x^{n+1}}$$ Then $f(x) = P_{n,a}(x) + O(x^{n+1})$.
</span>

### Arithmetic Rules for Big-O
<span class="theorem">
Assume that $f= O(x^n)$, $g = O(x^m)$.
- $cf(x) = O(x^n)$
- $f(x) + g(x) = O(x^{\operatorname{min} (m,n)})$
- $f(x)\cdot g(x) = O(x^{m+n})$
- $x^k\cdot f(x) = O(x^{n+k})$
- $(f(x))^k = O(x^{nk})$
</span>

<span class="proof">
On $[-\delta,\delta]$, $\abs{f(x)} \leq M_1\abs{x^n}$, $\abs{g(x)} \leq M_2 \abs{x^n}$
Then $$\abs{f(x) + g(x)} \leq \abs{f(x)} + \abs{g(x)} \leq M_1 \abs{x^n} + M_2 \abs{x^m} \leq M_1 \abs{x^{\operatorname{min} (m,n)}} + M_2 \abs{x^{\operatorname{min} (m,n)}} = (M_1 + M_2) \abs{x^{\operatorname{min} (m,n)}}$$
</span>


<span class="lemma">
Let $p(x) = a_0 + a_1x+ \cdots a_nx^n$. Assume that $p(x) = O(x^{n+1})$, then $p(x) = 0$.
</span>

<span class="proof">
Prove by induction.
</span>

<span class="theorem">
Assume that $f^{(n+1)}(x)$ is continuous on $[-\delta,\delta]$. If $p(x) = a_0 + a_1x+\cdots a_nx^n$ is such that $f(x) = p(x) + O(x^{n+1})$, then $p(x) = P_{n,0}(x)$.
</span>

<span class="proof">
\begin{align*}
    p(x) - P_{n,a} (x) = & (p(x) - f(x)) + (f(x) - P_{n,0}(x))\\
    = & O(x^{m+1}) + O(x^{m+1})\\
    = & O(x^{m+1})
\end{align*}
Then by the lemma, we have $p(x) - P_{n,a} (x) = 0$.
</span>
