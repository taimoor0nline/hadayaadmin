import { RiPrinterLine } from "@remixicon/react";
import React from "react";
import { Button, Card, Table } from "react-bootstrap";

const PackingSlip = () => {
    return <div className="container container-fluid">
        <h1>Packing Slip</h1>

        <Card>
            <Card.Header>
                <div className="d-flex justify-content-between">
                    {/* <h5>Order # 1234567</h5> */}
                    <Button style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <RiPrinterLine />
                        <span>
                            Print
                        </span>
                    </Button>
                </div>
            </Card.Header>
            <Card.Body>
                <Table responsive striped>
                    <thead>
                        <th>Order #</th>
                        <th>Slot</th>
                        <th>Date</th>
                        <th>Recipient #</th>
                        <th>Delivery Area</th>
                        <th>Address</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>City</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </div>;
};

export default PackingSlip;
