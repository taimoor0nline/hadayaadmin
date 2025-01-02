import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import { updateRecipientDetails} from '../services/orderService';

interface ReceiverOrderId {
    orderId: string;
  }

const UpdateReceiver = () => {
    
      useEffect(() => {
        fetchReceiverid();
      });
      const fetchReceiverid=()=>{

      }
      const UpdateReceiverAddress = () => {
       
      };
  return (
    <div className="container mt-4">
    <div className="card">
      <div className="card-header">
        <h2>Zones</h2>
        <div className="row">
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Zone name"
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={UpdateReceiverAddress}>Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateReceiver
