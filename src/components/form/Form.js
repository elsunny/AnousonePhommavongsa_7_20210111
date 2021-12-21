import React from 'react';
import "./Form.scss";

function Form() {
    return (
        <form className="user_form" method="post">
            <div>
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" id="pseudo" name="pseudo" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"  />
            </div>
            <div>
                <label htmlFor="pwd">Password</label>
                <input type="password" id="pwd" name="pwd" />
            </div>
        </form>
    );
}

export default Form;