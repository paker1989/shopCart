import getViewportSize from '../../../../../_packages_/utils/getViewportSize';
import { CalendarNS } from '../../../utils/types';

/**
 * @description for single day layout
 */
export default (
    definer: ClientRect | DOMRect,
    ref: ClientRect | DOMRect,
    options?: CalendarNS.ICalPopoverPositionProps
) => {
    const viewportSize = getViewportSize();
    const left = (viewportSize.width - definer.width) / 2; // defined left
    let height;
    let _bottomCurshion_ = options.bottomCurshion || 0;
    const isCompressDefinerHeight =
        viewportSize.height - _bottomCurshion_ < definer.height;

    if (isCompressDefinerHeight) {
        height = viewportSize.height - _bottomCurshion_ * 2;
        return { left, height, bottom: _bottomCurshion_ };
    } else {
        return { left, bottom: (viewportSize.height - definer.height) / 2 };
    }
};
