export default (
  triggerBoundingBox,
  contentBoundingBox,
  parentBoundingBox,
  options
) => {
  // const top = triggerBoundingBox.bottom + options.cushion - parentBoundingBox.top,
  //       right = triggerBoundingBox.right + options.cushion - parentBoundingBox.left;
  // let top, left;

  // 优先左下边
  const top = triggerBoundingBox.bottom + options.cushion - parentBoundingBox.top,
        left = triggerBoundingBox.left + options.cushion - parentBoundingBox.left;

  const 
  // 否则就右下

  // 否则左上

  // 否则右上

  return {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
  }
}