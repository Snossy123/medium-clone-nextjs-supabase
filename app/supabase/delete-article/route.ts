import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const delItemId = String(formData.get('delete'));
  const supabase = createServerComponentClient({ cookies });
 
  const { error } = await supabase
  .from('articles')
  .delete()
  .eq('id', delItemId)
  // const { data: articles } = await supabase.from("articles").select().eq('id', delItemId);  

  console.log(error); 

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/posts/${delItemId}?error=Could not delete this article`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

  return NextResponse.redirect(requestUrl.origin, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
