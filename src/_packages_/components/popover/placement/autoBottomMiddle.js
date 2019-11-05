import getViewportSize from '../../../utils/getViewportSize';
import bottomRight from './bottomRight';
import bottomLeft from './bottomLeft';
import topLeft from './topLeft';
import topRight from './topRight';
import bottomMiddle from './bottomMiddle';
import topMiddle from './topMiddle';

const placementMap = {
    bottomRight,
    bottomLeft,
    topLeft,
    topRight,
    bottomMiddle,
    topMiddle,
};

export default (
    triggerBoundingBox,
    contentBoundingBox,
    parentBoundingBox,
    options
) => {
    let viewportSize = getViewportSize(),
        middleNearRight,
        middleNearLeft,
        nearRight,
        nearLeft,
        nearBottom,
        nearTop,
        vertDimension,
        horDimension;
    
    debugger;

    const horCushion = options.horCushion || options.cushion;
    const verCushion = options.verCushion || options.cushion;

    middleNearRight =
        viewportSize.width -
        (triggerBoundingBox.left + contentBoundingBox.width) +
        (contentBoundingBox.width - triggerBoundingBox.width) / 2;

    nearRight =
        viewportSize.width -
        (triggerBoundingBox.left + horCushion + contentBoundingBox.width);

    nearLeft =
        triggerBoundingBox.left -
        (horCushion + contentBoundingBox.width - triggerBoundingBox.width);

    middleNearLeft =
        triggerBoundingBox.left -
        (contentBoundingBox.width - triggerBoundingBox.width) +
        (contentBoundingBox.width - triggerBoundingBox.width) / 2;

    nearBottom =
        viewportSize.height -
        (triggerBoundingBox.bottom + verCushion + contentBoundingBox.height);

    nearTop = triggerBoundingBox.top - (verCushion + contentBoundingBox.height);

    //define dimension direction
    vertDimension = nearBottom < 0 && nearTop > 0 ? 'top' : 'bottom';

    if (
        (middleNearRight < 0 || middleNearLeft < 0) &&
        (nearRight >= 0 || nearLeft >= 0)
    ) {
        horDimension = nearRight < 0 && nearLeft > 0 ? 'Right' : 'Left';
    } else {
        horDimension = 'Middle';
    }

    // console.log(`${vertDimension}${horDimension}`);
    return placementMap[`${vertDimension}${horDimension}`](
        triggerBoundingBox,
        contentBoundingBox,
        parentBoundingBox,
        options
    );
};
