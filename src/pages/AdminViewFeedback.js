//import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmpLaout from '../Components/EmpLaout';

function AdminViewFeedback() {
    const { id } = useParams();
    const [feedback, setFeedback] = useState({
        orderId: '',
        starCount: '',
        feedbackMessage: '',
    });

    // Hook to get data and set feedback state
    useEffect(() => {
        const updateFeedbackState = async () => {
            // Get feedback data from server
            try {
                const response = await fetch(
                    `http://localhost:5001/feedback/order/${id}`
                );

                if (!response.ok) {
                    console.log('Network response not ok');
                    throw new Error(`HTTP error: Status ${response.status}`);
                }

                let feedBackData = await response.json();

                // Display success message in the console
                console.log('Data received: ', feedBackData);

                // Set state of feedback
                setFeedback(feedBackData.data);
            } catch (error) {
                // Display error message in the console
                console.error('Error fetching feedback:', error);
            }
        };
        updateFeedbackState();
    }, []);

    return (
        <main>
            <EmpLaout>
                {/* Title and description */}
                <div className="d-flex flex-column align-items-center pt-5">
                    <h1>Customer Feedback</h1>
                    <p className="pb-3">
                        You are viewing feedback for Order ID {id}. Click{' '}
                        <a href="/admin/orders">here</a> to select a different
                        order.
                    </p>

                    {/* Star rating */}
                    <div className="rating">
                        {[...Array(5)].map((_, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={index + 1}
                                />
                                &#9733;
                            </label>
                        ))}
                    </div>
                    {feedback.starCount > 0 && (
                        <p>Customer's rating: {feedback.starCount} star(s)</p>
                    )}

                    {/* Feedback message */}
                    <div className="form-floating w-50 mt-5">
                        <textarea
                            className="form-control"
                            placeholder="Leave your feedback here"
                            id="feedbackMessage"
                            value={feedback.feedbackMessage}
                            readOnly
                        ></textarea>
                        <label htmlFor="feedbackMessage">
                            Customer's feedback
                        </label>
                    </div>
                </div>
            </EmpLaout>
        </main>
    );
}

export default AdminViewFeedback;
