export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Refund Policy
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Refund Policy Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              At CineBook, we're committed to ensuring customer satisfaction.
              Our comprehensive refund policy is designed to protect your
              interests and provide peace of mind when booking tickets with us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Types of Refunds
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-6">
                <h3 className="text-lg font-bold text-primary mb-4">
                  Full Refund
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>100% of ticket amount refunded</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Processing fee waived</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>5-7 business days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Original payment method</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-6">
                <h3 className="text-lg font-bold text-primary mb-4">
                  Partial Refund
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>50% of ticket amount</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>Applicable in some cases</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>5-7 business days</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>As per our policy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Refund Eligibility
            </h2>
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  ✓ You Are Eligible for Refund If:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• You cancel the booking 2+ hours before showtime</li>
                  <li>• The movie/showtime is cancelled by CineBook</li>
                  <li>• You encounter technical issues preventing viewing</li>
                  <li>• The show is significantly delayed (30+ minutes)</li>
                  <li>• Payment was processed incorrectly</li>
                  <li>• You received duplicate charges</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  ✗ You Are NOT Eligible for Refund If:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• You cancel within 2 hours of showtime</li>
                  <li>• You miss the scheduled showtime</li>
                  <li>• You fail to present valid ID at theater</li>
                  <li>• You purchased non-refundable packages</li>
                  <li>• The booking was made with incorrect details</li>
                  <li>• The refund request is made 30+ days after show</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Refund Process Timeline
            </h2>
            <div className="space-y-3">
              <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-primary font-bold">Day 1:</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Request submitted and verified
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-primary font-bold">Day 2-3:</div>
                <div className="text-gray-600 dark:text-gray-400">
                  CineBook processes the refund
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-primary font-bold">Day 4-7:</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Refund reaches your payment method
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-primary font-bold">Day 8-10:</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Bank processing (may vary)
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Special Refund Cases
            </h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  Corporate Bookings
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Bulk bookings (10+ tickets) may have different cancellation
                  terms. Please contact our corporate support team for details.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  International Payments
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Refunds for international payments may take 10-15 business
                  days due to currency conversion and international banking
                  processes.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  Promotional Bookings
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Tickets booked using coupons/offers may receive refunds of the
                  net amount only, excluding promotional discounts.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              How to Request a Refund
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                Follow these simple steps:
              </p>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>1.</strong> Log in to your CineBook account
                </li>
                <li>
                  <strong>2.</strong> Go to "My Bookings" section
                </li>
                <li>
                  <strong>3.</strong> Select the booking to refund
                </li>
                <li>
                  <strong>4.</strong> Click "Cancel Booking" button
                </li>
                <li>
                  <strong>5.</strong> Confirm the cancellation request
                </li>
                <li>
                  <strong>6.</strong> Check your email for confirmation
                </li>
              </ol>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I get a refund for expired bookings?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No, bookings expire on the showtime and cannot be refunded
                  after that date.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  How do I track my refund status?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can track your refund status through your account
                  dashboard or by contacting support with your booking
                  reference.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What if I don't receive my refund?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Contact us immediately at refund@cinebook.com with your
                  booking details. We'll investigate and resolve within 48
                  hours.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I get store credit instead of a refund?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! You can opt for CineBook store credit worth 110% of your
                  refund amount.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Need Help?</strong> Contact our refund support team at
              refund@cinebook.com or call +91 9876 543 210. We're here to help!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
