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
};

export default (
    triggerBoundingBox,
    contentBoundingBox,
    parentBoundingBox,
    options
) => {
    // debugger;
    let viewportSize = getViewportSize(),
        nearRight,
        nearLeft,
        nearBottom,
        nearTop,
        vertDimension,
        horDimension;

    const horCushion = options.horCushion || options.cushion;
    const verCushion = options.verCushion || options.cushion;

    nearRight =
        viewportSize.width -
        (triggerBoundingBox.left + horCushion + contentBoundingBox.width);
    nearLeft =
        triggerBoundingBox.left -
        (horCushion + contentBoundingBox.width - triggerBoundingBox.width);
    nearBottom =
        viewportSize.height -
        (triggerBoundingBox.bottom + verCushion + contentBoundingBox.height);
    nearTop = triggerBoundingBox.top - (verCushion + contentBoundingBox.height);

    vertDimension = nearBottom < 0 && nearTop > 0 ? 'top' : 'bottom';
    horDimension = nearRight < 0 && nearLeft > 0 ? 'Right' : 'Left';

    return placementMap[`${vertDimension}${horDimension}`](
        triggerBoundingBox,
        contentBoundingBox,
        parentBoundingBox,
        options
    );
};
