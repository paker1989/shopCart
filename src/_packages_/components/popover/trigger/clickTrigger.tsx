import Trigger from './trigger';

class ClickTrigger extends Trigger {
    onTriggerProps() {
        return {
            onClick: () => {
                if (this.props.contentVisible) {
                    this.props.close();
                } else {
                    this.props.open();
                }
            },
        };
    }

    bindEventHandler() {
        const { contentVisible } = this.props;

        if (contentVisible) {
            window.addEventListener('click', this.handleClickOutSide);
        } else {
            window.removeEventListener('click', this.handleClickOutSide);
        }
    }

    handleClickOutSide = (evt) => {
        const { isMouseEvtOutSide, close } = this.props;
        if (isMouseEvtOutSide(evt)) {
            close();
        }
    }

    componentDidMount() {
        this.bindEventHandler();
    }

    componentDidUpdate() {
        this.bindEventHandler();
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutSide);
    }
}

export default ClickTrigger;
