import React from 'react'
import NavbarSection from "@/components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from 'next/link';
import { Button } from '@/components/ui/button';



export default async function page({ params }: any) { 

    const supabase = createServerComponentClient({ cookies });

    const { data: postcard } = await supabase.from("articles").select("*").eq('id', params.postId).single();
    const formattedDate = new Date(Date.parse(postcard?.inserted_at));
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours();
    const minutes = formattedDate.getMinutes();

    const { data: data } = await supabase.auth.getUser();

    console.log(data?.user?.email);

    return (
        <div className="w-full flex flex-col items-center">
            <NavbarSection />

            {/* artical details */}
            <div className="flex min-h-[90vh] mt-5">
                <section className="text-gray-600 body-font overflow-hidden">
                    {/* back button */}
                    <Link
                        href="/"
                        className="absolute left-20 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>{' '}
                        Back
                    </Link>
                    <div className="container px-5 py-24 mx-auto">

                        <div className="-my-8 divide-y-2 divide-gray-100">

                            {/* Pass the Props type as a generic parameter */}
                            {postcard && (<div className="py-8 px-8 flex flex-col flex-wrap md:flex-nowrap">
                                <h2 className="text-5xl font-medium text-gray-900 title-font mb-5">
                                    {postcard?.title}
                                </h2>

                                <div className="md:flex-grow">
                                    <div className="md:w-74 md:mb-0 mb-6 flex-shrink-0 flex">
                                        <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-10 h-10"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="mt-1 text-gray-500 text-sm">
                                                <strong>By</strong> {postcard?.user_email}
                                            </span>
                                            <hr />
                                            <span className="mt-1 text-gray-500 text-sm">
                                                <strong>In</strong> {day}-{month}-{year} {hours}:{minutes}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed mt-5 text-3xl">{postcard?.content}</p>

                                </div>
                                {data?.user?.email === postcard.user_email && (
                                <div className='flex flex-col items-start'>
                                    <Link href={`/editArticle/${postcard.id}`}>
                                    <Button className="flex mt-5 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Edit</Button>
                                    </Link>
                                    <form action="/supabase/delete-article" method="post">
                                        <input type="hidden" name="delete" value={postcard.id} />
                                        <Button className="flex mt-3 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
                                            type="submit">Delete</Button>
                                    </form>
                                </div> 
                                )}
                            </div>)}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}