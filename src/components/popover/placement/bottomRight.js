export default (
  triggerBoundingBox,
  contentBoundingBox,
  parentBoundingBox,
  options
) => {
  const top = triggerBoundingBox.bottom + options.cushion - parentBoundingBox.top,
        right = triggerBoundingBox.right + options.cushion - parentBoundingBox.left;
  
  return {
    position: 'absolute',
    top: `${top}px`,
    left: `${right}px`,
  }
}