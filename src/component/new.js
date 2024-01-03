import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

export const New = (props) => {
  console.log(props, "ppppppppppppppppp");
  const [inputdata, setinputdata] = useState([]);
  const [isModalopen, setIsmodalopen] = useState();
  const [index, setIndex] = useState();
  const [typeOf, setTypeOf] = useState();
  const [outputarr, setoutputarr] = useState();
  const [formName, setFormname] = useState(localStorage.getItem("firstname"));
  const [username] = useState(localStorage.getItem("firstname"));
  // const [userList] = useState(JSON.parse(localStorage.getItem("data1")));
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
  const navigate = useNavigate();

  const handleSave = (e) => {
    const { name, value } = e.target;
    setForms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChange = (name) => {
    if (name === "text") {
      const input = [
        ...inputdata,
        { type: "text", label: "", value: "", placeHolder: "" },
      ];
      setinputdata(input);
    }
    if (name === "select") {
      const input = [
        ...inputdata,
        { type: "select", label: "", value: "", arr: ["option1", "option2"] },
      ];
      setinputdata(input);
    }
    if (name === "radio") {
      const input = [
        ...inputdata,
        { type: "radio", label: "", value: "", arr: ["Male", "Female"] },
      ];
      setinputdata(input);
    }
    if (name === "check") {
      const input = [
        ...inputdata,
        { type: "checkbox", label: "", value: "", arr: ["True", "False"] },
      ];
      setinputdata(input);
    }
  };
  const edit = () => {
    inputdata[index] = {
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
  const showModal = () => {
    setIsmodalopen(true);
  };
  const showModalOk = () => {
    setIsmodalopen(false);
  };
  const showModalcancel = () => {
    setIsmodalopen(false);
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

  const handleSubmit = () => {
    const currentDate = new Date();
    axios
      .post("http://localhost:5000/post-formdata", {
        formname: formName,
        date: currentDate,
        submittedForm: inputdata,
        username: username,
      })
      .then(() => {
        setinputdata([]);
        setFormname("");
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      });
  };
  //const editdata1 = userList?.filter((i) => i._id === props.id);

  return (
    <div>
     <Navbar></Navbar>
      <div className="flex justify-between m-8 ">
        <div className="">
          <b>FormName:</b>{" "}
          <input
            type="text"
            onChange={(e) => setFormname(e.target.value)}
            className="border border-black p-1"
          ></input>
          <div className=" flex justify-between p-4">
          <Button  variant="contained" onClick={() => handleSubmit()} disabled={formName === ""}>
            Add Form
          </Button>
          <Button variant="contained" onClick={() => navigate("/formdetails")}>
            Form
          </Button>
          </div>
        </div>
      
      </div>

      <div>
        {input.map((item, i) => {
          return (
            <Button
              onClick={() => handleChange(item.name)}
            >{`Add ${item.name}`}</Button>
          );
        })}
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
                onClick={() => {
                  showModal();
                  setIndex(i);
                  setTypeOf(item.type);
                  setoutputarr(item);
                  setForms({
                    label: item.label,
                    placeHolder: item.placeHolder,
                  });
                }}
              >
                Edit
              </Button>
              <Button onClick={() => handledelete(i)}>Delete</Button>
              <Modal
                title="Basic Modal"
                open={isModalopen}
                onOk={() => {
                  showModalOk();
                  valueset();
                  edit();
                }}
                onCancel={showModalcancel}
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
                            <Button onClick={() => DeleteOption(i)}>
                              Delete
                            </Button>
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
          );
        })}
      </div>
    </div>
  );
};
