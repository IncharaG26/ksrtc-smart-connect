import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Ticket, Calendar, MapPin } from "lucide-react";

const MyTickets = () => {
  const navigate = useNavigate();

  const tickets = [
    {
      id: "KSRTC123456",
      busNumber: "Express 101",
      from: "Bangalore",
      to: "Mysore",
      date: "2024-02-15",
      time: "08:00 AM",
      seat: "A12",
      status: "Upcoming",
    },
    {
      id: "KSRTC123457",
      busNumber: "Volvo 303",
      from: "Mysore",
      to: "Bangalore",
      date: "2024-02-10",
      time: "02:00 PM",
      seat: "B8",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">My Tickets</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tickets.length === 0 ? (
            <Card className="p-12 text-center">
              <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Tickets Yet</h2>
              <p className="text-muted-foreground mb-6">Book your first journey with KSRTC</p>
              <Button onClick={() => navigate("/book-ticket")}>Book Ticket</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Ticket className="w-5 h-5 text-primary" />
                          <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{ticket.busNumber}</h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ticket.status === "Upcoming"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Route
                        </p>
                        <p className="font-semibold text-foreground">
                          {ticket.from} → {ticket.to}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date & Time
                        </p>
                        <p className="font-semibold text-foreground">
                          {ticket.date} at {ticket.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Seat Number</p>
                        <p className="font-semibold text-foreground">{ticket.seat}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                      {ticket.status === "Upcoming" && (
                        <Button variant="destructive" className="flex-1">
                          Cancel Ticket
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default MyTickets;
