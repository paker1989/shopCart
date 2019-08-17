export default function deselectRange() {
  let selection,
      rangeCount,
      ranges = [],
      activeElement,
      i;

  selection = document.getSelection();
  rangeCount = selection.rangeCount;

  for (i=0; i < rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  activeElement = document.activeElement;
  const activeTagName = activeElement.tagName.toUpperCase();

  switch(activeTagName) {
    case 'TEXTAREA':
    case 'TEXT':
      activeElement.blur();
      break;
    default:
      activeElement = null;
      break;
  }

  selection.removeAllRanges();

  return function() {
    selection.type === 'Caret' && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(range => {
        selection.addRange(range);
      });
    }

    activeElement && activeElement.focus();
  }
}