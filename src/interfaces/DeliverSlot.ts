export interface IDeliverySlot {
  id?: number;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  thresholdMinutes?: number;
  status?: IDeliverySlotStatus;
}

export enum IDeliverySlotStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}