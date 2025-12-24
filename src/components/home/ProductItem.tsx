import { Link } from "react-router-dom";
import type { OrderItem, Product } from "../../models/rootModel";
import Rating from "../ui/rating";
import { ROUTES } from "../../constants/commonConstant";
import { toast } from "react-toastify";
import { addToCart } from "../../store/cartSlice";

export default function ProductItem({ product }: { product: Product }) {
  function handleAddToCart(product: Product): void {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      } as OrderItem)
    );
    toast.success(`${product.name} added to cart!`);
  }

  return (
    <div className="col" key={product.id}>
      <div className="card h-100 border shadow-sm position-relative">
        <div className="position-relative overflow-hidden rounded-top">
          <img
            className="card-img-top"
            src={product.thumbnail}
            style={{
              height: "220px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/100";
            }}
          />
        </div>

        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title fw-bold mb-0  lh-sm flex-grow-1 me-3">
              {product.name}
            </h5>
            <div className="h4 text-primary fw-bold mb-0 flex-shrink-0">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Category and Rating Row */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge text-secondary border px-2 py-1 small">
              {product.category}
            </span>
            {product.rating > 0 && (
              <div className="d-flex align-items-center">
                <Rating value={product.rating} size="small" />
                <span className="ms-1 text-muted small fw-semibold">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p
            className="card-text text-muted mb-4 flex-grow-1"
            style={{ fontSize: "0.9rem", lineHeight: "1.5" }}
          >
            {product.description?.length > 90
              ? `${product.description.substring(0, 90)}...`
              : product.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-auto">
            <div className="row g-2">
              <div className="col-6">
                <Link
                  to={ROUTES.MENU_DETAIL.replace(":id", product.id.toString())}
                  className="btn btn-outline-primary w-100 btn-sm fw-semibold"
                >
                  <i className="bi bi-info-circle me-1"></i>Details
                </Link>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-primary w-100 btn-sm fw-semibold"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="bi bi-cart-plus me-1"></i>Add Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="position-absolute bottom-0 start-0 w-100"
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, var(--bs-primary), transparent)",
          }}
        ></div>
      </div>
    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
