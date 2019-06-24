import React from 'react';
import hljs from 'highlightjs';
import MarkdownRender from '../MarkdownRender';

import './democodeRender.scss';

class DemoCodeRender extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showCode: false };
        this.ref = React.createRef();
    }

    toggleCode = () => {
        const { showCode } = this.state;
        this.setState({ showCode: !showCode }, () => {
            if (this.state.showCode) {
                hljs.highlightBlock(this.ref.current.querySelector('.demo-code_hj'));
            }
        })
    }

    render() {
        const { title, source, children } = this.props;
        const { showCode } = this.state;

        return (
            <div className="demo-code-render_container" ref={this.ref}>
                <h3 className="demo-code-render_title">代码演示</h3>
                <div className="demo-code-body">
                    <div className="demo-code_children">{children}</div>
                    <div className="demo-code_title" onClick={this.toggleCode}>
                        <span>{title}</span>
                    </div>
                    {showCode && (
                        <div className="demo-code_hj">
                            <MarkdownRender source={source} />
                        </div>
                    )}
                </div>
            </div>
        );

    }
}

export default DemoCodeRender;