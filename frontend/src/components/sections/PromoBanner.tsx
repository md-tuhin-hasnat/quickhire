import Link from 'next/link';

export default function PromoBanner() {
    return (
        <section className="py-12 lg:py-16 relative bg-white overflow-hidden">
            <div className="container relative flex flex-col md:flex-row items-stretch">

                {/* Left Text Column with Blue Background */}
                <div className="flex-1 relative z-0 flex flex-col justify-center px-8 lg:px-16 py-10 lg:py-16 md:pr-0">
                    {/* Chamfered Background */}
                    <div
                        className="absolute inset-0 bg-primary -z-10"
                        style={{ clipPath: 'polygon(80px 0, 100% 0, 100% 100%, 0 100%, 0 80px)' }}
                    />
                    <div className="text-center md:text-left text-white max-w-xl">
                        <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-[1.15]">
                            Start posting <br className="hidden md:block" /> jobs today
                        </h2>
                        <p className="text-white/80 mb-8 text-xl font-medium">Start posting jobs for only $10.</p>
                        <Link
                            href="/signup"
                            className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-sm hover:bg-gray-50 transition shadow-lg"
                        >
                            Sign Up For Free
                        </Link>
                    </div>
                </div>

                {/* Right Image Column */}
                <div className="flex-1 relative z-10 hidden md:flex items-end pl-8 pr-10">
                    <div
                        className="absolute inset-y-0 left-0 right-0 bg-primary -z-10"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0 100%)' }}
                    />
                    <div className="relative w-[120%] lg:w-[130%]">
                        <img
                            src="/images/Dashboard_Company.png"
                            alt="Company Dashboard Details"
                            className="w-full h-auto rounded-tl-lg rounded-tr-lg shadow-[-20px_-20px_50px_rgba(0,0,0,0.1)] bg-white block align-bottom"
                            style={{ marginBottom: '-1px' }}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
