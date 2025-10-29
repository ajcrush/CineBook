export default function SpecialOffersPage() {
  const offers = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 30% off on all tickets for Friday to Sunday shows",
      discount: "30%",
      code: "WEEKEND30",
      validTill: "December 31, 2025",
      applies: "All movies",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Student Discount",
      description: "Show valid student ID to get 25% off on movie tickets",
      discount: "25%",
      code: "STUDENT25",
      validTill: "December 31, 2025",
      applies: "All shows",
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      title: "First Booking",
      description: "First-time users get 20% off on their first ticket booking",
      discount: "20%",
      code: "FIRST20",
      validTill: "December 31, 2025",
      applies: "First booking only",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      title: "Matinee Shows",
      description: "Early morning and afternoon shows get 40% discount",
      discount: "40%",
      code: "MATINEE40",
      validTill: "December 31, 2025",
      applies: "Shows before 4 PM",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 5,
      title: "Group Booking",
      description: "Book 5 or more tickets together and get 35% off",
      discount: "35%",
      code: "GROUP35",
      validTill: "December 31, 2025",
      applies: "5+ tickets",
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 6,
      title: "Senior Citizen",
      description: "Special pricing for senior citizens above 60 years",
      discount: "50%",
      code: "SENIOR50",
      validTill: "December 31, 2025",
      applies: "With valid ID",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎉 Special Offers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Enjoy amazing discounts and exclusive deals on CineBook
          </p>
        </div>

        {/* Active Offers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Active Promotions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Header with gradient */}
                <div
                  className={`bg-gradient-to-r ${offer.color} p-6 text-white`}
                >
                  <div className="text-4xl font-bold mb-2">
                    {offer.discount}
                  </div>
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {offer.description}
                  </p>

                  <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Coupon Code:
                      </span>
                      <span className="font-mono font-bold text-primary bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                        {offer.code}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Applies To:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {offer.applies}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Valid Till:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {offer.validTill}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-primary hover:bg-red-700 text-white font-bold py-2 rounded-lg transition mt-4">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Offer Terms & Conditions
          </h2>

          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ✓ How to Use Coupons
              </h3>
              <p>
                Enter the coupon code during checkout to apply the discount.
                Discount will be reflected immediately in your cart.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ✓ Valid for Single Use
              </h3>
              <p>
                Most offers can be used multiple times unless stated otherwise.
                Some offers may have per-user limits.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ✓ Cannot Be Stacked
              </h3>
              <p>
                Only one coupon code can be applied per booking. Multiple
                discounts cannot be combined.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ✓ Non-Transferable
              </h3>
              <p>
                Offers are personal and non-transferable. They cannot be gifted
                or sold to others.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ✓ Expiration Policy
              </h3>
              <p>
                Offers expire on the date mentioned. Expired coupons cannot be
                used. Plan your booking accordingly.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ✓ Refund Policy
              </h3>
              <p>
                If you cancel a booking made with a discount, the discount is
                forfeited and only the base price (if eligible) is refunded.
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Coming Soon 🚀
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold mb-2">Birthday Special</p>
              <p className="text-sm">
                Get exclusive discounts on your birthday month
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Loyalty Program</p>
              <p className="text-sm">
                Earn points on every booking and redeem for rewards
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Movie Bundle</p>
              <p className="text-sm">Book multiple movies and save big</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
