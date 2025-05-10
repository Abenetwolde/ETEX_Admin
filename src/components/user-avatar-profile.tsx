import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: {
    imageUrl?: string;
    fullName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
  } | null;
}

export function UserAvatarProfile({
  className,
  showInfo = true,
  user
}: UserAvatarProfileProps) {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage src={user?.imageUrl || ''} alt={user?.fullName || ''} />
        <AvatarFallback className='rounded-lg'>
          {"Super Admin".slice(0, 2)?.toUpperCase() || 'CN'}
        </AvatarFallback>
      </Avatar>

    {showInfo && (
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-semibold'>{user?.fullName || ''}</span>
        <span className='truncate text-xs'>
      superadmin@insa.gov.et
        </span>
      </div>
    )}
    </div>
  );
}
