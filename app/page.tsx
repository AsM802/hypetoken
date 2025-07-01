"""'use client';

import Link from 'next/link';
import {
  TrendingUp,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="max-w-6xl w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero */}
          <motion.div
            className="text-center space-y-8 mb-16"
            variants={itemVariants}
          >
            <Badge
              variant="secondary"
              className="bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Real-time crypto intelligence
            </Badge>

            <motion.h1
              className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-400 bg-clip-text text-transparent leading-tight"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              HYPE
              <br />
              <span className="text-4xl md:text-6xl font-light">
                Token Tracker
              </span>
            </motion.h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of crypto trading with AI-powered analytics,
              real-time insights, and lightning-fast execution
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/login">
                <Button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 border-0">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Trading
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-gray-600 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-16"
            variants={containerVariants}
          >
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Real-Time Analytics',
                description:
                  'Advanced market analysis with millisecond precision',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Lightning Fast',
                description:
                  'Execute trades at the speed of light with our optimized engine',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Bank-Grade Security',
                description: 'Your assets protected by military-grade encryption',
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className="group relative bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-purple-500/50"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl text-white">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 rounded-lg transition-all duration-500" />
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="text-center space-y-8"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white">
              Trusted by thousands of traders
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '$2.5B+', label: 'Volume Traded' },
                { value: '50K+', label: 'Active Users' },
                { value: '99.9%', label: 'Uptime' },
                { value: '<1ms', label: 'Latency' },
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            className="text-center mt-16 pt-16 border-t border-white/10"
            variants={itemVariants}
          >
            <p className="text-gray-400 mb-6">Ready to revolutionize your trading?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-white/10 transition-all duration-300 bg-transparent"
                >
                  Register
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}""