import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [input, setInput] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/viewalltasks"
        // "/api/viewalltasks"
      );
      const data = response.data; // Assuming the data is directly in the response

      if (data) {
        setInput(data);
        setLoading(false); // Set loading to false when data is fetched
      } else {
        // Handle the case where data is not present in the response
        console.error("Data not found in the API response.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };
  const deleteClicked = (id) => {
    axios
      .delete(`http://localhost:5000/api/deletetask/${id}`)
      // .delete(`/api/deletetask/${id}`)

      .then((response) => {
        if (response.data.message === "Task deleted successfully") {
          alert(response.data.message);
          fetchDataFromDatabase();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleCheckboxChange = (e, val) => {
    if (e.target.checked) {
      val.status = "Complete"; // Change to "Completed"

      try {
        axios
          .put(`http://localhost:5000/api/updateTask/${val._id}`, val)
          // .put(`/api/updateTask/${val._id}`, val)

          .then((response) => {
            if (response.data.message === "Task Updated successfully") {
              alert(response.data.message);
              fetchDataFromDatabase();
            } else {
              alert(response.data.message);
              fetchDataFromDatabase();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      val.status = "Incomplete"; // Change to "Incomplete"

      try {
        axios
          .put(`http://localhost:5000/api/updateTask/${val._id}`, val)
          // .put(`/api/updateTask/${val._id}`, val)

          .then((response) => {
            if (response.data.message === "Task Updated successfully") {
              alert(response.data.message);
              fetchDataFromDatabase();
            } else {
              alert(response.data.message);
              fetchDataFromDatabase();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const viewClicked = (val) => {
    navigate("/addtask", {
      state: { updateData: val },
    });
  };


  return (
    <>
      <Navbar />

      <div className="container mt-3 text-center">
        <div className="row">
          <div className="col col-sm-12 col-md-9 col-lg-9 mx-auto ">
            <table className="table table-striped-columns">
              <thead>
                <tr>
                  <th scope="col">Sl no</th>
                  <th scope="col">Task</th>
                  <th scope="col">Actions</th>
                  <th scope="col">check if completed</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">Loading...</td>
                  </tr>
                ) : (
                  input.map((val, i) => (
                    <tr className="" key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{val.title}</td>
                      <td>
                        <EditIcon onClick={() => viewClicked(val)} />
                        <DeleteIcon onClick={() => deleteClicked(val._id)} />
                      </td>
                      <td>
                        <div className="form-check justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckDefault-${i}`}
                            checked={val.status === "Complete"}
                            onChange={(e) => handleCheckboxChange(e, val)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
