import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
  InputAdornment,
  Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useUserDashboard } from '../hooks/useUserDashboard';

export const UserTable: React.FC = () => {
  const {
    users,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    sortOrder,
    handleSort,
  } = useUserDashboard();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 5 } }}>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: '-0.02em' }}
        >
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="#64748b">
          Manage your team members and their account statuses.
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search users by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{
            maxWidth: { sm: 400 },
            backgroundColor: '#ffffff',
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
              '& fieldset': {
                borderColor: '#e2e8f0',
              },
              '&:hover fieldset': {
                borderColor: '#cbd5e1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }
          }}
        />
      </Box>

      {isError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
          An error occurred while fetching users. Please try again.
        </Alert>
      )}

      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          border: '1px solid #e2e8f0', 
          borderRadius: '16px', 
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          background: '#ffffff'
        }}
      >
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 600 }} aria-label="users table">
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell>
                  <Box 
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} 
                    onClick={handleSort}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                      Name
                    </Typography>
                    <IconButton size="small" sx={{ ml: 0.5, p: 0.5 }}>
                      <SwapVertIcon fontSize="small" sx={{ color: sortOrder === 'asc' ? '#0f172a' : '#94a3b8' }} />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                    Role
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                    <CircularProgress size={40} thickness={4} sx={{ color: '#3b82f6' }} />
                    <Typography variant="body2" sx={{ mt: 2, color: '#64748b', fontWeight: 500 }}>Cargando...</Typography>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                    <Typography variant="body1" color="#64748b">No users found matching your search</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow 
                    key={user.id} 
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 }, 
                      '&:hover': { backgroundColor: '#f8fafc' }, 
                      transition: 'background-color 0.2s ease' 
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 600, color: '#0f172a' }}>
                      {user.name}
                    </TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        size="small" 
                        variant={user.role === 'Admin' ? 'filled' : 'outlined'} 
                        sx={{ 
                          fontWeight: 600, 
                          borderRadius: '8px',
                          backgroundColor: user.role === 'Admin' ? '#eff6ff' : 'transparent',
                          color: user.role === 'Admin' ? '#1d4ed8' : '#64748b',
                          borderColor: user.role === 'Admin' ? 'transparent' : '#cbd5e1'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        size="small" 
                        sx={{ 
                          backgroundColor: user.status === 'Active' ? '#dcfce7' : '#fee2e2',
                          color: user.status === 'Active' ? '#166534' : '#991b1b',
                          fontWeight: 600,
                          borderRadius: '8px',
                          border: 'none'
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Container>
  );
};
