
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   CircularProgress,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   InputAdornment,
//   Grid,
// } from "@mui/material";
// import { BarChart } from "@mui/x-charts";
// import { Search as SearchIcon, FilterAlt as FilterIcon } from "@mui/icons-material";
// import axios from "axios";
// import AdNavbar from "../../Components/AdminC/AdNavbar";
// import image from "../../assets/image.png";
// import "./css/AdProfile.css";
// import { 
//   BarChart as RechartsBarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   ResponsiveContainer 
// } from "recharts";

// const AdProfile = () => {
//   const adminData = {
//     name: "Admin Name",
//     username: "admin1",
//     email: "admin@example.com",
//     role: "System Administrator",
//   };

//   // States for existing functionality
//   const [filters, setFilters] = useState({ department: "", batch: "", division: "", year: "" });
//   const [histogramData, setHistogramData] = useState([]);
//   const [summaryStats, setSummaryStats] = useState(null);
//   const [rollNumber, setRollNumber] = useState("");
//   const [studentInfo, setStudentInfo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // New states for student category distribution
//   const [categoryData, setCategoryData] = useState([]);
//   const [filteredCategoryData, setFilteredCategoryData] = useState([]);
//   const [categoryLoading, setCategoryLoading] = useState(false);
//   const [categoryError, setCategoryError] = useState(null);
//   const [categoryFilters, setCategoryFilters] = useState({
//     rollNumber: "",
//     department: "",
//     batch: "",
//     division: "",
//     yearOfJoining: "",
//     mentor: ""
//   });

//   // Options for dropdowns
//   const hardcodedDepartments = ["Computer", "IT", "EXTC", "Mechanical", "Electrical"];
//   const hardcodedBatches = [1, 2, 3, 4];
//   const hardcodedDivisions = ["A", "B"];

//   // Category definitions
//   const categories = ["Academic", "Sports", "Cultural", "Technical", "Social Service", "Other"];
//   const categoryColors = {
//     "Academic": "#8884d8",
//     "Sports": "#82ca9d",
//     "Cultural": "#ffc658",
//     "Technical": "#ff8042",
//     "Social Service": "#0088fe",
//     "Other": "#00C49F"
//   };

//   // Dynamic filter options for category distribution
//   const [categoryDepartments, setCategoryDepartments] = useState([""]);
//   const [categoryBatches, setCategoryBatches] = useState([""]);
//   const [categoryDivisions, setCategoryDivisions] = useState([""]);
//   const [categoryYears, setCategoryYears] = useState([""]);
//   const [categoryMentors, setCategoryMentors] = useState([""]);

//   // Fetch histogram data for existing functionality
//   const fetchHistogram = async () => {
//     try {
//       setLoading(true);
//       const query = new URLSearchParams(filters).toString();
//       const res = await axios.get(`http://localhost:5000/api/admin/visualization/remaining-points-histogram?${query}`);
//       if (res.data.success) {
//         setHistogramData(res.data.data.histogramData);
//         setSummaryStats(res.data.data.summaryStats);
//       }
//     } catch (err) {
//       console.error("Error fetching histogram", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch student by roll number for existing functionality
//   const searchStudent = async () => {
//     if (!rollNumber) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:5000/api/admin/visualization/student-by-roll?rollNumber=${rollNumber}`);
//       if (res.data.success) setStudentInfo(res.data.data);
//       else setStudentInfo(null);
//     } catch (err) {
//       console.error("Error fetching student info", err);
//       setStudentInfo(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle filter change for existing functionality
//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   // Fetch category distribution data
//   const fetchCategoryDistribution = async () => {
//     setCategoryLoading(true);
//     try {
//       // Build query string for API filters
//       const queryParams = new URLSearchParams();
//       if (categoryFilters.rollNumber) queryParams.append("rollNumber", categoryFilters.rollNumber);
//       if (categoryFilters.department) queryParams.append("department", categoryFilters.department);
//       if (categoryFilters.batch) queryParams.append("batch", categoryFilters.batch);
//       if (categoryFilters.division) queryParams.append("division", categoryFilters.division);
//       if (categoryFilters.yearOfJoining) queryParams.append("yearOfJoining", categoryFilters.yearOfJoining);
      
//       const apiUrl = `http://localhost:5000/api/admin/getStudentCategoryDistribution${
//         queryParams.toString() ? `?${queryParams.toString()}` : ''
//       }`;
      
//       const response = await axios.get(apiUrl);
//       const result = response.data;
      
