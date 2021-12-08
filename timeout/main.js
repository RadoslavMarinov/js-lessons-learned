function foo(t) {
  if (--t <= 0) return;
  setTimeout(cb, 500, t);
}

function cb(t) {
  foo(t);
}

foo(50);
