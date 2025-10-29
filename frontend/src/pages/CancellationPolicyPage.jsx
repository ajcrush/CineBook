export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Cancellation Policy
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Cancellation Guidelines
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              At CineBook, we understand that plans can change. We provide a
              flexible cancellation policy to ensure customer satisfaction.
              Please review the details below.
            </p>
          </div>

          {/* Timeline Card */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-6">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">
                ✓ Eligible for Full Refund
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 font-semibold">
                Cancel before 2 hours of showtime
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>• Full refund to original payment method</li>
                <li>• Refund processed within 5-7 business days</li>
                <li>• No cancellation fee</li>
                <li>• 100% refund of ticket amount</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-6">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
                ✗ Not Eligible for Refund
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 font-semibold">
                Cancel within 2 hours of showtime
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>• Non-refundable booking</li>
                <li>• Amount forfeited</li>
                <li>• No alternatives provided</li>
                <li>• Policy is strictly enforced</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              How to Cancel Your Booking
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Log in to Your Account
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Visit CineBook and log in with your credentials
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Go to My Bookings
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Navigate to the "My Bookings" section from the menu
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Select the Booking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click on the booking you wish to cancel
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                    4
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Click Cancel Booking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click the "Cancel" button and confirm your action
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                    5
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Confirmation & Refund
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You'll receive a confirmation email with refund details
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Refund Processing
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Processing Timeline:
                </h3>
                <p>
                  Refunds are typically processed within 5-7 business days from
                  the date of cancellation. During peak seasons, it may take up
                  to 10 business days.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Refund Method:
                </h3>
                <p>
                  Refunds are credited to the original payment method used
                  during booking. No separate transfer is made.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Bank Processing:
                </h3>
                <p>
                  Your bank may take 3-5 additional business days to reflect the
                  refund in your account after it's been processed by CineBook.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Special Circumstances
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Movie Cancellation:
                </h3>
                <p>
                  If CineBook cancels the showing, you'll receive a full refund
                  regardless of the cancellation time.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Technical Issues:
                </h3>
                <p>
                  If there are technical issues preventing you from watching the
                  movie, contact support for assistance or refund eligibility.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Weather-related Changes:
                </h3>
                <p>
                  For outdoor or special screenings affected by weather, our
                  customer support will assist with refunds or reschedules.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              For any cancellation-related queries, please contact us at
              cancellations@cinebook.com or call +91 9876 543 210
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
