"use client"
import NavbarSection from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

export default function Index() {
  const [articles, setArticles] = useState<any>();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data, error } = await supabase.from("articles").select("*");

        if (error) {
            console.error('Error fetching articles:', error.message);
        } else if (data) {
            console.log(data);
            setArticles(data);
        }
      } catch (error: any) {
          console.error('Error fetching articles:', error.message);
      }
    }
    getPosts();
  }, [])

  return (
    <div className="w-full flex flex-col items-center">
      <NavbarSection />
      <div className="flex min-h-[90vh] items-center justify-center mt-5">
        <section className="text-gray-600 body-font overflow-hidden">
          <h1 className="px-5 text-4xl font-semibold leading-none tracking-tight">
            Stay curious.
          </h1>
          <p className="px-5">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <div className="container px-5 py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              {articles ?
                articles?.map((article:any) => {
                  return <PostCard postcard={article} />;
                }) :
                <p>Not articles added yet</p>
              }
            </div>
            <button className="flex mx-auto mt-20 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              See More.....
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
