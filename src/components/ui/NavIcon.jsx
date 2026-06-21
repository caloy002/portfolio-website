import { Home, User, Sparkles, FolderOpen, Send } from 'lucide-react'

const icons = { Home, User, Sparkles, FolderOpen, Send }

export default function NavIcon({ name, className = 'h-4 w-4' }) {
  const Icon = icons[name] ?? Home
  return <Icon className={className} strokeWidth={1.5} />
}
