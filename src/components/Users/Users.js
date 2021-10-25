import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleDelete = (id) => {
    const confirmation = window.confirm(
      "Are you sure want to delete the item?"
    );
    if (confirmation) {
      const url = `http://localhost:5000/users/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) alert("Deleted the item successfully!");
          const newUsers = users.filter((user) => user._id !== id);
          setUsers(newUsers);
        });
    }
  };
  return (
    <div>
      <h2>Total user is: {users.length}</h2>
      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid",
            padding: "10px",
            margin: "10px auto",
            backgroundColor: "#eee",
            width: "30%",
          }}
        >
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <Link to={`/users/update/${user._id}`}>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                marginRight: "4px",
              }}
            >
              Update
            </button>
          </Link>
          <button
            onClick={() => handleDelete(user._id)}
            style={{ backgroundColor: "red " }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
