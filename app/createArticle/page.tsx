import NavbarSection from '@/components/Navbar'
import CreateArticleSection from '@/components/CreateArticle'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div className="w-full flex flex-col items-center">
            <NavbarSection />
            <CreateArticleSection/>
        </div>
    )
}