
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
  username: 'shadcn',
  email: 'shadcn@example.com',
  bio: 'shadcn is a software engineer',
  urls: ['https://twitter.com/shadcn'],
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      avatar: 'https://github.com/shadcn.png',
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