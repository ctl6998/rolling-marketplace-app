import React from "react";

export default function Dashboad() {
  return (
    <section>
      <header className="form-header">
        <h3>Add New Product</h3>
        {/* <AmplifySignOut></AmplifySignOut> */}
      </header>
      {/* <form className="form-wrapper" onSubmit={handleSubmit}> */}
      <form className="form-wrapper" >
        <div className="form-image">
          {/* {image ? (
            <img className="image-preview" src={image} alt="" />
          ) : (
            <input
              type="file"
              accept="image/jpg"
              onChange={(e) => handleImageUpload(e)}
            />
          )} */}
        </div>
        <div className="form-fields">
          <div className="title-form">
            <p>
              <label htmlFor="title">Title</label>
            </p>
            <p>
              <input
                name="email"
                type="title"
                placeholder="Type the title"
                // onChange={(e) =>
                //   setBookDetails({ ...bookDetails, title: e.target.value })
                // }
                required
              />
            </p>
          </div>
          <div className="description-form">
            <p>
              <label htmlFor="description">Description</label>
            </p>
            <p>
              <textarea
                name="description"
                type="text"
                rows="8"
                placeholder="Type the description of the book"
                // onChange={(e) =>
                //   setBookDetails({
                //     ...bookDetails,
                //     description: e.target.value,
                //   })
                // }
                required
              />
            </p>
          </div>
          <div className="author-form">
            <p>
              <label htmlFor="author">Author</label>
            </p>
            <p>
              <input
                name="author"
                type="text"
                placeholder="Type the author's name"
                // onChange={(e) =>
                //   setBookDetails({ ...bookDetails, author: e.target.value })
                // }
                required
              />
            </p>
          </div>
          <div className="price-form">
            <p>
              <label htmlFor="price">Price ($)</label>
              <input
                name="price"
                type="text"
                placeholder="What is the Price of the book (USD)"
                // onChange={(e) =>
                //   setBookDetails({ ...bookDetails, price: e.target.value })
                // }
                required
              />
            </p>
          </div>
          <div className="featured-form">
            <p>
              <label>Featured?</label>
              <input
                type="checkbox"
                className="featured-checkbox"
                // checked={bookDetails.featured}
                // onChange={() =>
                //   setBookDetails({
                //     ...bookDetails,
                //     featured: !bookDetails.featured,
                //   })
                // }
              />
            </p>
          </div>
          <div className="submit-form">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
