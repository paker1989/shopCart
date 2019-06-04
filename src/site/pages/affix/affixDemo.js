import React from 'react';
import MarkdownRender from '../../util/MarkdownRender';
import Affix from '../../../components/affix';

const demoMarkDown = 
  `
  ## Affix 固钉
  
  将元素固定在特定区域，一般用于导航栏固钉。
  
  ### API
  
  | 参数 | 说明 | 类型 | 默认值 | 备选值 |
  |------|------|------|--------|--------|
  | offsetTop | 距离窗口顶部指定偏移量后触发 | number | 0 | '' |
  | offsetBottom | 距离窗口底部指定偏移量后触发 | number | null | null |
  | onPin | 触发固定后执行的回调函数 | function | null | null |
  | onUnpin | 固定消失后执行的回调函数 | function | null | null |
  | zIndex | 固钉的z-index | number | 10 | null |
  | className | 自定义额外类名  | string | \`''\`       |                                   |
  | placeHoldClassName | 占位容器的类名  | string | \`''\`       |                                   |
  | prefix    | 自定义前缀    | string | \`'zent'\`   |                                   |
  
  如果 \`offsetTop\` 和 \`offsetBottom\` 同时设置，优先使用 \`offsetBottom\`  

  \`\`\`javascript
import { Affix, Alert } from 'zent';

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
  render() {
    return (
      <React.Fragment>
        <Affix offsetTop={100} placeHoldClassName="marginStyle">
          <button className="bxu-btn btn-affix">固钉</button>
        </Affix>
        <MarkdownRender source={demoMarkDown}/>
      </React.Fragment>
    );
  }
}

export default AffixDemo;