const Pagination = () => {
  return (
    <div className="pagination">
      <span
        className="pagination-item"
        style={{ border: "1px solid #ddd", borderRadius: "5px" }}
      >
        Previous
      </span>
      <span
        className="pagination-item"
        style={{ border: "1px solid #ddd", borderRadius: "5px" }}
      >
        1
      </span>
      <span className="pagination-item">...</span>
      <span className="pagination-item active">10</span>
      <span className="pagination-item">11</span>
      <span className="pagination-item">12</span>
      <span className="pagination-item">13</span>
      <span className="pagination-item">14</span>
      <span className="pagination-item">15</span>
      <span className="pagination-item">16</span>
      <span className="pagination-item">17</span>
      <span className="pagination-item">18</span>
      <span
        className="pagination-item"
        style={{ border: "1px solid #ddd", borderRadius: "5px" }}
      >
        Next
      </span>
    </div>
  );
};

export default Pagination;
