import React from 'react';
import MarkdownRender from '../../components/common/MarkdownRender';
import DemoCodeRender from '../../components/common/DemoCodeRender';

import Steps from '../../../../_packages_/components/steps';

import axios from 'axios';

import '../../style/index.scss';

const md_democode = 
`                    
    <Steps current={current} status={status}>
    <Steps.Step title="第一步" description="打开冰箱门" />
    <Steps.Step title="第二步" description="把大象放进去" />
    <Steps.Step title="第三步" description="关上冰箱门" />
    </Steps>
    <button className="bxu-btn" style={{ margin: '10px 0 0 30px' }} onClick={this.nextStep}>下一步</button>
`;

class StepDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mdDescription: '',
            input: '',
            current: 1,
            status: 'process'
        }
    }

    nextStep = () => {
        let { current, status } = this.state;
        if (current === 3 && status === 'process') {
            status = 'finish';
        } else {
            current++;
            if (current > 3) {
                current = current % 3;
            }
            status = 'process';
        }

        this.setState({
            current,
            status
        });
    }

    onStepChange = (id) => {
        this.setState({
            current: id
        });
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
        const { mdDescription, current, status } = this.state;
        return (
            <React.Fragment>
                <MarkdownRender source={mdDescription} />
                <DemoCodeRender source={md_democode} title="设置一个水平方向的基本step">
                    <Steps current={current} status={status}>
                        <Steps.Step title="第一步" description="打开冰箱门" />
                        <Steps.Step title="第二步" description="把大象放进去" />
                        <Steps.Step title="第三步" description="关上冰箱门" />
                    </Steps>
                    <button className="bxu-btn" style={{ margin: '10px 0 0 30px' }} onClick={this.nextStep}>下一步</button>
                </DemoCodeRender>
            </React.Fragment>
        );
    }
}

export default StepDemo;