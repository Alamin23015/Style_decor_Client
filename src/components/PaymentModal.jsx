import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const cardStyle = {
  style: {
    base: {
      fontSize: "18px",
      color: "#3b82f6", 
      iconColor: "#3b82f6", 
      fontFamily: "Inter, sans-serif",
      "::placeholder": {
        color: "#93c5fd", 
      },
      backgroundColor: "transparent",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
  hidePostalCode: true,
};

const CheckoutForm = ({ amount, bookingId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    try {
   
      const { data } = await axiosSecure.post("/create-payment-intent", { amount });

      
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
      } else {
        if (result.paymentIntent.status === "succeeded") {
         
          const res = await axiosSecure.patch(`/bookings/payment-success/${bookingId}`, {
            transactionId: result.paymentIntent.id
          });

          if (res.data.modifiedCount > 0) {
            toast.success("Payment Successful! Database Updated 🎉");
            onSuccess(); 
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment processing failed");
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="p-6 rounded-xl border bg-base-100 border-base-300 shadow-inner">
        <CardElement options={cardStyle} />
      </div>

      <div className="text-center">
        <p className="text-base opacity-70">Total Amount</p>
        <p className="text-4xl font-bold text-primary">৳{amount}</p>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary btn-lg w-full rounded-2xl shadow-lg font-bold"
      >
        {processing ? (
          <><span className="loading loading-spinner"></span> Processing...</>
        ) : (
          `Pay ৳${amount}`
        )}
      </button>

      <div className="bg-base-200 p-6 rounded-xl border border-base-300 text-center">
        <p className="font-bold text-lg mb-2">Test Card</p>
        <code className="text-xl bg-base-300 px-5 py-3 rounded-lg block">
          4242 4242 4242 4242
        </code>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, amount, bookingId }) => {
  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-lg rounded-3xl bg-base-100 shadow-xl p-0 overflow-hidden">
        
        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center text-white">
          <h2 className="text-3xl font-bold">Complete Payment</h2>
          <p className="opacity-90 text-sm mt-2">Secure checkout powered by Stripe</p>
        </div>

        <div className="p-8">
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} bookingId={bookingId} onSuccess={onClose} />
          </Elements>
        </div>

        <div className="modal-action px-8 pb-6">
          <button onClick={onClose} className="btn btn-ghost btn-lg w-full">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PaymentModal;