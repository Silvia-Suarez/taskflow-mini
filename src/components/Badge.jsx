function Badge({ children, variant = "purple", className = "" }) {
  const variants = {
    purple: "bg-purple-soft text-purple-accent",
    pink: "bg-pink-soft text-pink-accent",
    blue: "bg-blue-soft text-blue-accent",
    gray: "bg-app-border text-app-muted",
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    yellow:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  return (
    <span
      className={`
        inline-flex 
        items-center 
        px-3 
        py-1 
        rounded-pill 
        text-sm 
        font-medium
        ${variants[variant] || variants.gray}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
