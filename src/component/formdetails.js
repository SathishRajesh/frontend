import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function Formdetails(props) {
  console.log(props,'llllllllllllllllllllllllll')
  const [submittedData, setSubmitteddata] = useState([]);
  const [formview, setFormView] = useState();
  const [editModal, setEditModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState();
  const [inputdata, setinputdata] = useState([]);
  const [isModalopen, setIsmodalopen] = useState();
  const [index, setIndex] = useState();
  const [typeOf, setTypeOf] = useState();
  const [outputarr, setoutputarr] = useState();
  const [temp,setTemp]=useState();
  const [currentData, setCurrentdata] = useState();
  //   const [userList] = useState(JSON.parse(localStorage.getItem("data1")));
  
  const [forms, setForms] = useState({
    label: "",
    placeHolder: "",
  });
  const input = [
    { name: "text" },
    { name: "select" },
    { name: "radio" },
    { name: "check" },
  ];
   const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-formdata")
      .then((res) => {
        const { data = [] } = res?.data || {};
        if (data && data?.length) {
          setSubmitteddata(data);
          console.log(data, "dfghjuk");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [columnDefs] = useState([
    { field: "formname" },
    { field: "submittedForm" },
    { field: "username" },
    { field: "date" },
    {
      field: "view",
      cellRenderer: ({ data }) => {
        return (
          <div>
            <Button
               variant="contained"
              size="small"
              onClick={() => {
                showModal();
                setCurrentdata(data.submittedForm);
                setTemp(data);
              }}
            >
              view
            </Button>
          </div>
        );
      },
    },
    {
      field: "submission",
      cellRenderer: ({ data }) => {
        return (
          <div>
            <Button
               variant="contained"
              size="small"
              onClick={() => {
                showModal();
                setCurrentdata(data.submittedForm);
                setTemp(data);
              }}
            >
              submission
            </Button>
          </div>
        );
      },
    },
    {
      field: "submission view",
      cellRenderer: ({ data }) => {
        return (
          <div>
            <Button
              variant="contained"
           
              size="small"
              className=" box-border  p-2 bg-red-400 rounded "
              onClick={() => {
                Navigate("/submittedview");
                props.setSubmittedview(data);
                localStorage.setItem("data",JSON.stringify(data))
              }}
            >
              submission View
            </Button>
          </div>
        );
      },
    },

    {
      field: "Edit",
      cellRenderer: ({ data }) => {
        return (
          <div>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                showModalEdit();
                setFormView(data.submittedForm);
                setIndex(data);
                setTemp(data)
             //   handleEditFunction(data);
              }}
            >
              EDIT
            </Button>
          </div>
        );
      },
    },

    {
      field: "Delete",
      cellRenderer: ({ data }) => {
        return (
          <div>
            <Button
               variant="contained"
              size="small"
              color="error"
              className=""
              onClick={() => {
                handleDelete(data);
                handleDelFunction(data);
              }}
            >
              delete
            </Button>
          </div>
        );
      },
    },
  ]);

  const showModal = () => {
    setEditModal(true);
  };
  // const showModalOk = () => {
  //   setEditModal(false);
  // };
  const showModalcancel = () => {
    setEditModal(false);
  };

  const handleDelete = (data) => {
    const id = data._id;
    setSubmitteddata((prev) => {
      const index = prev.findIndex((i) => i._id === id);
      const arr = prev;
      arr.splice(index, 1);
      return [...arr];
    });
  };
  const handleDelFunction = (i) => {
    const id = i._id;
    console.log(props, "????????");
    axios
      .delete(`http://localhost:5000/delete-formdata/${id}`, {
        headers: { Authorization: `Bearer ${props.validate}` },
      })
      .then((res) => {
        setSubmitteddata(res.data.data)
        if (res.data.message) {
          alert(res.data.message);
        }
      });
  };
console.log(props.newformdetails ,"sathishhh")
  const handleEditFunction = () => {
    const id = temp._id;
    console.log(id,props.validate, "------");
    const currentDate = new Date();
    axios
      .patch(
        `http://localhost:5000/patch-formdata/${id}`,
        { username: props.newformdetails,
        submittedForm:{...formview},
        date:currentDate},{
          headers: { Authorization: `Bearer ${props.validate}` },
        },{
          headers: { token: `Bearer ${props.validate}` },
        }
       
      )
      .then((res) => {
        console.log(res.data.data,'lllllll')
        setSubmitteddata(res.data.data);
        if (res.data.message) {   
          
          alert(res.data.message);
        }
      });
  };

  const submittedFormdata = () => {
    const id = temp._id;
   // const val=props.validate

    const currentDate = new Date();
    axios.patch(`http://localhost:5000/patch-submittedForm/${id}`, {
      submittedData: { ...currentData},
      username: props.newformdetails,
      date: currentDate,
      
    },{
      headers: { Authorization: `Bearer ${props.validate}` },
    });
    console.log(submittedData,"iddd")
    const dummy = [...submittedData];
    dummy[index] = {...dummy[index], submittedData: currentData };
    setSubmitteddata(dummy);
    
 
    // seteditButton(false)
  };

  const handleSave = (e) => {
    const { name, value } = e.target;
    setForms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChange = (name) => {
    if (name === "text") {
      const input = [...formview, { type: "text", label: "",value:"", placeHolder: "" }];
      setFormView(input);
    }
    if (name === "select") {
      const input = [
        ...formview,
        { type: "select", label: "",value:"", arr: ["option1", "option2"] },
      ];
      setFormView(input);
    }
    if (name === "radio") {
      const input = [
        ...formview,
        { type: "radio", label: "", value:"",arr: ["Male", "Female"] },
      ];
      setFormView(input);
    }
    if (name === "check") {
      const input = [
        ...formview,
        { type: "checkbox", label: "",value:"", arr: ["True", "False"] },
      ];
      setFormView(input);
    }
  };
  const edit = () => {
    formview[index] = {
      type: typeOf,
      label: forms?.label,
      placeHolder: forms?.placeHolder,
      arr: outputarr?.arr,
    };
  };
  const handledelete = (i) => {
    setinputdata((prev) => {
      const arr = [...prev];
      arr.splice(i, 1);
      return arr;
    });
  };

  const handledelete1 = (i) => {
    setFormView((prev) => {
      const arr = [...prev];
      arr.splice(i, 1);
      return arr;
    });
  };
  const valueset = () => {
    inputdata[index] = (
      <div>
        <label>{forms.label}:</label>
        <input
          placeholder={forms.placeHolder}
          className="border border-black p-2"
        ></input>
      </div>
    );
    setForms({
      label: "",
      placeHolder: "",
    });
  };
  const showModalEdit = () => {
    setIsmodalopen(true);
  };
  const showModalEditOk = () => {
    setIsmodalopen(false);
  };
  const showModalEditcancel = () => {
    setIsmodalopen(false);
  };

  const showModaleditopen = () => {
    setEditModalOpen(true);
  };
  const showModaleditopenok = () => {
    setEditModalOpen(false);
  };
  const showModalEditopencancel = () => {
    setEditModalOpen(false);
  };

  const add = () => {
    const updateoptions = [...outputarr.arr, "New option"];
    setoutputarr((prevtype) => ({ ...prevtype, arr: updateoptions }));
  };
  const DeleteOption = (i) => {
    const del = [...outputarr.arr];
    del.splice(i, 1);
    setoutputarr((prev) => ({ ...prev, arr: del }));
  };

  // const handleSubmit = () =>{
  //   const currentDate = new Date();
  //   axios.post("http://localhost:5000/post-formdata",{formname:formName,date:currentDate,submittedForm:inputdata,username:props.newform})
  //   .then(()=>{
  //     setinputdata([]);
  //     setFormname("");
  //   })
  //   .catch((err)=>{
  //     if(err.response.data.message)
  //     {
  //       alert(err.response.data.message)
  //     }
  //   });

  // }

  return (
    <div>
      <Navbar></Navbar>
      
      <div>
        <Modal open={editModal} onCancel={showModalcancel}  onOk={() => {showModalcancel(); submittedFormdata() }}>
          <div>
            {currentData &&
              currentData.map((item, i) => {
                return (
                  <div key={i}>
                    {item.type === "text" ? (
                      <div>
                        <label>{item.label} </label>
                        <input
                          className=" border border-black "
                          placeholder={item.placeHolder}
                         value={item.value}
onChange={(e) => {
                        setCurrentdata((prevData) => {
                          const updatedData = [...prevData];
                          console.log(prevData, "ooooooo");
                          updatedData[i].value = e.target.value;
                          return updatedData;
                        });
                      }}
                        ></input>
                      </div>
                    ) : item.type === "select" ? (
                      <div>
                        <label>{item.label}</label>
                        
                        <select className="p-2"
                        onChange={(e) => {
                        setCurrentdata((prevData) => {
                          const updatedData = [...prevData];
                          console.log(prevData, "ooooooo");
                          updatedData[i].value = e.target.value;
                          return updatedData;
                        });
                      }}>
                          {item?.arr.map((data, index) => {
                            return <option key={index}>{data}</option>;
                          })}
                        </select>
                   
                      </div>
                    ) : item.type === "radio" ? (
                      <div>
                        
                        {item.arr.map((data, index) => {
                          return (
                            <div key={index}>
                              
                              <input
                                type="radio"
                                id={{ i }}
                                name={{ i }}
                                value={data}
                                onChange={() => {
                                  setCurrentdata((prevData) => {
                                    const updatedData = [...prevData];
                                    updatedData[i].value = data;
                                    return updatedData;
                                  });
                                }}
                                checked={item.value === data}
                              ></input>
                              <label>{data}</label>
                            </div>
                          );
                        })}
                      </div>
                    ) : item.type === "checkbox" ? (
                      <div>
                        <label>{item?.label}</label>

                        {item?.arr.map((data, index) => {
                          return (
                            <div key={index}>
                              <input
                                type="checkbox"
                                className="border border-black"
                                onChange={() => {
                                  setCurrentdata((prevData) => {
                                    const updatedData = [...prevData];
                                    updatedData[i].value = data;
                                    return updatedData;
                                  });
                                }}
                                checked={item.value === data}
                              />
                              <label>{data}</label>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </Modal>
      </div>
      <div>
        <div
          className="ag-theme-alpine"
          style={{
            height: 500,
            width: "90%",
            marginTop: "20px",
            margin: "10px",
          }}
        >
          <AgGridReact
            rowData={submittedData}
            columnDefs={columnDefs}
          ></AgGridReact>
        </div>
        <Modal
          title="Basic Modal"
          open={isModalopen}
          onOk={() => {
            showModalEditOk();
            handleEditFunction();
             edit();
          }}
          onCancel={showModalEditcancel}
        >
          <div>
          sadfewstfs
            {input.map((item, i) => {
              return (
                <Button
                  onClick={() =>handleChange(item.name)}
                >{`Add ${item.name}`}</Button>
              );
            })}
          </div>

          <div>
            <div>
              {formview &&
                formview.map((item, i) => {
                  return (
                    
                    <div key={i}>
                    
                      {item.type === "text" ? (
                        <div>
                          <label>{item.label} </label>
                          <input
                            className=" border border-black "
                            placeholder={item.placeHolder}
                          ></input>
                        </div>
                      ) : item.type === "select" ? (
                        <div>
                          <label>{item.label}</label>
                          <select className="p-2">
                            {item?.arr.map((data, i) => {
                              return <option key={i}>{data}</option>;
                            })}
                          </select>
                        </div>
                      ) : item.type === "radio" ? (
                        <div>
                          {item.arr.map((data, i) => {
                            return (
                              <div key={i}>
                                <input
                                  type="radio"
                                  id={{ i }}
                                  name={{ i }}
                                  value={data}
                                ></input>
                                <label>{data}</label>
                              </div>
                            );
                          })}
                        </div>
                      ) : item.type === "checkbox" ? (
                        <div>
                          <label>{item?.label}</label>

                          {item?.arr.map((data, i) => {
                            return (
                              <div key={i}>
                                <input
                                  type="checkbox"
                                  className="border border-black"
                                />
                                <label>{data}</label>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                      <Button
                        onClick={() => {
                          setIndex(i);
                          setTypeOf(item.type);
                          setoutputarr(item);
                          showModaleditopen();
                          setForms({label:item.label,placeHolder:item.placeHolder})
                          console.log(editModalOpen, "oooooo");
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          handledelete1(i);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="">
            {inputdata.map((item, i) => {
              console.log(item);
              return (
                
                <div key={i}>
                  {item.type === "text" ? (
                    <div>
                      <label>{item.label} </label>
                      <input
                        className=" border border-black "
                        placeholder={item.placeHolder}
                      ></input>
                    </div>
                  ) : item.type === "select" ? (
                    <div>
                      <label>{item.label}</label>
                      <select className="p-2">
                        {item?.arr.map((data, i) => {
                          return <option key={i}>{data}</option>;
                        })}
                      </select>
                    </div>
                  ) : item.type === "radio" ? (
                    <div>
                      {item.arr.map((data, i) => {
                        return (
                          <div key={i}>
                            <input
                              type="radio"
                              id={{ i }}
                              name={{ i }}
                              value={data}
                            ></input>
                            <label>{data}</label>
                          </div>
                        );
                      })}
                    </div>
                  ) : item.type === "checkbox" ? (
                    <div>
                      <label>{item?.label}</label>

                      {item?.arr.map((data, i) => {
                        return (
                          <div key={i}>
                            <input
                              type="checkbox"
                              className="border border-black"
                            />
                            <label>{data}</label>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  <Button
                    onClick={() =>{
                      setIndex(i);
                      setTypeOf(item.type);
                      setoutputarr(item);
                      showModaleditopen();
                     valueset()
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handledelete(i)}>Delete</Button>
                </div>
              );
            })}
          </div>
        </Modal>
        <Modal
          title="Basic Modal"
          open={editModalOpen}
          onOk={() => {
            showModaleditopenok();
            edit();
           
          }}
          onCancel={showModalEditopencancel}
        >
          {typeOf === "text" ? (
            <div>
              Label:
              <input
                name="label"
                value={forms?.label}
                onChange={handleSave}
                className="border border-black"
              ></input>
              placeHolder:{" "}
              <input
                name="placeHolder"
                value={forms?.placeHolder}
                onChange={handleSave}
                className="border border-black"
              ></input>
            </div>
          ) : (
            <div>
              Label:
              <input
                name="label"
                value={forms?.label}
                onChange={handleSave}
                className="border border-black"
              ></input>
              {outputarr &&
                outputarr?.arr.map((data, i) => {
                  return (
                    <div key={i}>
                      <input
                        className="border border-black"
                        onChange={(e) => {
                          const updateOption = [...outputarr.arr];
                          updateOption[i] = e.target.value;
                          setoutputarr((prev) => ({
                            ...prev,
                            arr: updateOption,
                          }));
                        }}
                      />
                      <Button onClick={() => DeleteOption(i)}>Delete</Button>
                    </div>
                  );
                })}
              <Button type="primary" onClick={() => add()}>
                ADD
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
