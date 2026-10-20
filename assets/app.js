// Tree Picks mockup interactions. Product facts are Adam's, from treepicks.com (2026-10-19).
(function(){
  if(/[?&]shot/.test(location.search)){ const st=document.createElement('style'); st.textContent='*{animation:none!important;transition:none!important}.reveal,.sr,.pyr-pick{opacity:1!important;transform:none!important}'; document.head.appendChild(st); }
  const $ = (s, r=document) => r.querySelector(s);
  const check = '<svg><use href="#i-check"/></svg>';

  // cart + toast
  let cart = 0, tt;
  window.toast = function(msg){
    const t = $('#toast'); if(!t) return;
    $('#toastMsg').textContent = msg;
    t.classList.add('on'); clearTimeout(tt);
    tt = setTimeout(()=>t.classList.remove('on'), 2600);
  };
  function add(name, qty=1){
    cart += qty;
    const n = $('#cartN'); n.textContent = cart; n.classList.add('on');
    toast(name + ' added to your cart');
  }
  document.addEventListener('click', e=>{
    const b = e.target.closest('[data-add]');
    if(!b) return;
    e.preventDefault(); e.stopPropagation();
    const q = parseInt(($('#qty')||{}).value||1,10);
    add(b.dataset.add, b.hasAttribute('data-qty') ? q : 1);
  });

  // design notes layer
  const nt = $('#notesToggle');
  if(nt) nt.addEventListener('click', ()=>{
    const on = document.body.classList.toggle('show-notes');
    nt.setAttribute('aria-pressed', on);
    nt.lastChild.textContent = on ? 'Hide design notes' : 'Show design notes';
  });

  // scroll reveal
  const io = new IntersectionObserver(es=>es.forEach(en=>{
    if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
  }), {rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.sr').forEach(el=>io.observe(el));

  // ---------- gift finder ----------
  const gifts = [
    {k:'everything', label:'The one who has everything', name:'The Variety Pack', price:'39.99', rev:39, img:'tree-picks-sampler_0.jpg', href:'variety-pack.html',
     why:'One of every pick Adam makes: eleven picks across guitar, jazz, ukulele and bass. For the player who says they have enough picks. They don’t have these.',
     pts:['11 picks, 6 different woods','Guitar, jazz, ukulele and a bass pick','Free shipping in Canada']},
    {k:'dad', label:'Dad', name:'Father’s Day Picks', price:'19.99', rev:24, img:'fathers-day-picks_3.jpg',
     why:'Five maple picks, each engraved for him: Play Me a Song Dad, Dad Rocks, Couldn’t Pick a Better Dad, World’s Best Dad, Rockstar Dad.',
     pts:['5 engraved maple picks','He’ll use them every time he plays','Works for birthdays and Christmas too']},
    {k:'mom', label:'Mom', name:'Mother’s Day Picks', price:'19.99', img:'mothers-day-guitar-picks_0.jpg',
     why:'Five maple picks engraved for the mom who rocks: Play Me a Song Mom, M❤M, Couldn’t Pick a Better Mom, World’s Best Mom, Rockstar Mom.',
     pts:['5 engraved maple picks','More original than flowers or another mug','Made in Canada']},
    {k:'partner', label:'My partner', name:'Valentine\u2019s Day Picks', price:'19.99', rev:1, img:'valentines-day-picks_0.jpg',
     why:'Five wooden picks engraved I Pick You, Be Mine, You Rock, I ❤ You and XOXO. A small gift that says the thing.',
     pts:['5 engraved wooden picks','Birthdays, anniversaries, Valentine’s','Every pack plants a tree']},
    {k:'son', label:'Son', name:'Son Picks', price:'19.99', rev:5, img:'son_1.jpg',
     why:'Five maple picks engraved “Couldn’t Pick a Better Son.” A great stocking stuffer for a son who plays.',
     pts:['5 engraved maple picks','Stocking-stuffer size','Free shipping in Canada']},
    {k:'daughter', label:'Daughter', name:'Daughter Picks', price:'19.99', img:'daughter_0.jpg',
     why:'Five maple picks engraved “Couldn’t Pick a Better Daughter.” For the daughter who rocks.',
     pts:['5 engraved maple picks','Stocking-stuffer size','Every pack plants a tree']},
    {k:'new', label:'Trying wood for the first time', f:'someone new to wooden picks', name:'Guitar Sample Pack', price:'22.99', rev:122, img:'tree-pick-sampler-pack_3.jpg',
     why:'Five woods, one pick each: maple, cherry, walnut, zebrawood and purpleheart. Play them back to back and pick a favourite.',
     pts:['5 picks, 5 woods','Our most-reviewed pack (4.98 stars)','The easiest way to start']},
    {k:'bass', label:'A bass player', name:'Ebony Bass Pick', price:'29.99', rev:13, img:'tree-picks-bass_2.jpg',
     why:'A 1.9 mm ebony pick made for bass: thick, punchy attack, a large triangle with three playable edges. Not a guitar pick pretending.',
     pts:['Ebony, 1.9 mm','Three playable edges','Glides over flats or rounds']},
    {k:'uke', label:'A ukulele player', name:'Ukulele Sample Pack', price:'19.99', img:'tree-picks-ukulele-sample-pack_3.jpg',
     why:'Warmer than plastic, brighter than felt. More volume in a group and less sore fingers from strumming.',
     pts:['Maple and cherry picks','Made for ukulele','Easy on nylon strings']},
    {k:'canada', label:'A proud Canadian', name:'Canada 5-Pack', price:'18.99', was:'19.99', rev:28, img:'canada-guitar-picks_0.jpg',
     why:'Five picks with a maple leaf design, made in Calgary from Canadian maple and cherry. A little piece of the True North for the case.',
     pts:['3 maple + 2 cherry','Canadian wood, made in Calgary','On sale now']},
    {k:'funny', label:'The funny one', name:'Dick Picks', price:'19.99', rev:7, img:'dick-picks-5-picks_0.jpg',
     why:'The only one you should ever send. A gag gift that actually ends up in the guitar case.',
     pts:['5 maple picks','Guaranteed laugh','Actually useful']},
  ];
  const tabs = $('#finderTabs'), card = $('#finderCard');
  if(tabs && card){
    tabs.innerHTML = gifts.map((g,i)=>`<button class="chip" role="tab" aria-selected="${i===0}" data-k="${g.k}">${g.label}</button>`).join('');
    const show = k => {
      const g = gifts.find(x=>x.k===k);
      tabs.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-selected', c.dataset.k===k));
      card.innerHTML = `
        <div class="finder-img"><img class="fade-swap" src="assets/img/${g.img}" alt="${g.name}"></div>
        <div class="finder-body fade-swap">
          <div class="for">For ${g.f||g.label.replace(/^The /,'the ').replace(/^My /,'your ').replace(/^A /,'a ')}</div>
          <h3>${g.name}</h3>
          ${g.rev?`<div class="rating"><span class="stars">★★★★★</span>${g.rev} review${g.rev>1?'s':''}</div>`:''}
          <p class="why">${g.why}</p>
          <ul>${g.pts.map(p=>`<li>${check}${p}</li>`).join('')}</ul>
          <div class="buy-row">
            <span class="price">$${g.price}${g.was?`<span class="was">$${g.was}</span>`:''}</span>
            <button class="btn btn-cherry" data-add="${g.name}">Add to cart <span class="arrow">→</span></button>
            ${g.href?`<a href="${g.href}" style="font-weight:600">See what’s inside</a>`:''}
          </div>
        </div>`;
    };
    tabs.addEventListener('click', e=>{ const c=e.target.closest('.chip'); if(c) show(c.dataset.k); });
    const want = new URLSearchParams(location.search).get('for');
    show(gifts.some(g=>g.k===want) ? want : 'everything');
  }

  // ---------- tone ladder ----------
  const woods = [
    {k:'cherry', name:'Cherry', mm:'1.3', price:'18.99', img:'cherry',
     d:'The softest, warmest wood we use. Smooth and mellow, easy on the strings, comfortable for hours.',
     who:'For a lighter touch, nylon strings, classical guitar and ukulele.'},
    {k:'walnut', name:'Walnut', mm:'1.4', price:'19.99', img:'walnut',
     d:'Balanced. A warm tone and a comfortable feel that sits right between our softer and harder woods.',
     who:'For folk, rock and acoustic players who want an all-rounder.'},
    {k:'maple', name:'Maple', mm:'1.3', price:'18.99', img:'maple',
     d:'Our most versatile wood. A bright, punchy attack, and harder than walnut or cherry so it holds up well.',
     who:'For players who play a bit of everything.'},
    {k:'zebra', name:'Zebrawood', mm:'1.6', price:'19.99', img:'zebra',
     d:'Bold striped grain and a lively tone. A bright, snappy attack that lasts.',
     who:'For players who want a pick that turns heads on stage.'},
    {k:'purpleheart', name:'Purpleheart', mm:'1.4', price:'24.99', img:'purpleheart',
     d:'The hardest wood we have. It lasts longer than any other wooden pick we make.',
     who:'For heavy strummers, hard rock and metal.'},
  ];
  const lp = $('#ladderPicks'), wc = $('#woodCard');
  if(lp && wc){
    lp.innerHTML = woods.map((w,i)=>`<button class="lp" aria-pressed="${i===2}" data-k="${w.k}" aria-label="${w.name}"><img src="assets/img/picks/${w.img}.png" alt=""><span>${w.name}</span></button>`).join('');
    const show = k => {
      const w = woods.find(x=>x.k===k);
      lp.querySelectorAll('.lp').forEach(b=>b.setAttribute('aria-pressed', b.dataset.k===k));
      wc.innerHTML = `<div class="fade-swap">
        <div class="eyebrow">Guitar pick · 5-pack</div>
        <h3>${w.name}</h3>
        <div class="spec"><span>THICKNESS ${w.mm} MM</span><span>HAND-SHAPED IN CALGARY</span></div>
        <p>${w.d}</p>
        <div class="for-who">${w.who}</div>
        <div class="buy-row"><span class="price">$${w.price}</span><button class="btn btn-cherry" data-add="${w.name} 5-pack">Add 5 picks <span class="arrow">→</span></button></div>
      </div>`;
    };
    lp.addEventListener('click', e=>{ const b=e.target.closest('.lp'); if(b) show(b.dataset.k); });
    lp.addEventListener('mouseover', e=>{ const b=e.target.closest('.lp'); if(b && matchMedia('(hover:hover)').matches) show(b.dataset.k); });
    show('maple');
  }

  // ---------- product page: meet all eleven ----------
  const eleven = [
    {r:0, img:'zebra', n:'Zebrawood', t:'Guitar · 1.6 mm', d:'Bright, snappy, bold stripes.'},
    {r:0, img:'purpleheart', n:'Purpleheart', t:'Guitar · 1.4 mm', d:'Our hardest wood. Built for a heavy hand.'},
    {r:0, img:'cherry', n:'Cherry', t:'Guitar · 1.3 mm', d:'The softest and warmest. Smooth and mellow.'},
    {r:0, img:'maple', n:'Maple', t:'Guitar · 1.3 mm', d:'Versatile, bright and punchy.'},
    {r:0, img:'walnut', n:'Walnut', t:'Guitar · 1.4 mm', d:'Balanced and warm. The all-rounder.'},
    {r:1, img:'jazz-maple', n:'Maple Jazz', t:'Jazz · 1.3 mm', d:'Small pick, more control.'},
    {r:1, img:'jazz-zebra', n:'Zebrawood Jazz', t:'Jazz · 1.6 mm', d:'Small and lively.'},
    {r:1, img:'jazz-purpleheart', n:'Purpleheart Jazz', t:'Jazz · 1.4 mm', d:'Small and tough.'},
    {r:2, img:'uke-cherry', n:'Cherry Ukulele', t:'Ukulele', d:'Warm, gentle on nylon strings.'},
    {r:2, img:'uke-maple', n:'Maple Ukulele', t:'Ukulele', d:'A little brighter, a little louder.'},
    {r:3, img:'bass-ebony', n:'Ebony Bass', t:'Bass · 1.9 mm', d:'Thick, punchy, three playable edges.'},
  ];
  const pyr = $('#pyramid'), pinfo = $('#pickInfo');
  if(pyr && pinfo){
    const rows = [0,1,2,3].map(r=>eleven.map((p,i)=>({...p,i})).filter(p=>p.r===r));
    pyr.innerHTML = rows.map(row=>`<div class="pyr-row">${row.map(p=>`<button class="pyr-pick${p.r===3?' bass':''}" style="--i:${p.i}" data-i="${p.i}" aria-label="${p.n}"><img src="assets/img/picks/${p.img}.png" alt=""></button>`).join('')}</div>`).join('');
    const show = i => {
      const p = eleven[i];
      pyr.querySelectorAll('.pyr-pick').forEach(b=>b.classList.toggle('on', +b.dataset.i===i));
      pinfo.innerHTML = `<div class="fade-swap"><span class="num">${String(i+1).padStart(2,'0')} / 11</span><h3>${p.n}</h3><div class="spec">${p.t.toUpperCase()}</div><p>${p.d}</p></div>`;
    };
    pyr.addEventListener('click', e=>{ const b=e.target.closest('.pyr-pick'); if(b) show(+b.dataset.i); });
    pyr.addEventListener('mouseover', e=>{ const b=e.target.closest('.pyr-pick'); if(b && matchMedia('(hover:hover)').matches) show(+b.dataset.i); });
    show(0);
    const pio = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ pyr.classList.add('built'); pio.disconnect(); } }), {threshold:.3});
    pio.observe(pyr);
  }

  // ---------- gifts page: budget filter ----------
  const fl = document.querySelector('.filters'), grid = $('#giftGrid'), cnt = $('#giftCount');
  if(fl && grid){
    const apply = f => {
      let n = 0;
      grid.querySelectorAll('.card').forEach(c=>{ const on = f==='all' || c.dataset.tags.split(' ').includes(f); c.hidden = !on; if(on){ n++; c.classList.add('in'); } });
      fl.querySelectorAll('.chip').forEach(b=>b.setAttribute('aria-pressed', b.dataset.f===f));
      cnt.textContent = n + (n===1 ? ' gift' : ' gifts');
    };
    fl.addEventListener('click', e=>{ const b=e.target.closest('.chip'); if(b) apply(b.dataset.f); });
    apply('all');
  }
  // ---------- gifts page: delivery checker (Adam's FAQ times) ----------
  const reg = $('#region'), out = $('#arriveOut');
  if(reg && out){
    const draw = () => {
      if(reg.value==='us'){
        out.innerHTML = '<div class="days">Tracked<small>USPS Ground Advantage</small></div><p>US orders ship from Calgary with tracking: a flat $7 USD, free over $40 USD. Your estimated delivery date is in the shipping email.</p>';
        return;
      }
      const [a,b] = reg.value.split(',').map(Number);
      const lo = a+1, hi = b+2;
      out.innerHTML = `<div class="days">${lo}–${hi}<small>business days from your order</small></div>
        <div class="timeline" aria-hidden="true">${'<i class="ship"></i>'.repeat(2)}${'<i class="post"></i>'.repeat(b)}</div>
        <div class="timeline-key"><span><b style="background:var(--kraft-deep)"></b>Packed in Calgary (1–2 days)</span><span><b style="background:var(--moss)"></b>Free mail (${a}–${b} days)</span></div>
        <p>Cutting it close? Choose paid shipping at checkout for tracking.</p>`;
    };
    reg.addEventListener('change', draw); draw();
  }

  // product gallery
  const main = $('#galMain');
  if(main){
    document.querySelectorAll('.thumb').forEach(t=>t.addEventListener('click', ()=>{
      document.querySelectorAll('.thumb').forEach(x=>x.setAttribute('aria-current', x===t));
      main.src = t.dataset.src; main.alt = t.querySelector('img').alt;
      $('#galAi').style.display = t.hasAttribute('data-ai') ? '' : 'none';
    }));
  }
  // quantity + gift box
  const qty = $('#qty');
  document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click', ()=>{
    qty.value = Math.max(1, (+qty.value||1) + (+b.dataset.step)); updateTotal();
  }));
  const gb = $('#giftBox');
  function updateTotal(){
    const t = $('#btnTotal'); if(!t) return;
    const v = 39.99*(+qty.value||1) + (gb && gb.checked ? 4.99 : 0);
    t.textContent = '$' + v.toFixed(2);
  }
  if(gb) gb.addEventListener('change', updateTotal);
  // sticky buy bar
  const sticky = $('#stickyBuy'), buyBox = $('#buyBox');
  if(sticky && buyBox){
    new IntersectionObserver(([en])=>sticky.classList.toggle('on', !en.isIntersecting && en.boundingClientRect.top < 0)).observe(buyBox);
  }
})();
