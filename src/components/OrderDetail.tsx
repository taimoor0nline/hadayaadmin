import React, { useEffect, useState } from 'react';
import { getOrderById, updateOrderStatus } from '../services/orderService';
import { IOrder } from '../interfaces/Order';
import { Button, Modal, Form, Table, Row, Col, Card } from 'react-bootstrap';
import '../styles/order-detail.css';

interface OrderDetailProps {
  orderId: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const data = await getOrderById(orderId);
        setOrder(data);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async () => {
    if (order && newStatus) {
      await updateOrderStatus(order.id.toString(), newStatus);
      setOrder({ ...order, status: newStatus });
    }
    setShowModal(false);
  };

  const printOrder = () => {
    window.print();
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="order-detail container mt-4">
      <Card>
        <Card.Body>
          <Row className="mb-3">
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
            <Col md={6} className="d-flex justify-content-end align-items-start">
              <div className="d-print-none">
                <Button variant="secondary" onClick={printOrder} className="mr-2">
                  Print
                </Button>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Update Status
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h5>Sender Details</h5>
              <Table bordered size="sm">
                <tbody>
                  <tr>
                    <td><strong>Customer ID:</strong></td>
                    <td>{order.sender.shopifyCustomerId}</td>
                  </tr>
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>{order.sender.firstName} {order.sender.lastName}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{order.sender.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone:</strong></td>
                    <td>{order.sender.phone || "N/A"}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <h5>Receiver Details</h5>
              {order.recipients.map((recipient, index) => (
                <div key={recipient.id} className="mb-3">
                  <Table bordered size="sm">
                    <tbody>
                      <tr>
                        <td><strong>Recipient #{index + 1}:</strong></td>
                        <td>{recipient.recipientName}</td>
                      </tr>
                      <tr>
                        <td><strong>Phone:</strong></td>
                        <td>{recipient.recipientPhone}</td>
                      </tr>
                      <tr>
                        <td><strong>Address:</strong></td>
                        <td>{recipient.recipientAddress}</td>
                      </tr>
                      <tr>
                        <td><strong>Delivery Slot:</strong></td>
                        <td>{recipient.deliverySlot}</td>
                      </tr>
                      <tr>
                        <td><strong>Delivery Status:</strong></td>
                        <td>{recipient.deliveryStatus}</td>
                      </tr>
                      <tr>
                        <td><strong>Message:</strong></td>
                        <td>{recipient.message}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ))}
            </Col>
          </Row>

          <h5 className="mt-4">Order Summary</h5>
          <Table bordered size="sm">
            <tbody>
              <tr>
                <td><strong>Order ID:</strong></td>
                <td>{order.id}</td>
              </tr>
              <tr>
                <td><strong>Shopify Order ID:</strong></td>
                <td>{order.shopifyOrderId}</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td>{order.status}</td>
              </tr>
              <tr>
                <td><strong>Subtotal Price:</strong></td>
                <td>{order.currentSubtotalPrice} {order.currency}</td>
              </tr>
              <tr>
                <td><strong>Total Discounts:</strong></td>
                <td>{order.currentTotalDiscounts} {order.currency}</td>
              </tr>
              <tr>
                <td><strong>Total Price:</strong></td>
                <td>{order.currentTotalPrice} {order.currency}</td>
              </tr>
              <tr>
                <td><strong>Total Tax:</strong></td>
                <td>{order.currentTotalTax} {order.currency}</td>
              </tr>
              <tr>
                <td><strong>Financial Status:</strong></td>
                <td>{order.financialStatus}</td>
              </tr>
              <tr>
                <td><strong>Fulfillment Status:</strong></td>
                <td>{order.fulfillmentStatus || "Not fulfilled"}</td>
              </tr>
              <tr>
                <td><strong>Created At:</strong></td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Updated At:</strong></td>
                <td>{new Date(order.updatedAt).toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Contact Email:</strong></td>
                <td>{order.contactEmail}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>{order.phone || "N/A"}</td>
              </tr>
            </tbody>
          </Table>

          <h5 className="mt-4">Items</h5>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>SKU</th>
                <th>Vendor</th>
                <th>Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} {order.currency}</td>
                  <td>{item.sku || "N/A"}</td>
                  <td>{item.vendor}</td>
                  <td>{item.fulfillmentStatus || "Not fulfilled"}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5 className="mt-4">Order Totals</h5>
          <Table bordered size="sm">
            <tbody>
              <tr>
                <td><strong>Subtotal:</strong></td>
                <td>{order.currentSubtotalPrice} {order.currency}</td>
              </tr>
              <tr>
                <td><strong>Total Discounts:</strong></td>
                <td>{order.currentTotalDiscounts} {order.currency}</td>
              </tr>
              <tr>
                <td><strong>Total Tax:</strong></td>
                <td>{order.currentTotalTax} {order.currency}</td>
              </tr>
              <tr>
                <td><strong>Total Price:</strong></td>
                <td>{order.currentTotalPrice} {order.currency}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="status">
              <Form.Label>New Status</Form.Label>
              <Form.Control as="select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="unfulfilled">Unfulfilled</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="canceled">Canceled</option>
              </Form.Control>
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
