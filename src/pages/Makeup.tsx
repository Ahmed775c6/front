import { useLayoutEffect , useState } from "react"
import Navbar from "../components/Navbar";
import axios from "axios";
import ProductSkeleton from "../components/Skelton";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import Product from "../components/Product";
import BrandsLinks from "../components/BrandsLinks";
import Footer from "../components/Footer";
import ProductOverviewPopup from "../components/Popup";
const Makeup = () => {
    const [products, setProducts] = useState<any | []>([]);
    const [Loading,setLoading] = useState(true);
    const [showItem, setShowItem] = useState<boolean | null>(null);
useLayoutEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/makepData`);
            setProducts(response.data.message); 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }

    }
    fetchProducts()
    }, []); // Empty dependency array to run once on mount
return (
<>
{
  showItem ? <ProductOverviewPopup  product = {showItem} onClose = {()=>{setShowItem(null)}} /> : ''
}
<Navbar />
{
    Loading ? <ProductSkeleton /> : 
    <div className="w-full grid grid-cols-3 gap-3 dkhdyh p-3">
        {
            products.map((item:any) => (
           <div className="" key={item._id}>
              <Product product = {item} seti = {setShowItem}/>  
           </div>
            ))
        }
    </div>
}
<BrandsLinks />
<Footer />

</>
  )
}

export default Makeup