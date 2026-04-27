import prisma from "@/app/utils/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from "../../components/shared/Logo";
import { ThemeToggle } from "@/app/components/dashboard/ThemeToggle";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Defaultimage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}


export default async function BlogIndexPage({
  params,
}: {
  params: { name: string };
}) {
  const data = await getData(params.name);

  return (
    <>
      <nav className="my-10 flex justify-between">
        <Link href="/dashboard">
          <Logo className="flex self-start cursor-pointer" />
        </Link>
        <ThemeToggle />
      </nav>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {data.posts.map((item) => (
            <Link key={item.id} href={`/blog/${params.name}/${item.slug}`}>
              <Card className="cursor-pointer hover:border-primary transition-colors flex flex-col h-full">
                {item.image ? <Image
                  src={item.image ?? Defaultimage}
                  alt={item.title}
                  className="rounded-t-lg object-cover w-full h-[200px]"
                  width={400}
                  height={200}
                  priority
                /> :
                  <div className='w-[400px] h-[200px] bg-slate-200 rounded-lg animate-pulse'></div>
                }
                <CardHeader>
                  <CardTitle className="truncate">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {item.smallDescription}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="mt-auto">
                  <p className="text-sm text-primary font-medium">Read more →</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