//       setCategoryData(result);
      
//       // Extract unique values for filters
//       setCategoryDepartments(["", ...new Set(result.map(item => item.department))]);
//       setCategoryBatches(["", ...new Set(result.map(item => item.batch).map(String))]);
//       setCategoryDivisions(["", ...new Set(result.map(item => item.division))]);
//       setCategoryYears(["", ...new Set(result.map(item => item.yearOfJoining).map(String))]);
//       setCategoryMentors(["", ...new Set(result.map(item => item.mentor).filter(Boolean))]);
      
//       setCategoryError(null);
//     } catch (err) {
//       console.error("Error fetching category data:", err);
//       setCategoryError(`Failed to load data: ${err.message}`);
//     } finally {
//       setCategoryLoading(false);
//     }
//   };

//   // Handle change for category distribution filters
//   const handleCategoryFilterChange = (field, value) => {
//     setCategoryFilters(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // Apply category filters and sort data
//   useEffect(() => {
//     let result = [...categoryData];
    
//     // Apply client-side filters
//     if (categoryFilters.rollNumber) {
//       result = result.filter(student => 
//         student.rollNumber.toLowerCase().includes(categoryFilters.rollNumber.toLowerCase())
//       );
//     }
    
//     if (categoryFilters.mentor) {
//       result = result.filter(student => student.mentor === categoryFilters.mentor);
//     }
    
//     // Sort data by total credits (descending)
//     result.sort((a, b) => {
//       const totalA = categories.reduce((sum, cat) => {
//         // Map category names to match the API response
//         const apiField = cat === "Social Service" ? "socialservice" : cat.toLowerCase();
//         return sum + (a[apiField] || 0);
//       }, 0);
      
//       const totalB = categories.reduce((sum, cat) => {
//         const apiField = cat === "Social Service" ? "socialservice" : cat.toLowerCase();
//         return sum + (b[apiField] || 0);
//       }, 0);
      
//       return totalB - totalA;
//     });
    
//     // Limit to top 15 students for better visualization
//     setFilteredCategoryData(result.slice(0, 15));
//   }, [categoryData, categoryFilters.rollNumber, categoryFilters.mentor]);

//   // Initial data load for category distribution
//   useEffect(() => {
//     fetchCategoryDistribution();
//   }, []);

//   // Custom tooltip for the category chart
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       const student = filteredCategoryData.find(s => s.rollNumber === label);
//       return (
//         <Paper elevation={3} sx={{ p: 2, backgroundColor: "white" }}>
//           <Typography fontWeight="bold">{`${student?.name} (${label})`}</Typography>
//           {payload.map((entry, index) => (
//             <Typography key={index} style={{ color: entry.color }}>
//               {`${entry.name}: ${entry.value} credits`}
//             </Typography>
//           ))}
//           <Typography fontWeight="bold" sx={{ mt: 1 }}>
//             {`Total: ${payload.reduce((sum, entry) => sum + entry.value, 0)} credits`}
//           </Typography>
//         </Paper>
//       );
//     }
//     return null;
//   };

//   // Map category names for the chart
//   const mapCategoryToApiField = (category) => {
//     if (category === "Social Service") return "socialservice";
//     return category.toLowerCase();
//   };

//   return (
//     <div>
//       <AdNavbar />
//       <Box p={3}>
//         {/* Admin Profile */}
//         <Card sx={{ display: "flex", mb: 4, p: 2, alignItems: "center" }}>
//           <Box sx={{ width: 150, height: 150, mr: 3 }}>
//             <img src={image} alt="Admin Avatar" width="100%" />
//           </Box>
//           <CardContent>
//             <Typography variant="h5">{adminData.name}</Typography>
//             <Typography><strong>Username:</strong> {adminData.username}</Typography>
//             <Typography><strong>Email:</strong> {adminData.email}</Typography>
//             <Typography><strong>Role:</strong> {adminData.role}</Typography>
//             <Button variant="outlined" sx={{ mt: 2 }}>Edit Profile</Button>
//           </CardContent>
//         </Card>

//         <Divider sx={{ mb: 3 }} />

