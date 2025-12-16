const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg border border-pulse-light h-fit">
    {title && (
      <h2 className="font-semibold text-lg pb-6 text-black border-b border-gray-100">
        {title}
      </h2>
    )}
    {children}
  </div>
)

export default Card
