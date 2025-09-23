
const DisplayCard = ({ label, icon, amount }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md  p-5 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-red-100 rounded-full text-red-500 text-xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h2 className="text-2xl font-semibold">$ {amount}</h2>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
