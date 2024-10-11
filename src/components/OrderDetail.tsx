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
      await updateOrderStatus(order.shopifyOrderId.toString(), newStatus);
      setOrder({ ...order, status: newStatus });
    }
    setShowModal(false);
  };

  // Calculate Subtotal Dynamically
  const calculateSubtotal = () => {
    if (order && order.items) {
      return order.items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    }
    return 0;
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

  <Button variant="secondary" onClick={handlePrint}  style={{ padding: '10px 20px' }} >
    Print
  </Button>
 
</div>

 <hr/>
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
            <Form.Group controlId="status">
              <Form.Label>New Status</Form.Label>
              <Form.Control as="select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <option value="unfulfilled">Unfulfilled</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="cancelled">Cancelled</option>
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