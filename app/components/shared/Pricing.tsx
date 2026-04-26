import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { SubmitButton } from "../dashboard/SubmitButtons";
import Link from "next/link";
import { CreateSubscription } from "@/app/utils/actions";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Developer",
    cardDescription: "Perfect for individual developers starting their blog.",
    benefits: [
      "1 Blog Site",
      "Unlimited Articles",
      "Code Syntax Highlighting",
      "Markdown Editor",
    ],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Pro",
    cardDescription: "For professional developers and teams.",
    priceTitle: "$29",
    benefits: [
      "Unlimited Blog Sites",
      "Unlimited Articles",
      "Custom Domain",
      "Priority Support",
    ],
  },
];

export function PricingTable() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Simple pricing for developers
        </h1>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Start writing for free, upgrade when you need more. No hidden fees, cancel anytime.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Pro</h3>

                    <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Most popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>

              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="text-primary size-5" />

                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={CreateSubscription}>
                  <SubmitButton text="Buy Plan" className="mt-5 w-full" />
                </form>
              ) : (
                <Button variant="outline" className="mt-5 w-full" asChild>
                  <Link href="/dashboard">Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
