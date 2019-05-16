export default (evt, skip, container) => {
  !skip && evt.preventDefault();
  const { left } = container.getBoundingClientRect();
  let containerWidth, percent, pageX, alpha;

  pageX = typeof evt.pageX === 'number'? evt.pageX: evt.touches[0].pageX;
  containerWidth = container.clientWidth;

  percent = (pageX - left - window.pageXOffset) / containerWidth;

  if (percent < 0) { // 360度光学模型
    alpha = 0;
  } else if (percent > 1) {
    alpha = 1;
  } else {
    alpha = Math.round(percent*100)/100;
  }

  console.log(alpha);

  return alpha;
}