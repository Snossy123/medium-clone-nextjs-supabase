import React from 'react'
import NavbarSection from "@/components/Navbar";
import EditArticleSection from '@/components/EditArticle';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default async function page({ params }: any) { 

    const supabase = createServerComponentClient({ cookies });

    const { data: postcard } = await supabase.from("articles").select("*").eq('id', params.postId).single();

    return (
        <div className="w-full flex flex-col items-center">
            <NavbarSection />

            {/* artical details */}
            <EditArticleSection article={postcard}/>
        </div>
    )
}