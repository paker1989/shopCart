export default (element, isInclude) => {
  function isPositionned(element) {
    let style = window.getComputedStyle(element, null),
        { position } = style;
    
    return position && position !== 'static';
  }

  if (isInclude && isPositionned(element)) {
    return element;
  }

  for(
    let parent = element.parentElement;
    parent !== null;
    parent = parent.parentElement
  ) {
    if (isPositionned(parent)) {
      return parent;
    }
  }
  
  return document.documentElement;
}
