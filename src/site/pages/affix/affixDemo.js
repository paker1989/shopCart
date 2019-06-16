import React from 'react';
import MarkdownRender from '../../utils/MarkdownRender';
import Affix from '../../../components/affix';
import DemoCodeRender from '../../utils/DemoCodeRender/DemoCodeRender';
import axios from 'axios';

const md_democode = 
  `
  \`\`\`javascript
  import { Affix, Alert } from 'shopCart';

  class App extends React.Component {

    state = {
      text: '{i18n.affix}'
    }

    onPin = () => {
      this.setState({ text: '{i18n.finishText}' });
    }
    onUnpin = () => {
      this.setState({ text: '{i18n.cancalText}' });
    }

    render() {
      return (
        <Affix offsetTop={200} onPin={this.onPin} onUnpin={this.onUnpin}>
            <Alert type="warning">{this.state.text}</Alert>
        </Affix>
      )
    }
  }
  \`\`\` 
  `;

class AffixDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mdDescription: '',
    }
  }
  componentDidMount() {
    const { match } = this.props;

    axios
      .post(match.path)
      .then((res) => {
        const { err, mds } = res.data;
        if (err) {
          console.log(err.message); // to handle
        } else {
          this.setState({ mdDescription: mds });
        };
      })
      .catch((err) => {
        console.log('something is going wrong!!');
        console.log(err);
      })
  }

  render() {
    const { mdDescription } = this.state;
    return (
      <React.Fragment>
        <MarkdownRender source={mdDescription}/>
        <DemoCodeRender source={md_democode} title="设置offsetTop来设置到顶部距离">
            <Affix offsetTop={100} placeHoldClassName="marginStyle">
              <button className="bxu-btn btn-affix">固钉</button>
            </Affix>
        </DemoCodeRender>
      </React.Fragment>
    );
  }
}

export default AffixDemo;