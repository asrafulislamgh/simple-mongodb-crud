import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const url = `http://localhost:5000/users/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  //   updating
  const handleUpdate = (e) => {
    const url = `http://localhost:5000/users/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Data updated successfully!");
          setUser({});
        }
      });
    e.preventDefault();
  };
  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    const updatedUser = { name: updatedName, email: user.email };
    setUser(updatedUser);
  };
  const handleEmailChange = (e) => {
    const updatedEmail = e.target.value;
    const updatedUser = { name: user.name, email: updatedEmail };
    setUser(updatedUser);
  };
  return (
    <div>
      <h2>This is Update User</h2>
      <form onSubmit={handleUpdate}>
        <input onChange={handleNameChange} value={user.name || ""} />
        <input onChange={handleEmailChange} value={user.email || ""} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
