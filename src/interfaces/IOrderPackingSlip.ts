export interface IPackingSlipProduct {
    productName: string;
    productPicture: string | string[] | null;
    quantity: number;
  }
  
  export interface IPackingSlipOrder {
    shopifyOrderId: any;
    orderNote: any;
    orderId: string;
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    zone: string;
    area: string;
    products: IPackingSlipProduct[];
  }
  
  export interface IOrderPackingSlipResponse {
    orders: IPackingSlipOrder[];
  }