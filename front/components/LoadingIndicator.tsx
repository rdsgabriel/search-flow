const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-6 h-6">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-6 h-6 rounded-full border-2 border-violet-100 border-t-violet-500 animate-[spin_0.6s_linear_infinite]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full rotate-45">
          <div className="w-6 h-6 rounded-full border-2 border-transparent border-t-violet-300 animate-[spin_1s_linear_infinite]" />
        </div>
      </div>
    </div>
  )
}

export default LoadingIndicator

