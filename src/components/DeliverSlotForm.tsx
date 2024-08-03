import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createDeliverSlot, updateDeliverSlot } from '../services/deliverySlotService';
import { IDeliverSlot as DeliverSlot } from '../interfaces/IDeliverSlot';

interface Props {
  slot: DeliverSlot | null;
  onSave: () => void;
}

const DeliverSlotForm: React.FC<Props> = ({ slot, onSave }) => {
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [thresholdMinutes, setThresholdMinutes] = useState<number>(0);
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');

  useEffect(() => {
    if (slot) {
      setDate(slot.date);
      setStartTime(slot.startTime);
      setEndTime(slot.endTime);
      setThresholdMinutes(slot.thresholdMinutes);
      setStatus(slot.status);
    } else {
      setDate('');
      setStartTime('');
      setEndTime('');
      setThresholdMinutes(0);
      setStatus('ACTIVE');
    }
  }, [slot]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: DeliverSlot = { id: slot?.id || 0, date, startTime, endTime, thresholdMinutes, status };

    if (slot) {
      await updateDeliverSlot(slot.id, newSlot);
    } else {
      await createDeliverSlot(newSlot);
    }

    onSave();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="startTime">
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="endTime">
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="thresholdMinutes">
        <Form.Label>Threshold Minutes</Form.Label>
        <Form.Control
          type="number"
          value={thresholdMinutes}
          onChange={(e) => setThresholdMinutes(Number(e.target.value))}
          required
        />
      </Form.Group>
      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
          required
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default DeliverSlotForm;
