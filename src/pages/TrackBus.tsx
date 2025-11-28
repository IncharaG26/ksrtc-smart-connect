import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const TrackBus = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState<"route" | "vehicle">("route");
  const [busData, setBusData] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      toast.error("Please enter a search term");
      return;
    }

    // Simulated bus data
    setBusData({
      busNumber: searchBy === "route" ? searchQuery : "KA-01-AB-1234",
      route: "Bangalore - Mysore",
      status: "Running",
      eta: "15 minutes",
      currentLocation: "Electronic City",
    });
    toast.success("Bus found!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Track Bus</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex gap-4 mb-4">
              <Button
                variant={searchBy === "route" ? "default" : "outline"}
                onClick={() => setSearchBy("route")}
                className="flex-1"
              >
                Route Number
              </Button>
              <Button
                variant={searchBy === "vehicle" ? "default" : "outline"}
                onClick={() => setSearchBy("vehicle")}
                className="flex-1"
              >
                Vehicle Number
              </Button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`Enter ${searchBy === "route" ? "route number" : "vehicle registration number"}`}
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full h-12">
                Search Bus
              </Button>
            </form>
          </Card>

          {busData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-foreground">Bus Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Bus Number</span>
                    <span className="font-semibold text-foreground">{busData.busNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Route</span>
                    <span className="font-semibold text-foreground">{busData.route}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-semibold text-green-600">{busData.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      ETA
                    </span>
                    <span className="font-semibold text-foreground">{busData.eta}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Current Location
                    </span>
                    <span className="font-semibold text-foreground">{busData.currentLocation}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/50">
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Live Map View</p>
                    <p className="text-sm text-muted-foreground">(Map integration)</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default TrackBus;
