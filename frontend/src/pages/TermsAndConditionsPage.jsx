export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Terms & Conditions
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200 space-y-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Last Updated:</strong> October 29, 2025
              <br />
              Please read these Terms and Conditions carefully before using
              CineBook.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing and using the CineBook website and application, you
              accept and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do
              not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              2. Use License
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on CineBook for personal,
              non-commercial transitory viewing only.
            </p>

            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>
                This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="ml-4 space-y-2">
                <li>• Modifying or copying the materials</li>
                <li>
                  • Using the materials for any commercial purpose or for any
                  public display
                </li>
                <li>
                  • Attempting to decompile or reverse engineer any software
                  contained on CineBook
                </li>
                <li>
                  • Removing any copyright or other proprietary notations from
                  the materials
                </li>
                <li>
                  • Transferring the materials to another person or "mirroring"
                  the materials on any other server
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              3. Booking and Cancellation
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Ticket Booking:
                </h3>
                <p>
                  Once you complete a booking through CineBook, your seats are
                  reserved. You will receive a confirmation email with your
                  booking details.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Cancellation:
                </h3>
                <p>
                  You may cancel your booking up to 2 hours before the showtime.
                  Cancellations made within 2 hours of the showtime will not be
                  eligible for a refund.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Payment:
                </h3>
                <p>
                  Payment must be completed at the time of booking. We accept
                  Stripe and Razorpay as payment methods.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              4. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The materials on CineBook are provided on an 'as is' basis.
              CineBook makes no warranties, expressed or implied, and hereby
              disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              5. Accuracy of Materials
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The materials appearing on CineBook could include technical,
              typographical, or photographic errors. CineBook does not warrant
              that any of the materials on its website are accurate, complete,
              or current. CineBook may make changes to the materials contained
              on its website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Links</h2>
            <p className="text-gray-600 dark:text-gray-400">
              CineBook has not reviewed all of the sites linked to its website
              and is not responsible for the contents of any such linked site.
              The inclusion of any link does not imply endorsement by CineBook
              of the site. Use of any such linked website is at the user's own
              risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              7. Modifications
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              CineBook may revise these terms of service for its website at any
              time without notice. By using this website, you are agreeing to be
              bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              8. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              These terms and conditions are governed by and construed in
              accordance with the laws of India, and you irrevocably submit to
              the exclusive jurisdiction of the courts in New Delhi.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              If you have any questions about these Terms and Conditions, please
              contact us at legal@cinebook.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
