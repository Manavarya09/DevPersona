export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-400 text-lg">{message}</p>
        <p className="text-slate-500 text-sm mt-2">This may take a few seconds</p>
      </div>
    </div>
  )
}