import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { api } from '../services/api';

const HealthCheck = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobsData = await api.getJobs();
                setJobs(jobsData);
                setError(null);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Typography variant="h6" gutterBottom>
                Available Jobs
            </Typography>
            {error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box>
                    {jobs.map(job => (
                        <Paper key={job.id} elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6">{job.title}</Typography>
                            <Typography>Company: {job.company}</Typography>
                            <Typography>Location: {job.location}</Typography>
                            <Typography>Salary: {job.salaryRange}</Typography>
                            <Typography>{job.description}</Typography>
                        </Paper>
                    ))}
                </Box>
            )}
        </Paper>
    );
};

export default HealthCheck; 