import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, error } = useRequest(
        '/api/users/signin',
        'post',
        {
            email: email,
            password: password
        },
         () => Router.push('/')
    );

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>
            {error}
            <button className="btn btn-primary">Sign In</button>
        </form>
    );
};

export default SignIn;