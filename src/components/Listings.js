import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function Listings() {
  const [listings, setListings] = useState([]);
  const listingsCollectionRef = collection(db, "listings");

  useEffect(() => {
    const getListings = async () => {
      const data = await getDocs(listingsCollectionRef);
      setListings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getListings();
  }, []);

  useEffect(() => {
    console.log(listings);
  }, [listings]);

  return (
    <>
      <h4 className="title is-4">Listings Component</h4>
      {listings.map((listing) => {
        return (
          <Link to={`listing/${listing.id}`} className="box" key={listing.id}>
            <p>{listing.name}</p>
            <p>{listing.address}</p>
            <p>{listing.category}</p>
            <p>{listing.website}</p>
            <p>{listing.name}</p>
            <nav className="level is-mobile">
              <div className="level-right">
                <a className="level-item">
                  <span className="icon is-small">
                    <i className="far fa-heart"></i>
                    <i className="fas fa-heart"></i>
                  </span>
                </a>
              </div>
            </nav>
          </Link>
        );
      })}
    </>
  );
}

export default Listings;
