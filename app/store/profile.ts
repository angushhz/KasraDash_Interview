
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PasswordFormValues, ProfileFormValues } from '~/schemas/profile-schema';

type ProfileStore = {
  profile: ProfileFormValues;
  avatar: string;
  updateProfile: (profile: ProfileFormValues) => void;
  updatePassword: (passwordData: PasswordFormValues) => Promise<boolean>;
  updateAvatar: (avatarUrl: string | null) => void;
};

const defaultProfile: ProfileFormValues = {
  username: 'hoangnam',
  email: 'hoangnamqt.2001@gmail.com',
  bio: 'hoangnam is a software engineer',
  urls: ['https://www.linkedin.com/in/nam-tr%C6%B0%C6%A1ng/'],
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      avatar: 'https://media.licdn.com/dms/image/v2/D5603AQHY9mPcyc0U0g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720788481903?e=1753315200&v=beta&t=a92ORxO3t48fc2WQ0Cg2P9f622Wv-nDGf9NAsqmmLag',
      updateProfile: (profile) => set({ profile }),
      updatePassword: async (passwordData) => {
        // In a real app, this would call an API endpoint
        // For demo purposes, we're just simulating a successful update
        console.log('Password update requested:', passwordData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Return true to indicate success
        return true;
      },
      updateAvatar: (avatarUrl) => set({ avatar: avatarUrl || '' })
    }),
    {
      name: 'profile-storage',
    }
  )
);