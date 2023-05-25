// FOR OUR OWN CREATED ERROR MESSAGES

const createError = ( status, message ) => {
    
    // creating our own error
     const err = new Error()
     err.status = status;
     err.message = message;
    return err
};

export default createError;