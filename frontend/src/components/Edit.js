import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const EditData = () => {
    const navigate = useNavigate()
    const [Slot_term, setSlot_term] = useState()
    const [T_S_or_diect, setT_S_or_diect] = useState()
    const [DG_CLASS_1_PER_TEU, setDG_CLASS_1_PER_TEU] = useState()
    const [DG_Sur_20FT, setDG_Sur_20FT] = useState()
    const [DG_Sur_40FT, setDG_Sur_40FT] = useState()
    const [DTHC_HAZ_20FT, setDTHC_HAZ_20FT] = useState()
    const [DTHC_NON_HAZ_20FT, setDTHC_NON_HAZ_20FT] = useState()
    const [DTHC_NON_HAZ_40FT, setDTHC_NON_HAZ_40FT] = useState()
    const [ECR_PER_TEU, setECR_PER_TEU] = useState()
    const [EFFECTIVE_DATE, setEFFECTIVE_DATE] = useState()
    const [Flexi_Sur_TEU, setFlexi_Sur_TEU] = useState()
    const [GRI_TUE, setGRI_TUE] = useState()
    const [LDN_20ft, setLDN_20ft] = useState()
    const [LDN_40HC, setLDN_40HC] = useState()
    const [LDN_BAF_TEU, setLDN_BAF_TEU] = useState()
    const [LDN_EWRI_TEU, setLDN_EWRI_TEU] = useState()
    const [MT_20ft, setMT_20ft] = useState()
    const [MT_40HC, setMT_40HC] = useState()
    const [MT_BAF_TEU, setMT_BAF_TEU] = useState()
    const [MT_EWRI_TEU, setMT_EWRI_TEU] = useState()
    const [MT_TANK_S_CHARGE, setMT_TANK_S_CHARGE] = useState()
    const [REEFER_SUR, setREEFER_SUR] = useState()
    const [REMARKS, setREMARKS] = useState()
    const [ROB_FEE_TUE, setROB_FEE_TUE] = useState()
    const [TANK_S_CHARGE_TUE, setTANK_S_CHARGE_TUE] = useState()
    const [VALIDITY, setVALIDITY] = useState()
    const [pol, setpol] = useState()
    const [pod, setpod] = useState()
    const [service_name, setservice_name] = useState()
    const [slot_op_name, setslot_op_name] = useState()
    const [terminal, setterminal] = useState()
    const [volume_per_teu, setvolume_per_teu] = useState()
    
    const [item, setItem] = useState()
    const { id } = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        const data = {
            id, Slot_term, T_S_or_diect, DG_CLASS_1_PER_TEU, DG_Sur_20FT, DG_Sur_40FT, DTHC_HAZ_20FT, DTHC_NON_HAZ_20FT, DTHC_NON_HAZ_40FT, ECR_PER_TEU, EFFECTIVE_DATE, 
            Flexi_Sur_TEU, GRI_TUE, LDN_20ft, LDN_40HC, LDN_BAF_TEU, LDN_EWRI_TEU, MT_TANK_S_CHARGE, REEFER_SUR, REMARKS, ROB_FEE_TUE, TANK_S_CHARGE_TUE, VALIDITY, 
            pol, pod, service_name, terminal, volume_per_teu
        }
        axios
            .post('http://20.236.136.145:8000/editData', data)
            .then((response) => {
                console.log(response)
                alert('Data updated Successfully')
                // navigate("/search");
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    const getSingleItemData = async () => {
        try {
            const response = await axios.get(`http://20.236.136.145:8000/getSingleItemData/${id}`);
            setItem(response.data)
            setSlot_term(response.data.Slot_term)
            setT_S_or_diect(response.data.T_S_or_diect) 
            setDG_CLASS_1_PER_TEU(response.data.attribute?.DG_CLASS_1_PER_TEU)
            setDG_Sur_20FT(response.data.attribute?.DG_Sur_20FT)
            setDG_Sur_40FT(response.data.attribute?.DG_Sur_40FT)
            setDTHC_HAZ_20FT(response.data.attribute?.DTHC_HAZ_20FT)
            setDTHC_NON_HAZ_20FT(response.data.attribute?.DTHC_NON_HAZ_20FT)
            setDTHC_NON_HAZ_40FT(response.data.attribute?.DTHC_NON_HAZ_40FT)
            setECR_PER_TEU(response.data.attribute?.ECR_PER_TEU)
            setEFFECTIVE_DATE(response.data.attribute?.EFFECTIVE_DATE)
            setFlexi_Sur_TEU(response.data.attribute?.Flexi_Sur_TEU)
            setGRI_TUE(response.data.attribute?.GRI_TUE)
            setLDN_20ft(response.data.attribute?.LDN_20ft)
            setLDN_40HC(response.data.attribute?.LDN_40HC)
            setLDN_BAF_TEU(response.data.attribute?.LDN_BAF_TEU)
            setLDN_EWRI_TEU(response.data.attribute?.LDN_EWRI_TEU)
            setMT_20ft(response.data.attribute?.MT_20ft)
            setMT_40HC(response.data.attribute?.MT_40HC)
            setMT_BAF_TEU(response.data.attribute?.MT_BAF_TEU)
            setMT_EWRI_TEU(response.data.attribute?.MT_EWRI_TEU)
            setMT_TANK_S_CHARGE(response.data.attribute?.MT_TANK_S_CHARGE)
            setREEFER_SUR(response.data.attribute?.REEFER_SUR)
            setREMARKS(response.data.attribute?.REMARKS)
            setROB_FEE_TUE(response.data.attribute?.ROB_FEE_TUE)
            setTANK_S_CHARGE_TUE(response.data.attribute?.TANK_S_CHARGE_TUE)
            setVALIDITY(response.data.attribute?.VALIDITY)
            setpod(response.data.pod)
            setpol(response.data.pol)
            setservice_name(response.data.service.service_name)
            setslot_op_name(response.data.service.slot_op_name)
            setterminal(response.data.terminal)
            setvolume_per_teu(response.data.volume_per_teu)
            return response.data;
        } catch (error) {
            console.error(error);
            // Handle error
            return null;
        }
    }

    useEffect(()=>{
        getSingleItemData()
    },[id])

    return (
        <section class="background-radial-gradient overflow-hidden d-flex align-items-center">
            <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div class="row gx-lg-5 align-items-center mb-5 abcc">

                    <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>


                        <div class="card bg-glass">
                            <h1 className='myhead'>Edit Data</h1>
                            <div class="card-body px-4 py-5 px-md-5">
                                <form onSubmit={handleSubmit}>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Slot Term</label>
                                        <input type="text" id="form3Example3" name="slotterm" value={Slot_term} onChange={(e)=>setSlot_term(e.target.value)} class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">T/S or Direct</label>
                                        <input type="text" id="form3Example3"  value={T_S_or_diect} onChange={(e)=>setT_S_or_diect(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">DG_CLASS_1_PER_TEU</label>
                                        <input type="text" id="form3Example3" value={DG_CLASS_1_PER_TEU} onChange={(e)=>setDG_CLASS_1_PER_TEU(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">DG_Sur_20FT</label>
                                        <input type="text" id="form3Example3" value={DG_Sur_20FT} onChange={(e)=>setDG_Sur_20FT(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">DG_Sur_40FT</label>
                                        <input type="text" id="form3Example3" value={DG_Sur_40FT} onChange={(e)=>setDG_Sur_40FT(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">DTHC_HAZ_20FT</label>
                                        <input type="text" id="form3Example3" value={DTHC_HAZ_20FT} onChange={(e)=>setDTHC_HAZ_20FT(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">DTHC_NON_HAZ_20FT</label>
                                        <input type="text" id="form3Example3" value={DTHC_NON_HAZ_20FT} onChange={(e)=>setDTHC_NON_HAZ_20FT(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">DTHC_NON_HAZ_40FT</label>
                                        <input type="text" id="form3Example3" value={DTHC_NON_HAZ_40FT} onChange={(e)=>setDTHC_NON_HAZ_40FT(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">ECR_PER_TEU</label>
                                        <input type="text" id="form3Example3" value={ECR_PER_TEU} onChange={(e)=>setECR_PER_TEU(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">EFFECTIVE_DATE</label>
                                        <input type="text" id="form3Example3" value={EFFECTIVE_DATE} onChange={(e)=>setEFFECTIVE_DATE(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Flexi_Sur_TEU</label>
                                        <input type="text" id="form3Example3" value={Flexi_Sur_TEU} onChange={(e)=>setFlexi_Sur_TEU(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">GRI_TUE</label>
                                        <input type="text" id="form3Example3" value={GRI_TUE} onChange={(e)=>setGRI_TUE(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">LDN_20ft
                                        </label>
                                        <input type="text" id="form3Example3" value={LDN_20ft} onChange={(e)=>setLDN_20ft(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">LDN_40HC
                                        </label>
                                        <input type="text" id="form3Example3" value={LDN_40HC} onChange={(e)=>setLDN_40HC(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">LDN_BAF_TEU
                                        </label>
                                        <input type="text" id="form3Example3" value={LDN_BAF_TEU} onChange={(e)=>setLDN_BAF_TEU(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">LDN_EWRI_TEU
                                        </label>
                                        <input type="text" id="form3Example3" value={LDN_EWRI_TEU} onChange={(e)=>setLDN_EWRI_TEU(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">MT_20ft
                                        </label>
                                        <input type="text" id="form3Example3" value={MT_20ft} onChange={(e)=>setMT_20ft(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">MT_40HC
                                        </label>
                                        <input type="text" id="form3Example3" value={MT_40HC} onChange={(e)=>setMT_40HC(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">MT_BAF_TEU
                                        </label>
                                        <input type="text" id="form3Example3" value={MT_BAF_TEU} onChange={(e)=>setMT_BAF_TEU(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">MT_EWRI_TEU
                                        </label>
                                        <input type="text" id="form3Example3" value={MT_EWRI_TEU} onChange={(e)=>setMT_EWRI_TEU(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">MT_TANK_S_CHARGE
                                        </label>
                                        <input type="text" id="form3Example3" value={MT_TANK_S_CHARGE} onChange={(e)=>setMT_TANK_S_CHARGE(e.target.value)}  name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">REEFER_SUR
                                        </label>
                                        <input type="text" id="form3Example3" value={REEFER_SUR} onChange={(e)=>setREEFER_SUR(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">REMARKS
                                        </label>
                                        <input type="text" id="form3Example3" value={REMARKS} onChange={(e)=>setREMARKS(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">ROB_FEE_TUE
                                        </label>
                                        <input type="text" id="form3Example3" value={ROB_FEE_TUE} onChange={(e)=>setROB_FEE_TUE(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">TANK_S_CHARGE_TUE
                                        </label>
                                        <input type="text" id="form3Example3" value={TANK_S_CHARGE_TUE} onChange={(e)=>setTANK_S_CHARGE_TUE(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">VALIDITY
                                        </label>
                                        <input type="text" id="form3Example3" value={VALIDITY} onChange={(e)=>setVALIDITY(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">POD
                                        </label>
                                        <input type="text" id="form3Example3" value={pod} name="name" onChange={(e)=>setpod(e.target.value)} class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">POL
                                        </label>
                                        <input type="text" id="form3Example3" value={pol} name="name" onChange={(e)=>setpol(e.target.value)} class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Service Name
                                        </label>
                                        <input type="text" id="form3Example3" value={service_name} onChange={(e)=>setservice_name(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Slot Op Name
                                        </label>
                                        <input type="text" id="form3Example3" value={slot_op_name}  onChange={(e)=>setslot_op_name(e.target.value)} name="name" class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Terminal
                                        </label>
                                        <input type="text" id="form3Example3" value={terminal} name="name" onChange={(e)=>setterminal(e.target.value)} class="form-control" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Volume Per TEU
                                        </label>
                                        <input type="text" id="form3Example3" value={volume_per_teu} name="name" onChange={(e)=>setvolume_per_teu(e.target.value)} class="form-control" />
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
    )
}

export default EditData
