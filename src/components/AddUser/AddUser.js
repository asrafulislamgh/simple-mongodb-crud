import React, { useRef } from "react";

const AddUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Added a new data successfully!");
          e.target.reset();
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <h2>Please add an User</h2>
      <form onSubmit={handleAddUser}>
        <input ref={nameRef} type="text" title="" placeholder="Name" />
        <br />
        <input ref={emailRef} type="email" title="" placeholder="Email" />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
