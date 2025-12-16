import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { formatDate } from '../utils/formatDate'
import Card from './Card'

const NewsFeed = ({ news = [] }) => (
   <Card title="Recent News">
    {news.slice(0, 5).map((n) => (
      <div key={n.id} className="group ">
        <div className="p-2 flex justify-between items-center border-b border-gray-100 hover:bg-pulse-light/30 rounded-lg cursor-pointer">
          <div>         
            <p className="text-gray-500 text-sm">{n.source} | Published {formatDate(n.timestamp)} </p>
            <h6 className="font-bold text-lg group-hover:text-pulse-primary mb-2">
              {n.title}
            </h6>

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
  </Card>
)

export default NewsFeed
