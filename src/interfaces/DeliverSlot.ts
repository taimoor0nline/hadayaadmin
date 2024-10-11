export interface IDeliverySlot {
  id?: number;
  slotName?: string;
  startDate?: string;
  endDate?: string;
  startDelivery?: string;
  endDelivery?: string;
  startTime?: string;
  endTime?: string;
  thresholdMinutes?: number;
  priority? : string,
  charges? : string,
  status?: IDeliverySlotStatus;
  availableDays?: string[]; // Add this line
}


export enum IDeliverySlotStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}
