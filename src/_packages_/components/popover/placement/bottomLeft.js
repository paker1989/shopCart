export default (
  triggerBoundingBox,
  contentBoundingBox,
  parentBoundingBox,
  options
) => {
  const top = triggerBoundingBox.bottom + options.cushion - parentBoundingBox.top,
        left = triggerBoundingBox.left + options.cushion - parentBoundingBox.left;
  
  return {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
  }
}