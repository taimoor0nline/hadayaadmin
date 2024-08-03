import React, { useEffect, useState } from 'react';
import '../styles/order-detail.css';
import { useParams } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../services/shopifyService';
import { Order } from '../interfaces/Interfaces';
import { Accordion, Card, Button, Modal, Form } from 'react-bootstrap';

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetail = async () => {
        try {
          const order = await getOrderById(orderId);
          setOrder(order);
        } catch (error) {
          console.error('Error fetching order detail:', error);
        }
      };

      fetchOrderDetail();
    }
  }, [orderId]);

  const handleStatusChange = async () => {
    if (!order) return;

    try {
      await updateOrderStatus(order.id.toString(), newStatus);
      setOrder({ ...order, fulfillment_status: newStatus });
      setShowModal(false);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (!order) {
    return <div className="container mt-5"><p>Loading order details...</p></div>;
  }

  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <div className="card-header">
          <h2>Order ID: {order.id}</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>Update Order Status</Button>
        </div>
        <div className="card-body">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Customer Information</Accordion.Header>
              <Accordion.Body>
                <div className="mb-3">
                  <strong>Name:</strong> {order.customer?.first_name} {order.customer?.last_name}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {order.customer?.email || 'N/A'}
                </div>
                <div className="mb-3">
                  <strong>Phone:</strong> {order.customer?.phone || 'N/A'}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Order Information</Accordion.Header>
              <Accordion.Body>
                <div className="mb-3">
                  <strong>Order Number:</strong> {order.order_number}
                </div>
                <div className="mb-3">
                  <strong>Confirmation Number:</strong> {order.confirmation_number}
                </div>
                <div className="mb-3">
                  <strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}
                </div>
                <div className="mb-3">
                  <strong>Updated At:</strong> {new Date(order.updated_at).toLocaleString()}
                </div>
                <div className="mb-3">
                  <strong>Total Price:</strong> {order.current_total_price}
                </div>
                <div className="mb-3">
                  <strong>Order Status:</strong> {order.fulfillment_status || 'Pending'}
                </div>
                <div className="mb-3">
                  <strong>Financial Status:</strong> {order.financial_status}
                </div>
                <div className="mb-3">
                  <strong>Landing Site:</strong> {order.landing_site}
                </div>
                <div className="mb-3">
                  <strong>Currency:</strong> {order.currency}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Billing Address</Accordion.Header>
              <Accordion.Body>
                <div className="mb-3">
                  <strong>Name:</strong> {order.billing_address.name}
                </div>
                <div className="mb-3">
                  <strong>Address 1:</strong> {order.billing_address.address1}
                </div>
                <div className="mb-3">
                  <strong>Address 2:</strong> {order.billing_address.address2 || 'N/A'}
                </div>
                <div className="mb-3">
                  <strong>City:</strong> {order.billing_address.city}
                </div>
                <div className="mb-3">
                  <strong>Country:</strong> {order.billing_address.country}
                </div>
                <div className="mb-3">
                  <strong>Province:</strong> {order.billing_address.province || 'N/A'}
                </div>
                <div className="mb-3">
                  <strong>ZIP:</strong> {order.billing_address.zip || 'N/A'}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Shipping Address</Accordion.Header>
              <Accordion.Body>
                <div className="mb-3">
                  <strong>Name:</strong> {order.shipping_address.name}
                </div>
                <div className="mb-3">
                  <strong>Address 1:</strong> {order.shipping_address.address1}
                </div>
                <div className="mb-3">
                  <strong>Address 2:</strong> {order.shipping_address.address2 || 'N/A'}
                </div>
                <div className="mb-3">
                  <strong>City:</strong> {order.shipping_address.city}
                </div>
                <div className="mb-3">
                  <strong>Country:</strong> {order.shipping_address.country}
                </div>
                <div className="mb-3">
                  <strong>Province:</strong> {order.shipping_address.province || 'N/A'}
                </div>
                <div className="mb-3">
                  <strong>ZIP:</strong> {order.shipping_address.zip || 'N/A'}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Order Notes</Accordion.Header>
              <Accordion.Body>
                <ul className="list-group mb-3">
                  {order.note_attributes.map((note, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{note.name}:</strong> {note.value}
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Items</Accordion.Header>
              <Accordion.Body>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.line_items.map(item => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mb-3">
                  <strong>Total Items Price:</strong> {order.subtotal_price}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Tax Lines</Accordion.Header>
              <Accordion.Body>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.tax_lines.map((tax, index) => (
                      <tr key={index}>
                        <td>{tax.title}</td>
                        <td>{tax.price}</td>
                        <td>{tax.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mb-3">
                  <strong>Total Tax:</strong> {order.total_tax}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>Payment Gateway</Accordion.Header>
              <Accordion.Body>
                <ul className="list-group mb-3">
                  {order.payment_gateway_names.map((gateway, index) => (
                    <li key={index} className="list-group-item">
                      {gateway}
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="orderStatus">
              <Form.Label>Order Status</Form.Label>
              <Form.Control
                as="select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="dispatched">Dispatched</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
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
