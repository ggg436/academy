type Props = {
  children: React.ReactNode;
};

export const StickyWrapper = ({ children }: Props) => {
  return (
    <div 
      className="hidden lg:block w-[368px] sticky self-start" 
      style={{ 
        top: '24px', 
        alignSelf: 'flex-start', 
        position: 'sticky',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform',
        isolation: 'isolate'
      }}
    >
      <div className="flex flex-col gap-y-4" style={{ position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};
