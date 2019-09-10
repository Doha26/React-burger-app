import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'
import axios from '../../axios-order'

const withErrorHandler = (WrappedComponent, axios) => {
    return class  extends Component {
        state = {
            error: null
        };
        requestInterceptor = null;
        responseInterceptor = null;

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            // Remove interceptors to avoid memory leacks
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
        }

        errorConfirmedHandmer = () => {
            this.setState({error:null})
        };

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                           modalClosed={this.errorConfirmedHandmer}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent  {...this.props}/>
                </Aux>
            );
        }
    }

};

export default withErrorHandler;