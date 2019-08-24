export default function getTimelineLabels(isShow24hours: boolean): Array<string> {
  const hourLabels: Array<string> = [];

  for (let i = 1; i <= 23; i++) {
    let showHour = (isShow24hours || i <= 12) ? i: (i - 12);
    let prefixLabel = isShow24hours ? "": i<=12? "上午": "下午";
    hourLabels.push(`${prefixLabel}${showHour}点`);
  }

  return hourLabels;
}