import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, Calendar, User, Bus } from "lucide-react";
import { toast } from "sonner";

const BookTicket = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    source: "",
    destination: "",
    date: "",
    bus: "",
    passengerName: "",
    age: "",
    gender: "",
  });

  const handleNext = () => {
    if (step === 1) {
      if (!bookingData.source || !bookingData.destination || !bookingData.date) {
        toast.error("Please fill all fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!bookingData.bus) {
        toast.error("Please select a bus");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.passengerName || !bookingData.age || !bookingData.gender) {
      toast.error("Please fill all passenger details");
      return;
    }
    toast.success("Ticket booked successfully!");
    navigate("/digital-ticket", { state: { bookingData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => step > 1 ? setStep(step - 1) : navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Book Ticket</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}>Journey</span>
            <span className={step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}>Select Bus</span>
            <span className={step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}>Passenger</span>
          </div>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-foreground">Journey Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="source"
                      placeholder="Select source city"
                      className="pl-10 h-12"
                      value={bookingData.source}
                      onChange={(e) => setBookingData({ ...bookingData, source: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="destination"
                      placeholder="Select destination city"
                      className="pl-10 h-12"
                      value={bookingData.destination}
                      onChange={(e) => setBookingData({ ...bookingData, destination: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Journey Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      className="pl-10 h-12"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleNext} className="w-full h-12 mt-6">
                  Search Buses
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-foreground">Available Buses</h2>
              <div className="space-y-3">
                {["Express 101", "Super Deluxe 202", "Volvo 303"].map((bus) => (
                  <Card
                    key={bus}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      bookingData.bus === bus ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setBookingData({ ...bookingData, bus })}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bus className="w-8 h-8 text-primary" />
                        <div>
                          <h3 className="font-semibold text-foreground">{bus}</h3>
                          <p className="text-sm text-muted-foreground">Departure: 08:00 AM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-foreground">₹450</p>
                        <p className="text-sm text-muted-foreground">Available</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button onClick={handleNext} disabled={!bookingData.bus} className="w-full h-12 mt-6">
                Continue
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-foreground">Passenger Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passengerName">Passenger Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="passengerName"
                      placeholder="Enter full name"
                      className="pl-10 h-12"
                      value={bookingData.passengerName}
                      onChange={(e) => setBookingData({ ...bookingData, passengerName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Age"
                      className="h-12"
                      value={bookingData.age}
                      onChange={(e) => setBookingData({ ...bookingData, age: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={bookingData.gender} onValueChange={(value) => setBookingData({ ...bookingData, gender: value })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 mt-6">
                  Confirm Booking
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default BookTicket;
