import Page2 from "../page/Page2";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import useShopService from "../../service/shopService";
import { useHttp } from "../../hooks/http.hook";

import { setItems } from "../../store/slices/idsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import "./mainPage.css";

//const { request } = useHttp();

//console.log(request())  не трогать

// const MainPage = () => {

//    const results = [
//       's_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       'm_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       'er0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_r0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_r0', '1', '2', '3', '4', '5', '6', '7', '8', 'e9',
//       '_r0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       '_r0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_r0', '1', '2', '3', '4', '5', '6', '7', '8', 'e9',
//       //'_r0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_r0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_r0', '1', '2', '3', '4', '5', '6', '7', '8', 'e9',
//       //'_r0', '1', '2', '3', '4', '5', '6', '7', '8', 'e9',
//       //'_r0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_r0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//       //'_r0', '1', '2', '3', '4', '5', '6', '7', '8', 'e9',

//    ]

//    const dispatch = useDispatch();

//    useEffect(() => {
//       dispatch(setItems(results));
//    }, [results])

//    return (
//       <div className="main-page">
//          <ErrorBoundary>
//             <Page2 data={results} />
//          </ErrorBoundary>
//       </div>

//    )
// };

// export default MainPage;

const PAGE_SIZE = 50; // Количество товаров на одной странице

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  const { request } = useHttp();

  useEffect(() => {
    request();
  }, []);

  //   useEffect(() => {
  // // Здесь должен быть ваш запрос к API для получения всех товаров
  // Например:
  // fetch("http://api.valantis.store:40000/getAllProducts")
  //   .then(response => response.json())
  //   .then(data => {
  //     setProducts(data);
  //   })
  //   .catch(error => console.error("Error fetching products:", error));
  //   }, []); // Вызовется один раз после монтирования компонента

  //   useEffect(() => {
  //      // Фильтрация товаров по поисковому запросу и бренду
  //      const filtered = products.filter(product =>
  //         product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //         (filterBrand === "" || product.brand.toLowerCase() === filterBrand.toLowerCase())
  //      );
  //      setFilteredProducts(filtered);
  //   }, [products, searchTerm, filterBrand]); // Вызовется при изменении товаров, поискового запроса или бренда

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Сброс страницы при изменении поискового запроса
  };

  const handleBrandFilterChange = (event) => {
    setFilterBrand(event.target.value);
    setCurrentPage(1); // Сброс страницы при изменении фильтра по бренду
  };

  const renderProducts = () => {
    // Логика отображения страниц товаров
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    return (
      <ul>
        {currentProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} - {product.brand}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <select value={filterBrand} onChange={handleBrandFilterChange}>
        <option value="">All Brands</option>
        <option value="brand1">Brand 1</option>
        <option value="brand2">Brand 2</option>
      </select>
      {renderProducts()}
      <button onClick={() => setCurrentPage((prev) => prev - 1)}>
        Previous Page
      </button>
      <span>{currentPage}</span>
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>
        Next Page
      </button>
    </div>
  );
};

export default MainPage;
