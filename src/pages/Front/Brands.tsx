import { useLayoutEffect, useState } from "react"
import { GetBx } from "../../Logic/getApp"
import Navbar from "../../components/Navbar"
import Loader from "../../components/Loader"
import Footer from "../../components/Footer"
import ChatSupport from "../../components/ChatSupport"

const Brands = () => {
    const [brands, setBrands] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useLayoutEffect(() => {
        const fetchData = async () => {
            const Res = await GetBx();
            if (Res) {
                setBrands(Res)
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    const filteredBrands = brands
        .filter((brand: any) => 
            brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a: any, b: any) => a.name.localeCompare(b.name))

    // Group brands by first letter
    const groupedBrands = filteredBrands.reduce((acc: any, brand: any) => {
        const firstLetter = brand.name[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(brand);
        return acc;
    }, {});

    const sortedLetters = Object.keys(groupedBrands).sort();

    return (
        <>
            {loading ? <Loader /> : null}
            <Navbar />
            <main className="w-full bg-white flex flex-col gap-3 p-4 h-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Découvrez nos marques</h1>
                    <span className="text-gray-600">
                        Total: {filteredBrands.length} marques
                    </span>
                </div>
                
                <input
                    type="text"
                    placeholder="Rechercher une marque..."
                    className="p-2 border rounded-lg mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex flex-col gap-6">
                    {sortedLetters.map((letter) => (
                        <div key={letter}>
                            <h2 className="text-xl font-semibold bg-gray-100 p-2 rounded-t-lg">
                                {letter}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 border rounded-b-lg">
                                {groupedBrands[letter].map((item: any, index: any) => (
                                    <a
                                        href={`/shop?direction=${item.name}`}
                                        key={`brand-${letter}-${index}`}
                                        className="flex flex-col items-center p-4 border rounded-lg hover:shadow-lg transition-shadow"
                                    >
                                        <img
                                            src={item.logo}
                                            className="w-20 h-20 object-contain mb-2"
                                            alt={item.name}
                                        />
                                        <p className="text-center font-medium">{item.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredBrands.length === 0 && !loading && (
                    <p className="text-center text-gray-500">Aucun résultat trouvé</p>
                )}
            </main>
            <ChatSupport />
            <Footer />
        </>
    )
}

export default Brands