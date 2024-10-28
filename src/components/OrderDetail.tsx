import React, { useEffect, useState } from 'react';
import { getOrderById, updateOrderStatus } from '../services/orderService';
import { IOrder } from '../interfaces/Order';
import { Button, Modal, Form, Table, Row, Col, Card } from 'react-bootstrap';
import '../styles/order-detail.css';
import { getDeliverySlots } from '../services/deliverySlotService';
import { IDeliverySlot } from '../interfaces/DeliverSlot';

interface OrderDetailProps {
  orderId: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');

  const [notes, setNotes] = useState('');
  const [notesError, setNotesError] = useState(false);
  const [deliverySlots, setDeliverySlots] = useState<IDeliverySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<IDeliverySlot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const data = await getOrderById(orderId);
        setOrder(data);
        // console.log('order details : ', data);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async () => {
    if (!notes.trim()) {
      setNotesError(true);
      return;
    }

    if (order && newStatus && selectedSlot && notes) {
      try {
        await updateOrderStatus(
          order?.shopifyOrderId?.toString() || '', // Ensure shopifyOrderId is a string
          newStatus,
          selectedSlot.id?.toString() || '',       // Ensure selectedSlot ID is a string
          notes
        );
        setOrder({ ...order, status: newStatus });  // Update local order state with new status
        setShowModal(false);
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    } else {
      console.warn("Please select a delivery slot and add notes before saving.");
    }
  };

  useEffect(() => {
    if (showModal) {
      const fetchDeliverySlots = async () => {
        try {
          const response = await getDeliverySlots();
          setDeliverySlots(response?.data);
          setLoadingSlots(false);
        } catch (error) {
          console.error('Error fetching delivery slots:', error);
          setLoadingSlots(false);
        }
      };
      fetchDeliverySlots();
    }
  }, [showModal]);

  // Calculate Subtotal Dynamically
  const calculateSubtotal = () => {
    if (order && order.items) {
      return order.items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    }
    return 0;
  };

