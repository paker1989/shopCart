import * as React from 'react';
import axios from 'axios';

import { Switch, Notify } from 'zent';
import CLSInput from '../input/input';
import CLSSelect from '../select/select';
import CLSCheckbox from '../checkbox/checkbox';

import Countries from '../../assets/data/countries';
import JobLevels from '../../assets/data/jobLevels';
import Department from '../../assets/data/department';

import './contactUs.scss';

const _EMAIL_TEST_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // learningContentCheck: false,
            // certCheck: false,
            // buyCheck: false,
            // tofuCheck: false,
            formModels: {
                learningContentCheck: {
                    value: false,
                    name: 'learningContentCheck',
                    mandatory: false,
                },
                certCheck: {
                    value: false,
                    name: 'certCheck',
                    mandatory: false,
                },
                buyCheck: {
                    value: false,
                    name: 'buyCheck',
                    mandatory: false,
                },
                tofuCheck: {
                    value: false,
                    name: 'tofuCheck',
                    mandatory: true,
                    errorMsg: [
                        'Your explicit consent to the privacy policy is required',
                    ],
                    errorIndex: -1,
                },
                email: {
                    value: '',
                    name: 'email',
                    mandatory: true,
                    errorMsg: [
                        'Please indicate your Email address',
                        'The email address is not valid (name@domain.com)',
                    ],
                    errorIndex: -1,
                },
                firstName: {
                    value: '',
                    name: 'firstName',
                    mandatory: true,
                    errorMsg: ['Please indicate your First name'],
                    errorIndex: -1,
                },
                lastName: {
                    value: '',
                    name: 'lastName',
                    mandatory: true,
                    errorMsg: ['Please indicate your Last name'],
                    errorIndex: -1,
                },
                company: {
                    value: '',
                    name: 'company',
                    mandatory: true,
                    errorMsg: ['Please indicate your Company'],
                    errorIndex: -1,
                },
                // phone: {
                //     value: '',
                //     name: 'phone',
                //     mandatory: true,
                //     errorMsg: [
                //         'Please indicate your Phone number',
                //         'This phone number is not valid',
                //     ],
                //     errorIndex: -1,
                // },
                country: {
                    value: '',
                    name: 'country',
                    mandatory: true,
                    errorMsg: ['Please select your country or area'],
                    errorIndex: -1,
                },
                // jobLevel: {
                //     value: '',
                //     name: 'jobLevel',
                //     mandatory: true,
                //     errorMsg: ['Please select your job Level'],
                //     errorIndex: -1,
                // },
                // department: {
                //     value: '',
                //     name: 'department',
                //     mandatory: true,
                //     errorMsg: ['Please select your department'],
                //     errorIndex: -1,
                // },
                jobTitle: {
                    value: '',
                    name: 'jobTitle',
                    mandatory: false,
                },
                industry: {
                    value: '',
                    name: 'industry',
                    mandatory: false,
                },
                comment: {
                    value: '',
                    name: 'comment',
                    mandatory: false,
                },
            },
        };
    }

    toggleCheck = (fieldName, val) => {
        if (this.state.formModels[fieldName].mandatory && val) {
            this.state.formModels[fieldName].errorIndex = -1;
        }
        this.state.formModels[fieldName].value = val;
        console.log('toggle check');
        this.setState({
            formModels: this.state.formModels,
        });
    };

    onValueChange = (fieldName, value) => {
        if (this.state.formModels[fieldName].errorIndex !== -1) {
            // validate it
            switch (fieldName) {
                case 'email':
                    if (_EMAIL_TEST_REGEX.test(value)) {
                        this.state.formModels[fieldName].errorIndex = -1;
                    }
                    break;
                default:
                    if (value.length > 0) {
                        this.state.formModels[fieldName].errorIndex = -1;
                    }
            }
        }
        this.state.formModels[fieldName].value = value;
        // console.log('onValuechange');
        this.setState({
            formModels: this.state.formModels,
        });
    };

    validateForm = () => {
        let flag = true;
        for (let key in this.state.formModels) {
            var filedProps = this.state.formModels[key];
            switch (key) {
                case 'email':
                    if (filedProps.value.trim().length === 0) {
                        filedProps.errorIndex = 0;
                        flag = false;
                    } else if (!_EMAIL_TEST_REGEX.test(filedProps.value)) {
                        filedProps.errorIndex = 1;
                        flag = false;
                    }
                    break;
                case 'tofuCheck':
                    if (!filedProps.value) {
                        filedProps.errorIndex = 0;
                        flag = false;
                    }
                    break;
                default:
                    if (
                        filedProps.mandatory &&
                        filedProps.value.trim().length === 0
                    ) {
                        filedProps.errorIndex = 0;
                        flag = false;
                    }
                    break;
            }
        }
        if (!flag) {
            console.log('validateForm');
            this.setState({
                formModels: this.state.formModels,
            });
        } else {
            this.submitForm();
        }
    };

    // /contact/sendEmail
    submitForm = () => {
        let formData = {};
        for (let key in this.state.formModels) {
            let field = this.state.formModels[key];
            formData[field.name] = field.value;
        }
        axios
            .post('https://learningspace-ppdqa.3ds.com/Dashboard/contact/sendEmail', {
                params: formData,
            })
            .then(val => {
                console.log(val);
                for (let key in this.state.formModels) {
                    let field = this.state.formModels[key];
                    if (typeof field.value === 'boolean') {
                        field.value = false;
                    } else {
                        field.value = '';
                    }
                }
                this.setState({
                    formModels: this.state.formModels
                }, () => {
                    Notify.success('Your request was sent successfully!');
                })

            });
    };

    render() {
        const { formModels } = this.state;
        const { setContactRef } = this.props;

        return (
            <div className="contact-us">
                <div
                    className="contact-us-title"
                    ref={ref => setContactRef(ref)}
                >
                    <h3 className="title--main">Contact Us</h3>
                    <span className="title--sub">
                        Interested in our Learning Offer? Please contact us
                    </span>
                </div>
                <div className="contact-formula">
                    <div className="contact-formula-form">
                        <div className="contact-formula-container">
                            <div className="item-container">
                                <CLSInput
                                    type="text"
                                    placeholder="Email*"
                                    {...formModels.email}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                            <div className="item-container">
                                <CLSInput
                                    type="text"
                                    placeholder="First Name*"
                                    {...formModels.firstName}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                            <div className="item-container">
                                <CLSInput
                                    type="text"
                                    placeholder="Last Name*"
                                    {...formModels.lastName}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                            <div className="contact-separator"></div>
                            <div className="item-container">
                                <CLSInput
                                    type="text"
                                    placeholder="Company*"
                                    {...formModels.company}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                            <div className="item-container">
                                <CLSSelect
                                    placeholder="Country or Area*"
                                    data={Countries}
                                    {...formModels.country}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                            {/* <div className="item-container">
                                <CLSInput
                                    type="text"
                                    placeholder="Phone*"
                                    {...formModels.phone}
                                    onValueChange={this.onValueChange}
                                />
                            </div> */}
                        </div>
                        <div className="contact-formula-container">
                            {/* <div className="item-container">
                                <CLSSelect
                                    placeholder="Job Level*"
                                    data={JobLevels}
                                    {...formModels.jobLevel}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                            <div className="item-container">
                                <CLSSelect
                                    placeholder="Department*"
                                    data={Department}
                                    {...formModels.department}
                                    onValueChange={this.onValueChange}
                                />
                            </div> */}
                            <div className="item-container">
                                <CLSInput
                                    type="text"
                                    placeholder="Job Title"
                                    {...formModels.jobTitle}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                            <div className="item-container">
                                <CLSInput
                                    type="text"
                                    placeholder="Related Industry"
                                    {...formModels.industry}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                            <div className="item-container">
                                <CLSCheckbox
                                    text="I would like more information on learning contents"
                                    checked={
                                        formModels.learningContentCheck.value
                                    }
                                    handleChange={val => {
                                        this.toggleCheck(
                                            'learningContentCheck',
                                            val
                                        );
                                    }}
                                />
                            </div>
                            <div className="item-container">
                                <CLSCheckbox
                                    text="I would like more information on Certification"
                                    checked={formModels.certCheck.value}
                                    handleChange={val => {
                                        this.toggleCheck('certCheck', val);
                                    }}
                                />
                            </div>
                            <div className="item-container">
                                <CLSCheckbox
                                    text="I would like more information about how to buy"
                                    checked={formModels.buyCheck.value}
                                    handleChange={val => {
                                        this.toggleCheck('buyCheck', val);
                                    }}
                                />
                            </div>
                            <div className="item-container">
                                <CLSInput
                                    type="textarea"
                                    placeholder="Please give us more details about your learning needs"
                                    {...formModels.comment}
                                    onValueChange={this.onValueChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="policy-switch">
                        <div className="policy-switch--main">
                            <Switch
                                // size="small"
                                checked={formModels.tofuCheck.value}
                                onChange={val => {
                                    this.toggleCheck('tofuCheck', val);
                                }}
                            />
                            <span className="align-left title--sub">
                                I acknowledge I have read and I hereby accept
                                the privacy policy under which my Personal Data
                                will be used by Dassault Systèmes*
                            </span>
                        </div>
                        {formModels['tofuCheck'].errorIndex !== -1 && (
                            <span className="policy-switch--error">
                                {formModels['tofuCheck']['errorMsg'][0]}
                            </span>
                        )}
                    </div>
                    <div className="contact-confirm">
                        <div
                            role="button"
                            className="btn contact"
                            onClick={this.validateForm}
                        >
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
