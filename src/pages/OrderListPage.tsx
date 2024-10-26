import React from 'react';
import OrderList from '../components/OrderList';
import { useSearchParams } from 'react-router-dom';

const OrderListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const slot = searchParams.get('slot');
  const status = searchParams.get('status');

  return (
    <div>
     <OrderList slot={slot ?? undefined} status={status ?? undefined} />
    </div>
  );
};

export default OrderListPage;
