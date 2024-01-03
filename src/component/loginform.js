import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import App from "./node";
export default function Login(props) {
  // const [datalist, setDatalist] = useState([]);

  
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/get")
  //       .then((res) => {
  //         const { data = [] } = res?.data || {};
  //         if (data && data?.length) {
  //           setUserList(data);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }, [userList?.length]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/login", { ...data })
      .then((res) => {
        if (res.status === 200) {
          console.log(res,"123456")
          props.setlogin(true);
          props.setId(res.data.data._id);
          props.setRole(res.data.data.role);
          props.setNewForm(res.data.data.firstname)
          props.setNewFormDetails(res.data.data.firstname)
          props.setValidate(res.data.token);
        //  props.setUserlist(res.data)

          localStorage.setItem("token",res.data.token);
          localStorage.setItem("id",res.data.data._id)
       
         console.log(res.data.data,'dataaaaaaaaaaaaaaaaaa')
          localStorage.setItem("firstname",res.data.data.firstname)
         localStorage.setItem("newform",res.data.data.newform)
          localStorage.setItem("data1",JSON.stringify(res.data.data))
          navigate("/node");
        }
      })

      //   const index = userList.findIndex((i) => i.email === data.email);
      // if(index>-1)
      // {
      //   if (
      //     data.email === userList[index].email &&
      //     data.password === userList[index].password
      //   ) {
      //     props.setlogin(true);
      //     props.setId(userList[index]);
      //     props.setRole(userList[index].role)
      //     navigate("/node")
      //   }
      //   else{
      //     alert("Enter the correct details")
      //   }

      // }

      //   setData({
      //     email: "",
      //     password: "",
      //   })
      .catch((err) => {
        if (err.message) {
          alert(err.message);
        }
      });
  };
  return (
    <div className="flex justify-center mt-40 ">
      <div className=" ">
        Email-ID:
        <input
          className=" p-2 border border-black rounded ml-4"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your Email-Id"
        />
        <br></br>
        password:
        <input
          className="p-2 mt-4 border border-black rounded ml-2"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="password"
        />
        <br></br>
        <button
          className="p-2 border border-black rounded ml-20 mt-4"
          onClick={() => handleSave()}
        >
          Log In
        </button>
        <button
          className="p-2 border border-black rounded ml-10 mt-4 "
          onClick={() => {
            navigate("/signup");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
