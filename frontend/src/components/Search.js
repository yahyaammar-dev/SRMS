import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [subItem, setSubItem] = useState()
    const [user, setUser] = useState()
    const [subItemOpen, setSubItemOpen] = useState([]);
    const [data, setData] = useState()
    const [result, setResult] = useState()
    const [loader, setLoader] = useState(true)
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const navigate = useNavigate()
    const [slotTerm, setSlotTerm] = useState()
    const [month, setMonth] = useState('');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthMap = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
    };
    console.log(data)
    const handleLogout = () => {
        window.localStorage.removeItem('user')
        navigate('/')
    }
    const [slotOperatorName, setSlotOperatorName] = useState()
    const [terminal, setTerminal] = useState()
    function getFormattedDate(monthName) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = monthMap[monthName];
        const day = "01"; // Assuming the day is not relevant in this case
        return `${day}.${month}.${year}`;
    }

    const handleSelectChange = (event) => {
        setMonth(event.target.value);
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getAllData');
            setData(response.data);
            setResult(response.data);
            setLoader(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
        getUser()
    }, []);


    const getUser = () => {
        const storedUser = JSON.parse(window.localStorage.getItem('user'));
        setUser(storedUser)
    }



    const handleSerach = () => {
        setLoader(true);

        const customdata = result
        const filteredData = customdata.filter((item) => {
            const monthDate2 = getFormattedDate(month);
            var date = item.attribute.VALIDITY;
            var realmonth = date?.split(".")[1];
            var realmonth2 = monthDate2?.split(".")[1];
            if (item.pod !== to) {
                return false;
            }
            const monthDate = getFormattedDate(month);
            if (realmonth !== realmonth2) {
                return false;
            }
            return true;
        });
        setData(filteredData)
        setLoader(false)
    }

    const handleDelete = async (item) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/deleteData', {
                data: item.shipment_id
            });
            console.log(response)
            alert('Data Delte Successfully')
            setLoader(true)
            fetchData()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [containerType, setContainerType] = useState('');

    const handleRadioChange = (event) => {
        setLoader(true)
        setContainerType(event.target.value);
    };
    const handleRadioChange2 = (event) => {
        setLoader(true)
        setSlotOperatorName(event.target.value);
    };
    const handleRadioChange3 = (event) => {
        setLoader(true)
        setTerminal(event.target.value);
    };
    const handleRadioChange4 = (event) => {
        setLoader(true)
        setSlotTerm(event.target.value);
    };

    const handleClick = event => {
        if (isActive2) {
            setIsActive2(false)
        }
        setIsActive(current => !current);
    };
    const handleClick2 = event => {
        if (isActive) {
            setIsActive(false)
        }
        setIsActive2(current => !current);
    };

    useEffect(() => {
        if (containerType) {
            const updatedData = result?.filter(item => item.pod === containerType);
            // Now you can update the state with the filtered data
            setData(updatedData);
            setLoader(false)
        }
    }, [containerType])

    useEffect(() => {
        if (slotOperatorName) {
            const updatedData = result?.filter(item => item.service.slot_op_name === slotOperatorName);
            setData(updatedData);
            setLoader(false)
        }
    }, [slotOperatorName])

    useEffect(() => {
        if (slotOperatorName) {
            const updatedData = result?.filter(item => item.terminal === terminal);
            setData(updatedData);
            setLoader(false)
        }
    }, [terminal])

    useEffect(() => {
        if (slotTerm) {
            console.log(slotTerm)
            const updatedData = result?.filter(item => item.Slot_term === slotTerm);
            setData(updatedData);
            setLoader(false)
        }
    }, [slotTerm])

    const handleSubItemToggle = (index) => {
        console.log(index)
        const newSubItemOpen = [...subItemOpen];
        newSubItemOpen[index] = !newSubItemOpen[index];
        setSubItemOpen(newSubItemOpen);
    };

    console.log(user)

    return (
        <div className='mainContainer'>
            <div className='navbar'>
                <img src='/rsl-logo.png' className='logo' />
                <div>
                    <ul className='menu'>
                        {
                            user?.roles == "Editer" && <>
                                <li>
                                    <button className='mybtn' onClick={() => {
                                        navigate('/addData')
                                    }}>ADD NEW SLOT</button>
                                </li>
                            </>
                        }

                        <li>
                            <button className='mybtn' onClick={() => {
                                handleLogout()
                            }}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='searchBar'>
                <div className='searchtopbar'>
                    <p className='first'>TRANSPORTATION BY</p>
                    <p className='second'>ORIGIN OF SHIPMENT</p>
                    <p className='third'>DESTINATION OF SHIPMENT</p>
                    <p className='fourth'>MONTH</p>
                </div>
                <div className='innerSearchBar'>
                    <div className='d-flex'>
                        <button className={isActive ? 'seabutton ' : 'landbutton'} onClick={handleClick}>SEA</button>
                    </div>
                    <div class="my-div"></div>
                    <div className='d-flex'>
                        <button className={isActive2 ? 'seabutton ' : 'landbutton'} onClick={handleClick2}>LAND</button>
                    </div>
                    <div class="my-div"></div>
                    <div className="input-container">
                        <img src="/marker.png" />
                        <input className="input-field" type="text" placeholder="From" value={from} onChange={(e) => { setFrom(e.target.value) }} />
                    </div>
                    <div class="my-div"></div>
                    <div className="input-container">
                        <img src="/marker.png" />
                        <input className="input-field" type="text" placeholder="To" value={to} onChange={(e) => { setTo(e.target.value) }} />
                    </div>
                    <div class="my-div"></div>
                    <div className="input-container">


                        <select className="select-field" value={month} onChange={handleSelectChange}>
                            <option value="">Select a month</option>
                            {months.map((monthName) => (
                                <option key={monthName} value={monthName}>
                                    {monthName}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <img src="/serac.jpg" className='serachImage' onClick={handleSerach} />
                    </div>
                </div>
            </div>
            <div className='mainData'>
                <div className='filters'>
                    <div className='innerFilter '>
                        <h1 className='innerFilterh1'>POD</h1>
                        <div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='BND' onChange={handleRadioChange} />
                                <p>BND</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='IRAN' onChange={handleRadioChange} />
                                <p>IRAN</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='KANDLA' onChange={handleRadioChange} />
                                <p>KANDLA</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='BUSHEHR' onChange={handleRadioChange} />
                                <p>BUSHEHR</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='NHAVA SHEVA' onChange={handleRadioChange} />
                                <p>NHAVA SHEVA</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='MUNDRA' onChange={handleRadioChange} />
                                <p>MUNDRA</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='MOMBASA' onChange={handleRadioChange} />
                                <p>MOMBASA</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='BANDAR IMAM KHOMEINI' onChange={handleRadioChange} />
                                <p>BANDAR IMAM KHOMEINI</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='BUSHEHR' onChange={handleRadioChange} />
                                <p>BUSHEHR</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='BUSHEHR' onChange={handleRadioChange} />
                                <p>KHORRAM  SHAHR</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='Assalouyeh' onChange={handleRadioChange} />
                                <p>Assalouyeh </p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='ABU DHABI' onChange={handleRadioChange} />
                                <p>ABU DHABI</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='KHORRAM SHAHR' onChange={handleRadioChange} />
                                <p>KHORRAM SHAHR</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='DAR ES SALAM' onChange={handleRadioChange} />
                                <p>DAR ES SALAM</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='TANGER MED' onChange={handleRadioChange} />
                                <p>TANGER MED</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='CASABLANCA' onChange={handleRadioChange} />
                                <p>CASABLANCA</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='HAMAD' onChange={handleRadioChange} />
                                <p>HAMAD</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='COLOMBO' onChange={handleRadioChange} />
                                <p>COLOMBO</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='COCHIN' onChange={handleRadioChange} />
                                <p>COCHIN</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='CHENNAI' onChange={handleRadioChange} />
                                <p>CHENNAI</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='PORT KLANG' onChange={handleRadioChange} />
                                <p>PORT KLANG</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='SINGAPORE' onChange={handleRadioChange} />
                                <p>SINGAPORE</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='SHANGHAI' onChange={handleRadioChange} />
                                <p>SHANGHAI</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='SHEKOU' onChange={handleRadioChange} />
                                <p>SHEKOU</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='HAZIRA' onChange={handleRadioChange} />
                                <p>HAZIRA</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='PIPAVA' onChange={handleRadioChange} />
                                <p>PIPAVA</p>
                            </div>
                        </div>
                    </div>
                    <div className='innerFilter '>
                        <h1 className='innerFilterh1'>Slot Operator Name</h1>
                        <div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='BSS FEEDERS' onChange={handleRadioChange2} />
                                <p>BSS FEEDERS</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='FEEDER NAUTS' onChange={handleRadioChange2} />
                                <p>FEEDER NAUTS</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='SWAN' onChange={handleRadioChange2} />
                                <p>SWAN</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='Vira See' onChange={handleRadioChange2} />
                                <p>Vira See</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='CORPORATE SHIPPING' onChange={handleRadioChange2} />
                                <p>CORPORATE SHIPPING</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='MBA' onChange={handleRadioChange2} />
                                <p>MBA</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='PAS SHIPPING' onChange={handleRadioChange2} />
                                <p>PAS SHIPPING</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='INZU / SKZ SHIPPING' onChange={handleRadioChange2} />
                                <p>INZU / SKZ SHIPPING</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='IWS' onChange={handleRadioChange2} />
                                <p>IWS</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='ANGLO' onChange={handleRadioChange2} />
                                <p>ANGLO</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='RAGA SHIPPING' onChange={handleRadioChange2} />
                                <p>RAGA SHIPPING </p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='MARTRANS' onChange={handleRadioChange2} />
                                <p>MARTRANS</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='A.M Shpg/Great Alliance/ABDIS' onChange={handleRadioChange2} />
                                <p>A.M Shpg/Great Alliance/ABDIS</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='slotop' value='DPG' onChange={handleRadioChange2} />
                                <p>DPG</p>
                            </div>
                        </div>
                    </div>
                    <div className='innerFilter '>
                        <h1 className='innerFilterh1'>Terminal</h1>
                        <div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='KICT' onChange={handleRadioChange3} />
                                <p>KICT</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='QICT' onChange={handleRadioChange3} />
                                <p>QICT</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='B20/ICT' onChange={handleRadioChange3} />
                                <p>B20/ICT</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='BGT20' onChange={handleRadioChange3} />
                                <p>BGT20</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='PICT' onChange={handleRadioChange3} />
                                <p>PICT</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='RSGT' onChange={handleRadioChange3} />
                                <p>RSGT</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='ICT' onChange={handleRadioChange3} />
                                <p>ICT</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='GTI' onChange={handleRadioChange3} />
                                <p>GTI</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='term' value='RSGT' onChange={handleRadioChange3} />
                                <p>RSGT</p>
                            </div>

                        </div>
                    </div>
                    <div className='innerFilter '>
                        <h1 className='innerFilterh1'>Slot Term</h1>
                        <div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='FIFO' onChange={handleRadioChange4} />
                                <p>FIFO</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='CYFO' onChange={handleRadioChange4} />
                                <p>CYFO</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='CYFO DG' onChange={handleRadioChange4} />
                                <p>CYFO DG</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='CYCY' onChange={handleRadioChange4} />
                                <p>CYCY</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='THRU' onChange={handleRadioChange4} />
                                <p>THRU</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='FIHK' onChange={handleRadioChange4} />
                                <p>FIHK</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='FITK' onChange={handleRadioChange4} />
                                <p>FITK</p>
                            </div>
                            <div className='item' style={{ boxShadow: 'none', margin: '0', padding: 0 }}>
                                <input type='radio' name='containerType' value='FITK/ GEN' onChange={handleRadioChange4} />
                                <p>FITK/ GEN</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='listing'>
                    <div className='firstItem'>
                        <button>CHEAPER</button>
                    </div>

                    {
                        loader ?
                            <div className='flexerr'>
                                <div class="spinner-grow text-primary" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </div>
                            :
                            data?.map((item, index) => {
                                return <>
                                    <div className='outerContainer'>
                                        <div className='item'>
                                            <div className='itemFirst'>
                                                <div className='complogocontainer'>
                                                    <img src='/complogo.png' />
                                                    <h1>{item?.service?.slot_op_name ? item?.service?.slot_op_name : 'Service Name'}</h1>
                                                </div>

                                                <div className='sourcedest'>
                                                    <p>{item.pol ? item.pol : 'POL'}</p>
                                                    <p>{item.pod ? item.pod : 'POD'}</p>
                                                </div>
                                                <div className='hori'>
                                                    <div className='outlined-circle'></div>
                                                    <div class="my-div2">
                                                        <hr />
                                                    </div>
                                                    <div className='outlined-circle'></div>
                                                    <div class="my-div2 dd22">
                                                        <p>4 Days</p>
                                                        <img src='/ship.png' className='shipimage' />
                                                        <hr />
                                                    </div>
                                                    <div className='outlined-circle'></div>
                                                    <div class="my-div2">
                                                        <hr />
                                                    </div>
                                                    <div className='outlined-circle'></div>
                                                </div>
                                            </div>

                                            <div className='itemSecond'>
                                                <div className='first'>
                                                    <div className='righter'>
                                                    </div>
                                                    <div className='validity'>
                                                        <p className='title'>Validity:</p>
                                                        <p className='date'>{item.attribute.VALIDITY}</p>
                                                    </div>
                                                    <div className='expiry'>
                                                        <p className='title'>Expiry:</p>
                                                        <p className='date'>{item.attribute.datetime}</p>
                                                    </div>
                                                    <button className='gradBtn'>{(Number(item.attribute.LDN_20ft))}</button>
                                                    {
                                                        user?.roles == "Editer" && <>
                                                            <div className='flexer'>
                                                                <button className='deletebtn btn2' onClick={() => { navigate(`editData/${item.shipment_id}`) }} style={{ background: '#bdffcc', color: 'black' }}>Edit</button>
                                                                <button className='deletebtn btn2' onClick={() => handleDelete(item)}>Delete</button>
                                                            </div>
                                                        </>
                                                    }


                                                </div>
                                                <div className='second dropsub' onClick={() => handleSubItemToggle(index)}>
                                                    <img src='/drop.png' />
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            subItemOpen[index] && (
                                                <div className='itemSubItem'>
                                                    <div className='subItem'>
                                                        <div className='first'>
                                                            <input type='checkbox' />
                                                            <div><img src='/3.png' /></div>
                                                            <p>Delivery</p>
                                                        </div>
                                                        <div className='second'>
                                                            <p>Not available</p>
                                                            <div><img src='/drop.png' /></div>
                                                        </div>
                                                    </div>
                                                    <div className='subItem'>
                                                        <div className='first'>
                                                            <input type='checkbox' />
                                                            <div><img src='/1.png' /></div>
                                                            <p>Port Of Origin</p>
                                                        </div>
                                                        <div className='second'>
                                                            <p>{item.pol ? item.pol : 'JEA'} </p>
                                                            <div><img src='/drop.png' /></div>
                                                        </div>
                                                    </div>
                                                    <div className='subItem'>
                                                        <div className='first'>
                                                            <input type='checkbox' />
                                                            <div><img src='/2.png' /></div>
                                                            <p>Port Of Delivery</p>
                                                        </div>
                                                        <div className='second'>
                                                            <p>{item.pod}</p>
                                                            <div><img src='/drop.png' /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </>
                            })
                    }
                </div>
            </div>
        </div >
    )
}

export default Search