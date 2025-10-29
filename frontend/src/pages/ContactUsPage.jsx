export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  📞 Phone
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <a
                    href="tel:+919876543210"
                    className="hover:text-primary transition"
                  >
                    +91 7004942830
                  </a>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Available 24/7
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  📧 Email
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <a
                    href="mailto:support@cinebook.com"
                    className="hover:text-primary transition"
                  >
                    support@cinebook.com
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <a
                    href="mailto:info@cinebook.com"
                    className="hover:text-primary transition"
                  >
                    info@cinebook.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  🏢 Address
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  CineBook Headquarters
                  <br />
                  rurkee pukhta kharar
                  <br />
                  Chandigarh - 140301, India
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  ⏰ Business Hours
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday - Sunday: 10:00 AM - 4:00 PM
                  <br />
                  Holidays: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Your message..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-red-700 text-white font-bold py-2 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How do I contact customer support?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can reach our support team via phone at +91 9876 543 210 or
                email us at support@cinebook.com. We're available 24/7 to help
                you.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What is your response time?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We typically respond to emails within 2-4 hours during business
                hours and within 24 hours on weekends and holidays.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Do you have a physical office?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Visit us at CineBook Headquarters, 123 Cinema Plaza,
                Connaught Place, New Delhi - 110001. We're open Monday to Friday
                from 9 AM to 6 PM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
