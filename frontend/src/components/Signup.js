import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const storedUser = JSON.parse(window.localStorage.getItem('user'));
        if (storedUser) {
            navigate('/search')
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        axios
            .post('http://20.236.136.145:53001/signup', formObject)
            .then((response) => {
                window.localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/Search')
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    return (
        <>
            <div className="mainContainer">
                <div className="navbar">
                    <img src="/logo.png" className="logo" />
                    <div>
                        <ul className="menu">
                            <li>
                                <button className="mybtn" onClick={() => { }}>
                                    Slots
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row login-row">
                    <div className="col-md-6 offset-md-3">
                        <div className="loginform  p-4 ">
                            <form onSubmit={handleSubmit}>
                                <div class="row">
                                    <div class="col-md-12 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label form-labels" for="form3Example1">Full Name</label>
                                            <input type="text" id="form3Example1" name="name" class="form-controls remove-autofill-bg border-on-focus" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label form-labels" for="form3Example3">Email address</label>
                                    <input type="email" id="form3Example3" name="email" class="form-controls remove-autofill-bg border-on-focus" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label form-labels" for="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" name="password" class="form-controls remove-autofill-bg border-on-focus" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label form-labels" for="form3Example4">Select Role</label>
                                    <select class="form-select form-controls remove-autofill-bg border-on-focus" name="roles" aria-label="Default select example">
                                        <option selected>Role</option>
                                        <option value="Editer">Editor</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                </div>
                                <div class="form-check d-flex justify-content-start mb-4">
                                    <input class="form-check-input me-2 " type="checkbox" id="form2Example33" />
                                    <label class="form-check-label " for="form2Example33">
                                        Agree to Terms and Conditions
                                    </label>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button type="submit" class="btn btn-primary btn-block mb-4 px-5">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
