// src/components/PaymentModal.jsx
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const { data } = await axios.post("http://localhost:5000/create-payment-intent", { amount });

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      toast.success("Payment Successful! 🎉");
      onSuccess();
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg bg-base-200">
        <CardElement options={{
          style: {
            base: {
              fontSize: '18px',
              color: '#fff',
              '::placeholder': { color: '#aab7c4' },
            },
          },
        }} />
      </div>
      <div className="text-2xl font-bold text-center">
        Total: ৳{amount}
      </div>
      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="btn btn-primary btn-lg w-full"
      >
        {processing ? "Processing..." : `Pay ৳${amount}`}
      </button>
      <p className="text-center text-sm opacity-70">
        Test Card: 4242 4242 4242 4242 | Any future date | Any CVC
      </p>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-2xl text-center mb-6">Complete Payment</h3>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} onSuccess={onClose} />
        </Elements>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-ghost">Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

export default PaymentModal;