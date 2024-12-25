import { url } from "inspector";
import Image from "next/image";
import ogs from "open-graph-scraper";

const links = [
  {
    id: 1,
    title: "Laravel 框架文档",
    url: "https://laravel.com/docs",
    image: "",
    desc: "",
  },
  {
    id: 2,
    title: "NestJS 框架文档",
    url: "https://docs.nestjs.com",
    image: "",
    desc: "",
  },
];
export default function DocumentPage() {
  for (let i = 0; i < links.length; i++) {
    ogs({ url: links[i].url }).then((data) => {
      // console.log(data.result);
      if (data.result.ogImage && data.result.ogImage.length) {
        links[i].image = data.result.ogImage[0].url;
      }
      if (data.result.ogDescription) {
        links[i].desc = data.result.ogDescription;
      }
    });
  }
  return (
    <main className="container max-w-4xl py-6 lg:py-10 mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {links.map((link) => {
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="block px-6 py-4 rounded border"
            >
              {link.image && (
                <Image
                  src={link.image}
                  alt={link.title}
                  width={1024}
                  height={512}
                  priority
                  className="mb-2 w-full h-[196px] object-cover"
                />
              )}
              <div>{link.title}</div>
              {link.desc && (
                <div className="text-sm text-muted-foreground mt-2 truncate">
                  {link.desc}
                </div>
              )}
            </a>
          );
        })}
      </div>
    </main>
  );
}
