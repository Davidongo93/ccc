"use client";

// Hero component renders the landing section with a background video
const Hero = () => {
  return (
    <section id="inicio" className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[85vh] w-full overflow-hidden">
      <iframe
        src="https://player.vimeo.com/video/873767825?background=1&autoplay=1&loop=1&muted=1&controls=0&quality=720p&autopause=0&dnt=1"
        className="video-background absolute inset-0 w-full h-full border-0"
        style={{
          transform: 'scale(1.5)',
        }}
        allow="autoplay; fullscreen"
        title="Background video"
      />

      <style jsx>{`
        @media (max-width: 768px) {
          .video-background {
            transform: scale(2.2) !important;
          }
        }
        
        @media (max-width: 480px) {
          .video-background {
            transform: scale(3) !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .video-background {
            transform: scale(2.5) !important;
          }
        }
        
        @media (min-width: 1920px) {
          .video-background {
            transform: scale(1.2) !important;
          }
        }
      `}</style>

      <div className="relative z-10 flex h-full w-full items-end justify-center sm:justify-start p-4 sm:p-6 md:p-8 lg:p-16">
        <div className="mb-6 md:mb-8 max-w-[300px] sm:max-w-sm md:max-w-lg text-center sm:text-left sm:2xl:ml-24">
          <h1 className="mb-2 text-lg sm:text-2xl font-bold text-white sm:mb-3 md:text-3xl lg:text-4xl 2xl:text-5xl">
            Descubre el Poder Curativo del Cannabis Medicinal
          </h1>
          <p className="text-sm sm:text-base text-gray-200 md:text-lg">
            Explora las bondades del CBD y Cannabis Medicinal para tu salud y bienestar. Productos
            de la más alta calidad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
