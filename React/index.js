import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ShoppingCart, Users, DollarSign, TrendingUp, Package, Bell, Search, Menu, X, Eye, Edit, Trash2, Plus, Filter } from 'lucide-react';

const ECommerceDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Simulated real-time data
  useEffect(() => {
    // Simulate initial data load
    setProducts([
      { id: 1, name: 'Premium Headphones', price: 299.99, stock: 45, category: 'Electronics', status: 'active', sales: 234 },
      { id: 2, name: 'Wireless Mouse', price: 49.99, stock: 12, category: 'Electronics', status: 'active', sales: 156 },
      { id: 3, name: 'Gaming Keyboard', price: 129.99, stock: 0, category: 'Electronics', status: 'out_of_stock', sales: 89 },
      { id: 4, name: 'USB-C Cable', price: 19.99, stock: 200, category: 'Accessories', status: 'active', sales: 445 },
      { id: 5, name: 'Laptop Stand', price: 79.99, stock: 33, category: 'Accessories', status: 'active', sales: 167 }
    ]);

    setOrders([
      { id: '#ORD-001', customer: 'John Doe', total: 349.98, status: 'delivered', date: '2025-01-15', items: 2 },
      { id: '#ORD-002', customer: 'Sarah Smith', total: 129.99, status: 'processing', date: '2025-01-14', items: 1 },
      { id: '#ORD-003', customer: 'Mike Johnson', total: 199.97, status: 'shipped', date: '2025-01-14', items: 3 },
      { id: '#ORD-004', customer: 'Emily Davis', total: 79.99, status: 'pending', date: '2025-01-13', items: 1 },
      { id: '#ORD-005', customer: 'David Wilson', total: 449.95, status: 'delivered', date: '2025-01-12', items: 4 }
    ]);

    setCustomers([
      { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, spent: 2499.88, joined: '2024-03-15', status: 'active' },
      { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', orders: 8, spent: 1299.92, joined: '2024-05-20', status: 'active' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 15, spent: 3599.85, joined: '2024-01-10', status: 'vip' },
      { id: 4, name: 'Emily Davis', email: 'emily@example.com', orders: 3, spent: 299.97, joined: '2024-12-01', status: 'new' }
    ]);

    setNotifications([
      { id: 1, type: 'warning', message: 'Gaming Keyboard is out of stock', time: '2 min ago' },
      { id: 2, type: 'success', message: 'New order #ORD-006 received', time: '5 min ago' },
      { id: 3, type: 'info', message: 'Wireless Mouse stock is low (12 items)', time: '15 min ago' },
      { id: 4, type: 'success', message: 'Order #ORD-001 delivered successfully', time: '1 hour ago' }
    ]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setNotifications(prev => [
        { id: Date.now(), type: 'info', message: `New activity detected at ${new Date().toLocaleTimeString()}`, time: 'Just now' },
        ...prev.slice(0, 4)
      ]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Sample data for charts
  const salesData = [
    { name: 'Mon', sales: 2400, orders: 24 },
    { name: 'Tue', sales: 1398, orders: 18 },
    { name: 'Wed', sales: 9800, orders: 45 },
    { name: 'Thu', sales: 3908, orders: 28 },
    { name: 'Fri', sales: 4800, orders: 35 },
    { name: 'Sat', sales: 3800, orders: 32 },
    { name: 'Sun', sales: 4300, orders: 29 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 65, color: '#FF6B35' },
    { name: 'Accessories', value: 25, color: '#4A90E2' },
    { name: 'Clothing', value: 10, color: '#7ED321' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-2 flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change >= 0 ? '+' : ''}{change}% from last week
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const ProductRow = ({ product }) => (
    <tr className="hover:bg-gray-50 border-b border-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
          <div>
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.category}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
          product.stock > 20 ? 'bg-green-100 text-green-800' : 
          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {product.stock} in stock
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sales} sold</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="w-4 h-4" /></button>
        <button className="text-green-600 hover:text-green-900 mr-3"><Edit className="w-4 h-4" /></button>
        <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
      </td>
    </tr>
  );

  const OrderRow = ({ order }) => (
    <tr className="hover:bg-gray-50 border-b border-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="w-4 h-4" /></button>
        <button className="text-green-600 hover:text-green-900"><Edit className="w-4 h-4" /></button>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">ECommerce Pro</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'customers', label: 'Customers', icon: Users }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === id ? 'border-r-2 border-blue-500 bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, orders, customers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Revenue"
                  value="$124,592"
                  change={12.5}
                  icon={DollarSign}
                  color="bg-green-500"
                />
                <StatCard
                  title="Total Orders"
                  value="1,429"
                  change={8.2}
                  icon={ShoppingCart}
                  color="bg-blue-500"
                />
                <StatCard
                  title="Total Customers"
                  value="892"
                  change={-2.4}
                  icon={Users}
                  color="bg-purple-500"
                />
                <StatCard
                  title="Products"
                  value="156"
                  change={5.7}
                  icon={Package}
                  color="bg-orange-500"
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${order.total}</p>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          notification.type === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">All Products</h3>
                  <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map(product => (
                        <ProductRow key={product.id} product={product} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  New Order
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map(order => (
                        <OrderRow key={order.id} order={order} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Customer
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {customers.map(customer => (
                  <div key={customer.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{customer.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        customer.status === 'vip' ? 'bg-gold-100 text-gold-800' :
                        customer.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {customer.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{customer.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{customer.email}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Orders:</span>
                        <span className="font-medium">{customer.orders}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Spent:</span>
                        <span className="font-medium">${customer.spent}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Joined:</span>
                        <span className="font-medium">{new Date(customer.joined).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ECommerceDashboard;
