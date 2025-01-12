import React, { useEffect, useState } from "react";
import { Button, Card, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getDeliveryStatusSummaryByDate } from "../services/DeliveryStatusSummaryService";
import { IDeliveryStatusSummary } from "../interfaces/DeliveryStatusSummary";

const Dashboard = () => {
  const [summaries, setSummaries] = useState<IDeliveryStatusSummary[]>([]); // Table data
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  ); // Default to current date
  const [error, setError] = useState<string>(""); // Error handling
  const navigate = useNavigate();

  // Fetch delivery status summary by date
  const fetchSummary = async (date: string) => {
    try {
      const data = await getDeliveryStatusSummaryByDate(date);
      const summariesArray = Object.entries(data).map(([key, value]) => ({
        slotId: key,
        ...value,
      })) as IDeliveryStatusSummary[];

      setSummaries(summariesArray); // Update table data
    } catch (error) {
      console.error("Error fetching summary data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  // Fetch data on page load and whenever the selected date changes
  useEffect(() => {
    fetchSummary(selectedDate);
  }, [selectedDate]);

  // Handle date picker change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value); // Update selected date
  };

  // Navigate to orders list on button click
  const handleStatusClick = (slotId: string, status: string) => {
    navigate(`/orders/list?deliverySlotId=${slotId}&status=${status}`);
  };

  return (
    <div className="container container-fluid">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Dashboard</h4>
            <Form.Group>
              <Form.Label>Select Date:</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate} // Controlled input
                onChange={handleDateChange} // Handle date change
              />
            </Form.Group>
          </div>
        </Card.Header>
        <Card.Body>
          {error && <div className="text-danger mb-3">{error}</div>} {/* Display error */}
          <Table responsive striped>
            <thead>
              <tr>
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
              </tr>
            </thead>
            <tbody>
              {summaries.length > 0 ? (
                summaries.map((summary) => (
                  <tr key={summary.slotId}>
                    <td>{summary.slotName}</td>
                    {[
                      "CollectingAddress",
                      "Confirmed",
                      "Preparing",
                      "Ready",
                      "Picked",
                      "Delivering",
                      "Delivered",
                      "Cancelled",
                      "Returned",
                    ].map((status) => (
                      <td key={status}>
                        <Button
                          variant="link"
                          onClick={() =>
                            handleStatusClick(summary.slotId, status)
                          }
                        >
                          {summary[status as keyof IDeliveryStatusSummary] || 0}
                        </Button>
                      </td>
                    ))}
                    <td>{summary.Total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
