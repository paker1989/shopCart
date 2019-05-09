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
    top: `${Math.round(top)}px`,
    left: `${Math.round(right)}px`,
  }
}