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

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/create-payment-intent`,
        { amount }
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
      } else {
        toast.success("Payment Successful! 🎉");
        onSuccess();
      }
    } catch (err) {
      toast.error("Payment processing failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-inner">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "var(--color-base-content)",
                fontFamily: "Inter, sans-serif",
                "::placeholder": { color: "rgba(156, 163, 175, 0.8)" },
                iconColor: "var(--color-primary)",
              },
              invalid: { color: "#ef4444", iconColor: "#ef4444" },
            },
          }}
          className="text-base-content"
        />
      </div>

     
      <div className="text-center py-4">
        <p className="text-lg opacity-70">Total Amount</p>
        <p className="text-4xl font-bold text-primary">৳{amount}</p>
      </div>

      
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary btn-lg w-full rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all text-white font-bold text-xl"
      >
        {processing ? (
          <>
            <span className="loading loading-spinner"></span> Processing...
          </>
        ) : (
          `Pay ৳${amount}`
        )}
      </button>

      <div className="bg-base-200/50 border border-base-300 rounded-lg p-4 text-center">
        <p className="text-sm opacity-80 font-medium">Use Test Card:</p>
        <p className="text-lg font-mono font-bold mt-1">4242 4242 4242 4242</p>
        <p className="text-xs opacity-70 mt-2">Any future date • Any CVC</p>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-lg w-full bg-base-100 rounded-3xl shadow-2xl border border-base-300">
        
        <div className="bg-gradient-to-r from-primary to-secondary rounded-t-3xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white">Complete Payment</h2>
          <p className="text-white/90 mt-2">Secure checkout powered by Stripe</p>
        </div>

        
        <div className="p-8">
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} onSuccess={onClose} />
          </Elements>
        </div>

        
        <div className="modal-action px-8 pb-6">
          <button onClick={onClose} className="btn btn-ghost btn-lg">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PaymentModal;