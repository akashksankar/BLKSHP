/**
 * BLACK S.H.E.E.P. - Universal Profile Illustration Asset References
 * Clean, technical, non-fancy vector silhouettes for synthetic humanoid subjects
 */

export const UNIVERSAL_MALE_AVATAR = '/src/assets/images/universal_male.svg';
export const UNIVERSAL_FEMALE_AVATAR = '/src/assets/images/universal_female.svg';

export interface AvatarOption {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'custom';
  url: string;
  description: string;
}

export const UNIVERSAL_AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'universal_male',
    name: 'Universal Male Profile',
    gender: 'male',
    url: UNIVERSAL_MALE_AVATAR,
    description: 'Clean minimalist vector silhouette · Technical research spec (Male)',
  },
  {
    id: 'universal_female',
    name: 'Universal Female Profile',
    gender: 'female',
    url: UNIVERSAL_FEMALE_AVATAR,
    description: 'Clean minimalist vector silhouette · Technical research spec (Female)',
  },
];

export function getUniversalAvatar(gender?: 'male' | 'female' | string): string {
  if (gender === 'female' || gender === 'f') {
    return UNIVERSAL_FEMALE_AVATAR;
  }
  return UNIVERSAL_MALE_AVATAR;
}
