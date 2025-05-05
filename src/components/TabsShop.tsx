import { motion, AnimatePresence } from "framer-motion";
import Product from "./Product";
import ProductSkeleton from "./Skelton";

const ProductGrid = ({ 
  products, 
  activePromoTab, 
  setShowItem,
  fload
}: { 
  products: any[], 
  activePromoTab: string, 
  setShowItem: (value: boolean) => void,
  fload: boolean
}) => {
  const skeletonItems = 20;

  return (
    <div className="shop">
      <AnimatePresence mode="wait">
        {activePromoTab === "Nouveaux" && (
          <motion.div 
            className="new1 p-6 one_style_grid active"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            key="nouveaux" // Unique key for tab
            layoutRoot // Add this for layout animations
          >
            <AnimatePresence>
              {fload ? (
                Array(skeletonItems).fill(null).map((_, index) => (
                  <motion.div
                    className="w-full"
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))
              ) : (
                products
                  .filter((product) => product.status === true)
                  .map((product) => (
                    <motion.div
                      className="w-full"
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Product product={product} seti={setShowItem} />
                    </motion.div>
                  ))
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activePromoTab === "NOS TOP PROMOS" && (
          <motion.div 
            className="p-6 promortions1 one_style_grid active"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            key="promos" // Unique key for tab
            layoutRoot // Add this for layout animations
          >
            <AnimatePresence>
              {fload ? (
                Array(skeletonItems).fill(null).map((_, index) => (
                  <motion.div
                    className="w-full"
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))
              ) : (
                products
                  .filter((product) => product.discount > 0)
                  .map((product) => (
                    <motion.div
                      className="w-full"
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Product product={product} seti={setShowItem} />
                    </motion.div>
                  ))
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;