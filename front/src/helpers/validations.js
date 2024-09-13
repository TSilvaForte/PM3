export const validateRegister = (formData) =>{
    const errors = {}
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (formData.email && !emailRegex.test(formData.email)) {
        errors.email ="Invalid email"
    }

    return errors;
}

//regex validation