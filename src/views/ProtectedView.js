import React from 'react';

export default class ProtectedView extends React.Component {
    constructor() {
        
        super();
        this.state = {};
         if (localStorage.getItem("token")) {
            this.state.user = fetch("http://localhost:3001/login",{method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
                token: localStorage.getItem("token"),
            })
            })
            .then(r => r.json())
            .then(data => {
                if (data.status != "OK") {
                    window.location.href = '/login';
                }

            })
            .catch(err => {
                window.location.href = '/login';

            });
        }

       
    }
    getUser() {
        return this.state.user;
    }
}