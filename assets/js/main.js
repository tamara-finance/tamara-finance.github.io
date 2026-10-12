(function(){
  // mobile menu
  var t=document.querySelector('.nav-toggle'), n=document.getElementById('site-nav');
  if(t&&n){
    t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});
    n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('open');t.setAttribute('aria-expanded','false')}});
  }
  // form: return to the thanks page on the current site (works before and after the domain switch)
  var next=document.querySelector('[data-next]');
  if(next){
    var base=(document.querySelector('link[rel=stylesheet][href*="assets/css"]')||{}).getAttribute?
      document.querySelector('link[rel=stylesheet][href*="assets/css"]').getAttribute('href').replace(/assets\/css\/style\.css.*$/,''):'/';
    next.value=location.origin+base+'thanks/';
  }
  // reveal on scroll
  var els=document.querySelectorAll('.service,.post-card,.testimonial,.about-photo,.about-text');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(el){el.classList.add('reveal');io.observe(el)});
  }
})();

// ---------- accessibility menu ----------
(function(){
  var root=document.documentElement, KEY='a11y-settings';
  var btn=document.querySelector('.a11y-btn'), panel=document.getElementById('a11y-panel');
  if(!btn||!panel) return;
  var state={scale:100,flags:{}};
  try{var saved=JSON.parse(localStorage.getItem(KEY)||'null'); if(saved) state=saved;}catch(e){}
  function apply(){
    root.style.fontSize=state.scale+'%';
    ['contrast','gray','links','font','noanim'].forEach(function(k){
      root.classList.toggle('a11y-'+k,!!state.flags[k]);
      var b=panel.querySelector('[data-a11y="'+k+'"]'); if(b) b.setAttribute('aria-pressed',state.flags[k]?'true':'false');
    });
    try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}
  }
  function toggle(open){panel.classList.toggle('open',open);btn.setAttribute('aria-expanded',open);if(open)panel.querySelector('button[data-a11y-font]').focus();}
  btn.addEventListener('click',function(){toggle(!panel.classList.contains('open'))});
  panel.querySelector('.a11y-close').addEventListener('click',function(){toggle(false);btn.focus()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('open')){toggle(false);btn.focus()}});
  panel.addEventListener('click',function(e){
    var t=e.target.closest('button'); if(!t) return;
    if(t.dataset.a11yFont){state.scale=Math.max(90,Math.min(150,state.scale+(t.dataset.a11yFont==='up'?10:-10)));}
    else if(t.dataset.a11y){var k=t.dataset.a11y;state.flags[k]=!state.flags[k];}
    else if(t.hasAttribute('data-a11y-reset')){state={scale:100,flags:{}};}
    apply();
  });
  apply();
})();
