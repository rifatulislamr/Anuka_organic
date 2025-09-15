// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import {
//   Star,
//   Zap,
//   Shield,
//   TrendingUp,
//   Users,
//   Database,
//   BarChart3,
//   Settings,
//   Smartphone,
//   Monitor,
//   Laptop,
//   CheckCircle,
//   ArrowRight,
//   Play,
// } from 'lucide-react'

// export default function Home() {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     setIsVisible(true)
//   }, [])

//   return (
//     <div className="relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
//       </div>

//       {/* Hero Section */}
//       <section
//         id="home"
//         className="min-h-screen relative pt-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50"
//       >
//         <div className="max-w-7xl mx-auto py-20">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div
//               className={`space-y-8 ${isVisible ? 'animate-in slide-in-from-left duration-1000' : 'opacity-0'}`}
//             >
//               <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-sm font-medium text-gray-700 border border-yellow-200">
//                 <Zap className="w-4 h-4 mr-2 text-yellow-600" />
//                 #1 Asset Management Platform
//               </div>

//               <h1 className="text-5xl md:text-7xl font-bold leading-tight">
//                 <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
//                   Asset
//                 </span>
//                 <br />
//                 <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
//                   Management
//                 </span>
//                 <br />
//                 <span className="text-gray-900">Redefined</span>
//               </h1>

//               <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
//                 Transform your enterprise with intelligent asset tracking,
//                 predictive maintenance, and real-time analytics. Experience the
//                 future of ERP today.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
//                   Start Free Trial
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="border-2 border-gray-300 hover:border-gray-400 px-8 py-6 text-lg rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
//                 >
//                   <Play className="mr-2 w-5 h-5" />
//                   Watch Demo
//                 </Button>
//               </div>

//               <div className="flex items-center space-x-8 pt-4">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">10K+</div>
//                   <div className="text-sm text-gray-600">Active Users</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">99.9%</div>
//                   <div className="text-sm text-gray-600">Uptime</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-gray-900">50M+</div>
//                   <div className="text-sm text-gray-600">Assets Tracked</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Content - Dashboard Preview */}
//             <div
//               className={`relative ${isVisible ? 'animate-in slide-in-from-right duration-1000' : 'opacity-0'}`}
//             >
//               <div className="relative">
//                 {/* Floating Cards */}
//                 <div className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-bounce z-10">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
//                       <TrendingUp className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-600">Asset Value</div>
//                       <div className="text-xl font-bold text-gray-900">
//                         $2.4M
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-bounce delay-1000 z-10">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-cyan-500 rounded-xl flex items-center justify-center">
//                       <BarChart3 className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-600">Efficiency</div>
//                       <div className="text-xl font-bold text-gray-900">
//                         +127%
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Main Dashboard */}
//                 <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-200">
//                   <div className="space-y-6">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         Asset Overview
//                       </h3>
//                       <div className="flex space-x-2">
//                         <div className="w-3 h-3 bg-red-400 rounded-full"></div>
//                         <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
//                         <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//                       </div>
//                     </div>

//                     {/* Chart Placeholder */}
//                     <div className="h-40 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl flex items-end justify-around p-4">
//                       {[40, 70, 30, 90, 60, 80, 50].map((height, i) => (
//                         <div
//                           key={i}
//                           className="bg-gradient-to-t from-yellow-500 to-orange-400 rounded-t-lg animate-pulse"
//                           style={{
//                             height: `${height}%`,
//                             width: '12%',
//                             animationDelay: `${i * 200}ms`,
//                           }}
//                         ></div>
//                       ))}
//                     </div>

