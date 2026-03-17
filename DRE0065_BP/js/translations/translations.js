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
                <p>
                    <strong>This bachelor's thesis is focused on the visualization and explanation of amortized complexity through an interactive web application.</strong>
                </p>

                <p>
                    The work is part of a broader educational project called the
                    <strong>Teaching Server for Theoretical Computer Science</strong>.
                    Its purpose is to create dynamic web pages that help students understand theoretical concepts,
                    algorithmic behavior, and typical problem types through <strong>interactive simulations</strong>
                    instead of relying only on a fixed set of static examples.
                </p>

                <p>
                    In contrast to ordinary teaching materials, this approach allows the user to generate
                    <strong>arbitrarily many examples</strong> based on custom inputs and to observe how the chosen
                    algorithm behaves step by step.
                </p>

                <h6 class="mt-3"><strong>Thesis topic</strong></h6>
                <ul>
                    <li><strong>Component of Teaching Server for Theoretical Computer Science – Amortized Complexity 1</strong></li>
                    <li>Language of the thesis: <strong>Czech</strong></li>
                    <li>The application itself provides a <strong>CZ/EN interface</strong> for easier use and wider accessibility.</li>
                </ul>

                <h6 class="mt-3"><strong>Main goal of the thesis</strong></h6>
                <p>
                    The main goal is to create a dynamic web component that helps students understand
                    <strong>how amortized complexity is analyzed</strong>. The emphasis is not only on the final complexity result,
                    but also on the full process: how the data structure changes, how many elementary operations are performed,
                    and how the chosen amortized-analysis method explains the total cost of a sequence of operations.
                </p>

                <h6 class="mt-3"><strong>What amortized analysis means here</strong></h6>
                <p>
                    Amortized analysis studies the <strong>average cost per operation over an entire sequence</strong>,
                    even if some individual operations are expensive. In theoretical computer science this is commonly explained
                    using the <strong>aggregate method</strong>, the <strong>accounting method</strong>, and the
                    <strong>potential method</strong>. In this component, the main emphasis is placed on the
                    <strong>potential method</strong>, while the accounting interpretation is also reflected conceptually.
                </p>

                <h6 class="mt-3"><strong>What this web component enables</strong></h6>
                <ol class="mb-2">
                    <li>
                        <strong>Simulation of at least 3 different algorithms</strong> for which amortized analysis is appropriate.
                    </li>
                    <li>
                        <strong>Input in multiple forms</strong>:
                        <ul>
                            <li><strong>Manual input</strong> in a user-friendly way,</li>
                            <li><strong>Random generation</strong> based on selected parameters,</li>
                            <li><strong>Prepared example inputs</strong>, typically best case, worst case, or different-sized scenarios.</li>
                            <li><strong>Syntax-based input</strong>, where the user enters a whole sequence of commands that are then executed step by step with explanations.</li>
                        </ul>
                    </li>
                    <li>
                        During simulation, the user can observe:
                        <ul>
                            <li><strong>the current state of computation</strong> and data structures,</li>
                            <li><strong>the number of performed steps</strong>,</li>
                            <li><strong>the current value of potential</strong>, or an equivalent saved-credit interpretation.</li>
                        </ul>
                    </li>
                    <li>
                        For each algorithm, the application also provides space for the
                        <strong>derivation and explanation of its amortized complexity</strong>.
                    </li>
                </ol>

                <h6 class="mt-3"><strong>What “Step Count” means in this application</strong></h6>
                <p>
                    The displayed step counter represents the number of <strong>elementary operations</strong>
                    performed during the simulation, such as inserting or removing one value, moving one element between structures,
                    comparing nodes, or performing a structural change. This makes it easier to compare the
                    <strong>worst-case cost of a single operation</strong> with the <strong>amortized cost over a sequence</strong>.
                </p>

                <h6 class="mt-3"><strong>Algorithms presented in this component</strong></h6>
                <ul>
                    <li><strong>Multipop on Stack</strong></li>
                    <li><strong>Queue using Two Stacks</strong></li>
                    <li><strong>Splay Tree</strong></li>
                </ul>
                <p>
                    These algorithms were selected because each of them clearly demonstrates the difference between
                    the cost of one individual operation and the long-term behavior of a full sequence of operations.
                </p>

                <h6 class="mt-3"><strong>How to use the application</strong></h6>
                <ul>
                    <li>Select one of the available algorithms.</li>
                    <li>Choose an input mode, such as <strong>Manual</strong>, <strong>Random</strong>, <strong>Best / Worst case</strong>, or <strong>Syntax</strong>.</li>
                    <li>Observe how the structure evolves, how the step count changes, and how the potential develops over time.</li>
                    <li>Use the simulation and explanation panels to understand why the amortized complexity remains favorable even when some operations are expensive.</li>
                </ul>

                <h6 class="mt-3"><strong>Educational contribution</strong></h6>
                <p>
                    The aim of this component is to make amortized analysis more understandable, more visual, and easier to study in practice.
                    Instead of seeing only formulas or final asymptotic bounds, the student can follow the behavior of the algorithm directly
                    and connect the theoretical explanation with a concrete step-by-step simulation.
                </p>

                <h6 class="mt-3"><strong>Collaboration note</strong></h6>
                <p class="mb-0">
                    Students working on a similar assignment with a different number in the title may share parts of the user interface
                    or general application design, but each student implements a different set of three algorithms.
                </p>
        `,
        footerText: "Created by Martin Dressler, DRE0065",
        closeBtn: "Close",
        submitBtn: "Submit",
        generateBtn: "Generate",
        okBtn: "Submit",
        messageOkBtn: "OK",
        messageTitle: "Error Message",
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
        endButton: "End",
        bestCase: "Best Case",
        worstCase: "Worst Case",
        selectCase: "Select Case",
        bestWorstDescription: "Select Best or Worst case to execute:",
        detailNotProvided: "Detail not provided.",
        randomMissingParamsAlert: "Fill in minimum, maximum and count.",
        randomInvalidIntegerParamsAlert: "Enter whole numbers only.",
        randomPositiveParamsAlert: "Minimum, maximum and count must be positive numbers.",
        randomMinMaxOrderAlert: "Minimum must be smaller than maximum.",
        nextLabel: "Next",
        syntaxHistoryTitle: "Syntax mode history",
        syntaxHistoryButtonTitle: "Open history",
        syntaxPrevStepTitle: "Previous step",
        syntaxNextStepTitle: "Next step",
        syntaxExecutionFinished: "Execution has finished. You can browse the executed steps below or end this mode.",
        bwExecutionModeLabel: "Execution mode",
        executionModeAuto: "Automatic",
        executionModeManual: "Manual",
        bwPlayTitle: "Play",
        bwPauseTitle: "Pause",
        bwExecutionFinished: "Execution has finished. You can open the history below or end this mode.",
        bwGoStartTitle: "Go to the first executed step",
        bwGoEndTitle: "Jump to the final step",
        bwStepBackTitle: "Go one step back",
        bwStepForwardTitle: "Go one step forward",
        historyModalBaseTitle: "Manual / Random history",
        historyCommandLabel: "Command",
        historyEmptyWatermark: "EMPTY",
        bestWorstHistoryTitle: "Best / Worst case history",
        actionChoiceManual: "Manual",
        actionChoiceRandom: "Random",
        actionChoiceBody: "Choose how you want to provide the value.",
        pushChoiceTitle: "Push",
        enqueueChoiceTitle: "Enqueue",
        insertChoiceTitle: "Insert"
    },
    multipop:{
        manualParamsModalLabel: "Set Stack Parameters",
        stackValuesLabel: "Enter stack values:",
        multipopTitle: "Multipop on Stack",
        multipopAbout: "About Multipop on Stack",
        multipopDescription: `
                <p>
                    <strong>Multipop on Stack</strong> is one of the most classic examples used to explain
                    <strong>amortized analysis</strong>. The algorithm works with a standard stack and extends
                    the usual operations by one additional operation that may remove several elements at once.
                    At first sight, this extra operation may look expensive, but over a whole sequence of
                    operations its average cost is still constant.
                </p>

                <h6 class="mt-3"><strong>Used data structure</strong></h6>
                <p>
                    The algorithm uses a single <strong>stack</strong>, which is a
                    <strong>LIFO</strong> structure (<em>Last In, First Out</em>). This means that the most recently
                    inserted element is always the first one that can be removed.
                </p>

                <h6 class="mt-3"><strong>Operations</strong></h6>
                <ul>
                    <li><strong>Push(x)</strong>: inserts value <em>x</em> on the top of the stack.</li>
                    <li><strong>Pop()</strong>: removes the current top element, if the stack is not empty.</li>
                    <li><strong>Multipop(k)</strong>: removes up to <em>k</em> elements from the top of the stack.</li>
                </ul>

                <h6 class="mt-3"><strong>Main idea of the algorithm</strong></h6>
                <p>
                    The important idea is that <strong>Multipop(k)</strong> does not remove an arbitrary group of
                    elements. It repeatedly performs the same kind of removal that <strong>Pop()</strong> would do,
                    only several times in a row. If there are fewer than <em>k</em> elements in the stack, the
                    operation simply stops when the stack becomes empty.
                </p>
                <p>
                    So although one call of <strong>Multipop</strong> may remove many elements, each removed element
                    must have been inserted earlier, and the same element can never be removed twice.
                </p>

                <h6 class="mt-3"><strong>Why this algorithm is suitable for amortized analysis</strong></h6>
                <p>
                    This algorithm is suitable for amortized analysis because the cost of one operation may vary a lot.
                    A single <strong>Push</strong> is cheap, a single <strong>Pop</strong> is cheap, but one
                    <strong>Multipop(k)</strong> may look expensive if it removes many elements in one command.
                    However, when we observe a <strong>whole sequence of operations</strong>, the total number of
                    removals is limited by the total number of earlier insertions.
                </p>

                <h6 class="mt-3"><strong>Worst-case cost vs amortized cost</strong></h6>
                <ul>
                    <li><strong>Worst-case cost of one Push</strong>: O(1)</li>
                    <li><strong>Worst-case cost of one Pop</strong>: O(1)</li>
                    <li><strong>Worst-case cost of one Multipop(k)</strong>: O(k)</li>
                    <li><strong>Amortized cost per operation in a sequence</strong>: O(1)</li>
                </ul>
                <p>
                    The key reason is simple: every element can be pushed once and later popped at most once.
                    Therefore, even if one particular command is expensive, the total work over many commands grows
                    only linearly with the number of inserted elements.
                </p>

                <h6 class="mt-3"><strong>Potential method</strong></h6>
                <p>
                    In this visualization we use the potential function <strong>Φ = |S|</strong>, where
                    <strong>|S|</strong> is the current number of elements stored in the stack.
                </p>
                <ul>
                    <li><strong>Push</strong> increases the stack size by 1, so the potential increases by 1.</li>
                    <li><strong>Pop</strong> decreases the stack size by 1, so the potential decreases by 1.</li>
                    <li><strong>Multipop</strong> decreases the potential by the number of actually removed elements.</li>
                </ul>
                <p>
                    Intuitively, the stack stores potential while elements are being inserted, and later spends that
                    stored potential when elements are removed.
                </p>

                <h6 class="mt-3"><strong>Accounting interpretation</strong></h6>
                <p>
                    The same behavior can also be explained using the accounting view. We may imagine that each
                    <strong>Push</strong> pays not only for its own immediate work, but also stores one extra credit
                    on the inserted element. When that element is later removed by <strong>Pop</strong> or
                    <strong>Multipop</strong>, its stored credit can pay for the removal.
                </p>

                <h6 class="mt-3"><strong>What is shown in this simulation</strong></h6>
                <ul>
                    <li><strong>Current content of the stack</strong>, visualized as stacked blocks.</li>
                    <li><strong>Step Count</strong>, representing elementary performed operations.</li>
                    <li><strong>Potential</strong>, updated after each command.</li>
                    <li><strong>Detailed explanation panel</strong>, describing what happened in the current step.</li>
                    <li><strong>History view</strong>, where already executed steps can be reviewed again.</li>
                </ul>

                <h6 class="mt-3"><strong>What the user can try here</strong></h6>
                <ul>
                    <li><strong>Manual mode</strong>: directly perform stack operations one by one.</li>
                    <li><strong>Random mode</strong>: generate an initial stack automatically.</li>
                    <li><strong>Best / Worst case mode</strong>: observe prepared scenarios.</li>
                    <li><strong>Syntax mode</strong>: execute a whole sequence of commands step by step.</li>
                </ul>

                <h6 class="mt-3"><strong>Important edge cases</strong></h6>
                <ul>
                    <li>If the stack is empty, <strong>Pop()</strong> performs no real removal.</li>
                    <li>If the stack is empty, <strong>Multipop(k)</strong> also performs no real work.</li>
                    <li>If <em>k</em> is larger than the current stack size, <strong>Multipop(k)</strong> only clears the stack.</li>
                    <li>The requested number of removals and the actually performed number of removals may differ.</li>
                </ul>

                <h6 class="mt-3"><strong>Main takeaway</strong></h6>
                <p class="mb-0">
                    <strong>Multipop on Stack</strong> is an ideal teaching example because it clearly shows the difference
                    between the cost of one isolated operation and the average cost over a long sequence.
                    Even though one command may look expensive, the total work is tightly limited by earlier insertions,
                    which is exactly why the amortized cost remains constant.
                </p>
        `,
        enterValuePrompt: "Enter the positive number you want to add to the stack:",
        invalidNumberAlert: "Enter a valid positive number!",
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
        mpSynPanelTitle: "SYNTAX MODE",
        mpSynPanelDesc: `
                Click <strong>Next</strong> to execute exactly one command.<br/>
                For the current command this panel explains: <strong>what was executed</strong>,
                <strong>what changed in the stack</strong>, <strong>the actual cost</strong>,
                <strong>the potential calculation</strong>, <strong>the amortized meaning</strong>,
                and <strong>the key takeaway</strong>.<br/>
                All calculations below refer to the <strong>current command only</strong>.
        `,
        bestCaseDescription: `
            In this best-case scenario, the final <strong>Multipop</strong> removes fewer elements than were previously added.
            That means the expensive-looking operation is actually limited and the total work stays low.
            <ul class="ti-ul16">
                <li>The first operations only <strong>add elements</strong> to the stack.</li>
                <li>The final <strong>Multipop</strong> removes only part of the stack.</li>
                <li>This is a good example of why the amortized cost remains constant.</li>
            </ul>
        `,
        worstCaseDescription: `
            In this worst-case scenario, the final <strong>Multipop</strong> removes all elements that were previously added.
            So one operation becomes as expensive as possible for this short sequence.
            <ul class="ti-ul16">
                <li>The first operations <strong>build up the stack</strong>.</li>
                <li>The final <strong>Multipop</strong> removes the maximum possible number of elements.</li>
                <li>This shows the worst single operation, while the amortized cost over the whole sequence is still constant.</li>
            </ul>
        `,
        pushDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Push({value})</strong>. The value is inserted on the top of the stack.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the operation, the stack size was {beforeSize}.</li>
                    <li>After the operation, the stack size is {afterSize}.</li>
                    <li>The new top element is {value}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>One elementary stack insertion is performed.</li>
                    <li>Therefore the actual cost of this command is {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    This operation is cheap, but it increases the potential by 1.
                    The stack now stores one unit of future work that can later help pay for removals.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    A push performs one real step now and also increases the stored potential for later operations.
                </div>
        `,
        popDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Pop()</strong>. The top element is removed from the stack.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the operation, the stack size was {beforeSize}.</li>
                    <li>Removed element: {removedValue}</li>
                    <li>After the operation, the stack size is {afterSize}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>Exactly one elementary removal is performed.</li>
                    <li>Therefore the actual cost of this command is {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    The command costs one real step, but the potential decreases by 1.
                    One previously stored unit of potential is now consumed.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    Removing one element is paid for by one earlier insertion that increased the potential.
                </div>
        `,
        multipopDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Multipop({requestedCount})</strong>.
                    This command may remove up to {requestedCount} elements from the top of the stack.
                    In this step it actually removes {actualCount} element(s).
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the operation, the stack size was {beforeSize}.</li>
                    <li>Removed elements: {removedValues}</li>
                    <li>After the operation, the stack size is {afterSize}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>Each really removed element requires one elementary <strong>Pop</strong>.</li>
                    <li>Therefore the actual cost is equal to the number of really removed elements.</li>
                    <li>Actual cost = {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    A single <strong>Multipop</strong> may remove several elements and therefore look expensive.
                    However, every removed element must have been inserted earlier, and no element can be removed more than once.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    In a whole sequence of operations, the total number of removals is bounded by the total number of earlier insertions.
                    That is why the amortized cost per operation remains constant.
                </div>
        `,
        stackLabel: "Stack",
        manualValuesInvalidAlert: "Enter only positive integers separated by commas (e.g. 1, 2, 3).",
        syntaxInvalidAlert: "Enter valid syntax commands for Multipop on Stack!",
        emptyPopDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Pop()</strong>, but the stack is already empty.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the operation, the stack size was {beforeSize}.</li>
                    <li>No element is removed.</li>
                    <li>After the operation, the stack size is still {afterSize}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>No elementary removal is performed.</li>
                    <li>Therefore the actual cost of this command is {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    Since nothing is removed, the structure does not change and no stored potential is consumed.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    An empty-stack case is important because it shows that the command was requested,
                    but no elementary work was actually performed.
                </div>
        `,
        emptyMultipopDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Multipop({requestedCount})</strong>, but the stack is already empty.
                    The command allows up to {requestedCount} removals, yet in this step it actually removes {actualCount} element(s).
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the operation, the stack size was {beforeSize}.</li>
                    <li>No element is removed.</li>
                    <li>After the operation, the stack size is still {afterSize}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>No elementary removal is performed.</li>
                    <li>Actual cost = {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    Even though the command requests removals, no real work is done because there is no element available on the stack.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    The requested upper bound and the actually performed work are not the same thing.
                    In amortized analysis, the real cost depends on what was truly executed.
                </div>
        `,
        manualParamsExample: `
            <div class="syn-line">Enter your initial stack values below.</div>
            <div class="syn-line">
                <span class="syn-label">Supported:</span>
                <code>positive integers separated by commas</code>
            </div>
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>1, 2, 3, 4</code>
            </div>
        `,
        randomParamsInfo: `
            <div class="syn-line">Enter your random generation parameters of stack below.</div>
            <div class="syn-line">
                <span class="syn-label">Supported:</span>
                <code>positive integers only</code>
            </div>
        `,
        rangeMinExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>1</code>
            </div>
        `,
        rangeMaxExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>100</code>
            </div>
        `,
        countExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>10</code>
            </div>
        `
    },
    queue:{
        queue2StacksTitle: "Queue using Two Stacks",
        queue2StacksAbout: "About Queue using Two Stacks",
        queue2StacksDescription: `
                <p>
                    <strong>Queue using Two Stacks</strong> is another standard and very important example of
                    <strong>amortized analysis</strong>. The goal is to implement the behavior of a queue
                    (<strong>FIFO</strong>, <em>First In, First Out</em>) while internally using only two stacks.
                    One operation may sometimes be expensive, but over a long sequence the average cost per operation
                    remains constant.
                </p>

                <h6 class="mt-3"><strong>Used data structures</strong></h6>
                <p>
                    The algorithm uses two stacks:
                </p>
                <ul>
                    <li><strong>Stack In</strong>: stores newly inserted elements.</li>
                    <li><strong>Stack Out</strong>: stores elements that are ready to leave the queue.</li>
                </ul>
                <p>
                    Together these two stacks simulate the behavior of one queue.
                </p>

                <h6 class="mt-3"><strong>Operations</strong></h6>
                <ul>
                    <li><strong>Enqueue(x)</strong>: inserts value <em>x</em> into the queue.</li>
                    <li><strong>Dequeue()</strong>: removes the oldest element currently stored in the queue.</li>
                </ul>

                <h6 class="mt-3"><strong>Main idea of the algorithm</strong></h6>
                <p>
                    Every new element is first placed onto <strong>Stack In</strong>. As long as
                    <strong>Stack Out</strong> already contains elements, <strong>Dequeue()</strong> can remove the front
                    element directly from there. If <strong>Stack Out</strong> is empty, all elements from
                    <strong>Stack In</strong> are transferred into <strong>Stack Out</strong>. This transfer reverses their order,
                    so the oldest element becomes the top of <strong>Stack Out</strong>, exactly as required by a FIFO queue.
                </p>

                <h6 class="mt-3"><strong>Why this algorithm is suitable for amortized analysis</strong></h6>
                <p>
                    This algorithm is suitable for amortized analysis because not every <strong>Dequeue</strong> has the same cost.
                    Some dequeue operations are very cheap, but the first dequeue after a long sequence of enqueues may trigger
                    a full transfer of many elements from <strong>Stack In</strong> to <strong>Stack Out</strong>.
                    That single command may therefore look expensive.
                </p>
                <p>
                    However, each element follows a very limited life cycle:
                </p>
                <ul>
                    <li>it is pushed once into <strong>Stack In</strong>,</li>
                    <li>it is moved at most once from <strong>Stack In</strong> to <strong>Stack Out</strong>,</li>
                    <li>it is popped once from <strong>Stack Out</strong>.</li>
                </ul>
                <p>
                    Because of that, the total amount of work per element stays bounded.
                </p>

                <h6 class="mt-3"><strong>Worst-case cost vs amortized cost</strong></h6>
                <ul>
                    <li><strong>Worst-case cost of one Enqueue</strong>: O(1)</li>
                    <li><strong>Worst-case cost of one Dequeue</strong>: O(n), if transfer is needed</li>
                    <li><strong>Amortized cost per operation in a sequence</strong>: O(1)</li>
                </ul>
                <p>
                    The expensive transfer does not happen repeatedly for the same elements. Once an element is moved to
                    <strong>Stack Out</strong>, it will never be moved back. This is the key reason why the average cost stays constant.
                </p>

                <h6 class="mt-3"><strong>Potential method</strong></h6>
                <p>
                    In this visualization we use the potential function <strong>Φ = |S<sub>in</sub>|</strong>,
                    which is the number of elements currently stored in <strong>Stack In</strong>.
                </p>
                <ul>
                    <li><strong>Enqueue</strong> increases Φ by 1, because one new element is stored in Stack In.</li>
                    <li><strong>Transfer</strong> decreases Φ, because elements leave Stack In.</li>
                    <li><strong>Dequeue from Stack Out</strong> does not change Φ, because Stack In stays unchanged.</li>
                </ul>
                <p>
                    Intuitively, newly inserted elements store potential while they wait in <strong>Stack In</strong>, and that
                    stored potential is later spent when the transfer is performed.
                </p>

                <h6 class="mt-3"><strong>Accounting interpretation</strong></h6>
                <p>
                    The accounting view can explain the same idea in a simpler way: when an element is inserted, it can pay
                    not only for its own insertion, but also save extra credit for its later movement and final removal.
                    Since each element is moved only once, this saved credit is sufficient.
                </p>

                <h6 class="mt-3"><strong>What is shown in this simulation</strong></h6>
                <ul>
                    <li><strong>Both internal stacks</strong>, so the user can see where each element is currently stored.</li>
                    <li><strong>The transfer process</strong>, including individual moves from Stack In to Stack Out.</li>
                    <li><strong>Step Count</strong>, representing elementary work.</li>
                    <li><strong>Potential</strong>, updated after commands and transfers.</li>
                    <li><strong>Detailed explanation panel</strong>, describing what happened and why.</li>
                    <li><strong>History view</strong>, allowing the user to inspect previously executed commands again.</li>
                </ul>

                <h6 class="mt-3"><strong>What the user can try here</strong></h6>
                <ul>
                    <li><strong>Manual mode</strong>: enqueue and dequeue values directly.</li>
                    <li><strong>Random mode</strong>: generate an initial queue automatically.</li>
                    <li><strong>Best / Worst case mode</strong>: compare a cheap dequeue with a dequeue that triggers transfer.</li>
                    <li><strong>Syntax mode</strong>: execute a prepared sequence of queue commands step by step.</li>
                </ul>

                <h6 class="mt-3"><strong>Important edge cases</strong></h6>
                <ul>
                    <li>If both stacks are empty, <strong>Dequeue()</strong> cannot remove any real value.</li>
                    <li>The transfer happens only when <strong>Stack Out</strong> is empty.</li>
                    <li>The first dequeue after many enqueues is often the most expensive one.</li>
                    <li>A command that looks expensive locally may still be cheap on average over a sequence.</li>
                </ul>

                <h6 class="mt-3"><strong>Main takeaway</strong></h6>
                <p class="mb-0">
                    <strong>Queue using Two Stacks</strong> is an excellent example of amortized analysis because it shows that
                    a costly operation does not automatically mean a costly algorithm overall. Even though one dequeue may trigger
                    a large transfer, each element participates in only a small bounded number of elementary actions, which is why
                    the amortized cost stays O(1).
                </p>
        `,
        queueManualParamsModalLabel: "Set Queue Parameters",
        queueValuesLabel: "Enter queue values:",
        enqueueButton: "Enqueue",
        dequeueButton: "Dequeue",
        enqueuePrompt: "Enter a positive number to enqueue:",
        queueStackInLabel: "Stack In",
        queueStackOutLabel: "Stack Out",
        queueInfoTransfer: "Stack Out empty -> transferring items (O(n))...",
        queueInfoMove: "Move {value}: Stack In -> Stack Out",
        queueInfoDequeue: "Dequeue -> remove {value}",
        queueInfoBest: "BEST: Dequeue from Stack Out (O(1))",
        queueInfoWorst: "WORST: first dequeue triggers a transfer (O(n))",
        queueBestWorstModalText: "Select Best or Worst case to execute:",
        queueBestCaseDescription: `
            In this best-case scenario, the next <strong>Dequeue</strong> removes an element directly from <strong>Stack Out</strong>.
            No transfer is needed, so the operation is cheap.
            <ul class="ti-ul16">
                <li>The queue front is already prepared in <strong>Stack Out</strong>.</li>
                <li><strong>Dequeue</strong> performs only one direct removal.</li>
                <li>This corresponds to the cheap <strong>O(1)</strong> case.</li>
            </ul>
        `,
        queueWorstCaseDescription: `
            In this worst-case scenario, <strong>Stack Out</strong> is empty before the next <strong>Dequeue</strong>.
            So all elements must first be transferred from <strong>Stack In</strong> to <strong>Stack Out</strong>.
            <ul class="ti-ul16">
                <li>The queue front is not immediately available.</li>
                <li>The first <strong>Dequeue</strong> triggers the full transfer.</li>
                <li>This is the expensive single-operation case, even though the amortized cost stays constant over time.</li>
            </ul>
        `,
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
        queueSyntaxInvalidAlert: "Enter valid syntax commands for Queue using Two Stacks!",
        queueSynPanelTitle: "SYNTAX MODE",
        queueSynPanelDesc: `
                Click <strong>Next</strong> to execute exactly one command.<br/>
                For the current command this panel explains: <strong>what was executed</strong>,
                <strong>what changed in Stack In and Stack Out</strong>, <strong>the actual cost</strong>,
                <strong>the potential calculation</strong>, <strong>the amortized meaning</strong>,
                and <strong>the key takeaway</strong>.<br/>
                All calculations below refer to the <strong>current command only</strong>.
        `,
        queueEnqueueDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Enqueue({value})</strong>. The value is pushed onto <em>Stack In</em>.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the command: Stack In = {beforeIn}, Stack Out = {beforeOut}.</li>
                    <li>After the command: Stack In = {afterIn}, Stack Out = {afterOut}.</li>
                    <li>The new value {value} is now stored in <strong>Stack In</strong>.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>Exactly one elementary push into <strong>Stack In</strong> is performed.</li>
                    <li>Therefore the actual cost of this command is {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S<sub>in</sub>|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    This command is cheap now, but it increases the potential by 1.
                    That stored potential will later help pay for the transfer from <em>Stack In</em> to <em>Stack Out</em>.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    Enqueue is a cheap operation, but it stores future work inside the potential.
                </div>
        `,
        queueDequeueDetailSimple: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Dequeue()</strong> while <em>Stack Out</em> is already non-empty,
                    so the front value can be removed directly from <em>Stack Out</em>.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the command: Stack In = {beforeIn}, Stack Out = {beforeOut}.</li>
                    <li>Removed value: {removedValue}</li>
                    <li>After the command: Stack In = {afterIn}, Stack Out = {afterOut}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>Exactly one elementary pop from <strong>Stack Out</strong> is performed.</li>
                    <li>Therefore the actual cost of this command is {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S<sub>in</sub>|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    This is the cheap dequeue case. Since <strong>Stack Out</strong> already contains the queue front,
                    no transfer is needed and the potential does not change.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    When <em>Stack Out</em> is ready, dequeue costs only one real step.
                </div>
        `,
        queueDequeueDetailTransfer: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Dequeue()</strong>, but <em>Stack Out</em> is empty.
                    Therefore all {transferredCount} element(s) must first be transferred from <em>Stack In</em> to <em>Stack Out</em>,
                    and only then the front value can be removed.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the command: Stack In = {beforeIn}, Stack Out = {beforeOut}.</li>
                    <li>Removed value: {removedValue}</li>
                    <li>After the command: Stack In = {afterIn}, Stack Out = {afterOut}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>Each transferred element costs two elementary steps: one pop from <em>Stack In</em> and one push to <em>Stack Out</em>.</li>
                    <li>Then one final pop from <em>Stack Out</em> removes the queue front.</li>
                    <li>Actual cost = 2 × {transferredCount} + 1 = {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S<sub>in</sub>|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    This single command may look expensive because many elements move at once.
                    However, each element can be transferred from <em>Stack In</em> to <em>Stack Out</em> at most once in the whole sequence.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    One dequeue may be expensive, but the transfer cost is spread across many earlier enqueue operations,
                    so the amortized cost per command remains constant.
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
        manualValuesInvalidAlert: "Enter only positive integers separated by commas (e.g. 1, 2, 3).",
        invalidNumberAlert: "Enter a valid positive number!",
        emptyDequeueDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Dequeue()</strong>, but both <em>Stack In</em> and <em>Stack Out</em> are empty.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>Before the command: Stack In = {beforeIn}, Stack Out = {beforeOut}.</li>
                    <li>No value is removed.</li>
                    <li>After the command: Stack In = {afterIn}, Stack Out = {afterOut}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>No elementary transfer and no elementary pop are performed.</li>
                    <li>Therefore the actual cost of this command is {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>We use the potential function <strong>Φ = |S<sub>in</sub>|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    Since the queue is empty, no real work is performed and the potential remains unchanged.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    The requested command and the actually performed work are not always the same.
                    In amortized analysis, the real cost depends on what was truly executed.
                </div>
        `,
        randomParamsInfo: `
            <div class="syn-line">Enter your random generation parameters of queue below.</div>
            <div class="syn-line">
                <span class="syn-label">Supported:</span>
                <code>positive integers only</code>
            </div>
        `,
        rangeMinExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>1</code>
            </div>
        `,
        rangeMaxExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>100</code>
            </div>
        `,
        countExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>10</code>
            </div>
        `,
        queueManualParamsExample: `
            <div class="syn-line">Enter your initial queue values below.</div>
            <div class="syn-line">
                <span class="syn-label">Supported:</span>
                <code>positive integers separated by commas</code>
            </div>
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>1, 2, 3, 4</code>
            </div>
        `
    },
    splay:{
        splayTreeTitle: "Splay Tree",
        splayTreeAbout: "About Splay Tree",
        splayTreeDescription: `
                <p>
                    <strong>Splay Tree</strong> is a <strong>self-adjusting Binary Search Tree</strong>.
                    Unlike a strictly balanced tree, it does not store explicit balancing information.
                    Instead, it improves its shape dynamically during use. After an access operation,
                    the accessed node, or the last relevant visited node, is moved toward the root by rotations.
                    This restructuring process is called <strong>Splay</strong>.
                </p>

                <h6 class="mt-3"><strong>Used data structure</strong></h6>
                <p>
                    The algorithm uses one <strong>binary search tree</strong> in which:
                </p>
                <ul>
                    <li>all smaller values are stored in the left subtree,</li>
                    <li>all larger values are stored in the right subtree,</li>
                    <li>the tree shape may change after operations because of splaying.</li>
                </ul>

                <h6 class="mt-3"><strong>Operations</strong></h6>
                <ul>
                    <li><strong>Insert(x)</strong>: inserts a new value and then splays the inserted node toward the root.</li>
                    <li><strong>Search(x)</strong>: searches for a value and then splays the found node, or the last visited node, toward the root.</li>
                    <li><strong>Delete(x)</strong>: finds the value, restructures the tree using splaying, removes the node, and reconnects the remaining subtrees.</li>
                </ul>

                <h6 class="mt-3"><strong>Main idea of the algorithm</strong></h6>
                <p>
                    The central idea is that frequently accessed values should gradually move closer to the root.
                    This makes future accesses to similar values cheaper. Instead of keeping the tree perfectly balanced at all times,
                    the structure continuously adapts itself to the access pattern.
                </p>
                <p>
                    The restructuring is done by rotations. The most common cases are:
                </p>
                <ul>
                    <li><strong>Zig</strong>: one rotation when the parent is already the root.</li>
                    <li><strong>Zig-Zig</strong>: two rotations in the same direction.</li>
                    <li><strong>Zig-Zag</strong>: two rotations in opposite directions.</li>
                </ul>

                <h6 class="mt-3"><strong>Why this algorithm is suitable for amortized analysis</strong></h6>
                <p>
                    This algorithm is suitable for amortized analysis because one individual operation may be expensive.
                    In a badly skewed tree, a search, insert, or delete may travel through many nodes and may perform many rotations.
                    So the worst-case cost of one operation may be linear.
                </p>
                <p>
                    However, expensive operations are not wasted. They change the structure of the tree in a way that often makes
                    future operations cheaper. Because of this long-term structural effect, the average cost over a sequence of operations
                    is much better than the worst-case cost of one isolated operation.
                </p>

                <h6 class="mt-3"><strong>Worst-case cost vs amortized cost</strong></h6>
                <ul>
                    <li><strong>Worst-case cost of one operation</strong>: O(n)</li>
                    <li><strong>Amortized cost per operation in a sequence</strong>: O(log n)</li>
                </ul>
                <p>
                    This is exactly why splay trees are taught as a major example of amortized analysis:
                    the local behavior may look expensive, but the global behavior over many operations is logarithmic on average.
                </p>

                <h6 class="mt-3"><strong>Potential method</strong></h6>
                <p>
                    The classical analysis uses a potential function based on subtree sizes:
                    <strong>Φ(T) = Σ log₂(size(subtree(v)))</strong>.
                </p>
                <p>
                    The intuition is that the potential expresses how the tree is structurally arranged.
                    Rotations change subtree sizes, therefore they also change the value of the potential.
                    A costly restructuring step may significantly improve the future shape of the tree,
                    and that improvement is captured by the potential drop.
                </p>

                <h6 class="mt-3"><strong>Accounting interpretation</strong></h6>
                <p>
                    Compared with stack-based examples, the accounting interpretation here is less intuitive in terms of individual credits,
                    because the cost is connected to the whole tree shape. Still, the main idea remains the same:
                    expensive restructuring is not lost work, because it reorganizes the structure and helps future operations.
                </p>

                <h6 class="mt-3"><strong>What is shown in this simulation</strong></h6>
                <ul>
                    <li><strong>The current tree structure</strong>, including nodes and edges.</li>
                    <li><strong>Visited path</strong>, showing which nodes were traversed.</li>
                    <li><strong>Rotations</strong>, visually showing how the tree changes during splaying.</li>
                    <li><strong>Step Count</strong>, representing comparisons and structural operations.</li>
                    <li><strong>Potential</strong>, based on subtree sizes.</li>
                    <li><strong>Detailed explanation panel</strong>, describing the performed command.</li>
                    <li><strong>History view</strong>, where earlier executed commands can be reviewed again.</li>
                </ul>

                <h6 class="mt-3"><strong>What the user can try here</strong></h6>
                <ul>
                    <li><strong>Manual mode</strong>: insert, search, and delete values directly.</li>
                    <li><strong>Random mode</strong>: generate an initial tree automatically.</li>
                    <li><strong>Best / Worst case mode</strong>: observe favorable and unfavorable structural scenarios.</li>
                    <li><strong>Syntax mode</strong>: execute a whole sequence of tree commands step by step.</li>
                </ul>

                <h6 class="mt-3"><strong>Important edge cases</strong></h6>
                <ul>
                    <li>Searching for a missing value still changes the tree, because the last visited node may be splayed.</li>
                    <li>Inserting an already existing value does not create a duplicate node.</li>
                    <li>Deleting from an empty tree performs no real structural removal.</li>
                    <li>A very skewed tree may cause one operation to be expensive, but that does not break the amortized guarantee.</li>
                </ul>

                <h6 class="mt-3"><strong>Main takeaway</strong></h6>
                <p class="mb-0">
                    <strong>Splay Tree</strong> is a powerful example of amortized analysis because it shows that an algorithm can be
                    locally expensive and still globally efficient. The tree continuously reorganizes itself according to performed accesses,
                    and thanks to this restructuring the amortized complexity of operations is O(log n), even though one particular operation
                    may still be linear in the worst case.
                </p>
        `,
        splayInsertButton: "Insert",
        splaySearchButton: "Search",
        splayDeleteButton: "Delete",
        splayInitTitle: "Set Tree Parameters",
        splayInitLabel: "Enter tree values:",
        splayInitPlaceholder: "1, 2, 3, 4",
        splayInitInvalid: "Enter at least one valid positive number (e.g., 1,2,3).",
        splaySearchPrompt: "Enter the positive value you want to search for:",
        splayInsertPrompt: "Enter the positive value you want to insert:",
        splayDeletePrompt: "Enter the positive value you want to delete:",
        splayRandomParamsModalLabel: "Set Random Parameters",
        splayRandomTooManyAlert: "Count cannot be greater than the number of unique values in the selected range.",
        splayInitialValuesLabel: "Initial values:",
        splayGeneratedValuesLabel: "Generated values:",
        splayBestWorstDescription: "Select Best or Worst case to execute:",
        splayBwBestTitle: "BEST CASE",
        splayBwWorstTitle: "WORST CASE",
        splayBwBestDesc: `
            In this best-case scenario, the accessed node is shallow and the tree structure stays relatively favorable.
            That means the operation needs only a small number of comparisons and rotations.
            <ul class="ti-ul16">
                <li>The tree is built in a relatively favorable shape.</li>
                <li>The selected operation touches a node close to the root.</li>
                <li>This keeps both the real work and the structural changes small.</li>
            </ul>
        `,
        splayBwWorstDesc: `
            In this worst-case scenario, the tree becomes strongly skewed and the accessed or removed node is deep.
            That forces many rotations and makes one operation expensive.
            <ul class="ti-ul16">
                <li>The tree shape becomes close to a linked list.</li>
                <li>The chosen operation must travel deep through the structure.</li>
                <li>This shows the expensive single-operation case, while amortized complexity still remains logarithmic over sequences.</li>
            </ul>
        `,
        splayBwStepInsertTitle: "Insert {value}",
        splayBwStepSearchTitle: "Search {value}",
        splayBwStepDeleteTitle: "Delete {value}",
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
        splaySyntaxInvalidAlert: "Enter valid syntax commands for Splay Tree!",
        splaySynPanelTitle: "SYNTAX MODE",
        splaySynPanelDesc: `
                Click <strong>Next</strong> to execute exactly one command.<br/>
                For the current command this panel explains: <strong>what was executed</strong>,
                <strong>what changed in the tree</strong>, <strong>the actual cost</strong>,
                <strong>the potential calculation</strong>, <strong>the amortized meaning</strong>,
                <strong>the key takeaway</strong>, and also the <strong>internal breakdown of the command</strong>.<br/>
                If the command performs rotations, each rotation is listed below with its own measured
                <strong>Δsteps</strong>, <strong>Φ before</strong>, <strong>Φ after</strong>, and <strong>ΔΦ</strong>.
        `,  
        invalidNumberAlert: "Enter a valid positive number!",
        randomParamsInfo: `
            <div class="syn-line">Enter your random generation parameters of splay tree below.</div>
            <div class="syn-line">
                <span class="syn-label">Supported:</span>
                <code>positive integers only</code>
            </div>
        `,
        rangeMinExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>1</code>
            </div>
        `,
        rangeMaxExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>100</code>
            </div>
        `,
        countExample: `
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>10</code>
            </div>
        `,
        splayInitInfo: `
            <div class="syn-line">Enter your initial tree values below.</div>
            <div class="syn-line">
                <span class="syn-label">Supported:</span>
                <code>positive integers separated by commas</code>
            </div>
            <div class="syn-line">
                <span class="syn-label">Example:</span>
                <code>10, 5, 15</code>
            </div>
        `,
        splaySyntaxStartHint: `Click <strong>Next</strong> to execute this command.`,
        splayEmptyTreeShort: "empty tree",
        splaySyntaxStatusInserted: "A new node was inserted and then splayed toward the root.",
        splaySyntaxStatusDuplicate: "The value already existed, so no new node was created.",
        splaySyntaxStatusFound: "The value was found and the accessed node was splayed to the root.",
        splaySyntaxStatusNotFound: "The value was not found, so the last visited node was splayed to the root.",
        splaySyntaxStatusDeleted: "The value was found, splayed to the root, and then removed.",
        splaySyntaxStatusNotDeleted: "The value was not found, so the tree was only restructured around the last visited node.",
        splaySyntaxInsertDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Insert({value})</strong>. {statusText}
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>After this command, the root of the tree is {rootAfter}.</li>
                    <li>If rotations were needed, they are listed in the internal breakdown below.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>The total actual cost of this command is {actualCost}.</li>
                    <li>In this implementation that total is mainly formed by BST comparisons, the leaf insertion itself, and all performed rotations.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>
                    We use the potential function
                    <strong>Φ(T) = Σ<sub>v∈T</sub> log₂(size(subtree(v)))</strong>.
                </div>
                <ul class="ti-ul18">
                    <li><strong>v</strong> denotes one particular node of the tree.</li>
                    <li>The symbol <strong>Σ</strong> means that we compute this value for every node in the tree and add all results together.</li>
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    One insert may include several rotations and therefore look expensive.
                    However, the restructuring may improve the shape of the tree for future operations.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    A single splay-tree command may consist of multiple internal phases, so the detailed breakdown below matters.
                </div>

                {traceBreakdown}
        `,
        splaySyntaxSearchDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Search({value})</strong>. {statusText}
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>After this command, the root of the tree is {rootAfter}.</li>
                    <li>The root changes because the found node, or the last visited node, is splayed upward.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>The total actual cost of this command is {actualCost}.</li>
                    <li>That total is formed mainly by BST comparisons and all rotations performed during splaying.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>
                    We use the potential function
                    <strong>Φ(T) = Σ<sub>v∈T</sub> log₂(size(subtree(v)))</strong>.
                </div>
                <ul class="ti-ul18">
                    <li><strong>v</strong> denotes one particular node of the tree.</li>
                    <li>The symbol <strong>Σ</strong> means that we compute this value for every node in the tree and add all results together.</li>
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    Even a failed search may still be useful, because splaying the last visited node can improve the tree shape for similar future queries.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    In a splay tree, searching does not only answer a query. It also actively restructures the tree.
                </div>

                {traceBreakdown}
        `,
        splaySyntaxDeleteDetail: `
                <div><strong>What happened</strong></div>
                <div>
                    We execute <strong>Delete({value})</strong>. {statusText}
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Effect on the data structure</strong></div>
                <ul class="ti-ul18">
                    <li>After this command, the root of the tree is {rootAfter}.</li>
                    <li>If the value existed, the tree was split and then joined again as part of deletion.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Actual cost</strong></div>
                <ul class="ti-ul18">
                    <li>The total actual cost of this command is {actualCost}.</li>
                    <li>That total is formed mainly by BST comparisons, possible path traversal inside the left subtree, and all rotations performed during splaying.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Potential change</strong></div>
                <div>
                    We use the potential function
                    <strong>Φ(T) = Σ<sub>v∈T</sub> log₂(size(subtree(v)))</strong>.
                </div>
                <ul class="ti-ul18">
                    <li><strong>v</strong> denotes one particular node of the tree.</li>
                    <li>The symbol <strong>Σ</strong> means that we compute this value for every node in the tree and add all results together.</li>
                    <li>Φ<sub>before</sub> = {phiBefore}</li>
                    <li>Φ<sub>after</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub> = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortized interpretation</strong></div>
                <div>
                    Deletion may be expensive because it can include search, splaying, splitting the tree, and joining subtrees again.
                    Still, the restructuring is part of why the amortized complexity stays logarithmic over a long sequence.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Key takeaway</strong></div>
                <div>
                    In a splay tree, deletion is not just “remove one node”. It is a full structural operation.
                </div>

                {traceBreakdown}
        `,
        splayTraceSectionTitle: "Internal breakdown of this command",
        splayTraceEmpty: "No internal phases were recorded for this command.",
        splayTraceMetrics: `Measured metrics for this phase: Δsteps = {deltaSteps}, Φ<sub>before</sub> = {phiBefore}, Φ<sub>after</sub> = {phiAfter}, ΔΦ = {deltaPhi}.`,
        splayTraceRootInsertTitle: "Create the root",
        splayTraceRootInsertDetail: `The tree was empty, so the new node {value} becomes the root immediately. Current root: {rootKey}.`,
        splayTracePathTitle: "BST path traversal",
        splayTracePathDetail: `{operationText} target {target}. Visited path: <strong>{pathText}</strong>. Outcome of the traversal: {outcomeText}.{positionText} Comparisons performed in this phase: {compareCount}.`,
        splayTracePathPositionText: ` The insertion position was determined relative to parent {parentKey} as the <strong>{sideText}</strong> child.`,
        splayTraceInsertAttachTitle: "Attach the new leaf",
        splayTraceInsertAttachDetail: `The new node {value} is attached as the <strong>{sideText}</strong> child of parent {parentKey}.`,
        splayTraceRotateLeftTitle: "Left rotation",
        splayTraceRotateLeftDetail: `A <strong>{caseLabel}</strong> left rotation is performed around pivot {pivotKey}. Node {promotedKey} moves above it. Root after this rotation: {rootAfter}.`,
        splayTraceRotateRightTitle: "Right rotation",
        splayTraceRotateRightDetail: `A <strong>{caseLabel}</strong> right rotation is performed around pivot {pivotKey}. Node {promotedKey} moves above it. Root after this rotation: {rootAfter}.`,
        splayTraceDeleteSplitTitle: "Split the tree around the deleted root",
        splayTraceDeleteSplitDetail: `The root node {deletedKey} is removed. The remaining left subtree root is {leftRootKey}, and the remaining right subtree root is {rightRootKey}.`,
        splayTraceDeleteJoinPathTitle: "Find the maximum in the left subtree",
        splayTraceDeleteJoinPathDetail: `Inside the left subtree, the visited path is <strong>{pathText}</strong>. The maximum node found on this path is {maxKey}. Comparisons performed in this phase: {compareCount}.`,
        splayTraceDeleteAttachRightTitle: "Attach the right subtree",
        splayTraceDeleteAttachRightDetail: `The right subtree root {attachedRightKey} is attached to the current root {rootKey}. Root after this phase: {rootAfter}.`,
        splayOperationInsertText: "Insert",
        splayOperationSearchText: "Search",
        splayOperationDeleteText: "Delete",
        splayOutcomeDuplicate: "the value already exists",
        splayOutcomePositionFound: "the insertion position was found",
        splayOutcomeFound: "the value was found",
        splayOutcomeNotFound: "the value was not found",
        splayCaseZig: "Zig",
        splayCaseZigZig: "Zig-Zig",
        splayCaseZigZag: "Zig-Zag",
        splaySideLeft: "left",
        splaySideRight: "right"
    }
  },
  cz:{
    common:{
        title_main: "Hlavní stránka",
        navBrand: "Amortizovaná složitost",
        aboutAppBtn: "O mé bakalářské práci",
        backBtn: "<i class='fas fa-arrow-left'></i> Zpět",
        algorithm1: "Multipop na zásobníku",
        algorithm2: "Fronta pomocí dvou zásobníků",
        algorithm3: "Splay strom",
        aboutModalLabel: "O mé bakalářské práci",
        aboutModalBody: `
                <p>
                    <strong>Tato bakalářská práce je zaměřena na vizualizaci a vysvětlení amortizované složitosti pomocí interaktivní webové aplikace.</strong>
                </p>

                <p>
                    Práce vzniká jako součást širšího projektu
                    <strong>výukového serveru pro předměty teoretické informatiky</strong>.
                    Jeho cílem je vytvářet dynamické webové stránky, které studentům pomáhají pochopit teoretické pojmy,
                    chování algoritmů a typické druhy úloh pomocí <strong>interaktivních simulací</strong>,
                    nikoli pouze pomocí pevně dané sady statických příkladů.
                </p>

                <p>
                    Na rozdíl od běžných výukových textů tento přístup umožňuje generovat
                    <strong>libovolně mnoho ukázek</strong> podle vlastních vstupů uživatele a současně sledovat,
                    jak se zvolený algoritmus krok po kroku chová.
                </p>

                <h6 class="mt-3"><strong>Téma práce</strong></h6>
                <ul>
                    <li><strong>Komponenta výukového serveru TI – Amortizovaná složitost 1</strong></li>
                    <li>Jazyk vypracování: <strong>čeština</strong></li>
                    <li>Samotná aplikace nabízí rozhraní <strong>CZ/EN</strong> pro lepší použitelnost a širší dostupnost.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní cíl práce</strong></h6>
                <p>
                    Hlavním cílem je vytvořit dynamickou webovou komponentu, která studentům pomůže pochopit,
                    <strong>jak se analyzuje amortizovaná složitost</strong>. Důraz není kladen pouze na výsledný odhad složitosti,
                    ale i na celý proces: jak se mění datová struktura, kolik elementárních operací bylo skutečně provedeno
                    a jak zvolená metoda amortizované analýzy vysvětluje celkovou cenu sekvence operací.
                </p>

                <h6 class="mt-3"><strong>Co zde znamená amortizovaná analýza</strong></h6>
                <p>
                    Amortizovaná analýza zkoumá <strong>průměrnou cenu operace v celé sekvenci</strong>,
                    i když některé jednotlivé operace mohou být drahé. V teoretické informatice se tento přístup běžně vysvětluje
                    pomocí <strong>agregátní metody</strong>, <strong>účetní metody</strong> a
                    <strong>potenciálové metody</strong>. V této komponentě je hlavní důraz kladen na
                    <strong>potenciálovou metodu</strong>, přičemž účetní interpretace je zde také přítomna v myšlenkovém pozadí.
                </p>

                <h6 class="mt-3"><strong>Co tato webová komponenta umožňuje</strong></h6>
                <ol class="mb-2">
                    <li>
                        <strong>Simulaci alespoň 3 různých algoritmů</strong>, u nichž je vhodné použít amortizovanou analýzu.
                    </li>
                    <li>
                        <strong>Zadávání vstupů několika způsoby</strong>:
                        <ul>
                            <li><strong>ručně</strong> uživatelsky přívětivou formou,</li>
                            <li><strong>náhodným generováním</strong> podle zvolených parametrů,</li>
                            <li><strong>pomocí připravených ukázkových vstupů</strong>, typicky pro nejlepší případ, nejhorší případ nebo různě velké scénáře.</li>
                            <li><strong>pomocí syntaxe</strong>, kde uživatel zadá celou sekvenci příkazů, které se pak vykonají krok po kroku s vysvětlením.</li>
                        </ul>
                    </li>
                    <li>
                        Během simulace může uživatel sledovat:
                        <ul>
                            <li><strong>aktuální stav výpočtu</strong> a použitých datových struktur,</li>
                            <li><strong>počet provedených kroků</strong>,</li>
                            <li><strong>aktuální hodnotu potenciálu</strong>, případně ekvivalentní interpretaci naspořených kreditů či mincí.</li>
                        </ul>
                    </li>
                    <li>
                        U každého algoritmu je zároveň prostor pro
                        <strong>odvození a vysvětlení jeho amortizované složitosti</strong>.
                    </li>
                </ol>

                <h6 class="mt-3"><strong>Co v této aplikaci znamená „Počet kroků“</strong></h6>
                <p>
                    Zobrazený počet kroků představuje počet <strong>elementárních operací</strong>,
                    které byly během simulace skutečně provedeny, například vložení nebo odebrání jedné hodnoty,
                    přesun jednoho prvku mezi strukturami, porovnání vrcholů nebo strukturální změnu datové struktury.
                    Díky tomu lze snadněji porovnat <strong>nejhorší případ jedné operace</strong> s
                    <strong>amortizovanou cenou celé sekvence</strong>.
                </p>

                <h6 class="mt-3"><strong>Algoritmy prezentované v této komponentě</strong></h6>
                <ul>
                    <li><strong>Multipop na zásobníku</strong></li>
                    <li><strong>Fronta pomocí dvou zásobníků</strong></li>
                    <li><strong>Splay strom</strong></li>
                </ul>
                <p>
                    Tyto algoritmy byly zvoleny proto, že každý z nich velmi dobře ukazuje rozdíl mezi cenou jedné jednotlivé operace
                    a dlouhodobým chováním celé sekvence operací.
                </p>

                <h6 class="mt-3"><strong>Jak aplikaci používat</strong></h6>
                <ul>
                    <li>Vyberte jeden z dostupných algoritmů.</li>
                    <li>Zvolte režim vstupu, například <strong>Manuálně</strong>, <strong>Náhodně</strong>, <strong>Nejlepší / Nejhorší případ</strong> nebo <strong>Syntaxe</strong>.</li>
                    <li>Sledujte, jak se struktura mění, jak roste počet kroků a jak se v čase vyvíjí potenciál.</li>
                    <li>Pomocí simulace a vysvětlujících panelů pochopte, proč může být amortizovaná složitost příznivá, i když některé jednotlivé operace vypadají draze.</li>
                </ul>

                <h6 class="mt-3"><strong>Didaktický přínos</strong></h6>
                <p>
                    Smyslem této komponenty je zpřehlednit, zviditelnit a zpřístupnit amortizovanou analýzu pro praktické studium.
                    Student tak nevidí pouze vzorce nebo finální asymptotické odhady, ale může přímo sledovat chování algoritmu
                    a propojit teoretické vysvětlení s konkrétní simulací krok po kroku.
                </p>

                <h6 class="mt-3"><strong>Poznámka ke spolupráci</strong></h6>
                <p class="mb-0">
                    Studenti řešící podobné zadání s jiným číslem v názvu mohou sdílet části uživatelského rozhraní
                    nebo obecný návrh aplikace, ale každý student implementuje jinou trojici algoritmů.
                </p>
        `,
        footerText: "Vytvořil Martin Dressler, DRE0065",
        closeBtn: "Zavřít",
        submitBtn: "Odeslat",
        generateBtn: "Generovat",
        okBtn: "Odeslat",
        messageOkBtn: "OK",
        messageTitle: "Chybová zpráva",
        manualButton: "Manuálně",
        randomButton: "Náhodně",
        bestWorstButton: "Nejlepší / Nejhorší případ",
        syntaxButton: "Syntaxe",
        randomParamsModalLabel: "Nastavení náhodných parametrů",
        rangeMinLabel: "Minimální hodnota:",
        rangeMaxLabel: "Maximální hodnota:",
        countLabel: "Počet hodnot:",
        stepCount: "Počet kroků",
        potential: "Potenciál",
        nextButton: "Další",
        startSyntaxBtn: "Spustit provádění",
        endButton: "Konec",
        bestCase: "Nejlepší případ",
        worstCase: "Nejhorší případ",
        selectCase: "Vyberte případ",
        bestWorstDescription: "Vyberte nejlepší nebo nejhorší případ k provedení:",
        detailNotProvided: "Detail není k dispozici.",
        randomMissingParamsAlert: "Vyplňte minimum, maximum a počet hodnot.",
        randomInvalidIntegerParamsAlert: "Zadejte pouze celá čísla.",
        randomPositiveParamsAlert: "Minimum, maximum i počet musí být kladná čísla.",
        randomMinMaxOrderAlert: "Minimum musí být menší než maximum.",
        nextLabel: "Další",
        syntaxHistoryTitle: "Historie syntax režimu",
        syntaxHistoryButtonTitle: "Otevřít historii",
        syntaxPrevStepTitle: "Předchozí krok",
        syntaxNextStepTitle: "Další krok",
        syntaxExecutionFinished: "Provádění skončilo. Níže se můžeš vracet mezi provedenými kroky nebo tento režim ukončit.",
        bwExecutionModeLabel: "Režim vykonávání",
        executionModeAuto: "Automaticky",
        executionModeManual: "Ručně",
        bwPlayTitle: "Přehrát",
        bwPauseTitle: "Pozastavit",
        bwExecutionFinished: "Provádění skončilo. Níže můžeš otevřít historii nebo tento režim ukončit.",
        bwGoStartTitle: "Přejít na první provedený krok",
        bwGoEndTitle: "Přejít na poslední krok",
        bwStepBackTitle: "Posun o jeden krok zpět",
        bwStepForwardTitle: "Posun o jeden krok dopředu",
        historyModalBaseTitle: "Manuál / Random historie",
        historyCommandLabel: "Příkaz",
        historyEmptyWatermark: "PRÁZDNÉ",
        bestWorstHistoryTitle: "Historie nejlepšího / nejhoršího případu",
        actionChoiceManual: "Ručně",
        actionChoiceRandom: "Náhodně",
        actionChoiceBody: "Vyberte způsob zadání hodnoty.",
        pushChoiceTitle: "Přidat",
        enqueueChoiceTitle: "Vložit do fronty",
        insertChoiceTitle: "Vložit"
    },
    multipop:{
        manualParamsModalLabel: "Nastavení parametrů zásobníku",
        stackValuesLabel: "Zadejte hodnoty zásobníku:",
        multipopTitle: "Multipop na zásobníku",
        multipopAbout: "O multipopu na zásobníku",
        multipopDescription: `
                <p>
                    <strong>Multipop na zásobníku</strong> je jeden z nejklasičtějších příkladů používaných pro vysvětlení
                    <strong>amortizované analýzy</strong>. Algoritmus pracuje s běžným zásobníkem a rozšiřuje obvyklé operace
                    o jednu další operaci, která může najednou odebrat více prvků. Na první pohled může tato operace působit
                    draze, ale při pohledu na celou sekvenci operací je její průměrná cena stále konstantní.
                </p>

                <h6 class="mt-3"><strong>Použitá datová struktura</strong></h6>
                <p>
                    Algoritmus používá jeden <strong>zásobník</strong>, což je struktura typu
                    <strong>LIFO</strong> (<em>poslední dovnitř, první ven</em>). To znamená, že naposledy vložený prvek
                    je vždy první, který lze odebrat.
                </p>

                <h6 class="mt-3"><strong>Operace</strong></h6>
                <ul>
                    <li><strong>Přidat(x)</strong>: vloží hodnotu <em>x</em> na vrchol zásobníku.</li>
                    <li><strong>Odebrat()</strong>: odebere aktuální vrcholový prvek, pokud zásobník není prázdný.</li>
                    <li><strong>Odebrat více(k)</strong>: odebere až <em>k</em> prvků z vrcholu zásobníku.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní princip algoritmu</strong></h6>
                <p>
                    Důležitá myšlenka je, že <strong>Odebrat více(k)</strong> neodebírá nějakou libovolnou skupinu prvků,
                    ale pouze opakovaně provádí stejný typ odebrání, který by provedla operace <strong>Odebrat()</strong>,
                    jen několikrát za sebou. Pokud je v zásobníku méně než <em>k</em> prvků, operace se prostě zastaví ve chvíli,
                    kdy se zásobník vyprázdní.
                </p>
                <p>
                    I když tedy jedno volání <strong>Odebrat více</strong> může odebrat více prvků, každý odebraný prvek musel být
                    dříve vložen a tentýž prvek nikdy nelze odebrat dvakrát.
                </p>

                <h6 class="mt-3"><strong>Proč je algoritmus vhodný pro amortizovanou analýzu</strong></h6>
                <p>
                    Tento algoritmus je vhodný pro amortizovanou analýzu proto, že cena jedné operace se může výrazně lišit.
                    Jedna operace <strong>Přidat</strong> je levná, jedna operace <strong>Odebrat</strong> je levná,
                    ale jedna operace <strong>Odebrat více(k)</strong> může působit draze, pokud při jednom příkazu odebere
                    více prvků. Když se ale díváme na <strong>celou sekvenci operací</strong>, celkový počet odebrání je omezen
                    celkovým počtem dřívějších vložení.
                </p>

                <h6 class="mt-3"><strong>Nejhorší případ vs amortizovaná složitost</strong></h6>
                <ul>
                    <li><strong>Nejhorší případ jedné operace Přidat</strong>: O(1)</li>
                    <li><strong>Nejhorší případ jedné operace Odebrat</strong>: O(1)</li>
                    <li><strong>Nejhorší případ jedné operace Odebrat více(k)</strong>: O(k)</li>
                    <li><strong>Amortizovaná cena na operaci v sekvenci</strong>: O(1)</li>
                </ul>
                <p>
                    Klíčový důvod je jednoduchý: každý prvek může být jednou vložen a později nejvýše jednou odebrán.
                    Proto i když je jeden konkrétní příkaz drahý, celková práce při mnoha příkazech roste jen lineárně
                    s počtem vložených prvků.
                </p>

                <h6 class="mt-3"><strong>Potenciálová metoda</strong></h6>
                <p>
                    V této vizualizaci používáme potenciálovou funkci <strong>Φ = |S|</strong>, kde
                    <strong>|S|</strong> je aktuální počet prvků uložených v zásobníku.
                </p>
                <ul>
                    <li><strong>Přidat</strong> zvětší velikost zásobníku o 1, a tedy zvýší potenciál o 1.</li>
                    <li><strong>Odebrat</strong> zmenší velikost zásobníku o 1, a tedy sníží potenciál o 1.</li>
                    <li><strong>Odebrat více</strong> sníží potenciál o počet skutečně odebraných prvků.</li>
                </ul>
                <p>
                    Intuitivně řečeno: zásobník si při vkládání prvků ukládá potenciál a při odebírání tento uložený potenciál
                    postupně spotřebovává.
                </p>

                <h6 class="mt-3"><strong>Účetní interpretace</strong></h6>
                <p>
                    Stejné chování lze vysvětlit i účetním pohledem. Lze si představit, že každá operace
                    <strong>Přidat</strong> zaplatí nejen svou vlastní okamžitou práci, ale uloží si ještě jeden další kredit
                    na vložený prvek. Když je tento prvek později odebrán operací <strong>Odebrat</strong> nebo
                    <strong>Odebrat více</strong>, jeho uložený kredit tuto práci zaplatí.
                </p>

                <h6 class="mt-3"><strong>Co se v této simulaci zobrazuje</strong></h6>
                <ul>
                    <li><strong>Aktuální obsah zásobníku</strong>, zobrazený jako naskládané bloky.</li>
                    <li><strong>Počet kroků</strong>, který představuje provedené elementární operace.</li>
                    <li><strong>Potenciál</strong>, aktualizovaný po každém příkazu.</li>
                    <li><strong>Detailní vysvětlující panel</strong>, který popisuje, co se v daném kroku stalo.</li>
                    <li><strong>Historie kroků</strong>, ve které je možné se vracet k již provedeným příkazům.</li>
                </ul>

                <h6 class="mt-3"><strong>Co si zde může uživatel vyzkoušet</strong></h6>
                <ul>
                    <li><strong>Manuální režim</strong>: provádět zásobníkové operace přímo jednu po druhé.</li>
                    <li><strong>Náhodný režim</strong>: automaticky vygenerovat počáteční zásobník.</li>
                    <li><strong>Režim nejlepší / nejhorší případ</strong>: pozorovat připravené scénáře.</li>
                    <li><strong>Režim syntaxe</strong>: spustit celou sekvenci příkazů krok po kroku.</li>
                </ul>

                <h6 class="mt-3"><strong>Důležité hraniční situace</strong></h6>
                <ul>
                    <li>Je-li zásobník prázdný, <strong>Odebrat()</strong> neprovede žádné skutečné odebrání.</li>
                    <li>Je-li zásobník prázdný, <strong>Odebrat více(k)</strong> také neprovede žádnou skutečnou práci.</li>
                    <li>Je-li <em>k</em> větší než aktuální velikost zásobníku, <strong>Odebrat více(k)</strong> zásobník pouze vyprázdní.</li>
                    <li>Požadovaný počet odebrání a skutečně provedený počet odebrání se mohou lišit.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní myšlenka</strong></h6>
                <p class="mb-0">
                    <strong>Multipop na zásobníku</strong> je ideální výukový příklad, protože velmi jasně ukazuje rozdíl
                    mezi cenou jedné izolované operace a průměrnou cenou v dlouhé sekvenci. I když může jeden příkaz působit draze,
                    celková práce je silně omezena dřívějšími vloženími, a právě proto zůstává amortizovaná cena konstantní.
                </p>
        `,
        enterValuePrompt: "Zadejte kladné číslo, které chcete přidat do zásobníku:",
        invalidNumberAlert: "Zadejte platné kladné číslo!",
        multipopPrompt: "Zadejte počet prvků, které chcete odebrat:",
        pushButton: "Přidat",
        popButton: "Odebrat",
        multipopButton: "Odebrat více",
        syntaxModalLabel: "Příkazy v syntaxi (Multipop na zásobníku)",
        syntaxInfo: `
                <div class="syn-line">Zadejte své příkazy v syntaxi níže.</div>
                <div class="syn-line"><span class="syn-label">Podporované:</span>
                    <code>push(...)</code>, <code>pop()</code>, <code>multipop(k)</code>
                </div>
                <div class="syn-line">
                    Příkaz <code>push</code> může obsahovat více hodnot: <code>push(5,1,2,4,55)</code>.
                </div>
                <div class="syn-line"><span class="syn-label">Příklad:</span>
                    <code>push(5,1,2,4,55) pop() pop() multipop(2)</code>
                </div>
        `,
        syntaxInputLabel: "Příkazy v syntaxi (Multipop na zásobníku):",
        mpSynPanelTitle: "REŽIM SYNTAXE",
        mpSynPanelDesc: `
                Kliknutím na <strong>Další</strong> se provede právě jeden příkaz.<br/>
                Tento panel u aktuálního příkazu vysvětluje: <strong>co se provedlo</strong>,
                <strong>co se změnilo v zásobníku</strong>, <strong>jaká je skutečná cena</strong>,
                <strong>jak se vypočítal potenciál</strong>, <strong>co to znamená amortizovaně</strong>
                a <strong>jaká je hlavní myšlenka</strong>.<br/>
                Všechny výpočty níže platí pro <strong>aktuální příkaz</strong>.
        `,
        bestCaseDescription: `
            V tomto nejlepším případě závěrečný <strong>Odebrat více</strong> odebere méně prvků, než bylo předtím přidáno.
            Drahá operace tedy ve skutečnosti zůstane omezená a celková práce je malá.
            <ul class="ti-ul16">
                <li>První operace pouze <strong>přidávají prvky</strong> do zásobníku.</li>
                <li>Závěrečný <strong>Odebrat více</strong> odebere jen část zásobníku.</li>
                <li>Je na tom dobře vidět, proč amortizovaná cena zůstává konstantní.</li>
            </ul>
        `,
        worstCaseDescription: `
            V tomto nejhorším případě závěrečný <strong>Odebrat více</strong> odebere všechny prvky, které byly předtím přidány.
            Jedna operace je tedy v této krátké sekvenci co nejdražší.
            <ul class="ti-ul16">
                <li>První operace <strong>naplní zásobník</strong>.</li>
                <li>Závěrečný <strong>Odebrat více</strong> odebere maximální možný počet prvků.</li>
                <li>Ukazuje to nejhorší jednotlivou operaci, i když amortizovaná cena celé sekvence zůstává konstantní.</li>
            </ul>
        `,
        pushDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Přidat({value})</strong>. Hodnota se vloží na vrchol zásobníku.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před operací byla velikost zásobníku {beforeSize}.</li>
                    <li>Po operaci je velikost zásobníku {afterSize}.</li>
                    <li>Novým vrcholem zásobníku je {value}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Provede se jedno elementární vložení do zásobníku.</li>
                    <li>Proto je skutečná cena tohoto příkazu {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Tato operace je levná, ale zároveň zvýší potenciál o 1.
                    Zásobník si tak uloží jednu jednotku „budoucí práce“, která se může později využít při odebírání prvků.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Operace <strong>Přidat</strong> udělá jeden skutečný krok teď a zároveň zvýší uložený potenciál pro další operace.
                </div>
        `,
        popDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Odebrat()</strong>. Vrcholový prvek se odebere ze zásobníku.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před operací byla velikost zásobníku {beforeSize}.</li>
                    <li>Odebraný prvek je {removedValue}.</li>
                    <li>Po operaci je velikost zásobníku {afterSize}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Provede se právě jedno elementární odebrání.</li>
                    <li>Proto je skutečná cena tohoto příkazu {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Příkaz stojí jeden skutečný krok, ale potenciál se zároveň sníží o 1.
                    Tím se spotřebuje jedna dříve uložená jednotka potenciálu.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Odebrání jednoho prvku se „zaplatí“ z dřívějšího vložení, které potenciál zvýšilo.
                </div>
        `,
        multipopDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Odebrat více({requestedCount})</strong>.
                    Tento příkaz může odebrat nejvýše {requestedCount} prvků z vrcholu zásobníku.
                    V tomto kroku se skutečně odeberou {actualCount} prvky.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před operací byla velikost zásobníku {beforeSize}.</li>
                    <li>Odebrané prvky: {removedValues}</li>
                    <li>Po operaci je velikost zásobníku {afterSize}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Každý skutečně odebraný prvek vyžaduje jedno elementární odebrání.</li>
                    <li>Proto je skutečná cena rovna počtu skutečně odebraných prvků.</li>
                    <li>Skutečná cena = {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Jeden příkaz <strong>Odebrat více</strong> může odebrat více prvků a na první pohled tak působí draze.
                    Každý odebraný prvek ale musel být dříve vložen a žádný prvek nejde odebrat více než jednou.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    V celé sekvenci operací je celkový počet odebrání omezen celkovým počtem dřívějších vložení.
                    Proto zůstává amortizovaná cena na operaci konstantní.
                </div>
        `,
        stackLabel: "Zásobník",
        manualValuesInvalidAlert: "Zadejte pouze kladná celá čísla oddělená čárkami (např. 1, 2, 3).",
        syntaxInvalidAlert: "Zadejte platné příkazy v syntaxi pro Multipop na zásobníku!",
        emptyPopDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Odebrat()</strong>, ale zásobník je už prázdný.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před operací byla velikost zásobníku {beforeSize}.</li>
                    <li>Neodebere se žádný prvek.</li>
                    <li>Po operaci je velikost zásobníku stále {afterSize}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Neprovede se žádné elementární odebrání.</li>
                    <li>Proto je skutečná cena tohoto příkazu {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Protože se nic neodebere, struktura se nezmění a nečerpá se žádný dříve uložený potenciál.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Tento případ je důležitý, protože ukazuje, že příkaz byl sice zadán,
                    ale žádná elementární práce se ve skutečnosti neprovedla.
                </div>
        `,
        emptyMultipopDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Odebrat více({requestedCount})</strong>, ale zásobník je už prázdný.
                    Příkaz dovoluje odebrat nejvýše {requestedCount} prvků, ale v tomto kroku se skutečně odebere {actualCount} prvků.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před operací byla velikost zásobníku {beforeSize}.</li>
                    <li>Neodebere se žádný prvek.</li>
                    <li>Po operaci je velikost zásobníku stále {afterSize}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Neprovede se žádné elementární odebrání.</li>
                    <li>Skutečná cena = {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    I když příkaz požaduje odebrání více prvků, žádná skutečná práce se neprovede,
                    protože v zásobníku není dostupný žádný prvek.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Požadovaný horní limit a skutečně vykonaná práce nejsou totéž.
                    V amortizované analýze rozhoduje to, co se opravdu provedlo.
                </div>
        `,
        manualParamsExample: `
            <div class="syn-line">Zadejte počáteční hodnoty zásobníku níže.</div>
            <div class="syn-line">
                <span class="syn-label">Podporované:</span>
                <code>kladná celá čísla oddělená čárkami</code>
            </div>
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>1, 2, 3, 4</code>
            </div>
        `,
        randomParamsInfo: `
            <div class="syn-line">Zadejte parametry pro náhodné vygenerování zásobníku níže.</div>
            <div class="syn-line">
                <span class="syn-label">Podporované:</span>
                <code>pouze kladná celá čísla</code>
            </div>
        `,
        rangeMinExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>1</code>
            </div>
        `,
        rangeMaxExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>100</code>
            </div>
        `,
        countExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>10</code>
            </div>
        `
    },
    queue:{
        queue2StacksTitle: "Fronta pomocí dvou zásobníků",
        queue2StacksAbout: "O frontě pomocí dvou zásobníků",
        queue2StacksDescription: `
                <p>
                    <strong>Fronta pomocí dvou zásobníků</strong> je další standardní a velmi důležitý příklad
                    <strong>amortizované analýzy</strong>. Cílem je realizovat chování fronty
                    (<strong>FIFO</strong>, <em>první dovnitř, první ven</em>) pouze pomocí dvou zásobníků.
                    Jedna operace může být občas drahá, ale při pohledu na delší sekvenci zůstává průměrná cena
                    na operaci konstantní.
                </p>

                <h6 class="mt-3"><strong>Použité datové struktury</strong></h6>
                <p>
                    Algoritmus používá dva zásobníky:
                </p>
                <ul>
                    <li><strong>Vstupní zásobník</strong>: uchovává nově vložené prvky.</li>
                    <li><strong>Výstupní zásobník</strong>: uchovává prvky připravené k odebrání z fronty.</li>
                </ul>
                <p>
                    Tyto dva zásobníky společně napodobují chování jedné fronty.
                </p>

                <h6 class="mt-3"><strong>Operace</strong></h6>
                <ul>
                    <li><strong>Vložit do fronty(x)</strong>: vloží hodnotu <em>x</em> do fronty.</li>
                    <li><strong>Odebrat z fronty()</strong>: odebere nejstarší prvek aktuálně uložený ve frontě.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní princip algoritmu</strong></h6>
                <p>
                    Každý nový prvek se nejdříve vloží do <strong>vstupního zásobníku</strong>. Dokud
                    <strong>výstupní zásobník</strong> obsahuje prvky, může operace <strong>Odebrat z fronty()</strong>
                    odebrat čelní prvek přímo z něj. Pokud je ale <strong>výstupní zásobník</strong> prázdný,
                    všechny prvky z <strong>vstupního zásobníku</strong> se přesunou do výstupního zásobníku.
                    Tento přesun obrátí jejich pořadí, takže nejstarší prvek skončí nahoře ve výstupním zásobníku,
                    což přesně odpovídá chování fronty typu FIFO.
                </p>

                <h6 class="mt-3"><strong>Proč je algoritmus vhodný pro amortizovanou analýzu</strong></h6>
                <p>
                    Tento algoritmus je vhodný pro amortizovanou analýzu proto, že ne každá operace
                    <strong>Odebrat z fronty</strong> stojí stejně. Některá odebrání jsou velmi levná, ale první odebrání
                    po delší sekvenci vložení může spustit celý přesun mnoha prvků ze <strong>vstupního</strong>
                    do <strong>výstupního zásobníku</strong>. Jeden příkaz pak může působit draze.
                </p>
                <p>
                    Každý prvek má ale velmi omezený „životní cyklus“:
                </p>
                <ul>
                    <li>jednou se vloží do <strong>vstupního zásobníku</strong>,</li>
                    <li>nejvýše jednou se přesune ze <strong>vstupního</strong> do <strong>výstupního zásobníku</strong>,</li>
                    <li>jednou se odebere z <strong>výstupního zásobníku</strong>.</li>
                </ul>
                <p>
                    Proto celkové množství práce na jeden prvek zůstává omezené.
                </p>

                <h6 class="mt-3"><strong>Nejhorší případ vs amortizovaná složitost</strong></h6>
                <ul>
                    <li><strong>Nejhorší případ jedné operace Vložit do fronty</strong>: O(1)</li>
                    <li><strong>Nejhorší případ jedné operace Odebrat z fronty</strong>: O(n), pokud je potřeba přesun</li>
                    <li><strong>Amortizovaná cena na operaci v sekvenci</strong>: O(1)</li>
                </ul>
                <p>
                    Drahý přesun se neopakuje stále nad stejnými prvky. Jakmile se prvek jednou přesune do
                    <strong>výstupního zásobníku</strong>, už se zpět nevrací. To je hlavní důvod, proč průměrná cena zůstává konstantní.
                </p>

                <h6 class="mt-3"><strong>Potenciálová metoda</strong></h6>
                <p>
                    V této vizualizaci používáme potenciálovou funkci <strong>Φ = |S<sub>vst</sub>|</strong>,
                    tedy počet prvků aktuálně uložených ve <strong>vstupním zásobníku</strong>.
                </p>
                <ul>
                    <li><strong>Vložit do fronty</strong> zvýší Φ o 1, protože ve vstupním zásobníku přibude nový prvek.</li>
                    <li><strong>Přesun</strong> Φ snižuje, protože prvky vstupní zásobník opouštějí.</li>
                    <li><strong>Odebrání z výstupního zásobníku</strong> Φ nemění, protože vstupní zásobník zůstává stejný.</li>
                </ul>
                <p>
                    Intuitivně řečeno: nově vložené prvky si ukládají potenciál, dokud čekají ve vstupním zásobníku,
                    a tento uložený potenciál se později spotřebuje při přesunu.
                </p>

                <h6 class="mt-3"><strong>Účetní interpretace</strong></h6>
                <p>
                    Účetní pohled lze vysvětlit tak, že prvek při vložení zaplatí nejen za své okamžité vložení,
                    ale uloží si i další kredit na svůj budoucí přesun a konečné odebrání. Protože se každý prvek
                    přesouvá nejvýše jednou, takto uložený kredit stačí.
                </p>

                <h6 class="mt-3"><strong>Co se v této simulaci zobrazuje</strong></h6>
                <ul>
                    <li><strong>Oba vnitřní zásobníky</strong>, aby bylo vidět, kde se každý prvek právě nachází.</li>
                    <li><strong>Proces přesunu</strong>, včetně jednotlivých přesunů ze vstupního do výstupního zásobníku.</li>
                    <li><strong>Počet kroků</strong>, který představuje elementární práci.</li>
                    <li><strong>Potenciál</strong>, aktualizovaný po příkazech i přesunech.</li>
                    <li><strong>Detailní vysvětlující panel</strong>, který popisuje, co se stalo a proč.</li>
                    <li><strong>Historie kroků</strong>, díky které lze znovu prohlížet již provedené příkazy.</li>
                </ul>

                <h6 class="mt-3"><strong>Co si zde může uživatel vyzkoušet</strong></h6>
                <ul>
                    <li><strong>Manuální režim</strong>: přímo vkládat a odebírat hodnoty z fronty.</li>
                    <li><strong>Náhodný režim</strong>: automaticky vygenerovat počáteční frontu.</li>
                    <li><strong>Režim nejlepší / nejhorší případ</strong>: porovnat levné odebrání s odebráním, které spustí přesun.</li>
                    <li><strong>Režim syntaxe</strong>: spustit připravenou sekvenci frontových příkazů krok po kroku.</li>
                </ul>

                <h6 class="mt-3"><strong>Důležité hraniční situace</strong></h6>
                <ul>
                    <li>Jsou-li oba zásobníky prázdné, <strong>Odebrat z fronty()</strong> neodebere žádnou skutečnou hodnotu.</li>
                    <li>Přesun se provádí pouze tehdy, když je <strong>výstupní zásobník</strong> prázdný.</li>
                    <li>První odebrání po mnoha vloženích bývá často nejdražší.</li>
                    <li>Příkaz, který vypadá lokálně draze, může být v celé sekvenci stále levný.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní myšlenka</strong></h6>
                <p class="mb-0">
                    <strong>Fronta pomocí dvou zásobníků</strong> je výborný příklad amortizované analýzy, protože ukazuje,
                    že drahá operace ještě neznamená drahý algoritmus jako celek. I když může jedno odebrání spustit velký přesun,
                    každý prvek se účastní jen malého omezeného počtu elementárních akcí, a právě proto zůstává amortizovaná cena O(1).
                </p>
        `,
        queueManualParamsModalLabel: "Nastavení parametrů fronty",
        queueValuesLabel: "Zadejte hodnoty fronty:",
        enqueueButton: "Vložit do fronty",
        dequeueButton: "Odebrat z fronty",
        enqueuePrompt: "Zadejte kladné číslo, které chcete vložit do fronty:",
        queueStackInLabel: "Vstupní",
        queueStackOutLabel: "Výstupní",
        queueInfoTransfer: "Výstupní zásobník je prázdný -> přesouvám prvky (O(n))...",
        queueInfoMove: "Přesun {value}: vstupní zásobník -> výstupní zásobník",
        queueInfoDequeue: "Odebrání z fronty -> odebírám {value}",
        queueInfoBest: "NEJLEPŠÍ: odebrání z výstupního zásobníku (O(1))",
        queueInfoWorst: "NEJHORŠÍ: první odebrání z fronty spustí přesun (O(n))",
        queueBestWorstModalText: "Vyberte nejlepší nebo nejhorší případ k provedení:",
        queueBestCaseDescription: `
            V tomto nejlepším případě další <strong>odebrání z fronty</strong> odebere prvek přímo z <strong>výstupního zásobníku</strong>.
            Není potřeba žádný přesun, takže operace je levná.
            <ul class="ti-ul16">
                <li>Čelo fronty je už připravené ve <strong>výstupním zásobníku</strong>.</li>
                <li><strong>Odebrání z fronty</strong> provede jen jedno přímé odebrání.</li>
                <li>To odpovídá levnému případu <strong>O(1)</strong>.</li>
            </ul>
        `,
        queueWorstCaseDescription: `
            V tomto nejhorším případě je před další operací <strong>výstupní zásobník</strong> prázdný.
            Proto se musí všechny prvky nejdřív přesunout ze <strong>vstupního zásobníku</strong> do <strong>výstupního zásobníku</strong>.
            <ul class="ti-ul16">
                <li>Čelo fronty není okamžitě připravené.</li>
                <li>První <strong>odebrání z fronty</strong> spustí celý přesun.</li>
                <li>Jde o drahý jednotlivý případ, i když amortizovaná cena v delší sekvenci zůstává konstantní.</li>
            </ul>
        `,
        queueSyntaxModalLabel: "Příkazy v syntaxi (Fronta pomocí dvou zásobníků)",
        queueSyntaxInfo: `
                <div class="syn-line">Zadejte příkazy pro frontu níže.</div>
                <div class="syn-line"><span class="syn-label">Podporované:</span>
                    <code>enqueue(...)</code>, <code>dequeue()</code>
                </div>
                <div class="syn-line">
                    Příkaz <code>enqueue</code> může mít více hodnot: <code>enqueue(1,2,3)</code>.
                </div>
                <div class="syn-line"><span class="syn-label">Příklad:</span>
                    <code>enqueue(1,2,3) dequeue() enqueue(99) dequeue()</code>
                </div>
        `,
        queueSyntaxInputLabel: "Příkazy v syntaxi (Fronta pomocí dvou zásobníků):",
        queueSyntaxInvalidAlert: "Zadejte platné příkazy v syntaxi pro Frontu pomocí dvou zásobníků!",
        queueSynPanelTitle: "REŽIM SYNTAXE",
        queueSynPanelDesc: `
                Kliknutím na <strong>Další</strong> se provede právě jeden příkaz.<br/>
                Tento panel u aktuálního příkazu vysvětluje: <strong>co se provedlo</strong>,
                <strong>co se změnilo ve vstupním a výstupním zásobníku</strong>, <strong>jaká je skutečná cena</strong>,
                <strong>jak se vypočítal potenciál</strong>, <strong>co to znamená amortizovaně</strong>
                a <strong>jaká je hlavní myšlenka</strong>.<br/>
                Všechny výpočty níže platí pro <strong>aktuální příkaz</strong>.
        `,
        queueEnqueueDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Vložit do fronty({value})</strong>. Hodnota se vloží do <em>vstupního zásobníku</em>.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před příkazem: Vstupní zásobník = {beforeIn}, Výstupní zásobník = {beforeOut}.</li>
                    <li>Po příkazu: Vstupní zásobník = {afterIn}, Výstupní zásobník = {afterOut}.</li>
                    <li>Nová hodnota {value} je nyní uložená ve <strong>vstupním zásobníku</strong>.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Provede se právě jedno elementární vložení do <strong>vstupního zásobníku</strong>.</li>
                    <li>Proto je skutečná cena tohoto příkazu {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S<sub>vst</sub>|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Tento příkaz je teď levný, ale zároveň zvýší potenciál o 1.
                    Takto uložený potenciál se později využije při přesunu prvků ze <em>vstupního zásobníku</em> do <em>výstupního zásobníku</em>.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Operace <strong>vložit do fronty</strong> je levná, ale ukládá budoucí práci do potenciálu.
                </div>
        `,
        queueDequeueDetailSimple: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Odebrat z fronty()</strong> a <em>výstupní zásobník</em> už obsahuje prvky,
                    takže se čelní hodnota fronty může odebrat přímo z <em>výstupního zásobníku</em>.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před příkazem: Vstupní zásobník = {beforeIn}, Výstupní zásobník = {beforeOut}.</li>
                    <li>Odebraná hodnota: {removedValue}</li>
                    <li>Po příkazu: Vstupní zásobník = {afterIn}, Výstupní zásobník = {afterOut}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Provede se právě jedno elementární odebrání z <strong>výstupního zásobníku</strong>.</li>
                    <li>Proto je skutečná cena tohoto příkazu {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S<sub>vst</sub>|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Toto je levný případ odebrání z fronty. Protože <strong>výstupní zásobník</strong> už obsahuje čelo fronty,
                    není potřeba žádný přesun a potenciál se nemění.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Když je <em>výstupní zásobník</em> připravený, odebrání z fronty stojí jen jeden skutečný krok.
                </div>
        `,
        queueDequeueDetailTransfer: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Odebrat z fronty()</strong>, ale <em>výstupní zásobník</em> je prázdný.
                    Proto se nejdřív musí všech {transferredCount} prvků přesunout ze <em>vstupního zásobníku</em> do <em>výstupního zásobníku</em>
                    a teprve potom je možné odebrat čelní hodnotu fronty.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před příkazem: Vstupní zásobník = {beforeIn}, Výstupní zásobník = {beforeOut}.</li>
                    <li>Odebraná hodnota: {removedValue}</li>
                    <li>Po příkazu: Vstupní zásobník = {afterIn}, Výstupní zásobník = {afterOut}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Každý přesouvaný prvek stojí dva elementární kroky: jedno odebrání ze <em>vstupního zásobníku</em> a jedno vložení do <em>výstupního zásobníku</em>.</li>
                    <li>Potom ještě proběhne jedno finální odebrání z <em>výstupního zásobníku</em>.</li>
                    <li>Skutečná cena = 2 × {transferredCount} + 1 = {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S<sub>vst</sub>|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Tento jeden příkaz může vypadat draze, protože se najednou přesouvá více prvků.
                    Každý prvek se ale ze <em>vstupního zásobníku</em> do <em>výstupního zásobníku</em> může přesunout nejvýše jednou za celou sekvenci.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Jedno odebrání z fronty může být drahé, ale cena přesunu se rozpočítá mezi dřívější operace vložení do fronty,
                    takže amortizovaná cena na příkaz zůstává konstantní.
                </div>
        `,
        queueInfoTransferTitle: "Přesun (výstupní zásobník je prázdný)",
        queueInfoTransferDetail: `
                <div><strong>Co se stane</strong></div>
                <div>
                    Výstupní zásobník je prázdný, proto musíme přesunout všechny prvky ze <em>vstupního zásobníku</em> do <em>výstupního zásobníku</em>.
                </div>
                <div class="info-panel-sep"></div>
                <div><strong>Proč to děláme</strong></div>
                <div>
                    Přesun otočí pořadí prvků, takže nejstarší prvek se dostane nahoru do výstupního zásobníku, což odpovídá chování FIFO.
                </div>
                <div class="info-panel-sep"></div>
                <div><strong>Potenciál Φ</strong></div>
                <div>
                    Φ = |S<sub>vst</sub>| se během přesunu snižuje, protože vstupní zásobník se postupně vyprazdňuje.
                </div>
        `,
        queueInfoMoveTitle: "Přesun <span class=\"pushValue\">{value}</span> (vstupní zásobník → výstupní zásobník)",
        queueInfoMoveDetail: `
                <div><strong>Tento mikrokrok</strong></div>
                <ul class="ti-ul18">
                    <li><strong>Odebrání</strong> <span class="pushValue">{value}</span> ze <em>vstupního zásobníku</em> (1 krok)</li>
                    <li><strong>Vložení</strong> <span class="pushValue">{value}</span> do <em>výstupního zásobníku</em> (1 krok)</li>
                </ul>
                <div class="info-panel-sep"></div>
                <div><strong>Potenciál Φ</strong></div>
                <div>
                    Φ se sníží o <span class="potentialValue">1</span>, protože vstupní zásobník přišel o jeden prvek.
                </div>
        `,
        queueInfoDequeueTitle: "Odebrání hodnoty <span class=\"popValue\">{value}</span>",
        queueInfoDequeueDetail: `
                <div><strong>Co se stane</strong></div>
                <div>
                    Odebereme vrcholový prvek z <em>výstupního zásobníku</em>. To je čelo fronty.
                </div>
                <div class="info-panel-sep"></div>
                <div><strong>Potenciál Φ</strong></div>
                <div>
                    Φ zůstává <span class="potentialValue">{potential}</span>, protože Φ závisí jen na vstupním zásobníku.
                </div>
        `,
        manualValuesInvalidAlert: "Zadejte pouze kladná celá čísla oddělená čárkami (např. 1, 2, 3).",
        invalidNumberAlert: "Zadejte platné kladné číslo!",
        emptyDequeueDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Odebrat z fronty()</strong>, ale jak <em>vstupní zásobník</em>, tak <em>výstupní zásobník</em> jsou prázdné.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Před příkazem: Vstupní zásobník = {beforeIn}, Výstupní zásobník = {beforeOut}.</li>
                    <li>Neodebere se žádná hodnota.</li>
                    <li>Po příkazu: Vstupní zásobník = {afterIn}, Výstupní zásobník = {afterOut}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Neprovede se žádný elementární přesun ani odebrání.</li>
                    <li>Proto je skutečná cena tohoto příkazu {actualCost}.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>Používáme potenciálovou funkci <strong>Φ = |S<sub>vst</sub>|</strong>.</div>
                <ul class="ti-ul18">
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {phiAfter} - {phiBefore} = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Protože je fronta prázdná, neprovede se žádná skutečná práce a potenciál zůstává beze změny.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Zadaný příkaz a skutečně provedená práce nejsou vždy totéž.
                    V amortizované analýze rozhoduje to, co se opravdu vykonalo.
                </div>
        `,
        randomParamsInfo: `
            <div class="syn-line">Zadejte náhodně generované parametry fronty níže.</div>
            <div class="syn-line">
                <span class="syn-label">Podporované:</span>
                <code>pouze kladná celá čísla</code>
            </div>
        `,
        rangeMinExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>1</code>
            </div>
        `,
        rangeMaxExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>100</code>
            </div>
        `,
        countExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>10</code>
            </div>
        `,
        queueManualParamsExample: `
            <div class="syn-line">Zadejte počáteční hodnoty fronty níže.</div>
            <div class="syn-line">
                <span class="syn-label">Podporované:</span>
                <code>kladná celá čísla oddělená čárkami</code>
            </div>
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>1, 2, 3, 4</code>
            </div>
        `
    },
    splay:{
        splayTreeTitle: "Splay strom",
        splayTreeAbout: "O splay stromu",
        splayTreeDescription: `
                <p>
                    <strong>Splay strom</strong> je <strong>samopřizpůsobující se binární vyhledávací strom</strong>.
                    Na rozdíl od přísně vyvažovaných stromů si neukládá speciální informace o vyvážení.
                    Místo toho zlepšuje svůj tvar průběžně během používání. Po přístupové operaci se navštívený vrchol,
                    případně poslední relevantně navštívený vrchol, pomocí rotací přesune blíže ke kořeni.
                    Tento proces restrukturalizace se nazývá <strong>operace Splay</strong>.
                </p>

                <h6 class="mt-3"><strong>Použitá datová struktura</strong></h6>
                <p>
                    Algoritmus používá jeden <strong>binární vyhledávací strom</strong>, ve kterém:
                </p>
                <ul>
                    <li>menší hodnoty leží v levém podstromu,</li>
                    <li>větší hodnoty leží v pravém podstromu,</li>
                    <li>tvar stromu se po operacích může měnit kvůli operaci Splay.</li>
                </ul>

                <h6 class="mt-3"><strong>Operace</strong></h6>
                <ul>
                    <li><strong>Vložit(x)</strong>: vloží novou hodnotu a potom vložený vrchol přesune operací Splay směrem ke kořeni.</li>
                    <li><strong>Vyhledat(x)</strong>: hledá hodnotu a potom operací Splay přesune nalezený vrchol, nebo poslední navštívený vrchol, směrem ke kořeni.</li>
                    <li><strong>Smazat(x)</strong>: najde hodnotu, upraví strom pomocí operace Splay, odstraní vrchol a znovu propojí zbývající podstromy.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní princip algoritmu</strong></h6>
                <p>
                    Základní myšlenka je, že často navštěvované hodnoty by se měly postupně přesouvat blíž ke kořeni.
                    Tím se další přístupy k podobným hodnotám zlevní. Strom se tedy nesnaží být v každém okamžiku dokonale vyvážený,
                    ale průběžně přizpůsobuje svůj tvar podle skutečných přístupů.
                </p>
                <p>
                    Tato restrukturalizace se provádí rotacemi. Nejčastější případy jsou:
                </p>
                <ul>
                    <li><strong>Zig</strong>: jedna rotace, když je rodič již kořenem.</li>
                    <li><strong>Zig-Zig</strong>: dvě rotace stejným směrem.</li>
                    <li><strong>Zig-Zag</strong>: dvě rotace opačnými směry.</li>
                </ul>

                <h6 class="mt-3"><strong>Proč je algoritmus vhodný pro amortizovanou analýzu</strong></h6>
                <p>
                    Tento algoritmus je vhodný pro amortizovanou analýzu proto, že jedna jednotlivá operace může být drahá.
                    Ve výrazně vychýleném stromu může vyhledání, vložení i smazání procházet mnoho vrcholů a provést mnoho rotací.
                    Nejhorší případ jedné operace tak může být lineární.
                </p>
                <p>
                    Tato drahá práce se ale „neztratí“. Strom se při ní přeuspořádá tak, že další operace bývají levnější.
                    Právě kvůli tomuto dlouhodobému strukturálnímu efektu je průměrná cena v celé sekvenci výrazně lepší
                    než nejhorší případ jedné izolované operace.
                </p>

                <h6 class="mt-3"><strong>Nejhorší případ vs amortizovaná složitost</strong></h6>
                <ul>
                    <li><strong>Nejhorší případ jedné operace</strong>: O(n)</li>
                    <li><strong>Amortizovaná cena na operaci v sekvenci</strong>: O(log n)</li>
                </ul>
                <p>
                    Právě proto se Splay strom vyučuje jako významný příklad amortizované analýzy:
                    lokální chování může být drahé, ale globální chování při mnoha operacích je v průměru logaritmické.
                </p>

                <h6 class="mt-3"><strong>Potenciálová metoda</strong></h6>
                <p>
                    Klasická analýza používá potenciálovou funkci založenou na velikostech podstromů:
                    <strong>Φ(T) = Σ log₂(velikost(podstromu(v)))</strong>.
                </p>
                <p>
                    Intuice je taková, že potenciál vyjadřuje, jak je strom strukturálně uspořádán.
                    Rotace mění velikosti podstromů, a proto mění i hodnotu potenciálu. Nákladný restrukturalizační krok
                    může výrazně zlepšit budoucí tvar stromu a právě tato změna se v poklesu potenciálu projeví.
                </p>

                <h6 class="mt-3"><strong>Účetní interpretace</strong></h6>
                <p>
                    Ve srovnání se zásobníkovými příklady je zde účetní interpretace méně intuitivní v podobě jednotlivých kreditů,
                    protože cena závisí na tvaru celého stromu. Hlavní myšlenka ale zůstává stejná:
                    drahá restrukturalizace není zbytečná práce, protože mění strukturu a pomáhá budoucím operacím.
                </p>

                <h6 class="mt-3"><strong>Co se v této simulaci zobrazuje</strong></h6>
                <ul>
                    <li><strong>Aktuální struktura stromu</strong>, včetně vrcholů a hran.</li>
                    <li><strong>Navštívená cesta</strong>, tedy které vrcholy byly při operaci procházeny.</li>
                    <li><strong>Rotace</strong>, které vizuálně ukazují, jak se strom během operace Splay mění.</li>
                    <li><strong>Počet kroků</strong>, který představuje porovnání a strukturální operace.</li>
                    <li><strong>Potenciál</strong>, založený na velikostech podstromů.</li>
                    <li><strong>Detailní vysvětlující panel</strong>, který popisuje prováděný příkaz.</li>
                    <li><strong>Historie kroků</strong>, ve které lze znovu procházet dříve provedené příkazy.</li>
                </ul>

                <h6 class="mt-3"><strong>Co si zde může uživatel vyzkoušet</strong></h6>
                <ul>
                    <li><strong>Manuální režim</strong>: přímo vkládat, vyhledávat a mazat hodnoty.</li>
                    <li><strong>Náhodný režim</strong>: automaticky vygenerovat počáteční strom.</li>
                    <li><strong>Režim nejlepší / nejhorší případ</strong>: sledovat příznivé i nepříznivé strukturální situace.</li>
                    <li><strong>Režim syntaxe</strong>: spustit celou sekvenci stromových příkazů krok po kroku.</li>
                </ul>

                <h6 class="mt-3"><strong>Důležité hraniční situace</strong></h6>
                <ul>
                    <li>Vyhledání neexistující hodnoty může strom také změnit, protože se operací Splay může přesunout poslední navštívený vrchol.</li>
                    <li>Vložení již existující hodnoty nevytvoří duplicitní vrchol.</li>
                    <li>Smazání v prázdném stromu neprovede žádné skutečné strukturální odebrání.</li>
                    <li>Silně vychýlený strom může způsobit drahou jednotlivou operaci, ale neporušuje amortizovanou záruku.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní myšlenka</strong></h6>
                <p class="mb-0">
                    <strong>Splay strom</strong> je silný příklad amortizované analýzy, protože ukazuje, že algoritmus může být
                    lokálně drahý, a přesto globálně efektivní. Strom se průběžně přeuspořádává podle skutečných přístupů
                    a právě díky této restrukturalizaci vychází amortizovaná složitost operací O(log n), i když jedna konkrétní
                    operace může mít v nejhorším případě stále lineární cenu.
                </p>
        `,
        splayInsertButton: "Vložit",
        splaySearchButton: "Vyhledat",
        splayDeleteButton: "Smazat",
        splayInitTitle: "Nastavení parametrů stromu",
        splayInitLabel: "Zadejte hodnoty stromu:",
        splayInitPlaceholder: "1, 2, 3, 4",
        splayInitInvalid: "Zadejte alespoň jedno platné kladné číslo (např. 1,2,3).",
        splaySearchPrompt: "Zadejte kladnou hodnotu, kterou chcete vyhledat:",
        splayInsertPrompt: "Zadejte kladnou hodnotu, kterou chcete vložit:",
        splayDeletePrompt: "Zadejte kladnou hodnotu, kterou chcete smazat:",
        splayRandomParamsModalLabel: "Nastavení náhodných parametrů",
        splayRandomTooManyAlert: "Počet hodnot nemůže být větší než počet unikátních hodnot ve zvoleném rozsahu.",
        splayInitialValuesLabel: "Počáteční hodnoty:",
        splayGeneratedValuesLabel: "Vygenerované hodnoty:",
        splayBestWorstDescription: "Vyberte nejlepší nebo nejhorší případ k provedení:",
        splayBwBestTitle: "NEJLEPŠÍ PŘÍPAD",
        splayBwWorstTitle: "NEJHORŠÍ PŘÍPAD",
        splayBwBestDesc: `
            V tomto nejlepším případě je navštívený vrchol mělký a struktura stromu zůstává poměrně příznivá.
            Operace proto potřebuje jen malý počet porovnání a rotací.
            <ul class="ti-ul16">
                <li>Strom je vytvořen v relativně výhodném tvaru.</li>
                <li>Zvolená operace pracuje s vrcholem blízko kořene.</li>
                <li>Díky tomu je malá jak skutečná práce, tak i strukturální změna stromu.</li>
            </ul>
        `,
        splayBwWorstDesc: `
            V tomto nejhorším případě se strom výrazně vychýlí a hledaný nebo mazaný vrchol je hluboko.
            Jedna operace pak vyžaduje mnoho rotací a stává se drahou.
            <ul class="ti-ul16">
                <li>Tvar stromu se začne podobat spojovému seznamu.</li>
                <li>Zvolená operace musí projít hluboko do struktury.</li>
                <li>Ukazuje to drahý jednotlivý případ, i když amortizovaná složitost v delších sekvencích zůstává logaritmická.</li>
            </ul>
        `,
        splayBwStepInsertTitle: "Vložit {value}",
        splayBwStepSearchTitle: "Vyhledat {value}",
        splayBwStepDeleteTitle: "Smazat {value}",
        splaySyntaxModalLabel: "Syntaxové příkazy (Splay strom)",
        splaySyntaxInfo: `
                <div class="syn-line">Zadejte příkazy oddělené mezerami.</div>
                <div class="syn-line"><span class="syn-label">Podporované:</span>
                    <code>insert(...)</code>, <code>search(...)</code>, <code>delete(...)</code>
                </div>
                <div class="syn-line">
                    Příkaz <code>insert</code> může mít víc hodnot: <code>insert(10,5,15)</code>.
                </div>
                <div class="syn-line"><span class="syn-label">Příklad:</span>
                    <code>insert(10,5,15) search(5) delete(10)</code>
                </div>
        `,
        splaySyntaxInputLabel: "Syntaxové příkazy (Splay strom):",
        splaySyntaxInvalidAlert: "Zadejte platné syntaxové příkazy pro Splay strom!",
        splaySynPanelTitle: "SYNTAX REŽIM",
        splaySynPanelDesc: `
                Kliknutím na <strong>Další</strong> se provede právě jeden příkaz.<br/>
                Tento panel u aktuálního příkazu vysvětluje: <strong>co se provedlo</strong>,
                <strong>co se změnilo ve stromu</strong>, <strong>jaká je skutečná cena</strong>,
                <strong>jak se vypočítal potenciál</strong>, <strong>co to znamená amortizovaně</strong>,
                <strong>jaká je hlavní myšlenka</strong> a navíc i <strong>vnitřní rozpad příkazu</strong>.<br/>
                Pokud příkaz provede rotace, každá rotace je níže vypsaná zvlášť i se svými
                <strong>Δkroky</strong>, <strong>Φ před</strong>, <strong>Φ po</strong> a <strong>ΔΦ</strong>.
        `,
        invalidNumberAlert: "Zadejte platné kladné číslo!",
        randomParamsInfo: `
            <div class="syn-line">Zadejte náhodně generované parametry splay stromu níže.</div>
            <div class="syn-line">
                <span class="syn-label">Podporované:</span>
                <code>pouze kladná celá čísla</code>
            </div>
        `,
        rangeMinExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>1</code>
            </div>
        `,
        rangeMaxExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>100</code>
            </div>
        `,
        countExample: `
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>10</code>
            </div>
        `,
        splayInitInfo: `
            <div class="syn-line">Zadejte počáteční hodnoty stromu níže.</div>
            <div class="syn-line">
                <span class="syn-label">Podporované:</span>
                <code>kladná celá čísla oddělená čárkami</code>
            </div>
            <div class="syn-line">
                <span class="syn-label">Příklad:</span>
                <code>10, 5, 15</code>
            </div>
        `,
        splaySyntaxStartHint: `Kliknutím na <strong>Další</strong> se tento příkaz vykoná.`,
        splayEmptyTreeShort: "prázdný strom",
        splaySyntaxStatusInserted: "Nový vrchol byl vložen a následně operací Splay přesunut směrem ke kořeni.",
        splaySyntaxStatusDuplicate: "Hodnota už ve stromu existovala, takže se žádný nový vrchol nevytvořil.",
        splaySyntaxStatusFound: "Hodnota byla nalezena a navštívený vrchol byl operací Splay přesunut do kořene.",
        splaySyntaxStatusNotFound: "Hodnota nalezena nebyla, proto se do kořene přesunul poslední navštívený vrchol.",
        splaySyntaxStatusDeleted: "Hodnota byla nalezena, přesunuta do kořene a následně odstraněna.",
        splaySyntaxStatusNotDeleted: "Hodnota nalezena nebyla, takže se strom jen strukturálně upravil podle posledního navštíveného vrcholu.",
        splaySyntaxInsertDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Vložit({value})</strong>. {statusText}
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Po tomto příkazu je kořenem stromu {rootAfter}.</li>
                    <li>Pokud byly potřeba rotace, jsou rozepsané níže ve vnitřním rozpadu příkazu.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Celková skutečná cena tohoto příkazu je {actualCost}.</li>
                    <li>Tuto cenu tvoří hlavně porovnání při průchodu BST, samotné vložení nového listu a všechny provedené rotace.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>
                    Používáme potenciálovou funkci
                    <strong>Φ(T) = Σ<sub>v∈T</sub> log₂(velikost(podstromu(v)))</strong>.
                </div>
                <ul class="ti-ul18">
                    <li><strong>v</strong> označuje jeden konkrétní vrchol stromu.</li>
                    <li>Symbol <strong>Σ</strong> znamená, že tuto hodnotu spočítáme pro každý vrchol stromu a všechny výsledky sečteme.</li>
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Jedno vložení může obsahovat více rotací, a proto může působit draze.
                    Tato přestavba ale může zlepšit tvar stromu pro budoucí operace.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Jeden příkaz ve splay stromu může obsahovat více vnitřních fází, proto je důležité sledovat i detailní rozpad níže.
                </div>

                {traceBreakdown}
        `,
        splaySyntaxSearchDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Vyhledat({value})</strong>. {statusText}
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Po tomto příkazu je kořenem stromu {rootAfter}.</li>
                    <li>Kořen se změní proto, že nalezený vrchol nebo poslední navštívený vrchol se operací Splay přesune nahoru.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Celková skutečná cena tohoto příkazu je {actualCost}.</li>
                    <li>Tuto cenu tvoří hlavně porovnání při průchodu BST a všechny rotace provedené během operace Splay.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>
                    Používáme potenciálovou funkci
                    <strong>Φ(T) = Σ<sub>v∈T</sub> log₂(velikost(podstromu(v)))</strong>.
                </div>
                <ul class="ti-ul18">
                    <li><strong>v</strong> označuje jeden konkrétní vrchol stromu.</li>
                    <li>Symbol <strong>Σ</strong> znamená, že tuto hodnotu spočítáme pro každý vrchol stromu a všechny výsledky sečteme.</li>
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    I neúspěšné vyhledání může být užitečné, protože přesun posledního navštíveného vrcholu může zlepšit tvar stromu pro podobné budoucí dotazy.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Ve splay stromu vyhledání neodpovídá jen na dotaz, ale zároveň aktivně mění strukturu stromu.
                </div>

                {traceBreakdown}
        `,
        splaySyntaxDeleteDetail: `
                <div><strong>Co se stalo</strong></div>
                <div>
                    Provádí se <strong>Smazat({value})</strong>. {statusText}
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Dopad na datovou strukturu</strong></div>
                <ul class="ti-ul18">
                    <li>Po tomto příkazu je kořenem stromu {rootAfter}.</li>
                    <li>Pokud hodnota existovala, strom se při mazání rozdělil a následně znovu spojil.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Skutečná cena</strong></div>
                <ul class="ti-ul18">
                    <li>Celková skutečná cena tohoto příkazu je {actualCost}.</li>
                    <li>Tuto cenu tvoří hlavně porovnání při průchodu BST, případný průchod v levém podstromu a všechny rotace provedené během operace Splay.</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Změna potenciálu</strong></div>
                <div>
                    Používáme potenciálovou funkci
                    <strong>Φ(T) = Σ<sub>v∈T</sub> log₂(velikost(podstromu(v)))</strong>.
                </div>
                <ul class="ti-ul18">
                    <li><strong>v</strong> označuje jeden konkrétní vrchol stromu.</li>
                    <li>Symbol <strong>Σ</strong> znamená, že tuto hodnotu spočítáme pro každý vrchol stromu a všechny výsledky sečteme.</li>
                    <li>Φ<sub>před</sub> = {phiBefore}</li>
                    <li>Φ<sub>po</sub> = {phiAfter}</li>
                    <li>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub> = {deltaPhi}</li>
                </ul>

                <div class="info-panel-sep"></div>

                <div><strong>Amortizovaná interpretace</strong></div>
                <div>
                    Mazání může být drahé, protože může zahrnovat vyhledání, operaci Splay, rozdělení stromu i znovuspojení podstromů.
                    Právě tato přestavba ale pomáhá držet amortizovanou složitost logaritmickou v dlouhé sekvenci operací.
                </div>

                <div class="info-panel-sep"></div>

                <div><strong>Hlavní myšlenka</strong></div>
                <div>
                    Ve splay stromu není mazání jen „odeber jeden vrchol“, ale plnohodnotná strukturální operace.
                </div>

                {traceBreakdown}
        `,
        splayTraceSectionTitle: "Vnitřní rozpad tohoto příkazu",
        splayTraceEmpty: "U tohoto příkazu nebyly zaznamenány žádné další vnitřní fáze.",
        splayTraceMetrics: `Naměřené metriky této fáze: Δkroky = {deltaSteps}, Φ<sub>před</sub> = {phiBefore}, Φ<sub>po</sub> = {phiAfter}, ΔΦ = {deltaPhi}.`,
        splayTraceRootInsertTitle: "Vytvoření kořene",
        splayTraceRootInsertDetail: `Strom byl prázdný, takže nový vrchol {value} se okamžitě stává kořenem. Aktuální kořen: {rootKey}.`,
        splayTracePathTitle: "Průchod BST cestou",
        splayTracePathDetail: `{operationText} cíl {target}. Navštívená cesta: <strong>{pathText}</strong>. Výsledek tohoto průchodu: {outcomeText}.{positionText} Počet porovnání v této fázi: {compareCount}.`,
        splayTracePathPositionText: ` Místo vložení bylo určeno vzhledem k rodiči {parentKey} jako <strong>{sideText}</strong> potomek.`,
        splayTraceInsertAttachTitle: "Připojení nového listu",
        splayTraceInsertAttachDetail: `Nový vrchol {value} se připojí jako <strong>{sideText}</strong> potomek rodiče {parentKey}.`,
        splayTraceRotateLeftTitle: "Levá rotace",
        splayTraceRotateLeftDetail: `Provádí se <strong>{caseLabel}</strong> levá rotace kolem vrcholu {pivotKey}. Vrchol {promotedKey} se přesune nad něj. Kořen po této rotaci: {rootAfter}.`,
        splayTraceRotateRightTitle: "Pravá rotace",
        splayTraceRotateRightDetail: `Provádí se <strong>{caseLabel}</strong> pravá rotace kolem vrcholu {pivotKey}. Vrchol {promotedKey} se přesune nad něj. Kořen po této rotaci: {rootAfter}.`,
        splayTraceDeleteSplitTitle: "Rozdělení stromu kolem mazaného kořene",
        splayTraceDeleteSplitDetail: `Kořenový vrchol {deletedKey} je odstraněn. Zbývající levý podstrom má kořen {leftRootKey} a zbývající pravý podstrom má kořen {rightRootKey}.`,
        splayTraceDeleteJoinPathTitle: "Hledání maxima v levém podstromu",
        splayTraceDeleteJoinPathDetail: `Uvnitř levého podstromu byla navštívená cesta <strong>{pathText}</strong>. Maximum nalezené na této cestě je vrchol {maxKey}. Počet porovnání v této fázi: {compareCount}.`,
        splayTraceDeleteAttachRightTitle: "Připojení pravého podstromu",
        splayTraceDeleteAttachRightDetail: `Pravý podstrom s kořenem {attachedRightKey} se připojí k aktuálnímu kořeni {rootKey}. Kořen po této fázi: {rootAfter}.`,
        splayOperationInsertText: "Vložení",
        splayOperationSearchText: "Vyhledání",
        splayOperationDeleteText: "Smazání",
        splayOutcomeDuplicate: "hodnota už ve stromu existuje",
        splayOutcomePositionFound: "bylo nalezeno místo pro vložení",
        splayOutcomeFound: "hodnota byla nalezena",
        splayOutcomeNotFound: "hodnota nalezena nebyla",
        splayCaseZig: "Zig",
        splayCaseZigZig: "Zig-Zig",
        splayCaseZigZag: "Zig-Zag",
        splaySideLeft: "levý",
        splaySideRight: "pravý"
    }
  }
};