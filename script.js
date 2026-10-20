const navWrap=document.querySelector('.nav-wrap');
window.addEventListener('scroll',()=>navWrap.classList.toggle('scrolled',window.scrollY>20));

const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
const closeMenu=()=>{
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Abrir menu');
};
toggle.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',e=>{
  if(links.classList.contains('open')&&!links.contains(e.target)&&!toggle.contains(e.target))closeMenu();
});
window.addEventListener('resize',()=>{if(window.innerWidth>720)closeMenu()});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('.metric-number');
const counterObs=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,target=Number(el.dataset.target||0),prefix=el.dataset.prefix||'';
  const start=performance.now(),duration=900;
  const tick=now=>{const p=Math.min(1,(now-start)/duration);const eased=1-Math.pow(1-p,3);el.textContent=prefix+Math.round(target*eased);if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);counterObs.unobserve(el);
}),{threshold:.6});
counters.forEach(el=>counterObs.observe(el));

// Catálogo de cursos confirmados em currículo e documentos fornecidos.
// Os arquivos PDF públicos ocultam CPF/RG quando presentes no original.
const certificates = [
  {name:'Inspetor da Qualidade', org:'Centro de Aprendizagem Excelência (CAE)', category:'industria', hours:120, date:'Mai 2025', file:'certificados/inspetor-da-qualidade.pdf', note:'Registro 0009396'},
  {name:'Matemática Básica', org:'Centro de Aprendizagem Excelência (CAE)', category:'industria', hours:80, date:'Mai 2025', file:'certificados/matematica-basica.pdf', note:'Registro 0009453'},
  {name:'Gestão de Cooperativa', org:'Instituto Federal do Amazonas (IFAM)', category:'industria', hours:60, date:'Certificação IFAM', file:'certificados/gestao-de-cooperativa-ifam.pdf', note:'Aproveitamento: 70%'},
  {name:'TBO — Treinamento Básico Operacional', org:'Mega Cursos e Treinamentos', category:'industria', hours:20, date:'Ago 2020', file:'certificados/tbo.pdf', note:'Treinamento operacional'},
  {name:'Fundamentos Básicos de Energia Fotovoltaica Residencial', org:'Instituto Federal do Triângulo Mineiro · Aprenda Mais', category:'industria', hours:20, date:'Out 2026', file:'certificados/energia-fotovoltaica.pdf', note:'Plataforma Aprenda Mais'},
  {name:'React: Construindo Single Page Applications Dinâmicas', org:'Instituto Federal do Rio Grande do Sul · Aprenda Mais', category:'tecnologia', hours:40, date:'Out 2026', file:'certificados/react.pdf', note:'Plataforma Aprenda Mais'},
  {name:'Python Fundamental 1', org:'Instituto Federal de Santa Catarina · Aprenda Mais', category:'tecnologia', hours:20, date:'Out 2026', file:'certificados/python-fundamental.pdf', note:'Plataforma Aprenda Mais'},
  {name:'Node.js: Introdução ao Desenvolvimento de APIs Modernas', org:'Instituto Federal do Rio Grande do Sul · Aprenda Mais', category:'tecnologia', hours:40, date:'Out 2026', file:'certificados/nodejs.pdf', note:'Plataforma Aprenda Mais'},
  {name:'HTML5: Fundamentos para Construção de Páginas Web Modernas', org:'Instituto Federal do Rio Grande do Sul · Aprenda Mais', category:'tecnologia', hours:40, date:'Out 2026', file:'certificados/html5.pdf', note:'Plataforma Aprenda Mais'},
  {name:'Banco de Dados 1: fundamentos', org:'Instituto Federal do Rio Grande do Sul · Aprenda Mais', category:'tecnologia', hours:20, date:'Out 2026', file:'certificados/banco-de-dados.pdf', note:'Plataforma Aprenda Mais'},
  {name:'Análise e Projeto de Software', org:'Instituto Federal do Rio Grande do Sul · Aprenda Mais', category:'tecnologia', hours:20, date:'Out 2026', file:'certificados/analise-e-projeto.pdf', note:'Plataforma Aprenda Mais'},
  {name:'AI for App Deployment', org:'Google', category:'tecnologia', hours:null, date:'Ago 2026', file:null, note:'Certificação Google'}
];
const certificateGrid = document.querySelector('#certificate-grid');
const filterButtons = [...document.querySelectorAll('.cert-filter')];
const certQuery = document.querySelector('#cert-query');
let selectedCategory = 'todos';
const normalizeText = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
function makeNode(tag, className, value){
  const el=document.createElement(tag);
  if(className)el.className=className;
  if(value!==undefined)el.textContent=value;
  return el;
}
function createCertificateCard(record,index){
  const article=makeNode('article','certificate-card');
  const top=makeNode('div','certificate-top');
  top.append(makeNode('span','certificate-type',record.category==='tecnologia'?'TECNOLOGIA & IA':'INDÚSTRIA & GESTÃO'));
  top.append(makeNode('strong','certificate-hours',record.hours?`${record.hours} horas`:'Certificação'));
  const title=makeNode('h3','',record.name);
  const org=makeNode('p','certificate-org',record.org);
  const details=makeNode('div','certificate-details');
  details.append(makeNode('span','',record.date));
  details.append(makeNode('span','',record.note));
  const link=makeNode('a','certificate-action',record.file?'Visualizar certificado ↗':'Solicitar comprovante ↗');
  if(record.file){link.href=record.file;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',`Abrir certificado de ${record.name} em PDF`)}
  else{link.href=`mailto:airesgustavo@hotmail.com?subject=${encodeURIComponent('Solicitação de comprovante: '+record.name)}`;link.setAttribute('aria-label',`Solicitar comprovante do curso ${record.name} por e-mail`)}
  article.append(top,title,org,details,link);
  return article;
}
function renderCertificates(){
  if(!certificateGrid)return;
  const search=normalizeText(certQuery?.value?.trim()||'');
  const filtered=certificates.filter(item=>(selectedCategory==='todos'||item.category===selectedCategory)&&normalizeText([item.name,item.org,item.note].join(' ')).includes(search));
  const fragment=document.createDocumentFragment();
  filtered.forEach((c,i)=>fragment.append(createCertificateCard(c,i)));
  certificateGrid.replaceChildren(fragment);
  if(!filtered.length)certificateGrid.append(makeNode('p','certificate-empty','Nenhum curso encontrado. Experimente outra palavra ou selecione “Todos”.'));
}
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  selectedCategory=button.dataset.category;
  filterButtons.forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active))});
  renderCertificates();
}));
certQuery?.addEventListener('input',renderCertificates);
renderCertificates();