//                     {/* Metrics */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-gray-50 rounded-xl p-4">
//                         <div className="text-2xl font-bold text-gray-900">
//                           1,247
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           Active Assets
//                         </div>
//                       </div>
//                       <div className="bg-gray-50 rounded-xl p-4">
//                         <div className="text-2xl font-bold text-gray-900">
//                           98.2%
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           Availability
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section
//         id="features"
//         className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
//                 Powerful Features
//               </span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Everything you need to manage your enterprise assets efficiently
//               and effectively
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: Database,
//                 title: 'Real-time Tracking',
//                 desc: 'Monitor all your assets in real-time with IoT integration and GPS tracking',
//               },
//               {
//                 icon: BarChart3,
//                 title: 'Advanced Analytics',
//                 desc: 'Get deep insights with AI-powered analytics and predictive maintenance',
//               },
//               {
//                 icon: Shield,
//                 title: 'Enterprise Security',
//                 desc: 'Bank-grade security with end-to-end encryption and compliance',
//               },
//               {
//                 icon: Settings,
//                 title: 'Automated Workflows',
//                 desc: 'Streamline operations with intelligent automation and custom workflows',
//               },
//               {
//                 icon: Users,
//                 title: 'Team Collaboration',
//                 desc: 'Enable seamless collaboration across departments and locations',
//               },
//               {
//                 icon: TrendingUp,
//                 title: 'Performance Optimization',
//                 desc: 'Maximize asset utilization with intelligent recommendations',
//               },
//             ].map((feature, i) => (
//               <div
//                 key={i}
//                 className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-400/50 transition-all duration-500 hover:transform hover:scale-105"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                   <feature.icon className="w-8 h-8 text-gray-900" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-white">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Apps Section */}
//       <section
//         id="apps"
//         className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
//               Access{' '}
//               <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
//                 Anywhere
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Manage your assets from any device, anywhere in the world
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: Smartphone,
//                 title: 'Mobile App',
//                 desc: 'iOS & Android apps with offline capabilities',
//                 color: 'from-yellow-500 to-cyan-500',
//               },
//               {
//                 icon: Monitor,
//                 title: 'Web Platform',
//                 desc: 'Full-featured web application accessible from any browser',
//                 color: 'from-purple-500 to-pink-500',
//               },
//               {
//                 icon: Laptop,
//                 title: 'Desktop Suite',
//                 desc: 'Native desktop applications for Windows and macOS',
//                 color: 'from-green-500 to-emerald-500',
//               },
//             ].map((app, i) => (
//               <div
//                 key={i}
//                 className="group text-center transform hover:scale-105 transition-all duration-500"
//               >
//                 <div
//                   className={`w-24 h-24 bg-gradient-to-r ${app.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl group-hover:rotate-3 transition-all duration-500`}
//                 >
//                   <app.icon className="w-12 h-12 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3 text-gray-900">
//                   {app.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">{app.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section
//         id="benefits"
//         className="py-24 px-4 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div>
//               <h2 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
//                 Why Choose{' '}
//                 <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
//                   Asset Tiger?
//                 </span>
//               </h2>

