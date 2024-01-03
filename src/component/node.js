import React, { useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
import Navbar from "./navbar";

export default function App(props) {
  const [userList, setUserList] = useState([]);
  const [edit, setEdit] = useState();
  const [editButton, setEditbutton] = useState(false);
  const role = !(props.role === "super-admin" || props.role === "admin");
 
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    email: "",
    active: "",
    password: "",
    role: "",
  });
  const [columnDefs] = useState([
    { field: "firstname" },
    { field: "lastname" },
    { field: "email" },
    { field: "password" },
    { field: "age" },
    { field: "gender" },
    { field: "active" },
    { field: "role" },
    {
      field: "Edit",
      hide: role,
      cellRenderer: ({ data }) => {
        return (
          <button
            className=" bg-blue-600 rounded w-20 "
            onClick={() => {
              handleEdit(data);
              setEdit(data);
              setEditbutton(true);
            }}
          >
            Edit
          </button>
        );
      },
    },
    {
      field: "delete",
      hide: role,
      cellRenderer: ({ data }) => {
        return (
          <button
            className=" bg-red-600 rounded w-20"
            onClick={() => {console.log(data);handleDelete(data);}}
          >
            Delete
          </button>
        );
      },
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = () => {
    //if (!data) return;
    console.log(data, "dgagd");
    axios
      .post("http://localhost:5000/post-number", {...data},{headers:{Authorization:`Bearer ${props.validate}`}})
      .then((res) => {
        setUserList((prev) => {
          const arr = [...prev];
          arr.push({
            firstname: data.firstname,
            lastname: data.lastname,
            age: data.age,
            gender: data.gender,
            email: data.email,
            active: data.active,
            password: data.password,
            role: data.role,
          });
          return arr;
        });
        setData({
          firstname: "",
          lastname: "",
          age: "",
          gender: "",
          email: "",
          active: "",
          password: "",
          role: "",
        });

        if (res.message) {
          alert(res.message);
        }
      })
      .catch((err) => {
        if (err.message) {
          alert(err.message);
        }
      });
  };

  const handleEdit = (data) => {
    setData({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      age: data.age,
      gender: data.gender,
      active: data.active,
      password: data.password,
      role: data.role,
    });
  };
  const editmodal = () => {
    const id = edit._id;
    console.log(id,props,"//////")
    axios
      .patch(`http://localhost:5000/update/${id}`, { ...data },{headers:{Authorization:`Bearer ${props.validate}`}})
      .then((res) => {
        console.log(res,"``````")
        setUserList(res.data.data);
        setData({
          firstname: "",
          lastname: "",
          age: "",
          gender: "",
          email: "",
          active: "",
          password: "",
          role: "",
        });
        setEditbutton(false);
      
      });
  };

  const handleDelete = (i) => {
    const id = i._id;
    console.log(id,props,"====")
    axios
      .delete(`http://localhost:5000/delete/${id}`,{headers:{Authorization:`Bearer ${props.validate}`}})
      .then((res) => {
        // setUserList((prev) => {
        //   const index = userList.findIndex((i) => i.id === id);
        //   const arr = [...userList];
        //   if (index > -1) {
        //     arr.splice(index, 1);
        //   }
        //   return arr;
        // });

        if (res.data.message) {
          alert(res.data.message);
        }
        setUserList(res.data.data);
      })

      .catch((err) => {
        // if (err.data.message) {
        //   alert(err.data.message);
        // }
      });
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((res) => {
        const { data = [] } = res?.data || {};
        if (data && data?.length) {
          setUserList(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const filterdata = userList?.filter((i) => i._id !== props.id);
  const editdata1 = userList?.filter((i) => i._id === props.id);


  return (
    <div className="">
      <Navbar></Navbar>
      <div className="flex justify-between m-4">
        <div>
          First_name:{" "}
          <input
            className="border border-black rounded"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
          />
          <br></br>
          Last_name:
          <input
            className="border border-black mt-2 rounded"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
          />
          <br></br>
          Age:{" "}
          <input
            className="border border-black  mt-2 rounded"
            name="age"
            value={data.age}
            onChange={handleChange}
          />
          <br></br>
          Gender:
          <input
            className="border border-black  mt-2 "
            type="radio"
            name="gender"
            value={"Male"}
            checked={data.gender === "Male"}
            onChange={handleChange}
          />
          Male
          <input
            className="border border-black  mt-2"
            type="radio"
            name="gender"
            value={"Female"}
            checked={data.gender === "Female"}
            onChange={handleChange}
          />
          Female<br></br>
          Email:{" "}
          <input
            className="border border-black  mt-2 rounded"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <br></br>
          {editButton? null:
          <div>
            Password:
          <input
            className="border border-black  mt-2 rounded"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          </div>
          }
          <br></br>
          Active:{" "}
          <input
            className="border border-black  mt-2 rounded"
            name="active"
            value={data.active}
            onChange={handleChange}
          />
          <br></br>
          Role:
          <select
            className="border border-black  mt-2"
            name="role"
            value={data.role}
            onChange={handleChange}
          >
            <option value="owner">owner </option>
            <option value="super-admin">super-admin </option>
            <option value="admin"> admin </option>
            <option value="manager"> manager</option>
          </select>
          <br></br>
          <button
            className=" bg-blue-600 rounded w-10"
            onClick={() => {
              editButton ? editmodal() : handleSave();
            }}
          >
            {" "}
            {editButton ? "Edit" : "Add"}{" "}
          </button>
        </div>
        <div className=" ">
        
          <Button variant="contained" 
            onClick={() => {
              handleEdit(editdata1[0]);
              setEditbutton(true);
              setEdit(editdata1[0]);
             
            }}
            className=" bg-blue-600 rounded mr-4"
          >
            Admin
          </Button>
          
     
        </div>
     
      </div>
      <div className="ag-theme-alpine" style={{ width: "100%", height: 300 }}>
        <AgGridReact rowData={filterdata} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
}
