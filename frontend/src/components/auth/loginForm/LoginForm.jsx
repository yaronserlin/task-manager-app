/**
 * LoginForm Component
 *
 * Renders a login form with email and password fields, performs validation,
 * and handles user authentication via context.
 *
 * @component
 * @returns {JSX.Element} The rendered login form component.
 */
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AuthContext } from '../../../context/AuthContext';
import handleFormChange from '../../../utils/handleFormChange';
import { useNavigate } from 'react-router-dom';

// Initial form values for controlled inputs
const initialData = {
    email: '',
    password: '',
};

// Password must contain letters and numbers, 8-20 characters
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

function LoginForm() {
    // State to track whether form has been validated (triggering feedback)
    const [validated, setValidated] = useState(false);
    // Retrieve login function from authentication context
    const { login } = useContext(AuthContext);
    // State to hold form input values
    const [formData, setFormData] = useState(initialData);
    // State to hold any submission error messages
    const [error, setError] = useState(null);
    // Navigation hook to redirect on successful login
    const navigate = useNavigate();

    /**
     * Checks password format against regex rule.
     * @param {string} pwd - The password string to validate.
     * @returns {boolean} True if password matches required format.
     */
    const isPasswordValid = (pwd) => passwordRegex.test(pwd);

    /**
     * Form submission handler: validates, calls login, and navigates.
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleSubmit = async (event) => {
        // Prevent default browser behavior and stop propagation
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;

        // Use built-in HTML5 validation first
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        // Additional JavaScript-level password validation for custom feedback
        if (!isPasswordValid(formData.password)) {
            setError('Password must be 8–20 chars, letters & numbers only.');
            setValidated(true);
            return;
        }

        // Clear previous errors and mark validated
        setError(null);
        setValidated(true);

        console.log('login form submit: ', formData);
        try {
            // Attempt login via context
            await login(formData.email, formData.password);
            // On success, redirect to tasks page
            navigate('/tasks');
        } catch (err) {
            // Log internal error for debugging
            console.error('Login error: ', err);
            // Display error message, defaulting if response not present
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Row className="mb-3">
                {/* --- Email Field --- */}
                <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        // Update formData state on change
                        onChange={(e) => handleFormChange(e, setFormData)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email address.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* --- Password Field --- */}
                <Form.Group as={Col} md="6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        // Enforce pattern and provide tooltip
                        pattern={`${passwordRegex.source}`}
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

            {/* Display any login error message */}
            {error && <div className="text-danger mb-3">{error}</div>}

            {/* Submit button triggers handleSubmit */}
            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default LoginForm;