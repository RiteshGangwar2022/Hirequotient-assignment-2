import React, { useState } from "react";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import UpdateModal from "./UpdateModal";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import "./pages.css";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

//to show notification on action done
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const table = {
  marginLeft: "20px",
  marginTop: "5px",
  width: "95vw",
  height: "78vh",
  backgroundColor: "#eeeeee",
  borderRadius: "8px",
  overflow: "auto",
};

const top = {
  display: "flex",
  flexDirection: "row",
  height: "70px",
  marginTop: "2px",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
};

//page component
const Pages = ({ data, setdata }) => {
  const [selectedusers, setselectedusers] = useState([]);
  const [search, setsearch] = useState("");
  const [page, setPage] = useState(1);
  const usersperpage = 10; //given in assignment

  //to move from one to another
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //calculations to set indexs per page
  const startindex = (page - 1) * usersperpage;
  const endindex = page * usersperpage;

  //to delete a specific row
  const handleDelete = async (userId) => {
    try {
      // console.log(userId);

      const updatedData = data.filter((user) => user.id !== userId);
      // console.log(updatedData);
      setdata(updatedData);
      toast.success("User Deleted successfully! 👍", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  //to update a specific row using updatemodal
  const handleUpdate = (updatedUser) => {
    const updatedIndex = data.findIndex((user) => user.id === updatedUser.id);

    const updatedData = [...data];
    updatedData[updatedIndex] = updatedUser;
    setdata(updatedData);
    toast.success("User Updated successfully! 👍", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  //to delete all the selected rows
  const handleDeleteAll = () => {
    if (selectedusers.length === 0) {
      toast.error("Select at least one user to delete 👎!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const updatedData = data.filter((user) => !selectedusers.includes(user.id));
    setdata(updatedData);

    setselectedusers([]);
    toast.success("Selected users deleted successfully! 👍", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  //to add user in selectedusers array after clicking on select button
  const handleSelect = (rowId) => {
    setselectedusers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(rowId)) {
        return prevSelectedUsers.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedUsers, rowId];
      }
    });
  };

  return (
    <>
      <div style={top}>
        <TextField
          id="filled-basic"
          label="search"
          variant="filled"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <Button
          type="submit"
          color="error"
          variant="contained"
          style={{
            display: "flex",
            flexDirection: "row",
            height: "40px",
            width: "130px",
          }}
          onClick={() => handleDeleteAll()}
        >
          <DeleteTwoToneIcon style={{ margin: "2px 4px" }} />
          Delete
        </Button>
      </div>
      <div style={table}>
        <table id="customers">
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="content">
            {data
              .filter((user) => {
                return (
                  user.name.includes(search) ||
                  user.email.includes(search) ||
                  user.role.includes(search)
                );
              })
              .slice(startindex, endindex)
              .map((user, index) => (
                <tr key={user.id}>
                  <td>
                    <Checkbox
                      checked={selectedusers.includes(user.id)}
                      onChange={() => handleSelect(user.id)}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td id="action">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <UpdateModal user={user} onUpdate={handleUpdate}>
                        <UpdateTwoToneIcon
                          style={{ margin: "2px 4px", cursor: "pointer" }}
                          color="primary"
                        />
                      </UpdateModal>
                      <DeleteTwoToneIcon
                        style={{ margin: "2px 4px", cursor: "pointer" }}
                        onClick={() => handleDelete(user.id)}
                        color="error"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/*to set pagination, used material UI pagination */}
      <Stack
        spacing={2}
        style={{ position: "relative", top: "4px", margin: "4px" }}
      >
        <Pagination
          count={Math.ceil(data.length / usersperpage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
      <ToastContainer />
    </>
  );
};
export default Pages;
