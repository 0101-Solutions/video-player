import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Order from './Order';

import Loader from "../../../components/Loader";
import { showErrorToast } from "../../../components/Toast";
import { useGetOrdersQuery } from '../order/ordersApiSlice';

const OrdersList = () => {
  const navigate = useNavigate();

  const {
    data: orders,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetOrdersQuery();

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  if (isSuccess) {

    const { ids } = orders;

    const tableContent = ids?.length ? ids.map(orderId => <Order key={orderId} orderId={orderId} />) : <tbody><tr><td>No orders found.</td></tr></tbody>

    content = (
      <>
        <Helmet>
          <title>ELDT Orders List</title>
          <meta name="description" content={`Orders List - ELDT Trucking School App`} />
          <meta name="keyword" content="ELDT Trucking School" />
          <meta property="og:title" content="ELDT Trucking School App" />
          <link rel="canonical" href="https://www.eldttrucking.com/dashboard/admin/orders" />
        </Helmet>
        <div className="dashboard-content-one">

          {isError && showErrorToast(error?.message)}

          <div className="card height-auto mb-5 border-0 responsive">
            <div className="card-body">
              <div className="heading-layout1">
                <div className="item-title">
                  <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left arrow"></i></a>
                  <h3 className="text-center edit mb-5">All Orders Data</h3>
                </div>
              </div>
              <div className="table table-striped">
                <table className="table display data-table text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Edit Order</th>
                      <th scope="col">Full Names</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Course(s)</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Total</th>
                      <th scope="col">Created At</th>
                    </tr>
                  </thead>
                  {tableContent}
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return content;
}

export default OrdersList