//         {/* Histogram Filters */}
//         <Typography variant="h6" mb={2}>Remaining Credits Histogram</Typography>
//         <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
//           <TextField
//             label="Department"
//             name="department"
//             select
//             value={filters.department}
//             onChange={handleFilterChange}
//             sx={{ minWidth: 150 }}
//           >
//             <MenuItem value="">None</MenuItem>
//             {hardcodedDepartments.map(dep => (
//               <MenuItem key={dep} value={dep}>{dep}</MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Batch"
//             name="batch"
//             select
//             value={filters.batch}
//             onChange={handleFilterChange}
//             sx={{ minWidth: 120 }}
//           >
//             <MenuItem value="">None</MenuItem>
//             {hardcodedBatches.map(batch => (
//               <MenuItem key={batch} value={batch}>{batch}</MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Division"
//             name="division"
//             select
//             value={filters.division}
//             onChange={handleFilterChange}
//             sx={{ minWidth: 120 }}
//           >
//             <MenuItem value="">None</MenuItem>
//             {hardcodedDivisions.map(div => (
//               <MenuItem key={div} value={div}>{div}</MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Year"
//             name="year"
//             select
//             value={filters.year}
//             onChange={handleFilterChange}
//             sx={{ minWidth: 120 }}
//           >
//             <MenuItem value="">None</MenuItem>
//             {Array.from({ length: 6 }, (_, i) => {
//               const year = new Date().getFullYear() - i;
//               return <MenuItem key={year} value={year}>{year}</MenuItem>;
//             })}
//           </TextField>

//           <Button variant="contained" onClick={fetchHistogram}>Apply Filters</Button>
//           <Button variant="outlined" onClick={() => setFilters({ department: "", batch: "", division: "", year: "" })}>
//             Clear Filters
//           </Button>
//         </Box>

