const groups = [
  {
    id: 'enhypen',
    name: 'ENHYPEN',
    image: 'imagenes/enhypen.svg',
    debut: '2020-11-30',
    initialTier: 'S',
    members: [
      {name:'Jungwon', position:'Leader, Dancer, Vocalist'},
      {name:'Heeseung', position:'Main Vocalist, Dancer'},
      {name:'Jay', position:'Lead Rapper'},
      {name:'Jake', position:'Lead Vocalist'},
      {name:'Sunghoon', position:'Vocalist, Visual'},
      {name:'Sunoo', position:'Vocalist'},
      {name:'Ni-ki', position:'Main Dancer'}
    ]
  },
  {
    id: 'ateez',
    name: 'ATEEZ',
    image: 'imagenes/ateez.svg',
    debut: '2018-10-24',
    initialTier: 'A',
    members: [
      {name:'Hongjoong', position:'Leader, Rapper, Composer'},
      {name:'Seonghwa', position:'Lead Vocalist, Visual'},
      {name:'Yunho', position:'Main Dancer, Vocalist'},
      {name:'Yeosang', position:'Vocalist, Visual'},
      {name:'San', position:'Vocalist'},
      {name:'Mingi', position:'Main Rapper'},
      {name:'Wooyoung', position:'Main Dancer, Vocalist'},
      {name:'Jongho', position:'Main Vocalist'}
    ]
  },
  {
    id: 'izna',
    name: 'Izna',
    image: 'imagenes/izna.svg',
    debut: '2024 (Proyecto IZ)',
    initialTier: 'B',
    members: [
      {name:'Chaewon', position:'Leader, Vocalist'},
      {name:'Sakura', position:'Lead Dancer, Vocalist'},
      {name:'Eunbi', position:'Main Vocalist'},
      {name:'Yuri', position:'Lead Dancer, Rapper'}
    ]
  },
  {
    id: 'andteam',
    name: '&TEAM',
    image: 'imagenes/andteam.svg',
    debut: '2022-12-28',
    initialTier: 'C',
    members: [
      {name:'Fuma', position:'Leader, Dancer'},
      {name:'Harua', position:'Main Vocalist'},
      {name:'Taki', position:'Dancer, Rapper'},
      {name:'Yuma', position:'Vocalist'},
      {name:'Nikki', position:'Sub-Vocalist, Dancer'},
      {name:'EJ', position:'Lead Rapper'},
      {name:'Maki', position:'Vocalist, Dancer'}
    ]
  }
];

// Render Group Cards (simplified - no members inside)
function renderGroupsGrid(){
  const grid = document.getElementById('groupsGrid');
  grid.innerHTML = groups.map(g=>`
    <div class="group-card" data-group-id="${g.id}">
      <div class="group-header">
        <h3>${g.name}</h3>
        <div class="meta">Debut: ${g.debut}</div>
      </div>
      <img src="${g.image}" alt="${g.name}" class="group-image" />
    </div>
  `).join('');

  // Add click listeners
  document.querySelectorAll('.group-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const groupId = card.dataset.groupId;
      const section = document.getElementById(`members-${groupId}`);
      if(section) section.scrollIntoView({behavior:'smooth'});
    });
  });
}

// Render Members Tables (separate sections)
function renderMembersSection(){
  const container = document.getElementById('membersContainer');
  container.innerHTML = groups.map(g=>`
    <section class="members-section" id="members-${g.id}">
      <h3>${g.name} — Integrantes (${g.members.length})</h3>
      <table class="members-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Posición</th>
          </tr>
        </thead>
        <tbody>
          ${g.members.map(m=>`<tr><td>${m.name}</td><td>${m.position}</td></tr>`).join('')}
        </tbody>
      </table>
    </section>
  `).join('');
}

// Create Draggable Card for Tierlist
function createCard(g){
  const el = document.createElement('div');
  el.className = 'card';
  el.setAttribute('draggable','true');
  el.dataset.id = g.id;
  el.innerHTML = `
    <img src="${g.image}" alt="${g.name}" />
    <div class="info">
      <div class="name">${g.name}</div>
      <div class="meta">${g.debut}</div>
    </div>
  `;

  el.addEventListener('dragstart', (e)=>{
    e.dataTransfer.setData('text/plain', g.id);
    e.dataTransfer.effectAllowed = 'move';
  });

  return el;
}

// Setup Tierlist Drag & Drop
function setupTierlist(){
  const tiers = document.querySelectorAll('.tier');
  tiers.forEach(t=>{
    t.addEventListener('dragover',(e)=>{e.preventDefault();t.classList.add('dragover')});
    t.addEventListener('dragleave',()=>t.classList.remove('dragover'));
    t.addEventListener('drop',(e)=>{
      e.preventDefault();
      t.classList.remove('dragover');
      const id = e.dataTransfer.getData('text/plain');
      const grp = groups.find(x=>x.id===id);
      if(!grp) return;
      t.appendChild(createCard(grp));
    });
  });

  // Populate initial tiers
  groups.forEach(g=>{
    const column = document.querySelector(`.tier[data-tier="${g.initialTier}"]`);
    if(column) column.appendChild(createCard(g));
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', ()=>{
  renderGroupsGrid();
  renderMembersSection();
  setupTierlist();
});
