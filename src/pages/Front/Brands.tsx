import { useLayoutEffect, useState } from "react"
import { GetBx } from "../../Logic/getApp"
import Navbar from "../../components/Navbar"

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

    const groupedBrands = filteredBrands.reduce((acc: any, brand: any) => {
        const firstLetter = brand.name[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(brand);
        return acc;
    }, {});

    const sortedLetters = Object.keys(groupedBrands).sort();

    // Skeleton loader component
    const BrandSkeleton = () => (
        <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
                <div key={`skeleton-${i}`}>
                    <div className="animate-pulse h-8 w-16 bg-gray-200 rounded mb-2"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, j) => (
                            <div 
                                key={`skeleton-item-${j}`}
                                className="animate-pulse flex flex-col items-center p-4 border rounded-lg"
                            >
                                <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <>
            <Navbar />
            <main className="w-full bg-white flex flex-col gap-3 p-4 h-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Découvrez nos marques</h1>
                    {loading ? (
                        <div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>
                    ) : (
                        <span className="text-gray-600">
                            Total: {filteredBrands.length} marques
                        </span>
                    )}
                </div>
                
                <input
                    type="text"
                    placeholder="Rechercher une marque..."
                    className="p-2 border rounded-lg mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {loading ? (
                    <BrandSkeleton />
                ) : (
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
                )}

                {!loading && filteredBrands.length === 0 && (
                    <p className="text-center text-gray-500">Aucun résultat trouvé</p>
                )}
            </main>
            <ChatSupport />
            <Footer />
        </>
    )
}

export default Brands