"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"



export default function NavbarSection() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>();

  // get user email
  useEffect(() => {
    const getUser = async () => { 
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error('Error fetching user:', error.message);
        } else if (data) {
          console.log(data.user);
          setUser(data.user);
        } 
    };

    getUser();
  }, []);

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <Link href={'/'} className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Snossy Medium</span>
        </Link>
        <Menubar>
          <MenubarMenu>
            <Link href={"/"}>
              <MenubarTrigger>Main Feed</MenubarTrigger>
            </Link>
          </MenubarMenu>
          {user?.email && (<MenubarMenu>
            <Link href={"/createArticle"}>
              <MenubarTrigger>Create Article</MenubarTrigger>
            </Link>
          </MenubarMenu>)}
        </Menubar>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-gray-500 hover:bg-gray-700 text-white focus:ring-gray-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
