import React from "react";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);

  const addProduct = async () => {
    if (!name.trim() || !price.trim() || !category.trim() || !company.trim()) {
      setError(true);
      return false;
    }

    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("User not logged in");
      return;
    }

    const userId = JSON.parse(userData)._id;

    try {
      const result = await fetch("http://localhost:5002/add-product", {
        method: "post",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await result.json();
      console.warn(data);

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);

      setName("");
      setPrice("");
      setCategory("");
      setCompany("");
      setError(false);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="page-container">
      <div className="product">
        {showPopup && (
          <div className="success-popup">✅ Product added successfully!</div>
        )}
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
          Add Product
        </h2>

        <input
          type="text"
          placeholder="Enter product name"
          className="inputBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name.trim() && (
          <span className="invalid-input">Enter valid name</span>
        )}

        <input
          type="text"
          placeholder="Enter product price"
          className="inputBox"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price.trim() && (
          <span className="invalid-input">Enter valid price</span>
        )}

        <input
          type="text"
          placeholder="Enter product category"
          className="inputBox"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category.trim() && (
          <span className="invalid-input">Enter valid category</span>
        )}

        <input
          type="text"
          placeholder="Enter product company"
          className="inputBox"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company.trim() && (
          <span className="invalid-input">Enter valid company</span>
        )}

        <button onClick={addProduct} className="appButton">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
