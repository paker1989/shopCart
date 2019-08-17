export default (
  triggerBoundingBox,
  contentBoundingBox,
  parentBoundingBox,
  options
) => {
  const top = triggerBoundingBox.top - contentBoundingBox.height - options.cushion
              - parentBoundingBox.top,
        left = triggerBoundingBox.left - options.cushion
               - contentBoundingBox.width + triggerBoundingBox.width - parentBoundingBox.left;

  return {
    position: 'absolute',
    top: `${Math.round(top)}px`,
    left: `${Math.round(left)}px`,
  }
}