import { renderListWithTemplate } from "./utils.mjs";

function getProductImage(product) {
  const fallbackImages = {
    "989CG":
      "/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",

    "880RT":
      "/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
  };

  return fallbackImages[product.Id] || product.Image;
}

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img
          src="${getProductImage(product)}"
          alt="${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}