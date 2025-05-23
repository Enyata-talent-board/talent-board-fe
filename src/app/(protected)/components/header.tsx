'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ButtonWithLoader } from '@/components/ui/button-with-loader';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { POST } from '@/lib/requests';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'usehooks-ts';

const ProtectedHeader = () => {
    const user = useAuthStore.getState().user;
    const isMobile = useMediaQuery('(max-width: 768px)');
    const router = useRouter()

    const [isPending, startTransition] = useTransition();
    const handleLogout = () => {
        startTransition(async () => {
            try {
                const res = await POST(
                    `/api/v1/auth/logout`
                );
                if (res.status !== "success") {
                    toast.error(res.message || "Something went wrong");
                    return;
                }
                toast.success('Logged out successfully')
                router.replace('/login')


            } catch (error) {
                console.error("Error from form submission:", error);
                toast.error("Something went wrong. Please try again.");
            }
        });
    };

    return (
        <div className="flex items-center justify-between w-full p-6 fixed top-0 z-50 bg-white border-b">
            <Link href={'/dashboard'} className="font-semibold text-[24px]">Talentboard</Link>

            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar className="size-[38.8px] border border-[#34A9FF]">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        {!isMobile && (
                            <>
                                <span className="text-sm">
                                    {user?.first_name} {user?.last_name}
                                </span>
                                <Image
                                    src={'/assets/icons/arrow-down.svg'}
                                    alt='arrow'
                                    height={10}
                                    width={8.33}
                                    className='ml-2'
                                />
                            </>
                        )}
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-full max-w-[88px] md:max-w-[200px] mt-5 shadow-none rounded-b-sm">
                    {isMobile && (
                        <div className="px-3 py-2 text-sm font-medium">
                            {user?.first_name} {user?.last_name}
                        </div>
                    )}
                    <DropdownMenuGroup>
                        <ButtonWithLoader
                            disabled={isPending}
                            isLoading={isPending}
                            variant='outline'
                            className='w-full mt-[24px] cursor-pointer'
                            onClick={handleLogout}
                        >
                            Logout
                        </ButtonWithLoader>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ProtectedHeader;
