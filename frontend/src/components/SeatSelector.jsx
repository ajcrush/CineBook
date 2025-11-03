import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

export default function SeatSelector({
  seats,
  selectedSeats,
  onSeatClick,
  theater,
  price,
}) {
  const [zoom, setZoom] = useState(100);
  const maxZoom = 200;
  const minZoom = 50;

  const handleZoomIn = () => {
    if (zoom < maxZoom) setZoom(zoom + 10);
  };

  const handleZoomOut = () => {
    if (zoom > minZoom) setZoom(zoom - 10);
  };

  // Group seats by row
  const seatsByRow = {};
  seats?.forEach((seat) => {
    const row = seat.seatNumber.charAt(0);
    if (!seatsByRow[row]) {
      seatsByRow[row] = [];
    }
    seatsByRow[row].push(seat);
  });

  // Sort rows alphabetically
  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transition-colors duration-200">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          Select Your Seats
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
          {theater ? `Theater: ${theater}` : "Select seats for your booking"}
        </p>
      </div>

      {/* Theatre Screen */}
      <div className="mb-6 sm:mb-8 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="relative bg-gradient-to-b from-blue-400 to-blue-600 rounded-full h-8 sm:h-12 mb-6 sm:mb-12 flex items-center justify-center overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
            <span className="text-white font-bold text-xs sm:text-lg relative z-10">
              SCREEN
            </span>
          </div>

          {/* Zoom Controls */}
          <div className="flex justify-center gap-2 mb-4 sm:mb-6">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= minZoom}
              className="p-1.5 sm:p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom Out"
            >
              <ZoomOut
                size={16}
                className="sm:w-5 sm:h-5 text-gray-700 dark:text-white"
              />
            </button>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-white font-semibold min-w-16 sm:min-w-20 text-center text-xs sm:text-sm">
              {zoom}%
            </div>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= maxZoom}
              className="p-1.5 sm:p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom In"
            >
              <ZoomIn
                size={16}
                className="sm:w-5 sm:h-5 text-gray-700 dark:text-white"
              />
            </button>
          </div>

          {/* Seats Grid */}
          <div
            className="overflow-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-6 transition-colors duration-200"
            style={{ maxHeight: "300px" }}
          >
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center top",
              }}
              className="transition-transform duration-200"
            >
              <div className="space-y-2 sm:space-y-4 flex flex-col items-center">
                {sortedRows.map((row) => (
                  <div key={row} className="flex items-center gap-2 sm:gap-4">
                    <span className="w-4 sm:w-6 text-center font-bold text-gray-700 dark:text-gray-300 text-xs sm:text-base">
                      {row}
                    </span>
                    <div className="flex gap-1 sm:gap-2">
                      {seatsByRow[row].map((seat) => {
                        const seatNum = seat.seatNumber.slice(1);
                        const isBooked =
                          seat.status === "booked" || seat.status === "locked";
                        const isSelected = selectedSeats.includes(
                          seat.seatNumber
                        );

                        return (
                          <button
                            key={seat.seatNumber}
                            onClick={() => {
                              if (!isBooked) onSeatClick(seat.seatNumber);
                            }}
                            disabled={isBooked}
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded font-semibold text-xs transition-all duration-200 flex items-center justify-center ${
                              isBooked
                                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white"
                                : isSelected
                                ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg scale-105"
                                : "bg-green-400 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-600 text-white shadow hover:shadow-lg"
                            }`}
                            title={`Seat ${seat.seatNumber} - ${
                              isBooked ? "Booked" : "Available"
                            }`}
                          >
                            {seatNum}
                          </button>
                        );
                      })}
                    </div>
                    <span className="w-4 sm:w-6 text-center font-bold text-gray-700 dark:text-gray-300 text-xs sm:text-base">
                      {row}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg transition-colors duration-200">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-400 dark:bg-green-500 rounded shadow"></div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                Available
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded shadow"></div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                Selected
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-400 dark:bg-gray-600 rounded shadow"></div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                Booked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                Selected Seats:
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {selectedSeats.map((seat) => (
                  <span
                    key={seat}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {seat}
                    <button
                      onClick={() => onSeatClick(seat)}
                      className="ml-1 hover:text-red-600 dark:hover:text-red-400 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1">
                Total Cost
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                ₹{selectedSeats.length * price}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {selectedSeats.length} seat
                {selectedSeats.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
