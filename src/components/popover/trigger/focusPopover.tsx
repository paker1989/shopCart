import Trigger from './trigger';

class FocusTrigger extends Trigger {

  onTriggerProps() {
    return {
      onFocus: () => {
        this.props.open();
      },
      onBlur: () => {
        this.props.close();
      }
    }
  }

}

export default FocusTrigger;