import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, Bus, Clock, User, Phone } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Timetable = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"route" | "cities">("route");
  const [results, setResults] = useState<any[]>([]);
  const [selectedBus, setSelectedBus] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      toast.error("Please enter search details");
      return;
    }

    // Simulated results
    setResults([
      {
        id: 1,
        busNumber: "Express 101",
        route: "Bangalore - Mysore",
        departure: "08:00 AM",
        arrival: "11:00 AM",
        type: "Express",
        driver: "Ramesh Kumar",
        conductor: "Suresh Patel",
        contact: "+91 98765 43210",
      },
      {
        id: 2,
        busNumber: "Super Deluxe 202",
        route: "Bangalore - Mysore",
        departure: "10:30 AM",
        arrival: "01:30 PM",
        type: "Super Deluxe",
        driver: "Vikram Singh",
        conductor: "Anil Reddy",
        contact: "+91 98765 43211",
      },
      {
        id: 3,
        busNumber: "Volvo 303",
        route: "Bangalore - Mysore",
        departure: "02:00 PM",
        arrival: "05:00 PM",
        type: "Volvo AC",
        driver: "Mahesh Gowda",
        conductor: "Prakash Kumar",
        contact: "+91 98765 43212",
      },
    ]);
    toast.success("Found buses!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">View Timetable</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex gap-4 mb-4">
              <Button
                variant={searchType === "route" ? "default" : "outline"}
                onClick={() => setSearchType("route")}
                className="flex-1"
              >
                By Route
              </Button>
              <Button
                variant={searchType === "cities" ? "default" : "outline"}
                onClick={() => setSearchType("cities")}
                className="flex-1"
              >
                By Source & Destination
              </Button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={
                    searchType === "route"
                      ? "Enter route name (e.g., Bangalore-Mysore)"
                      : "Enter source and destination"
                  }
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full h-12">
                Search Timetable
              </Button>
            </form>
          </Card>

          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Available Buses</h2>
              {results.map((bus, index) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
                    onClick={() => setSelectedBus(bus)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Bus className="w-8 h-8 text-primary" />
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{bus.busNumber}</h3>
                          <p className="text-sm text-muted-foreground">{bus.route}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {bus.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Departure</p>
                        <p className="font-semibold text-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {bus.departure}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Arrival</p>
                        <p className="font-semibold text-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {bus.arrival}
                        </p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      View Details
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </main>

      <Dialog open={!!selectedBus} onOpenChange={() => setSelectedBus(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bus Details</DialogTitle>
          </DialogHeader>
          {selectedBus && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-bold text-lg text-foreground mb-2">{selectedBus.busNumber}</h3>
                <p className="text-sm text-muted-foreground">{selectedBus.route}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Driver</p>
                    <p className="font-semibold text-foreground">{selectedBus.driver}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Conductor</p>
                    <p className="font-semibold text-foreground">{selectedBus.conductor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">In-charge Contact</p>
                    <p className="font-semibold text-foreground">{selectedBus.contact}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Departure Time</p>
                  <p className="font-bold text-foreground">{selectedBus.departure}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Arrival Time</p>
                  <p className="font-bold text-foreground">{selectedBus.arrival}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Timetable;
