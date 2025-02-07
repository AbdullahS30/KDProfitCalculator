import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Sprout, 
  Tractor, 
  ShoppingBag,
  Warehouse,
  Home
} from "lucide-react";

const routes = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/fertilizer", icon: Sprout, label: "Fertilizer" },
  { path: "/direct-inputs", icon: ShoppingBag, label: "Direct Inputs" },
  { path: "/product-based", icon: Calculator, label: "Product Based" },
  { path: "/crop-sales", icon: Warehouse, label: "Crop Sales" },
  { path: "/machine-sales", icon: Tractor, label: "Machine Sales" }
];

export function NavigationSidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-sidebar p-4 space-y-2 border-r">
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = location === route.path;
        
        return (
          <Link key={route.path} href={route.path}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <Icon className="h-4 w-4" />
              {route.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
