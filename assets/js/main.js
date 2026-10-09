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
