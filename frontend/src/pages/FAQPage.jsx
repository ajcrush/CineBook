import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openFAQs, setOpenFAQs] = useState({});

  const faqs = [
    {
      id: 1,
      category: "Booking",
      question: "How do I book movie tickets on CineBook?",
      answer:
        "Simply log in to your CineBook account, select a movie, choose your preferred showtime and theater, select your seats, and proceed to checkout. Enter your payment details and confirm your booking.",
    },
    {
      id: 2,
      category: "Booking",
      question: "Can I change my selected seats after booking?",
      answer:
        "You can modify your seats before completing the payment. However, once the booking is confirmed, seat changes are not allowed. You'll need to cancel and create a new booking.",
    },
    {
      id: 3,
      category: "Booking",
      question: "How long does it take to receive my booking confirmation?",
      answer:
        "You'll receive your booking confirmation email instantly after successful payment. Your e-ticket will be attached to the email. Print it or show it on your phone at the theater.",
    },
    {
      id: 4,
      category: "Cancellation",
      question: "How can I cancel my booking?",
      answer:
        "Go to 'My Bookings', select the booking you want to cancel, and click the 'Cancel' button. You'll receive a refund confirmation email within 5-7 business days if you're eligible.",
    },
    {
      id: 5,
      category: "Cancellation",
      question: "What is the cancellation deadline?",
      answer:
        "You can cancel your booking up to 2 hours before the showtime. Cancellations made within 2 hours of the showtime are not eligible for refunds.",
    },
    {
      id: 6,
      category: "Cancellation",
      question: "How long does the refund take?",
      answer:
        "Refunds are typically processed within 5-7 business days to your original payment method. Your bank may take an additional 3-5 business days to reflect the amount.",
    },
    {
      id: 7,
      category: "Payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards through Stripe and UPI/digital wallets through Razorpay. Both are secure and encrypted for your safety.",
    },
    {
      id: 8,
      category: "Payment",
      question: "Is my payment information safe?",
      answer:
        "Yes! We use industry-leading encryption and security protocols. Your payment information is processed by certified payment gateways (Stripe and Razorpay) and is never stored on our servers.",
    },
    {
      id: 9,
      category: "Payment",
      question: "Can I get an invoice for my booking?",
      answer:
        "Yes, your e-ticket serves as a valid invoice. You can also download it from 'My Bookings' for your records or tax purposes.",
    },
    {
      id: 10,
      category: "Seats",
      question: "How do I select seats on the seating chart?",
      answer:
        "Click on the available seats (shown in green) on the seating chart. You can zoom in/out for better visibility. Selected seats will turn purple. Click again to deselect.",
    },
    {
      id: 11,
      category: "Seats",
      question: "What do the different seat colors mean?",
      answer:
        "Green seats are available for booking. Purple seats are your selected seats. Gray seats are already booked by other users. Click on available seats to select them.",
    },
    {
      id: 12,
      category: "Seats",
      question: "Are premium seats more expensive?",
      answer:
        "All seats in the same showtime have the same price. The pricing depends on the movie and showtime, not the seat location. However, premium theaters may have different pricing.",
    },
    {
      id: 13,
      category: "Account",
      question: "How do I create a CineBook account?",
      answer:
        "Click on 'Register' on the homepage, enter your email address and password, verify your email, and you're all set! You can also use your Google or social media accounts for quick registration.",
    },
    {
      id: 14,
      category: "Account",
      question: "Can I use the same account for multiple users?",
      answer:
        "Yes, you can share your account. However, for better tracking of your personal bookings, it's recommended to create individual accounts for each family member.",
    },
    {
      id: 15,
      category: "Account",
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page, enter your registered email, and follow the reset link sent to your inbox. Create a new password and log in with it.",
    },
    {
      id: 16,
      category: "Support",
      question: "How do I contact customer support?",
      answer:
        "You can reach our support team via email at support@cinebook.com, call us at +91 9876 543 210, or use the contact form on the Contact Us page. We're available 24/7.",
    },
    {
      id: 17,
      category: "Support",
      question: "What are your business hours?",
      answer:
        "Our online services are available 24/7. Phone support is available Monday to Friday from 9 AM to 6 PM, and Saturday to Sunday from 10 AM to 4 PM.",
    },
    {
      id: 18,
      category: "Support",
      question: "How can I provide feedback or report an issue?",
      answer:
        "Use the contact form on our website or email us at feedback@cinebook.com. We value your feedback and will respond within 24 hours.",
    },
  ];

  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id) => {
    setOpenFAQs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ❓ Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find answers to common questions about CineBook
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div className="flex-1">
                  <span className="inline-block bg-primary/20 text-primary dark:bg-primary/30 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {openFAQs[faq.id] ? (
                    <ChevronUp className="text-primary" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={24} />
                  )}
                </div>
              </button>

              {openFAQs[faq.id] && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Didn't find the answer you're looking for? Our support team is here
            to help!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:support@cinebook.com"
              className="px-6 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-lg transition"
            >
              Email Support
            </a>
            <a
              href="tel:+919876543210"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Call Us: +91 9876 543 210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
