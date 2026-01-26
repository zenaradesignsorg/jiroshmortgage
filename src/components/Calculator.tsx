import { useState, useMemo } from "react";
import { Calculator as CalcIcon, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Calculator = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);

  const downPaymentPercent = useMemo(() => {
    return ((downPayment / homePrice) * 100).toFixed(1);
  }, [downPayment, homePrice]);

  const monthlyPayment = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = amortization * 12;

    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }

    const payment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return isNaN(payment) ? 0 : payment;
  }, [homePrice, downPayment, interestRate, amortization]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <CalcIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Estimate Tool
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Mortgage Calculator
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            Get a quick estimate of your monthly payments. For a detailed assessment 
            and actual rates, book a free call.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-medium border border-border p-4 sm:p-6 md:p-8">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Inputs */}
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <Label htmlFor="homePrice" className="text-foreground mb-2 block text-sm sm:text-base">
                    Home Price
                  </Label>
                  <Input
                    id="homePrice"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="text-base sm:text-lg h-12 sm:h-11"
                  />
                  <Slider
                    value={[homePrice]}
                    onValueChange={([value]) => setHomePrice(value)}
                    min={100000}
                    max={2000000}
                    step={10000}
                    className="mt-3"
                  />
                </div>

                <div>
                  <Label htmlFor="downPayment" className="text-foreground mb-2 block text-sm sm:text-base">
                    Down Payment ({downPaymentPercent}%)
                  </Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="text-base sm:text-lg h-12 sm:h-11"
                  />
                  <Slider
                    value={[downPayment]}
                    onValueChange={([value]) => setDownPayment(value)}
                    min={0}
                    max={homePrice * 0.5}
                    step={5000}
                    className="mt-3"
                  />
                </div>

                <div>
                  <Label htmlFor="interestRate" className="text-foreground mb-2 block text-sm sm:text-base">
                    Interest Rate (%)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="text-base sm:text-lg h-12 sm:h-11"
                  />
                  <Slider
                    value={[interestRate]}
                    onValueChange={([value]) => setInterestRate(value)}
                    min={1}
                    max={10}
                    step={0.1}
                    className="mt-3"
                  />
                </div>

                <div>
                  <Label htmlFor="amortization" className="text-foreground mb-2 block text-sm sm:text-base">
                    Amortization (years)
                  </Label>
                  <Input
                    id="amortization"
                    type="number"
                    value={amortization}
                    onChange={(e) => setAmortization(Number(e.target.value))}
                    className="text-base sm:text-lg h-12 sm:h-11"
                  />
                  <Slider
                    value={[amortization]}
                    onValueChange={([value]) => setAmortization(value)}
                    min={5}
                    max={30}
                    step={5}
                    className="mt-3"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-col justify-center lg:pl-4">
                <div className="bg-hero-gradient rounded-xl p-5 sm:p-6 md:p-8 text-primary-foreground text-center">
                  <p className="text-primary-foreground/80 mb-2 text-sm sm:text-base">Estimated Monthly Payment</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                    {formatCurrency(monthlyPayment)}
                  </p>
                  <div className="text-xs sm:text-sm text-primary-foreground/70 space-y-1">
                    <p>Mortgage Amount: {formatCurrency(homePrice - downPayment)}</p>
                    <p>Term: {amortization} years</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted rounded-lg flex gap-2 sm:gap-3">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    This is an estimate for reference only. Actual rates and payments 
                    depend on your specific situation. Contact me for accurate numbers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
