import * as React from 'react';
import CalConfig from '../../../../../assets/scripts/calendar.config';

import './simpleColorPicker.scss';

export interface ISimpleColorPickerProps {
    selectedColor?: string;
    onChange: (color: string) => void;
}

const SimpleColorPicker = (props: ISimpleColorPickerProps) => {
    const presetColors = CalConfig.presetColors;
    const { selectedColor, onChange } = props;
    return (
        <div className="simple-color-picker">
            {presetColors.map((color, index) => (
                <div
                    key={`presetColor-${index}`}
                    className="color-wrapper"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                        onChange(color);
                    }}
                >
                    {selectedColor === color && (
                        <span className="selected-color">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-done"></use>
                            </svg>
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SimpleColorPicker;
