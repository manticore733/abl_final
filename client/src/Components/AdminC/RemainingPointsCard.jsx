



import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from '@mui/x-charts/BarChart';
import "./css/RemainingPointsCard.css";

const RemainingPointsCard = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    totalStudents: 0,
    averagePointsEarned: 0,
    studentsAtRisk: 0,
    atRiskPercentage: 0
  });
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("remaining"); // "remaining" or "progress"

  useEffect(() => {
    fetchData();
  }, [selectedDepartment, selectedBatch, selectedDivision, selectedYear]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get("http://localhost:5000/api/admin/remaining-points-summary", {
        params: {
          department: selectedDepartment || undefined,
          batch: selectedBatch || undefined,
          division: selectedDivision || undefined,
          year: selectedYear || undefined
        }
      });
      
      console.log("API Response:", response.data);
      
      const { groupedData, progressData, summary } = response.data;
      
      // Set summary stats
      if (summary) {
        setSummary(summary);
      }
      
      // Determine which data to use based on view mode
      const sourceData = viewMode === "remaining" ? groupedData : progressData;
      
      if (!sourceData || Object.keys(sourceData).length === 0) {
        console.log("No data received or empty data");
        setData([]);
        return;
      }
      
      // Convert to array format that chart expects
      const formattedData = Object.entries(sourceData).map(([bucket, count]) => ({
        range: `${bucket}-${parseInt(bucket) + 10}`,
        studentCount: count,
        bucket: parseInt(bucket)
      }));
      
      // Sort by bucket value
      formattedData.sort((a, b) => a.bucket - b.bucket);
      
      console.log("Formatted data for chart:", formattedData);
      setData(formattedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching points data:", error);
      setError(`Failed to load data: ${error.message}`);
      setData([]); // Reset data to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Switch view mode and refetch data
  const toggleViewMode = () => {
    const newMode = viewMode === "remaining" ? "progress" : "remaining";
    setViewMode(newMode);
    fetchData(); // Re-fetch data when view mode changes
  };

  // Prepare chart data
  const chartData = data.length > 0 ? {
    xAxis: [
      { scaleType: 'band', data: data.map(item => item.range) },
    ],
    series: [
      { data: data.map(item => item.studentCount) },
    ],
  } : { xAxis: [{ scaleType: 'band', data: [] }], series: [{ data: [] }] };

  // Helper function to get progress status color
  const getStatusColor = (percentage) => {
    if (percentage >= 20) return "#d32f2f"; // Red for high risk
    if (percentage >= 10) return "#ff9800"; // Orange for medium risk
    return "#4caf50"; // Green for low risk
  };

  return (
    <div className="remaining-points-card">
      <div className="card-header">
        <h2>{viewMode === "remaining" ? "Remaining Points Overview" : "Completed Points Overview"}</h2>
        <p className="sub-heading">
          {viewMode === "remaining" 
            ? "Students grouped by points needed to reach 100 total points" 
            : "Students grouped by points accumulated toward 100 total points"}
        </p>

        {/* View toggle */}
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === "remaining" ? "active" : ""}`}
            onClick={toggleViewMode}
          >
            {viewMode === "remaining" ? "View Completed Points" : "View Remaining Points"}
          </button>
        </div>

        {/* Filters */}
        <div className="filters">
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            <option value="">Department</option>
            <option value="Computer">Computer</option>
            <option value="IT">IT</option>
            <option value="EXTC">EXTC</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
          </select>

          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">Year</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
            <option value="">Batch</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
            <option value="">Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
      </div>

      {/* Summary stats */}
      {!loading && !error && summary.totalStudents > 0 && (
        <div className="summary-stats">
          <div className="stat-card">
            <div className="stat-value">{summary.totalStudents}</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{summary.averagePointsEarned}</div>
            <div className="stat-label">Avg. Points</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: getStatusColor(summary.atRiskPercentage) }}>
              {summary.studentsAtRisk}
            </div>
            <div className="stat-label">At Risk</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: getStatusColor(summary.atRiskPercentage) }}>
              {summary.atRiskPercentage}%
            </div>
            <div className="stat-label">Risk Rate</div>
          </div>
        </div>
      )}

      <div className="chart-container">
        {loading && <p className="loading">Loading data...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && data.length === 0 && <p>No data available</p>}
        {!loading && !error && data.length > 0 && (
          <BarChart
            xAxis={chartData.xAxis}
            series={chartData.series}
            height={300}
            colors={[viewMode === "remaining" ? '#5b9bd5' : '#4CAF50']}
          />
        )}
      </div>
    </div>
  );
};

export default RemainingPointsCard;