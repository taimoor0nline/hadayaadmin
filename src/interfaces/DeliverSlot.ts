export interface IDeliverySlot {
  id?: number;
  deliverySlotName: string;
  deliveryCharges: number;
  startDate: string;
  endDate: string;
  startDelivery: string;
  endDelivery: string;
  startTime: string;
  endTime: string;
  capacity: number;
  priority: number;
  status: IDeliverySlotStatus;
  availableDays: string[];
  slotClosingTime:string;
  // createdAt?: Date;
  // updatedAt?: Date;
}

export enum IDeliverySlotStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}
