import getViewportSize from '../../../../../_packages_/utils/getViewportSize';
import autoMiddle from './autoMiddle';
import { CalendarNS } from '../../../utils/types';

/**
 * @description for single day layout
 */
export default (
    definer: ClientRect | DOMRect,
    ref: ClientRect | DOMRect,
    options?: CalendarNS.ICalEventInitOptions
) => {
    console.log(JSON.stringify(ref));
    
    const { asideCurshion } = options;
    const viewportSize = getViewportSize();
    const { top, height, left } = autoMiddle(definer, ref, options);
    let _asideCurshion = asideCurshion || 0;
    let _left: number;

    const nearLeft = ref.left - definer.width - _asideCurshion;
    const nearRight =
        viewportSize.width - ref.right - definer.width - _asideCurshion;
    if (nearLeft < 0 && nearRight < 0) {
        _left = left;
    } else {
        if (nearLeft > nearRight) {
            _left = nearLeft;
        } else {
            _left = ref.right + _asideCurshion;
        }
    }
    return { top, left: _left, height };
};
