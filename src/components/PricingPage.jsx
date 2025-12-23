import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PricingPage = ({ onNavigate, currentUser }) => {
    const plans = [
        {
            name: 'Basic',
            price: '0',
            features: ['3 Job Applications/mo', 'Public Events Access', 'Basic Profile', 'Weekly Newsletter'],
            button: 'Get Started',
            highlight: false
        },
        {
            name: 'Pro',
            price: '29',
            features: ['Unlimited Applications', 'Priority Event Booking', 'Featured Profile', 'Direct Messaging'],
            button: 'Go Pro',
            highlight: true
        },
        {
            name: 'Enterprise',
            price: '99',
            features: ['Team Recruitment Tools', 'Custom Analytics', 'Dedicated Manager', 'API Access'],
            button: 'Contact Sales',
            highlight: false
        }
    ];

    const faqs = [
        { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time from your account settings.' },
        { q: 'Is there a free trial for Pro?', a: 'We offer a 14-day free trial for all new Pro members.' },
        { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and Apple Pay.' }
    ];

    return (
        <div className="pricing-page">
            <Navbar onNavigate={onNavigate} currentView="pricing" currentUser={currentUser} />

            <section className="pricing-hero">
                <div className="hero-content">
                    <h1 className="anim-scale">Simple, <span className="highlight-text">Transparent</span> Pricing</h1>
                    <p className="anim-up">Choose the plan that fits your career goals. No hidden fees.</p>
                </div>
            </section>

            <section className="pricing-plans">
                <div className="plans-grid">
                    {plans.map((plan, index) => (
                        <div key={index} className={`plan-card ${plan.highlight ? 'plan-highlight' : ''} anim-up`} style={{ animationDelay: `${index * 150}ms` }}>
                            {plan.highlight && <div className="popular-badge">Most Popular</div>}
                            <h3>{plan.name}</h3>
                            <div className="price">
                                <span className="currency">र</span>
                                <span className="amount">{plan.price}</span>
                                <span className="period">/mo</span>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex}>✅ {feature}</li>
                                ))}
                            </ul>
                            <button className={`plan-btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}>
                                {plan.button}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="pricing-faq">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div className="faq-grid">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item anim-up">
                            <h4>{faq.q}</h4>
                            <p>{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default PricingPage;
