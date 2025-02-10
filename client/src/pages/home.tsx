import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ChartBar, History, Loader2 } from "lucide-react";
import { PreloadImages } from "@/components/PreloadImages";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedHome");
    return !hasLoaded;
  });

  useEffect(() => {
    if (!isLoading) {
      sessionStorage.setItem("hasLoadedHome", "true");
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {isLoading && <PreloadImages onLoadComplete={() => setIsLoading(false)} />}
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Logo Section */}
        <div className="flex justify-center">
          {isLoading ? (
            <Skeleton className="h-40 w-64" />
          ) : (
            <img src="/images/Dukaan Final Logo-01.png" alt="KDukaan Logo" className="h-40 w-auto" />
          )}
        </div>

        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">KDukaan Profit Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your commission and forecast earnings across all product categories
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <Card className={cn(isLoading && "opacity-50 pointer-events-none")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-5 w-5 rounded-full" />
                ) : (
                  <Calculator className="h-5 w-5" />
                )}
                New Calculation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Start a new profit calculation with current market rates
              </p>
              <Link href="/calculator">
                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Start Calculating
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className={cn(isLoading && "opacity-50 pointer-events-none")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-5 w-5 rounded-full" />
                ) : (
                  <History className="h-5 w-5" />
                )}
                Saved Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View and compare your previously saved scenarios
              </p>
              <Link href="/scenarios">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  View Scenarios
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
