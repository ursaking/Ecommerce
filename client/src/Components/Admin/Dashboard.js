import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

var token = localStorage.getItem('token');

axios.get(`http://localhost:8000/api/user?token=${token}`)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
    })


export default () => (
    <Card>
        <h2>Welcome Admin !</h2>
        <CardContent>Informations général:
            <CardContent>
                <p>Users Inscris : 10</p>
                <p>Commande Faites : 56</p>
                <p>Réclamation Recues : 30</p>
            </CardContent>

        </CardContent>
    </Card>
);