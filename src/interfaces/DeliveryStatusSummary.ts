export interface IDeliveryStatusSummary {
  slotName: string;
  collectingAddress: number;
  confirmed: number;
  preparing: number;
  ready: number;
  picked: number;
  delivering: number;
  delivered: number;
  cancelled: number;
  returned: number;
  total: number;
}

export interface IDeliveryStatusSummaryResponse {
  summaries: IDeliveryStatusSummary[];
  totalOrders: number;
}