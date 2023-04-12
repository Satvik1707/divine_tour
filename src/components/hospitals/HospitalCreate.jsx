import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db,storage } from "../../firebase/firebase";
import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";


async function uploadFilesToFirebase(filesList) {
  const urls = [];

  for (const file of filesList) {
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    urls.push(downloadURL);
  }

  return urls;
}


const initialValue = {
  name: "",
  location: "",
  description: "",
  images:[]
};

export default function HospitalCreate({
  addEditHospitalModal,
  setAddEditHospitalModal,
  addModal,
  setAddModal,
  editId,
  setEditId,
}) {


  const handleClose = () => {
    setAddEditHospitalModal(false);
    setAddModal(true);
    setEditId(null);
  };

  const [data, setData] = useState(initialValue);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [docRef, setdocRef] = useState(null);
  const { name, location, description,images,itinerary } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (editId !== null) {
      let getSingleUser = async () => {
        setdocRef(doc(db, "hospitals", editId));
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setData({ ...snapshot.data() });
        }
      };
      getSingleUser();
    }
  }, [editId,docRef]);

  const handleImageChange = async(e)=>{
    const files = e.target.files;
    const urls = await uploadFilesToFirebase(files)
    console.log(urls.length)
    setData({ ...data, ["images"]: urls });
  }
  const submitForm = async () => {
    if (data.name !== "" && data.location !== "" && data.description !== "") {
      if (addModal) {
        await addDoc(collection(db, "hospitals"), data);
      } else {
        try {
          await updateDoc(doc(db, "hospitals", editId), data);
        } catch (err) {
          console.log(err);
        }

        setEditId(null);
      }

      setAddEditHospitalModal(false);
      setAddModal(true);
    } else setError("Please fillup all fields!");
  };

  return (
    <Modal show={addEditHospitalModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {addModal ? "Add new hospitals" : "Edit hospitals"}
        </Modal.Title>
      </Modal.Header>
      <div className="modal-body">
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Hospital Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter hospital name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Hospital location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={location}
              onChange={handleChange}
              placeholder="Enter hospital location"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Hospital Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter hospital description"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Package Itinerary</Form.Label>
            <Form.Control
              type="text"
              name="itinerary"
              value={itinerary}
              onChange={handleChange}
              placeholder="Enter hospital description"
              required
            />
          </Form.Group>
          <input type="file" multiple onChange={handleImageChange} />
          
        </Form>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <Modal.Footer>
        <Button className="btn bg-danger btn-danger" onClick={handleClose}>
          Close
        </Button>
        <Button
          className={`btn bg-success btn-success ${
            progress !== null ? "disabled" : ""
          }`}
          onClick={submitForm}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
