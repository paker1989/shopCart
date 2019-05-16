import React from 'react';

import EditInput from './EditInput';

class SketchFileds extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${prefix}-sketchFields-container`}>
        <EditInput
          label="Hex"
        />
      </div>
    );
  }
}

export default SketchFileds;