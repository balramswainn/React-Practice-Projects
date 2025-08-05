/* eslint-disable react/prop-types */
const OverviewCard = ({ title, value }) => (
  <div className="overview-card">
    <div className="overview-card-header">{title}</div>
    <div className="overview-card-value">{value}</div>
  </div>
);

const OverviewTransactions = () => {
  return (
    <div className="overview-transactions-wrapper">
      <div className="transaction-filter">
        <label className="overview-title">Overview</label>
        <select>
          <option>Last Month</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="overview-container">
        <OverviewCard title="Online orders" value="231" />
        <OverviewCard title="Amount received" value="₹23,92,312.19" />
      </div>

      <div className="transactions-label">
        <label>Transactions | This Month</label>
      </div>
    </div>
  );
};

export default OverviewTransactions;
