import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Skeleton Loader Component
const SkeletonSlider: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const skeletonItems = Array(5).fill(0); // Show 5 skeleton items

  return (
    <div
      className="slider"
      style={{
        "--width": `${width}px`,
        "--height": `${height}px`,
        "--quantity": skeletonItems.length,
      } as React.CSSProperties}
    >
      <div className="list">
        {skeletonItems.map((_, index) => (
          <div 
            key={index} 
            className="item border-none p-2 justify-center items-center text-center relative"
            style={{ "--position": index + 1 } as React.CSSProperties}
          >
            <div className="animate-pulse">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type SliderProps = {
  images: any[];
  width: number;
  height: number;
  reverse?: boolean;
};

const Slider: React.FC<SliderProps> = ({ images, width, height }) => {
  return (
    <div
      className="slider"
      style={{
        "--width": `${width}px`,
        "--height": `${height}px`,
        "--quantity": images.length,
      } as React.CSSProperties}
      data-reverse={'true'}
    >
      <div className="list">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="item border-none p-2 justify-center items-center text-center relative cursor-pointer" 
            style={{ "--position": index + 1 } as React.CSSProperties} 
            onClick={() => { window.location.href = `/shop?direction=${src.name}` }}
          >
            <p>{src.name}</p>
            <img src={src.logo} alt="slider image" className="w-20 h-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

type MainProps = {
  pr: any;
  loading?: boolean;
};

const Main: React.FC<MainProps> = ({ pr, loading }) => {
  if (loading) return <SkeletonSlider width={100} height={120} />;

  return (
    <main className="w-full bg-transparent">
      <Slider
        images={pr}
        width={100}
        height={120}
      />
    </main>
  );
};

const BrandsLinks = () => {
  const [brandsList, setBrandsList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${baseUrl}/brands`);
        setBrandsList(response.data.message);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="w-full p-3 shadow-xs rounded-md bg-white">
      <div className="w-full flex justify-between">
        <h1 className="font-semibold">TOP MARQUES DE PARAPHARMACIE</h1>
        <a href="/brands" className="font-semibold text-black flex justify-center gap-2">
          Voir Tous <i className="ri-arrow-right-line"></i>
        </a>
      </div>
      <div className="w-full p-3">
        <Main pr={brandsList} loading={loading} />
      </div>
    </div>
  );
};

export default BrandsLinks;