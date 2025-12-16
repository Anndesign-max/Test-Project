const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg border border-pulse-light">
    {title && (
      <h3 className="font-semibold uppercase pb-6 text-gray-400 border-b border-gray-100">
        {title}
      </h3>
    )}
    {children}
  </div>
)

export default Card
