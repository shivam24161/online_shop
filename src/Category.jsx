import React, { useContext, useEffect } from "react";
import "./Category.css";
import { userContext } from "./Mycontext";
const Category = () => {
  const obj = useContext(userContext);
  useEffect(() => {
    const Category = async () => {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      const final_response = await response.json();
      obj.setCategories(final_response);
    };
    Category();
  }, [obj]);

  // Category display
  const getCategory = (category) => {
    const selectedCategory = obj.allProduct.filter(
      (x) => x.category.name === category
    );
    obj.setproduct(selectedCategory);
  };
  return (
    <div className="category_main_div">
      <div className="heading">Select your Choice</div>
      <div className="category_sub_div">
        {obj.categories.map((i, index) => {
          return (
            <div
              key={index}
              className="card"
              onClick={() => getCategory(i.name)}
            >
              <img src={i.image} alt="img" className="img" />
              <div className="prod_name">{i.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Category;
