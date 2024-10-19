import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import {
  getDeliverySlots,
  getDeliverySlotById,
  createDeliverySlot,
  updateDeliverySlot,
  deleteDeliverySlot,
} from '../services/deliverySlotService';
import { IDeliverySlot, IDeliverySlotStatus } from '../interfaces/DeliverSlot';
import { RiAddLine, RiCheckLine, RiDeleteBin2Line, RiEdit2Fill, RiPulseLine } from '@remixicon/react';
import { Button, Card, Container, Table } from 'react-bootstrap';

const DeliverySlot: React.FC = () => {
  const [deliverySlots, setDeliverySlots] = useState<IDeliverySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<IDeliverySlot | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // Track selected days

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
    setSelectedDays(slot?.availableDays || []); // Set selected days from slot
    openModal();
  };

  const handleCreateOrUpdate = async () => {
    if (selectedSlot?.id) {
      await updateDeliverySlot(selectedSlot.id, { ...selectedSlot, availableDays: selectedDays });
    } else {
      await createDeliverySlot({ ...selectedSlot, availableDays: selectedDays });
    }
    fetchDeliverySlots();
    setSelectedSlot(null);
    setSelectedDays([]);
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
      startDelivery: '',
      endDelivery: '',
      startTime: '',
      endTime: '',
      priority: '',
      charges: '',
      thresholdMinutes: 0,
      status: IDeliverySlotStatus.Active,
    });
    setSelectedDays([]); // Reset selected days
    openModal();
  };

  const handleDayChange = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );

    console.log('days : ', selectedDays);
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

  const dayNames: { [key: string]: string } = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
  };

  const daysOfWeek = Object.keys(dayNames); // Array of day keys

  return (
    <div className="container mt-4">

      <Card className='mb-2' border='0'>
        <Card.Body>
          <Button className=" mb-3" style={{ padding: '10px 16px', border: 0 }} onClick={handleCreateNew}>
            <RiAddLine color='white' />
            Add Delivery Slot
          </Button>
        </Card.Body>
      </Card>

      <div className="card custom-table">
        <div className="card-header">
          <h2>Delivery Slots</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Table striped responsive="sm">
              <thead>
                <tr>
                  <th style={{ minWidth: '120px' }}>Actions</th>
                  <th style={{ minWidth: '150px' }}>Time (From - To)</th>
                  <th style={{ minWidth: '120px' }}>Max Orders</th>
                  <th style={{ minWidth: '250px' }}>Accept Orders (From - To)</th>
                  <th style={{ minWidth: '150px' }}>Delivery Charges</th>
                  <th style={{ minWidth: '100px' }}>Type</th>
                  <th style={{ minWidth: '100px' }}>Status</th>
                  <th style={{ minWidth: '50px' }}>Mon</th>
                  <th style={{ minWidth: '50px' }}>Tue</th>
                  <th style={{ minWidth: '50px' }}>Wed</th>
                  <th style={{ minWidth: '50px' }}>Thu</th>
                  <th style={{ minWidth: '50px' }}>Fri</th>
                  <th style={{ minWidth: '50px' }}>Sat</th>
                  <th style={{ minWidth: '50px' }}>Sun</th>
                </tr>
              </thead>
              <tbody>
                {deliverySlots.map((slot) => (
                  <tr key={slot.id}>
                    <td>
                      <div className="d-flex">
                        <button
                          className="btn btn-sm mr-2"
                          onClick={() => handleSelectSlot(slot.id!)}
                        >
                          <RiEdit2Fill />
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDelete(slot.id!)}
                        >
                          <RiDeleteBin2Line color="red" />
                        </button>
                      </div>
                    </td>
                    <td>{slot.startDate}</td>
                    <td>{slot.endDate}</td>
                    <td>{slot.startTime}</td>
                    <td>{slot.endTime}</td>
                    <td>{slot.thresholdMinutes}</td>
                    <td>{slot.status === IDeliverySlotStatus.Active ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}</td>
                    <td>{slot.availableDays?.includes("Mon") ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}</td>
                    <td>{slot.availableDays?.includes("Tue") ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}</td>
                    <td>{slot.availableDays?.includes("Wed") ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}</td>
                    <td>{slot.availableDays?.includes("Thu") ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}</td>
                    <td>{slot.availableDays?.includes("Fri") ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}</td>
                    <td>{slot.availableDays?.includes("Sat") ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}</td>
                    <td>{slot.availableDays?.includes("Sun") ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

      </div>
      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="deliverySlotModal"
        tabIndex={-1}
        aria-labelledby="deliverySlotModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deliverySlotModalLabel">
                {selectedSlot?.id ? 'Edit' : 'Create'} Delivery Slot
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modal-body-scrollable">
              <div className="form-group mt-4">
                <b>Slot Name</b>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Slot Name"
                  value={selectedSlot?.slotName || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, slotName: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>Delivery Charges</b>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Delivery Charges"
                  value={selectedSlot?.charges || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, charges: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>Start Date</b>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Start Date"
                  value={selectedSlot?.startDate || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, startDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>End Date</b>
                <input
                  type="date"
                  className="form-control"
                  placeholder="End Date"
                  value={selectedSlot?.endDate || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, endDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>Start Delivery</b>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Start Delivery"
                  value={selectedSlot?.startDelivery || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, startDelivery: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>End Delivery</b>
                <input
                  type="date"
                  className="form-control"
                  placeholder="End Delivery"
                  value={selectedSlot?.endDelivery || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, endDelivery: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>Start Time</b>
                <input
                  type="time"
                  className="form-control"
                  placeholder="Start Time"
                  value={selectedSlot?.startTime || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, startTime: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>End Time</b>
                <input
                  type="time"
                  className="form-control"
                  placeholder="End Time"
                  value={selectedSlot?.endTime || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, endTime: e.target.value })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>Capacity</b>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Capacity"
                  value={selectedSlot?.thresholdMinutes || 0}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, thresholdMinutes: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="form-group mt-4">
                <b>Priority</b>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Priority"
                  value={selectedSlot?.priority || ''}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, priority: e.target.value })
                  }
                />
              </div>
              {/* <div className="form-group mt-4">
                <b>Status</b>
                <select
                  className="form-control"
                  value={selectedSlot?.status || IDeliverySlotStatus.Active}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot!, status: e.target.value as IDeliverySlotStatus })
                  }
                >
                  <option value={IDeliverySlotStatus.Active}>Active</option>
                  <option value={IDeliverySlotStatus.Inactive}>Inactive</option>
                </select>
              </div> */}
              <div className="form-group mt-4">
                {/* <b>Status</b> */}
                <div className="form-check form-switch d-flex justify-content-between">
                  <label className="form-check-label" htmlFor="statusToggle">
                    {/* {selectedSlot?.status === IDeliverySlotStatus.Active ? 'Active' : 'Inactive'} */}
                    <b>Status</b>
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="statusToggle"
                    checked={selectedSlot?.status === IDeliverySlotStatus.Active}
                    onChange={(e) =>
                      setSelectedSlot({
                        ...selectedSlot!,
                        status: e.target.checked ? IDeliverySlotStatus.Active : IDeliverySlotStatus.Inactive,
                      })
                    }
                  />

                </div>
              </div>

              <div className="form-group mt-4 days-form">
                <b><b>Available Days </b></b>
                <div className="form-check " >
                  {daysOfWeek.map((day) => (
                    <div className="form-check form-switch d-flex justify-content-between" key={day}>
                      <label className="form-check-label" htmlFor={day}>
                        {dayNames[day]}
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={day}
                        checked={selectedDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
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
