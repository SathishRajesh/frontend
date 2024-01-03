import React, { useState } from "react";
import Button from "@mui/material/Button";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Modal } from "antd";

export default function Submittedview(props) {
  const [rowData] = useState(JSON.parse(localStorage.getItem("data")).submittedData);
  const [formData, setFormdata] = useState([]);
  console.log(rowData, "//////");


  const [viewModel, setViewmodel] = useState(false);

  const [columnDefs] = useState([
    { field: "username" },
    { field: "date" },
    {
      field: "view",
      cellRenderer: ({ data }) => {
        return (
          <div>
            <Button
              variant="outlined"
              // color="success"
              size="small"
              className=" box-border  p-2 bg-red-700 rounded "
              onClick={() => {
                showEditmodal();
                setFormdata(
                  Object.values(data.submittedData).map((innerObj) => ({
                    ...innerObj,
                  }))
                );
              }}
            >
              {" "}
              View
            </Button>
          </div>
        );
      },
    },
  ]);

  const showEditmodal = () => {
    setViewmodel(true);
  };

  const handleViewok = (x, i) => {
    // setViewdata(viewData)
    //console.log("hiiii");
    setViewmodel(false);
  };

  const handleViewcancel = () => {
    setViewmodel(false);
  };

  return (
    <div>
 
      {console.log(formData, "formdata")}
      <Modal
        title="Basic Modal"
        open={viewModel}
        onOk={() => {
          handleViewok();
        }}
        onCancel={handleViewcancel}
      >
        {formData &&
          formData.map((data, i) => {
            return <div>{data?.label}:  {data?.value}</div>;
          })}
      </Modal>
      <div
        className="ag-theme-alpine"
        style={{
          height: 900,
          width: "80 %",
          marginTop: "20px",
          margin: "10px",
        }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
}
