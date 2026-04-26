import { CloudRain } from "lucide-react";

const features = [
  {
    name: "Code Syntax Highlighting",
    description:
      "Beautiful syntax highlighting for all major programming languages. Your code snippets will look professional and easy to read.",
    icon: CloudRain,
  },
  {
    name: "Markdown Editor",
    description:
      "Write your articles in Markdown with our powerful editor. Supports tables, code blocks, and rich text formatting.",
    icon: CloudRain,
  },
  {
    name: "Secure Authentication",
    description:
      "Built-in authentication with Kinde. Your account and content are secure with industry-standard security practices.",
    icon: CloudRain,
  },
  {
    name: "Fast Performance",
    description:
      "Optimized for speed with Next.js and Edge caching. Your articles load instantly for readers worldwide.",
    icon: CloudRain,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Write Code</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to write programming articles
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Focus on writing great technical content while we handle the rest. Syntax highlighting, markdown support, and fast performance out of the box.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
