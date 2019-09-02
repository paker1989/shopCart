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
            window.addEventListener('click', this.props.isClickOutSide);
        } else {
            window.removeEventListener('click', this.props.isClickOutSide);
        }
    }

    componentDidMount() {
        this.bindEventHandler();
    }

    componentDidUpdate() {
        this.bindEventHandler();
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.props.isClickOutSide);
    }
}

export default ClickTrigger;
