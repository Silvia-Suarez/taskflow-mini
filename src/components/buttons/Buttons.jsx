import { 
    PiCheckCircle, 
    PiXCircle, 
    PiWarningCircle, 
    PiInfo 
  } from "react-icons/pi";
  
  function Button({ 
    children, 
    onClick, 
    variant = 'primary', 
    disabled, 
    type = 'button',
    className = '',
    icon: Icon,
    size = 'md'
  }) {
    const variants = {
      primary: 'bg-purple-accent hover:bg-purple-600 text-white',
      success: 'bg-green-500 hover:bg-green-600 text-white',
      error: 'bg-red-500 hover:bg-red-600 text-white',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      neutral: 'bg-app-surface hover:bg-app-border text-app-text border border-app-border',
      outline: 'border-2 border-purple-accent text-purple-accent hover:bg-purple-soft hover:text-purple-accent',
    };
  
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3.5 text-lg',
    };
  
    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.md;
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          ${variantClasses} 
          ${sizeClasses} 
          rounded-button 
          font-semibold 
          cursor-pointer
          transition-all 
          duration-200 
          ease-spring
          flex 
          items-center 
          justify-center 
          gap-2
          disabled:opacity-50 
          disabled:cursor-not-allowed
          hover:shadow-card-hover
          active:inset-shadow-pressed
          ${className}
        `}
      >
        {Icon && <Icon className="text-xl" />}
        {children}
      </button>
    );
  }
  
  // Exportamos variantes individuales para compatibilidad con tu código
  function SuccessButton({ children, ...props }) {
    return <Button variant="success" {...props}>{children}</Button>;
  }
  
  function ErrorButton({ children, ...props }) {
    return <Button variant="error" {...props}>{children}</Button>;
  }
  
  function WarningButton({ children, ...props }) {
    return <Button variant="warning" {...props}>{children}</Button>;
  }
  
  function NeutralButton({ children, ...props }) {
    return <Button variant="neutral" {...props}>{children}</Button>;
  }
  
  function OutlineButton({ children, ...props }) {
    return <Button variant="outline" {...props}>{children}</Button>;
  }
  
  export { 
    Button, 
    SuccessButton, 
    ErrorButton, 
    WarningButton, 
    NeutralButton,
    OutlineButton
  };