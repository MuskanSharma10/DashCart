
import React, { useEffect, useState, useCallback } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProducts = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await fetch(`http://localhost:5002/user-products/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Fetch user products error:", err);
    }
  };

  
  const fetchProfile = useCallback(async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        console.error("No token found.");
        return;
      }

      const res = await fetch("http://localhost:5002/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setProfile(data.user);
        fetchUserProducts(data.user._id);
      } else {
        console.error("Profile fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); 
  

  return (
    <div className="profile-container">
      <h2>👤 User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : profile ? (
        <>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>ID:</strong> {profile._id}
          </p>

          <h3>📦 Products Added By You</h3>
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product._id}>
                  {product.name} - ₹{product.price} ({product.category})
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
        </>
      ) : (
        <p>❌ User not found.</p>
      )}
    </div>
  );
};

export default Profile;
