import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Modal from '../modal';
import UploadPanel from './components/UploadPanel/UploadPanel';
import FileInput from './components/FileInput';

import './Upload.scss';


class Upload extends React.Component {
    static propTypes = {
        prefix: PropTypes.string,
        withoutModal: PropTypes.bool, // 直接渲染，不通过popup
        localOnly: PropTypes.bool,
        maxSize: PropTypes.number,
        maxAmount: PropTypes.number,
        tips: PropTypes.string,
        type: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    }

    static defaultProps = {
        prefix: 'bxu',
        withoutModal: false,
        localOnly: false,
        type: ['image', 'text'],
        maxAmount: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    showUpload = () => {
        this.setState({
            visible: true
        });
    }

    onCloseModal = () => {
        this.setState({ visible: false });
    }

    render() {
        const {
            prefix,
            className,
            withoutModal,
            tips,
            children,
            ...otherProps
        } = this.props;

        const { visible } = this.state;

        const wrapperClass = cx({
            [`${prefix}-upload-wrapper`]: true,
        }, className);

        return (
            <div className={wrapperClass}>
                {withoutModal ? (
                    <div className={`${prefix}-uploadpanel-layer`}>
                        {<UploadPanel
                            prefix={prefix}
                            {...otherProps}
                        />}
                    </div>
                ) : (
                        <div className={`${prefix}-upload-modal-container`}>
                            <span
                                className={`${prefix}-upload-trigger-container`}
                                onClick={this.showUpload}>
                                {children || <span className={`${prefix}-upload-default-trigger`}>+</span>}
                            </span>  {/* upload panel trigger */}
                            <p className={`${prefix}-upload-tips`}>{tips}</p>
                            <Modal
                                visible={visible}
                                contentClass={`${prefix}-uploadpanel-layer`}
                                onClose={this.onCloseModal}>
                                <UploadPanel
                                    prefix={prefix}
                                    onClose={this.onCloseModal}
                                    {...otherProps} />
                            </Modal>
                        </div>
                    )}
            </div>
        );
    }
}

Upload.FileInput = FileInput;

export default Upload;