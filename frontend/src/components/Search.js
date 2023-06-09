import React from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Search = () => {
  const [subItem, setSubItem] = useState();
  const [user, setUser] = useState();
  const [subItemOpen, setSubItemOpen] = useState([]);
  const [data, setData] = useState();
  const [result, setResult] = useState();
  const [loader, setLoader] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [from, setFrom] = useState('Pol');
  const [to, setTo] = useState('JEA');
  const navigate = useNavigate();
  const [slotTerm, setSlotTerm] = useState([]);
  const [month, setMonth] = useState("");
  const [count, setCount] = useState(10);
  const [year, setYear] = useState()
  const months = [
    "January",
    "February",
    "March",
    "April",
   
  ];
  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
   
  };
  const years = [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    navigate("/");
  };
  const handleYear = (event) => {
    setYear(event.target.value)
  }
  const [slotOperatorName, setSlotOperatorName] = useState([]);
  const [terminal, setTerminal] = useState([]);
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


  const handleSelectChange2 = (selectedOption) => {
    setFrom(selectedOption.value);
  };


  const handleSelectChange3 = (selectedOption) => {
    setTo(selectedOption.value);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get("http://20.236.136.145/getAllData");
      console.log(response.data)
      setData(response.data);
      setResult(response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
    getUser();
  }, []);

  //Slot Operator Name unique dynamic list 
  const uniqueSlotOpertors = useMemo(() => {
    const list = [];
    result?.filter((itm) => {
      if (!list?.find((dt) => itm?.service?.slot_op_name === dt) && itm?.service?.slot_op_name) {
        list?.push(itm?.service?.slot_op_name)
      }
    })
    return list;
  }, [result]);

//Terminal unique dynamic list 
  const uniqueTerminals = useMemo(() => {
    const list = [];
    result?.filter((itm) => {
      if (!list?.find((dt) => itm?.terminal === dt) && itm?.terminal) {
        list?.push(itm?.terminal)
      }
    })
    return list;
  }, [result]);

