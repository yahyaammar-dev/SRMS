import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        axios
        .post('http://localhost:8000/signup', formObject)
        .then((response) => {
            navigate('/Search')
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
    };

    return (
        <section class="background-radial-gradient overflow-hidden vh-100 d-flex align-items-center">
            <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div class="row gx-lg-5 align-items-center mb-5">
                    <div class="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                        <h1 class="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                            The best offer <br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
                        </h1>
                        <p class="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Temporibus, expedita iusto veniam atque, magni tempora mollitia
                            dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                            ab ipsum nisi dolorem modi. Quos?
                        </p>
                    </div>

                    <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

                        <div class="card bg-glass">
                            <div class="card-body px-4 py-5 px-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div class="row">
                                        <div class="col-md-6 mb-4">
                                            <div class="form-outline">
                                                <label class="form-label" for="form3Example1">First name</label>
                                                <input type="text" id="form3Example1" name="firstName" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <div class="form-outline">
                                                <label class="form-label" for="form3Example2">Last name</label>
                                                <input type="text" id="form3Example2" name="lastName" class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Email address</label>
                                        <input type="email" id="form3Example3" name="email" class="form-control" />
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4">Password</label>
                                        <input type="password" id="form3Example4" name="password" class="form-control" />
                                    </div>


                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4">Role</label>
                                        <select class="form-select" name="role" aria-label="Default select example">
                                            <option selected>Role</option>
                                            <option value="Editer">Editor</option>
                                            <option value="Viewer">Viewer</option>
                                        </select>
                                    </div>



                                    <div class="form-check d-flex justify-content-start mb-4">
                                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                        <label class="form-check-label" for="form2Example33">
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
            </div>
        </section>
    )
}

export default Signup
