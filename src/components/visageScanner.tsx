import { motion, useMotionValue } from "framer-motion";

import { useEffect, useRef, useState } from "react";
type SliderProps = {
    images: any[];
    width: number;
    height: number;
    reverse?: boolean;
  };
  


  
  const Slider: React.FC<SliderProps> = ({ images, width, height, reverse }) => {

    return (
      <div
        className="slider"
        style={{
          "--width": `${width}px`,
          "--height": `${height}px`,
          "--quantity": images.length,
        } as React.CSSProperties}
        data-reverse={reverse ? "true" : "false"}
      >
        <div className="list">
          {images.map((src, index) => (
            <div key={index} className="item border-none  relative" style={{ "--position": index + 1 } as React.CSSProperties}>
<div className="w-full p-2 flex flex-col absolute top-0 left-0">
    <p>{src.name}</p>
    <span>{src.price}</span>
</div>
              <img src={src.mainImage} alt="slider image "  />
      
            </div>
          ))}
        </div>
      </div>
    );
  };
    
  type MainProps = {
    p: any;
  };
  
 
  const Main: React.FC<MainProps> = ({p} : any) => {
    return (
      <main>
   
        <Slider
          images={p }
          width={200}
          height={200}
          
        />
       <button className='p-2 bg-white w-full mt-auto rounded-3xl'>
       Découvrez tout</button>
      </main>
    );
  };
  

  


const visageScanner = ({p} :any) => {  
   const [showAfter, setShowAfter] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const prevPercentage = useRef(0);
 
    // Reset detection when scanner loops
    useEffect(() => {
    
      const unsubscribe = x.on("change", (latest) => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const currentPercentage = (latest / containerWidth) * 100;
  
        // Detect middle crossing in either direction
        if (
          (currentPercentage >= 100 && prevPercentage.current < 50) ||
          (currentPercentage <= 50 && prevPercentage.current > 50)
        ) {
          setShowAfter(prev => !prev);
        }
        prevPercentage.current = currentPercentage;
      });
  
      return () => unsubscribe();
    }, [x]);
  return (
<>
<div className="w-full flex  rounded-md xlsmj ">
    
<div className="w-full h-full p-4 gap-3 flex flex-col relative ">
<label className="p-2 bg-[#144273] rounded-lg text-white w-fit ">Soin De Visage</label>
<h1 className="text-[#144273] font-semibold text-[1.5rem]">Meilleures gammes pour sublimer votre peau par nos soins anti-taches brunes</h1>
<p className="text-[1rem]">Adieu Taches Brunes !</p>
<div className="w-full flex flex-col gap-3">
<Main p= {p}/>

</div>
</div>
<div ref={containerRef} className="w-full p-2  rounded-md relative  h-[70vh]">
      {/* Before Image */}
      <motion.img
        key="before"
        src="./assets/before2.png"
        alt="before"
        loading="lazy"
        className="absolute inset-0 rounded-md p-2 w-full h-full object-cover"
        initial={{ opacity: 1 }}
        animate={{ opacity: showAfter ? 0 : 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* After Image */}
      <motion.img
        key="after"
        src="./assets/after.png"
        alt="after"
        loading="lazy"
        className="absolute rounded-md inset-0 p-2 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: showAfter ? 1 : 0 }}
        transition={{ duration:1 }}
      />

      {/* Scanner Effect */}
      <motion.div
        className="absolute  top-0 left-0 w-[3px]  bg-white h-full opacity-70"
        initial={{ x: 0 }}
        animate={{ x: 670 }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ x }}
      />
    </div>
</div>

</> 
  )
}

export default visageScanner