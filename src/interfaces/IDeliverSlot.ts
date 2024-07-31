export interface IDeliverSlot {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    thresholdMinutes: number;
    status: 'ACTIVE' | 'INACTIVE';
  }