//               <div className="space-y-6">
//                 {[
//                   {
//                     title: 'Reduce Costs by 40%',
//                     desc: 'Optimize asset utilization and prevent unnecessary purchases',
//                   },
//                   {
//                     title: 'Improve Efficiency by 60%',
//                     desc: 'Automate workflows and eliminate manual processes',
//                   },
//                   {
//                     title: 'Increase Compliance by 95%',
//                     desc: 'Stay compliant with automated reporting and audits',
//                   },
//                   {
//                     title: 'Enhance Visibility by 100%',
//                     desc: 'Get complete visibility into your asset lifecycle',
//                   },
//                 ].map((benefit, i) => (
//                   <div key={i} className="flex items-start space-x-4 group">
//                     <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
//                       <CheckCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-2">
//                         {benefit.title}
//                       </h3>
//                       <p className="text-gray-600">{benefit.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="relative">
//               <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
//                 <div className="text-center space-y-6">
//                   <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto">
//                     <TrendingUp className="w-10 h-10 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900">
//                     ROI Calculator
//                   </h3>
//                   <div className="bg-gray-50 rounded-2xl p-6">
//                     <div className="text-4xl font-bold text-gray-900 mb-2">
//                       $2.4M
//                     </div>
//                     <div className="text-gray-600">
//                       Potential Annual Savings
//                     </div>
//                   </div>
//                   <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 rounded-xl">
//                     Calculate Your ROI
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Reviews Section */}
//       <section
//         id="reviews"
//         className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
//               Trusted by{' '}
//               <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
//                 Industry Leaders
//               </span>
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 name: 'Sarah Johnson',
//                 role: 'Operations Director',
//                 company: 'TechCorp Industries',
//                 content:
//                   "Asset Tiger transformed our asset management completely. We've seen a 40% reduction in operational costs and improved efficiency across all departments.",
//                 rating: 5,
//               },
//               {
//                 name: 'Michael Chen',
//                 role: 'IT Manager',
//                 company: 'Global Manufacturing Co.',
//                 content:
//                   'The real-time tracking and predictive maintenance features have been game-changers for our operations. Highly recommend Asset Tiger.',
//                 rating: 5,
//               },
//               {
//                 name: 'Emily Rodriguez',
//                 role: 'Facility Manager',
//                 company: 'Metro Healthcare',
//                 content:
//                   'Outstanding platform with exceptional support. The ROI was evident within the first quarter of implementation.',
//                 rating: 5,
//               },
//             ].map((review, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
//               >
//                 <div className="flex items-center space-x-1 mb-4">
//                   {[...Array(review.rating)].map((_, j) => (
//                     <Star
//                       key={j}
//                       className="w-5 h-5 text-yellow-400 fill-current"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mb-6 leading-relaxed">
//                   {review.content}
//                 </p>
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">
//                       {review.name.charAt(0)}
//                     </span>
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">
//                       {review.name}
//                     </div>
//                     <div className="text-sm text-gray-600">{review.role}</div>
//                     <div className="text-sm text-gray-500">
//                       {review.company}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 px-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
//             Ready to Transform Your Asset Management?
//           </h2>
//           <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//             Join thousands of companies already using Asset Tiger to optimize
//             their operations and reduce costs.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-2xl shadow-xl font-semibold transform hover:scale-105 transition-all duration-300">
//               Start Your Free Trial
//               <ArrowRight className="ml-2 w-5 h-5" />
//             </Button>
//             <Button
//               variant="outline"
//               className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl font-semibold"
//             >
//               Schedule Demo
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section
//         id="contact"
//         className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16">
//             <div>
//               <h2 className="text-4xl md:text-6xl font-bold mb-8">
//                 <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
//                   Get in Touch
//                 </span>
//               </h2>
//               <p className="text-xl text-gray-300 mb-8 leading-relaxed">
//                 Ready to revolutionize your asset management? Our team is here
//                 to help you get started.
//               </p>

//               <div className="space-y-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
//                     <span className="text-gray-900 font-bold">📧</span>
//                   </div>
//                   <div>
//                     <div className="font-semibold">Email</div>
//                     <div className="text-gray-400">hello@assettiger.com</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
//                     <span className="text-gray-900 font-bold">📞</span>
//                   </div>
//                   <div>
//                     <div className="font-semibold">Phone</div>
//                     <div className="text-gray-400">+1 (555) 123-TIGER</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
//                     <span className="text-gray-900 font-bold">📍</span>
//                   </div>
//                   <div>
//                     <div className="font-semibold">Address</div>
//                     <div className="text-gray-400">
//                       123 Innovation Drive
//                       <br />
//                       Tech Valley, CA 94025
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
//               <form className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
//                       placeholder="John"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
//                       placeholder="Doe"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
//                     placeholder="john@company.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Company
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
//                     placeholder="Your Company"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     rows={4}
//                     className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
//                     placeholder="Tell us about your asset management needs..."
//                   ></textarea>
//                 </div>
//                 <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300">
//                   Send Message
//                   <ArrowRight className="ml-2 w-5 h-5" />
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section
//         id="faqs"
//         className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white"
//       >
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
//               Frequently Asked{' '}
//               <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
//                 Questions
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600">
//               Everything you need to know about Asset Tiger
//             </p>
//           </div>

