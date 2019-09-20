import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { locales } from '../../../utils/i18nProvider';
import { getPath } from '../../../utils/routeHelper';
import Popover from '../../../../../_packages_/components/popover';

import './langPicker.scss';

const mapStateToProps = state => ({
    currentDate: state.dateReducers.currentDate,
});

class LangPicker extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        };
    }

    onVisibleChange = (isVisible: boolean): void => {
        this.setState({ isVisible });
    };

    /**
     * @description just to remind componnts to update
     */
    changeLocale = (locale: string) => {
        const { history, currentDate, match } = this.props;
        if (match.params.lang === locale) {
            return;
        }
        const to = getPath(
            currentDate,
            Object.assign({}, match.params, { lang: locale })
        );
        history.push(to);
    };

    render() {
        const { isVisible } = this.state;
        const { lang } = this.props.match.params;

        return (
            <div className="header-langPicker-container">
                <Popover
                    position={Popover.Placement.autoBottomMiddle}
                    verCushion={5}
                    isVisible={isVisible}
                    onVisibleChange={this.onVisibleChange}
                >
                    <Popover.Trigger.ClickTrigger>
                        <div
                            role="button"
                            className="btn header-langPicker-container__trigger no-select"
                        >
                            <span className="no-select">
                                {
                                    locales.find(local => local.code === lang)
                                        .label
                                }
                            </span>
                        </div>
                    </Popover.Trigger.ClickTrigger>
                    <Popover.Content>
                        <div className="header-langPicker-container__content">
                            <div className="header-angPicker-container-options">
                                {locales.map((local, index) => (
                                    <div
                                        className="item-wrapper"
                                        key={`local-option-${index}`}
                                        onClick={() => {
                                            this.changeLocale(local.code);
                                        }}
                                    >
                                        <span className="item-title font-layout-option no-select">
                                            {local.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popover.Content>
                </Popover>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(LangPicker));
