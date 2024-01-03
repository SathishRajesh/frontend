import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [userList, setUserList] = useState([]);
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
  }, [userList?.length]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = () => {
    if (!data) return;
    console.log(data, "dgagd");
    axios
      .post("http://localhost:5000/post-number", { ...data }) 
      .then((res) => {
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
          console.log(res, "gytft");
          alert(res.message);
        }
      })
      .catch((err) => {
        console.log(err, "gytft");
        if (err.message) {
          console.log(err.message, "09865");
          alert(err.response.data.message);
        }
      });
  };

  return (
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
      Password:
      <input
        className="border border-black  mt-2 rounded"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
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
          handleSave();
          navigate("/");
        }}
      >
        Add{" "}
      </button>
    </div>
  );
}
