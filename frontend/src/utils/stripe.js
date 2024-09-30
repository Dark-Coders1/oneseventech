import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q4k3lGGtr3eA1pygU0JM3uWOZ5TVtgG3E6tozLox6aujtgRux5BEsCS3LGoSWdoRcpGb5LB3O9TdI3sWQaxoyVC00RBEWzNyt');

export default stripePromise;