//           <div className="space-y-6">
//             {[
//               {
//                 question: 'How quickly can we implement Asset Tiger?',
//                 answer:
//                   'Most organizations are up and running within 2-4 weeks. Our dedicated onboarding team ensures a smooth transition with minimal disruption to your operations.',
//               },
//               {
//                 question:
//                   'Can Asset Tiger integrate with our existing systems?',
//                 answer:
//                   'Yes! Asset Tiger offers robust APIs and pre-built integrations with popular ERP, CMMS, and accounting systems. Our integration team can help with custom connections.',
//               },
//               {
//                 question: 'What kind of support do you provide?',
//                 answer:
//                   'We offer comprehensive support including 24/7 technical assistance, dedicated account managers for Enterprise clients, extensive documentation, and regular training sessions.',
//               },
//               {
//                 question: 'Is my data secure with Asset Tiger?',
//                 answer:
//                   'Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and follow industry best practices for data security. Your data is hosted in secure, redundant data centers.',
//               },
//               {
//                 question: 'Can I try Asset Tiger before purchasing?',
//                 answer:
//                   'Yes! We offer a 14-day free trial with full access to all features. No credit card required. Our team can also provide a personalized demo tailored to your needs.',
//               },
//             ].map((faq, i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300"
//               >
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                   <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                     <span className="text-white font-bold text-sm">Q</span>
//                   </div>
//                   {faq.question}
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed ml-12">
//                   {faq.answer}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <p className="text-gray-600 mb-6">Still have questions?</p>
//             <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold">
//               Contact Our Experts
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
      
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Search,
  ShoppingCart,
  User,
  Star,
  Plus,
  Minus,
  X,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  inStock: boolean
}

interface CartItem extends Product {
  quantity: number
}

