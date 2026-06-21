export default function PageContainer({ children, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={`section-wrap ${className}`}>
      {children}
    </Tag>
  )
}
