"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

type Props = {};
type InputData = {
    title: string;
    text: string;
};

const CreateArticleSection = (props: Props) => {
    // connect to supabase
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [user, setUser] = useState<any>();
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    // get user email
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error) {
                    console.error('Error fetching user:', error.message);
                } else if (data) {
                    console.log(data.user);
                    setUser(data.user);
                }
            } catch (error: any) {
                console.error('Error fetching user:', error.message);
            }
        };

        getUser();
    }, []);


    // form validation 
    const schema = yup.object().shape({
        title: yup.string().required("Article must have title"),
        text: yup.string().min(10).max(556),
    });

    // connect form validation & form data 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<InputData>({
        resolver: yupResolver(schema)
    });

    // insert data to supabase
    const onSubmit: SubmitHandler<InputData> = async (formData) => {
        try {
          const { data, error } = await supabase
            .from('articles')
            .insert([
              {
                user_id: user?.id,
                title: formData.title,
                content: formData.text,
                user_email: user?.email,
              },
            ])
            .select();
    
          if (error) {
            setError("Creating Failed 😥");
          } else if (data) {
            setSuccess("Creating Successfully 😇");
            reset();
            router.push('/');
          }
        } catch (error) {
          setError("Creating Failed 😥");
        }
      };

    return (
        <div className='flex min-h-[90vh] items-center justify-center'>
            <Card className="w-[650px]">
                <CardHeader>
                    <CardDescription className='text-green-500 font-bold'>{success}</CardDescription>
                    <CardDescription className='text-red-500'>{error}</CardDescription>
                    <CardTitle>Create Article</CardTitle>
                    <CardDescription>Create your new article in one-click.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" placeholder="Title of your article" {...register("title")} />
                                <p className='text-red-500'>{errors.title?.message}</p>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="text">Article Text</Label>
                                <textarea
                                    id="text"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    data-gramm="false"
                                    wt-ignore-input="true"
                                    {...register("text")}
                                ></textarea>
                                <p className='text-red-500'>{errors.text?.message}</p>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title">Created By {user?.email}</Label>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button type='submit'>Create</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default CreateArticleSection;
