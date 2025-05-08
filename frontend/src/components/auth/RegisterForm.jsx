/**
 * RegisterForm Component
 *
 * Renders a registration form with first name, last name, email, and password fields,
 * performs validation, and handles user registration via context.
 *
 * @component
 * @returns {JSX.Element} The rendered registration form component.
 */
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AuthContext } from '../../context/AuthContext';
import handleFormChange from '../../utils/handleFormChange';
import { useNavigate } from 'react-router-dom';
import { passwordRegex } from '../../utils/regex';

// Initial values for controlled form inputs
const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

function RegisterForm() {
    // State to track if form has been validated (to trigger Bootstrap feedback)
    const [validated, setValidated] = useState(false);
    // Retrieve register function from authentication context
    const { register } = useContext(AuthContext);
    // State to hold form data
    const [formData, setFormData] = useState(initialData);
    // State to hold any submission error messages
    const [error, setError] = useState(null);
    // Hook for navigating programmatically after registration
    const navigate = useNavigate();

    /**
     * Validates password string against defined regex pattern.
     * @param {string} pwd - The password to validate.
     * @returns {boolean} True if password matches required format.
     */
    const isPasswordValid = (pwd) => passwordRegex.test(pwd);

    /**
     * Handles form submission: performs validation, calls register, and redirects.
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleSubmit = async (event) => {
        // Prevent default submit and stop propagation for custom handling
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        // Perform built-in HTML5 validation
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        // Additional JS-side password validation for custom error messaging
        if (!isPasswordValid(formData.password)) {
            setError('Password must be 8–20 chars, letters & numbers only.');
            setValidated(true);
            return;
        }

        // Clear any previous errors and mark form as validated
        setError(null);
        setValidated(true);

        console.log('register form submit: ', formData);
        try {
            // Capitalize and concatenate first and last name
            const name =
                formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1).trim() + ' ' +
                formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1).trim();

            // Call register action with full name, email, and password
            await register(name, formData.email, formData.password);

            // On successful registration, navigate to tasks page
            navigate('/tasks');
        } catch (err) {
            // Log error to console for debugging
            console.error('Register error: ', err);
            // Display error message from server or fallback
            setError(err.response?.data?.message || 'Register failed');
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Register</h2>
            <Row className="mb-3">
                {/* First Name Field */}
                <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleFormChange(e, setFormData)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide first name.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Last Name Field */}
                <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleFormChange(e, setFormData)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide last name.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Email Field */}
                <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleFormChange(e, setFormData)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email address.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group as={Col} md="6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        pattern={passwordRegex.source}
                        title="8–20 chars, letters & numbers only"
                        onChange={(e) => handleFormChange(e, setFormData)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Password must be 8–20 characters long, contain letters and numbers,
                        and have no spaces or special characters.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* Display error message if present */}
            {error && <div className="text-danger mb-3">{error}</div>}

            {/* Submit button triggers handleSubmit */}
            <Button type="submit">Register</Button>
        </Form>
    );
}

export default RegisterForm;