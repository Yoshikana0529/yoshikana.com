// Fade images in once they have loaded.
document.querySelectorAll('img.fade').forEach(function (img) {
  function done() { img.classList.add('is-loaded'); }
  if (img.complete && img.naturalWidth) done();
  else { img.addEventListener('load', done); img.addEventListener('error', done); }
});

// Header turns solid after the opening video.
var opening = document.querySelector('.opening');
function onScroll() {
  var h = opening ? opening.offsetHeight : 0;
  document.body.classList.toggle('scrolled', window.scrollY > h - 60);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
var video = document.querySelector('.opening video');
if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();

// LEARN MORE opens the details under each work.
function setOpen(work, open) {
  var btn = work.querySelector('.learn');
  work.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.textContent = open ? 'Close' : 'Learn more';
  if (open) {
    // load the detail photos right away
    work.querySelectorAll('.work-detail img[loading="lazy"]').forEach(function (i) { i.loading = 'eager'; });
  }
  // clips play only while their panel is open
  work.querySelectorAll('.work-detail video').forEach(function (v) {
    if (open) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    else v.pause();
  });
}
document.querySelectorAll('.work .learn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var work = btn.closest('.work');
    setOpen(work, !work.classList.contains('open'));
  });
});

// Index rows scroll to the work and open it.
document.querySelectorAll('[data-open]').forEach(function (a) {
  a.addEventListener('click', function () {
    var work = document.getElementById(a.getAttribute('data-open'));
    if (work) setOpen(work, true);
  });
});

// Coming back to the tab: resume clips in open panels.
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState !== 'visible') return;
  document.querySelectorAll('.work.open .work-detail video').forEach(function (v) {
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  });
});

// Portrait in INFO: shown on hover; on touch screens a tap toggles it.
var portrait = document.querySelector('.portrait');
if (portrait) portrait.addEventListener('click', function () { portrait.classList.toggle('show'); });
