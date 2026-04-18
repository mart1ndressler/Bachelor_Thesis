window.translations = {
  en:{
    common:{
        title_main: "Main Page",
        navBrand: "Amortized Complexity",
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
                    <li>The application itself provides a <strong>CZ/EN interface</strong> and also supports switching between <strong>light and dark mode</strong> for easier use and wider accessibility.</li>
                </ul>

                <h6 class="mt-3"><strong>Main goal of the thesis</strong></h6>
                <p>
                    The main goal is to create a dynamic web component that helps students understand
                    <strong>how amortized complexity is analyzed</strong>. The emphasis is not only on the final complexity result,
                    but on the whole process as well: how the data structure changes, how many elementary operations are performed,
                    how the potential develops, and how the chosen amortized-analysis method explains the total cost of a sequence of operations.
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
                            <li><strong>Prepared characteristic scenarios</strong> presented as special cases,</li>
                            <li><strong>Syntax-based input</strong>, where the user enters a whole sequence of commands that are then executed step by step with explanations.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Step-by-step visualization and explanation</strong> of the selected algorithm, including its internal state and the meaning of the currently executed command.
                    </li>
                    <li>
                        <strong>A detailed explanation panel</strong> showing what happened in the current step, how the data structure changed, what the actual cost was, how the potential changed, what amortized cost follows from it, and what the main idea of the step is.
                    </li>
                    <li>
                        <strong>History of executed commands</strong>, allowing the user to return to already completed steps and inspect them again.
                    </li>
                </ol>

                <h6 class="mt-3"><strong>What the user can observe during simulation</strong></h6>
                <ul>
                    <li><strong>the current state of computation</strong> and of the used data structures,</li>
                    <li><strong>the number of executed operations</strong>,</li>
                    <li><strong>the number of performed steps</strong>,</li>
                    <li><strong>the current value of potential</strong>, or an equivalent saved-credit interpretation,</li>
                    <li><strong>the progression of the current command</strong> and its explanation in context.</li>
                </ul>

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
                    <li>Choose an input mode, such as <strong>Manual</strong>, <strong>Random</strong>, <strong>Special Cases</strong>, or <strong>Syntax</strong>.</li>
                    <li>Observe how the structure evolves, how the step count changes, how the potential develops over time, and how the explanation panel interprets the currently displayed step.</li>
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
        messageOkBtn: "OK",
        messageTitle: "Message",
        manualButton: "Manually",
        randomButton: "Randomly",
        specialCasesButton: "Special Cases",
        syntaxButton: "Syntax",
        randomParamsModalLabel: "Set Random Parameters",
        rangeMinLabel: "Minimum value:",
        rangeMaxLabel: "Maximum value:",
        countLabel: "Number of Operations:",
        stepCount: "Step Count",
        potential: "Potential",
        nextButton: "Next",
        startSyntaxBtn: "Start Execution",
        endButton: "End",
        selectCase: "Select Scenario",
        specialCasesDescription: "Choose one of the prepared characteristic scenarios for the selected algorithm:",
        detailNotProvided: "Detail not provided.",
        randomMissingParamsAlert: "Fill in minimum, maximum and count of operations.",
        randomInvalidIntegerParamsAlert: "Enter whole numbers only.",
        randomPositiveParamsAlert: "Minimum, maximum and count of operations must be positive numbers.",
        randomMinMaxOrderAlert: "Minimum must be smaller than maximum.",
        nextLabel: "Next",
        syntaxHistoryTitle: "Syntax mode history",
        syntaxHistoryButtonTitle: "Open history",
        syntaxPrevStepTitle: "Previous step",
        syntaxNextStepTitle: "Next step",
        syntaxExecutionFinished: "Execution has finished. You can browse the executed steps below or end this mode.",
        scExecutionModeLabel: "Execution mode",
        executionModeAuto: "Automatic",
        executionModeManual: "Manual",
        scPlayTitle: "Play",
        scPauseTitle: "Pause",
        scExecutionFinished: "Execution has finished. You can open the history below or end this mode.",
        scAutoPanelDesc: `
                In this mode, the scenario runs automatically.
                You can pause the playback, resume it, move one step backward or forward,
                or jump to the beginning or to the end of the already executed sequence.
                The panel below always explains the currently displayed step.
        `,
        scManualPanelDesc: `
                In this mode, the scenario is executed step by step using the <strong>Next</strong> button.
                The panel below always explains the currently executed step, its effect on the data structure,
                the actual cost, the potential change, the amortized cost, and the main idea of the step.
        `,
        scGoStartTitle: "Go to the first executed step",
        scGoEndTitle: "Jump to the final step",
        scStepBackTitle: "Go one step back",
        scStepForwardTitle: "Go one step forward",
        historyModalBaseTitle: "Manual / Random history",
        historyCommandLabel: "Command",
        historyEmptyWatermark: "EMPTY",
        specialCasesHistoryTitle: "Special cases history",
        actionChoiceManual: "Manual",
        actionChoiceRandom: "Random",
        actionChoiceBody: "Choose how you want to provide the value.",
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
        navToggleLabel: "Toggle navigation",
        themeToggleToDark: "Switch to dark mode",
        themeToggleToLight: "Switch to light mode",
        invalidNumberAlert: "Enter a valid positive number!",
        manualValuesInvalidAlert: "Enter only positive integers separated by commas (e.g. 1, 2, 3).",
        operationCount: "Operation Count",
        infoSectionPotential: "Potential calculation",
        infoSectionAmortizedCost: "Amortized cost of this operation",
        infoSectionTotalAmortized: "Total amortized cost from the beginning",
        infoSectionComplexity: "Complexity",
        infoPotentialFormulaStack: "We use the potential function Φ = |S|.",
        infoPotentialFormulaQueue: "We use the potential function Φ = |S<sub>in</sub>|.",
        infoPotentialFormulaSplay: "We use the potential function Φ(T) = Σ<sub>v∈T</sub> log<sub>2</sub>(size(subtree(v))).",
        infoAmortizedFormula: "We compute the amortized cost by the formula â = c + ΔΦ.",
        infoTotalAmortizedFormula: "We update the running total by the formula Â<sub>k</sub> = Â<sub>k-1</sub> + â<sub>k</sub>.",
        infoOperationComplexityLabel: "Complexity of this executed operation type",
        infoAmortizedComplexityLabel: "Amortized complexity",
        infoSymbolsMeaningTitle: "Meaning of used symbols",
        infoMeaningPhi: "Φ is the value of the potential function.",
        infoMeaningPhiBefore: "Φ<sub>before</sub> is the potential before this operation.",
        infoMeaningPhiAfter: "Φ<sub>after</sub> is the potential after this operation.",
        infoMeaningDeltaPhi: "ΔΦ is the change of potential during this operation.",
        infoPhiBeforeShort: "Φ<sub>before</sub>",
        infoPhiAfterShort: "Φ<sub>after</sub>",
        infoMeaningActualCost: "c is the actual cost of this operation.",
        infoMeaningAmortizedCost: "â is the amortized cost of this operation.",
        infoMeaningCurrentStepAmortizedCost: "â<sub>k</sub> is the amortized cost of the current operation.",
        infoMeaningPrevTotalAmortized: "Â<sub>k-1</sub> is the total amortized cost before this operation.",
        infoMeaningCurrentTotalAmortized: "Â<sub>k</sub> is the total amortized cost after this operation.",
        complexityConst: "O(1)",
        complexityLinearK: "O(k)",
        complexityLinearN: "O(n)",
        complexityLogN: "O(log n)",
        operationPrevLabel: "Previous",
        operationCurrentLabel: "Current",
        operationNextLabel: "Next",
        operationPreviewEmpty: "—"
    },
    multipop:{
        manualParamsModalLabel: "Set Stack Parameters",
        stackValuesLabel: "Enter stack values:",
        multipopTitle: "Multipop on Stack",
        multipopAbout: "About Multipop on Stack",
        multipopDescription: `
                <p>
                    <strong>Multipop on Stack</strong> is one of the most classical examples used to explain
                    <strong>amortized analysis</strong>. The algorithm works with a standard stack and extends
                    the usual stack behavior by an additional operation that may remove several elements at once.
                    At first sight, this operation may look expensive, but over a whole sequence of commands
                    the average cost per operation remains constant.
                </p>

                <h6 class="mt-3"><strong>Used data structure</strong></h6>
                <p>
                    The algorithm uses one <strong>stack</strong>, which is a <strong>LIFO</strong>
                    structure (<em>Last In, First Out</em>). The most recently inserted element is therefore
                    always the first one that can be removed.
                </p>

                <h6 class="mt-3"><strong>Supported operations</strong></h6>
                <ul>
                    <li><strong>Push(x)</strong>: inserts value <em>x</em> on the top of the stack.</li>
                    <li><strong>Pop()</strong>: removes the current top element, if the stack is not empty.</li>
                    <li><strong>Multipop(k)</strong>: removes up to <em>k</em> elements from the top of the stack.</li>
                </ul>

                <h6 class="mt-3"><strong>Main idea of the algorithm</strong></h6>
                <p>
                    The key observation is that <strong>Multipop(k)</strong> is not a fundamentally different kind of work.
                    It only repeats the same removal that <strong>Pop()</strong> would perform, just several times in one command.
                    If the stack contains fewer than <em>k</em> elements, the operation simply stops when the stack becomes empty.
                </p>
                <p>
                    This means that even if one Multipop command removes many elements, each removed element must have been inserted earlier,
                    and the same element can never be removed more than once.
                </p>

                <h6 class="mt-3"><strong>Why this algorithm is suitable for amortized analysis</strong></h6>
                <p>
                    This algorithm is suitable for amortized analysis because the cost of one operation may vary significantly.
                    A single <strong>Push</strong> is cheap, a single <strong>Pop</strong> is cheap, but one
                    <strong>Multipop(k)</strong> may appear expensive if it removes many elements in one command.
                    However, when we observe a <strong>whole sequence of operations</strong>, the total number of removals
                    is limited by the total number of earlier insertions.
                </p>

                <h6 class="mt-3"><strong>Complexity of individual operations</strong></h6>
                <ul>
                    <li><strong>Worst-case complexity of Push</strong>: O(1)</li>
                    <li><strong>Worst-case complexity of Pop</strong>: O(1)</li>
                    <li><strong>Worst-case complexity of Multipop(k)</strong>: O(k)</li>
                    <li><strong>Worst-case complexity of Multipop with respect to current stack size n</strong>: O(min(k, n))</li>
                </ul>

                <h6 class="mt-3"><strong>Amortized complexity</strong></h6>
                <ul>
                    <li><strong>Amortized complexity of Push</strong>: O(1)</li>
                    <li><strong>Amortized complexity of Pop</strong>: O(1)</li>
                    <li><strong>Amortized complexity of Multipop</strong>: O(1)</li>
                    <li><strong>Amortized complexity per operation in a sequence</strong>: O(1)</li>
                </ul>
                <p>
                    The essential reason is simple: each element can be pushed once and later popped at most once.
                    Therefore, even if one particular command looks expensive, the total work over many commands stays well controlled.
                </p>

                <h6 class="mt-3"><strong>Potential method used here</strong></h6>
                <p>
                    In this visualization we use the potential function
                    <strong>Φ = |S|</strong>.
                </p>
                <ul>
                    <li><strong>Φ</strong> is the value of the potential function.</li>
                    <li><strong>S</strong> is the current stack.</li>
                    <li><strong>|S|</strong> is the current number of elements stored in the stack.</li>
                </ul>
                <p>
                    The amortized cost of one operation is computed by the formula
                    <strong>â = c + ΔΦ</strong>, where:
                </p>
                <ul>
                    <li><strong>c</strong> is the actual cost of the currently executed operation,</li>
                    <li><strong>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub></strong> is the change of potential,</li>
                    <li><strong>â</strong> is the amortized cost of that operation.</li>
                </ul>
                <p>
                    With this model:
                </p>
                <ul>
                    <li><strong>Push</strong> increases the stack size by 1, so the potential increases by 1.</li>
                    <li><strong>Pop</strong> decreases the stack size by 1, so the potential decreases by 1.</li>
                    <li><strong>Multipop</strong> decreases the potential by the number of actually removed elements.</li>
                </ul>
                <p>
                    Intuitively, the stack stores potential while elements are inserted and later spends that stored potential
                    when elements are removed.
                </p>

                <h6 class="mt-3"><strong>Accounting interpretation</strong></h6>
                <p>
                    The same behavior can also be explained by the accounting view. Each <strong>Push</strong> may pay not only
                    for its own immediate work, but also store one extra credit on the inserted element.
                    When that element is later removed by <strong>Pop</strong> or <strong>Multipop</strong>,
                    its stored credit can pay for the removal.
                </p>

                <h6 class="mt-3"><strong>What is shown in this simulation</strong></h6>
                <ul>
                    <li><strong>The current content of the stack</strong>, visualized as stacked blocks.</li>
                    <li><strong>Operation Count</strong>, showing how many user-level operations have already been executed.</li>
                    <li><strong>Step Count</strong>, representing elementary performed operations.</li>
                    <li><strong>Potential</strong>, updated after each executed command.</li>
                    <li><strong>A detailed explanation panel</strong>, describing what happened in the current step.</li>
                    <li><strong>A history view</strong>, where already executed commands can be reviewed again.</li>
                </ul>

                <h6 class="mt-3"><strong>What the user can try here</strong></h6>
                <ul>
                    <li><strong>Manual mode</strong>: directly perform stack operations one by one.</li>
                    <li><strong>Random mode</strong>: generate a random sequence of stack operations automatically.</li>
                    <li><strong>Special Cases</strong>: observe prepared characteristic scenarios.</li>
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
                    between the cost of one isolated operation and the cost spread across a full sequence.
                    One command may look expensive, but every removed element had to be inserted earlier,
                    which is exactly why the amortized cost per operation remains O(1).
                </p>
        `,
        enterValuePrompt: "Enter the positive number you want to add to the stack:",
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
                Click <strong>Next</strong> to execute exactly one command from the entered sequence.<br/>
                For the currently executed command, this panel explains <strong>what was executed</strong>,
                <strong>how the stack changed</strong>, <strong>what the actual cost was</strong>,
                <strong>how the potential changed</strong>, <strong>what amortized cost follows from it</strong>,
                and <strong>what the main takeaway of this step is</strong>.<br/>
                All calculations and explanations below always refer only to the <strong>currently displayed command</strong>.
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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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
                <div class="syn-line">Set the parameters for random stack operations below.</div>
                <div class="syn-line">
                    <span class="syn-label">Minimum / Maximum value:</span>
                    <code>used only for generated Push values</code>
                </div>
                <div class="syn-line">
                    <span class="syn-label">Number of Operations:</span>
                    <code>how many random stack commands will be executed</code>
                </div>
        `,
        mpScenario01Title: "Growing stack",
        mpScenario01Desc: "Only push operations are executed. This scenario highlights pure stack growth and increasing potential.",
        mpScenario02Title: "Single pop after build",
        mpScenario02Desc: "The stack is first built and then one top element is removed. A simple O(1) removal after growth.",
        mpScenario03Title: "Partial cleanup by multipop",
        mpScenario03Desc: "The stack grows first and then only part of it is removed by one multipop command.",
        mpScenario04Title: "Full cleanup by multipop",
        mpScenario04Desc: "The stack is built and then cleared by one large multipop. This shows one locally expensive command.",
        mpScenario05Title: "Overshooting multipop",
        mpScenario05Desc: "The requested multipop size is larger than the current stack size. It shows the difference between requested and actual work.",
        mpScenario06Title: "Alternating push and pop",
        mpScenario06Desc: "Push and pop operations alternate frequently. The structure stays small and the cost remains very local.",
        mpScenario07Title: "Empty stack then recovery",
        mpScenario07Desc: "The scenario starts with operations on an empty stack and then continues with normal valid work.",
        mpScenario08Title: "Two cleanup waves",
        mpScenario08Desc: "The stack is filled, partially cleaned, filled again, and then cleaned once more.",
        mpScenario09Title: "Many small multipops",
        mpScenario09Desc: "Instead of one large cleanup, the stack is reduced by several small multipop operations.",
        mpScenario10Title: "Refill after full cleanup",
        mpScenario10Desc: "The stack is fully cleared and then used again. This shows how potential is rebuilt after being spent."
    },
    queue:{
        queue2StacksTitle: "Queue using Two Stacks",
        queue2StacksAbout: "About Queue using Two Stacks",
        queue2StacksDescription: `
                <p>
                    <strong>Queue using Two Stacks</strong> is another standard and very important example of
                    <strong>amortized analysis</strong>. The goal is to implement the behavior of a queue
                    (<strong>FIFO</strong>, <em>First In, First Out</em>) while internally using only two stacks.
                    One command may sometimes be expensive, but over a long sequence the average cost per operation
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

                <h6 class="mt-3"><strong>Supported operations</strong></h6>
                <ul>
                    <li><strong>Enqueue(x)</strong>: inserts value <em>x</em> into the queue.</li>
                    <li><strong>Dequeue()</strong>: removes the oldest element currently stored in the queue.</li>
                </ul>

                <h6 class="mt-3"><strong>Main idea of the algorithm</strong></h6>
                <p>
                    Every new element is first placed onto <strong>Stack In</strong>.
                    As long as <strong>Stack Out</strong> already contains elements, <strong>Dequeue()</strong>
                    can remove the front value directly from there.
                    If <strong>Stack Out</strong> is empty, all elements from <strong>Stack In</strong> are transferred
                    into <strong>Stack Out</strong>.
                </p>
                <p>
                    This transfer reverses their order, so the oldest element becomes the top of <strong>Stack Out</strong>,
                    exactly as required by a FIFO queue.
                </p>

                <h6 class="mt-3"><strong>Why this algorithm is suitable for amortized analysis</strong></h6>
                <p>
                    This algorithm is suitable for amortized analysis because not every <strong>Dequeue</strong> has the same cost.
                    Some dequeue operations are very cheap, but the first dequeue after a longer sequence of enqueues may trigger
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

                <h6 class="mt-3"><strong>Complexity of individual operations</strong></h6>
                <ul>
                    <li><strong>Worst-case complexity of Enqueue</strong>: O(1)</li>
                    <li><strong>Worst-case complexity of Dequeue</strong>: O(n), if transfer is needed</li>
                    <li><strong>Best-case complexity of Dequeue</strong>: O(1), if Stack Out is already non-empty</li>
                </ul>

                <h6 class="mt-3"><strong>Amortized complexity</strong></h6>
                <ul>
                    <li><strong>Amortized complexity of Enqueue</strong>: O(1)</li>
                    <li><strong>Amortized complexity of Dequeue</strong>: O(1)</li>
                    <li><strong>Amortized complexity per operation in a sequence</strong>: O(1)</li>
                </ul>
                <p>
                    The expensive transfer does not happen repeatedly for the same elements.
                    Once an element is moved to <strong>Stack Out</strong>, it is never moved back again.
                    That is the main reason why the long-term average cost remains constant.
                </p>

                <h6 class="mt-3"><strong>Potential method used here</strong></h6>
                <p>
                    In this visualization we use the potential function
                    <strong>Φ = |S<sub>in</sub>|</strong>.
                </p>
                <ul>
                    <li><strong>Φ</strong> is the value of the potential function.</li>
                    <li><strong>S<sub>in</sub></strong> is Stack In.</li>
                    <li><strong>|S<sub>in</sub>|</strong> is the number of elements currently stored in Stack In.</li>
                </ul>
                <p>
                    The amortized cost is represented here using the formula
                    <strong>â = c + ΔΦ</strong>, where:
                </p>
                <ul>
                    <li><strong>c</strong> is the actual cost of the currently executed operation,</li>
                    <li><strong>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub></strong> is the change of potential,</li>
                    <li><strong>â</strong> is the amortized cost of that operation.</li>
                </ul>
                <p>
                    In the expensive dequeue case, if <strong>t</strong> elements are transferred, the actual cost is:
                    <strong>c = 2t + 1</strong>.
                    The transfer empties <strong>Stack In</strong>, so the potential decreases by <strong>t</strong>.
                    In this visualization, the potential therefore expresses how many elements are currently waiting
                    in <strong>Stack In</strong> and shows that the stored potential decreases during the transfer.
                </p>

                <h6 class="mt-3"><strong>Accounting interpretation</strong></h6>
                <p>
                    The accounting view explains the same idea in a simple way: when an element is inserted,
                    it can pay not only for its own insertion, but also save extra credit for its future movement
                    and final removal. Since each element is moved only once, this saved credit is sufficient.
                </p>

                <h6 class="mt-3"><strong>What is shown in this simulation</strong></h6>
                <ul>
                    <li><strong>Both internal stacks</strong>, so the user can see where each value is currently stored.</li>
                    <li><strong>The transfer process</strong>, including individual moves from Stack In to Stack Out.</li>
                    <li><strong>Operation Count</strong>, showing how many queue operations have already been executed.</li>
                    <li><strong>Step Count</strong>, representing elementary work.</li>
                    <li><strong>Potential</strong>, updated after commands and transfers.</li>
                    <li><strong>A detailed explanation panel</strong>, describing what happened and why.</li>
                    <li><strong>A history view</strong>, allowing the user to inspect previously executed commands again.</li>
                </ul>

                <h6 class="mt-3"><strong>What the user can try here</strong></h6>
                <ul>
                    <li><strong>Manual mode</strong>: enqueue and dequeue values directly.</li>
                    <li><strong>Random mode</strong>: generate a random sequence of queue operations automatically.</li>
                    <li><strong>Special Cases</strong>: observe prepared characteristic scenarios.</li>
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
                    one costly command does not automatically mean a costly algorithm overall.
                    Even though one dequeue may trigger a large transfer, each element participates in only a small bounded number
                    of elementary actions, which is why the amortized cost of both operations remains O(1).
                </p>
        `,
        queueManualParamsModalLabel: "Set Queue Parameters",
        queueValuesLabel: "Enter queue values:",
        enqueueButton: "Enqueue",
        dequeueButton: "Dequeue",
        enqueuePrompt: "Enter a positive number to enqueue:",
        queueStackInLabel: "Stack In",
        queueStackOutLabel: "Stack Out",
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
                Click <strong>Next</strong> to execute exactly one command from the entered sequence.<br/>
                For the currently executed command, this panel explains <strong>what was executed</strong>,
                <strong>how Stack In and Stack Out changed</strong>, <strong>what the actual cost was</strong>,
                <strong>how the potential changed</strong>, <strong>what amortized cost follows from it</strong>,
                and <strong>what the main takeaway of this step is</strong>.<br/>
                All calculations and explanations below always refer only to the <strong>currently displayed command</strong>.
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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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
                <div class="syn-line">Set the parameters for random queue operations below.</div>
                <div class="syn-line">
                    <span class="syn-label">Minimum / Maximum value:</span>
                    <code>used only for generated Enqueue values</code>
                </div>
                <div class="syn-line">
                    <span class="syn-label">Number of Operations:</span>
                    <code>how many random queue commands will be executed</code>
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
        `,
        qScenario01Title: "Enqueue burst only",
        qScenario01Desc: "Only enqueue operations are executed. The queue grows and potential accumulates in Stack In.",
        qScenario02Title: "Direct dequeue from ready front",
        qScenario02Desc: "The front is already prepared in Stack Out, so one dequeue is immediately cheap.",
        qScenario03Title: "First dequeue triggers full transfer",
        qScenario03Desc: "Stack Out is empty, so the first dequeue must transfer all waiting elements from Stack In.",
        qScenario04Title: "Transfer followed by cheap dequeues",
        qScenario04Desc: "One expensive transfer is followed by several cheap direct dequeues from Stack Out.",
        qScenario05Title: "Alternating queue operations",
        qScenario05Desc: "Enqueue and dequeue operations alternate often, so the queue size stays moderate.",
        qScenario06Title: "Empty dequeue and recovery",
        qScenario06Desc: "The scenario starts with dequeue on an empty queue and then continues with standard operations.",
        qScenario07Title: "Refill while Stack Out is still ready",
        qScenario07Desc: "New elements arrive while Stack Out still contains old front elements. This separates immediate and delayed work.",
        qScenario08Title: "Two transfer waves",
        qScenario08Desc: "The queue goes through two separate phases in which a transfer from Stack In to Stack Out becomes necessary.",
        qScenario09Title: "Burst then full drain",
        qScenario09Desc: "Many enqueue operations are followed by draining the whole queue through successive dequeues.",
        qScenario10Title: "Small queue oscillation",
        qScenario10Desc: "The queue repeatedly grows and shrinks around a small size, showing frequent local changes."
    },
    splay:{
        splayTreeTitle: "Splay Tree",
        splayTreeAbout: "About Splay Tree",
        splayTreeDescription: `
                <p>
                    <strong>Splay Tree</strong> is a <strong>self-adjusting Binary Search Tree</strong>.
                    Unlike strictly balanced trees, it does not store explicit balancing information.
                    Instead, it improves its shape dynamically during use.
                    After an access operation, the accessed node, or the last relevant visited node,
                    is moved toward the root by rotations. This restructuring process is called <strong>Splay</strong>.
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

                <h6 class="mt-3"><strong>Supported operations</strong></h6>
                <ul>
                    <li><strong>Insert(x)</strong>: inserts a new value and then splays the inserted node toward the root.</li>
                    <li><strong>Search(x)</strong>: searches for a value and then splays the found node, or the last visited node, toward the root.</li>
                    <li><strong>Delete(x)</strong>: finds the value, restructures the tree using splaying, removes the node, and reconnects the remaining subtrees.</li>
                </ul>

                <h6 class="mt-3"><strong>Main idea of the algorithm</strong></h6>
                <p>
                    The central idea is that frequently accessed values should gradually move closer to the root.
                    This makes future accesses to similar values cheaper.
                    Instead of keeping the tree perfectly balanced at all times, the structure continuously adapts
                    itself to the access pattern.
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
                    future operations cheaper. Because of this long-term structural effect, the average cost over a sequence
                    of operations is much better than the worst-case cost of one isolated operation.
                </p>

                <h6 class="mt-3"><strong>Complexity of individual operations</strong></h6>
                <ul>
                    <li><strong>Worst-case complexity of Insert</strong>: O(n)</li>
                    <li><strong>Worst-case complexity of Search</strong>: O(n)</li>
                    <li><strong>Worst-case complexity of Delete</strong>: O(n)</li>
                </ul>

                <h6 class="mt-3"><strong>Amortized complexity</strong></h6>
                <ul>
                    <li><strong>Amortized complexity of Insert</strong>: O(log n)</li>
                    <li><strong>Amortized complexity of Search</strong>: O(log n)</li>
                    <li><strong>Amortized complexity of Delete</strong>: O(log n)</li>
                    <li><strong>Amortized complexity per operation in a sequence</strong>: O(log n)</li>
                </ul>
                <p>
                    This is exactly why splay trees are taught as a major example of amortized analysis:
                    the local behavior may look expensive, but the global behavior over many operations is logarithmic on average.
                </p>

                <h6 class="mt-3"><strong>Potential method used here</strong></h6>
                <p>
                    The classical analysis uses a potential function based on subtree sizes:
                    <strong>Φ(T) = Σ<sub>v∈T</sub> log<sub>2</sub>(size(subtree(v)))</strong>.
                </p>
                <ul>
                    <li><strong>T</strong> is the current tree.</li>
                    <li><strong>v</strong> is one node of the tree.</li>
                    <li><strong>subtree(v)</strong> is the subtree rooted at node <em>v</em>.</li>
                    <li><strong>size(subtree(v))</strong> is the number of nodes in that subtree.</li>
                    <li><strong>Φ(T)</strong> is the total potential of the tree.</li>
                </ul>
                <p>
                    The amortized cost of one operation is computed by the formula
                    <strong>â = c + ΔΦ</strong>, where:
                </p>
                <ul>
                    <li><strong>c</strong> is the actual cost of the currently executed operation,</li>
                    <li><strong>ΔΦ = Φ<sub>after</sub> - Φ<sub>before</sub></strong> is the change of potential,</li>
                    <li><strong>â</strong> is the amortized cost of that operation.</li>
                </ul>
                <p>
                    The intuition is that the potential expresses how the tree is structurally arranged.
                    Rotations change subtree sizes, therefore they also change the value of the potential.
                    A costly restructuring step may significantly improve the future shape of the tree,
                    and that improvement is captured by the potential change.
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
                    <li><strong>The visited path</strong>, showing which nodes were traversed.</li>
                    <li><strong>Rotations</strong>, visually showing how the tree changes during splaying.</li>
                    <li><strong>Operation Count</strong>, showing how many tree operations have already been executed.</li>
                    <li><strong>Step Count</strong>, representing comparisons and structural operations.</li>
                    <li><strong>Potential</strong>, based on subtree sizes.</li>
                    <li><strong>A detailed explanation panel</strong>, describing the performed command.</li>
                    <li><strong>An internal breakdown of the command</strong>, where individual phases and rotations can be inspected.</li>
                    <li><strong>A history view</strong>, where earlier executed commands can be reviewed again.</li>
                </ul>

                <h6 class="mt-3"><strong>What the user can try here</strong></h6>
                <ul>
                    <li><strong>Manual mode</strong>: insert, search, and delete values directly.</li>
                    <li><strong>Random mode</strong>: generate a random sequence of tree operations automatically.</li>
                    <li><strong>Special Cases</strong>: observe prepared characteristic scenarios.</li>
                    <li><strong>Syntax mode</strong>: execute a whole sequence of tree commands step by step.</li>
                </ul>

                <h6 class="mt-3"><strong>Important edge cases</strong></h6>
                <ul>
                    <li>Searching for a missing value may still change the tree, because the last visited node may be splayed.</li>
                    <li>Inserting an already existing value does not create a duplicate node.</li>
                    <li>Deleting from an empty tree performs no real structural removal.</li>
                    <li>A very skewed tree may cause one operation to be expensive, but that does not break the amortized guarantee.</li>
                </ul>

                <h6 class="mt-3"><strong>Main takeaway</strong></h6>
                <p class="mb-0">
                    <strong>Splay Tree</strong> is a powerful example of amortized analysis because it shows that an algorithm can be
                    locally expensive and still globally efficient.
                    The tree continuously reorganizes itself according to performed accesses,
                    and thanks to this restructuring the amortized complexity of insert, search, and delete is O(log n),
                    even though one particular operation may still be linear in the worst case.
                </p>
        `,
        splayInsertButton: "Insert",
        splaySearchButton: "Search",
        splayDeleteButton: "Delete",
        splayInitTitle: "Set Tree Parameters",
        splayInitLabel: "Enter tree values:",
        splayInitInvalid: "Enter only positive integers separated by commas (e.g. 1, 2, 3).",
        splaySearchPrompt: "Enter the positive value you want to search for:",
        splayInsertPrompt: "Enter the positive value you want to insert:",
        splayDeletePrompt: "Enter the positive value you want to delete:",
        splayRandomTooManyAlert: "Count cannot be greater than the number of unique values in the selected range.",
        splayInitialValuesLabel: "Initial values:",
        splayGeneratedValuesLabel: "Generated values:",
        splayScStepInsertTitle: "Insert {value}",
        splayScStepSearchTitle: "Search {value}",
        splayScStepDeleteTitle: "Delete {value}",
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
                Click <strong>Next</strong> to execute exactly one command from the entered sequence.<br/>
                For the currently executed command, this panel explains <strong>what was executed</strong>,
                <strong>how the tree changed</strong>, <strong>what the actual cost was</strong>,
                <strong>how the potential changed</strong>, <strong>what amortized cost follows from it</strong>,
                and <strong>what the main takeaway of this step is</strong>.<br/>
                For splay tree operations, the panel also shows the <strong>internal breakdown of the command</strong>.
                If rotations occur, each recorded phase is listed below with its own measured
                <strong>Δsteps</strong>, <strong>Φ before</strong>, <strong>Φ after</strong>, and <strong>ΔΦ</strong>.
        `,
        randomParamsInfo: `
                <div class="syn-line">Set the parameters for random splay-tree operations below.</div>
                <div class="syn-line">
                    <span class="syn-label">Minimum / Maximum value:</span>
                    <code>used only for generated Insert values</code>
                </div>
                <div class="syn-line">
                    <span class="syn-label">Insert rule:</span>
                    <code>generated insert values stay unique inside the tree</code>
                </div>
                <div class="syn-line">
                    <span class="syn-label">Number of Operations:</span>
                    <code>how many random tree commands will be executed</code>
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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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
        splaySideRight: "right",
        sScenario01Title: "Balanced small build",
        sScenario01Desc: "A small set of values is inserted in a relatively favorable order, so the tree stays easier to navigate.",
        sScenario02Title: "Ascending build",
        sScenario02Desc: "Values are inserted in increasing order. This creates a strongly characteristic growth pattern.",
        sScenario03Title: "Descending build",
        sScenario03Desc: "Values are inserted in decreasing order. It is the mirrored counterpart of the ascending pattern.",
        sScenario04Title: "Repeated hot-key search",
        sScenario04Desc: "After the tree is built, the same important value is searched repeatedly. The structure adapts to that access pattern.",
        sScenario05Title: "Missing-value search",
        sScenario05Desc: "The searched value does not exist. The tree still changes because the last visited node is splayed.",
        sScenario06Title: "Delete existing value",
        sScenario06Desc: "A present value is deleted after the tree is built. This shows search, restructuring, split, and join behavior together.",
        sScenario07Title: "Delete missing value",
        sScenario07Desc: "A missing value is requested for deletion. The command still restructures the tree around the last visited node.",
        sScenario08Title: "Insert-search-delete mix",
        sScenario08Desc: "A short mixed workload containing insertion, access, and deletion in one compact scenario.",
        sScenario09Title: "Skewed build then oldest search",
        sScenario09Desc: "The tree grows in a one-sided way and then an old deep value is searched, which causes heavier restructuring.",
        sScenario10Title: "Mixed updates",
        sScenario10Desc: "A broader combination of inserts, searches, and deletions that shows how the tree keeps adapting over time."
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
                    <li>Samotná aplikace nabízí rozhraní <strong>CZ/EN</strong> a také možnost přepínání mezi <strong>světlým a tmavým režimem</strong> pro lepší použitelnost a širší dostupnost.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní cíl práce</strong></h6>
                <p>
                    Hlavním cílem je vytvořit dynamickou webovou komponentu, která studentům pomůže pochopit,
                    <strong>jak se analyzuje amortizovaná složitost</strong>. Důraz není kladen pouze na výsledný odhad složitosti,
                    ale i na celý proces: jak se mění datová struktura, kolik elementárních operací bylo skutečně provedeno,
                    jak se vyvíjí potenciál a jak zvolená metoda amortizované analýzy vysvětluje celkovou cenu sekvence operací.
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
                            <li><strong>pomocí připravených typických scénářů</strong> prezentovaných jako speciální případy,</li>
                            <li><strong>pomocí syntaxe</strong>, kde uživatel zadá celou sekvenci příkazů, které se pak vykonají krok po kroku s vysvětlením.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Vizualizaci a vysvětlení průběhu krok za krokem</strong>, včetně aktuálního stavu a významu právě prováděného příkazu.
                    </li>
                    <li>
                        <strong>Detailní vysvětlující panel</strong>, který ukazuje, co se v aktuálním kroku stalo, jak se změnila datová struktura, jaká byla skutečná cena, jak se změnil potenciál, jaká z toho vychází amortizovaná cena a jaká je hlavní myšlenka daného kroku.
                    </li>
                    <li>
                        <strong>Historii provedených příkazů</strong>, ve které je možné se vracet k již hotovým krokům a znovu si je prohlédnout.
                    </li>
                </ol>

                <h6 class="mt-3"><strong>Co může uživatel během simulace sledovat</strong></h6>
                <ul>
                    <li><strong>aktuální stav výpočtu</strong> a použitých datových struktur,</li>
                    <li><strong>počet provedených operací</strong>,</li>
                    <li><strong>počet provedených kroků</strong>,</li>
                    <li><strong>aktuální hodnotu potenciálu</strong>, případně ekvivalentní interpretaci naspořených kreditů či mincí,</li>
                    <li><strong>průběh právě prováděného příkazu</strong> a jeho vysvětlení v kontextu celé simulace.</li>
                </ul>

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
                    <li>Zvolte režim vstupu, například <strong>Manuálně</strong>, <strong>Náhodně</strong>, <strong>Speciální případy</strong> nebo <strong>Syntaxe</strong>.</li>
                    <li>Sledujte, jak se struktura mění, jak roste počet kroků, jak se v čase vyvíjí potenciál a jak vysvětlující panel interpretuje právě zobrazený krok.</li>
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
        submitBtn: "Potvrdit",
        generateBtn: "Generovat",
        messageOkBtn: "OK",
        messageTitle: "Zpráva",
        manualButton: "Manuálně",
        randomButton: "Náhodně",
        specialCasesButton: "Speciální případy",
        syntaxButton: "Syntaxe",
        randomParamsModalLabel: "Nastavení náhodných parametrů",
        rangeMinLabel: "Minimální hodnota:",
        rangeMaxLabel: "Maximální hodnota:",
        countLabel: "Počet operací:",
        stepCount: "Počet kroků",
        potential: "Potenciál",
        nextButton: "Další",
        startSyntaxBtn: "Spustit provádění",
        endButton: "Konec",
        selectCase: "Vyberte scénář",
        specialCasesDescription: "Vyberte jeden z připravených typických scénářů pro zvolený algoritmus:",
        detailNotProvided: "Detail není k dispozici.",
        randomMissingParamsAlert: "Vyplňte minimum, maximum a počet operací.",
        randomInvalidIntegerParamsAlert: "Zadejte pouze celá čísla.",
        randomPositiveParamsAlert: "Minimum, maximum i počet operací musí být kladná čísla.",
        randomMinMaxOrderAlert: "Minimum musí být menší než maximum.",
        nextLabel: "Další",
        syntaxHistoryTitle: "Historie syntax režimu",
        syntaxHistoryButtonTitle: "Otevřít historii",
        syntaxPrevStepTitle: "Předchozí krok",
        syntaxNextStepTitle: "Další krok",
        syntaxExecutionFinished: "Provádění skončilo. Níže se můžeš vracet mezi provedenými kroky nebo tento režim ukončit.",
        scExecutionModeLabel: "Režim provádění",
        executionModeAuto: "Automaticky",
        executionModeManual: "Ručně",
        scPlayTitle: "Přehrát",
        scPauseTitle: "Pozastavit",
        scExecutionFinished: "Provádění skončilo. Níže můžeš otevřít historii nebo tento režim ukončit.",
        scAutoPanelDesc: `
                V tomto režimu se scénář přehrává automaticky.
                Pomocí ovládacích tlačítek můžeš přehrávání pozastavit, znovu spustit,
                posunout se o jeden krok zpět nebo vpřed, případně skočit na začátek
                nebo na konec už provedené sekvence.
                Panel níže vždy vysvětluje právě zobrazený krok.
        `,
        scManualPanelDesc: `
                V tomto režimu se scénář provádí krok po kroku tlačítkem <strong>Další</strong>.
                Panel níže vždy vysvětluje právě provedený krok, jeho dopad na datovou strukturu,
                skutečnou cenu, změnu potenciálu, amortizovanou cenu i hlavní myšlenku daného kroku.
        `,
        scGoStartTitle: "Přejít na první provedený krok",
        scGoEndTitle: "Přejít na poslední krok",
        scStepBackTitle: "Posun o jeden krok zpět",
        scStepForwardTitle: "Posun o jeden krok dopředu",
        historyModalBaseTitle: "Historie manuálního / náhodného režimu",
        historyCommandLabel: "Příkaz",
        historyEmptyWatermark: "PRÁZDNÉ",
        specialCasesHistoryTitle: "Historie speciálních případů",
        actionChoiceManual: "Ručně",
        actionChoiceRandom: "Náhodně",
        actionChoiceBody: "Vyberte způsob zadání hodnoty.",
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
        navToggleLabel: "Přepnout navigaci",
        themeToggleToDark: "Přepnout na tmavý režim",
        themeToggleToLight: "Přepnout na světlý režim",
        invalidNumberAlert: "Zadejte platné kladné číslo!",
        manualValuesInvalidAlert: "Zadejte pouze kladná celá čísla oddělená čárkami (např. 1, 2, 3).",
        operationCount: "Počet operací",
        infoSectionPotential: "Výpočet potenciálu",
        infoSectionAmortizedCost: "Amortizovaná cena této operace",
        infoSectionTotalAmortized: "Celková amortizovaná cena od začátku",
        infoSectionComplexity: "Složitost",
        infoPotentialFormulaStack: "Používáme potenciálovou funkci Φ = |S|.",
        infoPotentialFormulaQueue: "Používáme potenciálovou funkci Φ = |S<sub>vst</sub>|.",
        infoPotentialFormulaSplay: "Používáme potenciálovou funkci Φ(T) = Σ<sub>v∈T</sub> log<sub>2</sub>(velikost(podstromu(v))).",
        infoAmortizedFormula: "Amortizovanou cenu počítáme podle vzorce â = c + ΔΦ.",
        infoTotalAmortizedFormula: "Průběžný součet amortizované ceny počítáme podle vzorce Â<sub>k</sub> = Â<sub>k-1</sub> + â<sub>k</sub>.",
        infoOperationComplexityLabel: "Složitost právě provedeného typu operace",
        infoAmortizedComplexityLabel: "Amortizovaná složitost",
        infoSymbolsMeaningTitle: "Význam použitých symbolů",
        infoMeaningPhi: "Φ je hodnota potenciálové funkce.",
        infoMeaningPhiBefore: "Φ<sub>před</sub> je potenciál před touto operací.",
        infoMeaningPhiAfter: "Φ<sub>po</sub> je potenciál po této operaci.",
        infoMeaningDeltaPhi: "ΔΦ je změna potenciálu během této operace.",
        infoPhiBeforeShort: "Φ<sub>před</sub>",
        infoPhiAfterShort: "Φ<sub>po</sub>",
        infoMeaningActualCost: "c je skutečná cena této operace.",
        infoMeaningAmortizedCost: "â je amortizovaná cena této operace.",
        infoMeaningCurrentStepAmortizedCost: "â<sub>k</sub> je amortizovaná cena aktuální operace.",
        infoMeaningPrevTotalAmortized: "Â<sub>k-1</sub> je celková amortizovaná cena před touto operací.",
        infoMeaningCurrentTotalAmortized: "Â<sub>k</sub> je celková amortizovaná cena po této operaci.",
        complexityConst: "O(1)",
        complexityLinearK: "O(k)",
        complexityLinearN: "O(n)",
        complexityLogN: "O(log n)",
        operationPrevLabel: "Předchozí",
        operationCurrentLabel: "Aktuální",
        operationNextLabel: "Následující",
        operationPreviewEmpty: "—"
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
                    draze, ale při pohledu na celou sekvenci příkazů zůstává průměrná cena na operaci konstantní.
                </p>

                <h6 class="mt-3"><strong>Použitá datová struktura</strong></h6>
                <p>
                    Algoritmus používá jeden <strong>zásobník</strong>, což je struktura typu
                    <strong>LIFO</strong> (<em>poslední dovnitř, první ven</em>). To znamená, že naposledy vložený prvek
                    je vždy první, který lze odebrat.
                </p>

                <h6 class="mt-3"><strong>Podporované operace</strong></h6>
                <ul>
                    <li><strong>Přidat(x)</strong>: vloží hodnotu <em>x</em> na vrchol zásobníku.</li>
                    <li><strong>Odebrat()</strong>: odebere aktuální vrcholový prvek, pokud zásobník není prázdný.</li>
                    <li><strong>Odebrat více(k)</strong>: odebere až <em>k</em> prvků z vrcholu zásobníku.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní princip algoritmu</strong></h6>
                <p>
                    Klíčové pozorování je, že <strong>Odebrat více(k)</strong> nepředstavuje jiný druh práce.
                    Jen opakuje stejný typ odebrání, jaký by provedla operace <strong>Odebrat()</strong>,
                    pouze několikrát v rámci jednoho příkazu. Pokud zásobník obsahuje méně než <em>k</em> prvků,
                    operace se jednoduše zastaví ve chvíli, kdy se zásobník vyprázdní.
                </p>
                <p>
                    To znamená, že i když jeden Odebrat více příkaz odebere více prvků, každý takto odebraný prvek musel být dříve vložen
                    a žádný prvek nelze odebrat více než jednou.
                </p>

                <h6 class="mt-3"><strong>Proč je algoritmus vhodný pro amortizovanou analýzu</strong></h6>
                <p>
                    Tento algoritmus je vhodný pro amortizovanou analýzu proto, že cena jedné operace se může výrazně lišit.
                    Jedna operace <strong>Přidat</strong> je levná, jedna operace <strong>Odebrat</strong> je levná,
                    ale jedna operace <strong>Odebrat více(k)</strong> může působit draze, pokud při jednom příkazu odebere více prvků.
                    Když se ale díváme na <strong>celou sekvenci operací</strong>, celkový počet odebrání je omezen
                    celkovým počtem dřívějších vložení.
                </p>

                <h6 class="mt-3"><strong>Složitost jednotlivých operací</strong></h6>
                <ul>
                    <li><strong>Nejhorší případ operace Přidat</strong>: O(1)</li>
                    <li><strong>Nejhorší případ operace Odebrat</strong>: O(1)</li>
                    <li><strong>Nejhorší případ operace Odebrat více(k)</strong>: O(k)</li>
                    <li><strong>Nejhorší případ operace Odebrat více(k) vzhledem k aktuální velikosti zásobníku n</strong>: O(min(k, n))</li>
                </ul>

                <h6 class="mt-3"><strong>Amortizovaná složitost</strong></h6>
                <ul>
                    <li><strong>Amortizovaná složitost operace Přidat</strong>: O(1)</li>
                    <li><strong>Amortizovaná složitost operace Odebrat</strong>: O(1)</li>
                    <li><strong>Amortizovaná složitost operace Odebrat více</strong>: O(1)</li>
                    <li><strong>Amortizovaná složitost na operaci v sekvenci</strong>: O(1)</li>
                </ul>
                <p>
                    Základní důvod je jednoduchý: každý prvek může být jednou vložen a později nejvýše jednou odebrán.
                    Proto i když může jeden konkrétní příkaz působit draze, celková práce při mnoha příkazech zůstává dobře omezená.
                </p>

                <h6 class="mt-3"><strong>Potenciálová metoda použitá zde</strong></h6>
                <p>
                    V této vizualizaci používáme potenciálovou funkci
                    <strong>Φ = |S|</strong>.
                </p>
                <ul>
                    <li><strong>Φ</strong> je hodnota potenciálové funkce.</li>
                    <li><strong>S</strong> je aktuální zásobník.</li>
                    <li><strong>|S|</strong> je aktuální počet prvků uložených v zásobníku.</li>
                </ul>
                <p>
                    Amortizovaná cena jedné operace se počítá podle vzorce
                    <strong>â = c + ΔΦ</strong>, kde:
                </p>
                <ul>
                    <li><strong>c</strong> je skutečná cena právě provedené operace,</li>
                    <li><strong>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub></strong> je změna potenciálu,</li>
                    <li><strong>â</strong> je amortizovaná cena této operace.</li>
                </ul>
                <p>
                    V tomto modelu platí:
                </p>
                <ul>
                    <li><strong>Přidat</strong> zvětší velikost zásobníku o 1, a tedy zvýší potenciál o 1.</li>
                    <li><strong>Odebrat</strong> zmenší velikost zásobníku o 1, a tedy sníží potenciál o 1.</li>
                    <li><strong>Odebrat více</strong> sníží potenciál o počet skutečně odebraných prvků.</li>
                </ul>
                <p>
                    Intuitivně řečeno: zásobník si při vkládání prvků ukládá potenciál a při jejich odebírání tento uložený potenciál spotřebovává.
                </p>

                <h6 class="mt-3"><strong>Účetní interpretace</strong></h6>
                <p>
                    Stejné chování lze vysvětlit i účetním pohledem. Každá operace <strong>Přidat</strong> může zaplatit nejen
                    svou vlastní okamžitou práci, ale uložit i jeden další kredit na vložený prvek.
                    Když je tento prvek později odebrán operací <strong>Odebrat</strong> nebo <strong>Odebrat více</strong>,
                    jeho uložený kredit tuto práci zaplatí.
                </p>

                <h6 class="mt-3"><strong>Co se v této simulaci zobrazuje</strong></h6>
                <ul>
                    <li><strong>Aktuální obsah zásobníku</strong>, zobrazený jako naskládané bloky.</li>
                    <li><strong>Počet operací</strong>, který ukazuje, kolik uživatelských operací už bylo provedeno.</li>
                    <li><strong>Počet kroků</strong>, který představuje provedené elementární operace.</li>
                    <li><strong>Potenciál</strong>, aktualizovaný po každém provedeném příkazu.</li>
                    <li><strong>Detailní vysvětlující panel</strong>, který popisuje, co se v aktuálním kroku stalo.</li>
                    <li><strong>Historie kroků</strong>, ve které je možné se vracet k již provedeným příkazům.</li>
                </ul>

                <h6 class="mt-3"><strong>Co si zde může uživatel vyzkoušet</strong></h6>
                <ul>
                    <li><strong>Manuální režim</strong>: provádět zásobníkové operace přímo jednu po druhé.</li>
                    <li><strong>Náhodný režim</strong>: automaticky vygenerovat náhodnou sekvenci operací nad zásobníkem.</li>
                    <li><strong>Speciální případy</strong>: pozorovat připravené typické scénáře.</li>
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
                    mezi cenou jedné izolované operace a cenou rozloženou do celé sekvence.
                    Jeden příkaz může působit draze, ale každý odebraný prvek musel být dříve vložen,
                    a právě proto zůstává amortizovaná cena na operaci O(1).
                </p>
        `,
        enterValuePrompt: "Zadejte kladné číslo, které chcete přidat do zásobníku:",
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
                Kliknutím na <strong>Další</strong> se provede právě jeden příkaz ze zadané sekvence.<br/>
                Tento panel u právě provedeného příkazu vysvětluje <strong>co se provedlo</strong>,
                <strong>jak se změnil zásobník</strong>, <strong>jaká byla skutečná cena</strong>,
                <strong>jak se změnil potenciál</strong>, <strong>jaká z toho vychází amortizovaná cena</strong>
                a <strong>jaká je hlavní myšlenka tohoto kroku</strong>.<br/>
                Všechny výpočty a vysvětlení níže se vždy vztahují jen k <strong>právě zobrazenému příkazu</strong>.
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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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
                <div class="syn-line">Zadejte níže parametry pro náhodné operace nad zásobníkem.</div>
                <div class="syn-line">
                    <span class="syn-label">Minimální / maximální hodnota:</span>
                    <code>použije se jen pro náhodně generované hodnoty u operace Přidat</code>
                </div>
                <div class="syn-line">
                    <span class="syn-label">Počet operací:</span>
                    <code>určuje, kolik náhodných zásobníkových příkazů se provede</code>
                </div>
        `,
        mpScenario01Title: "Rostoucí zásobník",
        mpScenario01Desc: "Provádějí se pouze operace Přidat. Tento scénář ukazuje čistý růst zásobníku a růst potenciálu.",
        mpScenario02Title: "Jedno odebrání po naplnění",
        mpScenario02Desc: "Zásobník se nejprve naplní a potom se odebere jeden vrcholový prvek. Jednoduché lokální odebrání typu O(1).",
        mpScenario03Title: "Částečný úklid pomocí Odebrat více",
        mpScenario03Desc: "Zásobník se nejprve zvětší a potom se jedním příkazem Odebrat více odstraní jen jeho část.",
        mpScenario04Title: "Úplné vyčištění pomocí Odebrat více",
        mpScenario04Desc: "Zásobník se naplní a potom se jedním větším Odebrat více vyčistí. Ukazuje jednu lokálně drahou operaci.",
        mpScenario05Title: "Odebrat více s přesahem",
        mpScenario05Desc: "Požadovaný počet prvků k odebrání je větší než aktuální velikost zásobníku. Je vidět rozdíl mezi požadavkem a skutečně provedenou prací.",
        mpScenario06Title: "Střídání přidání a odebrání",
        mpScenario06Desc: "Často se střídají operace Přidat a Odebrat. Struktura zůstává malá a cena se chová velmi lokálně.",
        mpScenario07Title: "Prázdný zásobník a následné zotavení",
        mpScenario07Desc: "Scénář začíná operacemi nad prázdným zásobníkem a teprve potom pokračuje běžnou validní prací.",
        mpScenario08Title: "Dvě vlny úklidu",
        mpScenario08Desc: "Zásobník se naplní, částečně vyčistí, znovu naplní a pak se znovu čistí.",
        mpScenario09Title: "Více malých Odebrat více",
        mpScenario09Desc: "Místo jednoho velkého úklidu se zásobník zmenšuje několika menšími příkazy Odebrat více.",
        mpScenario10Title: "Znovunaplnění po úplném vyčištění",
        mpScenario10Desc: "Zásobník se úplně vyčistí a pak se znovu používá. Je dobře vidět, jak se po spotřebování znovu buduje potenciál."
    },
    queue:{
        queue2StacksTitle: "Fronta pomocí dvou zásobníků",
        queue2StacksAbout: "O frontě pomocí dvou zásobníků",
        queue2StacksDescription: `
                <p>
                    <strong>Fronta pomocí dvou zásobníků</strong> je další standardní a velmi důležitý příklad
                    <strong>amortizované analýzy</strong>. Cílem je realizovat chování fronty
                    (<strong>FIFO</strong>, <em>první dovnitř, první ven</em>) pouze pomocí dvou zásobníků.
                    Jeden příkaz může být občas drahý, ale při pohledu na delší sekvenci zůstává průměrná cena
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

                <h6 class="mt-3"><strong>Podporované operace</strong></h6>
                <ul>
                    <li><strong>Vložit do fronty(x)</strong>: vloží hodnotu <em>x</em> do fronty.</li>
                    <li><strong>Odebrat z fronty()</strong>: odebere nejstarší prvek aktuálně uložený ve frontě.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní princip algoritmu</strong></h6>
                <p>
                    Každý nový prvek se nejdříve vloží do <strong>vstupního zásobníku</strong>.
                    Dokud <strong>výstupní zásobník</strong> obsahuje prvky, může operace
                    <strong>Odebrat z fronty()</strong> odebrat čelní hodnotu přímo z něj.
                    Pokud je <strong>výstupní zásobník</strong> prázdný, všechny prvky ze
                    <strong>vstupního zásobníku</strong> se přesunou do <strong>výstupního zásobníku</strong>.
                </p>
                <p>
                    Tento přesun obrátí jejich pořadí, takže nejstarší prvek skončí nahoře ve <strong>výstupním zásobníku</strong>,
                    což přesně odpovídá chování fronty typu FIFO.
                </p>

                <h6 class="mt-3"><strong>Proč je algoritmus vhodný pro amortizovanou analýzu</strong></h6>
                <p>
                    Tento algoritmus je vhodný pro amortizovanou analýzu proto, že ne každá operace
                    <strong>Odebrat z fronty</strong> stojí stejně. Některá odebrání jsou velmi levná,
                    ale první odebrání po delší sekvenci vložení může spustit celý přesun mnoha prvků
                    ze <strong>vstupního zásobníku</strong> do <strong>výstupního zásobníku</strong>.
                    Jeden takový příkaz pak může působit draze.
                </p>
                <p>
                    Každý prvek má ale velmi omezený životní cyklus:
                </p>
                <ul>
                    <li>jednou se vloží do <strong>vstupního zásobníku</strong>,</li>
                    <li>nejvýše jednou se přesune ze <strong>vstupního</strong> do <strong>výstupního zásobníku</strong>,</li>
                    <li>jednou se odebere z <strong>výstupního zásobníku</strong>.</li>
                </ul>
                <p>
                    Proto celkové množství práce připadající na jeden prvek zůstává omezené.
                </p>

                <h6 class="mt-3"><strong>Složitost jednotlivých operací</strong></h6>
                <ul>
                    <li><strong>Nejhorší případ operace Vložit do fronty</strong>: O(1)</li>
                    <li><strong>Nejhorší případ operace Odebrat z fronty</strong>: O(n), pokud je potřeba přesun</li>
                    <li><strong>Nejlepší případ operace Odebrat z fronty</strong>: O(1), pokud je výstupní zásobník už neprazdný</li>
                </ul>

                <h6 class="mt-3"><strong>Amortizovaná složitost</strong></h6>
                <ul>
                    <li><strong>Amortizovaná složitost operace Vložit do fronty</strong>: O(1)</li>
                    <li><strong>Amortizovaná složitost operace Odebrat z fronty</strong>: O(1)</li>
                    <li><strong>Amortizovaná složitost na operaci v sekvenci</strong>: O(1)</li>
                </ul>
                <p>
                    Drahý přesun se neopakuje stále nad stejnými prvky.
                    Jakmile se prvek jednou přesune do <strong>výstupního zásobníku</strong>,
                    už se zpět nevrací.
                    To je hlavní důvod, proč dlouhodobá průměrná cena zůstává konstantní.
                </p>

                <h6 class="mt-3"><strong>Potenciálová metoda použitá zde</strong></h6>
                <p>
                    V této vizualizaci používáme potenciálovou funkci
                    <strong>Φ = |S<sub>vst</sub>|</strong>.
                </p>
                <ul>
                    <li><strong>Φ</strong> je hodnota potenciálové funkce.</li>
                    <li><strong>S<sub>vst</sub></strong> je vstupní zásobník.</li>
                    <li><strong>|S<sub>vst</sub>|</strong> je počet prvků aktuálně uložených ve vstupním zásobníku.</li>
                </ul>
                <p>
                    Amortizovaná cena je v této vizualizaci vyjádřena pomocí vzorce
                    <strong>â = c + ΔΦ</strong>, kde:
                </p>
                <ul>
                    <li><strong>c</strong> je skutečná cena právě provedené operace,</li>
                    <li><strong>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub></strong> je změna potenciálu,</li>
                    <li><strong>â</strong> je amortizovaná cena této operace.</li>
                </ul>
                <p>
                    V drahém případě odebrání z fronty, pokud se přesouvá <strong>t</strong> prvků, je skutečná cena:
                    <strong>c = 2t + 1</strong>.
                    Přesun zároveň vyprázdní vstupní zásobník, takže potenciál klesne o <strong>t</strong>.
                    V této vizualizaci tedy potenciál vyjadřuje, kolik prvků právě čeká ve <strong>vstupním zásobníku</strong>,
                    a ukazuje, že se při přesunu nahromaděný potenciál snižuje.
                </p>

                <h6 class="mt-3"><strong>Účetní interpretace</strong></h6>
                <p>
                    Účetní pohled vysvětluje stejnou myšlenku jednoduše: prvek při vložení zaplatí nejen za své okamžité vložení,
                    ale uloží si i další kredit na svůj budoucí přesun a konečné odebrání.
                    Protože se každý prvek přesouvá nejvýše jednou, takto uložený kredit stačí.
                </p>

                <h6 class="mt-3"><strong>Co se v této simulaci zobrazuje</strong></h6>
                <ul>
                    <li><strong>Oba vnitřní zásobníky</strong>, aby bylo vidět, kde se každá hodnota právě nachází.</li>
                    <li><strong>Proces přesunu</strong>, včetně jednotlivých kroků ze vstupního do výstupního zásobníku.</li>
                    <li><strong>Počet operací</strong>, který ukazuje, kolik frontových operací už bylo provedeno.</li>
                    <li><strong>Počet kroků</strong>, který představuje elementární práci.</li>
                    <li><strong>Potenciál</strong>, aktualizovaný po příkazech i přesunech.</li>
                    <li><strong>Detailní vysvětlující panel</strong>, který popisuje, co se stalo a proč.</li>
                    <li><strong>Historie kroků</strong>, díky které lze znovu prohlížet již provedené příkazy.</li>
                </ul>

                <h6 class="mt-3"><strong>Co si zde může uživatel vyzkoušet</strong></h6>
                <ul>
                    <li><strong>Manuální režim</strong>: přímo vkládat a odebírat hodnoty z fronty.</li>
                    <li><strong>Náhodný režim</strong>: automaticky vygenerovat náhodnou sekvenci operací nad frontou.</li>
                    <li><strong>Speciální případy</strong>: pozorovat připravené typické scénáře.</li>
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
                    že jeden drahý příkaz ještě neznamená drahý algoritmus jako celek.
                    I když může jedno odebrání z fronty spustit velký přesun, každý prvek se účastní jen malého omezeného počtu
                    elementárních akcí, a právě proto zůstává amortizovaná cena obou operací O(1).
                </p>
        `,
        queueManualParamsModalLabel: "Nastavení parametrů fronty",
        queueValuesLabel: "Zadejte hodnoty fronty:",
        enqueueButton: "Vložit do fronty",
        dequeueButton: "Odebrat z fronty",
        enqueuePrompt: "Zadejte kladné číslo, které chcete vložit do fronty:",
        queueStackInLabel: "Vstupní",
        queueStackOutLabel: "Výstupní",
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
                Kliknutím na <strong>Další</strong> se provede právě jeden příkaz ze zadané sekvence.<br/>
                Tento panel u právě provedeného příkazu vysvětluje <strong>co se provedlo</strong>,
                <strong>jak se změnil vstupní a výstupní zásobník</strong>, <strong>jaká byla skutečná cena</strong>,
                <strong>jak se změnil potenciál</strong>, <strong>jaká z toho vychází amortizovaná cena</strong>
                a <strong>jaká je hlavní myšlenka tohoto kroku</strong>.<br/>
                Všechny výpočty a vysvětlení níže se vždy vztahují jen k <strong>právě zobrazenému příkazu</strong>.
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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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
                <div class="syn-line">Zadejte níže parametry pro náhodné operace nad frontou.</div>
                <div class="syn-line">
                    <span class="syn-label">Minimální / maximální hodnota:</span>
                    <code>použije se jen pro náhodně generované hodnoty u operace Vložit do fronty</code>
                </div>
                <div class="syn-line">
                    <span class="syn-label">Počet operací:</span>
                    <code>určuje, kolik náhodných frontových příkazů se provede</code>
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
        `,
        qScenario01Title: "Série vložení do fronty",
        qScenario01Desc: "Provádějí se pouze operace Vložit do fronty. Fronta roste a potenciál se ukládá ve vstupním zásobníku.",
        qScenario02Title: "Přímé odebrání z připraveného čela",
        qScenario02Desc: "Čelo fronty je už připravené ve výstupním zásobníku, takže jedno odebrání je okamžitě levné.",
        qScenario03Title: "První odebrání spustí celý přesun",
        qScenario03Desc: "Výstupní zásobník je prázdný, takže první odebrání musí nejprve přesunout všechny čekající prvky ze vstupního zásobníku.",
        qScenario04Title: "Přesun a potom levná odebrání",
        qScenario04Desc: "Jedna dražší operace s přesunem je následovaná několika levnými přímými odebráními z výstupního zásobníku.",
        qScenario05Title: "Střídání frontových operací",
        qScenario05Desc: "Operace Vložit do fronty a Odebrat z fronty se často střídají, takže velikost fronty zůstává střední.",
        qScenario06Title: "Prázdná fronta a zotavení",
        qScenario06Desc: "Scénář začíná odebráním z prázdné fronty a potom pokračuje běžnými validními operacemi.",
        qScenario07Title: "Doplňování při připraveném výstupu",
        qScenario07Desc: "Nové prvky přicházejí ve chvíli, kdy výstupní zásobník ještě obsahuje starší čelní prvky. Je vidět rozdíl mezi okamžitou a odloženou prací.",
        qScenario08Title: "Dvě vlny přesunu",
        qScenario08Desc: "Fronta projde dvěma oddělenými fázemi, ve kterých je potřeba přesunout prvky ze vstupního do výstupního zásobníku.",
        qScenario09Title: "Série vložení a úplné vyprázdnění",
        qScenario09Desc: "Nejprve proběhne více vložení do fronty a potom se celá fronta postupně vyprázdní odebráními.",
        qScenario10Title: "Kolísání malé fronty",
        qScenario10Desc: "Fronta opakovaně roste a zmenšuje se kolem malé velikosti, takže je dobře vidět častá lokální změna stavu."
    },
    splay:{
        splayTreeTitle: "Splay strom",
        splayTreeAbout: "O splay stromu",
        splayTreeDescription: `
                <p>
                    <strong>Splay strom</strong> je <strong>samopřizpůsobující se binární vyhledávací strom</strong>.
                    Na rozdíl od přísně vyvažovaných stromů si neukládá explicitní informace o vyvážení.
                    Místo toho zlepšuje svůj tvar průběžně během používání.
                    Po přístupové operaci se navštívený vrchol, případně poslední relevantně navštívený vrchol,
                    pomocí rotací přesune blíže ke kořeni. Tento proces restrukturalizace se nazývá operace <strong>Splay</strong>.
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

                <h6 class="mt-3"><strong>Podporované operace</strong></h6>
                <ul>
                    <li><strong>Vložit(x)</strong>: vloží novou hodnotu a potom vložený vrchol přesune operací Splay směrem ke kořeni.</li>
                    <li><strong>Vyhledat(x)</strong>: hledá hodnotu a potom operací Splay přesune nalezený vrchol, nebo poslední navštívený vrchol, směrem ke kořeni.</li>
                    <li><strong>Smazat(x)</strong>: najde hodnotu, upraví strom pomocí operace Splay, odstraní vrchol a znovu propojí zbývající podstromy.</li>
                </ul>

                <h6 class="mt-3"><strong>Hlavní princip algoritmu</strong></h6>
                <p>
                    Základní myšlenka je, že často navštěvované hodnoty by se měly postupně přesouvat blíž ke kořeni.
                    Tím se další přístupy k podobným hodnotám zlevní.
                    Strom se tedy nesnaží být v každém okamžiku dokonale vyvážený,
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
                    Tato drahá práce se ale neztrácí. Strom se při ní přeuspořádá tak, že další operace bývají levnější.
                    Právě kvůli tomuto dlouhodobému strukturálnímu efektu je průměrná cena v celé sekvenci výrazně lepší
                    než nejhorší případ jedné izolované operace.
                </p>

                <h6 class="mt-3"><strong>Složitost jednotlivých operací</strong></h6>
                <ul>
                    <li><strong>Nejhorší případ operace Vložit</strong>: O(n)</li>
                    <li><strong>Nejhorší případ operace Vyhledat</strong>: O(n)</li>
                    <li><strong>Nejhorší případ operace Smazat</strong>: O(n)</li>
                </ul>

                <h6 class="mt-3"><strong>Amortizovaná složitost</strong></h6>
                <ul>
                    <li><strong>Amortizovaná složitost operace Vložit</strong>: O(log n)</li>
                    <li><strong>Amortizovaná složitost operace Vyhledat</strong>: O(log n)</li>
                    <li><strong>Amortizovaná složitost operace Smazat</strong>: O(log n)</li>
                    <li><strong>Amortizovaná složitost na operaci v sekvenci</strong>: O(log n)</li>
                </ul>
                <p>
                    Právě proto se splay strom vyučuje jako významný příklad amortizované analýzy:
                    lokální chování může být drahé, ale globální chování při mnoha operacích je v průměru logaritmické.
                </p>

                <h6 class="mt-3"><strong>Potenciálová metoda použitá zde</strong></h6>
                <p>
                    Klasická analýza používá potenciálovou funkci založenou na velikostech podstromů:
                    <strong>Φ(T) = Σ<sub>v∈T</sub> log<sub>2</sub>(velikost(podstromu(v)))</strong>.
                </p>
                <ul>
                    <li><strong>T</strong> je aktuální strom.</li>
                    <li><strong>v</strong> je jeden vrchol stromu.</li>
                    <li><strong>podstrom(v)</strong> je podstrom zakořeněný ve vrcholu <em>v</em>.</li>
                    <li><strong>velikost(podstromu(v))</strong> je počet vrcholů v tomto podstromu.</li>
                    <li><strong>Φ(T)</strong> je celkový potenciál stromu.</li>
                </ul>
                <p>
                    Amortizovaná cena jedné operace se počítá podle vzorce
                    <strong>â = c + ΔΦ</strong>, kde:
                </p>
                <ul>
                    <li><strong>c</strong> je skutečná cena právě provedené operace,</li>
                    <li><strong>ΔΦ = Φ<sub>po</sub> - Φ<sub>před</sub></strong> je změna potenciálu,</li>
                    <li><strong>â</strong> je amortizovaná cena této operace.</li>
                </ul>
                <p>
                    Intuice je taková, že potenciál vyjadřuje, jak je strom strukturálně uspořádán.
                    Rotace mění velikosti podstromů, a proto mění i hodnotu potenciálu.
                    Nákladný restrukturalizační krok může výrazně zlepšit budoucí tvar stromu
                    a právě tato změna se v potenciálu projeví.
                </p>

                <h6 class="mt-3"><strong>Účetní interpretace</strong></h6>
                <p>
                    Ve srovnání se zásobníkovými příklady je zde účetní interpretace méně intuitivní v podobě jednotlivých kreditů,
                    protože cena souvisí s tvarem celého stromu. Hlavní myšlenka ale zůstává stejná:
                    drahá restrukturalizace není zbytečná práce, protože mění strukturu a pomáhá budoucím operacím.
                </p>

                <h6 class="mt-3"><strong>Co se v této simulaci zobrazuje</strong></h6>
                <ul>
                    <li><strong>Aktuální struktura stromu</strong>, včetně vrcholů a hran.</li>
                    <li><strong>Navštívená cesta</strong>, tedy které vrcholy byly při operaci procházeny.</li>
                    <li><strong>Rotace</strong>, které vizuálně ukazují, jak se strom během operace Splay mění.</li>
                    <li><strong>Počet operací</strong>, který ukazuje, kolik stromových operací už bylo provedeno.</li>
                    <li><strong>Počet kroků</strong>, který představuje porovnání a strukturální operace.</li>
                    <li><strong>Potenciál</strong>, založený na velikostech podstromů.</li>
                    <li><strong>Detailní vysvětlující panel</strong>, který popisuje prováděný příkaz.</li>
                    <li><strong>Vnitřní rozpad příkazu</strong>, ve kterém je možné sledovat jednotlivé fáze a rotace zvlášť.</li>
                    <li><strong>Historie kroků</strong>, ve které lze znovu procházet dříve provedené příkazy.</li>
                </ul>

                <h6 class="mt-3"><strong>Co si zde může uživatel vyzkoušet</strong></h6>
                <ul>
                    <li><strong>Manuální režim</strong>: přímo vkládat, vyhledávat a mazat hodnoty.</li>
                    <li><strong>Náhodný režim</strong>: automaticky vygenerovat náhodnou sekvenci operací nad stromem.</li>
                    <li><strong>Speciální případy</strong>: pozorovat připravené typické scénáře.</li>
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
                    <strong>Splay strom</strong> je silný příklad amortizované analýzy, protože ukazuje,
                    že algoritmus může být lokálně drahý, a přesto globálně efektivní.
                    Strom se průběžně přeuspořádává podle skutečných přístupů
                    a právě díky této restrukturalizaci vychází amortizovaná složitost operací
                    vložit, vyhledat a smazat jako O(log n), i když jedna konkrétní operace může mít
                    v nejhorším případě stále lineární cenu.
                </p>
        `,
        splayInsertButton: "Vložit",
        splaySearchButton: "Vyhledat",
        splayDeleteButton: "Smazat",
        splayInitTitle: "Nastavení parametrů stromu",
        splayInitLabel: "Zadejte hodnoty stromu:",
        splayInitInvalid: "Zadejte pouze kladná celá čísla oddělená čárkami (např. 1, 2, 3).",
        splaySearchPrompt: "Zadejte kladnou hodnotu, kterou chcete vyhledat:",
        splayInsertPrompt: "Zadejte kladnou hodnotu, kterou chcete vložit:",
        splayDeletePrompt: "Zadejte kladnou hodnotu, kterou chcete smazat:",
        splayRandomTooManyAlert: "Počet hodnot nemůže být větší než počet unikátních hodnot ve zvoleném rozsahu.",
        splayInitialValuesLabel: "Počáteční hodnoty:",
        splayGeneratedValuesLabel: "Vygenerované hodnoty:",
        splayScStepInsertTitle: "Vložit {value}",
        splayScStepSearchTitle: "Vyhledat {value}",
        splayScStepDeleteTitle: "Smazat {value}",
        splaySyntaxModalLabel: "Příkazy v syntaxi (Splay strom)",
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
        splaySyntaxInputLabel: "Příkazy v syntaxi (Splay strom):",
        splaySyntaxInvalidAlert: "Zadejte platné příkazy v syntaxi pro Splay strom!",
        splaySynPanelTitle: "REŽIM SYNTAXE",
        splaySynPanelDesc: `
                Kliknutím na <strong>Další</strong> se provede právě jeden příkaz ze zadané sekvence.<br/>
                Tento panel u právě provedeného příkazu vysvětluje <strong>co se provedlo</strong>,
                <strong>jak se změnil strom</strong>, <strong>jaká byla skutečná cena</strong>,
                <strong>jak se změnil potenciál</strong>, <strong>jaká z toho vychází amortizovaná cena</strong>
                a <strong>jaká je hlavní myšlenka tohoto kroku</strong>.<br/>
                U splay stromu se navíc zobrazuje i <strong>vnitřní rozpad příkazu</strong>.
                Pokud během operace dojde k rotacím nebo jiným vnitřním fázím, jsou níže rozepsané zvlášť
                i se svými hodnotami <strong>Δkroky</strong>, <strong>Φ před</strong>, <strong>Φ po</strong> a <strong>ΔΦ</strong>.
        `,
        randomParamsInfo: `
                <div class="syn-line">Zadejte níže parametry pro náhodné operace nad splay stromem.</div>
                <div class="syn-line">
                    <span class="syn-label">Minimální / maximální hodnota:</span>
                    <code>použije se jen pro náhodně generované hodnoty u operace Vložit</code>
                </div>
                <div class="syn-line">
                    <span class="syn-label">Pravidlo pro vložení:</span>
                    <code>náhodně vkládané hodnoty zůstávají ve stromu unikátní</code>
                </div>
                <div class="syn-line">
                    <span class="syn-label">Počet operací:</span>
                    <code>určuje, kolik náhodných stromových příkazů se provede</code>
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

                {analysisBlock}

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

                {analysisBlock}

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

                {analysisBlock}

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
        splaySideRight: "pravý",
        sScenario01Title: "Malé relativně vyvážené sestavení",
        sScenario01Desc: "Malá sada hodnot se vloží v poměrně příznivém pořadí, takže strom zůstává snáz průchozí.",
        sScenario02Title: "Rostoucí vkládání",
        sScenario02Desc: "Hodnoty se vkládají ve vzestupném pořadí. Vzniká tím velmi typický a výrazný růstový vzor.",
        sScenario03Title: "Klesající vkládání",
        sScenario03Desc: "Hodnoty se vkládají v sestupném pořadí. Jde o zrcadlový protějšek vzestupného scénáře.",
        sScenario04Title: "Opakované hledání důležitého vrcholu",
        sScenario04Desc: "Po sestavení stromu se opakovaně vyhledává stejná důležitá hodnota. Strom se tomuto přístupovému vzoru přizpůsobuje.",
        sScenario05Title: "Vyhledání neexistující hodnoty",
        sScenario05Desc: "Hledaná hodnota ve stromu není. Strom se přesto změní, protože se operací Splay přesune poslední navštívený vrchol.",
        sScenario06Title: "Smazání existující hodnoty",
        sScenario06Desc: "Po sestavení stromu se smaže hodnota, která ve stromu skutečně je. V jednom scénáři je tak vidět hledání, restrukturalizace i spojování podstromů.",
        sScenario07Title: "Smazání neexistující hodnoty",
        sScenario07Desc: "Požaduje se smazání hodnoty, která ve stromu není. Přesto dojde ke strukturální úpravě kolem posledního navštíveného vrcholu.",
        sScenario08Title: "Směs vložení, hledání a mazání",
        sScenario08Desc: "Krátký smíšený scénář, ve kterém se kombinuje vložení, přístup a smazání v jedné kompaktní ukázce.",
        sScenario09Title: "Vychýlený růst a hledání staré hodnoty",
        sScenario09Desc: "Strom roste jednostranně a potom se vyhledává starší hluboká hodnota, což vede k náročnější restrukturalizaci.",
        sScenario10Title: "Smíšené aktualizace",
        sScenario10Desc: "Širší kombinace vložení, vyhledání a mazání, na které je dobře vidět, jak se strom v čase neustále přizpůsobuje."
    }
  }
};