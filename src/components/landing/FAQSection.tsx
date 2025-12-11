import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the algo work?",
    answer: "Our algorithm uses advanced technical analysis and price action patterns to identify high-probability trading opportunities in XAUUSD (Gold) markets. It automatically opens and manages trades based on predefined risk parameters.",
  },
  {
    question: "Is it compatible with my broker?",
    answer: "Yes! The algo works with any broker that supports MetaTrader 4 or MetaTrader 5 platforms. Most major forex brokers are compatible.",
  },
  {
    question: "Do I need trading experience?",
    answer: "No prior trading experience is required. We provide detailed setup guides and our support team is available to help you get started. The algo does all the technical analysis automatically.",
  },
  {
    question: "What is the minimum capital required?",
    answer: "We recommend starting with at least $100-500 for optimal performance. The algo includes risk management features that work with various account sizes.",
  },
  {
    question: "How do I get support?",
    answer: "We provide 24/7 support through our Telegram group and WhatsApp. You can also reach us via email for any queries or technical assistance.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
            FAQs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Common questions answered
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left font-display font-medium text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
