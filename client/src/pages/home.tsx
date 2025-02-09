import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ChartBar, History } from "lucide-react";
import { PreloadImages } from "@/components/PreloadImages";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <PreloadImages />
      <div className="max-w-4xl mx-auto space-y-8">
        
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-5 w-5" />
                Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Analyze trends and optimize your sales strategy
              </p>
              <Button variant="outline" className="w-full">View Reports</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
