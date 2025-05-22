const Notification = ({ message, isError }) => {
    if (message === null) return null;

    const notificationStyle = {
        color: isError ? 'red' : 'green',
        background: '#f0f0f0',
        fontSize: 20,
        border: `2px solid ${isError ? 'red' : 'green'}`,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    };

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default Notification;