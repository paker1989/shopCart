export default function (evt, skip, container) {
  !skip && evt.preventDefault();
  
  const { left, right, top, bottom } = container.getBoundingClientRect();

  let pageX = typeof evt.pageX === 'number'? evt.pageX: evt.touches[0].pageX,
      pageY = typeof evt.pageY === 'number'? evt.pageY: evt.touches[0].pageY,
      l = (pageX - left) / (right - left),
      t = (pageY - top) / (bottom - top);
  
  if (l < 0 ||l > 1) {
    l = 1;
  } 
  if (t < 0 ||t > 1) {
    t = 1;
  }

  return {
    left: l,
    top: t,
  }
}