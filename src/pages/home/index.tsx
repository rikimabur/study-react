import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Category,
  PaginationResult,
  Product,
} from "../../models/rootModel";
import { productService } from "../../services/productService";

import { categoryService } from "../../services/categoryService";
import debounce from "lodash/debounce";
import ProductItem from "../../components/home/ProductItem";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const skipRef = useRef(0); // track how many items are loaded
  const loadingRef = useRef(false); // track if request is in progress
  const limit = 9;
  const loadProducts = async (reset: boolean = false) => {
    if (loadingRef.current) return; // block if request in progress
    loadingRef.current = true;
    setLoading(true);
    try {
      const data: PaginationResult<Product> = await productService.getProducts(
        skipRef.current,
        limit
      );
      setProducts((prev) =>
        reset ? data.products : [...prev, ...data.products]
      );
      skipRef.current = skipRef.current + data.products.length;
      setTotal(data.total);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      loadingRef.current = false; // release the block
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data: Category[] = await categoryService.getCategories();
      setCategories(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([loadProducts(true), loadCategories()]);
    };
    fetchInitialData();
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      if (
        scrollTop + windowHeight >= fullHeight - 300 &&
        skipRef.current < total &&
        !loadingRef.current
      ) {
        loadProducts();
      }
    };

    const throttledScroll = () => {
      // throttle using requestAnimationFrame
      if (!loadingRef.current) {
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [total]);

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = e.target.value;
    console.log("Selected category:", category);
    setCategoryFilter(category);
    setLoading(true);
    try {
      if (category === "All" || category === "") {
        loadProducts();
      } else {
        const data = await productService.getProductsByCategory(category);
        setProducts(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((query: string) => fetchSearchResults(query), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFetch(value);
  };

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getSearchProducts(query);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid px-0 ">
      <div className="container" id="menu">
        {/* Filters */}
        <div className="row g-4 align-items-end mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold text-muted small text-uppercase">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold text-muted small text-uppercase">
              Category
            </label>
            <select
              className="form-select"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option value={category.name} key={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            Error loading menu items: Unknown error
          </div>
        )}
        {/* Loading State */}
        {loading && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
            <div className="col">
              <div className="card h-100 placeholder-glow">
                <div
                  className="card-img-top bg-body-secondary"
                  style={{ height: "180px" }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title placeholder col-6"></h5>
                  <p className="card-text placeholder col-9"></p>
                  <p className="card-text placeholder col-4"></p>
                  <div className="d-flex gap-2 mt-3">
                    <span className="placeholder btn btn-primary disabled col-6"></span>
                    <span className="placeholder btn btn-outline-primary disabled col-6"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading &&
          (products.length === 0 ? (
            <div className="text-center py-5">
              <h4>No menu items found</h4>
              <p className="text-muted">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
              {products.map((item) => (
                <ProductItem key={item.id} product={item} />
              ))}
            </div>
          ))}

        {/* Features Section */}
        <section className="py-5 border-top">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose MangoFusion?</h2>
            <p className="text-muted mb-0">
              We deliver freshness, flavor, and a premium ordering experience.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i
                    className="bi bi-egg-fried text-primary"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                  <h5 className="mt-3">Quality Food</h5>
                  <p className="text-muted small mb-0">
                    Fresh ingredients and authentic recipes for exceptional
                    taste.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i
                    className="bi bi-lightning-charge text-primary"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                  <h5 className="mt-3">Fast Pickup</h5>
                  <p className="text-muted small mb-0">
                    Quick preparation and streamlined collection process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i
                    className="bi bi-stars text-primary"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                  <h5 className="mt-3">Great Service</h5>
                  <p className="text-muted small mb-0">
                    Friendly support and attention to every detail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