export default function AnukaOrganicHome() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample products data
  const products: Product[] = [
    // Poultry & Meat
    {
      id: 1,
      name: "Fresh Chicken Breast",
      price: 450,
      originalPrice: 500,
      image: "/fresh-chicken-breast.jpg",
      category: "Poultry & Meat",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 2,
      name: "Mutton Curry Cut",
      price: 850,
      image: "/mutton-curry-cut.jpg",
      category: "Poultry & Meat",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 3,
      name: "Fish Fillet",
      price: 380,
      image: "/pan-seared-fish-fillet.png",
      category: "Poultry & Meat",
      rating: 4.3,
      inStock: true,
    },
    {
      id: 4,
      name: "Prawns Large",
      price: 650,
      image: "/large-prawns.jpg",
      category: "Poultry & Meat",
      rating: 4.6,
      inStock: true,
    },

    // New Arrivals
    {
      id: 5,
      name: "Organic Quinoa",
      price: 320,
      image: "/organic-quinoa.jpg",
      category: "New Arrivals",
      rating: 4.4,
      inStock: true,
    },
    {
      id: 6,
      name: "Almond Butter",
      price: 480,
      image: "/almond-butter-jar.png",
      category: "New Arrivals",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 7,
      name: "Coconut Oil",
      price: 280,
      image: "/coconut-oil-bottle.png",
      category: "New Arrivals",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 8,
      name: "Green Tea",
      price: 180,
      image: "/green-tea-box.png",
      category: "New Arrivals",
      rating: 4.2,
      inStock: true,
    },

    // Best Selling
    {
      id: 9,
      name: "Basmati Rice 5kg",
      price: 420,
      image: "/basmati-rice-bag.jpg",
      category: "Best Selling",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 10,
      name: "Ghee Pure",
      price: 680,
      image: "/pure-ghee-jar.jpg",
      category: "Best Selling",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 11,
      name: "Turmeric Powder",
      price: 120,
      image: "/turmeric-powder.png",
      category: "Best Selling",
      rating: 4.6,
      inStock: true,
    },
    {
      id: 12,
      name: "Red Chili Powder",
      price: 150,
      image: "/red-chili-powder.jpg",
      category: "Best Selling",
      rating: 4.7,
      inStock: true,
    },

    // Daily Needs
    {
      id: 13,
      name: "Fresh Milk 1L",
      price: 65,
      image: "/fresh-milk-bottle.jpg",
      category: "Daily Needs",
      rating: 4.3,
      inStock: true,
    },
    {
      id: 14,
      name: "Brown Bread",
      price: 45,
      image: "/brown-bread-loaf.jpg",
      category: "Daily Needs",
      rating: 4.1,
      inStock: true,
    },
    {
      id: 15,
      name: "Farm Eggs 12pcs",
      price: 85,
      image: "/farm-fresh-eggs.png",
      category: "Daily Needs",
      rating: 4.4,
      inStock: true,
    },
    {
      id: 16,
      name: "Yogurt 500g",
      price: 55,
      image: "/fresh-yogurt.jpg",
      category: "Daily Needs",
      rating: 4.2,
      inStock: true,
    },

    // Signature Series
    {
      id: 17,
      name: "Anuka Special Masala",
      price: 280,
      image: "/special-masala-blend.jpg",
      category: "Signature Series",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 18,
      name: "Premium Tea Blend",
      price: 350,
      image: "/premium-tea-blend.jpg",
      category: "Signature Series",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 19,
      name: "Artisan Honey",
      price: 420,
      image: "/artisan-honey-jar.jpg",
      category: "Signature Series",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 20,
      name: "Organic Jaggery",
      price: 180,
      image: "/organic-jaggery.jpg",
      category: "Signature Series",
      rating: 4.6,
      inStock: true,
    },

    // Pickles & Chutney
    {
      id: 21,
      name: "Mango Pickle",
      price: 220,
      image: "/mango-pickle-jar.png",
      category: "Pickles & Chutney",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 22,
      name: "Mint Chutney",
      price: 180,
      image: "/mint-chutney.jpg",
      category: "Pickles & Chutney",
      rating: 4.3,
      inStock: true,
    },
    {
      id: 23,
      name: "Garlic Pickle",
      price: 200,
      image: "/garlic-pickle.jpg",
      category: "Pickles & Chutney",
      rating: 4.4,
      inStock: true,
    },
    {
      id: 24,
      name: "Tamarind Chutney",
      price: 160,
      image: "/tamarind-chutney.jpg",
      category: "Pickles & Chutney",
      rating: 4.2,
      inStock: true,
    },
  ]

  const categories = [
    "Poultry & Meat",
    "New Arrivals",
    "Best Selling",
    "Daily Needs",
    "Signature Series",
    "Pickles & Chutney",
  ]

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image 
              height={48}
              width={48}
               src="/anuka-logo.png" alt="Anuka Organic Logo" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-700">Anuka</span>
                <span className="text-sm font-medium text-green-600 -mt-1">ORGANIC</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for organic products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-green-600">
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-600 hover:text-green-600"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-gray-700 hover:text-green-600 whitespace-nowrap text-sm font-medium transition-colors"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">100% Natural & Organic</h1>
            <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
              Discover the finest selection of organic spices, natural products, and healthy foods delivered fresh to
              your doorstep.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">Shop Organic Now</Button>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {categories.map((category) => (
          <section key={category} id={category.toLowerCase().replace(/\s+/g, "-")} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
              <Button
                variant="outline"
                className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white bg-transparent"
              >
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <Image
                        height={300}
                        width={300}
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <Button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                      <Image
                        height={64}
                        width={64}
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-green-600 font-semibold">₹{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-green-600">₹{getTotalPrice()}</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Proceed to Checkout</Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-4">
                <Image 
                height={40}
                width={40}
                 src="/anuka-logo.png" alt="Anuka Organic Logo" className="w-10 h-10 object-contain" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-green-700">Anuka</span>
                  <span className="text-xs font-medium text-green-600 -mt-1">ORGANIC</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Your trusted partner for 100% natural and organic products delivered fresh to your doorstep.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 text-gray-600 hover:text-green-600 bg-transparent"
                >
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-green-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-600">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-green-600">
                    Fresh Produce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-600">
                    Dairy Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-600">
                    Meat & Poultry
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-600">
                    Spices & Condiments
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Organic Street, City, State 12345</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@anukaorganic.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Anuka Organic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
