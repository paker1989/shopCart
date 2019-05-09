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
      nearBottom,
      vertAxe,
      horAxe;

  nearRight = viewportSize.width - (triggerBoundingBox.left + options.cushion + 
    contentBoundingBox.width);
  nearBottom = viewportSize.height - (triggerBoundingBox.bottom + options.cushion
    + contentBoundingBox.height);
  
  vertAxe = nearBottom > 0? 'bottom': 'top';
  horAxe = nearRight > 0? 'Left': 'Right';

  return placementMap[`${vertAxe}${horAxe}`](
    triggerBoundingBox,
    contentBoundingBox,
    parentBoundingBox,
    options);
}