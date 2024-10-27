import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getDeliveryStatusSummaryByDate } from "../services/DeliveryStatusSummaryService";
import { IDeliveryStatusSummary } from "../interfaces/DeliveryStatusSummary";
import { RiPrinterLine } from "@remixicon/react";

const Dashboard = () => {
  const [summaries, setSummaries] = useState<IDeliveryStatusSummary[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const navigate = useNavigate();
  const date = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDeliveryStatusSummaryByDate(date);
        
       
        const summariesArray = Object.entries(data).map(([key, value]) => ({
          slotId: key,
          ...value
        })) as IDeliveryStatusSummary[];

        setSummaries(summariesArray);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchSummary();
  }, [date]);

  const handleStatusClick = (slotId: string, status: string) => {
    navigate(`/orders/list?deliverySlotId=${slotId}&status=${status}`);
  };
  
  return (
    <div className="container container-fluid">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            {/* <Button style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <RiPrinterLine />
              <span>Print</span>
            </Button> */}
          </div>
        </Card.Header>
        <Card.Body>
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
                    {['CollectingAddress', 'Confirmed', 'Preparing', 'Ready', 'Picked', 'Delivering', 'Delivered', 'Cancelled', 'Returned'].map((status) => (
                        <td key={status}>
                          <Button
                            variant="link"
                            onClick={() => handleStatusClick(summary.slotId, status)}
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
                  <td colSpan={11} className="text-center">No data available</td>
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
