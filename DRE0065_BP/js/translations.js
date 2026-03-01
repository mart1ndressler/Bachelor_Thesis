window.translations = 
{
    en: 
    {
        title_main: "Main Page",
        navBrand: "Amortised Complexity",
        aboutAppBtn: "About my bachelor's thesis",
        backBtn: "<i class='fas fa-arrow-left'></i> Back",
        algorithm1: "Multipop on Stack",
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
        closeBtn: "Close",
        manualParamsModalLabel: "Set Stack Parameters",
        stackValuesLabel: "Enter stack values:",
        submitBtn: "Submit",
        randomParamsModalLabel: "Set Random Stack Parameters",
        rangeMinLabel: "Minimum value:",
        rangeMaxLabel: "Maximum value:",
        countLabel: "Number of Values:",
        generateBtn: "Generate",
        footerText: "Created by Martin Dressler, DRE0065",
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
        `,
        manualButton: "Manually",
        randomButton: "Randomly",
        bestWorstButton: "Best / Worst case",
        enterValuePrompt: "Enter the positive number you want to add to the stack:",
        invalidNumberAlert: "Enter a valid positive number!",
        stackEmptyAlert: "Stack is empty!",
        multipopPrompt: "Enter the number of elements to remove:",
        stepCount: "Step Count",
        potential: "Potential",
        pushButton: "Push",
        popButton: "Pop",
        multipopButton: "Multipop",
        syntaxButton: "Syntax",
        syntaxModalLabel: "Syntax Commands (Multipop on Stack)",
        syntaxInfo: `
        <div class="syn-line">Enter your syntax commands below.</div>
        <div class="syn-line"><span class="syn-label">Supported:</span>
            <code>push(...)</code>, <code>pop()</code>, <code>multipop(k)</code>
        </div>
        <div class="syn-line"><span class="syn-label">Example:</span>
            <code>push(5,1,2,4,55) pop() pop() multipop(2)</code>
        </div>`,
        syntaxInputLabel: "Syntax Commands (Multipop on Stack):",
        syntaxInputPlaceholder: "push(5,1,2,4,55) pop() pop() multipop(2)",
        exampleInfo: "This is how your commands will be executed step-by-step:",
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
        closeExecutionBtn: "Close",
        bestCaseDescription: "This is the best case scenario for the Multipop algorithm.",
        worstCaseDescription: "This is the worst case scenario for the Multipop algorithm.",
        pushDetail: "We're pushing element {value} onto the stack. Potential increases by <span class=\"potentialValue\">1</span>.",
        popDetail: "We remove the top element {removedValue} from the stack. Potential decreases by <span class=\"potentialValue\">1</span>.",
        multipopDetail: "We remove {count} elements at once: {removedValues}. Potential decreases by <span class=\"potentialValue\">{count}</span>.",
        algorithm2: "Queue using Two Stacks",
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
        `,
        queueManualParamsModalLabel: "Set Queue Parameters",
        queueValuesLabel: "Enter queue values (front -> back):",
        enqueueButton: "Enqueue",
        dequeueButton: "Dequeue",
        enqueuePrompt: "Enter a positive number to enqueue:",
        queueEmptyAlert: "Queue is empty!",
        detailNotProvided: "Detail not provided.",
        noDetailProvided: "No detail provided.",
        stackEmptyNoPop: "Stack is empty! No pop performed.",
        stackEmptyNoMultipop: "Stack is empty! No multipop performed.",
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
        queueSyntaxModalLabel: "Syntax Commands (Queue using Two Stacks)",
        queueSyntaxInfo: `
        <div class="syn-line">Enter your queue commands below.</div>
        <div class="syn-line"><span class="syn-label">Supported:</span>
            <code>enqueue(...)</code>, <code>dequeue()</code>
        </div>
        <div class="syn-line"><span class="syn-label">Example:</span>
            <code>enqueue(1,2,3) dequeue() enqueue(99) dequeue()</code>
        </div>`,
        queueSyntaxInputLabel: "Syntax Commands (Queue using Two Stacks):",
        queueSyntaxInputPlaceholder: "enqueue(1,2,3) dequeue() enqueue(99) dequeue()",
        queueSyntaxInvalidAlert: "Enter valid queue syntax commands!",
        queueEnqueueDetail: "We enqueue {value} -> push to Stack In. Potential increases by <span class=\"potentialValue\">1</span>.",
        queueDequeueDetailSimple: "We dequeue from Stack Out → removed {removedValue}. Potential stays <span class=\"potentialValue\">{potential}</span>.",
        queueDequeueDetailTransfer: "Stack Out is empty -> transfer all items from Stack In to Stack Out (O(n)), then dequeue removed {removedValue}. Potential becomes <span class=\"potentialValue\">0</span>.",
        queueEmptyNoDequeue: "Queue is empty! No dequeue performed.",
        queueBestCaseDescription: "This is the best case scenario for Queue using Two Stacks (dequeue from Stack Out in O(1)).",
        queueWorstCaseDescription: "This is the worst case scenario for Queue using Two Stacks (first dequeue triggers a transfer from Stack In to Stack Out in O(n)).",
        queueInfoTransferTitle: "Transfer (Stack Out empty)",
        queueInfoTransferDetail: "Stack Out is empty → transfer all items from <em>Stack In</em> to <em>Stack Out</em> (worst-case <strong>O(n)</strong>).",
        queueInfoMoveTitle: "Move <span class=\"pushValue\">{value}</span>",
        queueInfoMoveDetail: "Pop from <em>Stack In</em> and push to <em>Stack Out</em>. Potential decreases by <span class=\"potentialValue\">1</span>.",
        queueInfoDequeueTitle: "Dequeue <span class=\"popValue\">{value}</span>",
        queueInfoDequeueDetail: "Remove from <em>Stack Out</em>. Potential stays <span class=\"potentialValue\">{potential}</span>.",
        okBtn: "OK",
        cancelBtn: "Cancel",
        messageTitle: "Message",
        multipopEndBestCase: "End of the best case.",
        multipopEndWorstCase: "End of the worst case.",
        algorithm3: "Splay Tree",
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
        `,
        splayInsertButton: "Insert",
        splaySearchButton: "Search",
        splayResetButton: "Reset",
        splayNotImplemented: "This mode is not implemented yet (coming soon).",
        splaySearchPrompt: "Enter the value to search for:",
        splayInitTitle: "Initial values",
        splayInitLabel: "Enter initial values (comma separated):",
        splayInitPlaceholder: "1, 2, 3, 4",
        splayInitInvalid: "Enter at least one valid positive number (e.g., 1,2,3).",
        splayDeleteButton: "Delete",
        splayDeletePrompt: "Enter the value to delete:",
        splayNotFoundTitle: "Not found",
        splayNotFoundText: "Value <strong>{value}</strong> was not found in the tree.",
        splayEmptyTreeText: "Tree is empty.",
        splayAlreadyExistsTitle: "Already exists",
        splayAlreadyExistsText: "Value <strong>{value}</strong> is already in the tree. No insertion was performed.",
        splayRandomParamsModalLabel: "Set Random Tree Parameters",
        splayRandomTooManyAlert: "Count is bigger than the number of unique values in the range. Increase range or lower count.",
        splayInitialValuesLabel: "Initial values:",
        splayGeneratedValuesLabel: "Generated values:",
        splayBestWorstDescription: "Select Best or Worst case to execute (Splay Tree):",
        splayBwBestTitle: "BEST CASE",
        splayBwBestDesc: "We do operations that stay cheap (few rotations).",
        splayBwWorstTitle: "WORST CASE",
        splayBwWorstDesc: "We create a skewed tree, then access a deep node → many rotations (O(n)).",
        splayBwStepInsertTitle: "Insert {value}",
        splayBwStepInsertDetail: "Insert like in a BST, then splay the inserted node to the root.",
        splayBwStepSearchTitle: "Search {value}",
        splayBwStepSearchDetail: "Search like in a BST, then splay the accessed node (or last visited) to the root.",
        splayBwStepDeleteTitle: "Delete {value}",
        splayBwStepDeleteDetail: "First splay {value} to the root, then remove it and join subtrees.",
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
        </div>`,
        splaySyntaxInputLabel: "Syntax Commands (Splay Tree):",
        splaySyntaxInputPlaceholder: "insert(10,5,15) search(5) delete(10)",
        splaySyntaxInvalidAlert: "Enter valid splay syntax commands!",
        splaySynPanelTitle: "SYNTAX MODE",
        splaySynPanelDesc: `
        Click <strong>Next</strong> to execute exactly one command.<br/>
        After each command we show: what happened, whether it was found/deleted, and real measured <strong>Δsteps</strong> + <strong>ΔΦ</strong>.`,
        splayBwBestDesc: `
        Goal: keep operations cheap (few rotations).<br/>
        We build a small balanced-ish tree and do an operation that touches a shallow node.
        <ul style="text-align:left;margin:8px 0 0 16px;">
            <li><strong>Step Count</strong> increases by comparisons + rotations.</li>
            <li><strong>Potential Φ</strong> is computed as Σ log2(size(subtree(v))).</li>
        </ul>`,
        splayBwWorstDesc: `
        Goal: demonstrate expensive access.<br/>
        We create a skewed tree (like a linked list), then access/remove a deep node → many rotations (worst-case O(n)).
        <ul style="text-align:left;margin:8px 0 0 16px;">
            <li>Even when one step is expensive, splay has good amortized behavior over sequences.</li>
            <li>We also show measured <strong>Δsteps</strong> and <strong>ΔΦ</strong>.</li>
        </ul>`,
        splayMetricsTitle: "Measured metrics",
        splayMetricsSteps: "Δsteps: <span class=\"potentialValue\">{deltaSteps}</span> (comparisons + rotations)",
        splayMetricsPhi: "Φ: <span class=\"potentialValue\">{phiBefore}</span> → <span class=\"potentialValue\">{phiAfter}</span> (ΔΦ = <span class=\"potentialValue\">{deltaPhi}</span>)",
        splayMetricsFound: "Found: <strong>{found}</strong>",
        splayMetricsDeleted: "Deleted: <strong>{deleted}</strong>",
    },
    cz: 
    {
        title_main: "Hlavní Stránka",
        navBrand: "Amortizovaná Složitost",
        aboutAppBtn: "O Mé Bakalářské Práci",
        backBtn: "<i class='fas fa-arrow-left'></i> Zpět",
        algorithm1: "Multipop na Zásobníku",
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
        closeBtn: "Zavřít",
        manualParamsModalLabel: "Nastavení Parametrů Zásobníku",
        stackValuesLabel: "Zadejte hodnoty zásobníku:",
        submitBtn: "Odeslat",
        randomParamsModalLabel: "Nastavení Náhodných Parametrů Zásobníku",
        rangeMinLabel: "Minimální hodnota:",
        rangeMaxLabel: "Maximální hodnota:",
        countLabel: "Počet Hodnot:",
        generateBtn: "Generovat",
        footerText: "Vytvořil Martin Dressler, DRE0065",
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
        `,
        manualButton: "Manuálně",
        randomButton: "Náhodně",
        bestWorstButton: "Nejlepší / Nejhorší případ",
        enterValuePrompt: "Zadejte kladné číslo, které chcete přidat do zásobníku:",
        invalidNumberAlert: "Zadejte platné kladné číslo!",
        stackEmptyAlert: "Zásobník je prázdný!",
        multipopPrompt: "Zadejte počet prvků, které chcete odebrat:",
        stepCount: "Počet Kroků",
        potential: "Potenciál",
        pushButton: "Přidat",
        popButton: "Odebrat",
        multipopButton: "Multipop",
        syntaxButton: "Syntaxe",
        syntaxModalLabel: "Syntaxové Příkazy (Multipop na Zásobníku)",
        syntaxInfo: `
        <div class="syn-line">Zadejte své syntaxové příkazy níže.</div>
        <div class="syn-line"><span class="syn-label">Podporované:</span>
            <code>push(...)</code>, <code>pop()</code>, <code>multipop(k)</code>
        </div>
        <div class="syn-line"><span class="syn-label">Příklad:</span>
            <code>push(5,1,2,4,55) pop() pop() multipop(2)</code>
        </div>`,
        syntaxInputLabel: "Syntaxové Příkazy (Multipop na Zásobníku):",
        syntaxInputPlaceholder: "push(5,1,2,4,55) pop() pop() multipop(2)",
        exampleInfo: "Takto budou vaše příkazy vykonávány krok za krokem:",
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
        closeExecutionBtn: "Zavřít",
        bestCaseDescription: "Toto je nejlepší případ pro algoritmus Multipop.",
        worstCaseDescription: "Toto je nejhorší případ pro algoritmus Multipop.",
        pushDetail: "Vkládáme prvek {value} do zásobníku. Potenciál se zvyšuje o <span class=\"potentialValue\">1</span>.",
        popDetail: "Odstraňujeme prvek {removedValue} ze zásobníku. Potenciál se snižuje o <span class=\"potentialValue\">1</span>.",
        multipopDetail: "Najednou odstraňujeme {count} prvky: {removedValues}. Potenciál se snižuje o <span class=\"potentialValue\">{count}</span>.",
        algorithm2: "Fronta pomocí dvou zásobníků",
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
        `,
        queueManualParamsModalLabel: "Nastavení parametrů fronty",
        queueValuesLabel: "Zadejte hodnoty fronty (front -> back):",
        enqueueButton: "Enqueue",
        dequeueButton: "Dequeue",
        enqueuePrompt: "Zadejte kladné číslo pro enqueue:",
        queueEmptyAlert: "Fronta je prázdná!",
        detailNotProvided: "Detail není k dispozici.",
        noDetailProvided: "Detail není k dispozici.",
        stackEmptyNoPop: "Zásobník je prázdný! Pop se neprovedl.",
        stackEmptyNoMultipop: "Zásobník je prázdný! Multipop se neprovedl.",
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
        queueSyntaxModalLabel: "Syntaxové příkazy (Fronta pomocí dvou zásobníků)",
        queueSyntaxInfo: `
        <div class="syn-line">Zadej příkazy pro frontu níže.</div>
        <div class="syn-line"><span class="syn-label">Podporované:</span>
            <code>enqueue(...)</code>, <code>dequeue()</code>
        </div>
        <div class="syn-line"><span class="syn-label">Příklad:</span>
            <code>enqueue(1,2,3) dequeue() enqueue(99) dequeue()</code>
        </div>`,
        queueSyntaxInputLabel: "Syntaxové příkazy (Fronta pomocí dvou zásobníků):",
        queueSyntaxInputPlaceholder: "enqueue(1,2,3) dequeue() enqueue(99) dequeue()",
        queueSyntaxInvalidAlert: "Zadej validní syntax příkazy pro frontu!",
        queueEnqueueDetail: "Provádíme enqueue {value} -> push do Stack In. Potenciál se zvýší o <span class=\"potentialValue\">1</span>.",
        queueDequeueDetailSimple: "Provádíme dequeue ze Stack Out → odebráno {removedValue}. Potenciál zůstává <span class=\"potentialValue\">{potential}</span>.",
        queueDequeueDetailTransfer: "Stack Out je prázdný -> přelévám prvky ze Stack In do Stack Out (O(n)), potom dequeue odebere {removedValue}. Potenciál bude <span class=\"potentialValue\">0</span>.",
        queueEmptyNoDequeue: "Fronta je prázdná! Dequeue se neprovedl.",
        queueBestCaseDescription: "Toto je nejlepší případ pro frontu pomocí dvou zásobníků (dequeue ze Stack Out v O(1)).",
        queueWorstCaseDescription: "Toto je nejhorší případ pro frontu pomocí dvou zásobníků (první dequeue vynutí transfer ze Stack In do Stack Out v O(n)).",
        queueInfoTransferTitle: "Transfer (Stack Out prázdný)",
        queueInfoTransferDetail: "Stack Out je prázdný → přelévám všechny prvky ze <em>Stack In</em> do <em>Stack Out</em> (nejhorší případ <strong>O(n)</strong>).",
        queueInfoMoveTitle: "Přesun <span class=\"pushValue\">{value}</span>",
        queueInfoMoveDetail: "Pop ze <em>Stack In</em> a push do <em>Stack Out</em>. Potenciál se sníží o <span class=\"potentialValue\">1</span>.",
        queueInfoDequeueTitle: "Dequeue <span class=\"popValue\">{value}</span>",
        queueInfoDequeueDetail: "Odebírám ze <em>Stack Out</em>. Potenciál zůstává <span class=\"potentialValue\">{potential}</span>.",
        okBtn: "OK",
        cancelBtn: "Zrušit",
        messageTitle: "Zpráva",
        multipopEndBestCase: "Konec nejlepšího případu.",
        multipopEndWorstCase: "Konec nejhoršího případu.",
        algorithm3: "Splay strom",
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
        `,
        splayInsertButton: "Vložit",
        splaySearchButton: "Hledat",
        splayResetButton: "Reset",
        splayNotImplemented: "Tento režim zatím není implementovaný (brzy doplníme).",
        splaySearchPrompt: "Zadejte hodnotu, kterou chcete hledat:",
        splayInitTitle: "Počáteční hodnoty",
        splayInitLabel: "Zadejte počáteční hodnoty (oddělené čárkou):",
        splayInitPlaceholder: "1, 2, 3, 4",
        splayInitInvalid: "Zadejte alespoň jedno platné kladné číslo (např. 1,2,3).",
        splayDeleteButton: "Smazat",
        splayDeletePrompt: "Zadejte hodnotu, kterou chcete smazat:",
        splayNotFoundTitle: "Nenalezeno",
        splayNotFoundText: "Hodnota <strong>{value}</strong> nebyla ve stromu nalezena.",
        splayEmptyTreeText: "Strom je prázdný.",
        splayAlreadyExistsTitle: "Už existuje",
        splayAlreadyExistsText: "Hodnota <strong>{value}</strong> už ve stromu existuje. Vložení se neprovedlo.",
        splayRandomParamsModalLabel: "Nastavení náhodných parametrů stromu",
        splayRandomTooManyAlert: "Počet je větší než počet unikátních hodnot v rozsahu. Zvětšete rozsah nebo snižte počet.",
        splayInitialValuesLabel: "Počáteční hodnoty:",
        splayGeneratedValuesLabel: "Vygenerované hodnoty:",
        splayBestWorstDescription: "Vyberte nejlepší nebo nejhorší případ (Splay strom):",
        splayBwBestTitle: "NEJLEPŠÍ PŘÍPAD",
        splayBwBestDesc: "Ukázka levných operací (málo rotací).",
        splayBwWorstTitle: "NEJHORŠÍ PŘÍPAD",
        splayBwWorstDesc: "Vytvoříme hodně nevyvážený strom a pak sáhneme na hluboký vrchol → mnoho rotací (O(n)).",
        splayBwStepInsertTitle: "Vložit {value}",
        splayBwStepInsertDetail: "Vložíme jako v BST a pak splay vložený vrchol do kořene.",
        splayBwStepSearchTitle: "Hledat {value}",
        splayBwStepSearchDetail: "Hledáme jako v BST a pak splay nalezený (nebo poslední navštívený) vrchol do kořene.",
        splayBwStepDeleteTitle: "Smazat {value}",
        splayBwStepDeleteDetail: "Nejdřív splay {value} do kořene, pak smažeme kořen a spojíme podstromy.",
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
        </div>`,
        splaySyntaxInputLabel: "Syntaxové příkazy (Splay strom):",
        splaySyntaxInputPlaceholder: "insert(10,5,15) search(5) delete(10)",
        splaySyntaxInvalidAlert: "Zadej validní syntax příkazy pro Splay strom!",
        splaySynPanelTitle: "SYNTAX REŽIM",
        splaySynPanelDesc: `
        Klikni na <strong>Další</strong> a provede se přesně jeden příkaz.<br/>
        Po každém kroku ukážeme: co se stalo, jestli se našlo/smazalo, a reálně naměřené <strong>Δkroky</strong> + <strong>ΔΦ</strong>.`,
        splayBwBestDesc: `
        Cíl: ukázat levné operace (málo rotací).<br/>
        Postavíme menší “rozumný” strom a provedeme operaci na mělkém vrcholu.
        <ul style="text-align:left;margin:8px 0 0 16px;">
            <li><strong>Počet kroků</strong> = porovnání + rotace.</li>
            <li><strong>Potenciál Φ</strong> počítáme jako Σ log2(velikost_podstromu(v)).</li>
        </ul>`,
        splayBwWorstDesc: `
        Cíl: ukázat drahý přístup.<br/>
        Vytvoříme hodně nevyvážený strom (jako seznam), pak sáhneme/smažeme hluboký vrchol → mnoho rotací (nejhorší O(n)).
        <ul style="text-align:left;margin:8px 0 0 16px;">
            <li>I když je jeden krok drahý, amortizovaně to vychází dobře v celé sekvenci.</li>
            <li>Navíc ukazujeme reálně naměřené <strong>Δkroky</strong> a <strong>ΔΦ</strong>.</li>
        </ul>`,
        splayMetricsTitle: "Naměřené metriky",
        splayMetricsSteps: "Δkroky: <span class=\"potentialValue\">{deltaSteps}</span> (porovnání + rotace)",
        splayMetricsPhi: "Φ: <span class=\"potentialValue\">{phiBefore}</span> → <span class=\"potentialValue\">{phiAfter}</span> (ΔΦ = <span class=\"potentialValue\">{deltaPhi}</span>)",
        splayMetricsFound: "Nalezeno: <strong>{found}</strong>",
        splayMetricsDeleted: "Smazáno: <strong>{deleted}</strong>",
    }
};