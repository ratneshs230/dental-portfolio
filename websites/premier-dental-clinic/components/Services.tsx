import React from 'react';

const services = [
  {
    title: "Cosmetic Dentistry",
    subtitle: "Sculpting perfection.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Orthodontics",
    subtitle: "Alignment and harmony.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Implants",
    subtitle: "Restoring foundation.",
    image: "https://images.unsplash.com/photo-1550985543-f47f38aee65d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Reconstruction",
    subtitle: "Full mouth rehab.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
  }
];

export const Services: React.FC = () => {
  return (
    <section className="bg-[#f2f2f2] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 tracking-wide text-gray-900">
          OUR EXPERTISE
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="h-72 overflow-hidden relative">
                {/* Overlay for hover effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
              </div>
              <div className="p-8 text-center bg-white relative z-20">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-500 font-serif italic text-lg">
                  {service.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};