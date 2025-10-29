export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              CineBook ("we", "us", "our") operates the CineBook website and
              mobile application. This page informs you of our policies
              regarding the collection, use, and disclosure of personal data
              when you use our Service and the choices you have associated with
              that data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              2. Information Collection and Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Personal Data:
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Email address, First name and last name, Phone number,
                  Address, State, Province, ZIP/Postal code, City, Cookies and
                  Usage Data
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Usage Data:
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pages visited, Time and date of your visit, Time spent on
                  those pages, and other diagnostic data
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              3. Use of Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              CineBook uses the collected data for various purposes:
            </p>

            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>To provide and maintain our Service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>To notify you about changes to our Service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>
                  To allow you to participate in interactive features of our
                  Service
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>To provide customer care and support</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>
                  To gather analysis or valuable information so that we can
                  improve our Service
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span>To monitor the usage of our Service</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              4. Security of Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The security of your data is important to us, but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              5. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "effective date" at the top of this Privacy
              Policy.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Last Updated:</strong> October 29, 2025
              <br />
              If you have any questions about this Privacy Policy, please
              contact us at privacy@cinebook.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
