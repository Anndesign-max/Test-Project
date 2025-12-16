import { ChevronRightIcon } from '@heroicons/react/24/solid'

const NewsFeed = ({ news = [] }) => (
  <div className="bg-white p-6 rounded-lg border border-pulse-light">
    <h3 className="font-semibold uppercase pb-6 text-gray-400 border-b border-gray-100">
      Recent News
    </h3>

    {news.slice(0, 5).map((n) => (
      <div key={n.id} className="group text-sm">
        <div className="p-2 flex justify-between items-center border-b border-gray-100 hover:bg-pulse-light/30 rounded-lg cursor-pointer">
          <div>
            <p className="font-bold group-hover:text-pulse-primary">
              {n.title}
            </p>
            <p className="text-gray-500 mb-2">{n.source}</p>

            <div className="flex gap-2">
              {n.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-pulse-light/50 uppercase text-pulse-dark text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>
    ))}
  </div>
)

export default NewsFeed
