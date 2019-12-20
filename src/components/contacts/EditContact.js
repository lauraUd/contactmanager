import React, { Component } from 'react'
import { Consumer } from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';


export default class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    async componentDidMount(){
        const{id} =this.props.match.params;
        const res= await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`);
        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        });
        //dispatch({ type: 'EDIT_CONTACT', payload: id });
    }

    onChange = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { name, email, phone } = this.state;

        //  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

        //check for errors
        if (name === '') {
            this.setState({ errors: { name: 'Name is required' } });
            return;
        }
        if (email === '') {
            this.setState({ errors: { email: 'Email is required' } });
            return;
        }
        // if (email !== '' && !re.test(email)) {
        //     this.setState({ errors: { email: 'Invalid email address' } });
        //     return;
        // }
        if (phone === '') {
            this.setState({ errors: { phone: 'Phone is required' } });
            return;
        }
        const updatedContact = {
            //id: uuid(),
            name,
            email,
            phone
        };

        const {id}  = this.props.match.params;
        const res  = await axios.put(`http://jsonplaceholder.typicode.com/users/${id}`, updatedContact);
        
        dispatch({ type: 'EDIT_CONTACT', payload: res.data });
        //clear form
        this.setState({
            name: '',
            email: '',
            phone: ''
        });
        this.props.history.push('/');
    }

    render() {
        const { name, email, phone, errors } = this.state;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">
                                Edit Contact
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        value={name}
                                        placeholder="Enter name..."
                                        onChange={this.onChange}
                                        error={errors.name}
                                    >
                                    </TextInputGroup>
                                    <TextInputGroup
                                        label="Email"
                                        type="email"
                                        name="email"
                                        className="form-control form-control-lg"
                                        placeholder="Update email..."
                                        value={email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                    >
                                    </TextInputGroup>
                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        className="form-control form-control-lg"
                                        placeholder="Update phone..."
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    >
                                    </TextInputGroup>
                                    <input
                                        type="submit"
                                        value="Update Contact"
                                        className="btn btn-light btn-block"
                                        onClick={this.onSubmit.bind(this, dispatch)}
                                    />
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

