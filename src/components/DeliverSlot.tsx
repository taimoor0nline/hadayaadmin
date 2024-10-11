import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import {
  getDeliverySlots,
  getDeliverySlotById,
  createDeliverySlot,
  updateDeliverySlot,
  deleteDeliverySlot
} from '../services/deliverySlotService';
import { IDeliverySlot, IDeliverySlotStatus } from '../interfaces/DeliverSlot';

const DeliverySlot: React.FC = () => {
  const [deliverySlots, setDeliverySlots] = useState<IDeliverySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<IDeliverySlot | null>(null);

  useEffect(() => {
    fetchDeliverySlots();
  }, []);

  const fetchDeliverySlots = async () => {
    const result = await getDeliverySlots(1, 10);
    setDeliverySlots(result.data);
  };

  const handleSelectSlot = async (id: number) => {
    const slot = await getDeliverySlotById(id);
    setSelectedSlot(slot);
    openModal();
  };

  const handleCreateOrUpdate = async () => {
    if (selectedSlot?.id) {
      await updateDeliverySlot(selectedSlot.id, selectedSlot);
    } else {
      await createDeliverySlot(selectedSlot!);
    }
    fetchDeliverySlots();
    setSelectedSlot(null);
    closeModal(); 
  };

  const handleDelete = async (id: number) => {
    await deleteDeliverySlot(id);
    fetchDeliverySlots();
  };

  const handleCreateNew = () => {
    setSelectedSlot({
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      thresholdMinutes: 0,
      status: IDeliverySlotStatus.Active
    });
    openModal();
  };

  const openModal = () => {
    const modalElement = document.getElementById('deliverySlotModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById('deliverySlotModal');
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2>Delivery Slots</h2>
        </div>
        <div className="card-body">
          <button className="btn btn-primary mb-3" onClick={handleCreateNew}>Create Delivery Slot</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Threshold Minutes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliverySlots.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.startDate}</td>
                  <td>{slot.endDate}</td>
                  <td>{slot.startTime}</td>
                  <td>{slot.endTime}</td>
                  <td>{slot.thresholdMinutes}</td>
                  <td>{slot.status}</td>
                  <td>
                    <button className="btn btn-sm btn-info mr-2"  style={{margin:'5px',padding:'5px'}} onClick={() => handleSelectSlot(slot.id!)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(slot.id!)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="deliverySlotModal" tabIndex={-1} aria-labelledby="deliverySlotModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deliverySlotModalLabel">
                {selectedSlot?.id ? 'Edit' : 'Create'} Delivery Slot
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Start Date"
                  value={selectedSlot?.startDate || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, startDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="End Date"
                  value={selectedSlot?.endDate || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, endDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  placeholder="Start Time"
                  value={selectedSlot?.startTime || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, startTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  className="form-control"
                  placeholder="End Time"
                  value={selectedSlot?.endTime || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, endTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Threshold Minutes</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Threshold Minutes"
                  value={selectedSlot?.thresholdMinutes || 0}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, thresholdMinutes: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  value={selectedSlot?.status || IDeliverySlotStatus.Active}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, status: e.target.value as IDeliverySlotStatus })}
                >
                  <option value={IDeliverySlotStatus.Active}>Active</option>
                  <option value={IDeliverySlotStatus.Inactive}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={handleCreateOrUpdate}>
                {selectedSlot?.id ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverySlot;
