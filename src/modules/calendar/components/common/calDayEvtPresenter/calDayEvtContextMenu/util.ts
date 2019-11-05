import getPositionnedParent from '../../../../../../_packages_/utils/getPositionnedParent';
import Placement from '../../../../../../_packages_/components/popover/placement';

function wrapperDimension(boundingBox) {
    if (!boundingBox) {
        return {};
    }
    const { top, left, right, bottom } = boundingBox;
    const width = boundingBox.right - boundingBox.left;
    const height = boundingBox.bottom - boundingBox.top;
    return { top, left, right, bottom, width, height };
}

export function getPosition(
    x: string | number,
    y: string | number,
    self: HTMLDivElement
) {
    const triggerBox = {
        left: x,
        right: Number(x) + 1,
        top: y,
        bottom: Number(y) + 1,
        width: 1,
        height: 1,
    };

    const wrappedContentBox = wrapperDimension(self.getBoundingClientRect());
    const positionnedParent = getPositionnedParent(self, false);
    const parentBoundingBox = wrapperDimension(
        positionnedParent.getBoundingClientRect()
    );

    // console.log(triggerBox);
    // console.log(wrappedContentBox);
    // console.log(parentBoundingBox);
    return Placement.autoBottomLeft(
        triggerBox,
        wrappedContentBox,
        parentBoundingBox,
        { cushion: 0 }
    );
}
