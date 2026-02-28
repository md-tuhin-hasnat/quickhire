import Image from 'next/image';

export default function PartnersSection() {
    return (
        <section className="py-10 border-b border-gray-100 bg-white">
            <div className="container flex flex-col">
                <p className="text-lg text-gray-400 mb-8 font-medium">Companies we helped grow</p>
                <div className="w-full">
                    <Image
                        src="/images/company/image.png"
                        alt="Companies we helped grow: Vodafone, Intel, Tesla, AMD, Talkit"
                        width={1400}
                        height={50}
                        className="w-full h-auto object-contain opacity-60 hover:opacity-80 transition-opacity duration-300"
                    />
                </div>
            </div>
        </section>
    );
}
