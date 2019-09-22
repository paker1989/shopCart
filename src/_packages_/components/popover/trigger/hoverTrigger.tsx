import Trigger from './trigger';

class HoverTrigger extends Trigger {
    onTriggerProps() {
        return {
            onMouseEnter: () => {
                this.props.open();
            },
            onMouseLeave: () => {
                this.props.close();
            },
        };
    }
}

export default HoverTrigger;