//Slot Name unique dynamic list 
  const uniqueSlotName = useMemo(() => {
    const list = [];
    result?.filter((itm) => {
      if (!list?.find((dt) => itm?.Slot_term === dt) && itm?.Slot_term) {
        list?.push(itm?.Slot_term)
      }
    })
    return list;
  }, [result]);


  const getUser = () => {
    const storedUser = JSON.parse(window.localStorage.getItem("user"));
    setUser(storedUser);
  };



  const handleSerach = () => {
    setLoader(true);
    const customdata = result;
    const filteredData = customdata.filter((item) => {
      const monthDate2 = getFormattedDate(month);
      var date = item.attribute.VALIDITY;
      var realmonth = date?.split(".")[1];
      var realmonth2 = monthDate2?.split(".")[1];
      if (item.pod !== to) {
        return false;
      }
      
      if(new Date(item?.attribute?.EFFECTIVE_DATE?.split(".")[2]).getFullYear()!=year){
        return false
      }
      const monthDate = getFormattedDate(month);
      if (realmonth !== realmonth2) {
        return false;
      }
      return true;
    });
    setData(filteredData);
    setResult(filteredData);
    setLoader(false);
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.post("http://20.236.136.145/deleteData", {
        data: item.shipment_id,
      });
      alert("Data Delte Successfully");
      setLoader(true);
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [containerType, setContainerType] = useState("");

  const handleRadioChange = (event) => {
    setLoader(true);
    setContainerType(event.target.value);
  };

  const handleRadioChange2 = (event) => {
    if (slotOperatorName.includes(event.target.value)) {
      let result = slotOperatorName.filter((itm) => itm !== event.target.value);
      setSlotOperatorName(result)
    } else {
      setSlotOperatorName([...slotOperatorName, event.target.value])
    }
  };


  const handleRadioChange3 = (event) => {
    // setLoader(true);
    setTerminal(event.target.value);
  };

  const handleRadioChange4 = (event) => {
    // setLoader(true);
    setSlotTerm(event.target.value);
  };

  const handleClick = (event) => {
    if (isActive2) {
      setIsActive2(false);
    }
    setIsActive((current) => !current);
  };

  const handleClick2 = (event) => {
    if (isActive) {
      setIsActive(false);
    }
    setIsActive2((current) => !current);
  };

  const getCompanyLogo = (value) => {
    if (value == "BSS FEEDERS") {
      return "/bssfeeder.jpeg";
    } else if (value == "SWAN") {
      return "/swan.png";
    } else if (value == "Vira See") {
      return "/vira.png";
    } else if (value == "CORPORATE SHIPPING") {
      return "/vira.png";
    } else if (value == "FEEDER NAUTS") {
      return "/nauts.png";
    } else if (value == "MBA") {
      return "/mba.png";
    } else if (value == "SBC FEEDER") {
      return null;
      // return "/SBC FEEDER.png";
    } else if (value == "PAS SHIPPING") {
      return "/pas.png";
    } else if (value == "ANGLO") {
      return "/anglo.png";
    } else if (value == "RAGA SHIPPING") {
      return "/raga.png";
    } else if (value == "MARTRANS") {
      return "/Martrans.jpeg";
    } else if (value == "A.M Shpg/Great Alliance/ABDIS ") {
      return "/abdis.png";
    } else if (value == "DPG") {
      return "/DPG.png";
    } else if (value == "Star Feeder") {
      return "/star.jpeg";
    } else if (value == "Lubeck") {
      return "/lubeck.png";
    } else if (value == "Sealead") {
      return "/sealead.png";
    } else if (value == "Xpress") {
      return "/xpress.webp";
    } else if (value == "XPress") {
      return "/xpress.webp";
    } else if (value == "UNIFEEDER") {
      return "/unifeeder.webp";
    } else if (value == "GFS") {
      return "/gfs.jpeg";
    } else if (value == "DRAGON MARITIMO SEA") {
      return "/dragon.jpeg";
    } else if (value == "Doris") {
      return "/Doris.avif";
    } else if (value == "EMIRATES SHIPPING") {
      return "/emirates.png";
    } else if (value == "HLL GLOBAL") {
      return "/hmm.png";
    } else if (value == "CMA CGM") {
      return "/cma.png";
    } else if (value == "Wet Blue Sheep Skins") {
      return "/web.png";
    }
    return null;
    // return "/complogo.png";
  };

  const options = [
    { value: "Pol", label: "Pol" },
    { value: "JEA", label: "JabelAli" },
    { value: "BND", label: "Bnd" },
    { value: "IRAN", label: "Iran" },
    { value: "KANDLA", label: "Kandla" },
    { value: "BUSHEHR", label: "Bushehr" },
    { value: "NHAVA SHEVA", label: "NhavaSheva" },
    { value: "MUNDRA", label: "Mundra" },
    { value: "MOMBASA", label: "Mombasa" },
    { value: "BANDAR IMAM KHOMEINI", label: "BandarImamKhomeini" },
    { value: "BUSHEHR", label: "Bushehr" },
    { value: "KHORRAM SHAHR", label: "KhorramShahr" },
    { value: "Assalouyeh", label: "Assalouyeh" },
    { value: "ABU DHABI", label: "AbuDhabi" },
    { value: "DAR ES SALAM", label: "DarEsSalam" },
    { value: "TANGER MED", label: "TangerMed" },
    { value: "CASABLANCA", label: "Casablanca" },
    { value: "HAMAD", label: "Hamad" },
    { value: "COLOMBO", label: "Colombo" },
    { value: "COCHIN", label: "Cochin" },
    { value: "CHENNAI", label: "Chennai" },
    { value: "PORT KLANG", label: "PortKlang" },
    { value: "SINGAPORE", label: "Singapore" },
    { value: "SHANGHAI", label: "Shanghai" },
    { value: "SHEKOU", label: "Shekou" },
    { value: "HAZIRA", label: "Hazira" },
    { value: "PIPAVA", label: "Pipava" },
  ];

  const handleSubItemToggle = (index) => {
    console.log(index);
    const newSubItemOpen = [...subItemOpen];
    newSubItemOpen[index] = !newSubItemOpen[index];
    setSubItemOpen(newSubItemOpen);
  };



  //side bar filter handler
  const filterHandler = () => {
    const filterData = result?.filter((item) => {
      if (slotOperatorName || terminal || slotTerm) {
        let returnValue = false

        if (slotOperatorName?.length) {
          if (terminal && slotTerm) {
            if ((item.Slot_term === slotTerm)  && (slotOperatorName.includes(item?.service?.slot_op_name))) {
              returnValue = true
            }
          } else if (terminal) {
            if ((item?.terminal === terminal) && (slotOperatorName.includes(item?.service?.slot_op_name))) {
              returnValue = true
            }
          } else if (slotTerm) {
            if ((item.Slot_term === slotTerm) && (slotOperatorName.includes(item?.service?.slot_op_name))) {
              returnValue = true
            }
          } else {
            if ((slotOperatorName.includes(item?.service?.slot_op_name))) {
              returnValue = true
            }
          }
        }



        if (terminal) {
          if (slotOperatorName?.length && slotTerm) {
            if ((item.Slot_term === slotTerm) && (item?.terminal === terminal) && ((slotOperatorName.includes(item?.service?.slot_op_name)))) {
              returnValue = true
            }
          } else if (slotOperatorName?.length) {
            if ((item?.terminal === terminal) && (slotOperatorName.includes(item?.service?.slot_op_name))) {
              returnValue = true
            }
          } else if (slotTerm) {
            if ((item.Slot_term === slotTerm) && (item?.terminal === terminal)) {
              returnValue = true
            }
          } else {
            if (item?.terminal === terminal) {
              returnValue = true
            }
          }
        }


        if (slotTerm) {
          if (slotOperatorName?.length && terminal) {
            if ((item.Slot_term === slotTerm) && (item?.terminal === terminal) && (slotOperatorName.includes(item?.service?.slot_op_name))) {
              returnValue = true
            }
          } else if (slotOperatorName?.length) {
            if ((item.Slot_term === slotTerm) && (slotOperatorName.includes(item?.service?.slot_op_name))) {
              returnValue = true
            }
          } else if (terminal) {
            if ((item.Slot_term === slotTerm) && (item?.terminal === terminal)) {
              returnValue = true
            }
          } else {
            if (item.Slot_term === slotTerm) {
              returnValue = true
            }
          }
        }

        return returnValue;
      }
      return true;
    });
    setData(filterData)
  }


  useEffect(() => {
    if (slotOperatorName?.length || terminal || slotTerm) {
      filterHandler()
    }
  }, [slotOperatorName, terminal, slotTerm])



  return (
    <div className="mainContainer">
      <div className="navbar">
        <img src="/logo.png" className="logo" />
        <div>
          <ul className="menu">
            {user?.roles == "Editer" && (
              <>
                <li>
                  <button
                    className="mybtn"
                    onClick={() => {
                      navigate("/addData");
                    }}
                  >
                    Add New Slot
                  </button>
                </li>
              </>
            )}

            <li>
              <button
                className="mybtn"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="searchBar">
        <div className="searchtopbar">
          <p className="first">TransportationBy</p>
          <p className="second">OriginOfShipment</p>
          <p className="third">DestinationOfShipment</p>
          <p className="fourth">Month</p>
        </div>
        <div className="innerSearchBar">
          <div className="d-flex first">
            <button className={isActive ? "seabutton " : "landbutton"}>
              Sea
            </button>
          </div>
          <div class="my-div second"></div>
          <div className="d-flex third">
            <button className={isActive2 ? "seabutton " : "landbutton"}>
              Land
            </button>
          </div>
          <div class="my-div fourth"></div>
          <div className="input-container fifth">
            <img src="/marker.png" />
            <Select
              className="input-field no-border greyish"
              value={{ value: from, label: from }}
              options={options}
              onChange={handleSelectChange2}
            />
          </div>
          <div class="my-div sixth"></div>
          <div className="input-container seventh ">
            <img src="/marker.png" />
            <Select
              className="input-field no-border greyish"
              value={{ value: to, label: to }}
              options={options}
              onChange={handleSelectChange3}
            />

          </div>
          <div class="my-div eigth"></div>
          <div className="input-container nine">
            <img src="/calendar.png" className="width-10" />
            <select
              className="select-field greyish"
              value={month}
              onChange={handleSelectChange}
            >
              <option value="">Month</option>
              {months.map((monthName) => (
                <option key={monthName} value={monthName}>
                  {monthName}
                </option>
              ))}
            </select>
          </div>




          <div className="input-container nine ninemiddle">
            <img src="/calendar.png" className="width-10" />
            <select
              className="select-field greyish"
              value={year}
              onChange={handleYear}
            >
              <option value="">Year</option>
                {years.map((yearsitem) => (
                <option key={yearsitem} value={yearsitem}>
                  {yearsitem}
                </option>
              ))}
            </select>
          </div>



          <div className="ten">
            <img
              src="/serac.jpg"
              className="serachImage"
              onClick={handleSerach}
            />
          </div>
        </div>
      </div>
      <div className="mainData">
        <div className="filters">
          <div className="innerFilter ">
            <h1 className="innerFilterh1">Slot Operator Name</h1>
            <div>
              {uniqueSlotOpertors?.map((itm) => {
                return (
                  <div className="item"
                    style={{ boxShadow: "none", margin: "0", padding: 0 }}
                  >
                    <input
                      type="checkbox"
                      name="slotop"
                      value={itm}
                      onChange={handleRadioChange2}
                    />
                    <p>{itm}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="innerFilter ">
            <h1 className="innerFilterh1">Terminal</h1>
            <div>
              {uniqueTerminals?.map((itm) => {
                return (
                  <div
                    className="item"
                    style={{ boxShadow: "none", margin: "0", padding: 0 }}
                  >
                    <input
                      type="radio"
                      name="term"
                      value={itm}
                      onChange={handleRadioChange3}
                    />
                    <p>{itm}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="innerFilter ">
            <h1 className="innerFilterh1">Slot Term</h1>
            <div>
              {uniqueSlotName?.map((itm) => {
                return (
                  <div
                    className="item"
                    style={{ boxShadow: "none", margin: "0", padding: 0 }}
                  >
                    <input
                      type="radio"
                      name="containerType"
                      value={itm}
                      onChange={handleRadioChange4}
                    />
                    <p>{itm}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="listing">
          <div className="firstItem">
            <button>Cheaper</button>
          </div>

          {loader ? (
            <div className="flexerr">
              <div class="spinner-grow text-primary" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          ) : (
            data?.slice(count - 10, count).map((item, index) => {
              const logo = getCompanyLogo(item?.service?.slot_op_name);
              return (
                <>
                  <div className="outerContainer">
                    <div className="item">
                      <div className="itemFirst">
                        <div className="complogocontainer">
                          {logo ? (
                            <img src={logo} className="company-name" />
                          ) : (
                            <span className="non-logo">
                              {item?.service?.slot_op_name?.charAt(0)}
                            </span>
                          )}
                          <h1>
                            {item?.service?.slot_op_name
                              ? item?.service?.slot_op_name?.charAt(0) +
                              item?.service.slot_op_name
                                ?.slice(1)
                                .toLowerCase()
                              : "Service Name"}
                          </h1>
                        </div>

                        <div className="sourcedest">
                          <p>
                            {item.pol
                              ? item.pol?.charAt(0) +
                              item?.pol?.slice(1)?.toLowerCase()
                              : "Pol"}
                          </p>
                          <p>
                            {item.pod
                              ? item.pod?.charAt(0) +
                              item?.pod?.slice(1)?.toLowerCase()
                              : "Pod"}
                          </p>
                        </div>
                        <div className="hori">
                          <div className="outlined-circle"></div>
                          <div class="my-div2">
                            <hr />
                          </div>
                          <div className="outlined-circle"></div>
                          <div class="my-div2 dd22">
                            <p>4 Days</p>
                            <img src="/ship.png" className="shipimage" />
                            <hr />
                          </div>
                          <div className="outlined-circle"></div>
                          <div class="my-div2">
                            <hr />
                          </div>
                          <div className="outlined-circle"></div>
                        </div>
                      </div>

                      <div className="itemSecond">
                        <div className="first">
                          <div className="righter"></div>
                          <div className="validity">
                            <p className="title">Validity:</p>
                            <p className="date">{item.attribute.VALIDITY}</p>
                          </div>
                          <div className="expiry">
                            <p className="title">Expiry:</p>
                            <p className="date">{item.attribute.datetime}</p>
                          </div>
                          <button className="gradBtn">
                            {Number(item.attribute.LDN_20ft)}
                          </button>
                          {user?.roles == "Editer" && (
                            <>
                              <div className="flexer">
                                <button
                                  className="deletebtn btn2"
                                  onClick={() => {
                                    navigate(`editData/${item.shipment_id}`);
                                  }}
                                  style={{
                                    background: "#bdffcc",
                                    color: "black",
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="deletebtn btn2"
                                  onClick={() => handleDelete(item)}
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                        <div
                          className="second dropsub"
                          onClick={() => handleSubItemToggle(index)}
                        >
                          <img src="/drop.png" />
                        </div>
                      </div>
                    </div>
                    {subItemOpen[index] && (
                      <div className="itemSubItem">
                        <div className="subItem">
                          <div className="first">
                            <input type="checkbox" disabled />
                            <div>
                              <img src="/3.png" />
                            </div>
                            <p>Delivery</p>
                          </div>
                          <div className="second">
                            <p>Not available</p>
                            <div>
                              <img src="/drop.png" />
                            </div>
                          </div>
                        </div>
                        <div className="subItem">
                          <div className="first">
                            <input type="checkbox" disabled />
                            <div>
                              <img src="/1.png" />
                            </div>
                            <p>Port Of Origin</p>
                          </div>
                          <div className="second">
                            <p>{item.pol ? item.pol : "JEA"} </p>
                            <div>
                              <img src="/drop.png" />
                            </div>
                          </div>
                        </div>
                        <div className="subItem">
                          <div className="first">
                            <input type="checkbox" disabled />
                            <div>
                              <img src="/2.png" />
                            </div>
                            <p>Port Of Delivery</p>
                          </div>
                          <div className="second">
                            <p>{item.pod}</p>
                            <div>
                              <img src="/drop.png" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })
          )}
          {data?.length > 10 && (
            <div className="pagination__container">
              <button
                className={`btn btn-primary ${count > 11 ? "" : "disabled"}`}
                onClick={() => {
                  setCount(count - 10);
                }}
              >
                Pervious
              </button>
              <button
                className={`btn btn-primary ${count < data.length ? "" : "disabled"
                  }`}
                onClick={() => {
                  setCount(count + 10);
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
