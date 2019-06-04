---
order: 2
zh-CN:
	title: 设置回调函数
	index: 首页
	affix: 固钉
	finishText: 已经固定啦
	cancalText: 取消固定啦
en-US:
	title: Set callback function
	index: Index
	affix: Affix
	finishText: fixed
	cancalText: cancal fix

---


```jsx
import Affix from '../../components/affix';
// import Affix from '../components/affix';

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
			<Affix offsetTop={100} placeHoldClassName="marginStyle">
				<button className="bxu-btn btn-affix">固钉</button>
			</Affix>
		)
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
