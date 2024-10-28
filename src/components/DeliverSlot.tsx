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
import { RiAddLine, RiCheckLine, RiDeleteBin2Line, RiEdit2Fill } from '@remixicon/react';
import { Button, Card, Container, Table } from 'react-bootstrap';

const convertToTimeInputFormat = (time: string): string => {
  const [timeString, modifier] = time.split(' ');
  let [hours, minutes] = timeString.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = String(parseInt(hours) + 12);
  }
  if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }

  return `${hours.padStart(2, '0')}:${minutes}`;
};

const convertToAPITimeFormat = (time: string): string => {
  let [hours, minutes] = time.split(':');
  const suffix = parseInt(hours) >= 12 ? 'PM' : 'AM';

  hours = (parseInt(hours) % 12 || 12).toString();

  return `${hours.padStart(2, '0')}:${minutes} ${suffix}`;
};

const DeliverySlot: React.FC = () => {
  const [deliverySlots, setDeliverySlots] = useState<IDeliverySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<IDeliverySlot | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeliverySlots();
  }, []);

  const fetchDeliverySlots = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await getDeliverySlots(1, 10);
      setDeliverySlots(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = async (id: number) => {
    try {
      const slot = await getDeliverySlotById(id);
      setSelectedSlot({
        ...slot,
        startTime: convertToTimeInputFormat(slot.startTime),
        endTime: convertToTimeInputFormat(slot.endTime),
      });
      setSelectedDays(slot?.availableDays || []);
      openModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (selectedSlot) {
      const slotData = {
        ...selectedSlot,
        startTime: convertToAPITimeFormat(selectedSlot.startTime),
        endTime: convertToAPITimeFormat(selectedSlot.endTime),
        createdAt: undefined,
        updatedAt: undefined,
        availableDays: selectedDays,
      };

      try {
        if (selectedSlot.id) {
          const { id, ...updateData } = slotData;
          await updateDeliverySlot(selectedSlot.id, updateData);
        } else {
          await createDeliverySlot(slotData);
        }
        fetchDeliverySlots();
        setSelectedSlot(null);
        setSelectedDays([]);
        closeModal();
      } catch (error) {
        console.error("Error creating or updating slot:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    await deleteDeliverySlot(id);
    fetchDeliverySlots();
  };

  const handleCreateNew = () => {
    setSelectedSlot({
      deliverySlotName: '',
      deliveryCharges: 0,
      startDate: '',
      endDate: '',
      startDelivery: '',
      endDelivery: '',
      startTime: '',
      endTime: '',
      slotClosingTime: '0',
      capacity: 0,
      priority: 1,
      status: IDeliverySlotStatus.Active,
      availableDays: [],
    });
    setSelectedDays([]);
    openModal();
  };

  const handleDayChange = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
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
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
  };

  const daysOfWeek = Object.keys(dayNames);

  return (
    <Container className="mt-4">

      <Card className="custom-table">
        <Card.Header>
          <Button className="mb-3 flex gap-1" onClick={handleCreateNew}>
            <RiAddLine color='white' />
            <span>
              Add Delivery Slot
            </span>
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped responsive="sm">
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>Slot Name</th>
                  <th>Delivery Charges</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Closing Time</th>
                  <th>Capacity</th>
                  <th>Priority</th>
                  <th>Status</th>
                  {daysOfWeek.map(day => <th key={day}>{dayNames[day]}</th>)}
                </tr>
              </thead>
              <tbody>
                {deliverySlots.map((slot) => (
                  <tr key={slot.id}>
                    <td className='flex gap-1'>
                      <Button size="sm" className=' hover:bg-slate-700 border-0 rounded-md' onClick={() => handleSelectSlot(slot.id!)}><RiEdit2Fill /></Button>
                      <Button size="sm" className='bg-red-500 border-0 rounded-md' onClick={() => handleDelete(slot.id!)}><RiDeleteBin2Line color="white" /></Button>
                    </td>
                    <td style={{ minWidth: 150 }}>{slot.deliverySlotName}</td>
                    <td style={{ minWidth: 150 }}>{slot.deliveryCharges}</td>
                    <td style={{ minWidth: 200 }}>{slot.startDate}</td>
                    <td style={{ minWidth: 200 }}>{slot.endDate}</td>
                    <td style={{ minWidth: 200 }}>{slot.startTime}</td>
                    <td style={{ minWidth: 200 }}>{slot.endTime}</td>
                    <td style={{ minWidth: 150 }}>{slot.slotClosingTime}</td>
                    <td>{slot.capacity}</td>
                    <td>{slot.priority}</td>
                    <td>{slot.status === IDeliverySlotStatus.Active ? 'Active' : 'Inactive'}</td>
                    {daysOfWeek.map(day => (
                      <td key={day}>
                        {slot.availableDays?.includes(dayNames[day]) ? <RiCheckLine color="black" /> : <RiCheckLine color="#00000015" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <div className="modal fade" id="deliverySlotModal" tabIndex={-1} aria-labelledby="deliverySlotModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deliverySlotModalLabel">{selectedSlot?.id ? 'Edit' : 'Create'} Delivery Slot</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Slot Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedSlot?.deliverySlotName || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, deliverySlotName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Delivery Charges</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedSlot?.deliveryCharges || 0}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, deliveryCharges: parseFloat(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedSlot?.startDate || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, startDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedSlot?.endDate || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, endDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={selectedSlot?.startTime || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, startTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={selectedSlot?.endTime || ''}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, endTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Closing Time (minutes before end)</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedSlot?.slotClosingTime || 0}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, slotClosingTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedSlot?.capacity || 0}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, capacity: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <input
                  type="number"
                  className="form-control"
                  value={selectedSlot?.priority || 1}
                  onChange={(e) => setSelectedSlot({ ...selectedSlot!, priority: parseInt(e.target.value) })}
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
              <div className="form-group mt-4">
                <b>Available Days</b>
                <div>
                  {daysOfWeek.map((day) => (
                    <div className="form-check form-switch d-flex justify-content-between" key={day}>
                      <label className="form-check-label">{dayNames[day]}</label>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedDays.includes(dayNames[day])}
                        onChange={() => handleDayChange(dayNames[day])}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleCreateOrUpdate}>{selectedSlot?.id ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DeliverySlot;
