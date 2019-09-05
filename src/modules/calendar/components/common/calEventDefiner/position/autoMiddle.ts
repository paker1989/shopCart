import getViewportSize from '../../../../../../_packages_/utils/getViewportSize';
import { CalendarNS } from '../../../../utils/types';
/**
 * @description for day
 */
export default (
    definer: ClientRect | DOMRect,
    ref: ClientRect | DOMRect,
    options?: CalendarNS.ICalEventInitOptions
) => {
    const { bottomCurshion } = options;
    const viewportSize = getViewportSize();
    const left = (viewportSize.width - definer.width) / 2;

    let top = ref.top;
    let _bottomCurshion_ = bottomCurshion || 0;

    const nearBottom =
        viewportSize.height - top - definer.height - _bottomCurshion_;
    
    if (nearBottom >= 0) {
        return {
            top,
            left
        }
    }

    // case: aligner ref不现实
    // 首先尝试保持bottom，看top是否


    console.log(nearBottom);
    return {
        top,
        left,
    };
};

// export default autoMiddle;
