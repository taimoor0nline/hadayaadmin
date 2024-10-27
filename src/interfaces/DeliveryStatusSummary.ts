export interface IDeliveryStatusSummary {
  slotName: string;
  slotId:string;
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
  [key: string]: number | string;
}

export interface IDeliveryStatusSummaryResponse {
  summaries: { [key: string]: IDeliveryStatusSummary }; 
  totalOrders: number;
}

