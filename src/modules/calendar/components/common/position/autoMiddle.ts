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
    // debugger;
    const { bottomCurshion, topCurshion } = options;
    const viewportSize = getViewportSize();

    const left = (viewportSize.width - definer.width) / 2; // defined left

    let _bottomCurshion_ = bottomCurshion || 0;
    let _topCurshion_ = topCurshion || 0;
    let top = Math.max(ref.top, _topCurshion_);

    const nearBottom =
        viewportSize.height - top - definer.height - _bottomCurshion_;

    if (nearBottom >= 0) {
        return {
            top,
            left,
        };
    }

    let maxDefinerHeight = viewportSize.height - _bottomCurshion_ - _topCurshion_;
    if (maxDefinerHeight < 0) {
        maxDefinerHeight = 0;
    }
    const height = Math.min(maxDefinerHeight, definer.height);
    
    top = viewportSize.height - _bottomCurshion_  - height;

    return {
        top,
        height,
        left,
    };
};
