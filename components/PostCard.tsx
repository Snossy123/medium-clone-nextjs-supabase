import Link from 'next/link';

interface Props {
  postcard: any;
}

const PostCard = (props: Props) => {
  const { postcard } = props;

  const formattedDate = new Date(Date.parse(postcard.inserted_at));
  const day = formattedDate.getDate();
  const month = formattedDate.getMonth() + 1;
  const year = formattedDate.getFullYear();
  const hours = formattedDate.getHours();
  const minutes = formattedDate.getMinutes();

  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <span className="mt-1 text-gray-500 text-sm">
          <strong>By</strong> {postcard.user_email}
        </span>
        <span className="mt-1 text-gray-500 text-sm">
          <strong>In</strong> {day}-{month}-{year} {hours}:{minutes}
        </span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
          {postcard.title}
        </h2>
        <p className="leading-relaxed">{postcard.content.substring(0, Math.min(100, postcard.content.length))}</p>
        <Link href={`/posts/${postcard.id}`} className="text-indigo-500 inline-flex items-center mt-4">
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
