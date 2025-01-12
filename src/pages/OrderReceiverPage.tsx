import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateReceiverAddress } from '../services/orderService';

const OrderReceiverPage: React.FC = () => {
    const { encryptedOrderId } = useParams<{ encryptedOrderId: string }>();
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!address) {
            setError('Address is required');
            return;
        }
        try {
            await updateReceiverAddress(encryptedOrderId!, address);
            alert('Address updated successfully!');
            navigate('/'); // Redirect to home or desired page
        } catch (err) {
            console.error(err);
            setError('Failed to update address');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Update Address</h1>
            <div className="form-group">
                <label htmlFor="address">Enter Receiver Address</label>
                <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Enter Receiver address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            {error && <div className="text-danger">{error}</div>}
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default OrderReceiverPage;
