function validation(values) {
    let errors = {};

    // Allow any format for the username
    if (values.username === "") {
        errors.username = "Username should not be empty";
    } else {
        errors.username = "";
    }

    // Validate password (if needed)
    if (values.password === "") {
        errors.password = "Password should not be empty";
    } else {
        errors.password = "";
    }

    return errors;
}

export default validation;
