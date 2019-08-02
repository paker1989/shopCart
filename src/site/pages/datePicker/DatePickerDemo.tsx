import * as React from 'react';
import MarkdownRender from '../../utils/MarkdownRender';
import { DatePicker } from '../../../components/datePicker';
import DemoCodeRender from '../../utils/DemoCodeRender/DemoCodeRender';

import { ICommonPageProps, ICommonPageStates } from '../types';

// export interface IDatePickerDemoProps extends ICommonPageProps {
// }

let md_democode = ``;

class DatePickerDemo extends React.Component<ICommonPageProps, ICommonPageStates> {
  constructor(props) {
    super(props);
    this.state = {
        mdDescription: 'placeholder'
    }
  }

  render() {
    const { mdDescription } = this.state;

    return (
      <React.Fragment>
        <MarkdownRender source={mdDescription}/>
        <DemoCodeRender source={md_democode} title="Date picker展示">
           <DatePicker />
        </DemoCodeRender>
      </React.Fragment>
    );
  }
}

export default DatePickerDemo;