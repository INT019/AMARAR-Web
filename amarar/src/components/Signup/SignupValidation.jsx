function validation(values) {
    let error = {}
    const firstname_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const lastname_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const contact_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const username_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const confirmpassword_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if(values.firstname === "") {
        error.firstname = "First Name should not be empty"
    }
    else{
        error.firstname = ""
    }

    if(values.lastname === "") {
        error.lastname = "Last Name should not be empty"
    }
    else{
        error.lastname = ""
    }

    if(values.email === "") {
        error.email = "Name should not be empty"
    }
    else{
        error.email = ""
    }

    if(values.contact === "") {
        error.contact = "Name should not be empty"
    }
    else{
        error.contact = ""
    }
    
    if(values.username === "") {
        error.username = "Name should not be empty"
    }
    else if(!username_pattern.test(values.username)) {
        error.username = "Username did not match"
    }else {
        error.username = ""
    }
     
    if(values.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Password did not match"
    }else {
        error.password = ""
    }

    if(values.confirmpassword === "") {
        error.confirmpassword = "Password should not be empty"
    }
    else if(!confirmpassword_pattern.test(values.confirmpassword)) {
        error.confirmpassword = "Password did not match"
    }else {
        error.confirmpassword = ""
    }
    return error;
    }
    
    export default validation;
