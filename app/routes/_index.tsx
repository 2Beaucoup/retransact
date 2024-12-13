import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Automated Document Management`,
      description: `Never lose track of paperwork again. Our smart system automatically organizes, tracks and stores all transaction documents securely in the cloud.`,
      icon: <i className="las la-file-contract"></i>,
    },
    {
      heading: `Real-Time Transaction Tracking`,
      description: `Stay on top of every deal with instant status updates, automated reminders and a clear timeline of next steps.`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Seamless Team Collaboration`,
      description: `Coordinate effortlessly with agents, clients, title companies and other stakeholders in one centralized platform.`,
      icon: <i className="las la-users"></i>,
    },
    {
      heading: `Compliance Automation`,
      description: `Built-in compliance checks and automated workflows ensure you never miss critical requirements or deadlines.`,
      icon: <i className="las la-shield-alt"></i>,
    },
    {
      heading: `Client Portal`,
      description: `Give clients 24/7 access to transaction status, documents and next steps through a branded client portal.`,
      icon: <i className="las la-laptop"></i>,
    },
    {
      heading: `Performance Analytics`,
      description: `Track key metrics, identify bottlenecks and optimize your transaction process with detailed analytics.`,
      icon: <i className="las la-chart-bar"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Johnson`,
      designation: `Real Estate Broker`,
      content: `This platform has transformed how I manage transactions. I've cut my admin time by 65% and can focus on what matters - growing my business and serving clients.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Chen`,
      designation: `Transaction Coordinator`,
      content: `Managing 50+ transactions monthly used to be overwhelming. Now I can handle double the volume with less stress thanks to the automated workflows.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Amanda Rodriguez`,
      designation: `Real Estate Agent`,
      content: `My clients love the transparency and 24/7 access to their transaction status. It's given me a real competitive edge in my market.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for individual agents getting started`,
      monthly: 49,
      yearly: 470,
      features: [
        `Up to 5 active transactions`,
        `Basic document management`,
        `Email support`,
      ],
    },
    {
      title: `Professional`,
      description: `Ideal for growing teams and brokerages`,
      monthly: 99,
      yearly: 950,
      features: [
        `Unlimited transactions`,
        `Team collaboration tools`,
        `Priority support`,
        `Advanced analytics`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large organizations`,
      monthly: 199,
      yearly: 1900,
      features: [
        `Custom workflows`,
        `API access`,
        `Dedicated account manager`,
        `White-label options`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How long does it take to get started?`,
      answer: `You can be up and running in less than 15 minutes. Our intuitive setup wizard will guide you through the process.`,
    },
    {
      question: `Can I import my existing transactions?`,
      answer: `Yes! We provide tools to easily import your existing transactions and documents from other systems or spreadsheets.`,
    },
    {
      question: `Is my data secure?`,
      answer: `We use bank-level encryption and security measures to protect your data. All information is stored in SOC 2 compliant data centers.`,
    },
    {
      question: `Do you offer training and support?`,
      answer: `Yes, we provide free onboarding, training sessions and responsive customer support to ensure your success.`,
    },
  ]

  const steps = [
    {
      heading: `Quick Setup`,
      description: `Create your account and customize your workflow preferences in minutes`,
    },
    {
      heading: `Import & Organize`,
      description: `Upload your transactions and documents or start fresh with our templates`,
    },
    {
      heading: `Automate & Collaborate`,
      description: `Let our system handle routine tasks while you collaborate seamlessly with stakeholders`,
    },
    {
      heading: `Track & Optimize`,
      description: `Monitor progress, get insights and continuously improve your process`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Drowning in paperwork and manual tasks`,
    },
    {
      emoji: `😤`,
      title: `Missing deadlines and compliance requirements`,
    },
    {
      emoji: `😩`,
      title: `Constant back-and-forth communication`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your Real Estate Transactions from Chaos to Clarity`}
        subtitle={`Join thousands of real estate professionals who save 13+ hours per transaction with our all-in-one platform`}
        buttonText={`Start Your Free Trial`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/sY8dWH-retransations-Ufkv`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={5000}
            suffixText={`from happy real estate professionals`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Industry Leaders`} />
      <LandingPainPoints
        title={`68% of Real Estate Professionals Waste Hours on Transaction Admin - Are You One of Them?`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Path to Effortless Transaction Management`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Close Deals Faster`}
        subtitle={`Powerful tools designed to save you time and grow your business`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Thousands of Successful Agents`}
        subtitle={`See how they transformed their business with our platform`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your Success`}
        subtitle={`Choose the perfect plan for your business`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions`}
        subtitle={`Everything you need to know about getting started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Transaction Management?`}
        subtitle={`Join thousands of successful agents and start closing deals faster today`}
        buttonText={`Start Your Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
