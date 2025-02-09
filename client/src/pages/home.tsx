import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ChartBar, History, Loader2 } from "lucide-react";
import { PreloadImages } from "@/components/PreloadImages";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <PreloadImages onLoadComplete={() => setIsLoading(false)} />
      
      <div className={cn(
        "max-w-4xl mx-auto space-y-8 transition-opacity duration-300",
        isLoading ? "opacity-0" : "opacity-100"
      )}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading resources...</p>
            </div>
          </div>
        )}
        
        {/* Logo Section */}
        <div className="flex justify-center">
          <img src="/images/Dukaan Final Logo-01.png" alt="KDukaan Logo" className="h-40 w-auto" />
        </div>
        {/* dist/public/images/ */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">KDukaan Profit Calculator</h1>
          <p className="text-muted-foreground">
            Calculate your commission and forecast earnings across all product categories
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                New Calculation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Start a new profit calculation with current market rates
              </p>
              <Link href="/calculator">
                <Button className="w-full">Start Calculating</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Saved Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View and compare your previously saved scenarios
              </p>
              <Link href="/scenarios">
                <Button variant="outline" className="w-full">View Scenarios</Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
