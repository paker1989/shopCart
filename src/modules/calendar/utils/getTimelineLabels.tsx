import * as React from 'react';
import { FormattedTime } from 'react-intl';

export default function getTimelineLabels(isShow12hours: boolean): Array<any> {
  const now = new Date();
  const hourLabels: Array<any> = [];
  for (let i = 1; i <= 23; i++) {
    let date = new Date(now);
    date.setHours(i);
    hourLabels.push(<FormattedTime value={date} hour12={true} hour="numeric"/>);
  }

  return hourLabels;
}