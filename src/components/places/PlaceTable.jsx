import React from 'react';
import { Table } from "react-bootstrap";
// firebase
import { db } from '../../firebase/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

// icons
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

export default function PlaceTable({ places, setPlaces, setAddEditPlaceModal, setAddModal, setEditId }) {

  // edit modal show
  const editModalHandle = async (e, id) => {
      e.preventDefault();
      setAddEditPlaceModal(true);
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
          await deleteDoc(doc(db, "places", id));
          setPlaces(places.filter((place) => place.id !== id));
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
          <th>Img</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { places && places.map((place) => (
          <tr key={place.id}>
            <td>{ place.id }</td>
            <td>{ place.name }</td>
            <td>{ place.location }</td>
            <td><img src={ place.images[0] } alt="place img" width="100" height="auto" /></td>
            <td>{ place.description.substring(0, 10) }{ place.description.length > 10 ? "..." : null }</td>
            <td>
              <a href="#edit" onClick={(e) => editModalHandle(e, place.id)} >
                <AiFillEdit className='text-warning me-3' />
              </a>
              <a href="#delete" onClick={ (e) => handleDelete(e, place.id) }>
                <AiOutlineDelete className='text-danger' />
              </a>
            </td>
          </tr>
        )) }
      </tbody>
    </Table>
  )
}
