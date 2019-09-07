import * as React from 'react';

import CalInput from '../../../../common/calInput';

import './activityDefiner.scss';

const _test_add_location_placeholder = '添加一个有意思的地点';
const _test_add_comment_placeholder = '添加一个暖心的说明';

class ActivityDefiner extends React.Component<any, any> {
    render() {
        return (
            <div className="calActivity-definer-container">
                <div className="calActivity-definer-container__option">
                    <span className="calActivity-definer-container__icon">
                        <svg className="ali-icon" aria-hidden="true">
                            <use xlinkHref="#icon-time-circle"></use>
                        </svg>
                    </span>
                </div>
                <div className="calActivity-definer-container__option">
                    <span className="calActivity-definer-container__icon">
                        <svg className="ali-icon" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                        </svg>
                    </span>
                    <span className="calActivity-definer-container__option--main">
                        <CalInput
                            className="calActivity-definer-container__input"
                            placeholder={_test_add_location_placeholder}
                        />
                    </span>
                </div>
                <div className="calActivity-definer-container__option--comment">
                  <div className="calActivity-definer-container__option">
                      <span className="calActivity-definer-container__icon">
                          <svg className="ali-icon" aria-hidden="true">
                              <use xlinkHref="#icon-unorderedlist"></use>
                          </svg>
                      </span>
                      <span className="calActivity-definer-container__option--main">
                          <CalInput
                              className="calActivity-definer-container__input"
                              placeholder={_test_add_comment_placeholder}
                          />
                      </span>
                  </div>
                </div>
            </div>
        );
    }
}

export default ActivityDefiner;
