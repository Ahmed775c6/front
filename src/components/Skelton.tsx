import { motion } from "framer-motion";

const ProductSkeleton = () => {
  return (
    <motion.div className="product2 animate-pulse h-|350px]">
      <div className="product_img bg-white">
        {/* Image Skeleton */}
        <div className="bg-gray-200 h-[60%] w-full rounded-t-lg"></div>
        
        {/* Actions Skeleton */}
        <div className="actions z-20 flex justify-center gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="h-8 w-8 rounded-full bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
      
      <div className="product_content p-4">
        {/* Title & Description Skeleton */}
        <div className="title_dis space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Price & Badges Skeleton */}
        <div className="price_pource mt-4 space-y-2">
          <div className="price flex gap-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSkeleton;