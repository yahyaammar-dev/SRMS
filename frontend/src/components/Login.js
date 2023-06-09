import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem("user"));
    if (storedUser) {
      navigate("search");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    axios
      .post("http://20.236.136.145/login", formObject)
      .then((response) => {
        window.localStorage.setItem("user", JSON.stringify(response.data.user));

        // Retrieving the object and parsing it back to an object
        const storedUser = JSON.parse(window.localStorage.getItem("user"));
        console.log(storedUser);

        navigate("/search");
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
                <button className="mybtn" onClick={() => {}}>
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
                <div class="form-outline mb-4">
                  <label class="form-label form-labels" for="form3Example3"  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="form3Example3"
                    name="email"
                    class="form-controls  remove-autofill-bg border-on-focus"
                  />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label form-labels" for="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    name="password"
                    class="form-controls remove-autofill-bg border-on-focus"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register Now</Link>
                  </p> */}
                  <button
                    type="submit"
                    class="btn btn-primary btn-block mb-4 px-5 w-100"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
