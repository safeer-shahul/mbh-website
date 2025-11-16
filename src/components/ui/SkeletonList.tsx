export default function SkeletonList() {
    return (
      <div className="animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="py-5 border border-gray-200">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

