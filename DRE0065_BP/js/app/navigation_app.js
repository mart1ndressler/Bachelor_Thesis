function changeContent(algorithm){
    stackArray = [], steps = [], stepCount = 0, potential = 0, isBestWorstMode = false;
    currentPage = algorithm;

    document.getElementById('algorithmLinks').style.display = 'none';
    document.getElementById('backArrow').style.display = 'block';

    const contentDiv = document.getElementById('dynamicContent');
    const aboutBtn = document.getElementById('aboutAppBtn');
    const modalTitle = document.getElementById('aboutModalLabel');
    const language = localStorage.getItem('language') || 'en';
    const section = pageToSection(algorithm);
    const langData = (section === 'multipop' || section === 'queue' || section === 'splay') ? trPage(section, language) : trAll(language);

    switch(algorithm){
        case 'multipop':
            contentDiv.innerHTML = 
            `<div class="alg_parameters">
                <h2>${langData.multipopTitle}</h2>
                <button class="btn btn-primary" onclick="openManualParamsModalU()">${langData.manualButton}</button>
                <button class="btn btn-primary" onclick="openRandomParamsModalU()">${langData.randomButton}</button>
                <button class="btn btn-primary" onclick="openBestWorstParamsModalU()">${langData.bestWorstButton}</button>
                <button class="btn btn-primary" onclick="openSyntaxModalU()">${langData.syntaxButton}</button>
            </div>`;

            aboutBtn.textContent = langData.multipopAbout;
            modalTitle.textContent = langData.multipopAbout;
            document.getElementById('aboutModalBody').innerHTML = langData.multipopDescription;
            document.title = langData.multipopTitle;
            break;

        case 'queue2Stacks':
            contentDiv.innerHTML = 
            `<div class="alg_parameters">
                <h2>${langData.queue2StacksTitle}</h2>
                <button class="btn btn-primary" onclick="openManualParamsModalU()">${langData.manualButton}</button>
                <button class="btn btn-primary" onclick="openRandomParamsModalU()">${langData.randomButton}</button>
                <button class="btn btn-primary" onclick="openBestWorstParamsModalU()">${langData.bestWorstButton}</button>
                <button class="btn btn-primary" onclick="openSyntaxModalU()">${langData.syntaxButton}</button>
            </div>`;

            aboutBtn.textContent = langData.queue2StacksAbout;
            modalTitle.textContent = langData.queue2StacksAbout;
            document.getElementById('aboutModalBody').innerHTML = langData.queue2StacksDescription;
            document.title = langData.queue2StacksTitle;
            break;

        case 'splayTree':
            contentDiv.innerHTML = 
            `<div class="alg_parameters">
                <h2>${langData.splayTreeTitle}</h2>
                <button class="btn btn-primary" onclick="openManualParamsModalU()">${langData.manualButton}</button>
                <button class="btn btn-primary" onclick="openRandomParamsModalU()">${langData.randomButton}</button>
                <button class="btn btn-primary" onclick="openBestWorstParamsModalU()">${langData.bestWorstButton}</button>
                <button class="btn btn-primary" onclick="openSyntaxModalU()">${langData.syntaxButton}</button>
            </div>`;

            aboutBtn.textContent = langData.splayTreeAbout;
            modalTitle.textContent = langData.splayTreeAbout;
            document.getElementById('aboutModalBody').innerHTML = langData.splayTreeDescription;
            document.title = langData.splayTreeTitle;
            break;
    }
}

function goBack(){
    currentPage = 'main';
    document.getElementById('algorithmLinks').style.display = 'block';
    document.getElementById('backArrow').style.display = 'none';
    document.getElementById('dynamicContent').innerHTML = '';

    const language = localStorage.getItem('language') || 'en';
    changeLanguage(language);
}