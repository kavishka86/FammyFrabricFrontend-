import Toast from 'react-bootstrap/Toast';
//import Header from '../components/Header';
import './styles/CustomerViewFeedback.css';
import Button from 'react-bootstrap/Button';
import Layout from '../Components/Layout';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CustomerViewFeedback() {
    // Get order ID from params
    const { id } = useParams();

    // Setup page navigation for redirects
    const navigate = useNavigate();

    // State to store feedback data
    const [feedback, setFeedback] = useState({
        orderId: '',
        starCount: '',
        feedbackMessage: '',
    });

    // State to store character count in feedback message
    const [characterCount, setCharacterCount] = useState(0);

    // Maximum length of feedback message
    const maxFeedbackLength = 100;

    // State for toast message (for success in updating feedback)
    const [showToast, setShowToast] = useState(false);

    // State to interation with stars or textarea (for the "Save Changes" button)
    const [isInteracted, setIsInteracted] = useState(false);

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

                // Update value of character count
                setCharacterCount(feedBackData.data.feedbackMessage.length);
            } catch (error) {
                // Display error message in the console
                console.error('Error fetching feedback:', error);
            }
        };
        updateFeedbackState();
    }, []);

    // Handle clicking on the stars
    const handleRatingChange = (value) => {
        // Get reversed value from stars
        let actualValue = '0';
        if (value == '1') actualValue = '5';
        else if (value == '2') actualValue = '4';
        else if (value == '3') actualValue = '3';
        else if (value == '4') actualValue = '2';
        else actualValue = '1';

        // Update state of feedback
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            starCount: actualValue,
        }));
        console.log(`Rating is now ${actualValue}`);

        // Update "isInteracted" state (to enable "Update Feedback" button)
        setIsInteracted(true);
    };

    // Update customer's feedback on the server
    const handleUpdateFeedback = async () => {
        try {
            // Send DELETE request to server
            const response = await fetch(
                `http://localhost:5001/feedback/${id}`,
                {
                    method: 'PATCH',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderId: feedback.orderId,
                        starCount: feedback.starCount,
                        feedbackMessage: feedback.feedbackMessage,
                    }),
                }
            );

            // Check network response
            if (!response.ok) {
                console.log('Network response not ok');
                throw new Error(`HTTP error: Status ${response.status}`);
            }

            // Display success message in the console
            console.log('Feedback updated successfully');

            // Show success toast
            setShowToast(true);

            // Update "isInteracted" state (to disable "Update Feedback" button)
            setIsInteracted(false);
        } catch (error) {
            // Display error message in the console.
            console.log('Error updating feedback: ', error);
        }
    };

    // Delete customer's feedback
    const handleDeleteFeedback = async () => {
        try {
            const response = await fetch(
                `http://localhost:5001/feedback/${id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                }
            );

            if (!response.ok) {
                console.log('Network response not ok');
                throw new Error(`HTTP error: Status ${response.status}`);
            }

            // Redirect to orders page
            navigate('/orders');

            // Display success message in the console
            console.log('Feedback deleted successfully');
        } catch (error) {
            // Display error message in the console
            console.log('Error deleting feedback: ', error);
        }
    };

    return (
        <main>
            <Layout>
                {/* Title and description */}
                <div className="d-flex flex-column align-items-center pt-5">
                    <h1>My Feedback</h1>
                    <p className="pb-3">
                        You are viewing feedback for Order ID {id}. Click{' '}
                        <a href="/orders">here</a> to select a different order.
                    </p>

                    {/* Star rating */}
                    <div className="rating">
                        {[...Array(5)].map((_, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={index + 1}
                                    onClick={() =>
                                        handleRatingChange(index + 1)
                                    }
                                />
                                &#9733;
                            </label>
                        ))}
                    </div>
                    {feedback.starCount > 0 && (
                        <p>Your rating: {feedback.starCount} star(s)</p>
                    )}

                    {/* Feedback message */}
                    <div className="form-floating w-50 mt-5">
                        <textarea
                            className="form-control"
                            placeholder="Leave your feedback here"
                            id="feedbackMessage"
                            value={feedback.feedbackMessage}
                            onChange={(e) => {
                                setFeedback({
                                    ...feedback,
                                    feedbackMessage: e.target.value,
                                });
                                // Update 'characterCount' value
                                setCharacterCount(e.target.value.length);
                                // Update "isInteracted" state (to enable "Update Feedback" button)
                                setIsInteracted(true);
                            }}
                            maxLength={maxFeedbackLength}
                        ></textarea>
                        <label htmlFor="feedbackMessage">
                            Your feedback (optional) - {characterCount}/
                            {maxFeedbackLength} characters
                        </label>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-5">
                        <Button
                            className="mx-2"
                            disabled={!isInteracted}
                            onClick={handleUpdateFeedback}
                        >
                            Update Feedback
                        </Button>
                        <Button
                            variant="danger"
                            className="mx-2"
                            onClick={handleDeleteFeedback}
                        >
                            Delete Feedback
                        </Button>
                    </div>

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
                            Feedback updated successfully!
                        </Toast.Body>
                    </Toast>
                </div>
            </Layout>
        </main>
    );
}

export default CustomerViewFeedback;
