let currentPage = 'main';
let activeModalContext = null;

const APP_PAGES = Object.freeze({
  multipop: {section: 'multipop', titleKey: 'multipopTitle', aboutKey: 'multipopAbout', descKey: 'multipopDescription', headingSelector: '.alg_parameters h2'},
  queue2Stacks: {section: 'queue', titleKey: 'queue2StacksTitle', aboutKey: 'queue2StacksAbout', descKey: 'queue2StacksDescription', headingSelector: '.alg_parameters h2'},
  splayTree: {section: 'splay', titleKey: 'splayTreeTitle', aboutKey: 'splayTreeAbout', descKey: 'splayTreeDescription', headingSelector: '.alg_parameters h2'}
});

function getPageCfg(page){
  return APP_PAGES[page] || null;
}