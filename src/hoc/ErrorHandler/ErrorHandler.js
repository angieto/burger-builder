import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        };
    
        // handle error - does not account the component's children
        componentWillMount = () => {
            // first clear up any previous errors 
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            axios.interceptors.response.use(res => res, err => {
                // firebase has err.message
                this.setState({ error: err });
            });
        }

        // method
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        <p className="alert alert-danger">
                            { this.state.error ? this.state.error.message : null }
                        </p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
};

export default errorHandler;