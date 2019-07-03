import React from 'react';
import Icon from '../icon';

export default ({ width = 26, height = 26, ...props }) => {
    return (
        <Icon {...props}>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z"
                    fill="currentColor" fillRule="nonzero"></path>
            </svg>
        </Icon>
    )
}