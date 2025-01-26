"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    { question: "What is your return policy?", answer: "We offer a 30-day return policy for all unused items in their original packaging." },
    { question: "How long does shipping take?", answer: "Shipping typically takes 3-5 business days for domestic orders and 7-14 days for international orders." },
    { question: "Do you offer international shipping?", answer: "Yes, we ship to most countries worldwide. Shipping costs and times may vary." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and Apple Pay." },
    { question: "How can I track my order?", answer: "Once your order ships, you'll receive a tracking number via email." },
    { question: "Do you offer gift wrapping?", answer: "Yes, we offer gift wrapping for a small additional fee." },
    { question: "What is your warranty policy?", answer: "We offer a 1-year warranty on all our products against manufacturing defects." },
    { question: "How do I contact customer service?", answer: "You can reach our customer service team via email, phone, or live chat on our website." },
    { question: "Do you have a loyalty program?", answer: "Yes, we have a rewards program where you earn points on every purchase." },
    { question: "Can I cancel my order?", answer: "Orders can be cancelled within 24 hours of placement. After that, they enter processing." },
    // ... rest of the FAQ data
];

const FaqSection: React.FC = () => {
    const [visibleQuestions, setVisibleQuestions] = useState(6);
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

    const handleShowMore = () => {
        setVisibleQuestions(prev => Math.min(prev + 6, faqData.length));
    };

    const handleToggleAnswer = (index: number) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    return (
        <section className="relative min-h-screen py-20 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
            {/* Animated background effects */}
            <div className="absolute inset-0">
                <div className="absolute w-[500px] h-[500px] -left-64 -top-64 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute w-[500px] h-[500px] -right-64 -bottom-64 bg-orange-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-blue-200/80">
                        Find answers to common questions about our services
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {faqData.slice(0, visibleQuestions).map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                            <div className="relative bg-gradient-to-br from-blue-900/40 to-transparent backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden">
                                <button
                                    className="w-full p-6 flex items-center justify-between text-left"
                                    onClick={() => handleToggleAnswer(index)}
                                >
                                    <span className="text-lg font-semibold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pr-4">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: expandedQuestion === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <HelpCircle className="w-6 h-6 text-blue-400" />
                                    </motion.div>
                                </button>
                                
                                <AnimatePresence>
                                    {expandedQuestion === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="text-blue-200/80 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {visibleQuestions < faqData.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <button
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-full font-bold
                                     text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20
                                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            onClick={handleShowMore}
                        >
                            Load More Questions
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FaqSection;