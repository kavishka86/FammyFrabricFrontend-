// TODO
// Fix star color not holding

//import Header from '../components/Header';
import Toast from 'react-bootstrap/Toast';
//import './styles/CustomerSendFeedback.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import checkProfanity from '../services/profanityChecker';

function CustomerSendFeedback() {
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

    // State for toast message (for success in sending feedback)
    const [showToast, setShowToast] = useState(false);

    // State variables for sending feedback
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [feedbackLabel, setFeedbackLabel] = useState('Send Feedback');

    // Hook to set value for Order ID in feedback object
    useEffect(() => {
        const addOrderIdToFeedback = async () => {
            setFeedback((prevFeedback) => ({
                ...prevFeedback,
                orderId: id,
            }));
        };

        addOrderIdToFeedback();
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
    };

    // Redirect to orders page (after sending feedback)
    const redirectToOrdersPage = async () => {
        navigate('/orders');
    };

    // Send customer's feedback to the server
    const handleSendFeedback = async () => {
        setIsSendingFeedback(true); // Start sending feedback
        setFeedbackLabel('Sending Feedback');

        // Check for profanity in feedback message
        const isProfanity = await checkProfanity(feedback.feedbackMessage);
        if (isProfanity) {
            alert('Please refrain from using profanity in your feedback.');
            setIsSendingFeedback(false); // Stop sending feedback
            setFeedbackLabel('Send Feedback');
            return; // Prevent sending feedback if profanity detected
        }

        // If no profanity detected, proceed to send feedback
        try {
            const response = await fetch(`http://localhost:5001/feedback`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: feedback.orderId,
                    starCount: feedback.starCount,
                    feedbackMessage: feedback.feedbackMessage,
                }),
            });

            // Check network response
            if (!response.ok) {
                console.log('Network response not ok');
                throw new Error(`HTTP error: Status ${response.status}`);
            }

            // Display success message in console
            console.log('Feedback sent successfully');

            // Show success toast
            setShowToast(true);

            // Redirect to orders page after three seconds
            setTimeout(redirectToOrdersPage, 3000);
        } catch (error) {
            console.log('Error sending feedback: ', error);
        } finally {
            setIsSendingFeedback(false); // Feedback sent, stop sending
            setFeedbackLabel('Feedback sent!');
        }
    };

    console.log(feedback);

    return (
        <main>
            <Layout>
                {/* Title and description */}
                <div className="d-flex flex-column align-items-center pt-5">
                    <h1>Send Feedback</h1>
                    <p className="pb-3">
                        You are sending feedback for Order ID {id}. Click{' '}
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
                            onChange={(e) => {
                                setFeedback({
                                    ...feedback,
                                    feedbackMessage: e.target.value,
                                });
                                // Update 'characterCount' value
                                setCharacterCount(e.target.value.length);
                            }}
                            maxLength={maxFeedbackLength}
                        ></textarea>
                        <label htmlFor="feedbackMessage">
                            Your feedback (optional) - {characterCount}/
                            {maxFeedbackLength} characters
                        </label>
                    </div>

                    {/* Send feedback button */}
                    <div className="mt-5">
                        <Button
                            onClick={handleSendFeedback}
                            disabled={isSendingFeedback}
                        >
                            {feedbackLabel}
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
                            <strong className="me-auto">Fammy</strong>
                        </Toast.Header>
                        <Toast.Body style={{ color: 'white' }}>
                            Feedback sent successfully!
                        </Toast.Body>
                    </Toast>
                </div>
            </Layout>
        </main>
    );
}

export default CustomerSendFeedback;
