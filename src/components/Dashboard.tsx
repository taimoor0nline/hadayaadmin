import { RiPrinterLine } from "@remixicon/react";
import React from "react";
import { Button, Card, Table } from "react-bootstrap";

const Dashboard = () => {
    return <div className="container container-fluid">
        <h1>Dashboard</h1>

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
                        <th>Slot</th>
                        <th>Collecting Address</th>
                        <th>Confirmed</th>
                        <th>Preparing</th>
                        <th>Ready</th>
                        <th>Picked</th>
                        <th>Delivering</th>
                        <th>Delivered</th>
                        <th>Cancelled</th>
                        <th>Returned</th>
                        <th>Total</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>9am - 2pm</td>
                            <td>4</td>
                            <td>2</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td></td>
                            <td>3</td>
                            <td></td>
                            <td></td>
                            <td>24</td>
                        </tr>
                        <tr>
                            <td>9am - 2pm</td>
                            <td>4</td>
                            <td>2</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td></td>
                            <td>3</td>
                            <td></td>
                            <td></td>
                            <td>24</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </div>;
};

export default Dashboard;
