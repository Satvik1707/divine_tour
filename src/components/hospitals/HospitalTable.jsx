import React from 'react';
import { Table } from "react-bootstrap";
// firebase
import { db } from '../../firebase/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

// icons
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

export default function HospitalTable({ hospitals, setHospitals, setAddEditHospitalModal, setAddModal, setEditId }) {

  // edit modal show
  const editModalHandle = (e, id) => {
    console.log(id)
    e.preventDefault();
    setAddEditHospitalModal(true);
    setAddModal(false);
    setEditId(id);
  }

  // delete item
  const handleDelete = async (e, id) => {
    e.preventDefault();

    // anyone can't delete fixed items
    if (id!=="1" && id!=="2" && id!=="3") {
      if (window.confirm("Are you sure to delete this item?")) {
        try {
          await deleteDoc(doc(db, "hospitals", id));
          setHospitals(hospitals.filter((place) => place.id !== id));
        }
        catch {
          alert("Error to delete this item!");
        }
      }
    }
    else alert("You have no permission to delete this place");
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>Price</th>
          <th>Img</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { hospitals && hospitals.map((hospital) => (
          <tr key={hospital.id}>
            <td>{ hospital.id }</td>
            <td>{ hospital.name }</td>
            <td>{ hospital.location }</td>
            <td>{ hospital.price }</td>
            <td><img src={ hospital.images[0] } alt="hospital img" width="100" height="auto" /></td>
            <td>{ hospital.description.substring(0, 10) }{ hospital.description.length > 10 ? "..." : null }</td>
            <td>
              <a href="#edit" onClick={(e) => editModalHandle(e, hospital.id)}>
                <AiFillEdit className='text-warning me-3' />
              </a>
              <a href="#delete" onClick={ (e) => handleDelete(e, hospital.id) }>
                <AiOutlineDelete className='text-danger' />
              </a>
            </td>
          </tr>
        )) }
      </tbody>
    </Table>
  )
}
