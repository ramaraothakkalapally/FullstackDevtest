import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';
import bg_login from '../../asset/bg_login.png';
import { FaRegEnvelope } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';

function Login({ history, location }) {
    const initialValues = {
        email: '',
        password: ''
    };
    
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.login(email, password)
            .then(() => {
                const { from } = location.state || { from: { pathname: "/" } };
                history.push(from);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <div >
                    <img className="bg_login" src={bg_login}></img>
                    <Form className="loginform">
                        {/* <h3 className="card-header">Login</h3> */}
                        <div className="card-body">
                            
                            <div className="form-group">
                                <div className="input-icons"> 
                                
                                <Field name="email" id="email" type="text" placeholder="Email*" className={'input-field form-control' + (errors.email && touched.email ? ' is-invalid' : '')} /> 
                                {/* <ErrorMessage name="email" component="div" className="invalid-feedback" /> */}
                                <FaRegEnvelope />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-icons"> 
                                {/* <label>Password</label> */}
                                <Field name="password" id="password" type="password" placeholder="Password*" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                {/* <ErrorMessage name="password" component="div" className="invalid-feedback" /> */}
                                <FiLock />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col div_login">
                                    <button type="submit" disabled={isSubmitting} className="btn btn_login">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        LOGIN
                                    </button>
                                </div>
                                <div className="form-group col text-right">
                                    <Link to="forgot-password" className="btn btn-link pr-0">Forgot?</Link>
                                </div>
                            </div>
                            <div className="link_register">
                                <Link to="register" className="btn btn-link btn_link_register" >SIGN UP</Link>
                            </div>
                        </div>
                    </Form>
                </div> 
            )}
        </Formik>
    )
}

export { Login }; 