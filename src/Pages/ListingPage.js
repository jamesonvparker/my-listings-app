import React, { useState, useEffect } from "react";
// import Listing from "../components/Listing";
import { useParams } from "react-router-dom";

import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc
} from "firebase/firestore";

function ListingPage() {
  const [listing, setListing] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getListing = async () => {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing({ ...docSnap.data(), id: id });
      } else {
        console.log("No such document");
      }
    };

    getListing();
  }, []);

  return (
    <>
      <h3 className="title is-3">Listing Details Page</h3>
      <p>{listing.name}</p>
      <p>{listing.address}</p>
      <p>{listing.phoneNumber}</p>
      <p>{listing.category}</p>
      <p>{listing.website}</p>
    </>
  );
}

export default ListingPage;
