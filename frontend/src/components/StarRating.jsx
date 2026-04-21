export default function StarRating({ rating }) {
  // Ensure rating is a valid number between 0 and 5
  const safeRating = Math.max(0, Math.min(Number(rating) || 0, 5));

  return (
    <div className="star-rating" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[...Array(5)].map((_, i) => {
        // Calculate how much of this specific star should be filled (0 to 100)
        const fillPercentage = Math.min(Math.max((safeRating - i) * 100, 0), 100);

        return (
          <div key={i} style={{ position: "relative", width: "16px", height: "16px" }}>
            {/* Empty Background Star */}
            <svg 
              viewBox="0 0 24 24" 
              width="16" 
              height="16" 
              fill="#E0E0E0" 
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            
            {/* Filled Foreground Star (Clipped based on decimal rating) */}
            <svg 
              viewBox="0 0 24 24" 
              width="16" 
              height="16" 
              fill="#F5C518" 
              style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` 
              }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
