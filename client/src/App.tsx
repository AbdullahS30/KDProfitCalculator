import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Calculator from "@/pages/calculator";
import NotFound from "@/pages/not-found";
import Home from "./pages/home";
import Scenarios from "./pages/scenarios";
import ScenarioDetails from "./pages/ScenarioDetails";

function Router() {
  return (
    <Switch>
         <Route path="/" component={Home} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/scenarios" component={Scenarios} />
      <Route path="/scenarios/:id" component={ScenarioDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>

  );
}

export default App;
