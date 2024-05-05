import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from "./style.module.css"
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../../helpers'
import { PopupContext } from '../../../App'

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const RegisterPage = () => {
    const [formData, setFormData] = useState(initialFormData);
    const { setPopUpContent } = useContext(PopupContext)
    const navTo = useNavigate()
    const formFields = [
        { label: 'Email Address', name: 'email', type: 'email', required: true },
        { label: 'First Name', name: 'firstName', type: 'text', required: true, minLength: 2 },
        { label: 'Last Name', name: 'lastName', type: 'text', required: true, minLength: 2 },
        { label: 'Password', name: 'password', type: 'password', required: true },
        // { label: 'Confirm Password', name: 'confirmPassword', type: 'password', required: true },
    ];

    // const body = {
    //     fullName: formData.firstName + ' ' + formData.lastName,
    //     email: formData.email,
    //     password: formData.password,
    //     avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { _id } = await axiosReq({
                method: 'POST',
                url: 'auth/register',
                body: formData
            })
            // alert(_id);
            setPopUpContent(<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >{_id ? "נרשמת בהצלחה" : "הרישום נכשל "}</h2></div>)
            navTo("/login")

        } catch (e) {
            console.error("Failed to register: " + e.message);
        }
    }





    return (
        <div className={styles.main}>
            <div className={styles.form}>
                <div className={styles.top}><h3>Mailbox - communicate full-world</h3></div>
                <h2>Welcome to Mailbox</h2>
                <form onSubmit={handleSubmit} className={styles.inputs}>
                    {formFields.map(field => (
                        <div key={field.name} className={styles.inputField}>
                            {/* <label htmlFor={field.name}>
                        {field.label} {field.required && <FaStar className={styles.req} />}
                    </label> */}
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                                minLength={field.minLength}
                                placeholder={field.label}
                            /><span style={{color: "red"}}> *</span>
                        </div>
                    ))}
                    <p className={styles.button}>
                        <button type='submit'>Register</button>
                    </p>
                </form>
                <p className={styles.text}>Already have an account? <a href="/login">Login Here</a></p>
                <br />
                <p className={styles.text}>By registering, you agree to our <a href="/terms">Terms of Use</a>.</p>
            </div>
            <div className={styles.background}>
                <img className={styles.backgroundImg} src='./src/assets/send-mail.svg' alt="" />
                </div>
        </div>
    );
};

export default RegisterPage;