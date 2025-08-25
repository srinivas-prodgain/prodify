export const StarIcon = ({ className = "size-4 lg:size-5" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`text-yellow-200 rotate-45 ${className}`}
        fill="currentColor"
    >
        <path d="M12 2c1.2 3.5 3.5 5.8 7 7-3.5 1.2-5.8 3.5-7 7-1.2-3.5-3.5-5.8-7-7 3.5-1.2 5.8-3.5 7-7z" />
    </svg>
)