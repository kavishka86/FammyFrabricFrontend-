import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout';
import { Form, FormControl, Button } from 'react-bootstrap';
//import Header from '../components/Header';

function CustomerViewOrders() {
    const [activeTab, setActiveTab] = useState('ongoing-orders');
    const [orders, setOrders] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        const getData = async () => {
            // Get data for orders
            try {
                const response = await fetch(
                    'http://localhost:5001/new-orders',
                    {
                        mode: 'cors',
                    }
                );
                if (!response.ok) {
                    console.log('Network response not ok');
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                let ordersData = await response.json();
                console.log('Data received:', ordersData);
                setOrders(ordersData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            // Get data for feedback
            try {
                const response = await fetch('http://localhost:5001/feedback', {
                    mode: 'cors',
                });
                if (!response.ok) {
                    console.log('Network response not ok');
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                let feedBackData = await response.json();
                console.log('Data received:', feedBackData);
                setFeedback(feedBackData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, []);

    const handleSearch = (userInput) => {
        console.log(userInput);
        const result = orders.find((order) =>
            order.orderId.includes(userInput)
        );
        if (result) {
            // Check if the order is in ongoing or completed orders
            setActiveTab(
                result.orderStatus === 'Completed'
                    ? 'completed-orders'
                    : 'ongoing-orders'
            );
        } else {
            // this validation is incl
        }
    };

    const handleSearchFieldChange = (e) => {
        // Update state of searchTerm
        setSearchTerm(e.target.value);

        if (e.target.value == '') {
            setActiveTab('ongoing-orders');
        }

        // Call search function
        handleSearch(e.target.value);
    };

    const handleKeyPress = (e) => {
        const userInput = e.target.value;

        if (e.key === 'Enter') {
            const result = orders.find((order) =>
                order.orderId.includes(userInput)
            );
            if (!result) {
                alert(`ERROR: Cannot find order ID ${userInput}`);
            }
        }
    };

    return (
        <main>
            <Layout>
                <div className="mt-3 px-5">
                    {/* Search bar */}
                    <div inline className="mb-3 d-flex">
                        <FormControl
                            type="text"
                            placeholder="Search for orders"
                            className="mr-sm-2"
                            value={searchTerm}
                            onChange={handleSearchFieldChange}
                            onKeyDown={handleKeyPress}
                        />
                        <Button
                            variant="outline-primary"
                            className="ms-3"
                            onClick={() => handleSearch(searchTerm)}
                        >
                            Search
                        </Button>
                    </div>

                    {/* Tabs section */}
                    <div className="d-flex justify-content-center">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${
                                        activeTab === 'ongoing-orders'
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleTabClick('ongoing-orders')
                                    }
                                    aria-current={
                                        activeTab === 'ongoing-orders'
                                            ? 'true'
                                            : 'false'
                                    }
                                    href="#"
                                >
                                    Ongoing Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${
                                        activeTab === 'completed-orders'
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleTabClick('completed-orders')
                                    }
                                    aria-current={
                                        activeTab === 'completed-orders'
                                            ? 'true'
                                            : 'false'
                                    }
                                    href="#"
                                >
                                    Completed Orders
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Tables (Ongoing and Completed) */}
                    <div className="tab-content" id="myTabContent">
                        <div
                            className={`tab-pane fade ${
                                activeTab === 'ongoing-orders'
                                    ? 'show active'
                                    : ''
                            }`}
                            id="ongoing-orders"
                            role="tabpanel"
                            aria-labelledby="ongoing-orders-tab"
                        >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date of Creation</th>
                                        <th>Date of Completion</th>
                                        <th>Order Total</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        if (
                                            order.orderStatus !== 'Completed' &&
                                            order.orderId.includes(searchTerm)
                                        ) {
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order.orderId}</td>
                                                    <td>
                                                        {new Date(
                                                            order.dateOfCreation
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        {new Date(
                                                            order.dateOfCompletion
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td>{`Rs. ${order.orderTotal.toFixed(
                                                        2
                                                    )}`}</td>
                                                    <td>{order.orderStatus}</td>
                                                </tr>
                                            );
                                        } else if (
                                            order.orderStatus === 'Ongoing' &&
                                            !order.orderId.includes(searchTerm)
                                        ) {
                                            return (
                                                <div className="d-flex justify-content-center">
                                                    <p>No orders</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className={`tab-pane fade ${
                                activeTab === 'completed-orders'
                                    ? 'show active'
                                    : ''
                            }`}
                            id="completed-orders"
                            role="tabpanel"
                            aria-labelledby="completed-orders-tab"
                        >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date of Creation</th>
                                        <th>Date of Completion</th>
                                        <th>Order Total</th>
                                        <th>Feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        if (
                                            order.orderStatus === 'Completed' &&
                                            order.orderId.includes(searchTerm)
                                        ) {
                                            const feedbackExists =
                                                feedback.some(
                                                    (fb) =>
                                                        fb.orderId ===
                                                        order.orderId
                                                );

                                            return (
                                                <tr key={order._id}>
                                                    <td>{order.orderId}</td>
                                                    <td>
                                                        {new Date(
                                                            order.dateOfCreation
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        {new Date(
                                                            order.dateOfCompletion
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td>{`Rs. ${order.orderTotal.toFixed(
                                                        2
                                                    )}`}</td>
                                                    <td>
                                                        {feedbackExists ? (
                                                            <a
                                                                href={`/feedback/${order.orderId}`}
                                                                className="btn btn-light"
                                                            >
                                                                View Feedback
                                                            </a>
                                                        ) : (
                                                            <a
                                                                href={`/feedback/new/${order.orderId}`}
                                                                className="btn btn-primary"
                                                            >
                                                                Send Feedback
                                                            </a>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        } else if (
                                            order.orderStatus === 'Completed' &&
                                            !order.orderId.includes(searchTerm)
                                        ) {
                                            return (
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            'white',
                                                    }}
                                                    className="d-flex flex-row justify-content-center"
                                                >
                                                    <p className="">
                                                        No orders
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>
        </main>
    );
}

export default CustomerViewOrders;
