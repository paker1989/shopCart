import * as React from 'react';
import './skillCard.scss';


export interface ISkillCardProps {
  nm: string;
  level: number;
  color: string;
}

const SkillCard = (props: ISkillCardProps) => {
  const { nm, level, color } = props;
  const progressbarWidth = `${(level) * 100}%`;
  return (
    <div className="skill-card">
        <span className="skill-title">{nm}</span>
        <div className="level-progressbar" style={{backgroundColor: color, width: progressbarWidth}}>
        </div>
    </div>
  );
}

export default SkillCard;
