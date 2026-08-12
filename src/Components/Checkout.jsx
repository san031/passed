import { useState } from "react";
import axiosInstance from "../Components/Axios"; // adjust path to your actual file

export default function Checkout({ amount, onSuccess, ...props }) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Check your connection.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axiosInstance.post("orders/create/", {
        amount,
        currency: "INR",
      });

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Your Company",
        description: "Tourist Pass Payment",
        order_id: data.razorpay_order_id,
        handler: async function (response) {
          try {
            const verifyRes = await axiosInstance.post(
              "orders/verify/",
              response
            );
            if (verifyRes.data.status === "success") {
              if (typeof onSuccess === "function") {
                onSuccess();
              } else {
                window.location.href = "/payment-success";
              }
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            alert("Verification request failed.");
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("You must be logged in to make a payment.");
      } else {
        console.error(err);
        alert("Could not initiate payment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading || amount <= 0} {...props}>
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
}