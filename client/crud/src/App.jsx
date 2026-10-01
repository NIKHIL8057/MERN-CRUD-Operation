import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [username, setUserName] = useState("");
  const [gmail, setGmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  // Create User
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        const res = await axios.put(
          `http://localhost:8000/api/update/${editId}`,
          {
            username,
            email: gmail,
          }
        );

        console.log("Update response:", res.data);

        // Edit mode band
        setEditId(null);
      } else {
        // CREATE
        const res = await axios.post(
          "http://localhost:8000/api/create",
          {
            username,
            email: gmail,
          }
        );

        console.log("Create response:", res.data);
      }

      // Form clear
      setUserName("");
      setGmail("");

      // Users refresh
      fetchUsers();
    } catch (error) {
      console.error("Create/Update error:", error);
    }
  };

  // Get Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/getUsers"
      );

      setUsers(res.data.user);
    } catch (error) {
      console.error("Get users error:", error);
    }
  };

  // Edit button click
  const editUser = (user) => {
    setEditId(user._id);
    setUserName(user.username);
    setGmail(user.email);
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/delete/${id}`
      );

      console.log("Delete response:", res.data);

      fetchUsers();
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>{editId ? "Update User" : "Add User"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Email: </label>

          <input
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          {editId ? "Update User" : "Add User"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setUserName("");
              setGmail("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Users</h2>

      <div>
        {users.map((user) => (
          <div key={user._id}>
            <p>
              {user.username} | {user.email}
            </p>

            <button onClick={() => editUser(user)}>
              Update
            </button>

            <button onClick={() => deleteUser(user._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
