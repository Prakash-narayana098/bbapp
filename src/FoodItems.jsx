import { useEffect, useState } from "react";
import  pb  from "./API/api";

function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await pb.collection("food_item").getFullList({
          expand: "categoryId",
          sort: "-created",
        });
        setItems(data);
      } catch (err) {
        console.error("Failed to load menu", err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow">
        {items.map((item) => {
          const imageUrl = item.image
            ? pb.files.getURL(item, item.image)
            : "/placeholder-food.jpg";

          return (
            <div
              key={item.id}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <img
                src={imageUrl}
                alt={item.name}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Bottom Overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-4 text-center bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://thumb.photo-ac.com/ae/aec7457be3803e436d4fa854243df953_t.jpeg')",
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Text */}
                <div className="relative z-10">
                  <h3 className="text-white font-semibold text-lg drop-shadow-md">
                    {item.name}
                  </h3>
                  <p className="text-white text-sm mt-1 drop-shadow-md">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal (unchanged) */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-xl p-4 max-w-7xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-xl font-bold"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>

            <img
              src={
                selectedItem.image
                  ? pb.files.getURL(selectedItem, selectedItem.image)
                  : "/placeholder-food.jpg"
              }
              alt={selectedItem.name}
              className="w-full h-[600px] object-cover rounded-lg"
            />

            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold">{selectedItem.name}</h2>
              <p className="text-green-700 text-lg font-semibold mt-1">
                ₹{selectedItem.price}
              </p>
              <p className="text-gray-500 mt-1">
                {selectedItem.expand?.categoryId?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
