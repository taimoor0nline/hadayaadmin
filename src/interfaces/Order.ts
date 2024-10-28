import { IArea } from "./Area";
import { ICustomer } from "./Customer";
import { IDeliverySlot } from "./DeliverSlot";

export interface IMappedOrder {
  shopifyOrderId: string;
  orderId : string;
  orderNumber: number;
  deliverySlotName: string;
  isExpressDelivery: string;
  orderNote: string | null;
  isAddressNeededFromRcvr: string;
  isAddressUpdatedByRcvr: string;
  zoneName: string;
  areaName: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  recipientPhone: string;
  status: string;
}



export interface IOrder {
  id: number;
  shopifyOrderId: string;
  senderId: number;
  orderId: number,
  status: string;
  currentSubtotalPrice: string;
  currentTotalDiscounts: string;
  currentTotalPrice: string;
  currentTotalTax: string;
  currency: string;
  orderNote : string;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
  canceledAt: string | null;
  financialStatus: string;
  fulfillmentStatus: string | null;
  contactEmail: string | null;
  phone: string | null;
  areaId: number;
  deliverySlot: IDeliverySlot;
  sender: ICustomer;
  area: IArea;
  recipients: IRecipient[];
  items: IOrderItem[];
  shippingLines: IShippingLine[];
}


export interface IRecipient {
  id: number;
  orderId: number;
  recipientId: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  deliverySlot: string;
  deliveryStatus: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}


export interface IOrderItem {
  picture: string | undefined;
  id: number;
  orderId: number;
  shopifyItemId: string;
  title: string;
  quantity: number;
  price: string;
  productId: string;
  variantId: string;
  sku: string;
  fulfillmentStatus: string | null;
  taxable: boolean;
  giftCard: boolean;
  fulfillmentService: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
}

export interface IShippingLine {
  id: number;
  orderId: number;
  shopifyShippingLineId: string;
  title: string;
  price: string;
  code: string;
  source: string;
  carrierIdentifier: string;
  discountedPrice: string;
  requestedFulfillmentServiceId: string | null;
  createdAt: string;
  updatedAt: string;
}
