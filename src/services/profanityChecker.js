// Service function to check profanity
const checkProfanity = async (message) => {
    const res = await fetch('https://vector.profanity.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    });

    const jsonData = await res.json();
    return jsonData.isProfanity;
};

// Export the service
module.exports = checkProfanity;
