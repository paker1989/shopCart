import * as React from 'react';
import MarkdownRender from '../../components/common/MarkdownRender';
import DemoCodeRender from '../../components/common/DemoCodeRender';
import { DatePicker } from '@component/datePicker';

import { ICommonPageProps, ICommonPageStates } from '../../utils/types';

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

  handleOnSelect = (newDate: Date): void => {
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
          <DatePicker value={value} onClick={this.handleOnSelect}  />
          <br/>
          <DatePicker value={value} isPopover={false} onClick={this.handleOnSelect} format="YYYY/MM/DD" />
        </DemoCodeRender>
      </React.Fragment>
    );
  }
}

export default DatePickerDemo;