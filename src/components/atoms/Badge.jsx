import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary/10 to-blue-100 text-primary border border-primary/20',
    secondary: 'bg-gradient-to-r from-secondary/10 to-purple-100 text-secondary border border-secondary/20',
    success: 'bg-gradient-to-r from-success/10 to-green-100 text-success border border-success/20',
    warning: 'bg-gradient-to-r from-warning/10 to-yellow-100 text-warning border border-warning/20',
    error: 'bg-gradient-to-r from-error/10 to-red-100 text-error border border-error/20',
    info: 'bg-gradient-to-r from-info/10 to-blue-100 text-info border border-info/20'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  )
}

export default Badge