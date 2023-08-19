import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Addtask = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "",
  });
  useEffect(() => {
    if (location.state && location.state.updateData) {
      setInput(location.state.updateData);
    }else{
      setInput({
        title: "",
        description: "",
        status: "",
      });
    }
    
  }, [location]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitClicked = (e) => {
    e.preventDefault();

    if (location.state && location.state.updateData) {
      axios
        .put(
          `http://localhost:5000/api/updateTask/${location.state.updateData._id}`,
          // `/api/updateTask/${location.state.updateData._id}`,

          input
        )
        .then((response) => {
          if (response.data.message === "Task Updated successfully") {
            alert(response.data.message);
            navigate("/");
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:5000/api/addtasks", input)
        // .post("/api/addtasks", input)

        .then((response) => {
          if (response.data.message === "Task added successfully") {
            alert(response.data.message);
            navigate("/");
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-3">
        <div className="row">
          <div className="col col-sm-12 col-md-9 col-lg-9">
            <form onSubmit={submitClicked}>
              <div className="mb-3">
                <label htmlFor="exampleInputTasksTitle" className="form-label">
                  Task Title
                </label>
                <input
                  onChange={inputHandler}
                  type="text"
                  className="form-control"
                  id="exampleInputTask"
                  aria-describedby="taskHelp"
                  name="title"
                  value={input.title}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Task Description
                </label>
                <input
                  onChange={inputHandler}
                  type="text"
                  name="description"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={input.description}
                />
              </div>
              <div className="form-check">
                <input
                  onChange={inputHandler}
                  name="status"
                  className="form-check-input"
                  type="radio"
                  id="flexRadioDefault1"
                  value="Complete" // Different value htmlFor Complete
                  checked={input.status === "Complete"}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Complete
                </label>
              </div>
              <div className="form-check">
                <input
                  name="status"
                  onChange={inputHandler}
                  className="form-check-input"
                  type="radio"
                  id="flexRadioDefault2"
                  value="Incomplete" // Different value htmlFor Incomplete
                  checked={input.status === "Incomplete"} // Check based on the selected value            checked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Incomplete
                </label>
              </div>
              <div className="container mx-auto">
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addtask;
