import React, { useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const storedUser = JSON.parse(window.localStorage.getItem('user'));
        if(storedUser){
            navigate('search')
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        axios
            .post('http://20.236.136.145:3001/login', formObject)
            .then((response) => {

                window.localStorage.setItem('user', JSON.stringify(response.data.user));

                // Retrieving the object and parsing it back to an object
                const storedUser = JSON.parse(window.localStorage.getItem('user'));
                console.log(storedUser);

                navigate("/search");
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
                        SRMS is a leading shipping company dedicated to providing reliable and efficient shipping solutions to businesses and individuals worldwide. With our extensive network and advanced logistics capabilities, we offer a comprehensive range of shipping services tailored to meet the unique needs of our customers.
                        </p>
                    </div>

                    <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

                        <div class="card bg-glass">
                            <div class="card-body px-4 py-5 px-md-5">
                                <form onSubmit={handleSubmit}>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Email address</label>
                                        <input type="email" id="form3Example3" name="email" class="form-control" />
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4">Password</label>
                                        <input type="password" id="form3Example4" name="password" class="form-control" />
                                    </div>



                                    <div className='d-flex justify-content-end'>
                                        <button type="submit" class="btn btn-primary btn-block mb-4 px-5">
                                            Login
                                        </button>
                                    </div>

                                </form>


                                <p>Don't have an account? <Link to='/register'>Register Now</Link></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
