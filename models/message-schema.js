import yup from 'yup';
// Data Schema for a New Message
// Matches the one from the front-end App!
const messageSchema = yup.object().shape({
name: yup
    .string()
    .trim()
    .min(2, 'Your name must be at least ${min} characters.')
    .max(15, 'Your name cannot be more than ${max} characters.')
    .matches(/^[A-Za-z]+$/, 'Invalid name. Use Upper and Lowercaseletters only.')
    .required('Your name is required.'),
msgText: yup
    .string()
    .trim()
    .min(2, 'Your message must be at least ${min} characters.')
    .max(30, 'Your message must be no more than ${max} characters')
    .required('A message is required.')
});

export default messageSchema;