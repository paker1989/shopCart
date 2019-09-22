import Trigger from './trigger';
import { cpus } from 'os';

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