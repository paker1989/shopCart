import * as React from 'react';
import { connect } from 'react-redux';

import { locales } from '../../../utils/i18nProvider';
import * as LayoutActionCreator from '../../../store/action/layoutAction';
import Popover from '../../../../../_packages_/components/popover';

import './langPicker.scss';

const mapStateToProps = state => ({
    locale: state.layoutReducers.locale,
});

const mapDispatchToProps = dispatch => ({
    changeLang: locale => dispatch(LayoutActionCreator.changeLang(locale)),
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

    render() {
        const { isVisible } = this.state;
        const { changeLang, locale } = this.props;

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
                                    locales.find(local => local.code === locale)
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
                                            changeLang(local.code);
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LangPicker);
