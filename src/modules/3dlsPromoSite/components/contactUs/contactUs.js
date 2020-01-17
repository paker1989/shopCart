import * as React from 'react';

import { Switch } from 'zent';
import CLSInput from '../input/input';
import CLSSelect from '../select/select';
import CLSCheckbox from '../checkbox/checkbox';


import Countries from '../../assets/data/countries';
import JobLevels from '../../assets/data/jobLevels';
import Department from '../../assets/data/department';

import './contactUs.scss';

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            learningContentCheck: false,
            certCheck: false,
            buyCheck: false,
            tofuCheck: false
        }
    }

    toggleCheck = (fieldName, val) => {
        this.setState({
            [fieldName]: val
        });
    }

    render() {
        const { learningContentCheck, certCheck, buyCheck, tofuCheck } = this.state;

        return (
            <div className="contact-us">
                <div className="contact-us-title">
                    <h3 className="title--main">Contact Us</h3>
                    <span className="title--sub">
                        Interested in our Learning Offer? Please contact us
                  </span>
                </div>
                <div className="contact-formula">
                    <div className="contact-formula-form">
                        <div className="contact-formula-container">
                            <div className="item-container">
                                <CLSInput type="text" placeholder="Email*" />
                            </div>
                            <div className="item-container">
                                <CLSInput type="text" placeholder="First Name*" />
                            </div>
                            <div className="item-container">
                                <CLSInput type="text" placeholder="Last Name*" />
                            </div>
                            <div className="contact-separator"></div>
                            <div className="item-container">
                                <CLSInput type="text" placeholder="Company*" />
                            </div>
                            <div className="item-container">
                                <CLSSelect placeholder="Country or Area*" data={Countries} />
                            </div>
                            <div className="item-container">
                                <CLSInput type="text" placeholder="Phone*" />
                            </div>
                        </div>
                        <div className="contact-formula-container">
                            <div className="item-container">
                                <CLSSelect placeholder="Job Level*" data={JobLevels} />
                            </div>
                            <div className="item-container">
                                <CLSSelect placeholder="Department*" data={Department} />
                            </div>
                            <div className="item-container">
                                <CLSInput type="text" placeholder="Job Title" />
                            </div>
                            <div className="item-container">
                                <CLSInput type="text" placeholder="Related Industry" />
                            </div>
                            <div className="item-container">
                                <CLSCheckbox text="I would like more information on learning contents"
                                    checked={learningContentCheck}
                                    handleChange={(val) => {
                                        this.toggleCheck('learningContentCheck', val);
                                    }} />
                            </div>
                            <div className="item-container">
                                <CLSCheckbox text="I would like more information on Certification"
                                    checked={certCheck}
                                    handleChange={(val) => {
                                        this.toggleCheck('certCheck', val);
                                    }}
                                />
                            </div>
                            <div className="item-container">
                                <CLSCheckbox text="I would like more information about how to buy"
                                    checked={buyCheck}
                                    handleChange={(val) => {
                                        this.toggleCheck('buyCheck', val);
                                    }}
                                />
                            </div>
                            <div className="item-container">
                                <CLSInput type="textarea" placeholder="Please give us more details about your learning needs" />
                            </div>
                        </div>
                    </div>
                    <div className="policy-switch">
                        <Switch
                            // size="small"
                            checked={tofuCheck}
                           onChange={(val) => {
                               this.toggleCheck('tofuCheck', val)
                           }}
                        />
                        <span className="align-left title--sub">
                            I acknowledge I have read and I hereby accept the
                            privacy policy under which my Personal Data will be used
                            by Dassault Systèmes*
                    </span>
                    </div>
                    <div className="contact-confirm">
                        <div role="button" className="btn contact">Submit</div>
                    </div>
                </div>

            </div>
        )
    }
}
