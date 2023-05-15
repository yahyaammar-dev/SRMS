import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AddData = () => {
    const navigate = useNavigate()
    const [flag, setFlag] = useState(true)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        axios
            .post('http://localhost:8000/addData', formObject)
            .then((response) => {
                alert('Data added Successfully')
                navigate("/search");
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };




    return (
        <>

         

    
            <section class="background-radial-gradient overflow-hidden d-flex align-items-center">



                <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div class="row gx-lg-5 align-items-center mb-5 abcc">

                        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

                            <div class="card bg-glass">
                                <div class="card-body px-4 py-5 px-md-5">
                                    <form onSubmit={handleSubmit}>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">LDN 20</label>
                                            <input type="text" id="LDN_20ft" name="LDN_20ft" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">LDN 40</label>
                                            <input type="text" id="LDN_40HC" name="LDN_40HC" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">ECR_PER_TEU</label>
                                            <input type="text" id="ECR_PER_TEU" name="ECR_PER_TEU" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Flexi_Sur_TEU</label>
                                            <input type="text" id="Flexi_Sur_TEU" name="Flexi_Sur_TEU" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">DG_Sur_20FT</label>
                                            <input type="text" id="DG_Sur_20FT" name="DG_Sur_20FT" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">DG_Sur_40FT</label>
                                            <input type="text" id="DG_Sur_40FT" name="DG_Sur_40FT" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">DG_CLASS_1_PER_TEU</label>
                                            <input type="text" id="DG_CLASS_1_PER_TEU" name="DG_CLASS_1_PER_TEU" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">REEFER_SUR</label>
                                            <input type="text" id="REEFER_SUR" name="REEFER_SUR" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">DTHC_NON_HAZ_20FT</label>
                                            <input type="text" id="DTHC_NON_HAZ_20FT" name="DTHC_NON_HAZ_20FT" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">DTHC_HAZ_20FT</label>
                                            <input type="text" id="DTHC_HAZ_20FT" name="DTHC_HAZ_20FT" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">DTHC_NON_HAZ_40FT</label>
                                            <input type="text" id="DTHC_NON_HAZ_40FT" name="DTHC_NON_HAZ_40FT" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">TANK_SCHARGE_TUE</label>
                                            <input type="text" id="TANK_SCHARGE_TUE" name="TANK_SCHARGE_TUE" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">GRI_TUE</label>
                                            <input type="text" id="GRI_TUE" name="GRI_TUE" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">ROB_FEE_TUE</label>
                                            <input type="text" id="ROB_FEE_TUE" name="ROB_FEE_TUE" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">MT_20ft</label>
                                            <input type="text" id="MT_20ft" name="MT_20ft" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">MT_40HC</label>
                                            <input type="text" id="MT_40HC" name="MT_40HC" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">MT_EWRI_TEU</label>
                                            <input type="text" id="MT_EWRI_TEU" name="MT_EWRI_TEU" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">MT_BAF_TEU</label>
                                            <input type="text" id="MT_BAF_TEU" name="MT_BAF_TEU" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">MT_TANK_SCHARGE</label>
                                            <input type="text" id="MT_TANK_SCHARGE" name="MT_TANK_SCHARGE" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">EFFECTIVE_DATE</label>
                                            <input type="text" id="EFFECTIVE_DATE" name="EFFECTIVE_DATE" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">VALIDTY</label>
                                            <input type="text" id="VALIDTY" name="VALIDTY" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">REMARKS</label>
                                            <input type="text" id="REMARKS" name="REMARKS" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Slot_op_name</label>
                                            <input type="text" id="slot_op_name" name="slot_op_name" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Service_name</label>
                                            <input type="text" id="service_name" name="service_name" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Pod</label>
                                            <input type="text" id="pod" name="pod" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Pol</label>
                                            <input type="text" id="pol" name="pol" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Terminal</label>
                                            <input type="text" id="terminal" name="terminal" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Volume_per_teu</label>
                                            <input type="text" id="volume_per_teu" name="volume_per_teu" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">T_S_or_diect</label>
                                            <input type="text" id="T_S_or_diect" name="T_S_or_diect" class="form-control" />
                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Slot_term</label>
                                            <input type="text" id="Slot_term" name="Slot_term" class="form-control" />
                                        </div>


                                        <div className='d-flex justify-content-end'>
                                            <button type="submit" class="btn btn-primary btn-block mb-4 px-5">
                                                Submit
                                            </button>
                                        </div>

                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AddData



