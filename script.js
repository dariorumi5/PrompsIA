const groups = [
  {
    id: 'enhypen',
    name: 'ENHYPEN',
    image: 'imagenes/enhypen.svg',
    debut: '2020-11-30',
    initialTier: 'S',
    members: [
      {name:'Jungwon', position:'Leader, dancer, vocalist'},
      {name:'Heeseung', position:'Main vocalist, dancer'},
      {name:'Jay', position:'Lead rapper'},
      {name:'Jake', position:'Lead vocalist'},
      {name:'Sunghoon', position:'Vocalist, visual'},
      {name:'Sunoo', position:'Vocalist'},
      {name:'Ni-ki', position:'Main dancer'}
    ]
  },
  {
    id: 'ateez',
    name: 'ATEEZ',
    image: 'imagenes/ateez.svg',
    debut: '2018-10-24',
    initialTier: 'A',
    members: [
      {name:'Hongjoong', position:'Leader, rapper, composer'},
      {name:'Seonghwa', position:'Lead vocalist, visual'},
      {name:'Yunho', position:'Main dancer, vocalist'},
      {name:'Yeosang', position:'Vocalist, visual'},
      {name:'San', position:'Vocalist'},
      {name:'Mingi', position:'Main rapper'},
      {name:'Wooyoung', position:'Main dancer, vocalist'},
      {name:'Jongho', position:'Main vocalist'}
    ]
  },
  {
    id: 'izna',
    name: 'Izna',
    image: 'imagenes/izna.svg',
    debut: 'Por confirmar',
    initialTier: 'B',
    members: [
      {name:'Miembro 1', position:'Posición 1'},
      {name:'Miembro 2', position:'Posición 2'},
      {name:'Miembro 3', position:'Posición 3'}
    ]
  },
  {
    id: 'andteam',
    name: '&TEAM',
    image: 'imagenes/andteam.svg',
    debut: 'Por confirmar',
    initialTier: 'C',
    members: [
      {name:'Miembro A', position:'Posición A'},
      {name:'Miembro B', position:'Posición B'},
      {name:'Miembro C', position:'Posición C'}
    ]
  }
];

function createCard(g){
  const el = document.createElement('div');
  el.className = 'card';
  el.setAttribute('draggable','true');
  el.dataset.id = g.id;
  el.innerHTML = `
    <img src="${g.image}" alt="${g.name}" />
    <div class="info">
      <div class="name">${g.name}</div>
      <div class="meta">Debut: ${g.debut}</div>
    </div>
  `;

  el.addEventListener('dragstart', (e)=>{
    e.dataTransfer.setData('text/plain', g.id);
    e.dataTransfer.effectAllowed = 'move';
  });

  el.addEventListener('click', ()=>openDetails(g));

  return el;
}

function openDetails(g){
  const panel = document.getElementById('details');
  const content = document.getElementById('detailContent');
  content.innerHTML = `
    <h3>${g.name}</h3>
    <div><strong>Debut:</strong> ${g.debut}</div>
    <div class="members">
      <h4>Integrantes</h4>
      ${g.members.map(m=>`<div class="member"><strong>${m.name}</strong> — ${m.position}</div>`).join('')}
    </div>
  `;
  panel.style.display = 'block';
}

function closeDetails(){
  document.getElementById('details').style.display = 'none';
}

function setup(){
  const tiers = document.querySelectorAll('.tier');
  tiers.forEach(t=>{
    t.addEventListener('dragover',(e)=>{e.preventDefault();t.classList.add('dragover')});
    t.addEventListener('dragleave',()=>t.classList.remove('dragover'));
    t.addEventListener('drop',(e)=>{
      e.preventDefault();t.classList.remove('dragover');
      const id = e.dataTransfer.getData('text/plain');
      const grp = groups.find(x=>x.id===id);
      if(!grp) return;
      t.appendChild(createCard(grp));
    });
  });

  // Render initial
  groups.forEach(g=>{
    const column = document.querySelector(`.tier[data-tier="${g.initialTier}"]`);
    if(column) column.appendChild(createCard(g));
  });

  document.getElementById('closeDetails').addEventListener('click', closeDetails);
}

document.addEventListener('DOMContentLoaded', setup);
