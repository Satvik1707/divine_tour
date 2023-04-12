import React, { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import HospitalTable from './HospitalTable';
import HospitalsCreate from './HospitalCreate';

export default function Index({ hospitals, setHospital }) {

  // state
  // modal handle
  const [addEditHospitalModal, setAddEditHospitalModal] = useState(false);
  // for detect modal is edit or create
  const [addModal, setAddModal] = useState(true);
  // set edit id
  const [editId, setEditId] = useState(null);

  // modal handle
  const addEditHospitalModalHandle = () => {
    setAddEditHospitalModal(true);
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
              <button className="btn bg-success btn-success table-btn" onClick={addEditHospitalModalHandle}>Add new place</button>
            </p>
          </Col>
        </Row>
        <HospitalTable hospitals={ hospitals } setHospital={ setHospital } setAddEditHospitalModal={ setAddEditHospitalModal }
          setAddModal={ setAddModal } setEditId={ setEditId } />

        {/* modal */}
        {addEditHospitalModal && <HospitalsCreate addEditHospitalModal={ addEditHospitalModal } setAddEditHospitalModal={ setAddEditHospitalModal }
          addModal={ addModal } setAddModal={ setAddModal } editId={ editId } setEditId={ setEditId } />}

      </div>
    </Col>
  )
}
