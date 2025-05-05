/**
 * handleFormChange
 *
 * A utility function to handle changes in form inputs by updating the component's state.
 *
 * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>} event - The change event triggered by the form element.
 * @param {Function} setData - The React state setter function returned by useState for updating form data.
 *
 * @example
 * // In a functional component:
 * const [formData, setFormData] = useState({ username: '', email: '' });
 *
 * <input
 *   name="username"
 *   value={formData.username}
 *   onChange={(e) => handleFormChange(e, setFormData)}
 * />
 */
const handleFormChange = (event, setData) => {
    // Extract the `name` and `value` properties from the event target (the input element)
    const { name, value } = event.target;

    // Log the name and value for debugging purposes
    // console.log("handleFormChange", name, value);

    // Use the setter function to update state based on the previous state
    // We spread the previous state to preserve other fields and only overwrite the one that changed
    setData((prevData) => ({
        ...prevData,
        [name]: value
    }));
};

export default handleFormChange;