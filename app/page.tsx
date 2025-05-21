"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Droplets, Gamepad2, Home, Sparkles } from "lucide-react";

export default function LandingPage() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [positions, setPositions] = useState<{ top: string; left: string }[]>(
		[]
	);

	// Bubble animation effect
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const bubbles: {
			x: number;
			y: number;
			radius: number;
			speed: number;
			opacity: number;
			hue: number;
		}[] = [];

		for (let i = 0; i < 50; i++) {
			bubbles.push({
				x: Math.random() * canvas.width,
				y: canvas.height + Math.random() * 100,
				radius: Math.random() * 8 + 2,
				speed: Math.random() * 2 + 0.5,
				opacity: Math.random() * 0.5 + 0.1,
				hue: Math.random() * 60 + 180, // Blue to purple hues
			});
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			bubbles.forEach((bubble) => {
				ctx.beginPath();
				const gradient = ctx.createRadialGradient(
					bubble.x,
					bubble.y,
					0,
					bubble.x,
					bubble.y,
					bubble.radius
				);
				gradient.addColorStop(
					0,
					`hsla(${bubble.hue}, 100%, 70%, ${bubble.opacity})`
				);
				gradient.addColorStop(
					0.8,
					`hsla(${bubble.hue}, 100%, 50%, ${bubble.opacity * 0.6})`
				);
				gradient.addColorStop(1, `hsla(${bubble.hue}, 100%, 50%, 0)`);

				ctx.fillStyle = gradient;
				ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
				ctx.fill();

				bubble.y -= bubble.speed;

				// Reset bubble when it goes off screen
				if (bubble.y < -bubble.radius * 2) {
					bubble.y = canvas.height + bubble.radius;
					bubble.x = Math.random() * canvas.width;
				}
			});

			requestAnimationFrame(animate);
		};

		animate();

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		setPositions(
			Array.from({ length: 8 }, () => ({
				top: `${Math.random() * 100}%`,
				left: `${Math.random() * 100}%`,
			}))
		);
	}, []);

	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a0a2e] via-[#0f1a3a] to-[#0a2a4a] text-white font-poppins">
			{/* Bubble animation canvas */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full pointer-events-none z-0"
			/>

			{/* Glassmorphic overlay for depth */}
			<div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

			{/* Header */}
			<header className="relative z-10">
				<div className="container mx-auto px-4 py-6">
					<nav className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Droplets className="h-8 w-8 text-[#5eead4]" />
							<span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5eead4] to-[#8b5cf6]">
								DolphinBay
							</span>
						</div>

						<div className="hidden md:flex items-center gap-8">
							{["Home", "Features", "Games", "Community"].map(
								(item) => (
									<Link
										key={item}
										href={`#${item.toLowerCase()}`}
										className="text-[#e0f2fe] hover:text-[#5eead4] transition-colors relative group"
									>
										{item}
										<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#5eead4] to-[#8b5cf6] transition-all duration-300 group-hover:w-full"></span>
									</Link>
								)
							)}
						</div>

						<Button className="relative overflow-hidden bg-gradient-to-r from-[#5eead4] to-[#8b5cf6] text-white border-none rounded-full px-6 py-2 font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(94,234,212,0.5)] group">
							<span className="relative z-10">Coming Soon</span>
							<span className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#5eead4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
						</Button>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section id="home" className="relative z-10 pt-20 pb-32">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="space-y-4"
							>
								<div className="inline-block px-4 py-1 rounded-full bg-[rgba(94,234,212,0.1)] border border-[rgba(94,234,212,0.2)] backdrop-blur-sm">
									<span className="text-[#5eead4] text-sm font-medium flex items-center gap-2">
										<Sparkles className="h-4 w-4" />
										Web3 Gaming Reimagined
									</span>
								</div>
								<h1 className="text-4xl md:text-6xl font-bold leading-tight">
									<span className="block">
										Blockchain Has
									</span>
									<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5eead4] via-[#f472b6] to-[#8b5cf6]">
										Never Been This Easy
									</span>
								</h1>
								<p className="text-[#e0f2fe] text-lg md:text-xl max-w-lg">
									Dive into a world where blockchain gaming
									feels like play, not work. No complicated
									wallets or confusing terms.
								</p>
							</motion.div>

							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									className="relative overflow-hidden bg-gradient-to-r from-[#5eead4] to-[#8b5cf6] text-white border-none rounded-full px-8 py-6 font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(94,234,212,0.6)] group"
									onClick={() =>
										(window.location.href =
											"https://dolphin-protocol.github.io/Autonomous-World/")
									}
								>
									<span className="relative z-10">
										Start Playing
									</span>
									<span className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#5eead4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
									{/* Ripple effect on hover */}
									<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-white opacity-30 group-hover:w-[300%] group-hover:h-[300%] transition-all duration-700"></span>
								</Button>
								<Button
									variant="outline"
									className="relative overflow-hidden border-[#5eead4] text-[#5eead4] rounded-full px-8 py-6 font-medium transition-all duration-300 hover:bg-[rgba(94,234,212,0.1)] hover:shadow-[0_0_15px_rgba(94,234,212,0.3)]"
									onClick={() =>
										(window.location.href =
											"https://www.youtube.com/watch?v=z7TajsiJ8yE")
									}
								>
									Watch Demo
								</Button>
							</div>

							<div className="flex items-center gap-4 text-sm text-[#e0f2fe]">
								<div className="flex -space-x-2">
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="w-8 h-8 rounded-full bg-gradient-to-r from-[#5eead4] to-[#8b5cf6] p-0.5"
										>
											<div className="w-full h-full rounded-full bg-[#0f1a3a] flex items-center justify-center text-xs font-bold">
												{i}
											</div>
										</div>
									))}
								</div>
								<span>
									+2,500 players already enjoying DolphinBay
								</span>
							</div>
						</div>

						<div className="relative">
							<div className="absolute -inset-4 bg-gradient-to-r from-[rgba(94,234,212,0.2)] to-[rgba(139,92,246,0.2)] rounded-full blur-3xl opacity-30 animate-pulse"></div>
							<div className="relative bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl p-2 border border-[rgba(255,255,255,0.1)]">
								<Image
									src="/home.png"
									width={600}
									height={600}
									alt="Dolphin swimming through a glowing portal"
									className="w-full h-auto rounded-xl"
								/>
								{/* Holographic overlay effect */}
								<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(94,234,212,0.1)] to-[rgba(139,92,246,0.1)] rounded-xl mix-blend-overlay"></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Problem Section */}
			<section className="relative z-10 py-20 bg-[rgba(10,10,46,0.7)]">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							Web3 Shouldn't Be
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f472b6] to-[#8b5cf6]">
								{" "}
								Rocket Science
							</span>
						</h2>
						<p className="text-[#e0f2fe] text-lg">
							Most blockchain games are filled with confusing
							jargon and complicated onboarding.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="order-2 lg:order-1">
							<div className="relative bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.1)]">
								<Image
									src="/problem.png"
									width={500}
									height={500}
									alt="Confused Web2 user surrounded by buzzwords"
									className="w-full h-auto rounded-xl"
								/>
							</div>
						</div>

						<div className="order-1 lg:order-2 space-y-6">
							<h3 className="text-2xl md:text-3xl font-bold">
								The Problem with{" "}
								<span className="text-[#f472b6]">
									Traditional Web3
								</span>
							</h3>

							{[
								{
									title: "Confusing Terminology",
									desc: "ZK proofs, gas fees, private keys... it's like learning a new language just to play a game.",
								},
								{
									title: "Complex Onboarding",
									desc: "Multiple wallets, browser extensions, and security steps before you can even start playing.",
								},
								{
									title: "Poor User Experience",
									desc: "Clunky interfaces designed for crypto experts, not casual gamers looking for fun.",
								},
							].map((item, i) => (
								<div
									key={i}
									className="bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-xl p-6 border border-[rgba(255,255,255,0.05)]"
								>
									<h4 className="text-xl font-semibold mb-2 text-[#f472b6]">
										{item.title}
									</h4>
									<p className="text-[#e0f2fe]">
										{item.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Solution Section */}
			<section id="features" className="relative z-10 py-20">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							Welcome to
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5eead4] to-[#8b5cf6]">
								{" "}
								Dolphin Bay
							</span>
						</h2>
						<p className="text-[#e0f2fe] text-lg">
							Where blockchain gaming is as easy as playing your
							favorite Nintendo game.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<h3 className="text-2xl md:text-3xl font-bold">
								The{" "}
								<span className="text-[#5eead4]">
									DolphinBay
								</span>{" "}
								Solution
							</h3>

							{[
								{
									icon: (
										<Gamepad2 className="h-10 w-10 text-[#5eead4]" />
									),
									title: "Play First, Crypto Later",
									desc: "Start playing immediately. No wallet setup required. We handle the complicated stuff behind the scenes.",
								},
								{
									icon: (
										<Sparkles className="h-10 w-10 text-[#8b5cf6]" />
									),
									title: "Learn Through Fun",
									desc: "Daily mini-games teach you blockchain concepts while you earn rewards and have fun.",
								},
								{
									icon: (
										<Home className="h-10 w-10 text-[#f472b6]" />
									),
									title: "Build Your Virtual Empire",
									desc: "Collect properties, upgrade them, and earn passive income in our Monopoly-inspired game world.",
								},
							].map((item, i) => (
								<div
									key={i}
									className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl p-6 border border-[rgba(255,255,255,0.05)] transition-all duration-300 hover:border-[rgba(94,234,212,0.3)] hover:shadow-[0_0_15px_rgba(94,234,212,0.2)]"
								>
									<div className="flex items-start gap-4">
										<div className="bg-[rgba(255,255,255,0.03)] p-3 rounded-lg">
											{item.icon}
										</div>
										<div>
											<h4 className="text-xl font-semibold mb-2 text-white">
												{item.title}
											</h4>
											<p className="text-[#e0f2fe]">
												{item.desc}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="relative">
							<div className="absolute -inset-4 bg-gradient-to-r from-[rgba(94,234,212,0.2)] to-[rgba(139,92,246,0.2)] rounded-full blur-3xl opacity-30 animate-pulse"></div>
							<div className="relative bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-2xl p-2 border border-[rgba(255,255,255,0.1)]">
								<Image
									src="/solution.png"
									width={600}
									height={600}
									alt="Underwater Dolphin Bay showing a fun, simple UI"
									className="w-full h-auto rounded-xl"
								/>
								{/* Holographic overlay effect */}
								<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(94,234,212,0.1)] to-[rgba(139,92,246,0.1)] rounded-xl mix-blend-overlay"></div>

								{/* Floating UI elements */}
								<div className="absolute top-[20%] left-[10%] bg-[rgba(94,234,212,0.2)] backdrop-blur-md rounded-xl p-3 border border-[rgba(94,234,212,0.3)] animate-float">
									<div className="p-2 bg-[rgba(255,255,255,0.2)] rounded-md">
										<Gamepad2 className="text-[#5eead4]" />
									</div>
								</div>
								<div className="absolute bottom-[30%] right-[15%] bg-[rgba(139,92,246,0.2)] backdrop-blur-md rounded-xl p-3 border border-[rgba(139,92,246,0.3)] animate-float-delay">
									<div className="p-2 bg-[rgba(255,255,255,0.2)] rounded-md">
										<Sparkles className="text-[#8b5cf6]" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Feature Section */}
			<section
				id="game"
				className="relative z-10 py-20 bg-[rgba(10,10,46,0.7)]"
			>
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5eead4] via-[#f472b6] to-[#8b5cf6]">
								Monopoly-Inspired Game
							</span>
						</h2>
						<p className="text-[#e0f2fe] text-lg">
							A Monopoly-inspired game where you roll dice,
							collect properties, and earn $DOL tokens.
						</p>
					</div>

					<div className="relative">
						<div className="absolute -inset-4 bg-gradient-to-r from-[rgba(94,234,212,0.1)] to-[rgba(139,92,246,0.1)] rounded-3xl blur-3xl opacity-30"></div>

						<div className="relative bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-6 border border-[rgba(255,255,255,0.05)]">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
								<div className="col-span-2">
									<Image
										src="/monopoly.png"
										width={800}
										height={600}
										alt="Dolphin Property game board"
										className="w-full h-auto rounded-xl"
									/>

									{/* Animated token flows */}
									<div className="absolute top-1/4 left-1/3 w-16 h-16">
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-8 h-8 rounded-full bg-[#5eead4] opacity-70 animate-ping"></div>
										</div>
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-6 h-6 rounded-full bg-[#5eead4] flex items-center justify-center text-xs font-bold">
												$DOL
											</div>
										</div>
									</div>

									<div className="absolute bottom-1/3 left-1/3 w-16 h-16">
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-8 h-8 rounded-full bg-[#f472b6] opacity-70 animate-ping animation-delay-500"></div>
										</div>
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-6 h-6 rounded-full bg-[#f472b6] flex items-center justify-center text-xs font-bold">
												$DOL
											</div>
										</div>
									</div>
								</div>

								<div className="space-y-6">
									<div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl p-6 border border-[rgba(255,255,255,0.05)] transition-all duration-300 hover:border-[rgba(94,234,212,0.3)] hover:shadow-[0_0_15px_rgba(94,234,212,0.2)]">
										<h4 className="text-xl font-semibold mb-4 text-[#5eead4]">
											Start Playing
										</h4>
										<p className="text-[#e0f2fe] mb-4">
											Start playing immediately. No wallet
											setup required. We handle the
											complicated stuff behind the scenes.
										</p>
										<Button
											className="w-full relative overflow-hidden bg-[rgba(94,234,212,0.2)] text-[#5eead4] border border-[rgba(94,234,212,0.3)] rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-[rgba(94,234,212,0.3)]"
											onClick={() =>
												(window.location.href =
													"https://monopoly-frontend-git-main-badukweis-projects.vercel.app/")
											}
										>
											Start Playing
										</Button>
									</div>

									<div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl p-6 border border-[rgba(255,255,255,0.05)] transition-all duration-300 hover:border-[rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
										<h4 className="text-xl font-semibold mb-4 text-[#8b5cf6]">
											Upgrade Properties
										</h4>
										<p className="text-[#e0f2fe] mb-4">
											Invest your $DOL tokens to upgrade
											houses and increase your passive
											income.
										</p>
										<div className="flex gap-2">
											{[1, 2, 3].map((level) => (
												<div
													key={level}
													className={`flex-1 h-16 rounded-lg flex items-center justify-center ${
														level === 1
															? "bg-[rgba(94,234,212,0.3)] border-[#5eead4]"
															: "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)]"
													} border transition-all duration-300 hover:bg-[rgba(94,234,212,0.2)]`}
												>
													<div className="text-center">
														<div className="text-xs">
															Level {level}
														</div>
														<div className="text-sm font-bold">
															{level * 5} $DOL
														</div>
													</div>
												</div>
											))}
										</div>
									</div>

									<div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl p-6 border border-[rgba(255,255,255,0.05)] transition-all duration-300 hover:border-[rgba(244,114,182,0.3)] hover:shadow-[0_0_15px_rgba(244,114,182,0.2)]">
										<h4 className="text-xl font-semibold mb-4 text-[#f472b6]">
											Collect Rewards
										</h4>
										<p className="text-[#e0f2fe] mb-4">
											Earn $DOL tokens daily based on your
											properties and upgrades.
										</p>
										<div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-3 flex justify-between items-center">
											<span>Daily Rewards:</span>
											<span className="font-bold text-[#f472b6]">
												45 $DOL
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Community + Footer */}
			<section id="community" className="relative z-10 pt-20 pb-10">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							Join Our
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5eead4] to-[#8b5cf6]">
								{" "}
								Community
							</span>
						</h2>
						<p className="text-[#e0f2fe] text-lg mb-8">
							Become part of the fastest growing Web3 gaming
							community.
						</p>

						<div className="flex flex-wrap justify-center gap-4">
							{["Coming Soon"].map((platform) => (
								<Button
									key={platform}
									variant="outline"
									className="relative overflow-hidden border-[#5eead4] text-[#5eead4] rounded-full px-6 py-2 font-medium transition-all duration-300 hover:bg-[rgba(94,234,212,0.1)] hover:shadow-[0_0_15px_rgba(94,234,212,0.3)]"
								>
									{platform}
								</Button>
							))}
						</div>
					</div>

					<div className="relative bg-[rgba(255,255,255,0.03)] backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.05)] text-center">
						<h3 className="text-2xl font-bold mb-4">Thank You!</h3>
						<p className="text-[#e0f2fe] mb-6 max-w-2xl mx-auto">
							We're excited to have you join us on this journey to
							make Web3 gaming accessible and fun for everyone.
						</p>

						<div className="flex items-center justify-center gap-2 text-lg font-medium">
							<span>Built on Sui</span>
							<Droplets className="h-6 w-6 text-[#5eead4] animate-bounce" />
						</div>

						{/* Animated water droplets */}
						{positions.map((pos, i) => (
							<div
								key={i}
								className="absolute w-4 h-4 rounded-full bg-[#5eead4] opacity-70"
								style={{
									...pos,
									animationDelay: `${i * 0.5}s`,
									animation: "float 10s infinite ease-in-out",
								}}
							></div>
						))}
					</div>

					<footer className="mt-16 text-center text-sm text-[#e0f2fe]">
						<div className="flex justify-center items-center gap-8 mb-6">
							<Link
								href="#"
								className="hover:text-[#5eead4] transition-colors"
							>
								Terms
							</Link>
							<Link
								href="#"
								className="hover:text-[#5eead4] transition-colors"
							>
								Privacy
							</Link>
							<Link
								href="#"
								className="hover:text-[#5eead4] transition-colors"
							>
								FAQ
							</Link>
							<Link
								href="#"
								className="hover:text-[#5eead4] transition-colors"
							>
								Contact
							</Link>
						</div>
						<p>© 2025 DolphinBay. All rights reserved.</p>
					</footer>
				</div>
			</section>
		</div>
	);
}
