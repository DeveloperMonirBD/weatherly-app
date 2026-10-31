import { Loader2, MapPin, Navigation, X } from 'lucide-react';
import { useState } from 'react';

export default function LocationModal({ onClose, onSubmit }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const city = formData.get('city');
        if (onSubmit && city) onSubmit({ city });

        console.log(city)
    };

    // Automatic Location Detection
    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setLoading(true);
        setError('');

        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;

                try {
                    // Reverse Geocoding to get City name from Lat/Lng
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await response.json();
                    const cityName =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.state;

                    if (onSubmit) {
                        onSubmit({ city: cityName, lat: latitude, lng: longitude });
                    }
                // eslint-disable-next-line no-unused-vars
                } catch (err) {
                    setError('Failed to fetch city name. Lat/Lng saved.');
                    if (onSubmit) onSubmit({ lat: latitude, lng: longitude });
                } finally {
                    setLoading(false);
                }
            },
            err => {
                setLoading(false);
                if (err.code === err.PERMISSION_DENIED) {
                    setError('Location permission denied. Please enter manually.');
                } else {
                    setError('Unable to retrieve your location.');
                }
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
                {/* Header Section */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Where are you today?
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        type="button"
                        aria-label="Close modal"
                        className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Auto Location Button */}
                <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={loading}
                    className="w-full mb-4 flex items-center justify-center gap-2 py-3 px-4 bg-red-50 text-red-600 hover:bg-red-100 active:scale-[0.99] font-medium rounded-xl transition duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Getting your location...</span>
                        </>
                    ) : (
                        <>
                            <Navigation className="w-5 h-5 fill-current" />
                            <span>Use my current location</span>
                        </>
                    )}
                </button>

                <div className="relative flex items-center justify-center mb-4">
                    <div className="border-t border-gray-200 w-full"></div>
                    <span className="bg-white px-3 text-xs text-gray-400 font-medium uppercase absolute">
                        Or
                    </span>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            Enter City Manually
                        </label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="e.g. Dhaka, Chittagong"
                            required
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition duration-200"
                        />
                    </div>

                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition duration-200 cursor-pointer">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/20 active:scale-[0.98] transition duration-200 cursor-pointer">
                            Save Location
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
