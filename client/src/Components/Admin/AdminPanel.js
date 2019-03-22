import React, {Component} from 'react';
import { Admin, Resource, EditGuesser } from 'react-admin';

import authProvider from './Auth/authProvider';
import DataProvider from './Provider/DataProvider';
import Dashboard from './Dashboard';
import {PostList, PostEdit, PostCreate} from './TabNav/Posts';
import {UserList, UserCreate, UserEdit} from './TabNav/Users';
import {ProductList, ProductCreate, ProductEdit} from './TabNav/Product';


class AdminPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname: ''
            },
            data: null,
            token: localStorage.getItem('token'),
            roles: localStorage.getItem('roles'),
        };
    }

    componentDidMount() {

    }

    render() {

        const AdminNav = () => (


            <Admin
                dashboard={Dashboard}
                autProvider={authProvider}
                dataProvider={DataProvider}
            >
                {/*************************************/}
                <Resource name="users" list={UserList}  edit={EditGuesser} create={UserCreate}/>
                <Resource name="order" list={PostList} edit={EditGuesser} create={PostCreate}/>
                <Resource name="basket" list={PostList} edit={EditGuesser} create={PostCreate}/>
                <Resource name="components" list={ProductList} edit={EditGuesser} create={ProductCreate} />
            </Admin>
        );


        return (
            <React.Fragment>
                <AdminNav/>
            </React.Fragment>
        );
    }
}

export default AdminPanel