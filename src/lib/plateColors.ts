import type { AnatomyPlate } from '@/data/programs';

export function plateTint(plate: AnatomyPlate): string {
  switch (plate) {
    case 'face':
      return 'bg-[#0A84FF]/12 text-[#0A84FF]';
    case 'jaw':
      return 'bg-[#FF9F0A]/12 text-[#FF9F0A]';
    case 'eyes':
      return 'bg-[#AF52DE]/12 text-[#AF52DE]';
    case 'posture':
      return 'bg-[#30D158]/12 text-[#30D158]';
    case 'skin':
      return 'bg-[#FF375F]/12 text-[#FF375F]';
    case 'sleep':
      return 'bg-[#5E5CE6]/12 text-[#5E5CE6]';
    case 'body':
    default:
      return 'bg-[#00C7BE]/12 text-[#00C7BE]';
  }
}
