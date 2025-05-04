import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import io from 'socket.io-client';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
type Order = {
  _id: string;
  date: string;
  status: "pending" | "confirmed" | "canceled";
  name_req: string;
  address: string;
  tel: string;
  postal: string;
  req_email: string;
  etat: string;
  ville: string;
  gen: string;
  items: string;
  utiliste :any;
  merci : any;
};

const parseOrderDate = (dateString: string): Date => {
  const [datePart, timePart] = dateString.split(', ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes] = timePart.split(':');
  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );
};

const OrderTableToday = ({ statusOeder }: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

const [up1,setIp1] = useState(false)
const [up2,setUp2] =useState(false)
useLayoutEffect(() => {
  // Initialize WebSocket connection
  const socket = io(`${baseUrl}`);

  // Fetch initial orders (synchronous part before paint)
  setLoading(true);
  const fetchInitialOrders = async () => {
    try {
      const response = await axios.get(`${baseUrl}/ordersToday`);
      const sortedOrders = response.data.sort((a: Order, b: Order) => {
        return parseOrderDate(b.date).getTime() - parseOrderDate(a.date).getTime();
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Immediate execution for critical initial render
  fetchInitialOrders();

  // WebSocket listeners
  const handleNewOrder = (newOrder: Order) => {
    setOrders(prev => {
      // Deduplication
      if (prev.some(order => order._id === newOrder._id)) return prev;
      
      // Optimized sorting with memoization opportunity
      const updatedOrders = [newOrder, ...prev];
      return updatedOrders.sort((a, b) => 
        parseOrderDate(b.date).getTime() - parseOrderDate(a.date).getTime()
      );
    });

    // DOM manipulation (primary reason for useLayoutEffect)
    requestAnimationFrame(() => {
      const newRow = document.getElementById(newOrder._id);
      if (newRow) {
        newRow.classList.add('new-order-highlight');
        
        // Auto-remove highlight after animation
        setTimeout(() => {
          newRow.classList.remove('new-order-highlight');
        }, 3000);
      }
    });
  };

  socket.on('tbf', handleNewOrder);

  // Cleanup
  return () => {
    socket.off('tbf', handleNewOrder);
    socket.disconnect();
  };
}, [baseUrl]);

  const Popup = () => {
    const closePopup = () => {
      setSelectedOrder(null);
      setMessage('');
    };

    return (
      <motion.div
        className="w-full z-20 bg-white p-4 absolute flex flex-col gap-3 shadow-lg rounded-lg max-w-xs mx-auto dark:bg-gray-900  "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="dark:text-gray-600" >Update Response:</p>
        <p className="text-gray-700 dark:text-white">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={closePopup}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            aria-label="Close Popup"
          >
            Close
          </button>
        </div>
      </motion.div>
    );
  };

  const filterOrders = (order: Order) => {
  
    return statusOeder === "all" || order.status === statusOeder;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100";
      case "confirmed": return "bg-green-100";
      case "canceled": return "bg-red-100";
      default: return "bg-gray-500";
    }
  };

  const getStatusTColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-500";
      case "confirmed": return "text-green-500";
      case "canceled": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const updateStatus = (newStatus: "pending" | "confirmed" | "canceled") => {
    if (!selectedOrder) return;
newStatus == "canceled" ? setIp1(true) : setUp2(true)
    axios.post(`${baseUrl}/update_orders_status/${selectedOrder._id}`, { status: newStatus })
      .then((res) => {
        if(res.data){
          setMessage('Sattus updated Succesfully');
    
      
          setOrders(prev => prev.map(order => 
            order._id === selectedOrder._id ? { ...order, status: newStatus } : order
          ));
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
        setIp1(false) 
        setUp2(false)
 
      })
      .catch(console.error);
  };

  const calculateTotalPrice = () => {
    if (!selectedOrder) return 0;
    const items = JSON.parse(selectedOrder.items);
    return items.reduce((total: number, item: any) => 
      total + item.current_price * item.quantity, 0
    );
  };

  return (
   
    <div className="overflow-x-auto scroll-container mt-3 max-h-[65vh]">
      <style>{`
        .new-order-highlight {
          animation: highlight 2s ease-out;
        }
        @keyframes highlight {
          0% { background-color: rgba(219, 234, 254, 0.8); }
          100% { background-color: inherit; }
        }
      `}</style>



      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                <FaSpinner className="animate-spin text-3xl mx-auto" />
              </td>
            </tr>
          ) : orders.filter(filterOrders).length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No orders found matching the criteria.
              </td>
            </tr>
          ) : (
            orders
              .filter(filterOrders)
              .map((order) => (
                <tr 
                  key={order._id} 
                  id={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.date}</td>
                  <td className="border px-4 py-2 text-center">
                    <span className={`inline-block rounded-md p-2 ${getStatusColor(order.status)} ${getStatusTColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white flex gap-2 items-center justify-center p-2 rounded hover:bg-blue-600 transition-colors"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <i className="ri-equalizer-line "></i>
                      <span>View & Modify</span>
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>

    
      {selectedOrder && (
      <>
      
    
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        {message != '' ?<Popup /> : null}
          <div className="bg-white rounded-md shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative dark:bg-gray-800">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Client Details</h2>
                {Object.entries({
                  Name: selectedOrder.name_req,
                  Address: selectedOrder.address,
                  Phone: selectedOrder.tel,
                  "Postal Code": selectedOrder.postal,
                  Email: selectedOrder.req_email,
                  City: selectedOrder.ville,
                  Gender: selectedOrder.gen,
                  Date: selectedOrder.date
                }).map(([label, value]) => (
                  <p key={label} className="flex justify-between border-b pb-2">
                    <strong>{label}:</strong> {value}
                  </p>
                ))}
                <div className="flex gap-3 mt-4">
                  <button 
                  disabled = {selectedOrder.status == "confirmed"}
                    onClick={() => updateStatus("confirmed")}
     className={`bg-green-100 text-green-600 px-4 py-2 rounded hover:bg-green-200 transition-colors ${selectedOrder.status == "confirmed" ? "cursor-not-allowed": 'cursor-pointer'}`}
                  >
                 { up2 ? 'loading .. '  :'  Confirm Order'}   
                  </button>
                  <button 
                
                    onClick={() => { updateStatus("canceled")}}
                    disabled = {selectedOrder.status == "canceled"}
                    className={`bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition-colors ${selectedOrder.status == "canceled" ? "cursor-not-allowed": 'cursor-pointer'}`}
                  >
                   { up1 ? 'loading .. '  :' Cancel Order'}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="grid grid-cols-1 gap-4">
                  {JSON.parse(selectedOrder.items).map((item: any) => (
                    <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                      <img 
                        src={item.product_image_0} 
                        alt={item.name} 
                        className="h-24 w-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.current_price} TND</p>
                      </div>
                    </div>
                  ))}
                </div>
      {
        selectedOrder.utiliste > 0 ? <>
       <div className="mt-4 text-xl font-bold">
                Sous  Total: {calculateTotalPrice()} TND
                Total :  {calculateTotalPrice() - (selectedOrder.utiliste * selectedOrder.merci )}
                </div>
        </> : <>
                  <div className="mt-4 text-xl font-bold">
                  Total: {calculateTotalPrice()} TND
                </div>
        </>
      }
                <p>{selectedOrder.utiliste > 0 ? <span>used point de fedilité :{selectedOrder.utiliste}</span> : null} </p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedOrder(null)}
              className="top-4 right-4 p-2 w-11 h-11 absolute rounded-sm bg-gray-700 text-white hover:bg-gray-900 transition-colors"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      </>
      )}
 
    </div>
  );
};

export default OrderTableToday;