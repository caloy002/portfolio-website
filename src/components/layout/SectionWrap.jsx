export default function SectionWrap({ children, className = '', id }) {
  return (
    <section
      id={id}
      className={`section-wrap scroll-section relative ${className}`}
    >
      {children}
    </section>
  )
}