  const handlePrintCard = () => {
    const printWindow = window.open('', 'PRINT', 'width=800,height=600');
    printWindow?.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .print-card {
              width: 100%;
              height: 100%;
              display:flex;
              justify-content:center;
              align-items:center;
              text-align: center;
              position: relative;
            }
            .order-id {
              position: absolute;
              top: 10px;
              right: 10px;
              font-size: 14px;
              font-weight: bold;
            }
            .order-note {
              font-size: 18px;
              font-weight: bold;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="print-card">
            <div class="order-id">Order ID: ${order?.shopifyOrderId}</div>
            <div class="order-note">${order?.orderNote}</div>
          </div>
        </body>
      </html>
    `);

    printWindow?.document.close();

    setTimeout(() => {
      printWindow?.print();
      printWindow?.close();
    }, 500);
  };


  if (!order) return <div>Loading...</div>;

  const subtotal = calculateSubtotal();
  const totalTax = parseFloat(order.currentTotalTax) || 0;
  const totalDiscounts = parseFloat(order.currentTotalDiscounts) || 0;
  const totalPrice = subtotal + totalTax - totalDiscounts;

  // Method to print only the order detail content
  const handlePrint = () => {
    const printContent = document.getElementById('order-detail-content');
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Set the body content to the order-detail content for printing
      document.body.innerHTML = printContent.innerHTML;
      window.print();

      // Restore the original content after printing
      document.body.innerHTML = originalContent;
      window.location.reload(); // Reload to restore any dynamic functionality
    }
  };

  return (
    <div className="order-detail container mt-4">

      <div className="d-flex justify-content-end mb-3 d-print-none">
        <Button variant="primary" onClick={() => setShowModal(true)} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Update Status
        </Button>

        <Button variant="secondary" onClick={handlePrint} style={{ padding: '10px 20px' }} >
          Print
        </Button>

        <Button variant="primary" onClick={handlePrintCard} style={{ padding: '10px 20px' }} >
          Print Card
        </Button>

      </div>

      <hr />
      <div id="order-detail-content">
        <Card>
          <Card.Body>
            <Row className="mb-3">

              <Col md={6}>
                <h5>Sender Details</h5>
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td><strong>Name:</strong></td>
                      <td colSpan={3}>{order.sender.firstName} {order.sender.lastName}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>{order.sender.email}</td>
                      <td><strong>Phone:</strong></td>
                      <td>{order.sender.phone || "N/A"}</td>
                    </tr>
                  </tbody>
                </Table>

              </Col>

              <Col md={6}>
                <h5>Area and Zone</h5>
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td><strong>Area:</strong></td>
                      <td>{order.area.name}</td>
                    </tr>
                    <tr>
                      <td><strong>Zone:</strong></td>
                      <td>{order.area.zone.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>


            </Row>

            {/* Row containing Receiver Details */}
            <Row>
              <Col md={12}>
                <h5>Receiver Details</h5>
                {order.recipients.map((recipient, index) => (
                  <Table bordered size="sm" key={recipient.id}>
                    <tbody>
                      <tr>
                        <td><strong>Recipient #{index + 1}:</strong></td>
                        <td>{recipient.recipientName}</td>
                        <td><strong>Phone:</strong></td>
                        <td>{recipient.recipientPhone}</td>
                      </tr>
                      <tr>
                        <td><strong>Address:</strong></td>
                        <td>{recipient.recipientAddress}</td>
                        <td><strong>Delivery Slot:</strong></td>
                        <td>{recipient.deliverySlot}</td>
                      </tr>
                      <tr>
                        <td><strong>Delivery Status:</strong></td>
                        <td>{recipient.deliveryStatus}</td>
                        <td><strong>Message:</strong></td>
                        <td>{recipient.message}</td>
                      </tr>
                    </tbody>
                  </Table>
                ))}
              </Col>
            </Row>

            <h5 className="mt-4">Order Information</h5>
            <Table bordered size="sm">
              <tbody>
                <tr>
                  <td><strong>Shopify Order ID:</strong></td>
                  <td>{order.shopifyOrderId}</td>
                </tr>
                <tr>
                  <td><strong>Status:</strong></td>
                  <td>{order.status}</td>
                </tr>
                <tr>
                  <td><strong>Financial Status:</strong></td>
                  <td>{order.financialStatus}</td>
                </tr>
              </tbody>
            </Table>

            <h5 className="mt-4">Items</h5>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Sub-total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td><img src={item?.picture} alt={item.title} height={40} width={60} style={{ objectFit: 'cover' }} /></td>
                    <td>{item.title}</td>
                    <td>{item.sku || "N/A"}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} {order.currency}</td>
                    <td>{item.quantity * parseFloat(item.price)} {order.currency}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h5 className="mt-4">Order Totals</h5>
            <Table bordered size="sm">
              <tbody>
                <tr>
                  <td><strong>Subtotal:</strong></td>
                  <td>{subtotal.toFixed(3)} {order.currency}</td>
                </tr>
                <tr>
                  <td><strong>Total Discounts:</strong></td>
                  <td>{totalDiscounts.toFixed(3)} {order.currency}</td>
                </tr>
                <tr>
                  <td><strong>Total Tax:</strong></td>
                  <td>{totalTax.toFixed(3)} {order.currency}</td>
                </tr>
                <tr>
                  <td><strong>Total Price:</strong></td>
                  <td>{totalPrice.toFixed(3)} {order.currency}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Status Dropdown */}
            <Form.Group controlId="status">
              <Form.Label>New Status</Form.Label>
              <Form.Control as="select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="collecting-address">Collecting Address</option>
                <option value="ordered">Ordered</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="picked">Picked</option>
                <option value="delivering">Delivering</option>
                <option value="delivered">Delivered</option>
                <option value="return">Return</option>
                <option value="cancel">Cancel</option>
              </Form.Control>
            </Form.Group>

            {/* Delivery Slot Dropdown */}
            <Form.Group controlId="delivery-slot">
              <Form.Label>Delivery Slots</Form.Label>
              <Form.Control
                as="select"
                value={selectedSlot?.id?.toString() || ''}  // Convert selectedSlot id to string, or default to empty string
                onChange={(e) => setSelectedSlot(
                  deliverySlots.find(slot => slot.id?.toString() === e.target.value) || null
                )}
                disabled={loadingSlots}
                required
              >
                <option value="">Select Delivery Slot</option>
                {deliverySlots.map((slot) => (
                  <option key={slot.id?.toString() || slot.deliverySlotName} value={slot.id?.toString()}>
                    {slot.deliverySlotName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>


            {/* Notes Text Area */}
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  if (notesError) setNotesError(false);
                }}
                isInvalid={notesError}
              />
              <Form.Control.Feedback type="invalid">
                Notes are required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderDetail;