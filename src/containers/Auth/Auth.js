import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity, generateErrorMsg } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
                [controlName]: updateObject(this.state.controls[controlName], {
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true,
                    errorMsg: generateErrorMsg(event.target.value, this.state.controls[controlName].validation)
                })
            } 
        );
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    componentDidMount() {
        // if user is not building a burger and go to authenticate page, redirect to main page after authenticated
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        } 
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElements.map(formElement => (
            <Input key={formElement.id}
                   elementType={formElement.config.elementType} 
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   errorMsg={formElement.config.errorMsg}
                   changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let authError = null;

        if (this.props.error) {
            authError = (
                <p className="text-danger">{ this.props.error.message }</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={ this.props.authRedirectPath } />;
        }
        
        return (
            <div className={classes.Auth}>
                { authRedirect }
                { authError }
                <form onSubmit={this.submitHandler}>
                    { form }
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to {this.state.isSignup ? 'SignIn' : 'SignUp'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);