window.translations = {
  en:{
    common:{
      title_main: "Main Page",
      navBrand: "Amortised Complexity",
      aboutAppBtn: "About my bachelor's thesis",
      backBtn: "<i class='fas fa-arrow-left'></i> Back",
      algorithm1: "Multipop on Stack",
      algorithm2: "Queue using Two Stacks",
      algorithm3: "Splay Tree",
      aboutModalLabel: "About my bachelor's thesis",
      aboutModalBody: `
            <p><strong>This bachelor's thesis shows the amortized complexity of three selected algorithms taught in the Master of Science in Theoretical Computer Science course.</strong></p>
            <p>
                The thesis is part of an ongoing project: a <strong>Teaching Server for Theoretical Computer Science</strong>,
                i.e., a collection of interactive web pages designed to help students understand problems and concepts through
                <strong>dynamic simulations</strong> rather than a fixed set of static examples.
            </p>

            <h6 class="mt-3"><strong>Thesis topic</strong></h6>
            <ul>
                <li><strong>Component of Teaching Server for Theoretical Computer Science – Amortized Complexity 1</strong></li>
                <li>Language of the thesis: <strong>Czech</strong> (the app provides <strong>CZ/EN</strong> UI for usability and international accessibility).</li>
            </ul>

            <h6 class="mt-3"><strong>Main goal</strong></h6>
            <p>
                The goal is to create a component that supports learning how to analyze algorithmic complexity using
                <strong>amortized analysis</strong> (especially the <strong>potential method</strong>, and conceptually also the accounting view),
                and to make the analysis tangible via step-by-step simulations driven by user inputs.
            </p>

            <h6 class="mt-3"><strong>Amortized analysis in this component</strong></h6>
            <p>
                Amortized complexity describes the <strong>average cost per operation over a whole sequence</strong>,
                even when individual operations may be expensive. In theoretical computer science it is commonly shown using
                the <strong>aggregate method</strong>, the <strong>accounting method</strong>, or the <strong>potential method</strong>.
                This component primarily visualizes the <strong>potential method</strong> by displaying the current potential value Φ
                after each step (which can also be interpreted as stored credits).
            </p>

            <h6 class="mt-3"><strong>What “Step Count” means here</strong></h6>
            <p>
                The step counter represents the number of <strong>elementary operations</strong> performed during the simulation
                (e.g., pushing/popping an element, moving one element between structures, etc.). This helps compare
                the <strong>worst-case cost of a single operation</strong> with the <strong>amortized cost</strong> over a sequence.
            </p>

            <h6 class="mt-3"><strong>What the web pages enable (requirements)</strong></h6>
            <ol class="mb-2">
                <li>
                <strong>Simulate at least 3 different algorithms</strong> where amortized analysis is appropriate.
                <br/>
                <small class="text-muted">Each algorithm is presented with an interactive simulation and explanatory text.</small>
                </li>
                <li>
                <strong>Provide inputs in three ways</strong>:
                <ul>
                    <li><strong>Manual</strong> user-friendly input (e.g., values for a structure / operation parameters).</li>
                    <li><strong>Random</strong> input generation controlled by parameters (range, count, etc.).</li>
                    <li><strong>Example inputs</strong> of different sizes / typical scenarios (e.g., best case / worst case).</li>
                </ul>
                </li>
                <li>
                During simulation show:
                <ul>
                    <li><strong>Current state</strong> of the computation (e.g., contents of stacks/queues and what changes in each step).</li>
                    <li><strong>Step count</strong> (how many elementary operations were performed).</li>
                    <li><strong>Potential value</strong> (potential method) or an equivalent interpretation (saved “credits”).</li>
                </ul>
                </li>
                <li>
                For each algorithm, provide a place for the <strong>derivation of amortized complexity</strong>
                (e.g., as a static explanation page / section next to the simulation).
                </li>
            </ol>

            <h6 class="mt-3"><strong>How to use this component</strong></h6>
            <ul>
                <li>Pick an algorithm and choose one of the input modes: <strong>Manual</strong>, <strong>Random</strong>, <strong>Best/Worst</strong>, or <strong>Syntax</strong>.</li>
                <li>Watch how the data structure evolves step-by-step and how the <strong>potential</strong> changes.</li>
                <li>Compare <strong>worst-case single operations</strong> with <strong>amortized cost per operation</strong> over a whole sequence.</li>
            </ul>

            <h6 class="mt-3"><strong>Collaboration note</strong></h6>
            <p class="mb-0">
                Students solving a similar assignment with a different number in the title may collaborate on a shared UI,
                but each student implements a different set of algorithms.
            </p>
      `,
      footerText: "Created by Martin Dressler, DRE0065",
      closeBtn: "Close",
      submitBtn: "Submit",
      generateBtn: "Generate",
      okBtn: "Submit",
      messageTitle: "Message",
      manualButton: "Manually",
      randomButton: "Randomly",
      bestWorstButton: "Best / Worst case",
      syntaxButton: "Syntax",
      randomParamsModalLabel: "Set Random Parameters",
      rangeMinLabel: "Minimum value:",
      rangeMaxLabel: "Maximum value:",
      countLabel: "Number of Values:",
      stepCount: "Step Count",
      potential: "Potential",
      nextButton: "Next",
      startSyntaxBtn: "Start Execution",
      endOfExample: "End of commands.",
      endButton: "End",
      bestCase: "Best Case",
      worstCase: "Worst Case",
      selectCase: "Select Case",
      bestWorstDescription: "Select Best or Worst case to execute:",
      executeBestCase: "Executing Best Case...",
      executeWorstCase: "Executing Worst Case...",
      detailNotProvided: "Detail not provided."
    },
    multipop:{
      manualParamsModalLabel: "Set Stack Parameters",
      stackValuesLabel: "Enter stack values:",
      multipopTitle: "Multipop on Stack",
      multipopAbout: "About Multipop on Stack",
      multipopDescription: `
            <p>
                <strong>Multipop on Stack</strong> is a classic example used to demonstrate <strong>amortized analysis</strong>.
                We work with a stack that supports the basic operations <strong>Push</strong> and <strong>Pop</strong>, and we extend it with
                <strong>Multipop(k)</strong>, which removes up to <em>k</em> elements from the top.
            </p>

            <h6 class="mt-3"><strong>Operations</strong></h6>
            <ul>
                <li><strong>Push(x)</strong>: insert <em>x</em> to the top of the stack.</li>
                <li><strong>Pop()</strong>: remove the top element (if the stack is not empty).</li>
                <li><strong>Multipop(k)</strong>: remove up to <em>k</em> elements (or fewer if the stack contains less than <em>k</em> items).</li>
            </ul>

            <h6 class="mt-3"><strong>Why amortized analysis?</strong></h6>
            <p>
                A single <strong>Multipop(k)</strong> can take <strong>O(k)</strong> time in the worst case.
                However, over a whole sequence of operations, each element can be popped at most once after being pushed.
                Therefore, even if some operations are expensive, the <strong>average (amortized) cost per operation is O(1)</strong>.
            </p>

            <h6 class="mt-3"><strong>Potential method (used in this simulation)</strong></h6>
            <p>
                We use the potential function <strong>Φ = |S|</strong> (the number of elements currently stored in the stack).
                <br/>
                <strong>Intuition:</strong> pushing increases the potential by 1 (we “store” work for the future),
                popping decreases it by 1 (we “spend” stored potential).
            </p>

            <h6 class="mt-3"><strong>What you can do here</strong></h6>
            <ul>
                <li><strong>Manual mode:</strong> perform Push/Pop/Multipop yourself and observe step count and potential.</li>
                <li><strong>Random mode:</strong> generate an input stack with chosen range and size.</li>
                <li><strong>Best/Worst case:</strong> run a prepared scenario to illustrate typical behavior.</li>
                <li><strong>Syntax mode:</strong> execute a whole sequence step-by-step (e.g., <code>push(1,2,3) pop() multipop(2)</code>).</li>
            </ul>

            <h6 class="mt-3"><strong>What is displayed during the run</strong></h6>
            <ul class="mb-0">
                <li><strong>Current stack contents</strong> (visualized as blocks).</li>
                <li><strong>Step count</strong> (number of elementary operations).</li>
                <li><strong>Potential</strong> (Φ) updated after each step.</li>
                <li><strong>Explanation panel</strong> describing the current step and why the potential changes.</li>
            </ul>

            <h6 class="mt-3"><strong>Formal definition</strong></h6>
            <p>
                We maintain a stack <strong>S</strong> (LIFO). The operations are:
            </p>
            <ul>
                <li><strong>Push(x)</strong>: place x on top of S.</li>
                <li><strong>Pop()</strong>: remove the top element if S is not empty.</li>
                <li><strong>Multipop(k)</strong>: repeat <strong>Pop()</strong> at most k times (stop early if the stack becomes empty).</li>
            </ul>

            <h6 class="mt-3"><strong>Clean pseudocode</strong></h6>
            <pre class="mb-2"><code>
    PUSH(S, x):
    S.push(x)

    POP(S):
    if S.empty(): return EMPTY
    return S.pop()

    MULTIPOP(S, k):
    while k &gt; 0 and not S.empty():
        S.pop()
        k = k - 1
            </code></pre>

            <h6 class="mt-3"><strong>Worst-case vs amortized cost</strong></h6>
            <ul>
                <li><strong>Worst-case</strong> for one operation: Multipop(k) can do up to k pops → <strong>O(k)</strong>.</li>
                <li><strong>Key amortized idea</strong>: each element can be popped at most once after it was pushed.</li>
                <li>So over a whole sequence, total pops ≤ total pushes → average cost per operation becomes <strong>O(1)</strong>.</li>
            </ul>

            <h6 class="mt-3"><strong>Potential method (more explicit)</strong></h6>
            <p>
                We choose <strong>Φ = |S|</strong> (current stack size). Amortized cost is:
                <br/>
                <strong>â = (actual cost) + ΔΦ</strong>.
            </p>
            <ul>
                <li><strong>Push</strong>: actual = 1, ΔΦ = +1 → amortized â = 2.</li>
                <li><strong>Pop</strong>: actual = 1, ΔΦ = −1 → amortized â = 0.</li>
                <li><strong>Multipop(k)</strong>: actual = number of really popped elements t, ΔΦ = −t → â = 0.</li>
            </ul>
            <p class="mb-0">
                Intuition: pushes “deposit” potential; pops “spend” it. Expensive multipops are paid from previously stored potential.
            </p>

            <h6 class="mt-3"><strong>Accounting interpretation (credits)</strong></h6>
            <ul>
                <li>Charge each <strong>Push</strong> 2 credits: 1 pays the push now, 1 is stored on the element.</li>
                <li>When that element is later popped (by Pop or Multipop), use its stored credit to pay the pop.</li>
                <li>No operation ever goes into “debt” → amortized cost is constant.</li>
            </ul>

            <h6 class="mt-3"><strong>Edge cases you should understand</strong></h6>
            <ul class="mb-0">
                <li><strong>Empty stack</strong>: Pop does nothing / returns empty. Multipop stops immediately.</li>
                <li><strong>k larger than size</strong>: Multipop just clears the stack.</li>
                <li><strong>Why “up to k”</strong>: this is crucial for correctness and for amortized reasoning.</li>
            </ul>
      `,
      enterValuePrompt: "Enter the positive number you want to add to the stack:",
      invalidNumberAlert: "Enter a valid positive number!",
      stackEmptyAlert: "Stack is empty!",
      stackEmptyNoPop: "Stack is empty! No pop performed.",
      stackEmptyNoMultipop: "Stack is empty! No multipop performed.",
      multipopPrompt: "Enter the number of elements to remove:",
      pushButton: "Push",
      popButton: "Pop",
      multipopButton: "Multipop",
      syntaxModalLabel: "Syntax Commands (Multipop on Stack)",
      syntaxInfo: `
            <div class="syn-line">Enter your syntax commands below.</div>
            <div class="syn-line"><span class="syn-label">Supported:</span>
                <code>push(...)</code>, <code>pop()</code>, <code>multipop(k)</code>
            </div>
            <div class="syn-line">
                Push can take multiple values: <code>push(5,1,2,4,55)</code>.
            </div>
            <div class="syn-line"><span class="syn-label">Example:</span>
                <code>push(5,1,2,4,55) pop() pop() multipop(2)</code>
            </div>
      `,
      syntaxInputLabel: "Syntax Commands (Multipop on Stack):",
      syntaxInputPlaceholder: "push(5,1,2,4,55) pop() pop() multipop(2)",
      mpSynPanelTitle: "SYNTAX MODE",
      mpSynPanelDesc: `
            Click <strong>Next</strong> to execute exactly one command.<br/>
            After each command we show what happened, how the <strong>stack</strong> changed,
            and how <strong>Step Count</strong> + <strong>Potential Φ = |S|</strong> changed.
      `,
      bestCaseDescription: "This is the best case scenario for the Multipop algorithm.",
      worstCaseDescription: "This is the worst case scenario for the Multipop algorithm.",
      multipopEndBestCase: "End of the best case.",
      multipopEndWorstCase: "End of the worst case.",
      pushDetail: `
            <div><strong>What happens</strong></div>
            <div>
                We execute <strong>Push({value})</strong>: the value is placed on the <em>top</em> of the stack.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on the data structure</strong></div>
            <ul class="ti-ul18">
                <li>The stack grows by <span class="potentialValue">1</span> element.</li>
                <li>The new element becomes the new <strong>top</strong>.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on counters (Potential method)</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δsteps:</strong> <span class="potentialValue">+1</span> (one elementary push)</li>
                <li><strong>ΔΦ:</strong> <span class="potentialValue">+1</span>, because Φ = |S| (stack size)</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortized intuition</strong></div>
            <div>
                We “store” potential for the future. Later, expensive operations can spend this saved potential.
            </div>
      `,
      popDetail: `
            <div><strong>What happens</strong></div>
            <div>
                We execute <strong>Pop()</strong>: remove the <em>top</em> element of the stack.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on the data structure</strong></div>
            <ul class="ti-ul18">
                <li>The top element is removed: {removedValue}</li>
                <li>The stack shrinks by <span class="potentialValue">1</span>.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on counters (Potential method)</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δsteps:</strong> <span class="potentialValue">+1</span> (one elementary pop)</li>
                <li><strong>ΔΦ:</strong> <span class="potentialValue">-1</span>, because Φ = |S| decreases</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortized intuition</strong></div>
            <div>
                We spend one stored unit of potential to pay for removing one element.
            </div>
      `,
      multipopDetail: `
            <div><strong>What happens</strong></div>
            <div>
                We execute <strong>Multipop({count})</strong>: remove up to {count} elements from the top.
                If the stack has fewer, we remove all of them.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on the data structure</strong></div>
            <div class="ti-mt8">
                Removed elements: {removedValues}
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on counters (Potential method)</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δsteps:</strong> +{count} (we pop each removed element once)</li>
                <li><strong>ΔΦ:</strong> -{count}, because Φ = |S| decreases by the same amount</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortized intuition</strong></div>
            <div>
                Even if Multipop can be expensive, every element was previously pushed once,
                so over a whole sequence the average (amortized) cost per operation stays <strong>O(1)</strong>.
            </div>
      `,
      stackLabel: "Stack",
      manualValuesRequiredAlert: "Enter at least one positive stack value.",
      manualValuesInvalidAlert: "Enter only positive integers separated by commas (e.g. 1, 2, 3).",
      randomInvalidParamsAlert: "Enter valid positive values for minimum, maximum and count. Minimum must also be smaller than maximum.",
      syntaxInvalidAlert: "Enter valid syntax commands for Multipop on Stack!",
      emptyPopDetail: `
        <div><strong>What happens</strong></div>
        <div>
            We execute <strong>Pop()</strong>, but the stack is already empty.
        </div>

        <div class="info-panel-sep"></div>

        <div><strong>Effect on the data structure</strong></div>
        <ul class="ti-ul18">
            <li>No element is removed.</li>
            <li>The stack remains empty.</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Effect on counters (Potential method)</strong></div>
        <ul class="ti-ul18">
            <li><strong>Δsteps:</strong> <span class="potentialValue">+0</span></li>
            <li><strong>ΔΦ:</strong> <span class="potentialValue">0</span>, because Φ = |S| does not change</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Why this matters</strong></div>
        <div>
            This step shows an edge case: the operation is requested, but there is nothing to remove.
        </div>
      `,
      emptyMultipopDetail: `
        <div><strong>What happens</strong></div>
        <div>
            We execute <strong>Multipop({count})</strong>, but the stack is already empty.
        </div>

        <div class="info-panel-sep"></div>

        <div><strong>Effect on the data structure</strong></div>
        <ul class="ti-ul18">
            <li>No elements are removed.</li>
            <li>The stack remains empty.</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Effect on counters (Potential method)</strong></div>
        <ul class="ti-ul18">
            <li><strong>Δsteps:</strong> <span class="potentialValue">+0</span></li>
            <li><strong>ΔΦ:</strong> <span class="potentialValue">0</span>, because Φ = |S| does not change</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Why this matters</strong></div>
        <div>
            This is an edge case: Multipop is allowed, but when the stack is empty, it cannot remove anything.
        </div>
      `
    },
    queue:{
      queue2StacksTitle: "Queue using Two Stacks",
      queue2StacksAbout: "About Queue using Two Stacks",
      queue2StacksDescription: `
            <p>
                <strong>Queue using Two Stacks</strong> is a standard example of amortized analysis.
                We implement a FIFO queue using two stacks:
                <strong>S<sub>in</sub></strong> (for incoming elements) and <strong>S<sub>out</sub></strong> (for outgoing elements).
            </p>

            <h6 class="mt-3"><strong>Idea</strong></h6>
            <ul>
                <li><strong>Enqueue(x)</strong>: push <em>x</em> onto <strong>S<sub>in</sub></strong> (cheap, O(1)).</li>
                <li><strong>Dequeue()</strong>: if <strong>S<sub>out</sub></strong> is non-empty, pop from it (O(1)).</li>
                <li>
                If <strong>S<sub>out</sub></strong> is empty, transfer all items from <strong>S<sub>in</sub></strong> to <strong>S<sub>out</sub></strong>
                (each item moves exactly once), then pop (worst-case O(n)).
                </li>
            </ul>

            <h6 class="mt-3"><strong>Why amortized analysis?</strong></h6>
            <p>
                One <strong>Dequeue</strong> can be expensive because the transfer may move many elements at once.
                But each element is:
                (1) pushed once to <strong>S<sub>in</sub></strong>,
                (2) moved at most once from <strong>S<sub>in</sub></strong> to <strong>S<sub>out</sub></strong>,
                (3) popped once from <strong>S<sub>out</sub></strong>.
                Therefore, over a sequence of operations, the <strong>amortized cost per operation is O(1)</strong>.
            </p>

            <h6 class="mt-3"><strong>Potential method (used in this simulation)</strong></h6>
            <p>
                We use the potential function <strong>Φ = |S<sub>in</sub>|</strong>.
                <br/>
                <strong>Intuition:</strong> Enqueue increases Φ by 1 (we store potential).
                During transfer, Φ decreases until it becomes 0 (we spend stored potential to “pay” for the transfer).
            </p>

            <h6 class="mt-3"><strong>What you can do here</strong></h6>
            <ul>
                <li><strong>Manual mode:</strong> enqueue/dequeue and observe when transfers happen.</li>
                <li><strong>Random mode:</strong> generate an initial queue from a chosen range and size.</li>
                <li><strong>Best/Worst case:</strong> run prepared scenarios (cheap dequeue vs. first dequeue forcing transfer).</li>
                <li><strong>Syntax mode:</strong> execute a sequence step-by-step (e.g., <code>enqueue(1,2,3) dequeue() enqueue(9) dequeue()</code>).</li>
            </ul>

            <h6 class="mt-3"><strong>What is displayed during the run</strong></h6>
            <ul class="mb-0">
                <li><strong>Both stacks</strong> (<strong>S<sub>in</sub></strong> and <strong>S<sub>out</sub></strong>) and how elements move between them.</li>
                <li><strong>Step count</strong> and <strong>potential</strong> (Φ) updated after each elementary step.</li>
                <li><strong>Explanation panel</strong> indicating whether a transfer is happening and why.</li>
            </ul>

            <h6 class="mt-3"><strong>Invariant (to nejdůležitější)</strong></h6>
            <ul>
                <li><strong>Stack Out</strong> má na vrcholu vždy “čelo fronty” (připravené k dequeue).</li>
                <li><strong>Stack In</strong> drží nově přidané prvky (čekají, až se jednou otočí).</li>
                <li>Skutečné pořadí fronty je: <strong>(vrchol Out → spodek Out) a pak (spodek In → vrchol In)</strong>.</li>
            </ul>

            <h6 class="mt-3"><strong>Invariant (the one thing you must remember)</strong></h6>
            <ul>
                <li><strong>Stack Out</strong> stores the queue front on its top (ready to dequeue).</li>
                <li><strong>Stack In</strong> stores newly enqueued items (waiting to be reversed later).</li>
                <li>The real queue order is: <strong>(top of Out → bottom of Out) then (bottom of In → top of In)</strong>.</li>
            </ul>

            <h6 class="mt-3"><strong>Clean pseudocode</strong></h6>
            <pre class="mb-2"><code>
    ENQUEUE(x):
    In.push(x)

    DEQUEUE():
    if Out.empty():
        while not In.empty():
        Out.push(In.pop())
    if Out.empty(): return EMPTY
    return Out.pop()
            </code></pre>

            <h6 class="mt-3"><strong>Why transfer reverses order (intuition)</strong></h6>
            <p>
                Elements enter In in the order they were enqueued. When we pop from In and push to Out,
                we reverse that order, making the oldest element end up on top of Out.
                That is exactly what a FIFO queue needs.
            </p>

            <h6 class="mt-3"><strong>Amortized analysis (the “each element moves once” argument)</strong></h6>
            <ul>
                <li>Each element is pushed to <strong>In</strong> once (cost 1).</li>
                <li>It is moved from <strong>In → Out</strong> at most once (pop + push = cost 2).</li>
                <li>It is popped from <strong>Out</strong> once (cost 1).</li>
                <li>So total work per element is ≤ 4 → over many operations, average is <strong>O(1)</strong>.</li>
            </ul>

            <h6 class="mt-3"><strong>Potential method (more explicit)</strong></h6>
            <p>
                Choose <strong>Φ = |In|</strong>. Amortized cost â = actual + ΔΦ.
            </p>
            <ul>
                <li><strong>Enqueue</strong>: actual = 1, ΔΦ = +1 → â = 2.</li>
                <li><strong>Dequeue without transfer</strong>: actual = 1, ΔΦ = 0 → â = 1.</li>
                <li><strong>Dequeue with transfer of t items</strong>: actual = (2t + 1), ΔΦ = −t → â = t + 1 (bounded over sequence).</li>
            </ul>
            <p class="mb-0">
                Intuition: enqueues store potential; the expensive transfer spends it.
            </p>

            <h6 class="mt-3"><strong>Common edge cases</strong></h6>
            <ul class="mb-0">
                <li>If both stacks are empty → Dequeue returns empty.</li>
                <li>Transfers happen only when Out is empty (important for correctness and efficiency).</li>
                <li>The first Dequeue after many Enqueues is often the “expensive” one (worst-case), but amortized remains O(1).</li>
            </ul>
      `,
      queueManualParamsModalLabel: "Set Queue Parameters",
      queueValuesLabel: "Enter queue values:",
      enqueueButton: "Enqueue",
      dequeueButton: "Dequeue",
      enqueuePrompt: "Enter a positive number to enqueue:",
      queueEmptyAlert: "Queue is empty!",
      queueEmptyNoDequeue: "Queue is empty! No dequeue performed.",
      queueStackInLabel: "Stack In",
      queueStackOutLabel: "Stack Out",
      queueInfoTransfer: "Stack Out empty -> transferring items (O(n))...",
      queueInfoMove: "Move {value}: Stack In -> Stack Out",
      queueInfoDequeue: "Dequeue -> remove {value}",
      queueInfoBest: "BEST: Dequeue from Stack Out (O(1))",
      queueInfoWorst: "WORST: first dequeue triggers a transfer (O(n))",
      queueBestWorstModalText: "Select Best or Worst case to execute:",
      queueEndBestCase: "End of the best case.",
      queueEndWorstCase: "End of the worst case.",
      queueBestCaseDescription: "This is the best case scenario for Queue using Two Stacks (dequeue from Stack Out in O(1)).",
      queueWorstCaseDescription: "This is the worst case scenario for Queue using Two Stacks (first dequeue triggers a transfer from Stack In to Stack Out in O(n)).",
      queueSyntaxModalLabel: "Syntax Commands (Queue using Two Stacks)",
      queueSyntaxInfo: `
            <div class="syn-line">Enter your queue commands below.</div>
            <div class="syn-line"><span class="syn-label">Supported:</span>
                <code>enqueue(...)</code>, <code>dequeue()</code>
            </div>
            <div class="syn-line">
                Enqueue can take multiple values: <code>enqueue(1,2,3)</code>.
            </div>
            <div class="syn-line"><span class="syn-label">Example:</span>
                <code>enqueue(1,2,3) dequeue() enqueue(99) dequeue()</code>
            </div>
      `,
      queueSyntaxInputLabel: "Syntax Commands (Queue using Two Stacks):",
      queueSyntaxInputPlaceholder: "enqueue(1,2,3) dequeue() enqueue(99) dequeue()",
      queueSyntaxInvalidAlert: "Enter valid syntax commands for Queue using Two Stacks!",
      queueSynPanelTitle: "SYNTAX MODE",
      queueSynPanelDesc: `
            Click <strong>Next</strong> to execute exactly one command.<br/>
            After each command we show what happened, whether a <strong>transfer</strong> was needed,
            and how <strong>Step Count</strong> + <strong>Potential Φ = |S<sub>in</sub>|</strong> changed.
      `,
      queueEnqueueDetail: `
            <div><strong>What happens</strong></div>
            <div>
                We execute <strong>Enqueue({value})</strong>: push the value onto <em>Stack In</em>.
            </div>
            
            <div class="info-panel-sep"></div>

            <div><strong>Effect on the data structure</strong></div>
            <ul class="ti-ul18">
                <li>The element is added to <strong>Stack In</strong>.</li>
                <li>No transfer happens during enqueue (it is always cheap).</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on counters (Potential method)</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δsteps:</strong> <span class="potentialValue">+1</span> (one push to Stack In)</li>
                <li><strong>ΔΦ:</strong> <span class="potentialValue">+1</span>, because Φ = |S<sub>in</sub>|</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortized intuition</strong></div>
            <div>
                This stored potential will later be used when we need to transfer elements to <em>Stack Out</em>.
            </div>
      `,
      queueDequeueDetailSimple: `
            <div><strong>What happens</strong></div>
            <div>
                We execute <strong>Dequeue()</strong> while <em>Stack Out</em> is not empty:
                we pop from <em>Stack Out</em>.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on the data structure</strong></div>
            <ul class="ti-ul18">
                <li>Removed element: {removedValue}</li>
                <li><strong>Stack In</strong> is unchanged → potential stays {potential}</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on counters</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δsteps:</strong> <span class="potentialValue">+1</span> (one pop from Stack Out)</li>
                <li><strong>ΔΦ:</strong> <span class="potentialValue">0</span> (because Φ depends only on Stack In)</li>
            </ul>
      `,
      queueDequeueDetailTransfer: `
            <div><strong>What happens</strong></div>
            <div>
                <em>Stack Out</em> is empty, so before we can dequeue we must perform a <strong>transfer</strong>.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Transfer explained (why it can cost O(n))</strong></div>
            <ul class="ti-ul18">
                <li>Repeat until Stack In is empty: <strong>pop</strong> from <em>Stack In</em> and <strong>push</strong> to <em>Stack Out</em>.</li>
                <li>This reverses the order so the oldest element becomes removable from Stack Out.</li>
                <li>After transfer, we finally <strong>pop</strong> from <em>Stack Out</em> → that is the Dequeue result.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Result</strong></div>
            <ul class="ti-ul18">
                <li>Removed element: {removedValue}</li>
                <li>Potential becomes {potential} (typically 0 after transfer)</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortized intuition</strong></div>
            <div>
                One dequeue can be expensive, but each element is transferred at most once,
                so over a sequence the average (amortized) cost per operation stays <strong>O(1)</strong>.
            </div>
      `,
      queueInfoBestTitle: "BEST CASE",
      queueInfoBestDetail: `
            <div><strong>Why this is cheap</strong></div>
            <div>
                In this scenario <em>Stack Out</em> already contains elements, so <strong>Dequeue()</strong>
                is just one pop from Stack Out → <strong>O(1)</strong>.
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Potential method</strong></div>
            <div>
                Φ = |S<sub>in</sub>|. Because we do not touch Stack In here, Φ stays the same (often 0).
            </div>
      `,
      queueInfoWorstTitle: "WORST CASE",
      queueInfoWorstDetail: `
            <div><strong>Why this is expensive</strong></div>
            <div>
                Here <em>Stack Out</em> starts empty, so the first <strong>Dequeue()</strong> triggers a
                <strong>transfer</strong> of all elements from Stack In to Stack Out → worst-case <strong>O(n)</strong>.
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Amortized idea</strong></div>
            <div>
                Even though one dequeue is expensive, each element is transferred at most once,
                so over a sequence the amortized cost per operation stays <strong>O(1)</strong>.
            </div>
      `,
      queueInfoTransferTitle: "Transfer (Stack Out is empty)",
      queueInfoTransferDetail: `
            <div><strong>What happens</strong></div>
            <div>
                Stack Out is empty, so we must move all elements from <em>Stack In</em> to <em>Stack Out</em>.
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Why we do it</strong></div>
            <div>
                The transfer reverses the order, so the oldest element becomes available on top of Stack Out (FIFO).
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Potential Φ</strong></div>
            <div>
                Φ = |S<sub>in</sub>| decreases during the transfer as Stack In becomes smaller.
            </div>
      `,
      queueInfoMoveTitle: "Move <span class=\"pushValue\">{value}</span> (In → Out)",
      queueInfoMoveDetail: `
            <div><strong>This micro-step</strong></div>
            <ul class="ti-ul18">
                <li><strong>Pop</strong> <span class="pushValue">{value}</span> from <em>Stack In</em> (1 step)</li>
                <li><strong>Push</strong> <span class="pushValue">{value}</span> to <em>Stack Out</em> (1 step)</li>
            </ul>
            <div class="info-panel-sep"></div>
            <div><strong>Potential Φ</strong></div>
            <div>
                Φ decreases by <span class="potentialValue">1</span> because Stack In lost one element.
            </div>
      `,
      queueInfoDequeueTitle: "Dequeue <span class=\"popValue\">{value}</span>",
      queueInfoDequeueDetail: `
            <div><strong>What happens</strong></div>
            <div>
                We remove the top element from <em>Stack Out</em>. That value is the queue front.
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Potential Φ</strong></div>
            <div>
                Φ stays <span class="potentialValue">{potential}</span> because Φ depends only on Stack In.
            </div>
      `,
      manualValuesRequiredAlert: "Enter at least one positive queue value.",
      manualValuesInvalidAlert: "Enter only positive integers separated by commas (e.g. 1, 2, 3).",
      randomInvalidParamsAlert: "Enter valid positive values for minimum, maximum and count. Minimum must also be smaller than maximum.",
      invalidNumberAlert: "Enter a valid positive number!",
      emptyDequeueDetail: `
        <div><strong>What happens</strong></div>
        <div>
            We execute <strong>Dequeue()</strong>, but both <em>Stack In</em> and <em>Stack Out</em> are empty.
        </div>

        <div class="info-panel-sep"></div>

        <div><strong>Effect on the data structure</strong></div>
        <ul class="ti-ul18">
            <li>No element is removed.</li>
            <li>The queue remains empty.</li>
            <li>No transfer is performed, because there is nothing to move.</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Effect on counters (Potential method)</strong></div>
        <ul class="ti-ul18">
            <li><strong>Δsteps:</strong> <span class="potentialValue">+0</span></li>
            <li><strong>ΔΦ:</strong> <span class="potentialValue">0</span>, because Φ = |S<sub>in</sub>| does not change</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Why this matters</strong></div>
        <div>
            This is an edge case: Dequeue is requested, but the queue contains no elements.
        </div>
      `
    },
    splay:{
      splayTreeTitle: "Splay Tree",
      splayTreeAbout: "About Splay Tree",
      splayTreeDescription: `
            <p>
                <strong>Splay Tree</strong> is a <strong>self-adjusting Binary Search Tree (BST)</strong>.
                After each access (most importantly <em>Search</em>, and also <em>Insert</em> / <em>Delete</em>),
                the accessed node is moved to the root using a sequence of <strong>rotations</strong>.
                This is called <strong>splaying</strong>.
            </p>

            <h6 class="mt-3"><strong>Operations</strong></h6>
            <ul>
                <li><strong>Insert(x)</strong>: insert like in a BST, then <strong>splay</strong> the inserted node to the root.</li>
                <li><strong>Search(x)</strong>: search like in a BST; if found, splay the found node to the root. If not found, splay the <em>last visited</em> node.</li>
                <li><strong>Delete(x)</strong>: typically splay <em>x</em> to the root (or splay last visited), then remove and <em>join</em> subtrees.</li>
            </ul>

            <h6 class="mt-3"><strong>Core idea</strong></h6>
            <p>
                A normal BST can become very unbalanced (almost like a linked list), making some operations expensive.
                A splay tree continuously repairs itself while being used: recently accessed nodes are moved near the root,
                so future accesses tend to be cheaper.
            </p>

            <h6 class="mt-3"><strong>Rotations (Splaying)</strong></h6>
            <ul>
                <li><strong>Zig</strong>: one rotation when the node’s parent is the root.</li>
                <li><strong>Zig-Zig</strong>: two rotations in the same direction (node and parent are both left-children or both right-children).</li>
                <li><strong>Zig-Zag</strong>: two rotations in opposite directions (left-right or right-left).</li>
            </ul>

            <h6 class="mt-3"><strong>Why amortized analysis?</strong></h6>
            <p>
                A single operation can be expensive: in the worst case, splaying can take <strong>O(n)</strong> rotations
                (e.g., in a very skewed tree). However, over a <strong>sequence</strong> of operations, splay trees achieve
                <strong>amortized O(log n)</strong> time per operation. The intuition is that expensive operations restructure the tree,
                and that restructuring “pays back” by making many later operations cheaper.
            </p>

            <h6 class="mt-3"><strong>Potential method (used in theory)</strong></h6>
            <p>
                A standard analysis uses a potential function based on subtree sizes:
                <br/>
                <strong>Φ(T) = Σ<sub>v</sub> log<sub>2</sub>( size(subtree(v)) )</strong>.
                <br/>
                <strong>Intuition:</strong> Φ measures how “well-shaped” the tree is. Rotations change Φ,
                and amortized cost is <strong>actual cost + ΔΦ</strong>, leading to the O(log n) bound.
            </p>

            <h6 class="mt-3"><strong>What “Step Count” means here</strong></h6>
            <p>
                The step counter represents the number of <strong>elementary actions</strong> performed during the simulation.
                In this splay tree visualization it mainly counts:
                <strong>comparisons</strong> during BST navigation and <strong>rotations</strong> during splaying.
            </p>

            <h6 class="mt-3"><strong>What you can do here</strong></h6>
            <ul>
                <li><strong>Manual mode:</strong> Insert / Search / Delete values yourself and observe how the tree restructures.</li>
                <li><strong>Random mode:</strong> generate an initial tree from chosen range + count.</li>
                <li><strong>Best/Worst case:</strong> run prepared scenarios to illustrate cheap vs. expensive accesses.</li>
                <li><strong>Syntax mode:</strong> execute a sequence step-by-step (e.g., <code>insert(10,5,15) search(5) delete(10)</code>).</li>
            </ul>

            <h6 class="mt-3"><strong>What is displayed during the run</strong></h6>
            <ul class="mb-0">
                <li><strong>Tree structure</strong> (nodes + edges) changing smoothly due to rotations.</li>
                <li><strong>Highlighted path</strong> during operations (which nodes were visited).</li>
                <li><strong>Step count</strong> updated after each elementary step.</li>
                <li><strong>Potential Φ</strong> updated after changes (basis for amortized reasoning).</li>
                <li><strong>Explanation panel</strong> describing what happened in the current step and why Φ changes.</li>
            </ul>

            <h6 class="mt-3"><strong>How splaying actually works (Zig / Zig-Zig / Zig-Zag)</strong></h6>
            <ul>
                <li><strong>Zig</strong>: the node’s parent is the root → do one rotation.</li>
                <li><strong>Zig-Zig</strong>: node and parent are both left-children (or both right-children) → two rotations same direction.</li>
                <li><strong>Zig-Zag</strong>: node is a left-child and parent is a right-child (or vice versa) → two rotations opposite directions.</li>
            </ul>

            <h6 class="mt-3"><strong>Why we splay after Search even if not found</strong></h6>
            <p>
                If a value is not found, we still learned “where it would be”.
                Splaying the <em>last visited</em> node moves a relevant node closer to the root,
                which often makes similar future searches cheaper.
            </p>

            <h6 class="mt-3"><strong>Typical Delete outline (high-level)</strong></h6>
            <ol>
                <li>Splay the target (or last visited) to the root.</li>
                <li>Remove the root, leaving left subtree L and right subtree R.</li>
                <li><strong>Join</strong>: if L is empty → root becomes R. Otherwise splay max(L) to root, then attach R.</li>
            </ol>

            <h6 class="mt-3"><strong>What amortized O(log n) really means here</strong></h6>
            <p>
                A single operation can still be <strong>O(n)</strong> (skewed tree, many rotations).
                But over a long sequence, splaying continuously reshapes the tree so that the
                <strong>average cost per operation is O(log n)</strong>.
            </p>
            <ul>
                <li>Expensive operations “pay back” by improving the structure for later operations.</li>
                <li>This is why splay trees are often good in practice for non-uniform access patterns.</li>
            </ul>

            <h6 class="mt-3"><strong>Potential Φ (what it measures intuitively)</strong></h6>
            <p>
                The classical potential uses subtree sizes:
                <strong>Φ(T) = Σ log2(size(subtree(v)))</strong>.
                <br/>
                Intuition: Φ captures how “balanced / well-shaped” the tree is. Rotations change subtree sizes,
                so ΔΦ tells us how much structural progress we made.
            </p>

            <h6 class="mt-3"><strong>In this simulation: what counts as a “step”</strong></h6>
            <ul class="mb-0">
                <li><strong>Comparisons</strong> while walking the BST path.</li>
                <li><strong>Rotations</strong> while splaying.</li>
                <li>So Step Count ≈ “real work done” in one operation.</li>
            </ul>
      `,
      splayInsertButton: "Insert",
      splaySearchButton: "Search",
      splayDeleteButton: "Delete",
      splayNotImplemented: "This mode is not implemented yet (coming soon).",
      splayInitTitle: "Set Tree Parameters",
      splayInitLabel: "Enter tree values:",
      splayInitPlaceholder: "1, 2, 3, 4",
      splayInitInvalid: "Enter at least one valid positive number (e.g., 1,2,3).",
      splaySearchPrompt: "Enter the value to search for:",
      splayInsertPrompt: "Enter the value to insert:",
      splayDeletePrompt: "Enter the value to delete:",
      splayNotFoundTitle: "Not found",
      splayNotFoundText: "Value <strong>{value}</strong> was not found in the tree.",
      splayEmptyTreeText: "Tree is empty.",
      splayAlreadyExistsTitle: "Already exists",
      splayAlreadyExistsText: "Value <strong>{value}</strong> is already in the tree. No insertion was performed.",
      splayRandomParamsModalLabel: "Set Random Parameters",
      splayRandomTooManyAlert: "Count is bigger than the number of unique values in the range. Increase range or lower count.",
      splayInitialValuesLabel: "Initial values:",
      splayGeneratedValuesLabel: "Generated values:",
      splayBestWorstDescription: "Select Best or Worst case to execute:",
      splayBwBestTitle: "BEST CASE",
      splayBwWorstTitle: "WORST CASE",
      splayBwBestDesc: `
            Goal: keep operations cheap (few rotations).<br/>
            We build a small balanced-ish tree and do an operation that touches a shallow node.
            <ul class="ti-ul16">
                <li><strong>Step Count</strong> increases by comparisons + rotations.</li>
                <li><strong>Potential Φ</strong> is computed as Σ log2(size(subtree(v))).</li>
            </ul>
      `,
      splayBwWorstDesc: `
            Goal: demonstrate expensive access.<br/>
            We create a skewed tree (like a linked list), then access/remove a deep node → many rotations (worst-case O(n)).
            <ul class="ti-ul16">
                <li>Even when one step is expensive, splay has good amortized behavior over sequences.</li>
                <li>We also show measured <strong>Δsteps</strong> and <strong>ΔΦ</strong>.</li>
            </ul>
      `,
      splayBwStepInsertTitle: "Insert {value}",
      splayBwStepInsertDetail: `
            <div><strong>What happens</strong></div>
            <div>
                We execute <strong>Insert({value})</strong>: first we insert it like in a normal BST,
                then we <strong>splay</strong> the inserted node to the root using rotations.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Effect on the tree</strong></div>
            <ul class="ti-ul18">
                <li>The node is created as a leaf at the correct BST position.</li>
                <li>Then rotations (Zig / Zig-Zig / Zig-Zag) move it up until it becomes the <strong>root</strong>.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>What Step Count means here</strong></div>
            <ul class="ti-ul18">
                <li>Comparisons while walking down the BST search path.</li>
                <li>Rotations performed during splaying.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Potential Φ</strong></div>
            <div>
                Φ is based on subtree sizes: <strong>Φ = Σ log2(size(subtree(v)))</strong>.
                Rotations change subtree sizes, so Φ can go up or down.
            </div>
      `,
      splayBwStepSearchTitle: "Search {value}",
      splayBwStepSearchDetail: `
            <div><strong>What happens</strong></div>
            <div>
                We execute <strong>Search({value})</strong>: we traverse like in a BST.
                If we find the node, we splay it to the root. If not found, we splay the <em>last visited</em> node.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Why we splay even on “not found”</strong></div>
            <div>
                Even a failed search gives information about where the value would be.
                Splaying the last visited node still improves the shape for future operations.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Measured counters</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δsteps</strong> = comparisons + rotations done by the splay.</li>
                <li><strong>ΔΦ</strong> shows how much the tree “reshaped” due to rotations.</li>
            </ul>
      `,
      splayBwStepDeleteTitle: "Delete {value}",
      splayBwStepDeleteDetail: `
            <div><strong>What happens</strong></div>
            <div>
                We execute <strong>Delete({value})</strong>: we first splay the target (or last visited) to the root,
                then remove the root and <strong>join</strong> the left and right subtrees.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Join (how deletion works)</strong></div>
            <ul class="ti-ul18">
                <li>If the left subtree is empty → root becomes the right subtree.</li>
                <li>Otherwise: take the maximum node of the left subtree, splay it to the root, then attach the right subtree.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortized intuition</strong></div>
            <div>
                A delete can be expensive in one step, but the restructuring pays back later.
                Over a sequence, splay operations have amortized <strong>O(log n)</strong>.
            </div>
      `,
      splayBwDoneTitle: "End",
      splayBwDoneDetail: "End of the scenario.",
      splaySyntaxModalLabel: "Syntax Commands (Splay Tree)",
      splaySyntaxInfo: `
            <div class="syn-line">Enter commands separated by spaces.</div>
            <div class="syn-line"><span class="syn-label">Supported:</span>
                <code>insert(...)</code>, <code>search(...)</code>, <code>delete(...)</code>
            </div>
            <div class="syn-line">
                Insert can take multiple values: <code>insert(10,5,15)</code>.
            </div>
            <div class="syn-line"><span class="syn-label">Example:</span>
                <code>insert(10,5,15) search(5) delete(10)</code>
            </div>
      `,
      splaySyntaxInputLabel: "Syntax Commands (Splay Tree):",
      splaySyntaxInputPlaceholder: "insert(10,5,15) search(5) delete(10)",
      splaySyntaxInvalidAlert: "Enter valid syntax commands for Splay Tree!",
      splaySynPanelTitle: "SYNTAX MODE",
      splaySynPanelDesc: `
            Click <strong>Next</strong> to execute exactly one command.<br/>
            After each command we show: what happened, whether it was found/deleted, and real measured <strong>Δsteps</strong> + <strong>ΔΦ</strong>.
      `,   
      splayMetricsTitle: "Measured metrics",
      splayMetricsSteps: "Δsteps: <span class=\"potentialValue\">{deltaSteps}</span> (comparisons + rotations)",
      splayMetricsPhi: "Φ: <span class=\"potentialValue\">{phiBefore}</span> → <span class=\"potentialValue\">{phiAfter}</span> (ΔΦ = <span class=\"potentialValue\">{deltaPhi}</span>)",
      splayMetricsFound: "Found: <strong>{found}</strong>",
      splayMetricsDeleted: "Deleted: <strong>{deleted}</strong>",
      splayRandomTooManyTitle: "Cannot generate values",
      splayRandomTooManyText: "You requested {count} unique values, but the range {min}–{max} contains only {maxUnique}. Reduce the count or widen the range.",
      randomInvalidParamsAlert: "Enter valid positive values for minimum, maximum and count. Minimum must also be smaller than maximum.",
      invalidNumberAlert: "Enter a valid positive number!",
      splayFoundTitle: "Found",
      splayFoundText: "Value <strong>{value}</strong> was found and moved to the root.",
      splayDeletedTitle: "Deleted",
      splayDeletedText: "Value <strong>{value}</strong> was successfully deleted."
    }
  },
  cz:{
    common:{
      title_main: "Hlavní Stránka",
      navBrand: "Amortizovaná Složitost",
      aboutAppBtn: "O Mé Bakalářské Práci",
      backBtn: "<i class='fas fa-arrow-left'></i> Zpět",
      algorithm1: "Multipop na Zásobníku",
      algorithm2: "Fronta pomocí dvou zásobníků",
      algorithm3: "Splay strom",
      aboutModalLabel: "O Mé Bakalářské Práci",
      aboutModalBody: `
            <p><strong>Tato bakalářská práce ukazuje amortizovanou složitost tří vybraných algoritmů probíraných v magisterském kurzu teoretické informatiky.</strong></p>

            <p>
                Práce vzniká jako součást dlouhodobého projektu: <strong>výukový server pro předměty teoretické informatiky</strong>,
                tedy sada interaktivních webových stránek, které studentům pomáhají pochopit různé typy úloh a problémů.
                Oproti běžným výukovým textům s pevným počtem příkladů umožňují tyto stránky generovat
                <strong>libovolně mnoho ukázek</strong> na základě vstupů od uživatele.
            </p>

            <h6 class="mt-3"><strong>Téma práce</strong></h6>
            <ul>
                <li><strong>Komponenta výukového serveru TI – Amortizovaná složitost 1</strong></li>
                <li>Jazyk vypracování: <strong>čeština</strong> (aplikace nabízí rozhraní <strong>CZ/EN</strong> pro lepší použitelnost a dostupnost).</li>
            </ul>

            <h6 class="mt-3"><strong>Hlavní cíl</strong></h6>
            <p>
                Cílem je vytvořit komponentu, která pomůže pochopit analyzování složitosti algoritmů pomocí
                <strong>amortizované analýzy</strong> (zejména <strong>potenciálovou metodou</strong> a v interpretaci také účetní metodou).
                Důraz je kladen na názornou simulaci kroků algoritmu a přímé pozorování změn potenciálu v průběhu sekvence operací.
            </p>

            <h6 class="mt-3"><strong>Amortizovaná analýza v této komponentě</strong></h6>
            <p>
                Amortizovaná složitost popisuje <strong>průměrnou cenu operace v celé sekvenci</strong>,
                i když jednotlivé operace mohou být drahé. V teoretické informatice se běžně ukazuje pomocí
                <strong>agregátní metody</strong>, <strong>účetní metody</strong> a <strong>potenciálové metody</strong>.
                Tato komponenta primárně vizualizuje <strong>potenciálovou metodu</strong> tím, že po každém kroku zobrazuje
                aktuální potenciál Φ (lze jej interpretovat i jako “naspořené kredity/mince”).
            </p>

            <h6 class="mt-3"><strong>Co znamená „Počet kroků“</strong></h6>
            <p>
                Počítadlo kroků představuje počet <strong>elementárních operací</strong> provedených během simulace
                (např. vložení/odebrání prvku, přesun jednoho prvku mezi strukturami apod.). Díky tomu lze porovnat
                <strong>nejhorší případ jedné operace</strong> s <strong>amortizovanou cenou</strong> v celé sekvenci.
            </p>

            <h6 class="mt-3"><strong>Co musí webové stránky umožnit (zadání)</strong></h6>
            <ol class="mb-2">
                <li>
                <strong>Zobrazit simulaci běhu alespoň 3 různých algoritmů</strong>, u nichž je vhodné složitost analyzovat amortizovaně.
                </li>
                <li>
                <strong>Uživatel zadává vstupy třemi způsoby</strong>:
                <ul>
                    <li><strong>Manuálně</strong> – uživatelsky přívětivým způsobem.</li>
                    <li><strong>Náhodně</strong> – generování vstupu podle nastavených parametrů.</li>
                    <li><strong>Ukázkové vstupy</strong> – typicky nejlepší/nejhorší případ nebo různě velké scénáře.</li>
                </ul>
                </li>
                <li>
                Při simulaci se zobrazuje:
                <ul>
                    <li><strong>Aktuální stav</strong> výpočtu (např. obsahy datových struktur a jejich změny v čase).</li>
                    <li><strong>Počet kroků</strong> (kolik elementárních operací bylo provedeno).</li>
                    <li><strong>Hodnota potenciálu</strong> (potenciálová metoda) nebo ekvivalentní interpretace „naspořených mincí“.</li>
                </ul>
                </li>
                <li>
                Ke každému algoritmu má být k dispozici i <strong>odvození amortizované složitosti</strong>
                (např. formou statické stránky/sekce).
                </li>
            </ol>

            <h6 class="mt-3"><strong>Jak komponentu používat</strong></h6>
            <ul>
                <li>Vyberte algoritmus a zvolte režim vstupu: <strong>Manuálně</strong>, <strong>Náhodně</strong>, <strong>Nejlepší/Nejhorší případ</strong> nebo <strong>Syntaxe</strong>.</li>
                <li>Sledujte postup změn datové struktury, počet kroků a vývoj <strong>potenciálu</strong>.</li>
                <li>Porovnejte <strong>nejhorší případ jednotlivé operace</strong> s <strong>amortizovanou cenou</strong> v celé sekvenci operací.</li>
            </ul>

            <h6 class="mt-3"><strong>Poznámka ke spolupráci</strong></h6>
            <p class="mb-0">
                Studenti řešící toto zadání s rozdílným číslem v názvu mohou (ale nemusí) spolupracovat například na společném UI,
                avšak každý student implementuje jiné tři algoritmy.
            </p>
      `,
      footerText: "Vytvořil Martin Dressler, DRE0065",
      closeBtn: "Zavřít",
      submitBtn: "Odeslat",
      generateBtn: "Generovat",
      okBtn: "Odeslat",
      messageTitle: "Zpráva",
      manualButton: "Manuálně",
      randomButton: "Náhodně",
      bestWorstButton: "Nejlepší / Nejhorší případ",
      syntaxButton: "Syntaxe",
      randomParamsModalLabel: "Nastavení Náhodných Parametrů",
      rangeMinLabel: "Minimální hodnota:",
      rangeMaxLabel: "Maximální hodnota:",
      countLabel: "Počet Hodnot:",
      stepCount: "Počet Kroků",
      potential: "Potenciál",
      nextButton: "Další",
      startSyntaxBtn: "Spustit Vykonávání",
      endOfExample: "Konec příkazů.",
      endButton: "Konec",
      bestCase: "Nejlepší Případ",
      worstCase: "Nejhorší Případ",
      selectCase: "Vyberte Případ",
      bestWorstDescription: "Vyberte nejlepší nebo nejhorší případ k provedení:",
      executeBestCase: "Provádí se Nejlepší Případ...",
      executeWorstCase: "Provádí se Nejhorší Případ...",
      detailNotProvided: "Detail není k dispozici."
    },
    multipop:{
      manualParamsModalLabel: "Nastavení Parametrů Zásobníku",
      stackValuesLabel: "Zadejte hodnoty zásobníku:",
      multipopTitle: "Multipop na Zásobníku",
      multipopAbout: "O Multipop na Zásobníku",
      multipopDescription: `
            <p>
                <strong>Multipop na zásobníku</strong> je typický příklad pro demonstraci <strong>amortizované analýzy</strong>.
                Pracujeme se zásobníkem se základními operacemi <strong>Push</strong> a <strong>Pop</strong> a rozšiřujeme jej o
                <strong>Multipop(k)</strong>, který odebírá až <em>k</em> prvků z vrcholu.
            </p>

            <h6 class="mt-3"><strong>Operace</strong></h6>
            <ul>
                <li><strong>Push(x)</strong>: vloží <em>x</em> na vrchol zásobníku.</li>
                <li><strong>Pop()</strong>: odebere vrcholový prvek (pokud zásobník není prázdný).</li>
                <li><strong>Multipop(k)</strong>: odebere až <em>k</em> prvků (nebo méně, pokud je v zásobníku prvků méně).</li>
            </ul>

            <h6 class="mt-3"><strong>Proč amortizovaná analýza?</strong></h6>
            <p>
                Jedna operace <strong>Multipop(k)</strong> může mít v nejhorším případě cenu <strong>O(k)</strong>.
                V celé sekvenci operací ale každý prvek může být po vložení odebrán maximálně jednou.
                Proto i když některé kroky stojí hodně, <strong>amortizovaně vychází cena na operaci O(1)</strong>.
            </p>

            <h6 class="mt-3"><strong>Potenciálová metoda (v této simulaci)</strong></h6>
            <p>
                Používáme potenciál <strong>Φ = |S|</strong> (počet prvků aktuálně v zásobníku).
                <br/>
                <strong>Intuice:</strong> Push zvýší potenciál o 1 (ukládáme si “práci do budoucna”),
                Pop/MultiPop potenciál snižují (spotřebováváme uložený potenciál).
            </p>

            <h6 class="mt-3"><strong>Co zde můžete vyzkoušet</strong></h6>
            <ul>
                <li><strong>Manuálně:</strong> provádějte Push/Pop/Multipop a sledujte počet kroků a potenciál.</li>
                <li><strong>Náhodně:</strong> vygenerujte vstupní zásobník podle rozsahu a počtu prvků.</li>
                <li><strong>Nejlepší/nejhorší případ:</strong> spusťte připravený scénář pro názornou ukázku.</li>
                <li><strong>Syntaxe:</strong> proveďte sekvenci kroků postupně (např. <code>push(1,2,3) pop() multipop(2)</code>).</li>
            </ul>

            <h6 class="mt-3"><strong>Co se zobrazuje během běhu</strong></h6>
            <ul class="mb-0">
                <li><strong>Obsah zásobníku</strong> (vizualizace bloky).</li>
                <li><strong>Počet kroků</strong> (počet elementárních operací).</li>
                <li><strong>Potenciál</strong> (Φ) po každém kroku.</li>
                <li><strong>Panel vysvětlení</strong> – popis aktuálního kroku a změny potenciálu.</li>
            </ul>

            <h6 class="mt-3"><strong>Formální definice</strong></h6>
            <p>
                Pracujeme se zásobníkem <strong>S</strong> (LIFO). Operace:
            </p>
            <ul>
                <li><strong>Push(x)</strong>: vloží x na vrchol S.</li>
                <li><strong>Pop()</strong>: odebere vrchol, pokud zásobník není prázdný.</li>
                <li><strong>Multipop(k)</strong>: provede <strong>Pop()</strong> nejvýše k-krát (když dojde zásobník, končí dřív).</li>
            </ul>

            <h6 class="mt-3"><strong>Jednoduchý pseudokód</strong></h6>
            <pre class="mb-2"><code>
    PUSH(S, x):
    S.push(x)

    POP(S):
    pokud S je prázdný: return EMPTY
    return S.pop()

    MULTIPOP(S, k):
    while k &gt; 0 a S není prázdný:
        S.pop()
        k = k - 1
            </code></pre>

            <h6 class="mt-3"><strong>Nejhorší případ vs amortizace</strong></h6>
            <ul>
                <li><strong>Nejhorší případ</strong>: Multipop(k) může udělat až k popů → <strong>O(k)</strong>.</li>
                <li><strong>Klíčová amortizační myšlenka</strong>: každý prvek jde po vložení odebrat maximálně jednou.</li>
                <li>Tedy v celé sekvenci platí: celkový počet popů ≤ celkový počet pushů → průměrně vyjde <strong>O(1)</strong> na operaci.</li>
            </ul>

            <h6 class="mt-3"><strong>Potenciálová metoda (víc explicitně)</strong></h6>
            <p>
                Zvolíme <strong>Φ = |S|</strong> (velikost zásobníku). Amortizovaná cena:
                <br/>
                <strong>â = (skutečná cena) + ΔΦ</strong>.
            </p>
            <ul>
                <li><strong>Push</strong>: skutečná = 1, ΔΦ = +1 → â = 2.</li>
                <li><strong>Pop</strong>: skutečná = 1, ΔΦ = −1 → â = 0.</li>
                <li><strong>Multipop(k)</strong>: skutečná = počet reálně odebraných prvků t, ΔΦ = −t → â = 0.</li>
            </ul>
            <p class="mb-0">
                Intuice: push “ukládá” potenciál do budoucna; pop ho “spotřebuje”. Drahý multipop se zaplatí z dříve uloženého potenciálu.
            </p>

            <h6 class="mt-3"><strong>Účetní pohled (kredity/mince)</strong></h6>
            <ul>
                <li>Za každý <strong>Push</strong> si naúčtuj 2 kredity: 1 zaplatí push hned, 1 se uloží na prvek.</li>
                <li>Když se prvek později odebere (Pop nebo Multipop), zaplatí se to uloženým kreditem.</li>
                <li>Nikdy nejdeš do dluhu → amortizovaná cena je konstantní.</li>
            </ul>

            <h6 class="mt-3"><strong>Hraniční situace (musíš chápat)</strong></h6>
            <ul class="mb-0">
                <li><strong>Prázdný zásobník</strong>: Pop nic neudělá / vrátí prázdno. Multipop skončí hned.</li>
                <li><strong>k větší než velikost</strong>: Multipop jen vyprázdní zásobník.</li>
                <li><strong>Proč “nejvýše k”</strong>: je to zásadní pro správnost i pro amortizovanou analýzu.</li>
            </ul>
      `,
      enterValuePrompt: "Zadejte kladné číslo, které chcete přidat do zásobníku:",
      invalidNumberAlert: "Zadejte platné kladné číslo!",
      stackEmptyAlert: "Zásobník je prázdný!",
      stackEmptyNoPop: "Zásobník je prázdný! Pop se neprovedl.",
      stackEmptyNoMultipop: "Zásobník je prázdný! Multipop se neprovedl.",
      multipopPrompt: "Zadejte počet prvků, které chcete odebrat:",
      pushButton: "Přidat",
      popButton: "Odebrat",
      multipopButton: "Multipop", 
      syntaxModalLabel: "Syntaxové Příkazy (Multipop na Zásobníku)",
      syntaxInfo: `
            <div class="syn-line">Zadejte své syntaxové příkazy níže.</div>
            <div class="syn-line"><span class="syn-label">Podporované:</span>
                <code>push(...)</code>, <code>pop()</code>, <code>multipop(k)</code>
            </div>
            <div class="syn-line">
                Push může mít víc hodnot: <code>push(5,1,2,4,55)</code>.
            </div>
            <div class="syn-line"><span class="syn-label">Příklad:</span>
                <code>push(5,1,2,4,55) pop() pop() multipop(2)</code>
            </div>
      `,
      syntaxInputLabel: "Syntaxové Příkazy (Multipop na Zásobníku):",
      syntaxInputPlaceholder: "push(5,1,2,4,55) pop() pop() multipop(2)",
      mpSynPanelTitle: "SYNTAX REŽIM",
      mpSynPanelDesc: `
            Klikni na <strong>Další</strong> a provede se přesně jeden příkaz.<br/>
            Po každém příkazu ukážeme: co se stalo, jak se změnil <strong>zásobník</strong>,
            a jak se změnil <strong>Počet kroků</strong> + <strong>Potenciál Φ = |S|</strong>.
      `,
      bestCaseDescription: "Toto je nejlepší případ pro algoritmus Multipop.",
      worstCaseDescription: "Toto je nejhorší případ pro algoritmus Multipop.",
      multipopEndBestCase: "Konec nejlepšího případu.",
      multipopEndWorstCase: "Konec nejhoršího případu.",
      pushDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Provádíme <strong>Push({value})</strong>: hodnota se vloží na <em>vrchol</em> zásobníku.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na datovou strukturu</strong></div>
            <ul class="ti-ul18">
                <li>Zásobník se zvětší o <span class="potentialValue">1</span> prvek.</li>
                <li>Nově vložený prvek se stane novým <strong>vrcholem</strong>.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na počítadla (potenciálová metoda)</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δkroky:</strong> <span class="potentialValue">+1</span> (jedna elementární operace push)</li>
                <li><strong>ΔΦ:</strong> <span class="potentialValue">+1</span>, protože Φ = |S| (velikost zásobníku)</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortizační intuice</strong></div>
            <div>
                Ukládáme potenciál do budoucna. Později se může “utrácet” u dražších operací.
            </div>
      `,
      popDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Provádíme <strong>Pop()</strong>: odebereme <em>vrcholový</em> prvek zásobníku.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na datovou strukturu</strong></div>
            <ul class="ti-ul18">
                <li>Odebraný prvek: {removedValue}</li>
                <li>Zásobník se zmenší o <span class="potentialValue">1</span>.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na počítadla (potenciálová metoda)</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δkroky:</strong> <span class="potentialValue">+1</span> (jedna elementární operace pop)</li>
                <li><strong>ΔΦ:</strong> <span class="potentialValue">-1</span>, protože Φ = |S| klesá</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortizační intuice</strong></div>
            <div>
                Spotřebujeme 1 jednotku uloženého potenciálu na “zaplacení” odebrání jednoho prvku.
            </div>
      `,
      multipopDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Provádíme <strong>Multipop({count})</strong>: odebereme až {count} prvků z vrcholu.
                Pokud jich je méně, odebereme všechny.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na datovou strukturu</strong></div>
            <div class="ti-mt8">
                Odebrané prvky: {removedValues}
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na počítadla (potenciálová metoda)</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δkroky:</strong> +{count} (každý odebraný prvek je jeden pop)</li>
                <li><strong>ΔΦ:</strong> -{count}, protože Φ = |S| klesne o stejný počet</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortizační intuice</strong></div>
            <div>
                I když Multipop může být drahý, každý prvek byl předtím jednou vložen,
                takže v celé sekvenci vychází průměrná (amortizovaná) cena na operaci <strong>O(1)</strong>.
            </div>
      `,
      stackLabel: "Zásobník",
      manualValuesRequiredAlert: "Zadejte alespoň jednu kladnou hodnotu zásobníku.",
      manualValuesInvalidAlert: "Zadejte pouze kladná celá čísla oddělená čárkami (např. 1, 2, 3).",
      randomInvalidParamsAlert: "Zadejte platné kladné hodnoty pro minimum, maximum a počet. Minimum musí být zároveň menší než maximum.",
      syntaxInvalidAlert: "Zadejte validní syntaxové příkazy pro Multipop na zásobníku!",
      emptyPopDetail: `
        <div><strong>Co se stane</strong></div>
        <div>
            Provádíme <strong>Pop()</strong>, ale zásobník je už prázdný.
        </div>

        <div class="info-panel-sep"></div>

        <div><strong>Dopad na datovou strukturu</strong></div>
        <ul class="ti-ul18">
            <li>Neodebere se žádný prvek.</li>
            <li>Zásobník zůstává prázdný.</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Dopad na počítadla (potenciálová metoda)</strong></div>
        <ul class="ti-ul18">
            <li><strong>Δkroky:</strong> <span class="potentialValue">+0</span></li>
            <li><strong>ΔΦ:</strong> <span class="potentialValue">0</span>, protože Φ = |S| se nemění</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Proč je to důležité</strong></div>
        <div>
            Tento krok ukazuje hraniční situaci: operace byla zavolána, ale není co odebrat.
        </div>
      `,
      emptyMultipopDetail: `
        <div><strong>Co se stane</strong></div>
        <div>
            Provádíme <strong>Multipop({count})</strong>, ale zásobník je už prázdný.
        </div>

        <div class="info-panel-sep"></div>

        <div><strong>Dopad na datovou strukturu</strong></div>
        <ul class="ti-ul18">
            <li>Neodeberou se žádné prvky.</li>
            <li>Zásobník zůstává prázdný.</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Dopad na počítadla (potenciálová metoda)</strong></div>
        <ul class="ti-ul18">
            <li><strong>Δkroky:</strong> <span class="potentialValue">+0</span></li>
            <li><strong>ΔΦ:</strong> <span class="potentialValue">0</span>, protože Φ = |S| se nemění</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Proč je to důležité</strong></div>
        <div>
            Jde o hraniční situaci: Multipop je sice povolený, ale pokud je zásobník prázdný, nemá co odebrat.
        </div>
      `
    },
    queue:{
      queue2StacksTitle: "Fronta pomocí dvou zásobníků",
      queue2StacksAbout: "O frontě pomocí dvou zásobníků",
      queue2StacksDescription: `
            <p>
                <strong>Fronta pomocí dvou zásobníků</strong> je klasický příklad pro <strong>amortizovanou analýzu</strong>.
                FIFO frontu realizujeme pomocí dvou zásobníků:
                <strong>S<sub>in</sub></strong> (příchozí prvky) a <strong>S<sub>out</sub></strong> (odchozí prvky).
            </p>

            <h6 class="mt-3"><strong>Princip</strong></h6>
            <ul>
                <li><strong>Enqueue(x)</strong>: vloží <em>x</em> do <strong>S<sub>in</sub></strong> (levné, O(1)).</li>
                <li><strong>Dequeue()</strong>: pokud <strong>S<sub>out</sub></strong> není prázdný, odebírá se z něj (O(1)).</li>
                <li>
                Pokud je <strong>S<sub>out</sub></strong> prázdný, přelijí se všechny prvky ze <strong>S<sub>in</sub></strong> do <strong>S<sub>out</sub></strong>
                (každý prvek se přesune nejvýše jednou) a poté se provede odebrání (nejhorší případ O(n)).
                </li>
            </ul>

            <h6 class="mt-3"><strong>Proč amortizovaná analýza?</strong></h6>
            <p>
                Jedna operace <strong>Dequeue</strong> může být drahá, protože transfer může přesouvat mnoho prvků najednou.
                V celé sekvenci ale každý prvek:
                (1) se jednou vloží do <strong>S<sub>in</sub></strong>,
                (2) nejvýše jednou se přesune do <strong>S<sub>out</sub></strong>,
                (3) jednou se odebere ze <strong>S<sub>out</sub></strong>.
                Proto <strong>amortizovaně vychází cena na operaci O(1)</strong>.
            </p>

            <h6 class="mt-3"><strong>Potenciálová metoda (v této simulaci)</strong></h6>
            <p>
                Používáme potenciál <strong>Φ = |S<sub>in</sub>|</strong>.
                <br/>
                <strong>Intuice:</strong> Enqueue zvyšuje Φ o 1 (ukládáme potenciál).
                Při transferu se Φ postupně snižuje až na 0 (spotřebujeme uložený potenciál na “zaplacení” přesunu).
            </p>

            <h6 class="mt-3"><strong>Co zde můžete vyzkoušet</strong></h6>
            <ul>
                <li><strong>Manuálně:</strong> provádějte enqueue/dequeue a sledujte, kdy nastává transfer.</li>
                <li><strong>Náhodně:</strong> vygenerujte počáteční frontu podle rozsahu a počtu prvků.</li>
                <li><strong>Nejlepší/nejhorší případ:</strong> připravené scénáře (levné dequeue vs. první dequeue s transfrem).</li>
                <li><strong>Syntaxe:</strong> postupné provedení sekvence (např. <code>enqueue(1,2,3) dequeue() enqueue(9) dequeue()</code>).</li>
            </ul>

            <h6 class="mt-3"><strong>Co se zobrazuje během běhu</strong></h6>
            <ul class="mb-0">
                <li><strong>Oba zásobníky</strong> (<strong>S<sub>in</sub></strong> a <strong>S<sub>out</sub></strong>) a přesuny prvků mezi nimi.</li>
                <li><strong>Počet kroků</strong> a <strong>potenciál</strong> (Φ) aktualizovaný po každém elementárním kroku.</li>
                <li><strong>Panel vysvětlení</strong> – informace, zda probíhá transfer a proč.</li>
            </ul>

            <h6 class="mt-3"><strong>Invariant (to nejdůležitější)</strong></h6>
            <ul>
                <li><strong>Stack Out</strong> má na vrcholu vždy “čelo fronty” (připravené k dequeue).</li>
                <li><strong>Stack In</strong> drží nově přidané prvky (čekají, až se jednou otočí).</li>
                <li>Skutečné pořadí fronty je: <strong>(vrchol Out → spodek Out) a pak (spodek In → vrchol In)</strong>.</li>
            </ul>

            <h6 class="mt-3"><strong>Jednoduchý pseudokód</strong></h6>
            <pre class="mb-2"><code>
    ENQUEUE(x):
    In.push(x)

    DEQUEUE():
    pokud Out je prázdný:
        while In není prázdný:
        Out.push(In.pop())
    pokud Out je prázdný: return EMPTY
    return Out.pop()
            </code></pre>

            <h6 class="mt-3"><strong>Proč transfer otočí pořadí</strong></h6>
            <p>
                Do In prvky přibývají ve stejném pořadí, v jakém byly enqueuenuté.
                Když je ale popujeme z In a pushujeme do Out, pořadí se obrátí,
                takže nejstarší prvek skončí nahoře v Out → přesně FIFO chování.
            </p>

            <h6 class="mt-3"><strong>Amortizace (argument “každý prvek se přesune max. jednou”)</strong></h6>
            <ul>
                <li>Každý prvek se jednou pushne do <strong>In</strong> (cena 1).</li>
                <li>Maximálně jednou se přesune <strong>In → Out</strong> (pop + push = cena 2).</li>
                <li>Jednou se odebere z <strong>Out</strong> (cena 1).</li>
                <li>Celkem ≤ 4 práce na prvek → průměrně <strong>O(1)</strong> na operaci.</li>
            </ul>

            <h6 class="mt-3"><strong>Potenciálová metoda (víc explicitně)</strong></h6>
            <p>
                Zvolíme <strong>Φ = |In|</strong>. Amortizovaná cena â = skutečná + ΔΦ.
            </p>
            <ul>
                <li><strong>Enqueue</strong>: skutečná = 1, ΔΦ = +1 → â = 2.</li>
                <li><strong>Dequeue bez transferu</strong>: skutečná = 1, ΔΦ = 0 → â = 1.</li>
                <li><strong>Dequeue s transferem t prvků</strong>: skutečná = (2t + 1), ΔΦ = −t → â = t + 1 (v celé sekvenci se to “rozpustí”).</li>
            </ul>
            <p class="mb-0">
                Intuice: enqueue ukládá potenciál, transfer ho spotřebuje.
            </p>

            <h6 class="mt-3"><strong>Časté hraniční stavy</strong></h6>
            <ul class="mb-0">
                <li>Když jsou oba zásobníky prázdné → Dequeue vrátí prázdno.</li>
                <li>Transfer se dělá jen když Out je prázdný (důležité pro správnost i výkon).</li>
                <li>První Dequeue po mnoha Enqueue bývá “drahé” (nejhorší případ), ale amortizovaně to stále vychází O(1).</li>
            </ul>
      `,
      queueManualParamsModalLabel: "Nastavení Parametrů Fronty",
      queueValuesLabel: "Zadejte hodnoty fronty:",
      enqueueButton: "Enqueue",
      dequeueButton: "Dequeue",
      enqueuePrompt: "Zadejte kladné číslo pro enqueue:",
      queueEmptyAlert: "Fronta je prázdná!",
      queueEmptyNoDequeue: "Fronta je prázdná! Dequeue se neprovedl.",
      queueStackInLabel: "Zásobník In",
      queueStackOutLabel: "Zásobník Out",
      queueInfoTransfer: "Zásobník Out je prázdný -> přelévám prvky (O(n))...",
      queueInfoMove: "Přesun {value}: Stack In -> Stack Out",
      queueInfoDequeue: "Dequeue -> odebírám {value}",
      queueInfoBest: "NEJLEPŠÍ: Dequeue ze Stack Out (O(1))",
      queueInfoWorst: "NEJHORŠÍ: první Dequeue vyvolá transfer (O(n))",
      queueBestWorstModalText: "Vyberte nejlepší nebo nejhorší případ k provedení:",
      queueEndBestCase: "Konec nejlepšího případu.",
      queueEndWorstCase: "Konec nejhoršího případu.",
      queueBestCaseDescription: "Toto je nejlepší případ pro frontu pomocí dvou zásobníků (dequeue ze Stack Out v O(1)).",
      queueWorstCaseDescription: "Toto je nejhorší případ pro frontu pomocí dvou zásobníků (první dequeue vynutí transfer ze Stack In do Stack Out v O(n)).",
      queueSyntaxModalLabel: "Syntaxové příkazy (Fronta pomocí dvou zásobníků)",
      queueSyntaxInfo: `
            <div class="syn-line">Zadej příkazy pro frontu níže.</div>
            <div class="syn-line"><span class="syn-label">Podporované:</span>
                <code>enqueue(...)</code>, <code>dequeue()</code>
            </div>
            <div class="syn-line">
                Enqueue může mít víc hodnot: <code>enqueue(1,2,3)</code>.
            </div>
            <div class="syn-line"><span class="syn-label">Příklad:</span>
                <code>enqueue(1,2,3) dequeue() enqueue(99) dequeue()</code>
            </div>
      `,
      queueSyntaxInputLabel: "Syntaxové příkazy (Fronta pomocí dvou zásobníků):",
      queueSyntaxInputPlaceholder: "enqueue(1,2,3) dequeue() enqueue(99) dequeue()",
      queueSyntaxInvalidAlert: "Zadej validní syntaxové příkazy pro Frontu pomocí dvou zásobníků!",
      queueSynPanelTitle: "SYNTAX REŽIM",
      queueSynPanelDesc: `
            Klikni na <strong>Další</strong> a provede se přesně jeden příkaz.<br/>
            Po každém příkazu ukážeme: co se stalo, jestli byl potřeba <strong>transfer</strong>,
            a jak se změnil <strong>Počet kroků</strong> + <strong>Potenciál Φ = |S<sub>in</sub>|</strong>.
      `,
      queueEnqueueDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Provádíme <strong>Enqueue({value})</strong>: vložíme hodnotu do <em>Stack In</em>.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na datovou strukturu</strong></div>
            <ul class="ti-ul18">
                <li>Prvek se přidá do <strong>Stack In</strong>.</li>
                <li>Transfer při enqueue nikdy neběží → je to vždy levné.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na počítadla (potenciálová metoda)</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δkroky:</strong> <span class="potentialValue">+1</span> (push do Stack In)</li>
                <li><strong>ΔΦ:</strong> <span class="potentialValue">+1</span>, protože Φ = |S<sub>in</sub>|</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortizační intuice</strong></div>
            <div>
                Tohle je “uložený” potenciál, který se později použije při transferu do <em>Stack Out</em>.
            </div>
      `,
      queueDequeueDetailSimple: `
            <div><strong>Co se stane</strong></div>
            <div>
                Provádíme <strong>Dequeue()</strong> a <em>Stack Out</em> není prázdný:
                odebereme vrchol ze <em>Stack Out</em>.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na datovou strukturu</strong></div>
            <ul class="ti-ul18">
                <li>Odebraný prvek: {removedValue}</li>
                <li><strong>Stack In</strong> se nemění → potenciál zůstává {potential}</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na počítadla</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δkroky:</strong> <span class="potentialValue">+1</span> (pop ze Stack Out)</li>
                <li><strong>ΔΦ:</strong> <span class="potentialValue">0</span> (Φ závisí jen na Stack In)</li>
            </ul>
      `,
      queueDequeueDetailTransfer: `
            <div><strong>Co se stane</strong></div>
            <div>
                <em>Stack Out</em> je prázdný, takže nejdřív musíme udělat <strong>transfer</strong>.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Transfer vysvětlení (proč to může stát O(n))</strong></div>
            <ul class="ti-ul18">
                <li>Opakujeme: <strong>pop</strong> ze <em>Stack In</em> a <strong>push</strong> do <em>Stack Out</em> (tím se otočí pořadí).</li>
                <li>Po transferu je “nejstarší” prvek nahoře ve Stack Out → jde odebrat.</li>
                <li>Potom uděláme finální <strong>pop</strong> ze <em>Stack Out</em> = výsledek Dequeue.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Výsledek</strong></div>
            <ul class="ti-ul18">
                <li>Odebraný prvek: {removedValue}</li>
                <li>Potenciál po transferu je {potential} (typicky 0)</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortizační intuice</strong></div>
            <div>
                Jeden Dequeue může být drahý, ale každý prvek se přesune nejvýše jednou,
                takže v celé sekvenci vychází amortizovaně <strong>O(1)</strong>.
            </div>
      `,
      queueInfoBestTitle: "NEJLEPŠÍ PŘÍPAD",
      queueInfoBestDetail: `
            <div><strong>Proč je to levné</strong></div>
            <div>
                V tomto scénáři už <em>Stack Out</em> obsahuje prvky, takže <strong>Dequeue()</strong>
                je jen jeden pop ze Stack Out → <strong>O(1)</strong>.
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Potenciálová metoda</strong></div>
            <div>
                Φ = |S<sub>in</sub>|. Protože tady nesaháme na Stack In, Φ zůstává stejné (často 0).
            </div>
      `,
      queueInfoWorstTitle: "NEJHORŠÍ PŘÍPAD",
      queueInfoWorstDetail: `
            <div><strong>Proč je to drahé</strong></div>
            <div>
                Tady začíná <em>Stack Out</em> prázdný, takže první <strong>Dequeue()</strong> vyvolá
                <strong>transfer</strong> všech prvků ze Stack In do Stack Out → nejhorší případ <strong>O(n)</strong>.
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Amortizační myšlenka</strong></div>
            <div>
                I když jeden dequeue může být drahý, každý prvek se přenese nejvýše jednou,
                takže v celé sekvenci vychází amortizovaně <strong>O(1)</strong>.
            </div>
      `,
      queueInfoTransferTitle: "Transfer (Stack Out je prázdný)",
      queueInfoTransferDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Stack Out je prázdný, proto musíme přesunout všechny prvky ze <em>Stack In</em> do <em>Stack Out</em>.
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Proč to děláme</strong></div>
            <div>
                Transfer otočí pořadí prvků, takže „nejstarší“ prvek se dostane nahoru do Stack Out (FIFO chování).
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Potenciál Φ</strong></div>
            <div>
                Φ = |S<sub>in</sub>| se během transferu snižuje, protože Stack In se postupně vyprazdňuje.
            </div>
      `,
      queueInfoMoveTitle: "Přesun <span class=\"pushValue\">{value}</span> (In → Out)",
      queueInfoMoveDetail: `
            <div><strong>Tento mikro-krok</strong></div>
            <ul class="ti-ul18">
                <li><strong>Pop</strong> <span class="pushValue">{value}</span> ze <em>Stack In</em> (1 krok)</li>
                <li><strong>Push</strong> <span class="pushValue">{value}</span> do <em>Stack Out</em> (1 krok)</li>
            </ul>
            <div class="info-panel-sep"></div>
            <div><strong>Potenciál Φ</strong></div>
            <div>
                Φ se sníží o <span class="potentialValue">1</span>, protože Stack In přišel o jeden prvek.
            </div>
      `,
      queueInfoDequeueTitle: "Dequeue <span class=\"popValue\">{value}</span>",
      queueInfoDequeueDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Odebereme vrcholový prvek ze <em>Stack Out</em>. To je „front“ fronty (FIFO).
            </div>
            <div class="info-panel-sep"></div>
            <div><strong>Potenciál Φ</strong></div>
            <div>
                Φ zůstává <span class="potentialValue">{potential}</span>, protože Φ závisí jen na Stack In.
            </div>
      `,
      manualValuesRequiredAlert: "Zadejte alespoň jednu kladnou hodnotu fronty.",
      manualValuesInvalidAlert: "Zadejte pouze kladná celá čísla oddělená čárkami (např. 1, 2, 3).",
      randomInvalidParamsAlert: "Zadejte platné kladné hodnoty pro minimum, maximum a počet. Minimum musí být zároveň menší než maximum.",
      invalidNumberAlert: "Zadejte platné kladné číslo!",
      emptyDequeueDetail: `
        <div><strong>Co se stane</strong></div>
        <div>
            Provádíme <strong>Dequeue()</strong>, ale jak <em>Stack In</em>, tak <em>Stack Out</em> jsou prázdné.
        </div>

        <div class="info-panel-sep"></div>

        <div><strong>Dopad na datovou strukturu</strong></div>
        <ul class="ti-ul18">
            <li>Neodebere se žádný prvek.</li>
            <li>Fronta zůstává prázdná.</li>
            <li>Neprovede se ani transfer, protože není co přesouvat.</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Dopad na počítadla (potenciálová metoda)</strong></div>
        <ul class="ti-ul18">
            <li><strong>Δkroky:</strong> <span class="potentialValue">+0</span></li>
            <li><strong>ΔΦ:</strong> <span class="potentialValue">0</span>, protože Φ = |S<sub>in</sub>| se nemění</li>
        </ul>

        <div class="info-panel-sep"></div>

        <div><strong>Proč je to důležité</strong></div>
        <div>
            Jde o hraniční situaci: Dequeue je zavoláno, ale fronta neobsahuje žádné prvky.
        </div>
      `
    },
    splay:{
      splayTreeTitle: "Splay strom",
      splayTreeAbout: "O Splay stromu",
      splayTreeDescription: `
            <p>
                <strong>Splay strom</strong> je <strong>samopřizpůsobující se binární vyhledávací strom (BST)</strong>.
                Po každém přístupu (nejčastěji <em>Search</em>, ale také <em>Insert</em> / <em>Delete</em>)
                se navštívený vrchol přesune do kořene pomocí sekvence <strong>rotací</strong>.
                Tomu se říká <strong>splaying</strong>.
            </p>

            <h6 class="mt-3"><strong>Operace</strong></h6>
            <ul>
                <li><strong>Insert(x)</strong>: vložíme jako v BST a pak <strong>splay</strong> vložený vrchol do kořene.</li>
                <li><strong>Search(x)</strong>: hledáme jako v BST; pokud se najde, splay nalezený vrchol do kořene. Pokud ne, splay <em>poslední navštívený</em> vrchol.</li>
                <li><strong>Delete(x)</strong>: typicky nejdřív splay <em>x</em> do kořene (nebo splay poslední navštívený), pak kořen smažeme a <em>spojíme</em> podstromy.</li>
            </ul>

            <h6 class="mt-3"><strong>Hlavní myšlenka</strong></h6>
            <p>
                Běžný BST se může časem velmi nevyvážit (téměř jako spojový seznam), což zdraží některé operace.
                Splay strom se při používání průběžně „opravuje“: často navštěvované vrcholy posouvá blíž ke kořeni,
                takže další přístupy bývají levnější.
            </p>

            <h6 class="mt-3"><strong>Rotace (Splaying)</strong></h6>
            <ul>
                <li><strong>Zig</strong>: jedna rotace, když je rodič vrcholu přímo kořen.</li>
                <li><strong>Zig-Zig</strong>: dvě rotace stejným směrem (vrchol i rodič jsou oba leví nebo oba praví potomci).</li>
                <li><strong>Zig-Zag</strong>: dvě rotace opačnými směry (levý-pravý nebo pravý-levý případ).</li>
            </ul>

            <h6 class="mt-3"><strong>Proč amortizovaná analýza?</strong></h6>
            <p>
                Jedna operace může být drahá: v nejhorším případě může splaying trvat až <strong>O(n)</strong> rotací
                (např. u hodně nevyváženého stromu). Ale v celé <strong>sekvenci</strong> operací vychází průměrná cena
                amortizovaně <strong>O(log n)</strong> na operaci. Intuice je, že dražší operace strom přestaví tak,
                že mnoho dalších operací bude potom levnějších.
            </p>

            <h6 class="mt-3"><strong>Potenciálová metoda (teoretické vysvětlení)</strong></h6>
            <p>
                Standardní důkaz používá potenciál podle velikostí podstromů:
                <br/>
                <strong>Φ(T) = Σ<sub>v</sub> log<sub>2</sub>( velikost(podstrom(v)) )</strong>.
                <br/>
                <strong>Intuice:</strong> Φ vyjadřuje, jak je strom „dobře tvarovaný“. Rotace mění Φ
                a amortizovaná cena je <strong>skutečná cena + ΔΦ</strong>, což vede na odhad O(log n).
            </p>

            <h6 class="mt-3"><strong>Co znamená „Počet kroků“</strong></h6>
            <p>
                Počítadlo kroků představuje počet <strong>elementárních akcí</strong> během simulace.
                U splay stromu typicky počítáme hlavně:
                <strong>porovnání</strong> při průchodu BST a <strong>rotace</strong> při splay.
            </p>

            <h6 class="mt-3"><strong>Co zde můžete vyzkoušet</strong></h6>
            <ul>
                <li><strong>Manuálně:</strong> dělej Insert / Search / Delete a sleduj, jak se strom sám přestavuje.</li>
                <li><strong>Náhodně:</strong> vygeneruj počáteční strom z rozsahu a počtu prvků.</li>
                <li><strong>Nejlepší/nejhorší případ:</strong> připravené scénáře pro levný vs. drahý přístup.</li>
                <li><strong>Syntaxe:</strong> provádění sekvence krok po kroku (např. <code>insert(10,5,15) search(5) delete(10)</code>).</li>
            </ul>

            <h6 class="mt-3"><strong>Co se zobrazuje během běhu</strong></h6>
            <ul class="mb-0">
                <li><strong>Struktura stromu</strong> (vrcholy + hrany) a plynulé změny při rotacích.</li>
                <li><strong>Zvýrazněná cesta</strong> během operací (které vrcholy se navštívily).</li>
                <li><strong>Počet kroků</strong> aktualizovaný po elementárních akcích.</li>
                <li><strong>Potenciál Φ</strong> aktualizovaný po změnách (základ pro amortizaci).</li>
                <li><strong>Panel vysvětlení</strong> – co se stalo v aktuálním kroku a proč se mění Φ.</li>
            </ul>

            <h6 class="mt-3"><strong>Jak přesně funguje splaying (Zig / Zig-Zig / Zig-Zag)</strong></h6>
            <ul>
                <li><strong>Zig</strong>: rodič vrcholu je kořen → udělá se jedna rotace.</li>
                <li><strong>Zig-Zig</strong>: vrchol i rodič jsou oba leví potomci (nebo oba praví) → dvě rotace stejným směrem.</li>
                <li><strong>Zig-Zag</strong>: vrchol je levý a rodič pravý (nebo obráceně) → dvě rotace opačnými směry.</li>
            </ul>

            <h6 class="mt-3"><strong>Proč splay i po Search, když se hodnota nenašla</strong></h6>
            <p>
                I “nenalezeno” nám řekne, kde by hodnota byla.
                Když do kořene splayneme <em>poslední navštívený</em> vrchol,
                posuneme relevantní část stromu nahoru, což často zlevní podobné budoucí dotazy.
            </p>

            <h6 class="mt-3"><strong>Typický postup Delete (vysokoúrovňově)</strong></h6>
            <ol>
                <li>Splay cílový vrchol (nebo poslední navštívený) do kořene.</li>
                <li>Smaž kořen → zůstane levý podstrom L a pravý podstrom R.</li>
                <li><strong>Join</strong>: když L neexistuje → kořen je R. Jinak splay maximum(L) do kořene a připoj R.</li>
            </ol>

            <h6 class="mt-3"><strong>Co prakticky znamená amortizované O(log n)</strong></h6>
            <p>
                Jedna operace může být pořád <strong>O(n)</strong> (hodně nevyvážený strom, mnoho rotací).
                Ale v dlouhé sekvenci operací strom splayingem průběžně mění tvar tak,
                že <strong>průměrná cena na operaci je O(log n)</strong>.
            </p>
            <ul>
                <li>Drahé operace se “vrací” tím, že zlepší strukturu pro další operace.</li>
                <li>Proto splay strom často funguje dobře v praxi, když se některé hodnoty používají častěji než jiné.</li>
            </ul>

            <h6 class="mt-3"><strong>Potenciál Φ (intuice, co měří)</strong></h6>
            <p>
                Klasický potenciál používá velikosti podstromů:
                <strong>Φ(T) = Σ log2(velikost(podstrom(v)))</strong>.
                <br/>
                Intuice: Φ vyjadřuje, jak moc je strom “dobře tvarovaný”. Rotace mění velikosti podstromů,
                takže ΔΦ říká, jak moc jsme strukturálně pokročili.
            </p>

            <h6 class="mt-3"><strong>V této simulaci: co se počítá jako “krok”</strong></h6>
            <ul class="mb-0">
                <li><strong>Porovnání</strong> během průchodu BST cestou.</li>
                <li><strong>Rotace</strong> během splay.</li>
                <li>Takže Počet kroků ≈ “reálná práce” v jedné operaci.</li>
            </ul>
      `,
      splayInsertButton: "Vložit",
      splaySearchButton: "Hledat",
      splayDeleteButton: "Smazat",
      splayNotImplemented: "Tento režim zatím není implementovaný (brzy doplníme).",
      splayInitTitle: "Nastavení Parametrů Stromu",
      splayInitLabel: "Zadejte hodnoty stromu:",
      splayInitPlaceholder: "1, 2, 3, 4",
      splayInitInvalid: "Zadejte alespoň jedno platné kladné číslo (např. 1,2,3).",
      splaySearchPrompt: "Zadejte hodnotu, kterou chcete hledat:",
      splayInsertPrompt: "Zadejte hodnotu, kterou chcete vložit:",
      splayDeletePrompt: "Zadejte hodnotu, kterou chcete smazat:",
      splayNotFoundTitle: "Nenalezeno",
      splayNotFoundText: "Hodnota <strong>{value}</strong> nebyla ve stromu nalezena.",
      splayEmptyTreeText: "Strom je prázdný.",
      splayAlreadyExistsTitle: "Už existuje",
      splayAlreadyExistsText: "Hodnota <strong>{value}</strong> už ve stromu existuje. Vložení se neprovedlo.",
      splayRandomParamsModalLabel: "Nastavení Náhodných Parametrů",
      splayRandomTooManyAlert: "Počet je větší než počet unikátních hodnot v rozsahu. Zvětšete rozsah nebo snižte počet.",
      splayInitialValuesLabel: "Počáteční hodnoty:",
      splayGeneratedValuesLabel: "Vygenerované hodnoty:",
      splayBestWorstDescription: "Vyberte nejlepší nebo nejhorší případ k provedení:",
      splayBwBestTitle: "NEJLEPŠÍ PŘÍPAD",
      splayBwWorstTitle: "NEJHORŠÍ PŘÍPAD",
      splayBwBestDesc: `
            Cíl: ukázat levné operace (málo rotací).<br/>
            Postavíme menší “rozumný” strom a provedeme operaci na mělkém vrcholu.
            <ul class="ti-ul16">
                <li><strong>Počet kroků</strong> = porovnání + rotace.</li>
                <li><strong>Potenciál Φ</strong> počítáme jako Σ log2(velikost_podstromu(v)).</li>
            </ul>
      `,
      splayBwWorstDesc: `
            Cíl: ukázat drahý přístup.<br/>
            Vytvoříme hodně nevyvážený strom (jako seznam), pak sáhneme/smažeme hluboký vrchol → mnoho rotací (nejhorší O(n)).
            <ul class="ti-ul16">
                <li>I když je jeden krok drahý, amortizovaně to vychází dobře v celé sekvenci.</li>
                <li>Navíc ukazujeme reálně naměřené <strong>Δkroky</strong> a <strong>ΔΦ</strong>.</li>
            </ul>
      `,
      splayBwStepInsertTitle: "Vložit {value}",
      splayBwStepInsertDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Provádíme <strong>Insert({value})</strong>: nejdřív vložíme jako v běžném BST,
                potom vložený vrchol <strong>splay</strong> rotacemi až do kořene.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Dopad na strom</strong></div>
            <ul class="ti-ul18">
                <li>Vrchol vznikne jako list na správném místě (BST pravidla).</li>
                <li>Pak rotace (Zig / Zig-Zig / Zig-Zag) posunou vrchol nahoru až do <strong>kořene</strong>.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Co znamená Počet kroků</strong></div>
            <ul class="ti-ul18">
                <li>Porovnání při sestupu stromem (hledání místa).</li>
                <li>Rotace provedené při splay.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Potenciál Φ</strong></div>
            <div>
                Φ je založený na velikostech podstromů: <strong>Φ = Σ log2(velikost(podstrom(v)))</strong>.
                Rotace mění velikosti podstromů, takže Φ se může měnit nahoru/dolů.
            </div>
      `,
      splayBwStepSearchTitle: "Hledat {value}",
      splayBwStepSearchDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Provádíme <strong>Search({value})</strong>: procházíme jako v BST.
                Když se vrchol najde, splay se do kořene. Když se nenajde, splay se <em>poslední navštívený</em> vrchol.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Proč splay i při “nenalezeno”</strong></div>
            <div>
                I neúspěšné hledání ukáže, kde by hodnota byla.
                Splay posledního navštíveného vrcholu často zlepší tvar stromu pro další operace.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Měřené hodnoty</strong></div>
            <ul class="ti-ul18">
                <li><strong>Δkroky</strong> = porovnání + rotace provedené splay.</li>
                <li><strong>ΔΦ</strong> ukazuje, jak moc se strom “přetvaroval” rotacemi.</li>
            </ul>
      `,
      splayBwStepDeleteTitle: "Smazat {value}",
      splayBwStepDeleteDetail: `
            <div><strong>Co se stane</strong></div>
            <div>
                Provádíme <strong>Delete({value})</strong>: nejdřív splay cílový (nebo poslední navštívený) vrchol do kořene,
                potom kořen smažeme a <strong>spojíme</strong> levý a pravý podstrom.
            </div>

            <div class="info-panel-sep"></div>

            <div><strong>Spojení podstromů (jak funguje delete)</strong></div>
            <ul class="ti-ul18">
                <li>Když levý podstrom neexistuje → kořenem se stane pravý podstrom.</li>
                <li>Jinak: vezmeme maximum z levého podstromu, splay do kořene, a připojíme pravý podstrom.</li>
            </ul>

            <div class="info-panel-sep"></div>

            <div><strong>Amortizační intuice</strong></div>
            <div>
                Jedna operace může být drahá, ale přestavba stromu se “vrátí” v dalších operacích.
                V celé sekvenci vychází amortizovaně <strong>O(log n)</strong>.
            </div>
      `,
      splayBwDoneTitle: "Konec",
      splayBwDoneDetail: "Konec scénáře.",
      splaySyntaxModalLabel: "Syntaxové příkazy (Splay strom)",
      splaySyntaxInfo: `
            <div class="syn-line">Zadej příkazy oddělené mezerami.</div>
            <div class="syn-line"><span class="syn-label">Podporované:</span>
                <code>insert(...)</code>, <code>search(...)</code>, <code>delete(...)</code>
            </div>
            <div class="syn-line">
                Insert může mít víc hodnot: <code>insert(10,5,15)</code>.
            </div>
            <div class="syn-line"><span class="syn-label">Příklad:</span>
                <code>insert(10,5,15) search(5) delete(10)</code>
            </div>
      `,
      splaySyntaxInputLabel: "Syntaxové příkazy (Splay strom):",
      splaySyntaxInputPlaceholder: "insert(10,5,15) search(5) delete(10)",
      splaySyntaxInvalidAlert: "Zadej validní syntaxové příkazy pro Splay strom!",
      splaySynPanelTitle: "SYNTAX REŽIM",
      splaySynPanelDesc: `
            Klikni na <strong>Další</strong> a provede se přesně jeden příkaz.<br/>
            Po každém kroku ukážeme: co se stalo, jestli se našlo/smazalo, a reálně naměřené <strong>Δkroky</strong> + <strong>ΔΦ</strong>.
      `,
      splayMetricsTitle: "Naměřené metriky",
      splayMetricsSteps: "Δkroky: <span class=\"potentialValue\">{deltaSteps}</span> (porovnání + rotace)",
      splayMetricsPhi: "Φ: <span class=\"potentialValue\">{phiBefore}</span> → <span class=\"potentialValue\">{phiAfter}</span> (ΔΦ = <span class=\"potentialValue\">{deltaPhi}</span>)",
      splayMetricsFound: "Nalezeno: <strong>{found}</strong>",
      splayMetricsDeleted: "Smazáno: <strong>{deleted}</strong>",
      splayRandomTooManyTitle: "Nelze vygenerovat hodnoty",
      splayRandomTooManyText: "Požaduješ {count} unikátních hodnot, ale interval {min}–{max} obsahuje jen {maxUnique}. Sniž počet nebo rozšiř interval.",
      randomInvalidParamsAlert: "Zadejte platné kladné hodnoty pro minimum, maximum a počet. Minimum musí být zároveň menší než maximum.",
      invalidNumberAlert: "Zadejte platné kladné číslo!",
      splayFoundTitle: "Nalezeno",
      splayFoundText: "Hodnota <strong>{value}</strong> byla nalezena a přesunuta do kořene.",
      splayDeletedTitle: "Smazáno",
      splayDeletedText: "Hodnota <strong>{value}</strong> byla úspěšně smazána."
    }
  }
};