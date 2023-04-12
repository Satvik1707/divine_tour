import React, { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import PlaceCreate from './PlaceCreate';
import PlaceTable from './PlaceTable';

export default function Index({ places, setPlaces }) {

  // state
  // modal handle
  const [addEditPlaceModal, setAddEditPlaceModal] = useState(false);
  // for detect modal is edit or create
  const [addModal, setAddModal] = useState(true);
  // set edit id
  const [editId, setEditId] = useState(null);

  // modal handle
  const addEditPlaceModalHandle = () => {
    setAddEditPlaceModal(true);
  }

  return (
    <Col md={9}>
      <div className="right-area px-4 py-3">
        <Row>
          <Col md={6}>
            <h4 className="mb-4">Places</h4>
          </Col>
          <Col>
            <p className="text-md-end text-center">
              <button className="btn bg-success btn-success table-btn" onClick={addEditPlaceModalHandle}>Add new place</button>
            </p>
          </Col>
        </Row>
        <PlaceTable places={ places } setPlaces={ setPlaces } setAddEditPlaceModal={ setAddEditPlaceModal }
          setAddModal={ setAddModal } setEditId={ setEditId } />

        {/* modal */}
        {addEditPlaceModal && <PlaceCreate addEditPlaceModal={ addEditPlaceModal } setAddEditPlaceModal={ setAddEditPlaceModal }
          addModal={ addModal } setAddModal={ setAddModal } editId={ editId } setEditId={ setEditId } />}

      </div>
    </Col>
  )
}
