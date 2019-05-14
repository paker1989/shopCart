export default (evt, skip, container) => {
  !skip && evt.preventDefault();
  const { left } = container.getBoundingClientRect();
  let containerWidth, percent, pageX, h;

  pageX = typeof evt.pageX === 'number'? evt.pageX: evt.touches[0].pageX;
  containerWidth = container.clientWidth;

  percent = (pageX - left - window.pageXOffset) / containerWidth;

  if (percent < 0) { // 360度光学模型
    h = 0;
  } else if (percent > 1) {
    h = 359;
  } else {
    h = parseInt(percent * 360);
  }

  return h;
}