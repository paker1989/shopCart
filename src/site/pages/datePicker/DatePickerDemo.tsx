import * as React from 'react';
import MarkdownRender from '../../utils/MarkdownRender';
import { DatePicker } from '../../../components/datePicker';
import DemoCodeRender from '../../utils/DemoCodeRender/DemoCodeRender';

import { ICommonPageProps, ICommonPageStates } from '../types';

export interface IDatePickerDemoStats extends ICommonPageStates {
  value?: string | Date;
}

let md_democode = ``;

class DatePickerDemo extends React.Component<ICommonPageProps, IDatePickerDemoStats> {
  constructor(props) {
    super(props);
    this.state = {
      mdDescription: 'placeholder',
      value: new Date('2019-08-31')
    }
  }

  handleOnChange = (newDate: Date): void => {
    this.setState({
      value: newDate
    })
  }

  render() {
    const { mdDescription, value } = this.state;

    return (
      <React.Fragment>
        <MarkdownRender source={mdDescription} />
        <DemoCodeRender source={md_democode} title="Date picker展示">
          <DatePicker value={value} onChange={this.handleOnChange} />
          <br/>
          <DatePicker value={value} isPopover={false} onChange={this.handleOnChange} format="YYYY/MM/DD" />
        </DemoCodeRender>
      </React.Fragment>
    );
  }
}

export default DatePickerDemo;