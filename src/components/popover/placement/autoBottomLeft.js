import getViewportSize from '../../../utils/getViewportSize';
import bottomRight from './bottomRight';
import bottomLeft from './bottomLeft';
import topLeft from './topLeft';
import topRight from './topRight';

const placementMap = {
  bottomRight,
  bottomLeft,
  topLeft,
  topRight,
}

export default (
  triggerBoundingBox,
  contentBoundingBox,
  parentBoundingBox,
  options
) => {
  let viewportSize = getViewportSize(),
      nearRight,
      nearLeft,
      nearBottom,
      nearTop,
      vertDimension,
      horDimension;

  nearRight = viewportSize.width - (triggerBoundingBox.left + options.cushion + 
    contentBoundingBox.width);
  nearLeft = triggerBoundingBox.left - (options.cushion + contentBoundingBox.width);
  nearBottom = viewportSize.height - (triggerBoundingBox.bottom + options.cushion
    + contentBoundingBox.height);
  nearTop = triggerBoundingBox.top - (options.cushion + contentBoundingBox.height);
  
  vertDimension = nearBottom < 0 && nearTop > 0? 'top': 'bottom';
  horDimension = nearRight < 0 && nearLeft > 0? 'Right': 'Left';

  return placementMap[`${vertDimension}${horDimension}`](
    triggerBoundingBox,
    contentBoundingBox,
    parentBoundingBox,
    options);
}