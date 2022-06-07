import React, { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
}

function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0,
  });

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json() as any[];

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const products = data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      priceFormatted: formatter.format(product.price),
    }));

    const totalPrice = data.reduce((total, product) => total + product.price, 0);

    setResults({ data: products, totalPrice });
  };

  const addToWishlist = useCallback(async (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="submit"
        >
          Buscar
        </button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishlist}
      />
    </div>
  );
}

export default Home;
