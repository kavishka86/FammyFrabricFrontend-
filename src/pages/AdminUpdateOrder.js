import { useParams } from 'react-router-dom';
// import Header from '../components/Header';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import EmpLaout from '../Components/EmpLaout';
import Toast from 'react-bootstrap/Toast';

function AdminUpdateOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState({
        orderStatus: '',
        dateOfCompletion: '',
    });

    // State for toast message (for success in updating feedback)
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchDataForOrder = async () => {
            try {
                // Get data for order
                const response = await fetch(
                    `http://localhost:5001/new-orders/${id}`
                );

                // Check network response
                if (!response.ok) {
                    console.log('Network response not ok');
                    throw new Error(`HTTP error: Status ${response.status}`);
                }

                // Set order data state
                let orderData = await response.json();
                console.log('Data received:', orderData);
                setOrder(orderData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataForOrder();
    }, []);

    const updateOrder = async () => {
        try {
            const response = await fetch(
                `http://localhost:5001/new-orders/${id}`,
                {
                    method: 'PATCH',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderStatus: order.orderStatus,
                        dateOfCompletion: order.dateOfCompletion,
                    }),
                }
            );
            if (!response.ok) {
                console.log('Network response not ok');
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            console.log('Order updated successfully');

            // Show success toast
            setShowToast(true);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <main>
            <EmpLaout>
                <div className="d-flex flex-column align-items-center pt-5">
                    <h1>Update Order</h1>
                    <p className="pb-3">
                        You are updating details of Order ID {id}. Click{' '}
                        <a href="/admin/orders">here</a> to select a different
                        order.
                    </p>

                    <Form className="w-25">
                        {/* Dropdown menu for status */}
                        <Form.Group
                            className="mb-3"
                            controlId="form.ControlStatusInput"
                        >
                            <Form.Label>Order status</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={order.orderStatus}
                                onChange={(e) =>
                                    setOrder({
                                        ...order,
                                        orderStatus: e.target.value,
                                    })
                                }
                            >
                                <option value="None">Select Status</option>
                                <option value="Cutting">Cutting</option>
                                <option value="Stitching">Stitching</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Date of completion */}
                        <Form.Group
                            className="mb-3"
                            controlId="form.ControlDateInput"
                        >
                            <Form.Label>Date of Completion</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Date of completion"
                                value={order.dateOfCompletion.split('T')[0]}
                                onChange={(e) =>
                                    setOrder({
                                        ...order,
                                        dateOfCompletion: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        {/* Save Changes button */}
                        <div className="d-flex justify-content-center pt-3">
                            <Button variant="primary" onClick={updateOrder}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>

                    {/* Toast for update success */}
                    <Toast
                        show={showToast}
                        onClose={() => setShowToast(false)}
                        delay={3000}
                        autohide
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            right: 20,
                            minWidth: '200px',
                        }}
                        variant="success"
                        bg="success"
                    >
                        <Toast.Header>
                            <strong className="me-auto">Fammy Fabric</strong>
                        </Toast.Header>
                        <Toast.Body style={{ color: 'white' }}>
                            Order updated successfully!
                        </Toast.Body>
                    </Toast>
                </div>
            </EmpLaout>
        </main>
    );
}

export default AdminUpdateOrder;
