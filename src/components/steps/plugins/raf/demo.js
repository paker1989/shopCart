import { requestAnimationFrame, cancelAnimationFrame } from './index';

function animation() {
  const entry = find(callbackList, (item) => item.callback === cancalanimation);
  if (entry) {
    cancelAnimationFrame(entry.requestId);
  }

  let element = document.getElementById('root');
  let computedStyle = getComputedStyle(element);

  element.style.width = parseInt(computedStyle.width) + 1 + 'px';

  if (parseInt(element.style.width) < 200) {
    requestAnimationFrame(animation);
  }
}


function cancalanimation() {
  const entry = find(callbackList, (item) => item.callback === animation);
  if (entry) {
    cancelAnimationFrame(entry.requestId);
  }

  let element = document.getElementById('root');
  let computedStyle = getComputedStyle(element);


  element.style.width = parseInt(computedStyle.width) - 1 + 'px';

  if (parseInt(element.style.width) > 100) {
    requestAnimationFrame(cancalanimation);
  }
}

let element = document.getElementById('root');

element.addEventListener('mouseover', animation);
element.addEventListener('mouseleave', cancalanimation);