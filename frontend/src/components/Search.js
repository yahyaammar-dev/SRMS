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
  const [from, setFrom] = useState("JEBEL ALI");
  const [to, setTo] = useState("BANDAR ABBAS");
  const navigate = useNavigate();
  const [slotTerm, setSlotTerm] = useState([]);
  const [month, setMonth] = useState("June");
  const [count, setCount] = useState(10);
  const [year, setYear] = useState(2023);
  const [tempResult, setTempResult] = useState();
  const [filteredPolsPods, setFilteredPolsPods] = useState();
  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
  ];

  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    March: "04",
    May: "05",
    June: "06",
  };

  const years = [
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
  ];

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    navigate("/");
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
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

  const handleSelectChangeMonth = (selectedOption) => {
    setMonth(selectedOption.value);
  };

  const handleSelectChangeYear = (selectedOption) => {
    setYear(selectedOption.value);
  };

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await axios.get("http://20.236.136.145/getAllData");
      console.log(response)
      const sortedData = response?.data?.sort((a, b) => {
        const priceA = parseInt(a.attribute.LDN_20ft);
        const priceB = parseInt(b.attribute.LDN_20ft);

        return priceA - priceB;
      });

      const pods = sortedData.map((item) => item.pod);
      const pols = sortedData.map((item) => item.pol);

      const options = [
        { value: "Assalouyeh", label: "Assalouyeh" },
        { value: "BANDAR ABBAS", label: "Bandar Abbas" },
        { value: "BANDAR IMAM KHOMEINI", label: "Bandar Imam Khomeini" },
        { value: "BAHRAIN", label: "Bahrain" },
        { value: "BUSHEHR", label: "Bushehr" },
        { value: "CHENNAI", label: "Chennai" },
        { value: "CHITTAGONG", label: "Chittagong" },
        { value: "COCHIN", label: "Cochin" },
        { value: "COLOMBO", label: "Colombo" },
        { value: "HAMAD", label: "Hamad" },
        { value: "IND", label: "IND" },
        { value: "JEBEL ALI", label: "Jebel Ali" },
        { value: "JEDDAH", label: "Jeddah" },
        { value: "KANDLA", label: "Kandla" },
        { value: "KHORRAM SHAHR", label: "Khorram Shahr" },
        { value: "LAEM CHABANG", label: "Laem Chabang" },
        { value: "MALE", label: "Male" },
        { value: "MOMBASA", label: "Mombasa" },
        { value: "MUNDRA", label: "Mundra" },
        { value: "NHAVA SHEVA", label: "Nhava Sheva" },
        { value: "PORT KLANG", label: "Port Klang" },
        { value: "QINGDAO", label: "Qingdao" },
        { value: "SHANGHAI", label: "Shanghai" },
        { value: "SHUWAIKH", label: "Shuwaikh" },
        { value: "SOHAR", label: "Sohar" },
        { value: "UMM QSAR", label: "Umm Qsar" }
      ];
      
      console.log(sortedData)
    
      setFilteredPolsPods(options);
      setTempResult(sortedData);
      setData(sortedData);
      setResult(sortedData);
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
      if (
        !list?.find((dt) => itm?.service?.slot_op_name === dt) &&
        itm?.service?.slot_op_name
      ) {
        list?.push(itm?.service?.slot_op_name);
      }
    });

    const sortedNames = list.sort((a, b) => a.localeCompare(b));

    const uniqueStrings = Array.from(new Set(sortedNames));
    console.log(uniqueStrings)
    return uniqueStrings;
  }, [result]);

  //Terminal unique dynamic list
  const uniqueTerminals = useMemo(() => {
    const list = [];
    result?.filter((itm) => {
      if (!list?.find((dt) => itm?.terminal === dt) && itm?.terminal) {
        list?.push(itm?.terminal);
      }
    });
    const sortedNames = list.sort((a, b) => a.localeCompare(b));
    const filteredArray = sortedNames.filter(
      (item) => typeof item === "string" && /^[a-zA-Z]+$/.test(item)
    );
    return filteredArray;
  }, [result]);

  //Slot Name unique dynamic list
  const uniqueSlotName = useMemo(() => {
    const list = [];
    result?.filter((itm) => {
      if (!list?.find((dt) => itm?.Slot_term === dt) && itm?.Slot_term) {
        list?.push(itm?.Slot_term);
      }
    });
    const sortedNames = list.sort((a, b) => a.localeCompare(b));
    return sortedNames;
  }, [result]);

  const getUser = () => {
    const storedUser = JSON.parse(window.localStorage.getItem("user"));
    setUser(storedUser);
  };

  const handleSearch = () => {
    setLoader(true);
    const customdata = tempResult;
    const filteredData = customdata.filter((item) => {
      const monthDate2 = getFormattedDate(month);
      var date = item.attribute.VALIDITY;
      var realmonth = date?.split(".")[1];
      var realmonth2 = monthDate2?.split(".")[1];
      if (item.pol !== from) {
        return false;
      }
      if (item.pod !== to) {
        return false;
      }
      if (
        new Date(
          item?.attribute?.EFFECTIVE_DATE?.split(".")[2]
        ).getFullYear() != year
      ) {
        return false;
      }
      const monthDate = getFormattedDate(month);
      if (realmonth !== realmonth2) {
        return false;
      }
      return true;
    });
    console.log(filteredData);
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
      setSlotOperatorName(result);
    } else {
      setSlotOperatorName([...slotOperatorName, event.target.value]);
    }
  };

  const handleRadioChange3 = (event) => {
    // setLoader(true);
    // setTerminal(event.target.value);

    if (terminal?.includes(event.target.value)) {
      let result = terminal.filter((itm) => itm !== event.target.value);
      setTerminal(result);
    } else {
      setTerminal([...terminal, event.target.value]);
    }
  };

  const handleRadioChange4 = (event) => {
    // setLoader(true);
    // setSlotTerm(event.target.value);

    if (slotTerm?.includes(event.target.value)) {
      let result = slotTerm.filter((itm) => itm !== event.target.value);
      setSlotTerm(result);
    } else {
      setSlotTerm([...slotTerm, event.target.value]);
    }
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
      return "/Doris.png";
    } else if (value == "EMIRATES SHIPPING") {
      return "/emirates.png";
    } else if (value == "HLL GLOBAL") {
      return "/hmm.png";
    } else if (value == "CMA CGM") {
      return "/cma.png";
    } else if (value == "Wet Blue Sheep Skins") {
      return "/web.png";
    } else if (value == "Inzu / skz shipping") {
      return "/inzu.png";
    } else if (value == "Hapag") {
      return "/hapag.png";
    }
    return null;
    // return "/complogo.png";
  };

  const options = [
    { value: "ABU DHABI", label: "AbuDhabi" },
    { value: "Assalouyeh", label: "Assalouyeh" },
    { value: "BANDAR IMAM KHOMEINI", label: "BandarImamKhomeini" },
    { value: "BND", label: "Bnd" },
    { value: "BUSHEHR", label: "Bushehr" },
    { value: "CASABLANCA", label: "Casablanca" },
    { value: "CHENNAI", label: "Chennai" },
    { value: "COCHIN", label: "Cochin" },
    { value: "COLOMBO", label: "Colombo" },
    { value: "DAR ES SALAM", label: "DarEsSalam" },
    { value: "HAMAD", label: "Hamad" },
    { value: "HAZIRA", label: "Hazira" },
    { value: "IRAN", label: "Iran" },
    { value: "JEA", label: "JabelAli" },
    { value: "KHORRAM SHAHR", label: "KhorramShahr" },
    { value: "KANDLA", label: "Kandla" },
    { value: "MOMBASA", label: "Mombasa" },
    { value: "MUNDRA", label: "Mundra" },
    { value: "NHAVA SHEVA", label: "NhavaSheva" },
    { value: "PIPAVA", label: "Pipava" },
    { value: "PORT KLANG", label: "PortKlang" },
    { value: "SHEKOU", label: "Shekou" },
    { value: "SHANGHAI", label: "Shanghai" },
    { value: "SINGAPORE", label: "Singapore" },
    { value: "TANGER MED", label: "TangerMed" },
  ];

  const handleSubItemToggle = (index) => {
    const newSubItemOpen = [...subItemOpen];
    newSubItemOpen[index] = !newSubItemOpen[index];
    setSubItemOpen(newSubItemOpen);
  };

  //side bar filter handler
  const filterHandler = () => {
    const filterData = result?.filter((item) => {
      if (slotOperatorName?.length || terminal?.length || slotTerm?.length) {
        let returnValue = false;

        if (slotOperatorName?.length) {
          if (terminal?.length && slotTerm?.length) {
            if (
              slotTerm.includes(item.Slot_term) &&
              terminal.includes(item?.terminal) &&
              slotOperatorName.includes(item?.service?.slot_op_name)
            ) {
              returnValue = true;
            }
          } else if (terminal?.length) {
            if (
              terminal.includes(item?.terminal) &&
              slotOperatorName.includes(item?.service?.slot_op_name)
            ) {
              returnValue = true;
            }
          } else if (slotTerm?.length) {
            if (
              slotTerm.includes(item.Slot_term) &&
              slotOperatorName.includes(item?.service?.slot_op_name)
            ) {
              returnValue = true;
            }
          } else {
            if (slotOperatorName.includes(item?.service?.slot_op_name)) {
              returnValue = true;
            }
          }
        }

        if (terminal?.length) {
          if (slotOperatorName?.length && slotTerm?.length) {
            if (
              slotTerm.includes(item.Slot_term) &&
              terminal.includes(item?.terminal) &&
              slotOperatorName.includes(item?.service?.slot_op_name)
            ) {
              returnValue = true;
            }
          } else if (slotOperatorName?.length) {
            if (
              terminal.includes(item?.terminal) &&
              slotOperatorName.includes(item?.service?.slot_op_name)
            ) {
              returnValue = true;
            }
          } else if (slotTerm?.length) {
            if (
              slotTerm.includes(item.Slot_term) &&
              terminal.includes(item?.terminal)
            ) {
              returnValue = true;
            }
          } else {
            if (terminal.includes(item?.terminal)) {
              returnValue = true;
            }
          }
        }

        if (slotTerm?.length) {
          if (slotOperatorName?.length && terminal?.length) {
            if (
              slotTerm.includes(item.Slot_term) &&
              terminal.includes(item?.terminal) &&
              slotOperatorName.includes(item?.service?.slot_op_name)
            ) {
              returnValue = true;
            }
          } else if (slotOperatorName?.length) {
            if (
              slotTerm.includes(item.Slot_term) &&
              slotOperatorName.includes(item?.service?.slot_op_name)
            ) {
              returnValue = true;
            }
          } else if (terminal?.length) {
            if (
              slotTerm.includes(item.Slot_term) &&
              terminal.includes(item?.terminal)
            ) {
              returnValue = true;
            }
          } else {
            if (slotTerm.includes(item.Slot_term)) {
              returnValue = true;
            }
          }
        }

        return returnValue;
      }
      return true;
    });
    setData(filterData);
  };

  useEffect(() => {
    filterHandler();
  }, [slotOperatorName, terminal, slotTerm]);

  return (
    <div className="mainContainer">
      <div className="navbar">
        <img
          src="/logo.png"
          className="logo mainlogo"
          onClick={() => {
            fetchData();
          }}
        />
        <div>
          <ul className="menu">
            <li>
              <button
                className="mybtn"
                onClick={() => {
                  fetchData();
                }}
              >
               Reset Filters
              </button>
            </li>
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
          <p className="first">Transportation By</p>
          <p className="second">Origin Of Shipment</p>
          <p className="third">Destination Of Shipment</p>
          <p className="fourth">Month</p>
          <p className="fifth">Year</p>
        </div>
        <div className="innerSearchBar">
          <div className="d-flex first maindiv">
            <button className={isActive ? "seabutton " : "landbutton"}>
              Sea
            </button>
          </div>
          <div class="my-div second maindiv"></div>
          <div className="d-flex third maindiv">
            <button className={isActive2 ? "seabutton " : "landbutton"}>
              Land
            </button>
          </div>
          <div class="my-div fourth maindiv"></div>
          <div className="input-container fifth maindiv">
            <img src="/marker.png" />
            <Select
              className="input-field no-border greyish maindiv"
              value={{ value: from, label: from }}
              options={filteredPolsPods}
              onChange={handleSelectChange2}
            />
          </div>
          <div class="my-div sixth maindiv"></div>
          <div className="input-container seventh maindiv">
            <img src="/marker.png" />
            <Select
              className="input-field no-border greyish maindiv"
              value={{ value: to, label: to }}
              options={filteredPolsPods}
              onChange={handleSelectChange3}
            />
          </div>
          <div class="my-div eigth maindiv"></div>
          <div className="input-container nine maindiv">
            <img src="/calendar.png" className="width-10" />
            <Select
              className="input-field no-border greyish lesser-width"
              value={{ value: month, label: month }}
              options={months}
              onChange={handleSelectChangeMonth}
            />
          </div>

          <div className="input-container nine ninemiddle maindiv">
            <img src="/calendar.png" className="width-10" />
            <Select
              className="input-field no-border greyish lesser-width"
              value={{ value: year, label: year }}
              options={years}
              onChange={handleSelectChangeYear}
            />
          </div>

          <div className="ten maindiv">
            <img
              src="/serac.jpg"
              className="serachImage"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="mainData">
        <div className="filters">
          <div className="innerFilter ">
            <h1 className="innerFilterh1">Slot Operator Name</h1>
            <div className="filters--content">
              {uniqueSlotOpertors?.map((itm) => {
                return (
                  <div
                    className="item"
                    style={{ boxShadow: "none", margin: "0", padding: 0 }}
                  >
                    <input
                      type="checkbox"
                      name="slotop"
                      value={itm}
                      onChange={handleRadioChange2}
                    />
                    <p>{itm.charAt(0) + itm.slice(1).toLowerCase()}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {uniqueTerminals.length > 0 && (
            <div className="innerFilter ">
              <h1 className="innerFilterh1">Terminal</h1>
              <div className="filters--content">
                {uniqueTerminals?.map((itm) => {
                  return (
                    <div
                      className="item"
                      style={{ boxShadow: "none", margin: "0", padding: 0 }}
                    >
                      <input
                        type="checkbox"
                        name="term"
                        value={itm}
                        onChange={handleRadioChange3}
                      />
                      <p>{itm.charAt(0) + itm.slice(1).toLowerCase()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
                      type="checkbox"
                      name="containerType"
                      value={itm}
                      onChange={handleRadioChange4}
                    />
                    <p>{itm.charAt(0) + itm.slice(1).toLowerCase()}</p>
                  </div>
                );
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
                          <p>{item.pol ? item.pol?.toUpperCase() : "Pol"}</p>
                          <p>{item.pod ? item.pod?.toUpperCase() : "Pod"}</p>
                        </div>
                        <div className="hori">
                          <div className="outlined-circle"></div>
                          <div class="my-div2">
                            <hr />
                          </div>
                          <div className="outlined-circle"></div>
                          <div class="my-div2 dd22">
                            <p>{item?.transit_time}</p>
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
                            <p className="title">Validity: </p>
                            <p className="date">{item.attribute.VALIDITY}</p>
                          </div>
                          <div className="expiry">
                            <p className="title">Expiry:</p>
                            <p className="date">{item.attribute.datetime}</p>
                          </div>
                          <button className="gradBtn">
                            {Number(item.attribute.LDN_20ft) !== 0
                              ? Number(item.attribute.LDN_20ft)
                              : "Request Amount"}
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
                            <p>{item.pol ? item.pol : "JEBEL ALI"} </p>
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

          {!loader && data?.length > 10 && (
            <div className="pagination__container">
              <button
                className={`btn btn-primary ${count > 11 ? "" : "disabled"}`}
                onClick={() => {
                  setCount(count - 10);
                }}
              >
                Pervious
              </button>

              <p>
                {count / 10} / {(data.length / 10).toFixed()}{" "}
              </p>

              <button
                className={`btn btn-primary ${
                  count < data.length ? "" : "disabled"
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
