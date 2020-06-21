import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';
import bg_signup from '../../asset/bg_signup.png';
import { FaRegEnvelope } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
function Register({ history }) {
    const initialValues = {
        Name: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        Name: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                history.push('login');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <div>
                    <img className="bg_signup" src={bg_signup}></img>
                    <Form className="signupform">
                        {/* <h3 className="card-header">Register</h3> */}
                        <div className="card-body">
                            {/* <div className="form-row"> */}
                                <div className="form-group col-11">
                                    <div className="input-icons"> 
                                    {/* <label>Name</label> */}
                                    <Field name="Name" id="s_name" placeholder="Name*" type="text" className={'form-control' + (errors.Name && touched.Name ? ' is-invalid' : '')} />
                                    {/* <ErrorMessage name="Name" component="div" className="invalid-feedback" /> */}
                                    <FiUser />
                                    </div>
                                </div>
                            {/* </div> */}
                            {/* <div className="form-row"> */}
                                <div className="form-group col-11">
                                    <div className="input-icons"> 
                                    {/* <label>Email</label> */}
                                    <Field name="email" id="s_email" placeholder="Email*" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    {/* <ErrorMessage name="email" component="div" className="invalid-feedback" /> */}
                                    <FaRegEnvelope />
                                    </div>
                                </div>
                            {/* </div> */}
                            {/* <div className="form-row"> */}
                                <div className="form-group col-11">
                                    <div className="input-icons"> 
                                    {/* <label>Password</label> */}
                                    <Field name="password" id="s_password" placeholder="Password*" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    {/* <ErrorMessage name="password" component="div" className="invalid-feedback" /> */}
                                    <FiLock />
                                    </div>
                                </div>
                            
                            {/* </div> */}
                            <div className="form-group">
                                <button type="submit" disabled={isSubmitting} className="btn btn_signup">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    SIGNUP
                                </button>
                            </div>
                            <div className="link_login">
                                <Link to="login" className="btn btn-link btn_link_login">LOGIN</Link>
                            </div>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export { Register }; 