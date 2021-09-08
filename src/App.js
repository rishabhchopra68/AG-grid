import "./App.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import FormDialog from "./components/dialog";

function App() {
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = useState(false);
  const initialValue = {
    name: "",
    email: "",
    dob: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const url = `http://localhost:4000/users`;

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Date of Birth", field: "dob" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdate(params.data)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.value)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const userData = await axios.get(url);
    setTableData(userData.data);
  };

  const handleUpdate = (currData) => {
    setFormData(currData);
    handleClickOpen();
  };
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete the row ?");
    if (confirm) {
      await axios.delete(`${url}/${id}`);
      getUsers();
    }
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async () => {
    if (formData.id) {
      console.log("updated");
      await axios.put(`${url}/${formData.id}`, { ...formData });
      handleClose();
      getUsers();
    } else {
      console.log("Submit called");
      await axios.post(url, { ...formData });
      handleClose();
      getUsers();
    }
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h3>CRUD Operation in AG-Grid</h3>
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add User
        </Button>
      </Grid>

      <div className="ag-theme-alpine" style={{ height: "400px" }}>
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={handleChange}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
