export interface ICustomer {
  id: number;
  shopifyCustomerId: string;
  email: string | null;
  phone: string | null;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