//         {/* Histogram Chart */}
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           histogramData.length > 0 && (
//             <>
//               <BarChart
//                 xAxis={[{ scaleType: 'band', data: histogramData.map(d => d.range) }]}
//                 series={[{ data: histogramData.map(d => d.count), label: 'Students' }]}
//                 width={600}
//                 height={300}
//               />
//               <Box mt={2}>
//                 <Typography>Total Students: {summaryStats.totalStudents}</Typography>
//                 <Typography>Avg Remaining Credits to 100: {summaryStats.averageRemainingCreditsTo100 ?? "N/A"}</Typography>
//                 <Typography>Zero Remaining Credits: {summaryStats.studentsWithZeroRemaining}</Typography>
//               </Box>
//             </>
//           )
//         )}

//         <Divider sx={{ my: 4 }} />
  
//         {/* Student Info Display */}
//         {loading ? (
//           <CircularProgress />
//         ) : studentInfo ? (
//           <Card sx={{ p: 2 }}>
//             <Typography variant="h6">{studentInfo.name}</Typography>
//             <Typography>Roll Number: {studentInfo.rollNumber}</Typography>
//             <Typography>Department: {studentInfo.department}</Typography>
//             <Typography>Division: {studentInfo.division}</Typography>
//             <Typography>Batch: {studentInfo.batch}</Typography>
//             <Typography>Year: {studentInfo.year}</Typography>
//             <Typography>Total Credits: {studentInfo.totalCredits}</Typography>
//             <Typography>Earned Credits: {studentInfo.earnedCredits}</Typography>
//             <Typography>Remaining Credits: {studentInfo.remainingCredits}</Typography>
//           </Card>
//         ) : rollNumber ? (
//           <Typography>No student found for roll number: {rollNumber}</Typography>
//         ) : null}
        
//         {/* NEW SECTION: Student Category Distribution */}
//         <Divider sx={{ my: 4 }} />
//         <Typography variant="h6" mb={2}>Student-wise Category Distribution</Typography>
        
//         {/* Category distribution filters */}
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Search by Roll Number"
//               value={categoryFilters.rollNumber}
//               onChange={(e) => handleCategoryFilterChange("rollNumber", e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
          
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel>Department</InputLabel>
//               <Select
//                 value={categoryFilters.department}
//                 onChange={(e) => handleCategoryFilterChange("department", e.target.value)}
//                 label="Department"
//                 startAdornment={
//                   <InputAdornment position="start">
//                     <FilterIcon />
//                   </InputAdornment>
//                 }
//               >
//                 <MenuItem value="">All</MenuItem>
//                 {categoryDepartments.filter(Boolean).map(dept => (
//                   <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel>Batch</InputLabel>
//               <Select
//                 value={categoryFilters.batch}
//                 onChange={(e) => handleCategoryFilterChange("batch", e.target.value)}
//                 label="Batch"
//                 startAdornment={
//                   <InputAdornment position="start">
//                     <FilterIcon />
//                   </InputAdornment>
//                 }
//               >
//                 <MenuItem value="">All</MenuItem>
//                 {categoryBatches.filter(Boolean).map(batch => (
//                   <MenuItem key={batch} value={batch}>{batch}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel>Division</InputLabel>
//               <Select
//                 value={categoryFilters.division}
//                 onChange={(e) => handleCategoryFilterChange("division", e.target.value)}
//                 label="Division"
//                 startAdornment={
//                   <InputAdornment position="start">
//                     <FilterIcon />
//                   </InputAdornment>
//                 }
//               >
//                 <MenuItem value="">All</MenuItem>
//                 {categoryDivisions.filter(Boolean).map(div => (
//                   <MenuItem key={div} value={div}>{div}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel>Year</InputLabel>
//               <Select
//                 value={categoryFilters.yearOfJoining}
//                 onChange={(e) => handleCategoryFilterChange("yearOfJoining", e.target.value)}
//                 label="Year"
//                 startAdornment={
//                   <InputAdornment position="start">
//                     <FilterIcon />
//                   </InputAdornment>
//                 }
//               >
//                 <MenuItem value="">All</MenuItem>
//                 {categoryYears.filter(Boolean).map(year => (
//                   <MenuItem key={year} value={year}>{year}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel>Mentor</InputLabel>
//               <Select
//                 value={categoryFilters.mentor}
//                 onChange={(e) => handleCategoryFilterChange("mentor", e.target.value)}
//                 label="Mentor"
//                 startAdornment={
//                   <InputAdornment position="start">
//                     <FilterIcon />
//                   </InputAdornment>
//                 }
//               >
//                 <MenuItem value="">All</MenuItem>
//                 {categoryMentors.filter(Boolean).map(mentor => (
//                   <MenuItem key={mentor} value={mentor}>{mentor}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} md={4}>
//             <Button 
//               variant="contained" 
//               fullWidth 
//               onClick={fetchCategoryDistribution}
//               sx={{ height: '56px' }}
//             >
//               Apply Filters
//             </Button>
//           </Grid>
          
//           <Grid item xs={12} md={4}>
//             <Button 
//               variant="outlined" 
//               fullWidth
//               onClick={() => {
//                 setCategoryFilters({
//                   rollNumber: "",
//                   department: "",
//                   batch: "",
//                   division: "",
//                   yearOfJoining: "",
//                   mentor: ""
//                 });
//                 fetchCategoryDistribution();
//               }}
//               sx={{ height: '56px' }}
//             >
//               Clear Filters
//             </Button>
//           </Grid>
//         </Grid>
        
//         {/* Category distribution chart */}
//         <Card sx={{ p: 3, mb: 3 }}>
//           <Box sx={{ textAlign: "center", mb: 2 }}>
//             {categoryLoading ? (
//               <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//                 <CircularProgress />
//                 <Typography sx={{ ml: 2 }}>Loading data...</Typography>
//               </Box>
//             ) : categoryError ? (
//               <Typography color="error" sx={{ py: 8 }}>{categoryError}</Typography>
//             ) : (
//               <Typography color="text.secondary">
//                 {filteredCategoryData.length === 0 
//                   ? "No data available. Please adjust your filters." 
//                   : `Showing ${filteredCategoryData.length} students (sorted by total credits)`}
//               </Typography>
//             )}
//           </Box>
          
//           {!categoryLoading && !categoryError && filteredCategoryData.length > 0 && (
//             <Box sx={{ height: 500, width: '100%' }}>
//               <ResponsiveContainer>
//                 <RechartsBarChart
//                   data={filteredCategoryData}
//                   layout="vertical"
//                   margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis type="number" label={{ value: 'Credits', position: 'insideBottom', offset: -5 }} />
//                   <YAxis 
//                     type="category" 
//                     dataKey="rollNumber" 
//                     tickFormatter={(value) => {
//                       const student = filteredCategoryData.find(s => s.rollNumber === value);
//                       return student ? `${student.name || "Student"} (${value})` : value;
//                     }}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend />
//                   {categories.map((category) => (
//                     <Bar 
//                       key={category} 
//                       dataKey={mapCategoryToApiField(category)} 
//                       stackId="a" 
//                       fill={categoryColors[category]} 
//                       name={category}
//                     />
//                   ))}
//                 </RechartsBarChart>
//               </ResponsiveContainer>
//             </Box>
//           )}
//         </Card>
        
//         {/* Category distribution summary */}
//         <Card sx={{ p: 3 }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>Summary</Typography>
//           <Typography paragraph>
//             This visualization shows how individual students are balancing their activities across different categories.
//             Each bar represents a student, with colored sections indicating credits earned in each category.
//           </Typography>
//           <Typography>
//             <strong>Key insights:</strong> 
//             {filteredCategoryData.length > 0 
//               ? " Students are displayed in descending order of total credits. This helps identify well-rounded students versus those focusing on specific areas."
//               : categoryLoading 
//                 ? " Loading data from API..."
//                 : " No data available with current filters."}
//           </Typography>
//         </Card>
//       </Box>
//     </div>
//   );
// };

// export default AdProfile;





















import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Paper,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Grid,
  Avatar,
  IconButton,
  Pagination,
  CardHeader,
  Stack,
  Tooltip as MuiTooltip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { 
  Search as SearchIcon, 
  FilterAlt as FilterIcon, 
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import axios from "axios";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import image from "../../assets/image.png";
import "./css/AdProfile.css";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const AdProfile = () => {
  const adminData = {
    name: "Admin Name",
    username: "admin1",
    email: "admin@example.com",
    role: "System Administrator",
  };

  // States for existing functionality
  const [filters, setFilters] = useState({ department: "", batch: "", division: "", year: "" });
  const [histogramData, setHistogramData] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [rollNumber, setRollNumber] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // New states for student category distribution
  const [categoryData, setCategoryData] = useState([]);
  const [filteredCategoryData, setFilteredCategoryData] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(null);
  const [categoryFilters, setCategoryFilters] = useState({
    rollNumber: "",
    department: "",
    batch: "",
    division: "",
    yearOfJoining: "",
    mentor: ""
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [showAllStudents, setShowAllStudents] = useState(false);

  // Options for dropdowns
  const hardcodedDepartments = ["Computer", "IT", "EXTC", "Mechanical", "Electrical"];
  const hardcodedBatches = [1, 2, 3, 4];
  const hardcodedDivisions = ["A", "B"];

  // Category definitions
  const categories = ["Academic", "Sports", "Cultural", "Technical", "Social Service", "Other"];
  const categoryColors = {
    "Academic": "#8884d8",
    "Sports": "#82ca9d",
    "Cultural": "#ffc658",
    "Technical": "#ff8042",
    "Social Service": "#0088fe",
    "Other": "#00C49F"
  };

  // Dynamic filter options for category distribution
  const [categoryDepartments, setCategoryDepartments] = useState([""]);
  const [categoryBatches, setCategoryBatches] = useState([""]);
  const [categoryDivisions, setCategoryDivisions] = useState([""]);
  const [categoryYears, setCategoryYears] = useState([""]);
  const [categoryMentors, setCategoryMentors] = useState([""]);

  // Fetch histogram data for existing functionality
  const fetchHistogram = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5000/api/admin/visualization/remaining-points-histogram?${query}`);
      if (res.data.success) {
        setHistogramData(res.data.data.histogramData);
        setSummaryStats(res.data.data.summaryStats);
      }
    } catch (err) {
      console.error("Error fetching histogram", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch student by roll number for existing functionality
  const searchStudent = async () => {
    if (!rollNumber) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/admin/visualization/student-by-roll?rollNumber=${rollNumber}`);
      if (res.data.success) setStudentInfo(res.data.data);
      else setStudentInfo(null);
    } catch (err) {
      console.error("Error fetching student info", err);
      setStudentInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change for existing functionality
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Fetch category distribution data
  const fetchCategoryDistribution = async () => {
    setCategoryLoading(true);
    try {
      // Build query string for API filters
      const queryParams = new URLSearchParams();
      if (categoryFilters.rollNumber) queryParams.append("rollNumber", categoryFilters.rollNumber);
      if (categoryFilters.department) queryParams.append("department", categoryFilters.department);
      if (categoryFilters.batch) queryParams.append("batch", categoryFilters.batch);
      if (categoryFilters.division) queryParams.append("division", categoryFilters.division);
      if (categoryFilters.yearOfJoining) queryParams.append("yearOfJoining", categoryFilters.yearOfJoining);
      
      const apiUrl = `http://localhost:5000/api/admin/getStudentCategoryDistribution${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;
      
      const response = await axios.get(apiUrl);
      const result = response.data;
      
      setCategoryData(result);
      
      // Extract unique values for filters
      setCategoryDepartments(["", ...new Set(result.map(item => item.department))]);
      setCategoryBatches(["", ...new Set(result.map(item => item.batch).map(String))]);
      setCategoryDivisions(["", ...new Set(result.map(item => item.division))]);
      setCategoryYears(["", ...new Set(result.map(item => item.yearOfJoining).map(String))]);
      setCategoryMentors(["", ...new Set(result.map(item => item.mentor).filter(Boolean))]);
      
      setCategoryError(null);
      setPage(1); // Reset to first page on new data load
    } catch (err) {
      console.error("Error fetching category data:", err);
      setCategoryError(`Failed to load data: ${err.message}`);
    } finally {
      setCategoryLoading(false);
    }
  };

  // Handle change for category distribution filters
  const handleCategoryFilterChange = (field, value) => {
    setCategoryFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle page change for pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Toggle showing all students vs. paginated view
  const handleShowAllToggle = (event) => {
    setShowAllStudents(event.target.checked);
  };

  // Apply category filters and sort data
  useEffect(() => {
    let result = [...categoryData];
    
    // Apply client-side filters
    if (categoryFilters.rollNumber) {
      result = result.filter(student => 
        student.rollNumber.toLowerCase().includes(categoryFilters.rollNumber.toLowerCase())
      );
    }
    
    if (categoryFilters.mentor) {
      result = result.filter(student => student.mentor === categoryFilters.mentor);
    }
    
    // Sort data by total credits (descending)
    result.sort((a, b) => {
      const totalA = categories.reduce((sum, cat) => {
        // Map category names to match the API response
        const apiField = cat === "Social Service" ? "socialservice" : cat.toLowerCase();
        return sum + (a[apiField] || 0);
      }, 0);
      
      const totalB = categories.reduce((sum, cat) => {
        const apiField = cat === "Social Service" ? "socialservice" : cat.toLowerCase();
        return sum + (b[apiField] || 0);
      }, 0);
      
      return totalB - totalA;
    });
    
    // Paginate or show all based on toggle
    if (showAllStudents) {
      setFilteredCategoryData(result);
    } else {
      // Get paginated slice
      const startIndex = (page - 1) * studentsPerPage;
      setFilteredCategoryData(result.slice(startIndex, startIndex + studentsPerPage));
    }
  }, [categoryData, categoryFilters.rollNumber, categoryFilters.mentor, page, studentsPerPage, showAllStudents]);

  // Initial data load for category distribution
  useEffect(() => {
    fetchCategoryDistribution();
  }, []);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(categoryData.length / studentsPerPage);

  // Custom tooltip for the category chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const student = filteredCategoryData.find(s => s.rollNumber === label);
      return (
        <Paper elevation={3} sx={{ p: 2, backgroundColor: "white" }}>
          <Typography fontWeight="bold">{`${student?.name} (${label})`}</Typography>
          {payload.map((entry, index) => (
            <Typography key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} credits`}
            </Typography>
          ))}
          <Typography fontWeight="bold" sx={{ mt: 1 }}>
            {`Total: ${payload.reduce((sum, entry) => sum + entry.value, 0)} credits`}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  // Map category names for the chart
  const mapCategoryToApiField = (category) => {
    if (category === "Social Service") return "socialservice";
    return category.toLowerCase();
  };

  return (
    <div>
      <AdNavbar />
      <Box p={3}>
        {/* Admin Profile */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardHeader
            title="Admin Profile"
            action={
              <IconButton aria-label="edit profile" color="primary">
                <EditIcon />
              </IconButton>
            }
          />
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={image}
              alt="Admin Avatar"
              sx={{ width: 120, height: 120, mr: 3 }}
            />
            <Box>
              <Typography variant="h5" gutterBottom>{adminData.name}</Typography>
              <Typography variant="body1"><strong>Username:</strong> {adminData.username}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {adminData.email}</Typography>
              <Typography variant="body1"><strong>Role:</strong> {adminData.role}</Typography>
              <Button 
                variant="contained" 
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Divider sx={{ mb: 3 }} />

        {/* Histogram Section */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardHeader title="Remaining Credits Histogram" />
          <CardContent>
            {/* Histogram Filters */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Filters</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    select
                    value={filters.department}
                    onChange={handleFilterChange}
                    size="small"
                  >
                    <MenuItem value="">None</MenuItem>
                    {hardcodedDepartments.map(dep => (
                      <MenuItem key={dep} value={dep}>{dep}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Batch"
                    name="batch"
                    select
                    value={filters.batch}
                    onChange={handleFilterChange}
                    size="small"
                  >
                    <MenuItem value="">None</MenuItem>
                    {hardcodedBatches.map(batch => (
                      <MenuItem key={batch} value={batch}>{batch}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Division"
                    name="division"
                    select
                    value={filters.division}
                    onChange={handleFilterChange}
                    size="small"
                  >
                    <MenuItem value="">None</MenuItem>
                    {hardcodedDivisions.map(div => (
                      <MenuItem key={div} value={div}>{div}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Year"
                    name="year"
                    select
                    value={filters.year}
                    onChange={handleFilterChange}
                    size="small"
                  >
                    <MenuItem value="">None</MenuItem>
                    {Array.from({ length: 6 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <MenuItem key={year} value={year}>{year}</MenuItem>;
                    })}
                  </TextField>
                </Grid>

                <Grid item xs={6} md={2}>
                  <Button 
                    variant="contained" 
                    onClick={fetchHistogram}
                    fullWidth
                  >
                    Apply Filters
                  </Button>
                </Grid>

                <Grid item xs={6} md={2}>
                  <Button 
                    variant="outlined" 
                    onClick={() => setFilters({ department: "", batch: "", division: "", year: "" })}
                    fullWidth
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Histogram Chart */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              {loading ? (
                <CircularProgress />
              ) : histogramData.length > 0 ? (
                <>
                  <Box sx={{ width: '100%', maxWidth: 700 }}>
                    <BarChart
                      xAxis={[{ scaleType: 'band', data: histogramData.map(d => d.range) }]}
                      series={[{ data: histogramData.map(d => d.count), label: 'Students' }]}
                      height={300}
                      fullWidth
                    />
                  </Box>
                  <Box mt={2} sx={{ textAlign: 'center' }}>
                    <Typography variant="body1"><strong>Total Students:</strong> {summaryStats.totalStudents}</Typography>
                    <Typography variant="body1">
                      <strong>Avg Remaining Credits to 100:</strong> {
                        summaryStats.averageRemainingCreditsTo100 != null 
                          ? summaryStats.averageRemainingCreditsTo100.toFixed(2) 
                          : "N/A"
                      }
                    </Typography>
                    <Typography variant="body1">
                      <strong>Zero Remaining Credits:</strong> {summaryStats.studentsWithZeroRemaining}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Typography color="text.secondary">No data available. Please apply filters to see results.</Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Student Search */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardHeader title="Student Search" />
          <CardContent>
            <Box display="flex" gap={2} alignItems="center" mb={3}>
              <TextField
                label="Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                sx={{ flexGrow: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" onClick={searchStudent} sx={{ height: '56px' }}>Search</Button>
            </Box>

            {/* Student Info Display */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            ) : studentInfo ? (
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6">{studentInfo.name}</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Roll Number</Typography>
                    <Typography variant="body1">{studentInfo.rollNumber}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Department</Typography>
                    <Typography variant="body1">{studentInfo.department}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Division</Typography>
                    <Typography variant="body1">{studentInfo.division}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Batch</Typography>
                    <Typography variant="body1">{studentInfo.batch}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Year</Typography>
                    <Typography variant="body1">{studentInfo.year}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Total Credits</Typography>
                    <Typography variant="body1">{studentInfo.totalCredits}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Earned Credits</Typography>
                    <Typography variant="body1">{studentInfo.earnedCredits}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">Remaining Credits</Typography>
                    <Typography variant="body1">{studentInfo.remainingCredits}</Typography>
                  </Grid>
                </Grid>
              </Card>
            ) : rollNumber ? (
              <Typography color="error">No student found for roll number: {rollNumber}</Typography>
            ) : null}
          </CardContent>
        </Card>
        
        {/* Student Category Distribution Section */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardHeader 
            title="Student-wise Category Distribution" 
            action={
              <FormControlLabel
                control={
                  <Switch 
                    checked={showAllStudents} 
                    onChange={handleShowAllToggle}
                    color="primary"
                  />
                }
                label={showAllStudents ? "Show All" : "Paginated View"}
              />
            }
          />
          <CardContent>
            {/* Category distribution filters */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Filters</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Search by Roll Number"
                    value={categoryFilters.rollNumber}
                    onChange={(e) => handleCategoryFilterChange("rollNumber", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={categoryFilters.department}
                      onChange={(e) => handleCategoryFilterChange("department", e.target.value)}
                      label="Department"
                      startAdornment={
                        <InputAdornment position="start">
                          <FilterIcon />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">All</MenuItem>
                      {categoryDepartments.filter(Boolean).map(dept => (
                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Batch</InputLabel>
                    <Select
                      value={categoryFilters.batch}
                      onChange={(e) => handleCategoryFilterChange("batch", e.target.value)}
                      label="Batch"
                      startAdornment={
                        <InputAdornment position="start">
                          <FilterIcon />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">All</MenuItem>
                      {categoryBatches.filter(Boolean).map(batch => (
                        <MenuItem key={batch} value={batch}>{batch}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Division</InputLabel>
                    <Select
                      value={categoryFilters.division}
                      onChange={(e) => handleCategoryFilterChange("division", e.target.value)}
                      label="Division"
                      startAdornment={
                        <InputAdornment position="start">
                          <FilterIcon />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">All</MenuItem>
                      {categoryDivisions.filter(Boolean).map(div => (
                        <MenuItem key={div} value={div}>{div}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Year of Joining</InputLabel>
                    <Select
                      value={categoryFilters.yearOfJoining}
                      onChange={(e) => handleCategoryFilterChange("yearOfJoining", e.target.value)}
                      label="Year of Joining"
                      startAdornment={
                        <InputAdornment position="start">
                          <FilterIcon />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">All</MenuItem>
                      {categoryYears.filter(Boolean).map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Mentor</InputLabel>
                    <Select
                      value={categoryFilters.mentor}
                      onChange={(e) => handleCategoryFilterChange("mentor", e.target.value)}
                      label="Mentor"
                      startAdornment={
                        <InputAdornment position="start">
                          <FilterIcon />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">All</MenuItem>
                      {categoryMentors.filter(Boolean).map(mentor => (
                        <MenuItem key={mentor} value={mentor}>{mentor}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6} md={6}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={fetchCategoryDistribution}
                    size="medium"
                  >
                    Apply Filters
                  </Button>
                </Grid>
                
                <Grid item xs={6} md={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => {
                      setCategoryFilters({
                        rollNumber: "",
                        department: "",
                        batch: "",
                        division: "",
                        yearOfJoining: "",
                        mentor: ""
                      });
                      fetchCategoryDistribution();
                    }}
                    size="medium"
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>
            
            {/* Category distribution chart */}
            <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                {categoryLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading data...</Typography>
                  </Box>
                ) : categoryError ? (
                  <Typography color="error" sx={{ py: 8 }}>{categoryError}</Typography>
                ) : (
                  <Typography color="text.secondary">
                    {filteredCategoryData.length === 0 
                      ? "No data available. Please adjust your filters." 
                      : showAllStudents 
                        ? `Showing all ${filteredCategoryData.length} students (sorted by total credits)`
                        : `Showing ${filteredCategoryData.length} of ${categoryData.length} students (page ${page} of ${totalPages})`
                    }
                  </Typography>
                )}
              </Box>
              
              {!categoryLoading && !categoryError && filteredCategoryData.length > 0 && (
                <Box sx={{ height: 500, width: '100%' }}>
                  <ResponsiveContainer>
                    <RechartsBarChart
                      data={filteredCategoryData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" label={{ value: 'Credits', position: 'insideBottom', offset: -5 }} />
                      <YAxis 
                        type="category" 
                        dataKey="rollNumber" 
                        tickFormatter={(value) => {
                          const student = filteredCategoryData.find(s => s.rollNumber === value);
                          return student ? `${student.name || "Student"} (${value})` : value;
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      {categories.map((category) => (
                        <Bar 
                          key={category} 
                          dataKey={mapCategoryToApiField(category)} 
                          stackId="a" 
                          fill={categoryColors[category]} 
                          name={category}
                        />
                      ))}
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </Box>
              )}
              
              {/* Pagination controls */}
              {!showAllStudents && !categoryLoading && categoryData.length > studentsPerPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </Card>
            
            {/* Category distribution summary */}
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Summary</Typography>
              <Typography paragraph>
                This visualization shows how individual students are balancing their activities across different categories.
                Each bar represents a student, with colored sections indicating credits earned in each category.
              </Typography>
              <Typography>
                <strong>Key insights:</strong> 
                {filteredCategoryData.length > 0 
                  ? " Students are displayed in descending order of total credits. This helps identify well-rounded students versus those focusing on specific areas."
                  : categoryLoading 
                    ? " Loading data from API..."
                    : " No data available with current filters."}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Note:</strong> By default, the view is limited to {studentsPerPage} students per page. 
                Toggle "Show All" to view all students at once.
              </Typography>
            </Card>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default AdProfile;