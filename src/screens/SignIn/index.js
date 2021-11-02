import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {Images} from "../../config/Images";
import TitleUnderlined from "../../components/TitleUnderlined";
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {signInAction, signInReset} from "../../redux/api/SignInApi";
import {Input} from '../../components/Input';

let route = require('../../utils/route');

function SignIn(props) {
    const {t} = useTranslation();
    const {register, handleSubmit, errors} = useForm();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [hasErrorExecution, setHasErrorExecution] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    let history = useHistory();

    useEffect(() => {
        if (props.result !== null) {
            localStorage.setItem('USER', JSON.stringify(props.result));
            localStorage.setItem('DATE_CONNECTED', JSON.stringify(new Date().toISOString()));
            history.push(route.home.root);
            //window.location.href = route.home.root;
        }

    }, [props]);

    const onLogin = () => {
        console.log(errors);
        console.log("data checked",password);
        props.signInAction(login, password)
    };


    console.log(props);
    return (
        <div className="container-fluid">
            <div className="row justify-content-md-center">
                <div className="col-lg-8">
                    <div className="shadow bg-white rounded d-flex">
                        <div className="row">
                            <div className="col align-self-start">
                                <img src={Images.signInBanner} className="img-fluid" alt="Sign In Banner"/>
                            </div>
                            <div className="col-md-6 aligb-self-start">
                                <div className="pl-2 pr-4 pt-4 pb-4 mt-2 mb-5">
                                    <div className="col-12 p-0">
                                        <TitleUnderlined
                                            customClass="mb-2 mb-xl-3">{t('signin.title')}</TitleUnderlined>
                                    </div>
                                    <form className="mt-4" onSubmit={handleSubmit(onLogin)}>

                                        <Input wrapperClass="form-group mb-4"
                                               inputClass="form-control"
                                               type="text"
                                               name="login"
                                               ref={register({required: true})}
                                               id="login"
                                               value={login}
                                               onChange={(e) => setLogin(e.target.value)}
                                               error={errors.hasOwnProperty("login")}
                                               errorText={t('error.required_field')}
                                               labelText={t('common.ccuid')}
                                               placeholder={t('signin.enter_ccuid')}/>

                                        <Input wrapperClass="form-group mb-4"
                                               inputClass="form-control"
                                               type="password"
                                               name="password"
                                               ref={register({required: true})}
                                               id="password"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               error={errors.hasOwnProperty("password")}
                                               errorText={t('error.required_field')}
                                               labelText={t('common.password')}
                                               placeholder={t('signin.enter_password')}/>

                                        <div className="custom-control custom-checkbox mb-4">
                                            <input type="checkbox" className="custom-control-input" id="submitButton"/>
                                            <label className="custom-control-label"
                                                   htmlFor="exampleCheck1">{t('signin.remember_me')}</label>
                                        </div>

                                        {
                                            props.loading ?
                                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status"
                                                          aria-hidden="true"/>
                                                    <span className="sr-only">{t('common.loading')}</span>
                                                </button> :
                                                <button className="btn btn-primary"
                                                        onClick={() => handleSubmit(onLogin)}>
                                                    {t('signin.connect')}
                                                </button>
                                        }


                                        {
                                            props.error !== null &&
                                            <div className="alert alert-danger mt-1" role="alert">
                                                <span className="alert-icon"><span
                                                    className="sr-only">Danger</span></span>
                                                <p>{props.error.data}</p>
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    loading: state.signInReducer.loading,
    result: state.signInReducer.result,
    error: state.signInReducer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    signInAction,
    signInReset

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
