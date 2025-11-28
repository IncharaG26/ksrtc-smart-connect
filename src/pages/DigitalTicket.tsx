import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Home, QrCode } from "lucide-react";
import { toast } from "sonner";

const DigitalTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};

  const handleDownload = () => {
    toast.success("Ticket downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden shadow-2xl">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-center">
              <h1 className="text-2xl font-bold text-white mb-1">KSRTC</h1>
              <p className="text-white/90 text-sm">Smart Transit</p>
            </div>

            {/* QR Code Section */}
            <div className="bg-card p-6 flex justify-center border-b-2 border-dashed">
              <div className="w-40 h-40 bg-secondary rounded-lg flex items-center justify-center">
                <QrCode className="w-24 h-24 text-muted-foreground" />
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-6 space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Booking ID</p>
                <p className="text-lg font-bold text-foreground">KSRTC{Math.floor(Math.random() * 1000000)}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Passenger Name</span>
                  <span className="font-semibold text-foreground">{bookingData.passengerName}</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Bus Number</span>
                  <span className="font-semibold text-foreground">{bookingData.bus}</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">From</span>
                  <span className="font-semibold text-foreground">{bookingData.source}</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">To</span>
                  <span className="font-semibold text-foreground">{bookingData.destination}</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-foreground">{bookingData.date}</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Departure</span>
                  <span className="font-semibold text-foreground">08:00 AM</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Seat Number</span>
                  <span className="font-semibold text-foreground">A{Math.floor(Math.random() * 40) + 1}</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Fare</span>
                  <span className="font-bold text-lg text-primary">₹450</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">
                Show this ticket to the conductor during your journey
              </p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <Button onClick={handleDownload} className="w-full h-12 text-lg" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Ticket
            </Button>
            <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full h-12 text-lg" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DigitalTicket;
