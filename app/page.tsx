import NavbarSection from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: articles } = await supabase.from("articles").select("*");
  
  // console.log(articles);
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
              {/* Pass the Props type as a generic parameter */}
              {articles?.map((article) => {
                return <PostCard postcard={article} />
              })}
            </div>
            <button className="flex mx-auto mt-20 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">See More.....</button>
          </div>
        </section>
      </div>
    </div>
  );
}
