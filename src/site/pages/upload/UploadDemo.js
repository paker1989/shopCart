import React from 'react';
import axios from 'axios';

import Upload from '../../../components/Upload';

class UploadDemo extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   const { match } = this.props;

  //   axios
  //     .post(match.path)
  //     .then((res) => {
  //       const { err, mds } = res.data;
  //       if (err) {
  //         console.log(err.message); // to handle
  //       } else {
  //         this.setState({ mdDescription: mds });
  //       };
  //     })
  //     .catch((err) => {
  //       console.log('something is going wrong!!');
  //       console.log(err);
  //     })
  // }

  render() {
    return (
      <React.Fragment>
        <Upload />
      </React.Fragment>
    );
  }
}

export default UploadDemo;